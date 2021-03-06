<template>
  <transition name="fade">
    <div class="booking-dialog" v-if="isOpen">
      <transition name="slideInDown">
        <div class="dialog-panel" @click.stop v-if="!isAlert">
          <h3 class="title">預約時段</h3>

          <div class="decoration-three">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <form class="form">
            <div class="input-box">
              <label for="name">姓名</label>

              <input
                :class="errorName ? 'my-input error' : 'my-input'"
                type="text"
                id="name"
                v-model="name"
                @change="errorName = false"
              />

              <div class="errorMessage" v-show="errorName">請填入姓名</div>
            </div>

            <div class="input-box">
              <label for="phone">電話</label>

              <input
                :class="errorName ? 'my-input error' : 'my-input'"
                type="text"
                id="phone"
                v-model="phone"
                @change="errorPhone = false"
              />

              <div class="errorMessage" v-show="errorPhone">請填入正確電話號碼</div>
            </div>

            <div class="input-box">
              <label for="phone">預約起迄</label>

              <div class="datepicker-box">
                <Datepicker
                  :input-class="errorDate ? 'my-input-date error' : 'my-input-date'"
                  calendar-class="calendar-class-input"
                  :language="zh"
                  format="yyyy/M/dd"
                  v-model="startDate"
                  :disabled-dates="disabledStartDates"
                ></Datepicker>~
                <Datepicker
                  :input-class="errorDate ? 'my-input-date error' : 'my-input-date'"
                  calendar-class="calendar-class-input"
                  :language="zh"
                  format="yyyy/M/dd"
                  v-model="endDate"
                  :disabled-dates="disabledEndDates"
                ></Datepicker>
              </div>

              <div class="errorMessage" v-show="errorDate">請選擇入住與退房日期</div>
            </div>

            <div class="caculate">
              <div class="day">
                <div class="text">平日時段</div>
                <div class="num">{{ normalDates }} 夜</div>
              </div>

              <div class="day">
                <div class="text">假日時段</div>
                <div class="num">{{ holidayDates }} 夜</div>
              </div>
            </div>

            <div class="answer">
              <div></div>
              <div>
                <span class="quter">=</span>
                NT.{{ totalPrice }}
              </div>
            </div>

            <div class="button-group">
              <button class="btn-cancel" @click.prevent="closeForm">取消</button>
              <button class="btn-confrim" @click.prevent="trueBook" ref="loadingButton">確定預約</button>
            </div>
          </form>
        </div>

        <Message v-else :message="message" :title="alertTitle" :closeAll="closeForm" />
      </transition>
    </div>
  </transition>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { en, zh } from 'vuejs-datepicker/dist/locale'
import Message from '@/components/Message'

import roomsAPI from '@/api/room'
// import { Toast } from '@/utils/helpers'
import moment from 'moment'

export default {
  components: {
    Datepicker,
    Message
  },
  props: ['isOpen', 'isClose', 'holidayPrice', 'normalDayPrice'],
  data () {
    return {
      en: en,
      zh: zh,
      name: '',
      phone: '',
      startDate: null,
      endDate: null,
      normalDates: 0,
      holidayDates: 0,
      errorName: false,
      errorPhone: false,
      errorDate: false,
      isAlert: false,
      alertTitle: 'true',
      message: ''
    }
  },
  computed: {
    totalPrice () {
      const vm = this
      return vm.holidayPrice * vm.holidayDates + vm.normalDayPrice * vm.normalDates
    },
    disabledStartDates () {
      if (this.endDate === null) return { to: new Date() }

      let endDate = new Date(this.endDate)
      endDate.setDate(endDate.getDate() - 1)
      return {
        to: new Date(),
        from: endDate
      }
    },
    disabledEndDates () {
      if (this.startDate === null) return { to: new Date() }

      let startDate = new Date(this.startDate)
      startDate.setDate(startDate.getDate() + 1)
      return {
        to: startDate
      }
    }
  },
  // 目標改變時才開始運算函數，computed 無法做到的事，靠它就能補足。
  watch: {
    startDate: {
      // immediate: false, // 初始時就執行改 true
      // deep: true, // 假如監視的資料不在同一層時
      handler () {
        if (this.endDate === null || this.startDate === null) return
        this.getTotalDays()
      }
    },
    endDate: {
      handler () {
        if (this.endDate === null || this.startDate === null) return
        this.getTotalDays()
      }
    }
  },
  methods: {
    closeForm () {
      this.resetData()
      this.isClose()
    },
    async trueBook () {
      if (!this.validated()) return

      const vm = this
      const { roomId } = vm.$route.params
      const formData = {
        name: vm.name,
        tel: vm.phone,
        date: vm.chooseDates().map(date => {
          return moment(date).format('YYYY-MM-DD')
        })
      }
      let loader = this.$loading.show({
        container: this.$refs.loadingButton,
        loader: 'dots',
        color: 'white',
        width: 30,
        height: 30,
        backgroundColor: '#575757',
        opacity: 1
      })
      try {
        await roomsAPI.postBooking(roomId, formData)
        const { data } = await roomsAPI.getRoom(roomId)

        vm.$bus.$emit('successBook', data)
        loader.hide()
        vm.isAlert = true
        vm.alertTitle = 'true'
        vm.resetData()
      } catch (error) {
        loader.hide()
        vm.isAlert = true
        vm.alertTitle = 'fail'
        vm.message = '預約時間已被人預訂'
        vm.resetData()
      }
    },
    validated () {
      const vm = this
      let phoneReg = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s/0-9]*$/g

      vm.name.trim().length === 0 ? (vm.errorName = true) : (vm.errorName = false)
      phoneReg.test(vm.phone) === false ? (vm.errorPhone = true) : (vm.errorPhone = false)
      vm.startDate === null || vm.endDate === null ? (vm.errorDate = true) : (vm.errorDate = false)

      if (vm.errorName || vm.errorPhone || vm.errorDate) return false
      return true
    },
    // 把選擇的日期儲存成陣列
    chooseDates () {
      const vm = this
      if (vm.startDate === null || vm.endDate === null) return

      let d1 = new Date(vm.startDate)
      let d2 = new Date(vm.endDate)
      let oneDay = 1000 * 60 * 60 * 24
      let d1ms = d1.getTime()
      let d2ms = d2.getTime()
      let dateArray = []

      for (d1ms; d1ms <= d2ms; d1ms += oneDay) {
        let date = new Date(d1ms)
        dateArray.push(date)
      }
      return dateArray
    },
    // 計算陣列中平日和假日各別的天數
    getTotalDays () {
      const vm = this
      const days = vm.chooseDates()

      vm.normalDates = 0
      vm.holidayDates = 0

      days.forEach((day, i) => {
        if (i === days.length - 1) return

        const date = new Date(day)

        if (date.getDay() === 1 || date.getDay() === 2 || date.getDay() === 3 || date.getDay() === 4) {
          vm.normalDates += 1
        } else {
          vm.holidayDates += 1
        }
      })
    },
    resetData () {
      this.name = ''
      this.phone = ''
      this.startDate = null
      this.endDate = null
      this.normalDates = 0
      this.holidayDates = 0
      this.errorName = false
      this.errorPhone = false
      this.errorDate = false
      this.isAlert = false
      this.alertTitle = 'true'
      this.message = ''
    }
  }
}
</script>

<style lang="scss">
.booking-dialog {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(black, 0.5);
  z-index: 999;

  .dialog-panel {
    background-color: #fff;
    padding: 30px 45px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .title {
      font-size: 24px;
      font-weight: 700;
      color: #000000;
      letter-spacing: 2.51px;
      text-align: left;
    }
    .decoration-three {
      margin: 12px 0 30px;
      padding: 0 8px;
      span {
        display: inline-block;
        width: 1px;
        height: 15px;
        background-color: black;
        transform: rotate(-45deg);
        margin-right: 12px;
      }
    }
    form.form {
      .input-box {
        width: 335px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;

        label {
          font-size: 14px;
          font-weight: bolder;
          color: #000000;
          letter-spacing: 1.46px;
          text-align: center;
        }
        .errorMessage {
          width: 100%;
          font-size: 12px;
          color: #d80533;
          text-align: right;
        }
        input.my-input {
          border: 1px solid #c9c9c9;
          border-radius: 5px;
          outline: none;
          height: 32px;
          width: 245px;
          padding: 0 8px;
          font-size: 12px;
          color: #000000;
          letter-spacing: 1.25px;
          &.error {
            border-color: #d80533;
          }
        }
        .datepicker-box {
          width: 245px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .calendar-class-input {
            header {
              z-index: 99;
            }
          }
          .my-input-date {
            outline: none;
            width: 90px;
            height: 32px;
            border: 1px solid #c9c9c9;
            border-radius: 5px;
            font-size: 12px;
            color: #000000;
            letter-spacing: 1.25px;
            text-align: center;
            &.error {
              border-color: #d80533;
            }
          }
        }
      }
      .caculate {
        margin-right: -45px;
        margin-left: -45px;
        padding: 15px 45px;
        background: #ededed;

        .day {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #6d7278;
          letter-spacing: 1.25px;
          margin-bottom: 8px;
          &:last-child {
            margin: 0;
          }
        }
      }
      .answer {
        width: 100%;
        display: flex;
        margin-top: 12px;

        div {
          width: 50%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 26px;
          font-weight: bold;
          color: #ff5c5c;
          letter-spacing: 2.72px;
          text-align: right;
        }
      }
    }
    .button-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 30px;

      button {
        outline: none;
        border: none;
        padding: 12px 22.5px;
        font-size: 14px;
        letter-spacing: 1.46px;
        text-align: center;
        cursor: pointer;
        transition: 0.3s;

        &:hover {
          opacity: 0.9;
        }
        &.btn-cancel {
          background: #d8d8d8;
          color: #6d7278;
        }
        &.btn-confrim {
          background: #484848;
          color: white;
        }
      }
    }
  }
}
</style>

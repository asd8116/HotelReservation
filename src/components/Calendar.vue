<template>
  <div class="hotel-calendar">
    <Datepicker
      :inline="true"
      wrapper-class="wrapper-class"
      calendar-class="calendar-class"
      input-class="input-class"
      :minimum-view="'day'"
      :maximum-view="'year'"
      :language="zh"
      :value="nowDate"
      :disabled-dates="disabledDates"
      :highlighted="highlighted"
    ></Datepicker>

    <div class="d-flex">
      <div class="btn-arround">
        <button class="booking-btn" @click="openForm = true">預約時段</button>
        <div class="decoration"></div>
      </div>

      <div class="btn-arround">
        <button class="booking-btn" @click="clearData" ref="clearbtn">預約清除</button>
        <div class="decoration"></div>
      </div>
    </div>

    <BookingDialog
      :isOpen="openForm"
      :isClose="closeForm"
      :holidayPrice="iniRoom.holidayPrice"
      :normalDayPrice="iniRoom.normalDayPrice"
    />
  </div>
</template>

<script>
import BookingDialog from '@/components/BookingDialog'
import Datepicker from 'vuejs-datepicker'
import { en, zh } from 'vuejs-datepicker/dist/locale'

import roomsAPI from '@/api/room'
import { Toast } from '@/utils/helpers'
import moment from 'moment'

export default {
  components: {
    BookingDialog,
    Datepicker
  },
  props: {
    iniRoom: {
      type: Object,
      default: () => ({})
    },
    booked: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      nowDate: new Date(),
      en: en,
      zh: zh,
      openForm: false
    }
  },
  computed: {
    disabledDates () {
      let date = new Date()
      date.setDate(date.getDate() - 1)
      return {
        to: date
      }
    },
    highlighted () {
      return {
        dates: this.booked.map(book => {
          return new Date(moment(book.date)._d)
        })
      }
    }
  },
  methods: {
    closeForm () {
      this.openForm = false
    },
    async clearData () {
      const vm = this
      try {
        const res = await roomsAPI.deleteBooking()

        if (res.data.success) {
          const { roomId } = vm.$route.params
          const { data } = await roomsAPI.getRoom(roomId)
          vm.$bus.$emit('successBook', data)
        }
        Toast.fire({
          icon: 'success',
          title: 'Success'
        })
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'Clear failed',
          text: 'Please Try Later'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.hotel-calendar {
  width: 100%;
  max-width: 380px;
  min-height: 300px;

  .wrapper-class {
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
    margin-bottom: 25px;
  }
  .calendar-class {
    width: 100%;
    padding: 30px 36px;
    border: none;
    background: #f7f7f7;

    header {
      z-index: 99;
    }
    .cell.day-header {
      font-size: 18px;
      color: #6d7278;
      letter-spacing: 1.88px;
      margin-bottom: 8px;
    }
    .cell.day {
      font-size: 14px;
      color: #6d7278;
      letter-spacing: 1.46px;
      text-align: center;
    }
    .cell.today {
      border: 1px solid rgba(#575757, 0.5);
    }
    .cell.disabled {
      color: #c9ccd0;
    }
    .cell.selected {
      background-color: rgba(#575757, 0.2);
      &:hover {
        background-color: rgba(#575757, 0.3);
      }
    }
    .cell.highlighted {
      background-color: transparent;
      &::after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        background-color: rgba(white, 0.2);
        background-image: linear-gradient(
          45deg,
          black 5%,
          transparent 5%,
          transparent 45%,
          black 45%,
          black 55%,
          transparent 55%,
          transparent 95%,
          black 95%,
          black
        );
        background-size: 8px 8px;
        opacity: 0.3;
      }
      &:hover {
        background-color: rgba(#575757, 0.2);
      }
    }
  }
  .d-flex {
    display: flex;
    .btn-arround {
      margin-right: 20px;
    }
  }
  button.booking-btn {
    border: none;
    outline: none;
    background-color: #575757;
    color: white;
    font-size: 16px;
    letter-spacing: 1.67px;
    text-align: center;
    padding: 16px 25px;
    cursor: pointer;
    z-index: 1;
    transition: 0.3s;
    &:hover {
      opacity: 0.9;
    }
  }
  .decoration {
    position: absolute;
    width: 120px;
    height: 50px;
    top: 8px;
    left: 8px;
    background-color: rgba(white, 0.2);
    background-image: linear-gradient(
      -45deg,
      black 5%,
      transparent 5%,
      transparent 45%,
      black 45%,
      black 55%,
      transparent 55%,
      transparent 95%,
      black 95%,
      black
    );
    background-size: 5px 5px;
  }
}
</style>

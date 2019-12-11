<template>
  <div class="hotel-calendar">
    <datepicker
      :inline="true"
      wrapper-class="wrapper-class"
      calendar-class="calendar-class"
      input-class="input-class"
      :minimum-view="'day'"
      :maximum-view="'year'"
      :language="zh"
      :value="nowDate"
      :disabled-dates="disabledDates"
    ></datepicker>

    <div class="d-flex">
      <div class="btn-arround">
        <button class="booking-btn" @click="openForm">預約時段</button>
        <div class="decoration"></div>
      </div>

      <div class="btn-arround">
        <button class="booking-btn" @click="clearData" ref="clearbtn">預約清除</button>
        <div class="decoration"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { en, zh } from 'vuejs-datepicker/dist/locale'

export default {
  components: {
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
      openForm: true
    }
  },
  computed: {
    disabledDates () {
      let date = new Date()
      date.setDate(date.getDate() - 1)
      return {
        to: date
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

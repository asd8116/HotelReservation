<template>
  <div class="room-information">
    <div class="left-infotmation">
      <h1 class="room-title">{{ iniRoom.name }}</h1>

      <div class="descriptionShort-block">
        <div class="descriptionShort" v-if="iniRoom.descriptionShort">
          <div class="title">房客人數限制：</div>

          <div
            class="content"
          >{{ iniRoom.descriptionShort['GuestMin'] }} ~ {{ iniRoom.descriptionShort['GuestMax'] }} 人</div>
        </div>

        <div class="descriptionShort" v-if="iniRoom.descriptionShort">
          <div class="title">床型：</div>

          <div class="content">
            <span
              class="bed"
              v-for="(bed, index) in iniRoom.descriptionShort['Bed']"
              :key="index"
            >{{ bed }}</span>
          </div>
        </div>

        <div class="descriptionShort" v-if="iniRoom.descriptionShort">
          <div class="title">衛浴數量：</div>

          <div class="content">{{ iniRoom.descriptionShort['Private-Bath'] }} 間</div>
        </div>

        <div class="descriptionShort" v-if="iniRoom.descriptionShort">
          <div class="title">房間大小：</div>

          <div class="content">{{ iniRoom.descriptionShort['Footage'] }} 平方公尺</div>
        </div>
      </div>

      <div class="description">{{ iniRoom.description }}</div>

      <div class="decoration">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div class="check-in-out">
        <div class="check-in-time" v-if="iniRoom.checkInAndOut">
          <div class="text">Check In</div>

          <div
            class="time"
          >{{ iniRoom.checkInAndOut.checkInEarly }} - {{ iniRoom.checkInAndOut.checkInLate }}</div>
        </div>

        <div class="check-out-time" v-if="iniRoom.checkInAndOut">
          <div class="text">Check Out</div>

          <div class="time">{{ iniRoom.checkInAndOut.checkOut }}</div>
        </div>
      </div>

      <div class="amenities" v-if="iniRoom.amenities">
        <div
          class="icon"
          :class="iniRoom.amenities[type] === false ? 'disable' : ''"
          v-for="(type, index) in Object.keys(iniRoom.amenities)"
          :key="index"
        >
          <i :class="`fas fa-${iconString(type)}`"></i>
          {{ iconName(type) }}
        </div>
      </div>
    </div>

    <div class="right-information">
      <div class="normal-day-price">NT.{{ iniRoom.normalDayPrice }}</div>
      <div class="normal-day">平日(一 ~ 四)</div>
      <div class="holiday-day-price">NT.{{ iniRoom.holidayPrice }}</div>
      <div class="holiday-day">假日(五 ~ 日)</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    iniRoom: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      iconMap: {
        'Wi-Fi': { name: 'Wi-Fi', icon: 'wifi' },
        Breakfast: { name: '早餐', icon: 'utensils' },
        'Mini-Bar': { name: 'Mini Bar', icon: 'cocktail' },
        'Room-Service': { name: 'Room Service', icon: 'concierge-bell' },
        Television: { name: '電視', icon: 'tv' },
        'Air-Conditioner': { name: '空調', icon: 'wind' },
        Refrigerator: { name: '冰箱', icon: 'snowflake' },
        Sofa: { name: '沙發', icon: 'couch' },
        'Great-View': { name: '漂亮的視野', icon: 'mountain' },
        'Smoke-Free': { name: '禁止吸煙', icon: 'smoking-ban' },
        'Child-Friendly': { name: '適合兒童', icon: 'baby' },
        'Pet-Friendly': { name: '寵物攜帶', icon: 'dog' }
      }
    }
  },
  methods: {
    iconString (type) {
      return this.iconMap[type].icon
    },
    iconName (type) {
      return this.iconMap[type].name
    }
  }
}
</script>

<style lang="scss" scoped>
.room-information {
  display: flex;

  .left-infotmation {
    margin-right: 40px;

    .room-title {
      font-size: 36px;
      font-weight: bold;
      margin-bottom: 30px;
      letter-spacing: 3.76px;
    }
    .descriptionShort-block {
      font-size: 14px;

      .descriptionShort {
        margin-bottom: 16px;
        display: flex;
        letter-spacing: 1.5px;
      }
    }
    .description {
      font-size: 14px;
      font-family: Arial, Helvetica, sans-serif;
      width: 100%;
      max-width: 480px;
      color: #000000;
      letter-spacing: 1.25px;
      text-align: justify;
      line-height: 25px;
    }
    .decoration {
      margin-top: 35px;
      span {
        display: inline-block;
        width: 1px;
        height: 15px;
        background-color: black;
        transform: rotate(-45deg);
        margin-right: 15px;
        border: 1px solid #000000;
      }
    }
    .check-in-out {
      display: flex;
      width: 100%;
      align-items: center;
      margin-top: 30px;

      .check-in-time {
        margin-right: 95px;
      }
      .text {
        font-size: 14px;
        color: #000000;
        letter-spacing: 1.46px;
      }
      .time {
        font-size: 21px;
        color: #000000;
        letter-spacing: 2.19px;
      }
    }
    .amenities {
      width: 100%;
      height: 220px;
      padding: 20px 30px;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      background: #f0f0f0;
      margin-top: 40px;
      justify-content: center;
      align-items: flex-start;

      .icon {
        height: 25%;
        width: 135px;
        font-size: 14px;
        color: #000000;
        letter-spacing: 1.25px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-right: 12px;

        &.disable {
          opacity: 0.3;
        }
        i {
          margin-right: 14px;
          font-size: 18px;
          width: 16px;
        }
      }
    }
  }
  .right-information {
    .normal-day-price {
      font-size: 30px;
      color: #000000;
      letter-spacing: 3.13px;
      text-align: right;
      line-height: 27px;
      margin-bottom: 8px;
    }
    .holiday-day-price {
      font-size: 16px;
      color: #000000;
      letter-spacing: 1.67px;
      text-align: right;
      line-height: 27px;
      margin-top: 12px;
    }
    .normal-day,
    .holiday-day {
      font-size: 14px;
      color: #6d7278;
      letter-spacing: 1.46px;
      text-align: right;
      line-height: 27px;
    }
  }
}
</style>

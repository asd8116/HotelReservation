<template>
  <router-link :to="{ name: 'room', params: { roomId: iniRoom.id }}" class="room-card">
    <div class="roomImg" :style="{backgroundImage: `url('${iniRoom.imageUrl}')`}"></div>

    <div class="roomInformation">
      <div class="room-type">{{ iniRoom.name }}</div>

      <div class="room-price">
        <div class="normal">
          NT. {{ iniRoom.normalDayPrice }}
          <span>平日</span>
        </div>

        <div class="holiday">NT. {{ iniRoom.holidayPrice }} 假日</div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    iniRoom: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  color: #000;
  text-decoration: none;
}
.room-card {
  width: 100%;
  height: 350px;
  margin-bottom: 60px;
  background: #f7f7f7;
  box-shadow: 2px 2px 9px 0 rgba(0, 0, 0, 0.18);
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    .roomInformation {
      padding: 20px 30px;

      .room-type {
        font-size: 14px;
        margin-bottom: 25px;
      }
      .room-price {
        height: initial;
        visibility: visible;
        opacity: 1;
      }
    }
  }
  .roomImg {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center bottom;
  }
  .roomInformation {
    width: 100%;
    background-color: #fff;
    padding: 25px 30px;
    transition: 0.3s;

    .room-type {
      font-size: 14px;
    }
    .room-price {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      transition: height 0.3s;
      height: 0;
      visibility: hidden;
      opacity: 0;

      .normal {
        font-size: 21px;
        span {
          font-size: 12px;
        }
      }
      .holiday {
        font-size: 12px;
        color: #6d7278;
      }
    }
  }
}
</style>

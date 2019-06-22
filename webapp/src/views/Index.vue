<template>
  <div >
    <header class="header">
      <div class="header--container">
        <span class="header__title">OpenCoder</span>
      <svg class="header__menu"
        @click="show"
        xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14">
          <g id="组_16" data-name="组 16" transform="translate(-320 -13)">
            <rect id="矩形_10" data-name="矩形 10" width="18" height="2" rx="1" transform="translate(320 13)" fill="#fff"/>
            <rect id="矩形_11" data-name="矩形 11" width="18" height="2" rx="1" transform="translate(320 19)" fill="#fff"/>
            <rect id="矩形_12" data-name="矩形 12" width="18" height="2" rx="1" transform="translate(320 25)" fill="#fff"/>
          </g>
      </svg>
      </div>
    </header>
    <div class="banner">

    </div>
    <NavBar/>
    <router-view/>
  </div>
</template>
<script>
import NavBar from '@/components/content/NavBar.vue'
export default {
  name:"index",
  components: {
    NavBar
  },
  methods: {
    show () {
      console.log(123)
    }
  }
};
</script>

<style lang="scss">
@import '~@/assets/css/reset.css';
@import '~@/assets/css/index.scss';
body,html{
  background: #fff;
  height: 100%;
  width: 100%;
}
.header{
  width: 100%;
  background: #080808;
  height: px2rem(60);
  .header--container{
    height: px2rem(60);
    margin: 0 px2rem(18);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header__title{
      color: #fff;
      font-size: px2rem(14);
    }
    .header__menu{
      width: px2rem(18);
      height: px2rem(14);
    }
  }
}

.banner{
  height: px2rem(138);
  width: 100%;
  background: #9c3;
}
</style>

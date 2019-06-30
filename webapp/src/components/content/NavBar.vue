<template>
  <nav class="navBar"  @click="auto">
    <router-link
    class="navBar__btn"
      v-for="item in nav"
      :key="item.id"
      :to="item.to"
      active-class="act_c"
      tag="span"
      :data="item.id"
    >
    {{item.title}}
    </router-link>
  </nav>
</template>
<script>
export default {
  name: 'navBar',
  data () {
    return {
      nav: [
      {id: 1, title: '全部文章', to: '/allArticle'},
      {id: 2, title: 'web开发', to: '/webDev'},
      {id: 3, title: '移动开发', to: '/mobile'},
      {id: 4, title: 'H5游戏开发', to: '/h5Game'},
      {id: 5, title: '性能优化', to: '/optimize'},
      {id: 6, title: 'NodeJS', to: '/nodeJs'},
      {id: 7, title: '游山玩水', to: '/haveFun'}
    ]
    }
  },

  methods: {
    auto (e) {
      /**
       * TODO
       * nav自动滚动
       */

    }
  }

}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/index.scss';
  ::-webkit-scrollbar{
    display: none;
  }
  .navBar{
  display: flex;
  align-items: center;
  background:#fff;
  height: px2rem(68);
  padding: 0 px2rem(18);
  font-size: px2rem(14);
  overflow-y: auto;
  .navBar__btn{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 px2rem(20);
    height: px2rem(32);
    border-radius: px2rem(16);
    flex: 0 0 auto;
  }
  .act_c{
    color:#fff;
    background: #080808;
  }
  }
</style>

<template>
  <a-layout id="index-box">
    <a-layout-sider class="slider" :trigger="null" collapsible v-model="collapsed">
      <div class="logo">OpenCoder管理系统</div>
      <a-menu class="menu" theme="dark" mode="inline" :defaultSelectedKeys="['1']">
        <a-menu-item key="1">
          <a-icon type="user" />
          <span>首页</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="user" />
          <span>用户管理</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="user" />
          <span>博客管理</span>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="user" />
          <span>活动管理</span>
        </a-menu-item>
        <a-menu-item key="5">
          <a-icon type="user" />
          <span>可视化模版</span>
        </a-menu-item>
        <a-menu-item key="6">
          <a-icon type="user" />
          <span>博客管理</span>
        </a-menu-item>
        <a-menu-item key="7">
          <a-icon type="user" />
          <span>图片库</span>
        </a-menu-item>
        <a-menu-item key="8">
          <a-icon type="user" />
          <span>资料管理</span>
        </a-menu-item>
        <a-menu-item key="9">
          <a-icon type="user" />
          <span>友情链接</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <div class="trigger-box">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="()=> collapsed = !collapsed"
          />
          <div class="title">
            首页
          </div>
        </div>
        <div class="user-icon">
          <a-avatar icon="user"/>
          <div class="user-name">
            yusong
          </div>
        </div>
      </a-layout-header>
      <a-layout-content
        class="content"
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >Content</a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      collapsed: false
    };
  }
};
</script>

<style lang="less">
#index-box {
  width: 100%;
  height: 100%;
}
#index-box .header {
  background-color: #0e2e5a;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#index-box .trigger-box {
  display: flex;
  background-color: #fff;
  height: 30px;
}

#index-box .user-icon {
  display: flex;
  align-items: center;
}

#index-box .user-icon .user-name {
  color: #fff;
  padding: 0 15px;
}

#index-box .trigger-box .title {
  line-height: 30px;
  color: #A7B3C4;
  padding: 0 15px;
}

#index-box .trigger {
  font-size: 14px;
  line-height: 30px;
  padding: 0 15px;
  cursor: pointer;
  transition: color 0.3s;
  color: black;
}

#index-box .trigger:hover {
  color: #061a36;
}

#index-box .logo {
  font-size: 14px;
  color: #fff;
  height: 32px;
  // background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>

<template>
  <div id="home">
    <Nav></Nav>
    <Swiper></Swiper>
    <Seckill></Seckill>
    <!-- keep-alive影响组件数据更新 -->
    <div id="router-link" style=";margin: 25px 100px;">
      <router-view v-if="!$route.meta.include"></router-view>
      <keep-alive>
        <!-- 购物车第二次正常运行 -->
        <router-view v-if="$route.meta.include"></router-view>
      </keep-alive>
    </div>
    <div ref="testRef"></div>
    <!-- 固定定位 -->
    <RightFixed></RightFixed>
    <Footer></Footer>
  </div>
</template>

<script>
import Swiper from '../components/swiper.vue'
import Nav from '../components/nav.vue'
import focus from '../assets/js/diretives'
import RightFixed from '../components/fixed-right.vue'
import Footer from '../components/footer.vue'
import Seckill from '../components/seckill.vue'

export default {
  name: 'home',
  data() {
    return {
      serach: '',
      shoppingcar: this.$store.state.Shopping_Car,
      order: this.$store.state.Order,
      flag: true,
      timer: '',
      inputMsg: '',
      reg_show: false
    }
  },
  created() {
    this.$store.dispatch('getUsers') //已注册用户
    this.$store.dispatch('getShop')
    this.$store.dispatch('getOrderList')
  },
  mounted() {
    this.$store.commit('hasUser')
  },
  directives: {
    // 自定义vue指令，没用到
    focus: focus
  },
  components: {
    Swiper,
    RightFixed,
    Footer,
    Seckill,
    Nav
  }
}
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
}

#backtop {
  width: 80px;
  height: 80px;

  position: fixed;
  right: 10px !important;
  bottom: 20px !important;
}

#input {
  height: 36px;
  padding-right: 0;
}
</style>

<style>
.el-row {
  margin-bottom: 20px;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.serach {
  width: 400px;
}

.color {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: left;
}
</style>

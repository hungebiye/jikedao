<template>
  <div id="backstage">
    <Nav style="width: 100%;"></Nav>
    <div>
      <el-row
        style="padding: 25px 100px 0 0; background-color:rgb(240, 254, 255);"
      >
        <el-col :span="1" style="height: 600px;"></el-col>
        <el-col :span="3">
          <el-menu
            router
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#409EFF"
          >
            <el-menu-item-group
              v-for="(item, index) in indexRoutes"
              :key="index + ''"
            >
              <!-- 路径前面要加上 /    /代表根路径 -->
              <el-menu-item
                :class="menuIndex == index ? 'el-menu-active2' : ''"
                :index="item.path"
                @click="menuIndex = index"
              >
                {{ item.name }}
              </el-menu-item>
            </el-menu-item-group>
          </el-menu>
        </el-col>
        <el-col
          :span="20"
          style="background-color:rgb(240, 254, 255);height:600px;"
        >
          <keep-alive>
            <router-view v-if="$route.meta.include"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.include"></router-view>
        </el-col>
      </el-row>
    </div>
    <!-- 固定定位 -->
    <RightFixed></RightFixed>
    <Footer></Footer>
  </div>
</template>
<script>
import Nav from '../components/nav.vue'
import RightFixed from '../components/fixed-right.vue'
import Footer from '../components/footer.vue'
export default {
  components: {
    Nav,
    RightFixed,
    Footer
  },
  data() {
    return {
      activeName: 'first',
      user_data: this.$store.state.account,
      Shop: this.$store.state.Commoditys,
      Order: '',
      indexRoutes: [
        { path: '/backStage/personal', name: '个人中心' },
        { path: '/backStage/user', name: '账号管理' },
        { path: '/backStage/shopCar', name: '购物车' },
        { path: '/backStage/order', name: '订单管理' },
        { path: '/backStage/shop', name: '商品管理' }
      ],
      menuIndex: 0
    }
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1)
    }
  },
  created() {
    if (this.$store.state.user) {
      return
    }
    this.$router.push('/')
  }
}
</script>
<style>
#backstage {
  display: flex;
  flex-direction: column;
}

.el-menu-vertical-demo {
  height: 600px;
}

/* .el-menu-active2{
    background-color: red;
    border: 1px solid red;
} */
</style>

<template>
  <div id="register">
    <div class="register">
      <h2 :style="{ 'text-align': 'center' }">注册</h2>
      <div>
        <span id="user" class="user">手机号:</span>
        <el-input :style="{ width: '300px' }" v-model="userPhone" />
      </div>
      <div>
        <span id="user" class="user">用户名:</span>
        <el-input :style="{ width: '300px' }" v-model="newuser" />
      </div>
      <div>
        <span id="password" class="user">密 码:</span>
        <el-input v-model="newpassword" :style="{ width: '300px' }" />
      </div>
      <el-button class="button" type="primary" v-on:click="addaccount">注册</el-button>
      <div style="display: flex; justify-content: space-between; padding-bottom: 20px;">
        <el-link type="primary" @click="$router.push('/')">返回首页</el-link>
        <el-link type="primary" @click="$router.push('/Login')">已有账号，前往登录</el-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//发送表单数据使用qs
import qs from 'qs'
export default {
  name: 'Home',
  data() {
    return {
      newuser: '',
      newpassword: '',
      userPhone: '',
      reg_show: false
    }
  },
  methods: {
    addaccount() {
      let rex = new RegExp(/^1[3-9][0-9]{9}$/)
      if (rex.test(this.userPhone)) {
        let adduser2 = {
          username: this.newuser,
          password: this.newpassword,
          userPhone: this.userPhone
        }
        if (
          !this.$store.state.account.some((element) => {
            return element.Username == adduser2.username
          })
        ) {
          this.$store.commit({
            type: 'adduser', //方法
            adduser: adduser2
          })
          let parms = qs.stringify(adduser2)
          this.axios.post('api/post', parms).then((res) => {})
          this.$store.state.account.push({
            Username: this.newuser,
            Password: this.newpassword
          })
          this.$router.push('/Login')
          ;(this.newuser = ''), (this.newpassword = '')
          alert('注册成功')
        } else {
          window.alert('用户已存在')
        }
      } else {
        window.alert('请输入正确的手机号码')
      }
    }
  }
}
</script>
<style scoped>
#register {
  background: url('../assets/img/bg-login.png') no-repeat center/100% 100%;
  position: relative;
  height: 100vh;
  width: 100vw;
}

.user {
  display: inline-block;
  width: 100px;
}
.register {
  position: absolute;
  background-color: white;
  width: 450px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
}

.register div {
  margin: 0 auto;
  width: 400px;
  padding-bottom: 10px;
}

.button {
  text-align: center;
  margin-bottom: 20px;
  width: 150px;
}
</style>

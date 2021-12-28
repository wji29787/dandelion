<template>
  <div class="login">
    <!-- <a-button type="primary" @click="login">登录</a-button> -->
    <h2 class="title">
       核生化应急救援数据平台
    </h2>
          <a-form
            :model="formState"
            name="normal_login"
           
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
             class="login-form"
          >
            <a-form-item
              label=""
              name="username"
              :rules="[{ required: false, message: 'Please input your username!' }]"
            >
               <a-input v-model:value="formState.username">
                <template #prefix>
                  <UserOutlined class="site-form-item-icon" />
                </template>
              </a-input>
            </a-form-item>

            <a-form-item
              label=""
              name="password"
              :rules="[{ required: false, message: 'Please input your password!' }]"
            >
              <a-input-password v-model:value="formState.password">
                <template #prefix>
                  <LockOutlined class="site-form-item-icon" />
                </template>
              </a-input-password>
            </a-form-item>

            <!-- <a-form-item name="remember" >
              <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
            </a-form-item> -->

            <a-form-item >
              <a-button  type="primary" html-type="submit" class="login-form-button">登录</a-button>
            </a-form-item>
          </a-form>
  
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import {  reactive } from 'vue';
import {  useStore } from 'vuex';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
const router = useRouter();
const store = useStore();
 const formState = reactive({
      username: '',
      password: '',
      // remember: true,
    });

  const login = () => {
    localStorage.token = "123456";
     store.commit('commons/save',{
       lastLoginTime:new Date()
     }) 
    router.replace({
      name: "KnowledgeGraph",
    });
  };
     const onFinish = values => {
       login()
      console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };

</script>
<style scoped lang="less">
  .login {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    min-width: 900px;
    // min-width: 1920px;
    background-image: url(./img/login.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;
    opacity: 0.9;
    .title {
      margin-top: 4vh;
      text-align: center;
      color: #fff;
      font-size: 60px;
      word-spacing: 10px;
    }
    .login-form {
     max-width: 300px;
     min-width: 200px;
      position: absolute;
      top:32vh;
      left: 64vw;
          // width: 400px;
          // height: 300px;
    }
    .login-form-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .login-form-forgot {
      margin-bottom: 24px;
    }
    .login-form-button {
      width: 100%;
    }
  }
</style>
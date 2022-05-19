<template>
  <a-form
      :model="formState"
      v-bind="layout"
      name="normal_login"
      class="login-form"
      :validate-messages="validateMessages"
      @finish="onFinish"
      style="text-align: left"
  >
    <!-- 用户名 -->
    <a-form-item :name="['user', 'username']" label="用户名" ref="用户名">
      <a-input v-model:value="formState.user.userName" />
    </a-form-item>

    <!-- 密码 -->
    <a-form-item label="密码" name="['user', 'password']" ref="密码">
      <a-input-password v-model:value="formState.user.password">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input-password>
    </a-form-item>
    
    <!-- 重复密码 -->
    <a-form-item label="重复密码" name="['user', 'repassword']" ref="重复密码">
      <a-input-password v-model:value="formState.user.repassword">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input-password>
    </a-form-item>

    <!-- 电话号码 -->
    <a-form-item :name="['user', 'repassword']" label="电话号码" ref="电话号码">
      <a-input v-model:value="formState.user.phone" />
    </a-form-item>

    <!-- 邮箱 -->
    <a-form-item :name="['user', 'phone']" label="邮箱" ref="邮箱">
      <a-input v-model:value="formState.user.email" />
    </a-form-item>

    <!-- 签名 -->
    <a-form-item :name="['user', 'signature']" label="签名" ref="签名">
      <a-textarea v-model:value="formState.user.signature" />
    </a-form-item>

    <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 11 }">
      <a-button type="primary" html-type="submit" @click="Register">注册</a-button>
      &nbsp;&nbsp;
      <a-button type="primary" html-type="submit" @click="this.$router.push('/LRPage')">返回</a-button>
    </a-form-item>
  </a-form>
</template>
<script >
import { defineComponent, reactive } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';

import request from '../utils/request';
import md5 from 'js-md5';
import { message } from 'ant-design-vue';

export default {
  name:'Register',
  component:{
    LockOutlined
  },
  setup() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const validateMessages = {
      required: '${label} is required!',
      types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    };

    const formState = reactive({
      user: {
        userName: '',
        password:'',
        repassword:'',
        phone:'',
        email: '',
        signature:''
      },
    });
    const onFinish = (values) => {
      console.log('Success:', values);
    };
    return {
      formState,
      onFinish,
      layout,
      validateMessages,
    };
  },
  methods: {
    Register:function(){
      //拷贝对象
      let user=Object.assign({}, this.formState.user)
      //判断表单是否为空
      for(let key in user){
        if(user[key]==''){
          message.warning('填写信息不完全!',1)
          return
        }
      }
      //判断两次输入密码是否一致
      if(user.password!=user.repassword){
        message.warning('两次输入密码不一致!',1)
        return
      }
      //发送请求注册
      user.password=md5(user.password)
      user.repassword=md5(user.repassword)
      request.post('/user/register',user).then(res=>{
        if(res['succes']){
          message.success('注册成功!',1)
        }else if(res['code']=='Q00500'){
          message.error('用户名已存在!',1)
        }else{
          message.error('注册失败!',1)
        }
      })
    }
  },
};
</script>


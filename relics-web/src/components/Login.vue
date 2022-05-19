<template>
  <a-form
      :model="formState"
      name="normal_login"
      class="login-form"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      style="text-align: left"
  >
    <a-form-item
        label="用户昵称"
        name="username"
        :rules="[{ required: false, message: '请输入用户名!' }]"
    >
      <a-input v-model:value="formState.userName">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item
        label="用户密码"
        name="password"
    >
      <a-input-password v-model:value="formState.password">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input-password>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 5}">
      <a-button  type="primary" html-type="submit" class="login-form-button" @click="login">
        登录
      </a-button>
      &nbsp;&nbsp;
      <a-button  type="primary" html-type="submit" class="login-form-button" @click="$router.push('/RegisterPage')">
        注册
      </a-button>
      &nbsp;&nbsp;
      <a-button  type="primary" html-type="submit" class="login-form-button" @click="$router.push('/')">
        返回主页面
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script >
import { defineComponent, reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import request from '../utils/request';
import { message } from 'ant-design-vue';
import md5 from 'js-md5';

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
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

    let formState = reactive( {
      userName: '',
      password: '',
      remember: true,
    });
    const onFinish = (values) => {
      // console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    const disabled = computed(() => {
      // return !(formState.userName && formState.password);
    });
    return {
      formState,
      onFinish,
      onFinishFailed,
      disabled,
    };
  },
  methods:{
    login:function(){
      //检查用户名、密码是否为空
      if(this.disabled){
        message.warning('用户名与密码不能为空!',1);
        return
      }else{
        //拷贝对象
        let user=Object.assign({}, this.formState)
        user.password=md5(user.password)
        
        //发送登录请求
        request.post('/user/login',user).then(res=>{
          //判断是否登录成功
          if(res['msg']=='success'){
            message.success('登录成功！')
            user['loginId']=res['data']['loginId']
            this.$store.commit('Login',user)

            this.$router.push('/')
          }else{
            message.success('登录失败！')
          }
        })
      }

      
    }
  }
});
</script>


<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#components-form-demo-normal-login .login-form-forgot {
  margin-bottom: 24px;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>

<template>
    <div class="login">
        <div class="logBoxHead">
            <div class="loginBox">
                <h1 class="logBoxlLogo"><a href="javascript:" class="logo">智谷科技</a></h1>
                <div class="logoNav">欢迎回来</div>
            </div>
        </div>
        <Row class='login-body'>
            <Col span='12' class='login-body-left'>
                <div class="login-bg"></div>
            </Col>
            <Col span='12' class='login-body-right'>
                <div class="login-info">
                    <Form ref="loginInfo" :model="loginInfo" :rules="relInfo">
                        <Form-item prop="name">
                            <Input type="text" size='large' v-model="loginInfo.name" placeholder="请输入用户名">
                            </Input>
                        </Form-item>
                        <Form-item prop="password">
                            <Input type="password" size='large' v-model="loginInfo.password" placeholder="请输入密码">
                            </Input>
                        </Form-item>
                        <div class="control">
                            <div class="forget">
                                <a href="javascript:" class="forget_pwd">忘记密码？</a>
                            </div>
                        </div>
                        <Form-item>
                            <Button type="primary" size='large' shape="circle" @click="handleSubmit('loginInfo')" long class='toLogin'>登录</Button>
                        </Form-item>
                    </Form>
                </div>
            </Col>
        </Row>

    </div>
</template>

<script>
    import api from '@/api/api'
export default {
    mounted () {
        // var kid = this.$route.params.id;
    },
    data () {
            return {
                loginInfo: {
                    name: '',
                    password: '' ,
                    keyId : this.$route.params.id,
                    // token_id : 'aaavvbb'
                },
                relInfo: {
                    username: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    pwd: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    const _this = this;

                    if (valid) {

                        this.axios(api.login,{params : this.loginInfo})
                            .then(function(res) {
                                var data = res.data;
                                console.log(data);
                                if(data.status == 1) {
                                    console.log(data);
                                    _this.$store.commit('login', data.datas.token_id);
                                    _this.$store.commit('saveUser',data.datas.user);
                                    _this.$store.commit('saveCorp',data.datas.corp);
                                    var user = JSON.stringify(data.datas.user);
                                    var corp = JSON.stringify(data.datas.corp);
                                    window.localStorage.setItem('user',user);
                                    window.localStorage.setItem('corp',corp);
                                    _this.$router.push('/');
                                } else if(data.status == 0) {
                                    _this.$message.error('该用户不存在!');
                                }
                                // console.log(res);
                            })
                            .catch(function (res) {
                                console.log(res);
                            }); 
                        
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .login {
        height: 100%;
    }
    .logBoxHead {
        border-bottom: 1px solid #ddd;
    }
    .loginBox {
        width: 980px;
        height: 72px;
        margin: 0 auto;
        display: flex;
        align-items: center;
    }
    .logBoxHead .logBoxlLogo {
        font-size: 25px;
    }
    .logBoxHead .logo {
        color: #0099ff;
    }
    .logBoxHead .logoNav {
        margin: 20px 30px;
        padding: 0 20px;
        border-left: 1px solid #ddd;
        font-size: 16px;
        line-height: 25px;
    }
    .login-body {
        height: calc(100% - 72px);
        background: #f1f1f1;
        min-height: 500px;
    }
    .login-body .ivu-row {
        height: 100%;
    }
    .login-body .ivu-col {
        height: 100%;
    }
    .login-body .login-body-left {
        text-align: right;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login-body-left .login-bg {
        display: inline-block;
        width: 400px;
        height: 400px;
        margin: 50px 50px;
        background: url('../../assets/img/pic-login-bg.png');
    }
    .login-body .login-body-right {
        position: relative;
    }
    .login-body .login-body-right .login-info {
        width: 360px;
        height: 325px;
        padding: 60px 30px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background: #fff;
        box-shadow: 0 0 20px rgba(0,0,0,.5);
        font-size: 14px;
        color: #ddd;
    }
    .login-info .control {
        margin-bottom: 20px;
    }
    .forget {
        text-align: right;
    }
    .forget_pwd {
        color: #0099ff;
    }
    .toLogin {
        padding: 10px 20px;
        font-size: 16px;
    }
</style>
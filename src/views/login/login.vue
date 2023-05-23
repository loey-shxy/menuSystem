<template>
  <div class="wrap login-wrap">
        <div class="login-content">
            <div class="login-div flex">
                <div class="bg"></div>
                <div class="login-info flex-one">
                    <div  style="height:100%;" v-if="type === 1">
                        <div class="login-img"></div>
                        <el-form  class="ordinary-login login-message" :model="loginForm" ref="loginFormRef" status-icon :rules="loginRules" >
                            <el-row>
                                <el-col>
                                    <el-form-item prop="username" class="username message">
                                        <el-input 
                                        type="text" 
                                        @keyup.enter.native="submitForm" 
                                        placeholder="请输入您的手机号" 
                                        v-model="loginForm.username" 
                                        :prefix-icon="Iphone"
                                        auto-complete="off">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item prop="password" class="password message">
                                        <el-input
                                        @keyup.enter.native="submitForm" 
                                        type="password" 
                                        placeholder="请输入密码" 
                                        v-model="loginForm.password" 
                                        :prefix-icon="Lock"
                                        auto-complete="off">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item >
                                        <div class="flex justify-center w-100">
                                            <div style="width:100%;color: #FFFFFF;" class="btn background-color" @click="submitForm">登录</div>
                                        </div>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item >
                                        <div class="flex justify-content w-100">
                                            <a class="font-color"  @click="findPasswordBtn">忘记密码</a>
                                            <a class="font-color"  @click="registerBtn">注册</a>
                                        </div>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                    <el-form  style="margin-top:.7rem;" v-else class="ordinary-login login-message pass-message" :model="addData" ref="rulesForm" status-icon :rules="rulesDialog" >
                        <el-row type="flex" :gutter="100">
                            <el-col >
                                <el-form-item prop="tel" class="email message">
                                    <el-input placeholder="请输入您的手机号" v-model="addData.tel" @keyup.enter.native="checkMsg()">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type="flex" :gutter="100">
                            <el-col >
                                <el-form-item  prop="validCode" class="code message">
                                    <el-input maxlength=6  placeholder="验证码" v-model="addData.validCode" @keyup.enter.native="checkMsg()">
                                        <el-button v-if="condition.codeFalg" class="send-code" slot="append" @click="sendCode()">{{condition.codeTxt}}</el-button>
                                        <el-button v-if="!condition.codeFalg" class="font-color" slot="append" @click="sendCode()">{{condition.codeTxt}}</el-button>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row >
                            <el-col>
                                <el-form-item  prop="newPassword">
                                    <el-input v-model="addData.newPassword" type="password" placeholder="请输入新密码"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
    
                        <el-row >
                            <el-col>
                                <el-form-item  prop="confirmPassword">
                                    <el-input v-model="addData.confirmPassword"  type="password" placeholder="确认新密码"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
    
                        <div class="operation" style="padding-top:0;margin: .2rem auto 0;" >
                            <div  style="width:100%;color: #FFFFFF;" class="btn background-color" @click="checkMsg()">确定</div>
                            <div  style="margin-top:0.3rem;margin-left:0;width:100%;" class="reset btn " @click="type = 1">取消</div>
                        </div>
                        
                    </el-form>
                </div>
            </div>
        </div>
    
    
    
        <el-dialog  :title="dialogTitle" :visible.sync="acceptFlag" :modal-append-to-body="false" class="dialog add-page register-page">
            <el-form :model="addData" ref="rulesForm"  status-icon size="mini"  label-width="1.6rem" :rules="rulesDialog" >
                <div v-if="dialogType === 1" class="dialog-div" style="padding: .2rem;">
                    <div class="title">基础信息</div>
                    <el-row type="flex" :gutter="100">
                        <el-col >
                            <el-form-item label="用户类型" prop="userType">
                                <el-radio v-model="addData.userType" label="2">会员</el-radio>
                                <el-radio v-model="addData.userType" label="3">供应商</el-radio>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" :gutter="100">
                        <el-col >
                            <el-form-item label="用户名" prop="userName">
                                <el-input  v-model="addData.userName"  placeholder="请输入用户名"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" :gutter="100">
                        <el-col >
                            <el-form-item label="密码" prop="password">
                                <el-input type="password" v-model="addData.password"  placeholder="请输入密码"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" :gutter="100">
                        <el-col>
                            <el-form-item label="真实姓名" prop="trueName">
                                <el-input  v-model="addData.trueName"  placeholder="请输入真实姓名"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" :gutter="100" >
                        <el-col >
                            <el-form-item label="电话" prop="tel" class="email message">
                                <el-input placeholder="电话" v-model="addData.tel" @keyup.enter.native="checkMsg()">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                
                    <!--<el-row type="flex" :gutter="100" v-else>-->
                        <!--<el-col >-->
                            <!--<el-form-item label="电话"  class="email message">-->
                                <!--<el-input placeholder="电话" v-model="addData.tel" @keyup.enter.native="checkMsg()">-->
                                <!--</el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                    <!--</el-row>-->
                
                    <el-row type="flex" :gutter="100" >
                        <el-col >
                            <el-form-item label="验证码" prop="validCode" class="code message">
                                <el-input maxlength=6  placeholder="验证码" v-model="addData.validCode" @keyup.enter.native="checkMsg()">
                                    <el-button v-if="condition.codeFalg" class="send-code" slot="append" @click="sendCode()">{{condition.codeTxt}}</el-button>
                                    <el-button v-if="!condition.codeFalg" class="font-color" slot="append" @click="sendCode()">{{condition.codeTxt}}</el-button>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div class="title ">扩展信息</div>
                    <el-row type="flex" :gutter="30">
                        <el-col >
                            <el-form-item label="企业名称" prop="companyName" v-if="addData.userType === '2' || addData.userType === 2">
                                <el-input v-model="addData.companyName"  placeholder="请输入企业名称"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                
                    <el-row type="flex" :gutter="30">
                        <el-col >
                            <el-form-item label="email" prop="email">
                                <el-input  v-model="addData.email"  placeholder="请输入邮箱"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col >
                            <el-form-item label="地址" prop="address">
                                <el-input  v-model="addData.address"  placeholder="请输入地址"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                
                    <el-row type="flex" :gutter="30" v-if="addData.userType === '3' || addData.userType === 3">
                        <el-col >
                            <el-form-item label="单位开票的税务登记号" prop="taxNo">
                                <el-input  v-model="addData.taxNo"  placeholder="请输入单位开票的税务登记号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col >
                            <el-form-item label="注册机构代码" prop="registryNo">
                                <el-input  v-model="addData.registryNo"  placeholder="请输入注册机构代码"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                
                    <el-row type="flex" :gutter="30" v-if="addData.userType === '3' || addData.userType === 3 ">
                        <el-col >
                            <el-form-item label="营业执照" prop="businessLicense">
                                <el-input  v-model="addData.businessLicense"  placeholder="请输入营业执照"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col >
                            <el-form-item label="卫生经验许可证" prop="healthExpLicence">
                                <el-input  v-model="addData.healthExpLicence"  placeholder="请输入卫生经验许可证"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                
                    <el-row type="flex" :gutter="30" v-if="addData.userType === '3' || addData.userType === 3">
                        <el-col >
                            <el-form-item label="身份证" prop="idcardNo">
                                <el-input  v-model="addData.idcardNo"  placeholder="请输入身份证"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col >
                            <el-form-item label="健康证" prop="healthLicence">
                                <el-input  v-model="addData.healthLicence"  placeholder="请输入健康证"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div v-else class="dialog-div" style="padding: 20px 20%;">
                    <el-row type="flex" :gutter="100">
                        <el-col >
                            <el-form-item label="电话" prop="tel" class="email message">
                                <el-input placeholder="电话" v-model="addData.tel" @keyup.enter.native="checkMsg()">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" :gutter="100">
                        <el-col >
                            <el-form-item label="验证码" prop="validCode" class="code message">
                                <el-input maxlength=6  placeholder="验证码" v-model="addData.validCode" @keyup.enter.native="checkMsg()">
                                    <el-button v-if="condition.codeFalg" class="send-code" slot="append" @click="sendCode()">{{condition.codeTxt}}</el-button>
                                    <el-button v-if="!condition.codeFalg" class="font-color" slot="append" @click="sendCode()">{{condition.codeTxt}}</el-button>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-bottom:12px;">
                        <el-col>
                            <el-form-item label="新密码" prop="newPassword">
                                <el-input v-model="addData.newPassword" type="password" placeholder="请输入新密码"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                
                    <el-row style="margin-bottom:12px;">
                        <el-col>
                            <el-form-item label="确认新密码" prop="confirmPassword">
                                <el-input v-model="addData.confirmPassword"  type="password" placeholder="确认新密码"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
            
                </div>
            </el-form>
        
            <div class="operation" style="padding-top:0;margin: 0 auto;" >
                <div class="operation-btn flex" style="margin-top: 30px;">
                    <div v-if="dialogType === 1" class="save btn background-color" @click="checkMsg()">确定</div>
                    <div v-else class="save btn background-color" @click="checkMsg()">确定</div>
                    <div class="reset btn" style="margin-right:10px;" @click="acceptFlag = false">取消</div>
                </div>
            </div>
        </el-dialog>

        
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()

import { useStore } from '@/store/index'
const store = useStore()

import { phoneRules, writeLocalStorage } from '@utils/common'
import { loginApi, userInfoApi } from '@/apis/common'
import { Iphone, Lock } from '@element-plus/icons-vue'


let dialogTitle = ref('')
let acceptFlag = ref(false)
let dialogType = ref('')
let acceptFlagLogin = ref(false)


const condition = reactive({
  codeFalg: false,
  codeTxt: '发送验证码',
  time: 60,
  totalTime: 60,
  timerFlag: false
})

const addData = reactive({
  userType: '2'
})


const rulesDialog = reactive({
  userName: [
    {required: true, message: "请输入用户名", trigger:['blur','focus']}
  ],
  password: [
    {required: true, message: "请输入密码", trigger:['blur','focus']}
  ],
  trueName: [
    {required: true, message: "请输入真实姓名", trigger:['blur','focus']}
  ],
  companyName: [
    {required: true, message: "请输入企业名称", trigger:['blur','focus']}
  ],
  
  tel:[
    {required: true, message: "请输入电话", trigger:['blur','focus']},
    {validator: (rule, value, callback) => {
        if (value && phoneRules(value)) {
          callback()

          if (condition.time === condition.totalTime) {
            condition.codeFalg = true
          } else {
            callback(new Error('请输入正确的手机号码'))
          }
        }
      },  message: "请输入正确的手机号",trigger: ['blur','focus']}
  ],
  validCode: [
    {required: true, message: "请输入验证码", trigger:['blur','focus']}
  ],
  newPassword: [
    {required: true, message: "请输入新密码", trigger:['blur','focus']}
  ],
  confirmPassword: [
    {required: true, message: "再次确认新密码", trigger:['blur','focus']}
  ],
})


// 登录
let loginFormRef = ref(null)
let loginForm = reactive({
  username: '',
  password: ''
})
const loginRules = reactive({
  username: [
    {required: true, message: "请输入用户名", trigger:['blur','focus']}
  ],
  password: [
    {required: true, message: "请输入密码", trigger:['blur','focus']}
  ]
})
const submitForm = async () => {
  await loginForm.value?.validate()

  const { success } = await loginApi(loginForm)
  if (success) {
    requestUserType()
  }
}

let type = ref(1)
const requestUserType = async () => {
  const { success, data } = await userInfoApi(loginForm)
  if (success) {
    writeLocalStorage(userMessage, data)
    store.setUserInfo(data)
    acceptFlagLogin = false
    router.replace({ name: 'home' })
  }
}
</script>
<style scoped>
    .login-wrap {
        background: #e6f2fe;
        height: 100vh;
    }
    .login-content {
        padding-top: 0.1px;
        height: 100vh;
    }
    .login-div {
        margin: calc(10% - .9rem) auto;
      
        padding: .25rem .15rem;
        width: 60%;
        height:calc(80% - .5rem);
        min-height: 6rem;
        background: #ffffff;
        border-radius: .35rem;
    }
    .bg {
        width: 48%;
        height: 100%;
        background: url("../../assets/img/login/bg.png");
        background-size: 100% 100%;
    }
    .login-info {
        margin: 0 8.6%;
    }
    .login-img {
        height:41.86%;
        background: url("../../assets/img/login/pic-login.png");
        background-size: 1.09rem 1.52rem;
        background-position: 50%;
        background-repeat: no-repeat;
    }

    .login-content /deep/ .el-icon svg {
      width: .25rem;
      height: .25rem;
    } 
</style>
import { WebHttp } from '@utils/request'
import { handlerObjectData } from '@utils/request-utils.js'

// 登录
export async function loginApi(data, loading = true) {
  return handlerObjectData(
    await WebHttp.request({
      url: '/background/login',
      method: 'post',
      data,
      loading
  }))
}

// 获取用户类型
export async function userInfoApi(data, loading = true) {
  return handlerObjectData(
    await WebHttp.request({
      url: '/background/User/detail',
      method: 'post',
      data,
      loading
    })
  )
}
import { WebHttp } from '@utils/request'
import { handlerArrayData } from '@utils/request-utils.js'

// 菜谱
export async function menuListApi(data, loading = true) {
  return handlerArrayData(
    await WebHttp.request({
      url: '/background/Menu/sortMenu',
      method: 'post',
      data,
      loading
    })
  )
}

// 菜品类型
export async function dishesTypeApi(data, loading = true) {
  return handlerArrayData(
    await WebHttp.request({
      url: '/background/Menu/DishesClass/getClasses',
      method: 'post',
      data,
      loading
    })
  )
}

// 菜品
export async function homeDishesApi(data, loading = true) {
  return handlerArrayData(
    await WebHttp.request({
      url: '/background/Dishes/getDishesForHome',
      method: 'post',
      data,
      loading
    })
  )
}
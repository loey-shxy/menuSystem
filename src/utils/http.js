import axios from 'axios'
import { ElMessage } from 'element-plus'
import loading from './loading'
import isArray from 'lodash/isArray'
import { isObject } from 'lodash'

let loadingTimer = null
let loadingOpenedCount = 0

class Http {
  baseURL = ''
  constructor(baseURL = '/') {
    this.baseURL = baseURL
  }


  getInsideConfig() {
    const config = {
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }

    return config
  }

  interceptors(instance) {
    instance.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        return Promise.resolve(error)
      }
    )

    // 响应拦截器
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log(error)
        const { response } = error
        let message = '请求超时或服务器异常，请检查网络或联系管理员！'
        switch (response.status) {
          case 401:
            message = '登录超时，请重新登录...'
            break
          case 403:
            message = '你没有权限访问，请联系管理员...'
            break
          case 404:
            message = '您访问的资源不存在...'
            break
          case 405:
            message = '服务器,请求方式不支持...'
            break
          case 408:
            message = '请求超时,请稍后再试...'
            break
          case 500:
            message = '服务器忙，请稍后再试...'
            break
          case 504:
            message = '网络超时，请检查API地址是否可访问...'
            break
          default:
            break
        }

        if (error.response.status === 401) {
          ElMessage({
            message: '登录超时，请重新登录！',
            type: 'error',
            onClose: () => {
              location.replace({ name: 'login' })
            },
          })
        } else {
          ElMessage.error(message)
          return Promise.reject(response)
        }
      }
    )
  }

  async request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    let loadingInstance
    if (options.loading) {
      clearTimeout(loadingTimer)
      loadingOpenedCount++
      loadingInstance = loading.show({ text: '加载中，请稍等...', body: false })
    }
    if (options.method === 'get') {
      let params = '?'
      for (const key in options.data) {
        if (key === 'defaultKey') {
          continue
        }
        const val = options.data[key]
        if (key !== 'objDeptIdList') {
          //系统日志管理中objDeptIdList需多次拼接
          params += key + '=' + val + '&'
        } else {
          val.forEach((item) => {
            params += key + '=' + item + '&'
          })
        }
      }
      params = params.slice(0, params.length - 1)
      options.url += params
    }
    try {
      this.interceptors(instance)
      const result = await instance(options)
      result.data.response = result
      return result.data
    } catch (e) {
      return Promise.reject(e)
    } finally {
      if (options.loading) {
        loadingOpenedCount--
        if (loadingOpenedCount <= 0) {
          loadingTimer = setTimeout(() => {
            loading.close(loadingInstance)
          }, 100)
        }
      }
    }
  }

  async upload(options) {
    // 处理上传数据
    const formData = new window.FormData()
    for (const key in options.data) {
      const val = options.data[key]
      if (val instanceof FileList || (isArray(val) && val.length > 0 && val[0] instanceof File)) {
        for (let i = 0; i < val.length; i++) {
          formData.append(key, val[i])
        }
      } else if (val !== null) {
        formData.append(key, val)
      }
    }
    options.data = formData
    options.headers = { 'Content-Type': 'multipart/form-data' }
    return this.request(options)
  }

  /**
   * 解析文件名
   * @param response 响应
   * @param defaultFileName 默认文件名
   * @returns 文件名
   * @private
   */
  parseFileName(response, defaultFileName = '') {
    const {
      headers: { 'content-disposition': contentDisposition },
    } = response
    if (
      typeof contentDisposition !== 'undefined' &&
      contentDisposition !== null &&
      contentDisposition !== ''
    ) {
      // contentDisposition 的内容： attachment;filename=Export_2018-06-22_14:37:24.zip
      const dcs = contentDisposition.split(';')
      for (let i = 0; i < dcs.length; i++) {
        const item = dcs[i]
        if (/^(\s*)filename=/.test(item)) {
          const _filename = item.substr(item.lastIndexOf('=') + 1) // 文件名+后缀
          defaultFileName = decodeURIComponent(_filename)
        }
      }
    }
    return defaultFileName
  }

  /**
   *  Blob 转 JSON
   * @param response 响应
   * @returns {Promise<*>}
   * @private
   */
  async blobToJson(response) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsText(response.data, 'utf-8')
      let result = null

      reader.onload = () => {
        try {
          result = JSON.parse(reader.result)
        } catch (e) {
          //
        }
        resolve(result)
      }
      reader.onerror = () => {
        resolve(result)
      }
    })
  }

  /**
   * 下载文件（文件流）
   * @param options
   * @param mimeType 文件类型
   * @returns {Promise<{}>}
   */
  async download(options, mimeType = '') {
    try {
      // 响应类型
      options.responseType = 'blob'
      const { response } = await this.request(options)
      // TODO 注意 data 不能用解构赋值 const {status,data} = response (不能序列化的错误)
      const { status } = response
      const result = await this.blobToJson(response)
      // 正常情况应该返回的是下载流，如果这个流能被解析为JSON说明返回是 JSON而不是下载流
      // JSON的情况：与API约定：一般情况返回类似这样的JSON {code:'403',data:null,message:'没有权限。'}
      if (status !== 200 || isObject(result)) {
        return { error: true, ...result }
      }
      const fileName = this.parseFileName(response)
      // 示例：downloadFile(response.data, `下载${moment().format('YYYY-MM-DD HH-mm-ss')}.xlsx`, 'application/vnd.ms-excel');
      downloadFile(response?.data, fileName, mimeType)
      return {
        error: false,
        data: { code: '200', data: '', message: '下载成功' },
      }
    } catch (error) {
      if (error.status !== 200) {
        return null
      }
    }
    return {
      error: true,
      data: { code: '10104', data: '', message: '下载失败。' },
    }
  }
}

export default Http
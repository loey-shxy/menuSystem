import http from './http'

const WebHttp = new http(import.meta.env.VITE_WEB_API)
const OssHttp = new http(import.meta.env.VITE_OSS_API)

export { WebHttp, OssHttp }
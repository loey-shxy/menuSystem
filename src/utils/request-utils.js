import { isObject, isArray } from 'lodash'

/**
 * 处理表格数据
 * @param success
 * @param code
 * @param data
 * @returns {{total: number, list: Array}}
 */
const handlerTableData = function (
  { success, code, data },
  preset = { total: 0, list: [] }
) {
  return success && code === 200 && isObject(data) ? data : preset
}

/**
 * 处理返回数组的数据
 * @param success
 * @param code
 * @param data
 * @param preset
 * @returns {Array}
 */
const handlerArrayData = function ({ success, code, data }, preset = []) {
  return success && code === 200 && isArray(data) ? { data, success } : preset
}

/**
 * 处理返回对象的数据
 * @param success
 * @param code
 * @param data
 * @param preset
 * @returns {*}
 */
const handlerObjectData = function ({ success, code, data, msg }) {
  return success && code === 200 && isObject(data) ? data : { code, data, msg, success }
}

/**
 * 处理返回任意类型的数据
 * @param success
 * @param code
 * @param data
 * @param preset
 * @returns {*}
 */
const handlerData = function ({ success, code, data }, preset) {
  return success && code === 200 ? data : preset
}

export { handlerTableData, handlerArrayData, handlerObjectData, handlerData }

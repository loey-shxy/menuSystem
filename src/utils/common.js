
export const phoneRules = (phone) => {
  let rules = /1[0-9]\d{9}$/

  return phone && phone.length >= 11 && rules.test(phone)
}

export const writeLocalStorage = (key, value) => {
  if (value) {
    value = JSON.stringify(value)
    localStorage.setItem(key, value)
  }
}

export const readLocalStorage = (key) => {
  const value = localStorage.getItem(key)
  if (value && value !== undefined && value !== null) {
    return JSON.parse(value)
  }
  return null
}

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key)
}

export const clearLocalStorage = () => {
  localStorage.clear()
}
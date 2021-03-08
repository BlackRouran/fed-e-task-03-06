export const localStorageSet = (key: string, value: any): void => {
  if (value) {
    if (typeof value !== 'string') {
      value = JSON.stringify(value)
    }
  }
  window.localStorage.setItem(key, value)
}

export const localStorageGet = (key: string): any => {
  return window.localStorage.getItem(key)
}

export const localStorageSet = (key: string, value: any): void => {
  if (value) {
    value =   JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

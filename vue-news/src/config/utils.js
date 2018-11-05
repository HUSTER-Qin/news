export default{
  setlocalStorage (obj) {
    window.localStorage.setItem('zhihu2017', JSON.stringify(obj))
  },
  getlocalStorage () {
    return JSON.parse(window.localStorage.getItem('zhihu2017'))
  }
}

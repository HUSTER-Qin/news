<template>
  <div class="home">
    <header class="home-head">
      <mu-appbar class="head-paper">
        <mu-icon-button icon='menu' @click="toggle(true)" slot="left" />
        <span>{{title}}</span>
        <span v-if="activethemeid==0 ?false:true">
                   <mu-icon-button :icon="titlecollects"  slot="right"  @click='titleCollect(null)'></mu-icon-button>
              </span>
  
      </mu-appbar>
  
    </header>
    <section>
      <aside>
        <mu-drawer :open="open" :docked="docked" @close="toggle()">
          <mu-list @itemClick="docked ? '' : toggle()">
            <mu-list-item disableRipple='true' :title="usertitle" @click='homelogin'>
              <mu-avatar slot="left" :src="myron" />
            </mu-list-item>
            <router-link :to="{ name:'hottheme',params:{id:'latest'}} ">
              <mu-flat-button label="首页" icon="home" primary/>
            </router-link>
            <ul>
              <li class="home-li" v-for="item in list" :key="item.id">
                <mu-paper :zDepth="2" class="home-paper">
                  <div class="home-title">
                    <router-link :to="{ name:'theme',params:{id:item.id}}">
                      <mu-flat-button :color="item.id == activethemeid ? 'red': 'grey'" :label="item.name" icon="home" primary/>
                    </router-link>
                  </div>
                  <div class="home-collect">
                    <mu-icon-button :icon="item.themestate ? 'remove' :'add'" slot="right" @click='titleCollect(item.id)'></mu-icon-button>
                  </div>
                </mu-paper>
  
              </li>
            </ul>
          </mu-list>
        </mu-drawer>
      </aside>
      <router-view class="view"></router-view>
    </section>
    <div class="loading" v-if="load">
      <div class="load-inner">
        <p>Loading</p>
        <mu-linear-progress :size='Number(5)' color="red" />
      </div>
  
    </div>
  
  </div>
</template>


<script>
  export default {
    name: 'home',
    data () {
      return {
        list: '',
        open: false,
        docked: true,
        hottheme: '',
        iconclass: 'home-icon',
        add: 'add',
        show: true,
        item: ''
  
      }
    },
    mounted () {
      this.$http.get('/api/4/themes', {
        progress: function (event) {
  
        }
      }).then(function (res) {
        let list = res.body.others
        let opts = this.$store.state.editor
        if (opts) {
          let opt = opts.favorites.theme
          for (let [index, elem] of list.entries()) {
            if (opt.includes(elem.id)) {
              list.splice(index, 1)
              elem.themestate = true
              list.unshift(elem)
            } else {
              elem.themestate = false
            }
          }
        }
        this.list = list
        this.$store.dispatch('setLoad', false)
      }, function (res) {
        console.log(res, '超时')
      })
    },
    beforeRouteEnter (to, from, next) {
      next()
    },
    beforeRouteUpdate (to, from, next) {
      //  this.title =
      this.toggle()
      if (to.name === 'hottheme') {
        this.$store.dispatch('settitle', '首页')
        next()
        return
      }
      for (let item of this.list) {
        if (to.path.split('/')[2] == item.id) {
          this.$store.dispatch('settitle', item.name)
          this.$store.dispatch('activetheme', item.id)
          break
        }
      }
      next()
    },
    computed: {
      activethemeid () {
        return this.$store.state.activethemeid
      },
      load () {
        return this.$store.state.load
      },
      title () {
        return this.$store.state.title
      },
      titlecollects () {
        let opts = this.$store.state.editor
        if (opts) {
          if (opts.favorites.theme.includes(this.$store.state.activethemeid)) {
            return 'remove'
          } else {
            return 'add'
          }
        } else {
          return 'add'
        }
      },
      myron () {
        let opts = this.$store.state.editor
        if (opts) {
          return opts.headiconurl
        } else {
          return '../../static/logo.png'
        }
      },
      usertitle () {
        let opts = this.$store.state.editor
        if (opts) {
          return opts.name
        } else {
          return '未登录'
        }
      }
  
    },
    methods: {
      homelogin () {
        let opts = this.$store.state.editor
        if (!opts) {
          this.$router.push({name: 'login'})
          this.$router.go(1)
        } else {
          return
        }
      },
      toggle (flag) {
        this.open = !this.open
        this.docked = !flag
      },
      collect () {
  
      },
      titleCollect (val) {
        let opts = this.$store.state.editor
        let activethemeid = val || this.$store.state.activethemeid
        let _this = this
        if (opts) {
          let opt = opts.favorites.theme
          if (opt.includes(activethemeid)) {
            // 已经收藏
            var a = opt.findIndex((value, index, arr) => value == activethemeid)
            opts.favorites.theme.splice(a, 1)
            this.list.findIndex(function (value, index, arr) {
              if (value.id == activethemeid) {
                _this.list.splice(index, 1)
                value.themestate = false
                _this.list.push(value)
                return
              }
            })
          } else {
            // 没有收藏
            this.list.findIndex(function (value, index, arr) {
              if (value.id == activethemeid) {
                _this.list.splice(index, 1)
                value.themestate = true
                _this.list.unshift(value)
                return
              }
            })
            opts.favorites.theme.push(activethemeid)
          }
          // ajax
          // 发送收藏theme ID 和用户名
  
          this.$store.dispatch('seteditor', opts)
          let opttheme = {
            name: this.$store.state.editor.name,
            theme: this.$store.state.editor.favorites.theme
          }
          this.$http.post('/themecollect', opttheme).then(function (res) {
            console.log(res)
          }, function (res) {
            console.log(res)
          })
        } else {
          // 登陆
          this.$router.push({
            name: 'login'
          })
          this.$router.go(1)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
  @import '/static/style/home.css';
</style>

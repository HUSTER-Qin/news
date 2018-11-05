<template>
<div class="news">
<link rel="stylesheet" :href="css">
<header class="news-head">
        <mu-appbar>
          <mu-icon-button icon='arrow_back' slot="left" @click='goback'/>
          <mu-icon-button slot="right" @click='collects'>
            <i  class=" material-icons" :class='collectclass'>grade</i>
          </mu-icon-button>
         
          <mu-icon-button icon='share' slot="right"/>
            <mu-badge :content="bedger.comments" circle secondary slot="right">
                 <mu-icon-button icon='sms'  /> 
            </mu-badge>
             <mu-badge :content="bedger.popularity" circle secondary slot="right">
                 <mu-icon-button icon='thumb_up' /> 
            </mu-badge>
        </mu-appbar>
</header>
  <div class="news-content" v-html="showbody" > 
   
   
  </div>
 
</div>

</template>

<script>
export default {
  name: 'news',
  data () {
    return {
      bedger: {
        comments: '',
        popularity: ''
      },
      item: '',
      css: '',
      collectclass: '',
      showbody: null
    }
  },
  mounted () {
    var id = this.$route.params.id
    this.$http.post('/api/4/news/', {id: id}).then(function (res) {
      this.item = res.body
      this.showbody = this.item.body.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) {
        return '<img  src="/image?img=' + capture + ' "/>'
      })
      this.css = res.body.css[0]
      return this.$http.get('/api/4/story-extra/?id=' + id)
    }, function (res) {
      console.log(res)
    }).then(function (res) {
      this.bedger = {
        comments: String(res.body.comments),
        popularity: String(res.body.popularity)
      }
    }, function (res) {
      console.log(res)
    })
    let opts = this.$store.state.editor
    if (opts) {
      let opt = opts.favorites.news
      for (let i in opt) {
        if (opt[i] == id) {
              // 取消
          this.collectclass = 'oncollectclass'
          break
        } else {         // 收藏
          this.collectclass = 'offcollectclass'
        }
      }
    }
  },
  methods: {
    goback () {
      window.history.go(-1)
    },
    collects () {
      let opts = this.$store.state.editor
      // 收藏
      // 判断是否登陆
      if (opts) {
        if (!opts.favorites.news.includes(this.$route.params.id)) {
          this.collectclass = 'oncollectclass'
          opts.favorites.news.push(this.$route.params.id)
          this.$store.dispatch('seteditor', opts)
        } else {
          var a = opts.favorites.news.findIndex((value, index, arr) => value == this.$route.params.id)
          opts.favorites.news.splice(a, 1)
          this.$store.dispatch('seteditor', opts)
          this.collectclass = 'offcollectclass'
        }
        let opt = {
          name: this.$store.state.editor.name,
          news: this.$store.state.editor.favorites.news
        }
        this.$http.post('/collects', opt).then(function (res) {
          if (res.body.code == '0') {
              // 失败
          } else if (res.body.code == '1') {

          } else {
              // 系统错误
          }
        }, function (res) {

        })
        // ajax
      } else {
// 跳转路由
        this.$router.push({name: 'login'})
        this.$router.go(1)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
    @import  '../../../static/style/news.css'
</style>

  

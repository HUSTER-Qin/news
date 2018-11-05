<template>
  <div class="theme" @scroll='loadMore($event)'> 
      <mu-card-media :title="item.description" :subTitle="item.name">
    <img :src="IMG" />
  </mu-card-media>
  <div class="theme-author">
    <mu-list>
      <ul class="theme-author-ul">
        <li v-for="editor in item.editors">
            <img :src='"/image?img="+ editor.avatar' alt="">
        </li>
      </ul>
     
    </mu-list>
  </div>
      <ul class='theme-ul'>
          <li  v-for="item in item.stories" :key="item.id">
         <mu-paper class="demo-paper" :zDepth="2" >
              <router-link :to="{ name:'news',params: { id: item.id }}">
                <div class="theme-item">
                    <p><span>{{item.title}}</span> </p>
                   <img v-for="img0 of item.images" :src='"/image?img="+img0' alt="">
                </div>     
               </router-link>
          </mu-paper>
          </li> 
      </ul> 
  </div>
</template>

<script>
// import IMG from '../../static/img/banner.jpg'
import myron from '../../static/img/1.jpg'
export default {
  name: 'theme',
  data () {
    return {
      item: '1',
      myron,
      IMG: '',
      loading: false,
      scroller: null,
      flag: false
    }
  },
  methods: {
    loadMore (e) {
      if (this.flag) {
        return
      }
      let scrollTop = e.target.scrollTop
      let scrollHeight = e.target.scrollHeight
      let clientHeight = e.target.clientHeight

      if (scrollTop + clientHeight + 100 >= scrollHeight) {
        let themeid = this.$store.state.activethemeid
        this.flag = true
        this.$store.dispatch('setLoad', true)
        let opt = {
          themeid: themeid,
          themelastid: this.item.stories[this.item.stories.length - 1].id
        }
     
        this.$http.post('/themebefore', opt)
             .then(function (res) {
               this.flag = false
               this.item.stories = this.item.stories.concat(res.body.stories)
               this.$store.dispatch('setLoad', false)
             }, function (res) {
               console.log(res)
             })
      }
    }

  },
  mounted () {
    let url = null
    url = '/api/4/theme/'
    this.$store.dispatch('setLoad', true)
    this.$http.post(url, {id: this.$route.params.id}, {
      progress: function (event) {
      }
    }).then(function (res) {
      this.item = res.body
      this.IMG = '/image?img=' + res.body.image
      this.$store.dispatch('setLoad', false)
    }, function (res) {
      console.log(res)
    })
  },
  beforeRouteEnter (to, from, next) {
    next(function (vm) {
      vm.$store.dispatch('activetheme', to.params.id)
    })
  },
  beforeRouteUpdate (to, from, next) {
    let top = document.getElementsByClassName('theme')
    top[0].scrollTop = 0
    let url = null
    url = '/api/4/theme/'
    this.$store.dispatch('setLoad', true)
    this.$http.post(url, {id: to.params.id}, {
      progress: function (event) {
      }
    }).then(function (res) {
      this.item = res.body
      this.IMG = '/image?img=' + res.body.image
      this.$store.dispatch('setLoad', false)
    }, function (res) {
      console.log(res)
    })
    next()
  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
@import '/static/style/theme.css';

</style>

<template>
  <div class="theme " @scroll='dropdown($event)'>
  <div style="height:200px;width:100%">
 <Swipe :auto="4000">
  <SwipeItem v-for="item of topitem">
    <img :src='"/image?img="+item.image' alt="" style="width:100%;height:100%;"/>
    <p style="font-size:20px;transform:translateY(-80px);color:white;text-indent:5px;">{{item.title}}</p>
  </SwipeItem>
 
</Swipe>
  </div>
 
  <div class="theme-author">
    <mu-list>
      <mu-list-item title="今日热文" disabled>
         <mu-avatar slot="left" icon='home'/>
      </mu-list-item>
    </mu-list>
  </div class='hottheme-ul'>
      <ul class='theme-ul' > 
          <li  v-for="item1 in item" ::key="item1.id">
         <mu-paper class="demo-paper" :zDepth="2" >
              <router-link :to="{ name:'news',params: { id: item1.id }}">
                <div class="theme-item">
                    <p><span>{{item1.title}}</span> </p>
                     <img :src='"/image?img="+item1.images' alt="">
                </div>     
               </router-link>
          </mu-paper>
          </li>   
      </ul> 
  </div>
  
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui'
export default {
  name: 'hottheme',
  data () {
    return {
      item: '',
      topitem: '',
      flag: false

    }
  },
  components: {
    Swipe,
    SwipeItem
  },
  mounted () {
    if (!this.$store.state.hotthemedata) {
      this.$store.dispatch('setLoad', true)
      let url = '/api/4/news/'
      this.$http.post(url, {id: 'latest'}, {progress: function (event) {
      }
      }).then(function (res) {
        this.item = res.body.stories
        this.topitem = res.body.top_stories
        let opt = {
          item: res.body.stories,
          topitem: res.body.top_stories
        }
        this.$store.dispatch('sethottdate', res.body.date)
        // this.$store.dispatch('sethotthemedata', this.item)
        this.$store.dispatch('sethotthemedata', opt)
        this.$store.dispatch('setLoad', false)
      }, function (res) {
        console.log(res)
      })
    } else {
      this.item = this.$store.state.hotthemedata.item
      this.topitem = this.$store.state.hotthemedata.topitem
    }
  },
  methods: {
    dropdown (e) {
        // alert(1)
      if (this.flag) {
        return
      }
      let scrollTop = e.target.scrollTop
      let scrollHeight = e.target.scrollHeight
      let clientHeight = e.target.clientHeight
      if (!this.$store.state.hotdate) {
        console.log('没有更多了')
        return
      }
      if (scrollTop + clientHeight + 100 >= scrollHeight) {
        this.flag = true
        this.$store.dispatch('setLoad', true)
        this.$http.post('/loadmore', {date: this.$store.state.hotdate})
             .then(function (res) {
               this.flag = false
               this.item = this.item.concat(res.body.stories)
               let opt = {
                 item: this.item,
                 topitem: this.$store.state.hotthemedata.topitem
               }
               this.$store.dispatch('sethotthemedata', opt)
               this.$store.dispatch('sethottdate', res.body.date)
               this.$store.dispatch('setLoad', false)
             }, function (res) {
               console.log(res)
             })
      }
    }
  }
}
</script>
<style scoped>
@import '/static/style/theme.css';

</style>

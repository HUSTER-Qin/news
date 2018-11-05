<template>
  <div class="login">
    <div >
        <mu-tabs class="login-head"  value="activeTab" @change="handleTabChange">
            <mu-tab :class="activeTab=='tab1'? 'bacactive' :'bacFrozen'"  value="tab1"><span class="titlesize">登陆</span></mu-tab>
            <mu-tab :class="activeTab=='tab2'? 'bacactive' :'bacFrozen'"  value="tab2" ><span class="titlesize">注册</span></mu-tab>
        </mu-tabs>
    </div>
    <div class="login-content">
        <div v-if="activeTab === 'tab1'">
          <ul>
            <li><mu-text-field hintText="用户名" autocomplete="off" v-model="zhihuL.user" type="text" icon="group" fullWidth/></li>
             <li>  <mu-text-field hintText="密码" autocomplete="off" type="password" v-model="zhihuL.pwd" icon="vpn_key" fullWidth/></li>
              <li> <mu-radio label="记住密码" name="group" v-model="zhihuL.remember" nativeValue="simple1"  class="demo-radio"/></li>
              <li>
                 <!--<mu-raised-button label="登陆" @click='login' fullWidth  primary/>-->
                 <mu-raised-button  label="登陆" @click="login('top')" fullWidth  primary/>
              </li>
          </ul>
         <br/>         
        </div>
        <div v-if="activeTab === 'tab2'">
            <ul>
            <li><mu-text-field hintText="用户名" autocomplete="off" v-model="zhihuR.user" type="text" icon="group" fullWidth/></li>
             <li>  <mu-text-field hintText="密码" autocomplete="off" v-model="zhihuR.pwd" type="password" icon="vpn_key" fullWidth/></li>
             <li> 
               <div class="login-img-upload">
                    <mu-raised-button class="demo-raised-button" label="选择上传头像">
                          <input type="file" ref="slectimg" autocomplete="off" class="file-button" v-model="slectimgModel" @change='slectimg'>
                    </mu-raised-button>
                   <div class="login-img-prv">                 
                       <img  :src="previewimg"/>
                    </div>
               </div>
  
              <li>
                 <mu-raised-button label="注册" @click='register("top")' primary fullWidth/>
              </li>
          </ul>
        </div>
    </div>
    <footer>
  <mu-raised-button  label="回到首页-游客模式"   icon="home" @click='goback' fullWidth  primary/>
    </footer>
     <mu-popup :overlayColor='overlaycolor' position="top" :overlay="false" :popupClass="popuptop" :open="topPopup">
    {{msg}}
  </mu-popup>
</div>
 


</div>
</template>

<script>
// import store from '../vuex/store.js'
import IMG from '../../static/logo.png'
export default {
  name: 'hello',
  data () {
    return {
      activeTab: 'tab1',
      zhihuL: {
        user: '',
        pwd: '',
        remember: 'false'
      },
      zhihuR: {
        user: '',
        pwd: ''
      },
      popuptop: '',
      overlaycolor: '#32CD32',
      topPopup: false,
      msg: '',
      slectimgModel: '',
      previewimg: null,
      file: null
    }
  },
  watch: {
    topPopup (val) {
      if (val) {
        setTimeout(() => {
          this.topPopup = false
        }, 2000)
      }
    }
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
    },
    slectimg (event) {
      this.file = event.target.files[0]
      let rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i
      if (!rFilter.test(this.file.type)) {
        this.msg = '必须是选择一张图片'
        this['topPopup'] = true
        this.popuptop = 'toperror'
        this.file = null
        return
      }
      let _this = this
      var reader = new FileReader()
      reader.readAsDataURL(this.file)
      reader.onload = function (e) {
        if (e.total > 1048576) {
          this.msg = '不能大于1兆'
          this['topPopup'] = true
          this.file = null
          this.popuptop = 'toperror'
          retutn
        }
        _this.previewimg = this.result
      }
    },
    login (position) {
      if (this.zhihuL.user == '' || this.zhihuL.pwd == '') {
        this.msg = '用户名密码不能为空'
        this[position + 'Popup'] = true
        this.popuptop = 'toperror'
        return
      }
      let options = {
        user: this.zhihuL.user,
        pwd: this.zhihuL.pwd
      }
      let _this = this
      this.$http.post('/login', options, {
        progress: function (event) {
        }
      }).then(function (res) {
        if (res.body.code === '1') {
          _this.msg = res.body.msg
          _this[position + 'Popup'] = true
          _this.popuptop = 'topok'
          _this.$store.dispatch('seteditor', res.body)
          setTimeout(function () {
            _this.$router.go(-1)
            _this.zhihuL.pwd = ''
          }, 3000)
        } else {
          _this.msg = res.body.msg
          _this[position + 'Popup'] = true
          _this.popuptop = 'toperror'
        }
      }, function (res) {
        console.log(res)
      })
    },

    register (position) {
      if (this.zhihuR.user == '' || this.zhihuR.pwd == '') {
        this.msg = '用户名密码不能为空'
        this[position + 'Popup'] = true
        this.popuptop = 'toperror'
        return
      }

      let fd = new FormData()
      if (this.file == null) {
        this.msg = '必须选择头像'
        this[position + 'Popup'] = true
        this.popuptop = 'toperror'
        return
      }
      fd.append('imageIcon', this.file)
      fd.append('user', this.zhihuR.user)
      fd.append('pwd', this.zhihuR.pwd)
      let _this = this
      this.$http.post('/register', fd).then(function (res) {
        // this.activeTab = 'tab1'
        // 失败 继续登陆
        _this[position + 'Popup'] = true
        this.popuptop = 'toperror'
        if (res.body.code == '0') {
          // 用户名已经存在
          _this.msg = res.body.msg
          this.popuptop = 'toperror'
        } else if (res.body.code == '2') {
          // 服务器错误
          this.popuptop = 'toperror'
          _this.msg = res.body.msg
        } else if (res.body.code == '1') {
          // 注册成功
          _this.msg = res.body.msg
          this.popuptop = 'topok'
          _this.activeTab = 'tab1'
        }
        this.zhihuL.user = this.zhihuR.user
        this.zhihuL.pwd = this.zhihuR.pwd
      }, function (err) {
        console.log(err)
      })
    },
    goback () {
      this.$router.go(-1)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
width: 100%;
height: 100%;
  
}
.titlesize{
  font-size: 20px;
  color: black; 
}
.login-head{
  height: 50px;
}
.login-content{
  margin-top: 30px;
}
.login-content ul{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.login-content ul li {
  width: 60%;
  margin-top: 20px;
  list-style: none;
}
.login footer{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.bacFrozen{
  /*background-color: #03a9f4;*/
   background-color: white;
}
.bacactive{
  /*background-color: #ff4081;*/
    background-color: #03a9f4;
}
.file-button{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
}

.demo-raised-button {
  margin: 12px;
}
.login-img-upload{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.login-img-prv{
  height: 50px;
  width: 50px;
}
.login-img-prv img{
  width: 100%;
  height: 100%;
}
</style>

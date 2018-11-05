<template>
    <div class="prompt" :style="promptstyle" @click='promptclick'>
        <div @mousemove='mmove' @mouseout='mout' @mouseover='mover'>
        <mu-icon value="add"  :value='this.value' :size='this.size' :color='this.color'/>
        </div>
        <div :class="{ 'prompt-title' : isshow ,'prompt-hide' : ishide}">
          <!--<div class="prompt-title">-->
           {{this.title}}
          </div>
    </div>
</template>


<script>
export default{
  name: 'prompt',
  data () {
    return {
      isshow: false,
      ishide: true

    }
  },

/**
 *title：气泡内容
 value：图标类型
 color：图标颜色
 size：图标大小
 disabled：是否显示
 */
  props: {
    title: {
      type: String,
      default: '提示'
    },
    value: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'balck'
    },
    size: {
      type: Number,
      default: 24
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    mmove () {
      var b = Boolean(this.disabled)
      if (b) {
        this.isshow = true
        this.ishide = false
      }
    },
    mout () {
      this.isshow = false
      this.ishide = true
    },
    mover () {

    },
    promptclick (event) {
      this.$emit('click', event)
    }
  },
  computed: {
    promptstyle () {
      let objClass = {}
      objClass.width = this.size + 'px'
      objClass.height = this.size + 'px'
      return objClass
    }
  }

}

</script>










<style scoped>
.prompt{
    /*width:100%;
    height:100%;*/
    /*prompt*/
    cursor :pointer ;
     /*background: red;*/
}
.prompt-hide{
 transform: translate(10px,-40px) scale(0);
   position: absolute;
   padding: 5px;
  display:inline-block;
 
  transition: transform 2s;
   font-size:12px;
  border-radius:2px;
  background-color : rgba(66,66,66,0.6);
 
  text-align: center;
  color:white;
 
}
.prompt-title{
  transform: translate(15px,-40px) scale(0.6 ,0.4);
   position: absolute;
   padding: 5px;
  display:inline-block;
 
  transition: transform 2s;
   font-size:12px;
  border-radius:2px;
  background-color : rgba(66,66,66,0.6);
 
  text-align: center;
  color:white;
 
}

</style>

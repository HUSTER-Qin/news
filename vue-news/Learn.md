# Vue事件
-  @click  点击
-  @scroll  滚动条事件
-  @blur  失去焦点
-  @change 用户改变域的内容
-  @dblclick  双击事件
-  @focus 获取焦点
-  @mousedown 鼠标被按下
-  @mousemove 鼠标移动
-  @@mouseout 鼠标移出
# 注册组件：
- components: {
      TableHeader,
      TableBody  
    },
    - TableHeader、TableBody引入的组件
# 子父组件传值
## 子组件到父组件
1. 父组件
```js
    <template>
        <div id="app">
            <child mes-father="message from father"></child>  // 添加自定义属性
        </div>
    </template>
```
2. 子组件
```js
  <!--子组件-->(js 识别大小写 html 不识别  所以采用驼峰命名)
  props:['mesFather']  // 添加 props 接收父元传递过来的数据。
```
## 父组件到子组件
1. 子组件
```js
  <!--采用监听自定义事件的方式-->
  <!--子组件-->
    <input type="text" name="" v-model="inputValue" @keypress.enter="enter">
    methods: {
    enter () {
      this.emit("valueUp", this.inputValue) 
      //子组件发射自定义事件valueUp, 并携带要传递给父组件的值，
      // 如果要传递给元素很多值，这些值要作为参数依次列出 如 this.emit('valueUp', this.inputValue, this.msg); 
        }
    }
```
2. 父组件
```js
 <p @valueUp ="recieve">{{childMes}}</p>
 methods: {
     valueUp (mes) {  // valueUp 事件需要设置参数，这些参数就是子组件传递过来的数据，因此，参数的个数，也要和子元素传递过来的一致。
        console.log(mes) //
    }
  }
```
# vue3

## 和vue2不同点

### 1
使用proxy代理整个对象  即使没有这个属性，调用的时候添加也可以感知到，数组也可以感知到

### 2
vue2全局就是一个vue实例，所有的属性 组件注册都在这个实例上进行，运行多个实例不现实
vue3 
  createApp的方式可以创建多个vue实例，彼此隔离，返回的实例可以使用

  defineAsyncComponent 引入异步组件 
    如果组件比较笨重需要好的性能，可以使用异步组件
    异步组件在加载的时候会有占位，比如loading（体量很小），然后异步加载组件，提升页面加载速度
    异步组件如果有多处使用，可以单拎出来，打包会被打成独立文件，缓存起来，反复使用。
    如果不单拎出来，组件就会被打包到不同页面里面去

```js
import { createApp, defineAsyncComponent } from 'vue'
import App from './app.vue'
import MyApp from './MyApp.vue'
import './index.css'

const AsyncComponent = defineAsyncComponent(() => 
  import('./components/AsyncComp.vue')
)

const app = createApp(App)

app.mount('#app')

const myApp = createApp(MyApp)

myApp.component('async-comp', AsyncComponent)

myApp.mount('#root')

```

### 3
自定义指令的钩子命名的修改

bind => beforeMount
inserted => mounted
beforeUpdate 新增！这是在元素本身更新之前调用的，很像组件生命周期钩子
update 移除！有太多相似之处要更新，所以这是多余的，请改用updated
componentUpdated => updated
beforeUnmount 新的！与组件生命周期钩子类似，它将在卸载元素之前调用
unbind => unmounted

```js
app.directive()

```

### 4
teleport

```html
<teleport to="body">
  <input />
</teleport>

<teleport to="#root">
  <input />
</teleport>

```
组件会被放到body标签里面
业务逻辑上属于模块，但是结构上放在body


### 5
data必须定义为一个函数，定义为对象会直接报错


### 6
template中不需要最外层元素包裹，支持多个节点
```html
<template>
  <div></div>
  <div></div>
</template>
```
如果是多个节点，组件外部传入的attribute要如何传递？
比如调用组件的时候
```html
<async-com style="color: red"></async-com>

```
如果没有包裹节点的方式，而是多个节点，那么用下面的这种方式，那么颜色就会加到第二个节点上面
```html
<template>
  <div></div>
  <div v-bind="$attrs"></div>
</template>
```


### 7
函数式组件
```js 
import { h } from 'vue';

export default function Functional(props, context) {
  return h('div',
    context.attrs, // context相当于this
    h('span',{
      onClick: () => alert(props.msg)
    }, props.msg)
  )
}
Functional.props = 'msg'
```

### 8
在同一元素上使用v-if和v-for的优先级已更改， 即if比for的优先级更高了
<template v-for>和非 v-for节点上的key用法已更改？？不加key也可以
渲染函数不再提供createElement参数（通常简写为h），而是从依赖中导入
标签上的属性与绑定对象的属性冲突时，以排在后面的属性为准。不再给单独属性更高的优先级。
```html
<comp name="tom" v-bind="{ name: 'Jim' }"></comp>
```

### 9 重点
最具颠覆意义的响应组合api

setup函数

reactive
readonly 只读
shallowReactive 浅 就只一层
shallowReadonly 浅 就只一层
toRaw 返回代理对象的源对象
markRaw 将普通对象转换为不可代理的对象
ref toRef unref toRefs isRef shallowRef triggerRef
effect watch watchEffect
computed


```js
import { h, reactive, toRaw } from 'vue'

export default {
  setup(props, context) {
    const data = reactive({ count: 0, obj: { f: 2 } }); // shallowReactive
    const origin = toRaw(data); // 变回未被代理的源对象
    const increment = () => {
      data.count++
    }
    return () => h('div', {
      onClick: increment
    }, 'composition: ', data.count)
  }
}

```
同
```vue
<template>
  <div @click="increment">{{ data.count }}</div>
  <span>{{ count }}</span>
  <span>f: {{ f }}</span>
  <span>{{ computedVal }}</span>
</template>

<script>
import { reactive, toRaw, ref, effect, watch, computed, inject } from 'vue'
export default {
  set() {
    const data = reactive({ count: 0, obj: { f: 2 } });
    
    const origin = toRaw(data);

    const count = ref(0); // template直接使用count
    
    const printCountRef = () => {
      console.log(count.value)
    }

    const increment = () => {
      data.count++
      data.obj.f++
    }
    //toRefs 非常有用，这样消费组件就可以在不丢失响应性的情况下对返回的对象进行解构/展开
    const { f } = toRefs(data.obj);
    // const f = ref(data.obj.f);

    effect(() => { // data.count 值变化，回调函数就会执行
      console.log(data.count)
    })

    watch(() => count.value, (value) => { // 第一个参数是函数，返回值变了就回调
      alert(value)
    })
    watch(() => count.value > 5, (value) => { // count.value>5为true了就不执行了
      alert(value)
    })
    watch([count], (value) => {
      // 第一个参数可以是ref/reactive，ref/reactive值变了就回调
      // 第一个参数可以是数组，数组每一项变了就回调
      alert(value)
    })

    const computedVal = computed(() => count.value + data.count));

    const state = inject('state');
    const onChange = inject('onChange');
    // 此种写法会出问题
    // const onChange = () => {
    //   state.value ++;
    // }

    return { data, increment, count, f, computedVal }
  }
}
</script>

```
```vue
<template>
  <div>{{ state.value }}</div>
</template>

<script>
import { readonly } from 'vue';
export default {
  name: 'parentCom',
  data() {
    return {
      state: {
        value: 0,
      }
    }
  },
  provide() {
    return {
      state: readonly(this.state), 
      // readonly这样写是为了子组件的setup不可直接修改这个变量，因为一旦某个
      // 子组件修改了这个变量，其他使用state值的setup组件也会同步更新，性能会出现问题
      // 必须使用onchange函数才会只改变父组件的值
      onChange: () => {
        this.state.value = Math.random()
      }
    }
  }
}

</script>

```

### 10、生命周期
选项式 API	      Hook inside setup
beforeCreate	   Not needed*
created	         Not needed*
beforeMount	     onBeforeMount
mounted	         onMounted
beforeUpdate	   onBeforeUpdate
updated	         onUpdated
beforeUnmount	   onBeforeUnmount
unmounted	       onUnmounted
errorCaptured	   onErrorCaptured
renderTracked	   onRenderTracked
renderTriggered	 onRenderTriggered
activated	       onActivated
deactivated	     onDeactivated

可以调用多次，分散在多处了



### 11、hooks

setup的抽取和复用感觉就是

### 12、
只是讲了些比较关键的
还是要自己看文档
全面看一遍
通读
哎






















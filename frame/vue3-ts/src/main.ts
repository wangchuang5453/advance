import { createApp } from 'vue'
import App from './App.vue'

const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}
console.log(typeof buttonEmits);

const types = [
  'default',
  'primary'
] as const

console.log(typeof types);


createApp(App).mount('#app')

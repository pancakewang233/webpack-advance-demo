import {a} from './a' // 直接引入
const b = import('./b') // 动态引入，也叫按需引入

const hi = () =>{
  console.log('pank')
  console.log(a)
  console.log(b)
  console.log(Promise.resolve('test promise'))
}

hi()

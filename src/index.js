import {a} from './a' // 直接引入
import {JsxDemo} from './jsx-demo'
import {x} from './ts-demo'
import {TsxDemo} from './tsx-demo'

const b = import('./b') // 动态引入，也叫按需引入

console.log(TsxDemo)
console.log(JsxDemo)
console.log(x)
const hi = () =>{
  console.log('pank')
  console.log(a)
  console.log(b)
  console.log(Promise.resolve('test promise'))
}

hi()

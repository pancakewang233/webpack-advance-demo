import {a} from '@/a' // 直接引入
import {JsxDemo} from '@/jsx-demo'
import {x} from '@/ts-demo'
import {TsxDemo} from '@/tsx-demo'
import {y} from '@/dir/x'
import {c} from '@/dir/c'
import '@/scss-demo.scss'
import vars from '@/scss-export.scss'


const b = import('./b') // 动态引入，也叫按需引入
console.log(y)
console.log(c)
console.log(TsxDemo)
console.log(JsxDemo)
console.log(x)
console.log(vars)
const hi = () =>{
  console.log('pank')
  console.log(a)
  console.log(b)
  console.log(Promise.resolve('test promise'))
}

hi()

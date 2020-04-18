// main.js
// const greeter = require('./app/Greeter.js');
// document.querySelector('#root').appendChild(greeter());

// // console.log('start');
// // console.log('end');

// // console.log(1);


// // require('path');

// // console.log(path.resolve('./'));

// import Greeter from './app/Greeter.jsx'
// import {render} from 'react-dom'
// import React from 'react'

// render(<Greeter />, document.getElementById('root'));


import React from 'react';
import {render} from 'react-dom';
import Greeter from './app/Greeter.jsx'  // 如不填后缀，默认按 Greeter和Greeter.js找，所以要明确.jsx
import './css/Greeter.css'  // 为啥Greeter不能直接在这儿引入，而下边那个就能.  改成 oreete2r 不同名了也不能
import './css/index.css'  // 改名为index2.css也可以直接引入，说明不需要css js同名
// 跟css顺序也无关
// 把oreete2r的内容放到index2里，也只有原来的样式生效，.root不生效
// html加个span，把oreete2r控制标签从 .root 换成 span，在这里引入就有效了，
// 看来是#root 所在的div，被Greeter render了，时机比较靠后(或其他原因，可能是什么私有作用域啥的吧。。不太懂，或许也可能是个基本的前端常识吧)，
// 即使手动给他加 .root 类，虽然html页面能看到它class=root，但也无法生效，
// 所以无法应用其他文件引入的样式，也是依据此来进行样式隔离，避免污染（可以看下它到底怎么做的隔离，应该是别的思路逻辑，我这儿就随便一说，大概个意思）

render(<Greeter />, document.getElementById('root'));
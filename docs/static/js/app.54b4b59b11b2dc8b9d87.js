webpackJsonp([1],{I8zn:function(t,i){},NHnr:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e("7+uW"),s=e("c/Tr"),r=e.n(s),o=e("woOf"),a=e.n(o),c=e("BO1k"),u=e.n(c),l={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"icons"},[i("symbol",{attrs:{id:"icon-fire",viewBox:"0 0 24 24"}},[i("title",[this._v("fire")]),this._v(" "),i("path",{attrs:{d:"M11.719 18.984c2.672 0 4.781-2.109 4.781-4.781 0-1.406-0.188-2.719-0.563-4.031-1.031 1.359-2.859 2.203-4.641 2.578s-2.813 1.453-2.813 3.094c0 1.734 1.453 3.141 3.234 3.141zM13.5 0.656c3.891 3.141 6.516 7.969 6.516 13.359 0 4.406-3.609 7.969-8.016 7.969s-8.016-3.563-8.016-7.969c0-3.375 1.219-6.516 3.234-8.906v0.375c0 2.063 1.547 3.703 3.609 3.703s3.422-1.641 3.422-3.703c0-2.156-0.75-4.828-0.75-4.828z"}})]),this._v(" "),i("symbol",{attrs:{id:"icon-water",viewBox:"0 0 32 32"}},[i("title",[this._v("water")]),this._v(" "),i("path",{attrs:{d:"M27.020 14.786c-2.055-5.732-6.41-10.88-11.020-14.786-4.61 3.907-8.965 9.054-11.020 14.786-1.271 3.545-1.396 7.393 0.393 10.794 2.058 3.911 6.207 6.42 10.626 6.42s8.569-2.509 10.626-6.42c1.79-3.401 1.664-7.249 0.393-10.794zM23.086 23.717c-1.369 2.602-4.15 4.283-7.086 4.283-1.723 0-3.391-0.579-4.753-1.583 0.414 0.054 0.832 0.083 1.254 0.083 3.67 0 7.146-2.1 8.856-5.351 1.402-2.665 1.281-5.433 0.746-7.636 0.455 0.88 0.841 1.756 1.151 2.623 0.706 1.971 1.251 4.886-0.168 7.581z"}})])])},staticRenderFns:[]};var h=e("VU/8")({name:"icons"},l,!1,function(t){e("I8zn")},"data-v-3e244224",null).exports,f={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("g",{staticClass:"totem",attrs:{transform:t.transform},on:{click:t.toggle}},[e("rect",{staticClass:"totem",attrs:{width:t.size,height:t.size,x:0,y:0}}),t._v(" "),e("svg",{staticClass:"icon",class:t.iconClass,attrs:{width:t.size*t.scale,height:t.size*t.scale,x:t.size*t.offset,y:t.size*t.offset}},[e("use",{attrs:{"xlink:href":t.icon}})])])},staticRenderFns:[]};var v=e("VU/8")({name:"totem",props:{totem:{},size:0,editing:!1},data:function(){return{}},computed:{x:function(){return this.totem.col*this.size},y:function(){return this.totem.row*this.size},out:function(){return this.totem.off?"water":"fire"},icon:function(){return this.totem.off?"#icon-water":"#icon-fire"},transform:function(){return"translate("+this.x+", "+this.y+")"},scale:function(){return this.totem.off?.8*.9:.8},offset:function(){return(1-this.scale)/2},hint:function(){return(this.totem.hint&&!this.clicked||!1===this.totem.hint&&this.clicked)&&!this.editing?"hint":""},clicked:function(){return this.totem.clicked},iconClass:function(){return this.out+" "+this.hint}},methods:{toggle:function(){this.$emit("toggle",this.totem)}}},f,!1,function(t){e("gy7z")},"data-v-1f92357c",null).exports,d=e("pFYg"),m=e.n(d),g=e("Zrlr"),p=e.n(g),w=e("wxAW"),y=e.n(w),k=e("mvHQ"),x=e.n(k),b=function(t,i,e){var n=[];switch(t%i){case 0:n=[t-i,t,t+1,t+i];break;case i-1:n=[t-i,t-1,t,t+i];break;default:n=[t-i,t-1,t,t+1,t+i]}return n.filter(function(t){return t>=0&&t<e*i})},_=function(t){return JSON.parse(x()(t))},z=function(){function t(i){p()(this,t),this.id=Date.now()+Math.random(),this.matrix=Array.isArray(i)?i:[],this.magic=this.magic.bind(this)}return y()(t,[{key:"row",value:function(t){return t=Math.abs(t%this.rowNum),this.matrix[t]}},{key:"column",value:function(t){return t=Math.abs(t%this.colNum),this.matrix.map(function(i){return i[t]})}},{key:"create",value:function(t){return this.matrix=t,this}},{key:"matrix",get:function(){return this.origin},set:function(t){this.origin=t,this.rowNum=t.length,this.colNum=t[0]&&t[0].length}}],[{key:"zeroMatrix",value:function(t,i){for(var e=[],n=0;n<t;n++){e[n]=[];for(var s=0;s<i;s++)e[n][s]=0}return e}},{key:"unitMatrix",value:function(t){for(var i=[],e=0;e<t;e++){i[e]=[];for(var n=0;n<t;n++)i[e][n]=e===n?1:0}return i}},{key:"toggleMatrix",value:function(t,i){for(var e=[],n=0;n<t;n++)for(var s=function(s){var r=n*i+s;e[r]=Array(t*i).fill(0),b(r,i,t).forEach(function(t){e[r][t]=1})},r=0;r<i;r++)s(r);return e}},{key:"findPivot",value:function(t,i,e){for(var n=t.length,s=i;s<n;s++)if(t[s][e])return s;return-1}},{key:"swapRow",value:function(t,i,e){if(i===e)return t;var n=t[i];return t[i]=t[e],t[e]=n,t}},{key:"transformRow",value:function(t,i){return t.map(function(t,e){return t^i[e]})}},{key:"gaussianElimination",value:function(t,i){for(var e=t.length,n=t[0].length,s=0,r=0;r<n;r++){var o=this.findPivot(t,s,r);if(-1!==o){this.swapRow(t,s,o),this.swapRow(i,s,o);for(var a=o+1;a<e;a++)t[a][r]&&(t[a]=this.transformRow(t[a],t[s]),i[a]^=i[s]);s++}}return t}},{key:"backSubstitute",value:function(t,i){for(var e=[],n=t.length,s=function(s){for(var r=-1,o=0;o<n;o++)if(t[s][o]){r=o;break}if(-1===r){if(i[s])return console.error("Puzzle has no solution:(<"),{v:[]};var a=void 0,c=void 0,u=[];e.length>0?e.forEach(function(t){a=_(t),c=_(t),a[s]=0,c[s]=1,u.push(a),u.push(c)}):(a=Array(n).fill(0),c=Array(n).fill(0),a[s]=0,c[s]=1,u.push(a),u.push(c)),e=u}else if(e.length>0)e.forEach(function(e){e[s]=i[s];for(var o=r+1;o<n;o++)e[s]=e[s]!==(t[s][o]&e[o])?1:0});else{var l=Array(n).fill(0);l[s]=i[s];for(var h=r+1;h<n;h++)l[s]=l[s]!==(t[s][h]&l[h])?1:0;e.push(l)}},r=n-1;r>=0;r--){var o=s(r);if("object"===(void 0===o?"undefined":m()(o)))return o.v}return e}},{key:"magic",value:function(t,i,e){var n=this.toggleMatrix(i,e),s=t.split("").map(function(t){return~~t}),r=this.gaussianElimination(n,s);return this.backSubstitute(r,s).map(function(t){return t.reduce(function(t,i){return t+i},"")})}}]),t}(),N={name:"lava",components:{totem:v,icons:h},data:function(){return{row:5,col:5,width:300,height:300,totems:{},editing:!1,showHint:!1,result:[],prevState:"",prevHintIndex:0}},computed:{totemSize:function(){return Math.min(this.width/this.colNum,this.height/this.rowNum)},status:function(){var t=[];for(var i in this.totems){var e=this.totems[i];t[e.row*this.colNum+e.col]=e.off?0:1}return t},state:function(){return this.status.reduce(function(t,i){return t+i},"")},weight:function(){return this.status.length>0?this.status.reduce(function(t,i){return t+i},0):42},colNum:function(){return~~this.col},rowNum:function(){return~~this.row},hintText:function(){var t=this.result.length;return"Hint"+(t>0?" "+(this.prevHintIndex%t+1)+"/"+t:"")}},created:function(){window.onresize=this.resize},watch:{col:function(){this.createTotems()},row:function(){this.createTotems()},weight:function(){this.editing||0!==this.weight||this.done()},editing:function(){this.isPlayable()}},mounted:function(){this.resize(),this.init()},methods:{init:function(){this.createTotems()},resize:function(){this.width=.85*window.innerWidth,this.height=.8*window.innerHeight},createTotems:function(){for(var t={},i=0;i<this.rowNum;i++)for(var e=0;e<this.colNum;e++){var n=i*this.colNum+e;t[n]={row:i,col:e,off:!1,clicked:!1,hint:!1,neighbors:b(n,this.colNum,this.rowNum)}}this.totems=t},reset:function(){for(var t in this.totems){var i=this.totems[t];i.off&&(i.off=!1)}},toggleTotem:function(t){this.audioPlay(t.off);var i=t.row*this.colNum+t.col,e={};if(this.editing)e[i]=a()({},this.totems[i],{off:!this.totems[i].off});else{var n=this.totems[i].neighbors,s=!0,r=!1,o=void 0;try{for(var c,l=u()(n);!(s=(c=l.next()).done);s=!0){var h=c.value;e[h]=a()({},this.totems[h],{off:!this.totems[h].off})}}catch(t){r=!0,o=t}finally{try{!s&&l.return&&l.return()}finally{if(r)throw o}}}e[i]=a()({},e[i],{clicked:!this.totems[i].clicked}),this.totems=a()({},this.totems,e)},done:function(){var t=this;this.$refs.success.play(),setTimeout(function(){t.nextBlock()},500)},hint:function(){var t=void 0;if(this.prevState===this.state){this.prevHintIndex=this.prevHintIndex+1;var i=this.prevHintIndex%this.result.length;t=this.result[i]}else{this.prevState=this.state,this.prevHintIndex=0,console.time("die");var e=z.magic(this.state,this.rowNum,this.colNum);console.timeEnd("die"),e=this.sortByWeight(e),this.result=e,t=e[0]}t?this.updateHint(t):console.error("No solution!")},updateHint:function(t){var i=this,e={};r()(t).forEach(function(t,n){e[n]=a()({},i.totems[n],{hint:"1"===t,clicked:!1})}),this.totems=a()({},this.totems,e)},clearHint:function(){for(var t in this.totems)this.totems[t].hint=!1,this.totems[t].clicked=!1;this.result=[]},sortByWeight:function(t){return t.sort(function(t,i){var e=t.replace(/0/g,""),n=i.replace(/0/g,"");return e.length<n.length})},nextBlock:function(){this.row=1+~~this.row,this.col=1+~~this.col},isPlayable:function(){this.editing||(0===z.magic(this.state,this.rowNum,this.colNum).length&&(alert("No solutions!"),this.editing=!0),this.prevState!==this.state&&this.clearHint())},audioPlay:function(t){if(t){var i=this.$refs.fire;i.currentTime=0,i.play()}else{var e=this.$refs.water;e.currentTime=0,e.play()}}}},C={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"layout"},[e("div",{staticClass:"layout-header"}),t._v(" "),e("div",{staticClass:"layout-content"},[e("div",{staticClass:"layout-view"},[e("div",{staticClass:"layout-padding"},[e("div",{staticClass:"lava"},[e("div",{staticClass:"actions"},[e("label",{staticClass:"label edit",class:t.editing?"bg-fire":"bg-water",attrs:{for:"edit"}},[t._v("\n              "+t._s(t.editing?"Editing":"Playing")+"\n              "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.editing,expression:"editing"}],staticClass:"input",attrs:{id:"edit",type:"checkbox"},domProps:{checked:Array.isArray(t.editing)?t._i(t.editing,null)>-1:t.editing},on:{change:function(i){var e=t.editing,n=i.target,s=!!n.checked;if(Array.isArray(e)){var r=t._i(e,null);n.checked?r<0&&(t.editing=e.concat([null])):r>-1&&(t.editing=e.slice(0,r).concat(e.slice(r+1)))}else t.editing=s}}})]),t._v(" "),t.editing?[e("label",{staticClass:"label row",attrs:{for:"row"}},[t._v("\n                Row:\n                "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.row,expression:"row"}],staticClass:"input",attrs:{id:"row",type:"number",min:"1",max:"1000"},domProps:{value:t.row},on:{input:function(i){i.target.composing||(t.row=i.target.value)}}})]),t._v(" "),e("label",{staticClass:"label col",attrs:{for:"col"}},[t._v("\n                Col:\n                "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.col,expression:"col"}],staticClass:"input",attrs:{id:"col",type:"number",min:"1",max:"1000"},domProps:{value:t.col},on:{input:function(i){i.target.composing||(t.col=i.target.value)}}})])]:t._e(),t._v(" "),t.editing?e("button",{staticClass:"reset bg-water",on:{click:t.reset}},[t._v("Reset")]):e("button",{staticClass:"hint bg-water",on:{click:t.hint}},[t._v(t._s(t.hintText))])],2),t._v(" "),e("div",{staticClass:"azeroth"},[e("icons"),t._v(" "),e("svg",{ref:"board",staticClass:"maelstrom",attrs:{width:t.totemSize*t.col,height:t.totemSize*t.row},on:{contextmenu:function(t){t.preventDefault()}}},t._l(t.totems,function(i,n){return e("totem",{key:n,attrs:{totem:i,size:t.totemSize,editing:t.editing},on:{toggle:t.toggleTotem}})}))],1),t._v(" "),e("div",{staticClass:"audio"},[e("audio",{ref:"water",attrs:{src:"../../static/water.wav"}}),t._v(" "),e("audio",{ref:"fire",attrs:{src:"../../static/fire.wav"}}),t._v(" "),e("audio",{ref:"success",attrs:{src:"../../static/success.wav"}})])])])])]),t._v(" "),e("div",{staticClass:"layout-footer"})])},staticRenderFns:[]};var H={name:"app",components:{Lava:e("VU/8")(N,C,!1,function(t){e("tN1U")},"data-v-3995ec14",null).exports}},M={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{attrs:{id:"app"}},[i("Lava")],1)},staticRenderFns:[]};var T=e("VU/8")(H,M,!1,function(t){e("giVC"),e("bTFM"),e("nOlW")},null,null).exports;n.a.config.productionTip=!1,new n.a({el:"#app",template:"<App/>",components:{App:T}})},bTFM:function(t,i){},giVC:function(t,i){},gy7z:function(t,i){},nOlW:function(t,i){},tN1U:function(t,i){}},["NHnr"]);
//# sourceMappingURL=app.54b4b59b11b2dc8b9d87.js.map
webpackJsonp([1],{NHnr:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e("7+uW"),s=e("c/Tr"),r=e.n(s),o=e("BO1k"),a=e.n(o),c=e("woOf"),u=e.n(c),l={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"icons"},[i("symbol",{attrs:{id:"icon-fire",viewBox:"0 0 24 24"}},[i("title",[this._v("fire")]),this._v(" "),i("path",{attrs:{d:"M11.719 18.984c2.672 0 4.781-2.109 4.781-4.781 0-1.406-0.188-2.719-0.563-4.031-1.031 1.359-2.859 2.203-4.641 2.578s-2.813 1.453-2.813 3.094c0 1.734 1.453 3.141 3.234 3.141zM13.5 0.656c3.891 3.141 6.516 7.969 6.516 13.359 0 4.406-3.609 7.969-8.016 7.969s-8.016-3.563-8.016-7.969c0-3.375 1.219-6.516 3.234-8.906v0.375c0 2.063 1.547 3.703 3.609 3.703s3.422-1.641 3.422-3.703c0-2.156-0.75-4.828-0.75-4.828z"}})]),this._v(" "),i("symbol",{attrs:{id:"icon-water",viewBox:"0 0 32 32"}},[i("title",[this._v("water")]),this._v(" "),i("path",{attrs:{d:"M27.020 14.786c-2.055-5.732-6.41-10.88-11.020-14.786-4.61 3.907-8.965 9.054-11.020 14.786-1.271 3.545-1.396 7.393 0.393 10.794 2.058 3.911 6.207 6.42 10.626 6.42s8.569-2.509 10.626-6.42c1.79-3.401 1.664-7.249 0.393-10.794zM23.086 23.717c-1.369 2.602-4.15 4.283-7.086 4.283-1.723 0-3.391-0.579-4.753-1.583 0.414 0.054 0.832 0.083 1.254 0.083 3.67 0 7.146-2.1 8.856-5.351 1.402-2.665 1.281-5.433 0.746-7.636 0.455 0.88 0.841 1.756 1.151 2.623 0.706 1.971 1.251 4.886-0.168 7.581z"}})])])},staticRenderFns:[]};var h=e("VU/8")({name:"icons"},l,!1,function(t){e("WjSl")},"data-v-f61443cc",null).exports,f={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("g",{staticClass:"totem",attrs:{transform:t.transform},on:{click:t.toggle}},[e("rect",{staticClass:"totem",attrs:{width:t.size,height:t.size,x:0,y:0}}),t._v(" "),e("svg",{staticClass:"icon",class:t.iconClass,attrs:{width:t.size*t.scale,height:t.size*t.scale,x:t.size*t.offset,y:t.size*t.offset}},[e("use",{attrs:{"xlink:href":t.icon}})])])},staticRenderFns:[]};var v=e("VU/8")({name:"totem",props:{totem:{},size:0},data:function(){return{}},computed:{x:function(){return this.totem.col*this.size},y:function(){return this.totem.row*this.size},out:function(){return this.totem.off?"water":"fire"},icon:function(){return this.totem.off?"#icon-water":"#icon-fire"},transform:function(){return"translate("+this.x+", "+this.y+")"},scale:function(){return this.totem.off?.8*.9:.8},offset:function(){return(1-this.scale)/2},hint:function(){return this.totem.hint&&!this.clicked?"hint":""},clicked:function(){return this.totem.clicked},iconClass:function(){return this.out+" "+this.hint}},methods:{toggle:function(){this.$emit("toggle",this.totem)}}},f,!1,function(t){e("p2+n")},"data-v-71ab5eeb",null).exports,m=e("Zrlr"),d=e.n(m),g=e("wxAW"),p=e.n(g),w=e("mvHQ"),y=e.n(w),x=function(t,i,e){var n=[];switch(t%i){case 0:n=[t-i,t,t+1,t+i];break;case i-1:n=[t-i,t-1,t,t+i];break;default:n=[t-i,t-1,t,t+1,t+i]}return n.filter(function(t){return t>=0&&t<e*i})},b=function(t){return JSON.parse(y()(t))},k=function(){function t(i){d()(this,t),this.id=Date.now()+Math.random(),this.matrix=Array.isArray(i)?i:[],this.magic=this.magic.bind(this)}return p()(t,[{key:"row",value:function(t){return t=Math.abs(t%this.rowNum),this.matrix[t]}},{key:"column",value:function(t){return t=Math.abs(t%this.colNum),this.matrix.map(function(i){return i[t]})}},{key:"create",value:function(t){return this.matrix=t,this}},{key:"matrix",get:function(){return this.origin},set:function(t){this.origin=t,this.rowNum=t.length,this.colNum=t[0]&&t[0].length}}],[{key:"zeroMatrix",value:function(t,i){for(var e=[],n=0;n<t;n++){e[n]=[];for(var s=0;s<i;s++)e[n][s]=0}return e}},{key:"unitMatrix",value:function(t){for(var i=[],e=0;e<t;e++){i[e]=[];for(var n=0;n<t;n++)i[e][n]=e===n?1:0}return i}},{key:"toggleMatrix",value:function(t,i){for(var e=[],n=0;n<t;n++)for(var s=function(s){var r=n*i+s;e[r]=Array(t*i).fill(0),x(r,i,t).forEach(function(t){e[r][t]=1})},r=0;r<i;r++)s(r);return e}},{key:"findPivot",value:function(t,i,e){for(var n=t.length,s=i;s<n;s++)if(t[s][e])return s;return-1}},{key:"swapRow",value:function(t,i,e){if(i===e)return t;var n=t[i];return t[i]=t[e],t[e]=n,t}},{key:"transformRow",value:function(t,i){return t.map(function(t,e){return t^i[e]})}},{key:"gaussianElimination",value:function(t,i){for(var e=t.length,n=t[0].length,s=0,r=0;r<n;r++){var o=this.findPivot(t,s,r);if(-1!==o){this.swapRow(t,s,o),this.swapRow(i,s,o);for(var a=o+1;a<e;a++)t[a][r]&&(t[a]=this.transformRow(t[a],t[s]),i[a]^=i[s]);s++}}return t}},{key:"backSubstitute",value:function(t,i){for(var e=[],n=t.length,s=function(s){for(var r=-1,o=0;o<n;o++)if(t[s][o]){r=o;break}if(-1===r){if(i[r])throw new Error("Puzzle has no solution:(<");var a=void 0,c=void 0,u=[];e.length>0?e.forEach(function(t){a=b(t),c=b(t),a[s]=0,c[s]=1,u.push(a),u.push(c)}):(a=Array(n).fill(0),c=Array(n).fill(0),a[s]=0,c[s]=1,u.push(a),u.push(c)),e=u}else if(e.length>0)e.forEach(function(e){e[s]=i[s];for(var o=r+1;o<n;o++)e[s]=e[s]!==(t[s][o]&e[o])?1:0});else{var l=Array(n).fill(0);l[s]=i[s];for(var h=r+1;h<n;h++)l[s]=l[s]!==(t[s][h]&l[h])?1:0;e.push(l)}},r=n-1;r>=0;r--)s(r);return e}},{key:"magic",value:function(t,i,e){var n=this.toggleMatrix(i,e),s=t.split("").map(function(t){return~~t}),r=this.gaussianElimination(n,s);return this.backSubstitute(r,s).map(function(t){return t.reduce(function(t,i){return t+i},"")})}}]),t}(),_={name:"lava",components:{totem:v,icons:h},data:function(){return{row:3,col:3,width:300,height:300,totems:{},status:[],editing:!1,result:[],prevState:"",prevHintIndex:0,audioContext:null}},computed:{totemSize:function(){return this.width/Math.max(this.colNum,this.rowNum)},insects:function(){return this.status.reduce(function(t,i){return t+i},"")},colNum:function(){return~~this.col},rowNum:function(){return~~this.row},hintText:function(){var t=this.result.length;return"Hint"+(t>0?" "+(this.prevHintIndex%t+1)+"/"+t:"")}},created:function(){window.onresize=this.resize},watch:{col:function(){this.createTotems()},row:function(){this.createTotems()}},mounted:function(){this.resize(),this.init()},methods:{init:function(){this.createTotems()},resize:function(){var t=.8*Math.min(window.innerHeight,window.innerWidth);this.width=t,this.height=t},createTotems:function(){for(var t={},i=0;i<this.rowNum;i++)for(var e=0;e<this.colNum;e++){var n=i*this.colNum+e;t[n]={row:i,col:e,off:!1,neighbors:this.getNeighbors(n)}}this.totems=t,this.updateStatus()},updateStatus:function(){var t=[];for(var i in this.totems){var e=this.totems[i];t[e.row*this.colNum+e.col]=e.off?0:1}this.status=t},toggleTotem:function(t){var i=t.row*this.colNum+t.col,e=(t=this.totems[i]).off,n={};if(n[i]=u()({},t,{off:!t.off,clicked:!t.clicked}),!this.editing){var s=t.neighbors,r=!0,o=!1,c=void 0;try{for(var l,h=a()(s);!(r=(l=h.next()).done);r=!0){var f=l.value;n[f]=u()({},this.totems[f],{off:!this.totems[f].off})}}catch(t){o=!0,c=t}finally{try{!r&&h.return&&h.return()}finally{if(o)throw c}}}this.totems=u()({},this.totems,n),this.updateStatus(),this.editing?this.audioPlay(e):this.isDone(e)},isDone:function(t){var i=this;0===this.status.reduce(function(t,i){return t+i},0)?(this.$refs.success.play(),setTimeout(function(){i.nextBlock()},500)):this.audioPlay(t)},getNeighbors:function(t){var i=this,e=t%this.colNum,n=this.colNum-1,s=[];switch(e){case 0:s=[t-this.colNum,t+1,t+this.colNum];break;case n:s=[t-this.colNum,t-1,t+this.colNum];break;default:s=[t-this.colNum,t-1,t+1,t+this.colNum]}return s.filter(function(t){return t>=0&&t<i.rowNum*i.colNum})},hint:function(){var t=this,i=void 0;if(this.prevState===this.insects){this.prevHintIndex=this.prevHintIndex+1;var e=this.prevHintIndex%this.result.length;i=this.result[e]}else{this.prevState=this.insects,console.time("die");var n=k.magic(this.insects,this.rowNum,this.colNum);console.timeEnd("die"),this.prevHintIndex=0,n=n.sort(function(t,i){var e=t.replace(/0/g,""),n=i.replace(/0/g,"");return e.length<n.length}),this.result=n,n.length>0&&(i=n[0])}if(i){var s={};r()(i).forEach(function(i,e){s[e]=u()({},t.totems[e],{hint:"1"===i,clicked:!1})}),this.totems=u()({},this.totems,s)}},nextBlock:function(){this.row=1+~~this.row,this.col=1+~~this.col,this.result=[]},audioPlay:function(t){if(t){var i=this.$refs.fire;i.currentTime=0,i.play()}else{var e=this.$refs.water;e.currentTime=0,e.play()}},test:function(){console.time("die"),console.log(k.magic(this.insects,this.rowNum,this.colNum)),console.timeEnd("die")}}},N={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"layout"},[e("div",{staticClass:"layout-header"}),t._v(" "),e("div",{staticClass:"layout-content"},[e("div",{staticClass:"layout-view"},[e("div",{staticClass:"layout-padding"},[e("div",{staticClass:"lava"},[e("div",{staticClass:"actions"},[e("label",{staticClass:"label edit",class:t.editing?"water":"fire",attrs:{for:"edit"}},[t._v("\n              "+t._s(t.editing?"Editing":"Playing")+"\n              "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.editing,expression:"editing"}],staticClass:"input",attrs:{id:"edit",type:"checkbox"},domProps:{checked:Array.isArray(t.editing)?t._i(t.editing,null)>-1:t.editing},on:{change:function(i){var e=t.editing,n=i.target,s=!!n.checked;if(Array.isArray(e)){var r=t._i(e,null);n.checked?r<0&&(t.editing=e.concat([null])):r>-1&&(t.editing=e.slice(0,r).concat(e.slice(r+1)))}else t.editing=s}}})]),t._v(" "),t.editing?[e("label",{staticClass:"label row",attrs:{for:"row"}},[t._v("\n                Row:\n                "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.row,expression:"row"}],staticClass:"input",attrs:{id:"row",type:"number",min:"1",max:"1000"},domProps:{value:t.row},on:{input:function(i){i.target.composing||(t.row=i.target.value)}}})]),t._v(" "),e("label",{staticClass:"label col",attrs:{for:"col"}},[t._v("\n                Col:\n                "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.col,expression:"col"}],staticClass:"input",attrs:{id:"col",type:"number",min:"1",max:"1000"},domProps:{value:t.col},on:{input:function(i){i.target.composing||(t.col=i.target.value)}}})])]:t._e(),t._v(" "),e("button",{staticClass:"hint bg-water",on:{click:t.hint}},[t._v(t._s(t.hintText))]),t._v(" "),e("button",{staticClass:"test",on:{click:t.test}},[t._v("Test")])],2),t._v(" "),e("div",{staticClass:"azeroth",on:{contextmenu:function(t){t.preventDefault()}}},[e("icons"),t._v(" "),e("svg",{ref:"board",staticClass:"maelstrom",attrs:{width:t.totemSize*t.col,height:t.totemSize*t.row}},t._l(t.totems,function(i,n){return e("totem",{key:n,attrs:{totem:i,size:t.totemSize},on:{toggle:t.toggleTotem}})}))],1),t._v(" "),e("div",{staticClass:"audio"},[e("audio",{ref:"water",attrs:{src:"../../static/water.wav"}}),t._v(" "),e("audio",{ref:"fire",attrs:{src:"../../static/fire.wav"}}),t._v(" "),e("audio",{ref:"success",attrs:{src:"../../static/success.wav"}})])])])])]),t._v(" "),e("div",{staticClass:"layout-footer"})])},staticRenderFns:[]};var C={name:"app",components:{Lava:e("VU/8")(_,N,!1,function(t){e("tbBQ")},"data-v-a219b486",null).exports}},z={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{attrs:{id:"app"}},[i("Lava")],1)},staticRenderFns:[]};var M=e("VU/8")(C,z,!1,function(t){e("giVC"),e("bTFM"),e("nOlW")},null,null).exports;n.a.config.productionTip=!1,new n.a({el:"#app",template:"<App/>",components:{App:M}})},WjSl:function(t,i){},bTFM:function(t,i){},giVC:function(t,i){},nOlW:function(t,i){},"p2+n":function(t,i){},tbBQ:function(t,i){}},["NHnr"]);
//# sourceMappingURL=app.3849437008123bd14e12.js.map
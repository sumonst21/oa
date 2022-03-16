(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1609e035"],{"2cdb":function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"page"},[s("input",{staticClass:"copy-input",attrs:{id:"shareLink",type:"text"},domProps:{value:t.shareLink}}),s("input",{staticClass:"copy-input",attrs:{id:"csv",type:"text"},domProps:{value:t.csv}}),s("form",{on:{submit:function(a){return a.preventDefault(),t.calculate(a)}}},[t.bookmarks.length?s("div",{staticClass:"bookmarks"},t._l(t.bookmarks,(function(a,e){return s("div",{key:e,staticClass:"bookmark flex-stretch",on:{click:function(s){return t.loadBookmark(a)}}},[s("div",{staticClass:"ev flex-center",class:{"color-green":a.ev>0,"color-red":a.ev<0}},[t._v(t._s(t._f("currency")(a.ev)))]),s("div",{staticClass:"games"},[t._v(" "+t._s(a.labelA)+" "),s("strong",[t._v(t._s(a.oddsA))]),s("br"),t._v(" "+t._s(a.labelB)+" "),s("strong",[t._v(t._s(a.oddsB))])])])})),0):t._e(),s("div",{staticClass:"settings"},[s("div",[s("label",{staticStyle:{display:"block"},attrs:{for:""}},[t._v("Rounding")]),s("div",{staticClass:"toggle toggle-round"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.round,expression:"round"}],attrs:{id:"round",type:"checkbox",value:"true",tabindex:"-1"},domProps:{checked:Array.isArray(t.round)?t._i(t.round,"true")>-1:t.round},on:{change:function(a){var s=t.round,e=a.target,i=!!e.checked;if(Array.isArray(s)){var o="true",n=t._i(s,o);e.checked?n<0&&(t.round=s.concat([o])):n>-1&&(t.round=s.slice(0,n).concat(s.slice(n+1)))}else t.round=i}}}),s("label",{attrs:{for:"round"}}),s("div",{staticClass:"knob"})])]),s("div",[s("label",{staticStyle:{display:"block"},attrs:{for:""}},[t._v(" Winback "),s("svg",{directives:[{name:"tooltip",rawName:"v-tooltip.right",value:"Extra winnings awarded only if the bet hits",expression:"'Extra winnings awarded only if the bet hits'",modifiers:{right:!0}}],attrs:{width:"12",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"}},[s("path",{attrs:{d:"M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm0-338c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"}})])]),s("div",{staticClass:"toggle toggle-round"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.winback,expression:"winback"}],attrs:{id:"winback",type:"checkbox",value:"true",tabindex:"-1"},domProps:{checked:Array.isArray(t.winback)?t._i(t.winback,"true")>-1:t.winback},on:{change:function(a){var s=t.winback,e=a.target,i=!!e.checked;if(Array.isArray(s)){var o="true",n=t._i(s,o);e.checked?n<0&&(t.winback=s.concat([o])):n>-1&&(t.winback=s.slice(0,n).concat(s.slice(n+1)))}else t.winback=i}}}),s("label",{attrs:{for:"winback"}}),s("div",{staticClass:"knob"})])])]),s("div",{staticClass:"book"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.labelA,expression:"labelA"}],staticClass:"label-input",attrs:{type:"text",tabindex:"1"},domProps:{value:t.labelA},on:{focus:function(a){t.editingLabel=!0},blur:function(a){t.editingLabel=!1},input:function(a){a.target.composing||(t.labelA=a.target.value)}}}),s("div",{staticClass:"field-wrap flex-center"},[s("div",{staticClass:"field"},[s("label",{staticClass:"color-arb",attrs:{for:""}},[t._v("Max stake")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.stakeA,expression:"stakeA"}],attrs:{type:"text",required:"",tabindex:"3"},domProps:{value:t.stakeA},on:{keyup:function(a){return t.onKeyUp("xa")},input:function(a){a.target.composing||(t.stakeA=a.target.value)}}})]),s("div",{staticClass:"field"},[s("label",{attrs:{for:""}},[t._v("Odds")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.oddsA,expression:"oddsA"}],attrs:{type:"text",required:"",tabindex:"4"},domProps:{value:t.oddsA},on:{keyup:function(a){return t.onKeyUp("oa")},input:function(a){a.target.composing||(t.oddsA=a.target.value)}}})]),t.winback?s("div",{staticClass:"field"},[s("label",{attrs:{for:""}},[t._v("Winback")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.winbackAmount,expression:"winbackAmount"}],attrs:{type:"text",required:"",tabindex:"4"},domProps:{value:t.winbackAmount},on:{keyup:function(a){return t.onKeyUp("wb")},input:function(a){a.target.composing||(t.winbackAmount=a.target.value)}}})]):t._e()])]),s("div",{staticClass:"book"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.labelB,expression:"labelB"}],staticClass:"label-input",attrs:{type:"text",tabindex:"2"},domProps:{value:t.labelB},on:{focus:function(a){t.editingLabel=!0},blur:function(a){t.editingLabel=!1},input:function(a){a.target.composing||(t.labelB=a.target.value)}}}),s("div",{staticClass:"field-wrap flex-center"},[s("div",{staticClass:"field"},[s("label",{attrs:{for:""}},[t._v("Odds")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.oddsB,expression:"oddsB"}],attrs:{type:"text",value:"375",required:"",tabindex:"5"},domProps:{value:t.oddsB},on:{keyup:function(a){return t.onKeyUp("ob")},input:function(a){a.target.composing||(t.oddsB=a.target.value)}}})])])]),s("div",{staticClass:"flex-center button-wrap"},[s("div",[s("button",{staticClass:"btn btn-calculate",attrs:{type:"submit",tabindex:"6",name:"button"}},[t._v("Calculate hedge")]),t.arbBalanced&&!t.loading?s("button",{staticClass:"save-play btn-util",class:{"viewing-bookmark":t.viewingBookmark},attrs:{tabindex:"-1"},on:{click:function(a){return a.preventDefault(),t.bookmarkPlay(a)}}},[s("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512",fill:"currentColor"}},[s("path",{attrs:{d:"M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"}})])]):t._e()])])]),t.loading?s("section",{staticClass:"loading flex-center"},[s("div",{staticClass:"spinner"})]):t._e(),s("section",{staticClass:"card-section alt"},[s("transition",{attrs:{name:"fade"}},[t.arbBalanced&&!t.loading?s("div",{staticClass:"card-wrap"},[s("CardBalanced",{attrs:{play:t.arbBalanced}})],1):t._e()])],1)])},i=[],o=(s("1276"),s("ac1f"),s("a15b"),s("99af"),s("a9e3"),s("7db0"),function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"card"},[s("div",{staticClass:"copy-confirmation flex",class:{show:t.copyConfirmation}},[t._v(t._s(t.copyConfirmation))]),s("div",{staticClass:"util flex"},[s("button",{staticClass:"copy-to-clipboard",attrs:{tabindex:"-1"},on:{click:function(a){return t.copyToClipboard("csv")}}},[s("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"14",viewBox:"0 0 384 512"}},[s("path",{attrs:{fill:"currentColor",d:"M369.83 97.98L285.94 14.1c-9-9-21.2-14.1-33.89-14.1H47.99C21.5.1 0 21.6 0 48.09v415.92C0 490.5 21.5 512 47.99 512h287.94c26.5 0 48.07-21.5 48.07-47.99V131.97c0-12.69-5.17-24.99-14.17-33.99zM255.95 51.99l76.09 76.08h-76.09V51.99zM336 464.01H47.99V48.09h159.97v103.98c0 13.3 10.7 23.99 24 23.99H336v287.95zM224 264v20.8c0 35.48 12.88 68.89 36.28 94.09 3.02 3.25 7.27 5.11 11.72 5.11s8.7-1.86 11.72-5.11c23.41-25.2 36.28-58.61 36.28-94.09V264c0-4.42-3.58-8-8-8h-16c-4.42 0-8 3.58-8 8v20.8c0 20.27-5.7 40.17-16 56.88-10.3-16.7-16-36.61-16-56.88V264c0-4.42-3.58-8-8-8h-16c-4.42 0-8 3.58-8 8zm-104-8h-8c-26.51 0-48 21.49-48 48v32c0 26.51 21.49 48 48 48h8c4.42 0 8-3.58 8-8v-16c0-4.42-3.58-8-8-8h-8c-8.84 0-16-7.16-16-16v-32c0-8.84 7.16-16 16-16h8c4.42 0 8-3.58 8-8v-16c0-4.42-3.58-8-8-8zm59.45 42.47c-1.38-1.19-2.12-2.55-2.12-3.84 0-3.12 4.45-6.62 10.41-6.62H200c4.42 0 8-3.58 8-8v-16c0-4.42-3.58-8-8-8h-12.27c-23.39 0-42.41 17.33-42.41 38.62 0 10.66 4.86 20.92 13.33 28.14l21.89 18.77c1.38 1.19 2.12 2.55 2.12 3.84 0 3.12-4.45 6.62-10.41 6.62H160c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8h12.27c23.39 0 42.41-17.33 42.41-38.62 0-10.66-4.86-20.92-13.33-28.14l-21.9-18.77z"}})])]),s("button",{staticClass:"ml-10 copy-to-clipboard",attrs:{tabindex:"-1"},on:{click:function(a){return t.copyToClipboard("shareLink")}}},[s("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512"}},[s("path",{attrs:{fill:"currentColor",d:"M352 320c-25.6 0-48.9 10-66.1 26.4l-98.3-61.5c5.9-18.8 5.9-39.1 0-57.8l98.3-61.5C303.1 182 326.4 192 352 192c53 0 96-43 96-96S405 0 352 0s-96 43-96 96c0 9.8 1.5 19.6 4.4 28.9l-98.3 61.5C144.9 170 121.6 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.6 0 48.9-10 66.1-26.4l98.3 61.5c-2.9 9.4-4.4 19.1-4.4 28.9 0 53 43 96 96 96s96-43 96-96-43-96-96-96zm0-272c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48 21.5-48 48-48zM96 304c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm256 160c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"}})])])]),s("h2",[t._v("Balanced")]),s("div",{staticClass:"card-body"},[s("div",{staticClass:"flex split"},[s("div",{staticClass:"amount"},[s("label",[t._v(t._s(this.$parent.labelA)+" ("+t._s(this.play.oddsA)+")")]),s("div",{staticClass:"number"},[t._v(t._s(t._f("currency")(t.play.stakeA)))]),s("small",[t._v("stake")])]),s("div",{staticClass:"amount"},[s("label",[t._v(t._s(this.$parent.labelB)+" ("+t._s(this.play.oddsB)+")")]),s("div",{staticClass:"number"},[t._v(t._s(t._f("currency")(t.play.stakeB)))]),s("small",[t._v("stake")])])]),s("div",{staticClass:"flex-center mt-15 mb-25"},[s("div",{staticClass:"amount"},[s("div",{staticClass:"number sunk color-orange"},[t._v(t._s(t._f("currency")(t.play.stakeA+t.play.stakeB)))]),s("small",[t._v("sunk")])])]),s("div",{staticClass:"flex split card-bottom"},[t.play.winback?s("div",{staticClass:"amount"},[s("div",{staticClass:"number color-red small"},[t._v(t._s(t._f("currency")(t.play.profitA-t.play.winback)))]),s("small",[t._v(t._s(t._f("currency")(t.play.payoutA-t.play.winback))+" payout")]),s("div",{staticClass:"number color-blue small mt-10"},[t._v("+"+t._s(t._f("currency")(t.play.winback)))]),s("small",[t._v("winback")]),s("div",{staticClass:"number color-green mt-10"},[t._v(t._s(t._f("currency")(t.play.profitA)))]),s("small",[t._v("after winback")])]):s("div",{staticClass:"amount"},[s("div",{staticClass:"number",class:{"color-green":t.play.profitA>0,"color-red":t.play.profitA<0}},[t._v(t._s(t._f("currency")(t.play.profitA)))]),s("small",[t._v(t._s(t._f("currency")(t.play.payoutA))+" payout")])]),s("span",{staticClass:"or"},[t._v("or")]),s("div",{staticClass:"amount",class:{"mt-a":t.play.winback}},[s("div",{staticClass:"number",class:{"color-green":t.play.profitB>0,"color-red":t.play.profitB<0}},[t._v(t._s(t._f("currency")(t.play.profitB)))]),s("small",[t._v(t._s(t._f("currency")(t.play.payoutB))+" payout")])])])])])}),n=[],c=s("5571"),r={name:"CardBalanced",props:{play:Object},mixins:[c["a"]]},l=r,d=s("2877"),u=Object(d["a"])(l,o,n,!1,null,null,null),v=u.exports,b=s("2ef0"),p=s.n(b),h={name:"Arb",mixins:[c["a"]],components:{CardBalanced:v},data:function(){return{viewingBookmark:!1,arbBalanced:!1,loading:!1,freshInput:!0,hasSearched:!1,bookmarks:[],noLossA:!1,noLossB:!1}},created:function(){this.bindShortcuts(),this.calcFromUrl()},computed:{csv:function(){var t=new Date,a=t.toLocaleDateString("en-US").split("/");a.pop();var s=a.join("/");return"".concat(s,",").concat(this.labelA,",").concat(this.oddsA,",").concat(this.arbBalanced.stakeA,",").concat(this.arbBalanced.payoutA,",").concat(this.labelB,",").concat(this.oddsB,",").concat(this.arbBalanced.stakeB,",").concat(this.arbBalanced.payoutB,",").concat(this.arbBalanced.profitA,",").concat(this.arbBalanced.profitB)}},methods:{bindShortcuts:function(){var t=this;document.addEventListener("keydown",(function(a){t.editingLabel||(a=a||window.event,83===a.keyCode&&t.bookmarkPlay())}))},calculate:function(){if(console.log("calculate"),this.freshInput&&this.oddsA&&this.stakeA&&this.oddsB){this.loading=!0,this.freshInput=!1,console.log("calculate 2");var t=Number(this.getPayout(this.oddsA,this.stakeA));this.winback&&(t+=Number(this.winbackAmount));var a=this.getStake(this.oddsB,t);this.round&&(a=Math.round(a));var s=Number(this.getPayout(this.oddsB,a)),e=Number(this.stakeA)+Number(a),i=s-e,o=t-e;console.log("calculate 3"),this.arbBalanced={stakeA:Number(this.stakeA),oddsA:this.oddsA,oddsB:this.oddsB,payoutA:t,profitA:o,stakeB:a,payoutB:s,profitB:i,ev:(o+i)/2,winback:!!this.winback&&this.winbackAmount},console.log("calculate 4"),this.loading=!1,this.hasSearched=!0,p.a.find(this.bookmarks,{id:"".concat(this.oddsA).concat(this.oddsB)})?this.viewingBookmark=!0:this.viewingBookmark=!1,console.log("calculate 5")}},calcFromUrl:function(){var t=this.getQueryString("oddsa"),a=this.getQueryString("stakea"),s=this.getQueryString("oddsb"),e=this.getQueryString("booka"),i=this.getQueryString("bookb"),o=this.getQueryString("wb");this.oddsA=t,this.stakeA=a,this.oddsB=s,e&&(this.labelA=decodeURIComponent(e)),i&&(this.labelB=decodeURIComponent(i)),o&&(this.winback=!0,this.winbackAmount=decodeURIComponent(o)),this.calculate()},bookmarkPlay:function(){var t=this;if(this.hasSearched){if(this.viewingBookmark)return p.a.remove(this.bookmarks,(function(a){return a.id=="".concat(t.oddsA).concat(t.oddsB)})),void(this.viewingBookmark=!1);var a=p.a.clone(this.arbBalanced);a.id="".concat(this.oddsA).concat(this.oddsB),a.labelA=this.labelA,a.labelB=this.labelB,this.bookmarks.push(a),this.resetState()}},loadBookmark:function(t){this.oddsA=t.oddsA,this.stakeA=t.stakeA,this.oddsB=t.oddsB,this.labelA=t.labelA,this.labelB=t.labelB,this.freshInput=!0,this.calculate()}},watch:{round:function(){this.freshInput=!0,this.calculate()}}},m=h,k=Object(d["a"])(m,e,i,!1,null,null,null);a["default"]=k.exports},"7db0":function(t,a,s){"use strict";var e=s("23e7"),i=s("b727").find,o=s("44d2"),n="find",c=!0;n in[]&&Array(1)[n]((function(){c=!1})),e({target:"Array",proto:!0,forced:c},{find:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),o(n)}}]);
//# sourceMappingURL=chunk-1609e035.6939d5ac.js.map
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-222d8b64"],{"1da1":function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));r("d3b7");function n(t,e,r,n,o,i,a){try{var s=t[i](a),l=s.value}catch(c){return void r(c)}s.done?e(l):Promise.resolve(l).then(n,o)}function o(t){return function(){var e=this,r=arguments;return new Promise((function(o,i){var a=t.apply(e,r);function s(t){n(a,o,i,s,l,"next",t)}function l(t){n(a,o,i,s,l,"throw",t)}s(void 0)}))}}},"25f0":function(t,e,r){"use strict";var n=r("6eeb"),o=r("825a"),i=r("d039"),a=r("ad6d"),s="toString",l=RegExp.prototype,c=l[s],u=i((function(){return"/a/b"!=c.call({source:"a",flags:"b"})})),h=c.name!=s;(u||h)&&n(RegExp.prototype,s,(function(){var t=o(this),e=String(t.source),r=t.flags,n=String(void 0===r&&t instanceof RegExp&&!("flags"in l)?a.call(t):r);return"/"+e+"/"+n}),{unsafe:!0})},"2e64":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[t._v("首页")]),r("el-breadcrumb-item",[t._v("电子商务子系统")]),r("el-breadcrumb-item",[t._v("基础数据管理")])],1),r("el-card",[r("div",[r("el-button",{attrs:{type:"danger",size:"small",icon:"el-icon-delete"},on:{click:function(e){return t.handleBatchRemove()}}},[t._v("批量删除")]),r("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-circle-plus"},on:{click:t.addRow}},[t._v("添加基础数据信息")]),r("el-select",{staticClass:"filter-item",staticStyle:{width:"130px","margin-left":"10px"},attrs:{size:"small",placeholder:"数据类型"},on:{change:t.handleFilter},model:{value:t.listQuery.type,callback:function(e){t.$set(t.listQuery,"type",e)},expression:"listQuery.type"}},t._l(t.productOptions,(function(t){return r("el-option",{key:t,attrs:{label:t,value:t}})})),1),r("el-input",{staticStyle:{width:"120px","margin-left":"10px"},attrs:{size:"small",clearable:"",placeholder:"名称"},model:{value:t.listQuery.text,callback:function(e){t.$set(t.listQuery,"text",e)},expression:"listQuery.text"}}),r("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"0.5rem"},attrs:{size:"small",type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v(" 查询 ")])],1),r("el-table",{attrs:{data:t.rows,border:"",stripe:"",fit:"","highlight-current-row":"","row-style":{height:"5px"},"cell-style":{padding:"5px 0"},height:t.curHeight},on:{"selection-change":t.checkSelect}},[r("el-table-column",{attrs:{type:"selection",width:"40",label:"全选"}}),r("el-table-column",{attrs:{align:"center",label:"序号",width:"60"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s((t.listQuery.page-1)*t.listQuery.limit+e.$index+1)+" ")]}}])}),r("el-table-column",{attrs:{align:"center",label:"编号",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-tooltip",{attrs:{effect:"light",content:e.row.code,placement:"top"}},[r("el-link",{attrs:{type:"primary",underline:!1},on:{click:function(r){return t.editRow(e.row)}}},[t._v(t._s(e.row.code)+" ")])],1)]}}])}),r("el-table-column",{attrs:{align:"center",label:"名称",width:"280"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.text)+" ")]}}])}),r("el-table-column",{attrs:{align:"center",label:"备注","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.remark)+" ")]}}])}),r("el-table-column",{attrs:{align:"center",label:"操作",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-edit"},on:{click:function(r){return t.editRow(e.row)}}},[t._v("编辑 ")]),r("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-delete"},on:{click:function(r){return t.deleteRow(e.row)}}},[t._v("删除 ")])]}}])})],1)],1),r("el-dialog",{staticClass:"row-form",attrs:{title:"基础数据信息",center:"",visible:t.dialogShow,top:"7vh",width:"40%"},on:{close:t.closeDialog,"update:visible":function(e){t.dialogShow=e}}},[r("el-form",{ref:"row",staticClass:"demo-ruleForm",attrs:{model:t.row,"label-width":"100px",rules:t.rules}},[r("el-tabs",{attrs:{type:"border-card"}},[r("el-tab-pane",{attrs:{label:"基本信息"}},[r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"分类:",prop:"type"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择农产品分类"},on:{change:t.getNumber},model:{value:t.row.type,callback:function(e){t.$set(t.row,"type",e)},expression:"row.type"}},t._l(t.productOptions,(function(t){return r("el-option",{key:t,attrs:{label:t,value:t}})})),1)],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"编号:",prop:"code"}},[r("el-input",{attrs:{placeholder:"请输入编号"},model:{value:t.row.code,callback:function(e){t.$set(t.row,"code",e)},expression:"row.code"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"名称:",prop:"text"}},[r("el-input",{attrs:{clearable:"",placeholder:"请输入名称"},model:{value:t.row.text,callback:function(e){t.$set(t.row,"text",e)},expression:"row.text"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"备注:",prop:"remark"}},[r("el-input",{attrs:{clearable:"",placeholder:"请输入备注信息"},model:{value:t.row.remark,callback:function(e){t.$set(t.row,"remark",e)},expression:"row.remark"}})],1)],1)],1)],1)],1),r("span",{staticClass:"t-btn"},[r("el-button",{attrs:{type:"info"},on:{click:function(e){t.dialogShow=!1}}},[t._v("取 消")]),r("el-button",{attrs:{type:"success"},on:{click:t.submitRow}},[t._v("提 交")])],1)],1)],1)],1)},o=[],i=(r("4160"),r("d3b7"),r("25f0"),r("159b"),r("96cf"),r("1da1")),a=r("a66f"),s={data:function(){return{flag:"add",listLoading:!1,listQuery:{page:1,limit:10,type:"粮油",text:""},maxCode:"",total:0,curHeight:0,ids:[],dialogShow:!1,rows:[],poductList:[],row:{type:"",code:"",text:"",remark:""},rules:{code:[{required:!0,message:"请输入编号",trigger:"blur"}],type:[{required:!0,message:"请选择农产品分类",trigger:"blur"}],text:[{required:!0,message:"请选择名称",trigger:"blur"}]},productOptions:["粮油","蔬菜","水果","牛羊猪肉","家禽蛋类","水产品","其他"]}},created:function(){var t=this;this.getAllList(),this.setTableHeight(),window.onresize=function(){t.setTableHeight()}},methods:{getAllList:function(){var t=this;a["a"].getProductNameDicByType(this.listQuery).then((function(e){if(200!==e.status)return t.$message.error("获取失败");t.listLoading=!1,t.rows=e.data.rows,t.total=e.data.total,0!==t.total&&(1===t.total.toString().length?t.maxCode=t.rows[0].code.substring(0,2)+"000"+(t.total+1):2===t.total.toString().length?t.maxCode=t.rows[0].code.substring(0,2)+"00"+(t.total+1):3===t.total.toString().length?t.maxCode=t.rows[0].code.substring(0,2)+"0"+(t.total+1):4===t.total.toString().length&&(t.maxCode=t.rows[0].code.substring(0,2)+(t.total+1)),t.row.code=t.maxCode)}))},getNumber:function(){var t=this;this.listQuery.type=this.row.type,a["a"].getProductNameDicByType(this.listQuery).then((function(e){if(200!==e.status)return t.$message.error("获取失败");t.listLoading=!1,t.rows=e.data.rows,t.total=e.data.total,0!==t.total&&(1===t.total.toString().length?t.maxCode=t.rows[0].code.substring(0,2)+"000"+(t.total+1):2===t.total.toString().length?t.maxCode=t.rows[0].code.substring(0,2)+"00"+(t.total+1):3===t.total.toString().length?t.maxCode=t.rows[0].code.substring(0,2)+"0"+(t.total+1):4===t.total.toString().length&&(t.maxCode=t.rows[0].code.substring(0,2)+(t.total+1)),t.row.code=t.maxCode)}))},handleFilter:function(){this.listQuery.page=1,this.getAllList()},handleSizeChange:function(t){this.listQuery.limit=t,this.getAllList()},checkSelect:function(t){var e=this;console.log(t),t.forEach((function(t){e.ids.push(t)}))},handleBatchRemove:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(0!==t.ids.length){e.next=2;break}return e.abrupt("return",t.$message.warning("请先选中要删除的基础数据"));case 2:return e.next=4,t.$confirm("此操作将删除选中基础数据,是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).catch((function(t){return t}));case 4:if(r=e.sent,"confirm"===r){e.next=7;break}return e.abrupt("return",t.$message.info("已经取消删除"));case 7:t.ids.forEach((function(e){var r=new FormData;r.append("code",e.code),r.append("type",e.type),r.append("text",e.text),r.append("remark",e.remark),a["a"].delDicInfo(r).then((function(e){if(200!==e.status)return t.$message.error("删除失败");t.getAllList(),t.$message.success("删除成功"),t.dialogShow=!1}))}));case 8:case"end":return e.stop()}}),e)})))()},handleModifyStatus:function(t,e){var r=this;this.$confirm("是否将发布状态修改为 ".concat(e," ?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.status=e,a["a"].updateMarketingInfo(t).then((function(t){200===t.status&&r.$message({message:"操作成功，已修改为".concat(e),type:"success"})}))})).catch((function(){r.$message({type:"info",message:"已取消操作"})}))},handleCurrentChange:function(t){this.listQuery.page=t,this.getAllList()},setTableHeight:function(){var t=document.documentElement.clientHeight||document.body.clientHeight;this.curHeight=t-220},addRow:function(){this.listQuery.text="",this.getAllList(),this.row.type=this.listQuery.type,this.dialogShow=!0},editRow:function(t){this.flag="edit",this.row=t,this.dialogShow=!0},deleteRow:function(t){var e=this;console.log(t),this.$confirm("此操作将删除一条基础数据信息, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.listLoading=!0,e.delDicInfo(t)})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))},closeDialog:function(){this.row={},this.$refs.row.clearValidate()},submitRow:function(){var t=this;console.log(this.row),console.log(this.flag),this.$refs.row.validate(function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(r){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r){e.next=2;break}return e.abrupt("return",t.$message.error("信息填写不完整或不准确，请检查再提交！"));case 2:n=new FormData,n.append("code",t.row.code),n.append("type",t.row.type),n.append("text",t.row.text),n.append("remark",t.row.remark),"add"===t.flag?a["a"].addDicInfo(n).then((function(e){if(200!==e.status)return t.$message.error("失败");t.$message.success("新增一条基础数据成功"),t.dialogShow=!1,t.getAllList()})):"edit"===t.flag&&t.editSubmit(n);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},editSubmit:function(t){var e=this;a["a"].updateDicInfo(t).then((function(t){if(200!==t.status)return e.$message.error("更新失败");e.dialogShow=!1,e.getAllList(),e.$message.success("更新成功")}))},delDicInfo:function(t){var e=this,r=new FormData;r.append("code",t.code),r.append("type",t.type),r.append("text",t.text),r.append("remark",t.remark),a["a"].delDicInfo(r).then((function(t){if(200!==t.status)return e.$message.error("删除失败");e.getAllList(),e.$message.success("删除成功"),e.dialogShow=!1}))}}},l=s,c=r("2877"),u=Object(c["a"])(l,n,o,!1,null,"e558dc0e",null);e["default"]=u.exports},"96cf":function(t,e){!function(e){"use strict";var r,n=Object.prototype,o=n.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",s=i.asyncIterator||"@@asyncIterator",l=i.toStringTag||"@@toStringTag",c="object"===typeof t,u=e.regeneratorRuntime;if(u)c&&(t.exports=u);else{u=e.regeneratorRuntime=c?t.exports:{},u.wrap=b;var h="suspendedStart",f="suspendedYield",d="executing",p="completed",g={},m={};m[a]=function(){return this};var y=Object.getPrototypeOf,w=y&&y(y(T([])));w&&w!==n&&o.call(w,a)&&(m=w);var v=S.prototype=k.prototype=Object.create(m);L.prototype=v.constructor=S,S.constructor=L,S[l]=L.displayName="GeneratorFunction",u.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===L||"GeneratorFunction"===(e.displayName||e.name))},u.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,S):(t.__proto__=S,l in t||(t[l]="GeneratorFunction")),t.prototype=Object.create(v),t},u.awrap=function(t){return{__await:t}},_(E.prototype),E.prototype[s]=function(){return this},u.AsyncIterator=E,u.async=function(t,e,r,n){var o=new E(b(t,e,r,n));return u.isGeneratorFunction(e)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},_(v),v[l]="Generator",v[a]=function(){return this},v.toString=function(){return"[object Generator]"},u.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},u.values=T,Q.prototype={constructor:Q,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(O),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,o){return s.type="throw",s.arg=t,e.next=n,o&&(e.method="next",e.arg=r),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],s=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var l=o.call(a,"catchLoc"),c=o.call(a,"finallyLoc");if(l&&c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(l){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,g):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),O(r),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;O(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:T(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),g}}}function b(t,e,r,n){var o=e&&e.prototype instanceof k?e:k,i=Object.create(o.prototype),a=new Q(n||[]);return i._invoke=$(t,r,a),i}function x(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(n){return{type:"throw",arg:n}}}function k(){}function L(){}function S(){}function _(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function E(t){function e(r,n,i,a){var s=x(t[r],t,n);if("throw"!==s.type){var l=s.arg,c=l.value;return c&&"object"===typeof c&&o.call(c,"__await")?Promise.resolve(c.__await).then((function(t){e("next",t,i,a)}),(function(t){e("throw",t,i,a)})):Promise.resolve(c).then((function(t){l.value=t,i(l)}),a)}a(s.arg)}var r;function n(t,n){function o(){return new Promise((function(r,o){e(t,n,r,o)}))}return r=r?r.then(o,o):o()}this._invoke=n}function $(t,e,r){var n=h;return function(o,i){if(n===d)throw new Error("Generator is already running");if(n===p){if("throw"===o)throw i;return j()}r.method=o,r.arg=i;while(1){var a=r.delegate;if(a){var s=C(a,r);if(s){if(s===g)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===h)throw n=p,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=d;var l=x(t,e,r);if("normal"===l.type){if(n=r.done?p:f,l.arg===g)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(n=p,r.method="throw",r.arg=l.arg)}}}function C(t,e){var n=t.iterator[e.method];if(n===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=r,C(t,e),"throw"===e.method))return g;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return g}var o=x(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,g;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,g):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,g)}function R(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function Q(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(R,this),this.reset(!0)}function T(t){if(t){var e=t[a];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){while(++n<t.length)if(o.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=r,e.done=!0,e};return i.next=i}}return{next:j}}function j(){return{value:r,done:!0}}}(function(){return this}()||Function("return this")())},ad6d:function(t,e,r){"use strict";var n=r("825a");t.exports=function(){var t=n(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}}}]);
//# sourceMappingURL=chunk-222d8b64.49ec0dd0.js.map
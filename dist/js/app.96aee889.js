(function(t){function e(e){for(var s,o,i=e[0],c=e[1],l=e[2],d=0,m=[];d<i.length;d++)o=i[d],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&m.push(r[o][0]),r[o]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);u&&u(e);while(m.length)m.shift()();return n.push.apply(n,l||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],s=!0,i=1;i<a.length;i++){var c=a[i];0!==r[c]&&(s=!1)}s&&(n.splice(e--,1),t=o(o.s=a[0]))}return t}var s={},r={app:0},n=[];function o(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=s,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(a,s,function(e){return t[e]}.bind(null,s));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=e,i=i.slice();for(var l=0;l<i.length;l++)e(i[l]);var u=c;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"16f4":function(t,e,a){t.exports=a.p+"img/404.8b1bcd55.png"},"1a25":function(t,e,a){t.exports=a.p+"img/contact-book.a41643da.svg"},"309a":function(t,e,a){t.exports=a.p+"img/logout.16b3b3aa.svg"},"362c":function(t,e,a){"use strict";var s=a("5f2b"),r=a.n(s);r.a},"391f":function(t,e,a){"use strict";var s=a("e46a"),r=a.n(s);r.a},"487b":function(t,e,a){},"49f8":function(t,e,a){var s={"./en.json":"edd4","./fr.json":"f693"};function r(t){var e=n(t);return a(e)}function n(t){if(!a.o(s,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return s[t]}r.keys=function(){return Object.keys(s)},r.resolve=n,t.exports=r,r.id="49f8"},"56d7":function(t,e,a){"use strict";a.r(e),a.d(e,"eventBus",(function(){return xe}));a("e260"),a("e6cf"),a("cca6"),a("a79d");var s=a("2b0e"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("the-navbar"),a("transition",{attrs:{name:"slide-fade"}},[a("router-view")],1),a("switch-trad")],1)},n=[],o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.isPathChat?t._e():s("div",{staticClass:"navbar"},[s("router-link",{attrs:{to:"/"}},[s("img",{staticClass:"navbar__img",attrs:{src:a("cf05"),alt:"logo-icon"}})]),s("div",[t.isAuth?t._e():s("router-link",{staticClass:"link",attrs:{to:"/login"}},[t._v(t._s(t.$t("button.login")))]),t.isAuth?t._e():s("router-link",{staticClass:"link",attrs:{to:"/Signup"}},[t._v(t._s(t.$t("button.signup")))]),t.isAuth?s("button",{staticClass:"link",on:{click:t.logout}},[t._v(" "+t._s(t.$t("button.logout"))+" ")]):t._e()],1)],1)},i=[],c=(a("b0c0"),a("5530")),l=a("2f62"),u={name:"Navbar",methods:{logout:function(){return this.redirectHome(),this.$store.commit("logout")},redirectHome:function(){return this.$router.push("/")}},computed:Object(c["a"])(Object(c["a"])({},Object(l["b"])(["isAuth"])),{},{isPathChat:function(){return"Chat"===this.$route.name}})},d=u,m=(a("64f1"),a("2877")),p=Object(m["a"])(d,o,i,!1,null,"6b1411e6",null),h=p.exports,f=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"switch__trad",class:{"switch__trad__top-right":!t.isFooter&&t.isPathChat,"switch__trad__bottom-right":t.isFooter&&!t.isPathChat}},[s("a",{staticClass:"switch__trad--en",on:{click:t.swithToEnglish}},[s("img",{staticClass:"switch__trad__icon",class:{"trad-active":!t.isActive},attrs:{src:a("6bf7"),alt:"Flag USA"}})]),s("a",{staticClass:"switch__trad--fr",on:{click:t.swithToFrench}},[s("img",{staticClass:"switch__trad__icon",class:{"trad-active":t.isActive},attrs:{src:a("9baf"),alt:"Flag FR"}})])])},_=[],g={data:function(){return{isActive:!1}},props:{isFooter:{type:Boolean,default:!0}},computed:{isPathChat:function(){return"Chat"===this.$route.name}},methods:{swithToEnglish:function(){this.$i18n.locale="en",this.switchActive()},swithToFrench:function(){this.$i18n.locale="fr",this.switchActive()},switchActive:function(){this.isActive=!this.isActive}}},v=g,C=(a("7ef8"),Object(m["a"])(v,f,_,!1,null,"e634055c",null)),b=C.exports,y={name:"App",data:function(){return{isActive:!0}},created:function(){this.$store.dispatch("autoLogin")},components:{"the-navbar":h,"switch-trad":b}},w=y,I=(a("7faf"),Object(m["a"])(w,r,n,!1,null,null,null)),$=I.exports,x=a("8c4f"),S=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"header"},[s("main",{staticClass:"hero"},[s("div",{staticClass:"hero__text"},[s("h3",[t._v(t._s(t.$t("homepage.communication")))]),s("h1",{domProps:{innerHTML:t._s(t.$t("homepage.header"))}}),s("p",[t._v(" Bolt is a fresh platform to communicate with your friends with instant messages. Once you are signed in, find a friend thanks to its phone number and start chatting ! ")]),s("router-link",{attrs:{to:"/signup"}},[s("button",{staticClass:"btn"},[t._v(t._s(t.$t("button.onboarding")))])])],1),s("img",{staticClass:"hero__img",attrs:{src:a("d737"),alt:"cloud girl"}})])])},k=[],O={name:"Homepage"},M=O,E=(a("362c"),Object(m["a"])(M,S,k,!1,null,"7c22dd48",null)),U=E.exports,T=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("form",{staticClass:"container__form"},[a("div",{staticClass:"container__form__label"},[a("h2",[t._v(t._s(t.$t("signup.title")))])]),a("div",{staticClass:"container__form__photo"},[a("div",{staticClass:"container__form__photo__circle"},[a("img",{attrs:{src:t.profilePicDOM,alt:""}}),t.userData.profilePic?t._e():a("p",{staticClass:"container__form__photo__circle__label"},[t._v(" + Add photo "),a("br"),t._v(" here ")]),a("input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],ref:"myFiles",staticClass:"container__form__photo__upload",attrs:{id:"file",name:"image",type:"file"},on:{change:t.onFileSelected}}),a("label",{staticClass:"container__form__photo__circle__error"},[t._v(" "+t._s(t.errors.first("image"))+" ")])])]),a("div",{staticClass:"container__form__input"},[a("div",{staticClass:"container__form__field container__form__input__appelation"},[a("div",{staticClass:"container__form__input__appelation__error"},[a("input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"},{name:"model",rawName:"v-model",value:t.userData.name,expression:"userData.name"}],class:{error:t.errors.has("name")},attrs:{placeholder:t.$t("signup.placeholder.name"),name:"name",type:"text"},domProps:{value:t.userData.name},on:{input:function(e){e.target.composing||t.$set(t.userData,"name",e.target.value)}}}),a("label",{staticClass:"container__form__input__appelation__error__label"},[t._v(" "+t._s(t.errors.first("name"))+" ")])]),a("div",[a("div",{staticClass:"container__form__input__appelation__error"},[a("input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"},{name:"model",rawName:"v-model",value:t.userData.surname,expression:"userData.surname"}],class:{error:t.errors.has("surname")},attrs:{placeholder:t.$t("signup.placeholder.surname"),name:"surname",type:"text"},domProps:{value:t.userData.surname},on:{input:function(e){e.target.composing||t.$set(t.userData,"surname",e.target.value)}}}),a("label",{staticClass:"container__form__input__appelation__error__label"},[t._v(" "+t._s(t.errors.first("surname"))+" ")])])])]),a("div",{staticClass:"container__form__field"},[a("input",{directives:[{name:"validate",rawName:"v-validate",value:"required|regex:^([0-9]+)$",expression:"'required|regex:^([0-9]+)$'"},{name:"model",rawName:"v-model",value:t.userData.phone,expression:"userData.phone"}],class:{error:t.phoneError},attrs:{placeholder:t.$t("signup.placeholder.phone"),name:"phone",type:"text"},domProps:{value:t.userData.phone},on:{input:function(e){e.target.composing||t.$set(t.userData,"phone",e.target.value)}}}),a("label",[t._v(" "+t._s(t.errors.first("phone"))+" ")])]),a("div",{staticClass:"container__form__field"},[a("input",{directives:[{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"},{name:"model",rawName:"v-model",value:t.userData.email,expression:"userData.email"}],class:{error:t.emailError},attrs:{placeholder:t.$t("signup.placeholder.email"),name:"email",type:"text"},domProps:{value:t.userData.email},on:{input:function(e){e.target.composing||t.$set(t.userData,"email",e.target.value)}}}),a("label",[t._v(" "+t._s(t.errors.first("email"))+" ")])]),a("div",{staticClass:"container__form__field"},[a("input",{directives:[{name:"validate",rawName:"v-validate",value:"required|min:6",expression:"'required|min:6'"},{name:"model",rawName:"v-model",value:t.userData.password,expression:"userData.password"}],class:{error:t.passwordError},attrs:{placeholder:t.$t("signup.placeholder.password"),name:"password",type:"text"},domProps:{value:t.userData.password},on:{input:function(e){e.target.composing||t.$set(t.userData,"password",e.target.value)}}}),a("label",[t._v(" "+t._s(t.errors.first("password"))+" ")])])]),a("div",{staticClass:"container__form__btn"},[a("button",{staticClass:"btn",attrs:{type:"submit"},on:{click:function(e){return e.preventDefault(),t.formSubmitted(e)}}},[t._v(" "+t._s(t.$t("button.signup"))+" ")])])])])},D=[],j=(a("45fc"),a("8aa5")),P=a.n(j),N={name:"Signup",data:function(){return{userData:{name:"",surname:"",email:"",phone:"",profilePic:null}}},computed:{profilePicDOM:function(){return this.userData.profilePic?this.userData.profilePic:a("dac7")},emailError:function(){return this.$validator.errors.items.some((function(t){return"email"===t.field&&"required"===t.rule}))},phoneError:function(){return this.$validator.errors.items.some((function(t){return"phone"===t.field&&"required"===t.rule}))},passwordError:function(){return this.$validator.errors.items.some((function(t){return"password"===t.field&&"required"===t.rule}))}},methods:{formSubmitted:function(){var t=this;this.$validator.validateAll().then((function(e){e?t.$store.dispatch("signup",t.userData):alert("Form not valid")}))},onFileSelected:function(t){var e=this,a=t.target.files[0],s=P.a.storage().ref("profile-pics/"+a.name),r=s.put(a);r.on("state_changed",(function(t){console.log(t)}),(function(t){console.log(t)}),(function(){r.snapshot.ref.getDownloadURL().then((function(t){e.userData.profilePic=t}))}))}}},L=N,q=(a("dfde"),Object(m["a"])(L,T,D,!1,null,"253c9eac",null)),A=q.exports,F=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("form",{staticClass:"container__form"},[a("h2",[t._v("Please login")]),a("div",{staticClass:"container__form__field"},[a("input",{directives:[{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"},{name:"model",rawName:"v-model",value:t.userData.email,expression:"userData.email"}],class:{error:t.emailError},attrs:{placeholder:t.$t("login.placeholder.email"),name:"email",type:"text"},domProps:{value:t.userData.email},on:{input:function(e){e.target.composing||t.$set(t.userData,"email",e.target.value)}}}),a("label",[t._v(" "+t._s(t.errors.first("email"))+" ")])]),a("div",{staticClass:"container__form__field"},[a("input",{directives:[{name:"validate",rawName:"v-validate",value:"required|min:6",expression:"'required|min:6'"},{name:"model",rawName:"v-model",value:t.userData.password,expression:"userData.password"}],class:{error:t.passwordError},attrs:{placeholder:t.$t("login.placeholder.password"),name:"password",type:"text"},domProps:{value:t.userData.password},on:{input:function(e){e.target.composing||t.$set(t.userData,"password",e.target.value)}}}),a("label",[t._v(" "+t._s(t.errors.first("password"))+" ")])]),a("button",{staticClass:"btn",on:{click:function(e){return e.preventDefault(),t.formSubmitted(e)}}},[t._v(" "+t._s(t.$t("button.login"))+" ")])])])},z=[],J={name:"Login",data:function(){return{userData:{email:"",password:""}}},computed:{emailError:function(){return this.$validator.errors.items.some((function(t){return"email"===t.field&&"required"===t.rule}))},phoneError:function(){return this.$validator.errors.items.some((function(t){return"phone"===t.field&&"required"===t.rule}))},passwordError:function(){return this.$validator.errors.items.some((function(t){return"password"===t.field&&"required"===t.rule}))}},methods:{formSubmitted:function(){var t=this;this.$validator.validateAll().then((function(e){e?t.$store.dispatch("login",t.userData):alert("Form not valid")}))}}},W=J,H=(a("7aaa"),Object(m["a"])(W,F,z,!1,null,"58af9034",null)),B=H.exports,R=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"chat"},[a("div",{staticClass:"background"}),a("switch-trad",{attrs:{"is-footer":!1}}),a("side-bar"),a("list-label"),a(t.listType,{tag:"component",staticClass:"chat__lists"}),a("contact-info"),a("contact-messages"),a("user-onboarding")],1)},K=[],G=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"chat__category"},["list-user-messages"===t.listType?a("h3",{staticClass:"chat__category__name"},[t._v(" "+t._s(t.listLabel)+" ")]):a("h3",{staticClass:"chat__category__name"},[t._v(" "+t._s(t.$t("chat.list.label"))+" ")])])},Q=[],Y={computed:Object(c["a"])({},Object(l["b"])(["listType","listLabel"]))},V=Y,Z=Object(m["a"])(V,G,Q,!1,null,null,null),X=Z.exports,tt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"list-category"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],staticClass:"list-category__search-bar",attrs:{placeholder:t.$t("chat.list.placeholder"),type:"text"},domProps:{value:t.search},on:{input:function(e){e.target.composing||(t.search=e.target.value)}}}),t._l(t.filterUsers,(function(e){return a("div",{key:e.id,staticClass:"list-category__user"},[a("img",{staticClass:"list-category__user__img",attrs:{src:e.profilePic,alt:"Main Profile Photo"}}),a("div",{staticClass:"list-category__user__info"},[a("h2",{staticClass:"list-category__user__info__name"},[t._v(" "+t._s(e.name)+" "+t._s(e.surname)+" ")]),a("p",{staticClass:"list-category__user__info__phone"},[t._v(" "+t._s(e.phone)+" ")])]),a("button",{staticClass:"list-category__user__btn list-category__user__btn__chat",on:{click:function(a){return t.chatWithContact(e)}}},[t._v(" Chat ")])])}))],2)},et=[],at=(a("4de4"),a("ac1f"),a("466d"),a("841c"),a("498a"),{name:"FindUsers",data:function(){return{search:""}},computed:Object(c["a"])(Object(c["a"])({},Object(l["b"])(["users","listType"])),{},{filterUsers:function(){var t=this;return this.users.filter((function(e){return e.phone.match(t.search.trim())}))}}),methods:{chatWithContact:function(t){return xe.$emit("chatWithContact"),this.$store.dispatch("chatWithContact",t)}}}),st=at,rt=(a("391f"),Object(m["a"])(st,tt,et,!1,null,"56b7eedc",null)),nt=rt.exports,ot=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.userChatContact?a("div",{staticClass:"list-category"},t._l(t.userChatContactsSorted,(function(e){return a("div",{key:e.id,staticClass:"list-category__user",class:{activeChat:e.localId===t.userChatContact.localId},on:{click:function(a){return t.fetchMessages(e)}}},[a("img",{staticClass:"list-category__user__img",attrs:{src:e.profilePic,alt:"Main Profile Photo"}}),a("div",{staticClass:"list-category__user__info"},[a("h2",{staticClass:"list-category__user__info__name"},[t._v(" "+t._s(e.name)+" "+t._s(e.surname)+" ")]),a("p",{staticClass:"list-category__user__info__message"},[t._v(" "+t._s(t._f("sliceMessage")(e.messages))+" ")])]),a("h3",{staticClass:"list-category__user__time"},[t._v(" "+t._s(t._f("setTimeHourMinutes")(e.messages))+" ")])])})),0):t._e()},it=[],ct={name:"Messages",data:function(){return{test:{},userContacts:[]}},computed:Object(c["a"])({},Object(l["b"])(["userChatContacts","userChatContactsSorted","userChatContact"])),methods:{fetchMessages:function(t){xe.$emit("chatWithContact"),this.$store.dispatch("chatWithContact",t)}}},lt=ct,ut=(a("ccee"),Object(m["a"])(lt,ot,it,!1,null,"3adbc063",null)),dt=ut.exports,mt=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"chat__side-bar"},[s("div",{staticClass:"chat__side-bar__container"},[t.user?s("a",{staticClass:"chat__side-bar__link"},[s("img",{staticClass:"chat__side-bar__profile-pic",attrs:{src:t.user.profilePic,alt:"Edit Button"}})]):t._e(),t.userChatContacts.length?s("a",{staticClass:"chat__side-bar__link",class:{"chat__side-bar__link--active":"list-user-messages"===t.listType},on:{click:t.switchToUserMessages}},[s("img",{staticClass:"chat__side-bar__icon",attrs:{src:a("5f66"),alt:"Edit Button"}})]):t._e(),s("a",{staticClass:"chat__side-bar__link",class:{"chat__side-bar__link--active":"list-users"===t.listType},on:{click:t.switchToUsers}},[s("img",{staticClass:"chat__side-bar__icon",attrs:{src:a("1a25"),alt:"Edit Button"}})])]),s("div",[s("a",{staticClass:"chat__side-bar__link",on:{click:t.logout}},[s("img",{staticClass:"chat__side-bar__icon chat__side-bar__icon--last",attrs:{src:a("309a"),alt:"Edit Button"}})])])])},pt=[],ht={name:"UserChatSideBar",computed:Object(c["a"])({},Object(l["b"])(["user","userChatContacts","listType"])),methods:{logout:function(){return this.redirectHome(),this.$store.commit("logout")},switchToUserMessages:function(){return this.$store.commit("switchToUserMessages")},switchToUsers:function(){return this.$store.commit("switchToUsers")},redirectHome:function(){this.$router.push("/login"),location.reload()}}},ft=ht,_t=Object(m["a"])(ft,mt,pt,!1,null,"23cb10c0",null),gt=_t.exports,vt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.userChatContact?a("div",{staticClass:"chat__contact"},[a("img",{attrs:{src:t.userChatContact.profilePic,alt:"Main Profile Photo"}}),a("div",{staticClass:"chat__contact__information"},[a("h1",[t._v(t._s(t.userChatContact.name)+" "+t._s(t.userChatContact.surname))]),t.userChatContactMessages.length>1?a("p",[t._v(" "+t._s(t.userChatContactMessages.length)+" messages ")]):a("p",[t._v(t._s(t.userChatContactMessages.length)+" message")])])]):t._e()},Ct=[],bt={name:"UserChatCurrentContact",computed:Object(c["a"])({},Object(l["b"])(["userChatContact","userChatContactMessages"]))},yt=bt,wt=Object(m["a"])(yt,vt,Ct,!1,null,null,null),It=wt.exports,$t=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"chat__messages"},[t.userChatContactMessages?s("div",{staticClass:"chat__messages__conversation"},t._l(t.userChatContactMessages,(function(e){return s("p",{key:e.id,class:{sent:"sent"===e.type}},[t._v(" "+t._s(e.message)+" ")])})),0):t._e(),s("div",{staticClass:"chat__messages__write",on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.sendMessage(e)}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.message,expression:"message"}],ref:"typeMessage",attrs:{placeholder:t.$t("chat.typing"),type:"text"},domProps:{value:t.message},on:{input:function(e){e.target.composing||(t.message=e.target.value)}}}),s("img",{attrs:{src:a("ad0d"),alt:"Send Icon"},on:{click:t.sendMessage}})])])},xt=[],St={name:"UserChatContactMessages",data:function(){return{message:null}},created:function(){var t=this;this.userChatContactMessages&&xe.$on("chatWithContact",(function(){t.selectTypeInput()}))},computed:Object(c["a"])({},Object(l["b"])(["userChatContact","userChatContactMessages"])),methods:{sendMessage:function(){this.$store.dispatch("storeMessage",this.message),this.clearTypeInput(),this.selectTypeInput()},clearTypeInput:function(){this.message=""},selectTypeInput:function(){this.$refs.typeMessage.select()}}},kt=St,Ot=Object(m["a"])(kt,$t,xt,!1,null,null,null),Mt=Ot.exports,Et=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{directives:[{name:"show",rawName:"v-show",value:!t.userChatContact,expression:"!userChatContact"}],staticClass:"chat__onboarding"},[s("img",{staticClass:"chat__onboarding__photo",attrs:{src:a("dd45"),alt:"Hello"}}),s("div",{staticClass:"chat__onboarding__header"},[s("h1",{staticClass:"chat__onboarding__text__main"},[t._v(" "+t._s(t.$t("chat.onboarding.welcome"))+" ! "),s("h2",{staticClass:"chat__onboarding__text__second"},[t._v(" "+t._s(t.$t("chat.onboarding.subline"))+" ")])])])])},Ut=[],Tt={name:"UserChatOnboarding",computed:Object(c["a"])({},Object(l["b"])(["userChatContact"]))},Dt=Tt,jt=(a("ea8d"),Object(m["a"])(Dt,Et,Ut,!1,null,"688a7b2e",null)),Pt=jt.exports,Nt={name:"UserChat",components:{"list-label":X,"list-users":nt,"list-user-messages":dt,"side-bar":gt,"contact-info":It,"contact-messages":Mt,"user-onboarding":Pt,"switch-trad":b},mounted:function(){this.refreshLocalStorage()},created:function(){this.$toasted.success("Logged In",{className:"toast-success",theme:"bubble",position:"top-right",duration:2e3})},computed:Object(c["a"])({},Object(l["b"])(["listType"])),methods:{refreshLocalStorage:function(){if(localStorage.getItem("storeUser")){var t=JSON.parse(localStorage.getItem("storeUser"));this.$store.commit("storeUser",t)}if(localStorage.getItem("storeUsers")){var e=JSON.parse(localStorage.getItem("storeUsers"));this.$store.commit("storeUsers",e)}if(localStorage.getItem("userChatContact")){var a=JSON.parse(localStorage.getItem("userChatContact"));this.$store.dispatch("chatWithContact",a)}if(localStorage.getItem("userChatContacts")){var s=JSON.parse(localStorage.getItem("userChatContacts"));this.$store.commit("storeUserChatContacts",s)}if(localStorage.getItem("userChatContactMessages")){var r=JSON.parse(localStorage.getItem("userChatContactMessages"));this.$store.commit("storeUserChatContactMessages",r)}}}},Lt=Nt,qt=(a("c7e7"),Object(m["a"])(Lt,R,K,!1,null,null,null)),At=qt.exports,Ft=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("img",{attrs:{src:a("16f4"),alt:"404 error"}}),s("h2",[t._v(" "+t._s(t.$t("error.404"))+" ")])])},zt=[],Jt={name:"Error"},Wt=Jt,Ht=(a("e10a"),Object(m["a"])(Wt,Ft,zt,!1,null,"859a7508",null)),Bt=Ht.exports;s["a"].use(x["a"]);var Rt=[{path:"/",name:"Homepage",component:U},{path:"/signup",name:"Signup",component:A},{path:"/login",name:"Login",component:B},{path:"/chat",name:"Chat",component:At,beforeEnter:function(t,e,a){localStorage.getItem("tokenId")?a():a("/login")}},{path:"*",name:"404",component:Bt}],Kt=new x["a"]({mode:"history",base:"/",routes:Rt}),Gt=Kt,Qt=(a("5319"),a("bc3a")),Yt=a.n(Qt),Vt={userId:null,tokenId:null},Zt={isAuth:function(t){return null!==t.tokenId}},Xt={authUser:function(t,e){t.tokenId=e.tokenId,t.userId=e.userId},logout:function(t){t.tokenId=null,localStorage.clear()}},te={login:function(t,e){var a=t.commit,s=t.dispatch;Yt.a.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCGkv9-83v6LsQRhClROTowTL6rK5YcPI8",{email:e.email,password:e.password,returnSecureToken:!0}).then((function(t){console.log(t),a("storeLocalStorageUser",{tokenId:t.data.idToken,localId:t.data.localId,expiresIn:t.data.expiresIn}),a("authUser",{tokenId:t.data.idToken,userId:t.data.localId}),Gt.replace("/chat"),s("fetchUser")})).catch((function(t){console.log(t),alert("Invalid email")}))},signup:function(t,e){var a=t.commit,s=t.dispatch;Yt.a.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGkv9-83v6LsQRhClROTowTL6rK5YcPI8",{email:e.email,password:e.password,returnSecureToken:!0}).then((function(t){delete e.email,delete e.password,a("storeLocalStorageUser",{tokenId:t.data.idToken,localId:t.data.localId,expiresIn:t.data.expiresIn,userData:e}),a("authUser",{tokenId:t.data.idToken,userId:t.data.localId}),e.localId=t.data.localId,s("storeUser",e),Gt.replace("/chat")})).catch((function(t){console.log(t)}))},autoLogin:function(t){var e=t.commit,a=localStorage.getItem("userId"),s=localStorage.getItem("tokenId"),r=localStorage.getItem("expiresIn"),n=localStorage.getItem("userData"),o=new Date;!s&&o>=r||(e("authUser",{tokenId:s,userId:a}),e("storeUser",n))}},ee={state:Vt,getters:Zt,mutations:Xt,actions:te},ae=(a("7db0"),{user:null,userChatContact:null,userChatContacts:[],users:[]}),se={user:function(t){return t.user},userChatContact:function(t){return t.userChatContact},userChatContacts:function(t){return t.userChatContacts},userChatContactsSorted:function(t){return t.userChatContacts.sort((function(t,e){return e.lastTimestamp-t.lastTimestamp}))},users:function(t){return t.users},componentKey:function(t){return t.componentKey}},re={storeUser:function(t,e){t.user=e},storeUserChatContact:function(t,e){t.userChatContact=e},storeUserChatContacts:function(t,e){t.userChatContacts=e},addUserContact:function(t,e){t.user.contacts.push(e),t.users=t.users.filter((function(t){return t.localId!==e.localId}))},storeUsers:function(t,e){t.users=e},storeLocalStorageUser:function(t,e){var a=new Date,s=new Date(a.getTime()+1e3*e.expiresIn);localStorage.setItem("tokenId",e.tokenId),localStorage.setItem("userId",e.localId),localStorage.setItem("userData",e.userData),localStorage.setItem("expiresIn",s)}},ne={storeUser:function(t,e){var a=t.commit,s=t.dispatch;Yt.a.post("https://message-app-719f5.firebaseio.com/users.json",e).then((function(t){console.log(t),a("storeUser",e),s("fetchUser")})).catch((function(t){return console.log(t)}))},fetchUser:function(t){var e=t.commit,a=t.dispatch,s=t.rootState;Yt.a.get("https://message-app-719f5.firebaseio.com/users.json").then((function(t){console.log(t);var r=t.data,n=[];for(var o in r){var i=r[o];i.key=o,n.push(i)}var c=n.find((function(t){return t.localId===s.auth.userId})),l=n.filter((function(t){return t.localId!==s.auth.userId}));localStorage.setItem("storeUser",JSON.stringify(c)),localStorage.setItem("storeUsers",JSON.stringify(l)),e("storeUser",c),e("storeUsers",l),a("fetchMessages")})).catch((function(t){return console.log(t)}))},chatWithContact:function(t,e){var a=t.commit;localStorage.setItem("userChatContact",JSON.stringify(e)),a("storeUserChatContact",e),a("emptyMessages"),e.messages&&a("storeUserChatContactMessages",e.messages),a("switchToUserMessages")}},oe={state:ae,getters:se,mutations:re,actions:ne},ie={type:"list-users"},ce={listType:function(t){return t.type},listLabel:function(t){return"list-user-messages"===t.type?"Messages":"list-users"===t.type?"Find New Contact":void 0}},le={switchToUsers:function(t){t.type="list-users"},switchToUserMessages:function(t){t.type="list-user-messages"}},ue={},de={state:ie,getters:ce,mutations:le,actions:ue},me=(a("99af"),a("4160"),a("d81d"),a("159b"),{userChatContactMessages:[]}),pe={userChatContactMessages:function(t){return t.userChatContactMessages}},he={storeUserChatContactMessages:function(t,e){t.userChatContactMessages=e},emptyMessages:function(t){t.userChatContactMessages=[]},storeMessage:function(t,e){t.userChatContactMessages.push(e)}},fe={storeMessage:function(t,e){var a=t.state,s=t.rootState,r=t.commit,n=t.dispatch,o=(new Date).getTime(),i={senderId:s.users.user.localId,receiverId:s.users.userChatContact.localId,message:e,timestamp:o},c=i;c.type="sent",r("storeMessage",c),localStorage.setItem("userChatContactMessages",JSON.stringify(a.userChatContactMessages)),P.a.database().ref("messages").push(i).then((function(t){console.log(t),n("fetchMessages"),r("switchToUserMessages")})).catch((function(t){return console.log(t)}))},fetchMessages:function(t){t.state;var e=t.rootState,s=t.commit,r=t.dispatch;P.a.database().ref("messages").on("value",(function(t){var n=[],o=t.val();for(var i in o){var c=o[i];n.push(c)}var l=e.users.user.localId,u=a("2ef0"),d=n.filter((function(t){return t.receiverId===l||t.senderId===l})).map((function(t){var e=t.senderId===l?t.receiverId:t.senderId;return e}));if(d.length){var m=u.uniq(d,"localId").filter((function(t){return t!==l})),p=[];m.forEach((function(t){var a=e.users.users.find((function(e){return e.localId===t}));p.push(a)})),p.forEach((function(t){var e=n.filter((function(e){return e.receiverId===t.localId&&e.senderId===l||e.receiverId===l&&e.senderId===t.localId})),a=e.filter((function(t){return t.senderId===l}));a.forEach((function(t){return t.type="sent"}));var s=e.filter((function(t){return t.receiverId===l}));s.forEach((function(t){return t.type="received"}));var r=a.concat(s);t.messages=r.sort((function(t,e){return e.timestamp-t.timestamp}));var o=r.sort((function(t,e){return t.timestamp-e.timestamp}));t.lastTimestamp=o[o.length-1].timestamp})),s("storeUserChatContacts",p),localStorage.setItem("userChatContacts",JSON.stringify(p));var h=n.filter((function(t){return t.receiverId===l||t.senderId===l})),f=h[h.length-1],_=f.senderId===l?f.receiverId:f.senderId,g=p.find((function(t){return t.localId===_}));r("chatWithContact",g)}}))}},_e={state:me,getters:pe,mutations:he,actions:fe};s["a"].use(l["a"]);var ge=new l["a"].Store({modules:{auth:ee,users:oe,lists:de,messages:_e}}),ve=ge,Ce=a("7bb1"),be=(a("d3b7"),a("ddb0"),a("a925"));function ye(){var t=a("49f8"),e={};return t.keys().forEach((function(a){var s=a.match(/([A-Za-z0-9-_]+)\./i);if(s&&s.length>1){var r=s[1];e[r]=t(a)}})),e}s["a"].use(be["a"]);var we=new be["a"]({locale:"en",fallbackLocale:"en",messages:ye()}),Ie=a("a65d"),$e=a.n(Ie);a("fb6a");s["a"].filter("setTimeHourMinutes",(function(t){var e=t.length-1,a=t[e].timestamp,s=new Date(a),r=s.getHours(),n="0".concat(s.getMinutes()),o="".concat(r,":").concat(n.substr(-2));return o})),s["a"].filter("sliceMessage",(function(t){var e=t.length-1;return t[e].message.slice(0,14)+".."})),s["a"].config.productionTip=!1,s["a"].use(Ce["a"]),s["a"].use($e.a);var xe=new s["a"],Se={apiKey:"AIzaSyCGkv9-83v6LsQRhClROTowTL6rK5YcPI8",authDomain:"message-app-719f5.firebaseapp.com",databaseURL:"https://message-app-719f5.firebaseio.com",projectId:"message-app-719f5",storageBucket:"message-app-719f5.appspot.com",messagingSenderId:"114576309871",appId:"1:114576309871:web:bc8e8f4dfdee99f352d79a"};P.a.initializeApp(Se),new s["a"]({router:Gt,store:ve,i18n:we,render:function(t){return t($)}}).$mount("#app")},"5f2b":function(t,e,a){},"5f66":function(t,e,a){t.exports=a.p+"img/chat.8fc2dcfe.svg"},"64f1":function(t,e,a){"use strict";var s=a("e032"),r=a.n(s);r.a},"6b70":function(t,e,a){},"6bf7":function(t,e,a){t.exports=a.p+"img/flag-us.38f88714.svg"},"7aaa":function(t,e,a){"use strict";var s=a("d950"),r=a.n(s);r.a},"7ef8":function(t,e,a){"use strict";var s=a("8efe"),r=a.n(s);r.a},"7faf":function(t,e,a){"use strict";var s=a("b8ff"),r=a.n(s);r.a},"8efe":function(t,e,a){},"9baf":function(t,e,a){t.exports=a.p+"img/flag-fr.684cc20f.svg"},ad0d:function(t,e,a){t.exports=a.p+"img/send.317b15cf.svg"},b8ff:function(t,e,a){},bb28:function(t,e,a){},c5eb:function(t,e,a){},c77a:function(t,e,a){},c7e7:function(t,e,a){"use strict";var s=a("bb28"),r=a.n(s);r.a},ccee:function(t,e,a){"use strict";var s=a("c5eb"),r=a.n(s);r.a},cf05:function(t,e,a){t.exports=a.p+"img/logo.7ddcdbf3.png"},d737:function(t,e,a){t.exports=a.p+"img/cloud-girl.56aa2ad8.png"},d950:function(t,e,a){},dac7:function(t,e,a){t.exports=a.p+"img/default-user.4140fefe.png"},dd45:function(t,e,a){t.exports=a.p+"img/hello.92b2d250.png"},dfde:function(t,e,a){"use strict";var s=a("6b70"),r=a.n(s);r.a},e032:function(t,e,a){},e10a:function(t,e,a){"use strict";var s=a("487b"),r=a.n(s);r.a},e46a:function(t,e,a){},ea8d:function(t,e,a){"use strict";var s=a("c77a"),r=a.n(s);r.a},edd4:function(t){t.exports=JSON.parse('{"homepage":{"header":"Communicate <span>Easily</span>","communication":"Talk. Chat. Collaborate."},"button":{"onboarding":"Get Started","logout":"Logout","login":"Login","signup":"Signup"},"signup":{"title":"Please fill this form","placeholder":{"name":"Enter your name..","surname":"Enter your surname..","phone":"Enter your phone..","email":"Enter your email..","password":"Enter your password.."}},"login":{"title":"Signup","placeholder":{"email":"Enter your email..","password":"Enter your password.."}},"chat":{"list":{"label":"Find New Contacts","placeholder":"Enter your phone.."},"typing":"Type your message here..","onboarding":{"welcome":"Welcome","subline":"Find contacts and start chatting !"}},"error":{"404":"The page you are looking for does not exist !"}}')},f693:function(t){t.exports=JSON.parse('{"homepage":{"header":"Communique <span>Facilement</span>","communication":"Discute. Chat. Collabore."},"button":{"onboarding":"Essai maintenant","logout":"Déconnexion","login":"Connexion","signup":"S\'inscire"},"signup":{"title":"Veuillez remplir ce formulaire","placeholder":{"name":"Entrez votre prénom..","surname":"Entrez votre nom..","phone":"Entrez votre numéro mobile..","email":"Entrez votre email..","password":"Entrez votre mot de passe.."}},"login":{"title":"Inscription","placeholder":{"email":"Entrez votre email..","password":"Entrez votre mot de passe.."}},"chat":{"list":{"label":"Trouve de Nouveaux Contacts","placeholder":"Entrez votre numéro mobile.."},"typing":"Ecrivez un message..","onboarding":{"welcome":"Bienvenu","subline":"Trouve des contacts et commence à chatter !"}},"error":{"404":"La page que vous recherchez n\'existe pas !"}}')}});
//# sourceMappingURL=app.96aee889.js.map
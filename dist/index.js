!function t(e,n,r){function i(a,s){if(!n[a]){if(!e[a]){var c="function"==typeof require&&require;if(!s&&c)return c(a,!0);if(o)return o(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[a]={exports:{}};e[a][0].call(f.exports,function(t){var n=e[a][1][t];return i(n?n:t)},f,f.exports,t,e,n,r)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<r.length;a++)i(r[a]);return i}({1:[function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function i(){window.requestAnimationFrame(i),p.forEach(function(t){t.update()})}var o=t("seamless-immutable"),a=r(o),s=t("./create-sprite"),c=r(s),u=document.querySelector(".main"),f=(u.querySelector(".main"),u.querySelector(".canvas")),l=new Image;l.src="/images/running.png";var h=(0,c["default"])({context:f.getContext("2d"),width:212,height:294,numberOfFrames:5,image:l,ticksPerFrame:8,loop:!0}),p=[h];p.forEach(function(t){var e=0;t.image.addEventListener("load",function(){e++,e===p.length&&i()})});var y=((0,a["default"])({}),function(){window.addEventListener("mousewheel",function(t){t.preventDefault(),t.stopPropagation()})});y()},{"./create-sprite":2,"seamless-immutable":4}],2:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(t){var e=t.numberOfFrames||1,n=0,r=0,i=t.ticksPerFrame||1,o={context:t.context,width:t.width*e,height:t.height,image:t.image,loop:t.loop,update:function(){o.context.clearRect(0,0,o.width,o.height),o.context.drawImage(o.image,n*o.width/e,0,o.width/e,o.height,0,0,o.width/e,o.height),r+=1,r>=i&&(r=0,e-1>n?n+=1:o.loop&&(n=0))},changeSprite:function(t){Object.keys(t).forEach(function(e){o[e]=t[e]})}};return o}},{}],3:[function(t,e,n){function r(){h&&f&&(h=!1,f.length?l=f.concat(l):p=-1,l.length&&i())}function i(){if(!h){var t=s(r);h=!0;for(var e=l.length;e;){for(f=l,l=[];++p<e;)f&&f[p].run();p=-1,e=l.length}f=null,h=!1,c(t)}}function o(t,e){this.fun=t,this.array=e}function a(){}var s,c,u=e.exports={};!function(){try{s=setTimeout}catch(t){s=function(){throw new Error("setTimeout is not defined")}}try{c=clearTimeout}catch(t){c=function(){throw new Error("clearTimeout is not defined")}}}();var f,l=[],h=!1,p=-1;u.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];l.push(new o(t,e)),1!==l.length||h||s(i,0)},o.prototype.run=function(){this.fun.apply(null,this.array)},u.title="browser",u.browser=!0,u.env={},u.argv=[],u.version="",u.versions={},u.on=a,u.addListener=a,u.once=a,u.off=a,u.removeListener=a,u.removeAllListeners=a,u.emit=a,u.binding=function(t){throw new Error("process.binding is not supported")},u.cwd=function(){return"/"},u.chdir=function(t){throw new Error("process.chdir is not supported")},u.umask=function(){return 0}},{}],4:[function(t,e,n){(function(t,r){!function(){"use strict";function i(t,e,n){Object.defineProperty(t,e,{enumerable:!1,configurable:!1,writable:!1,value:n})}function o(t,e){i(t,e,function(){throw new u("The "+e+" method cannot be invoked on an Immutable data structure.")})}function a(t){i(t,q,!0)}function s(t){return"object"==typeof t?null===t||Boolean(Object.getOwnPropertyDescriptor(t,q)):!0}function c(t){return!(null===t||"object"!=typeof t||t instanceof Array||t instanceof Date)}function u(t){var e=new Error(t);return e.__proto__=u,e}function f(e,n){if(a(e),"production"!==t.env.NODE_ENV){for(var r in n)n.hasOwnProperty(r)&&o(e,n[r]);Object.freeze(e)}return e}function l(t,e){var n=t[e];i(t,e,function(){return k(n.apply(t,arguments))})}function h(t,e){if(t in this&&this[t]===e)return this;var n=w.call(this);return n[t]=k(e),y(n)}function p(t,e){var n=t[0];if(1===t.length)return h.call(this,n,e);var r,i=t.slice(1),o=this[n];if(r="object"==typeof o&&null!==o&&"function"==typeof o.setIn?o.setIn(i,e):p.call(R,i,e),n in this&&o===r)return this;var a=w.call(this);return a[n]=r,y(a)}function y(t){for(var e in $)if($.hasOwnProperty(e)){var n=$[e];l(t,n)}i(t,"flatMap",v),i(t,"asObject",g),i(t,"asMutable",w),i(t,"set",h),i(t,"setIn",p),i(t,"update",D),i(t,"updateIn",_);for(var r=0,o=t.length;o>r;r++)t[r]=k(t[r]);return f(t,L)}function d(t){return i(t,"asMutable",m),f(t,H)}function m(){return new Date(this.getTime())}function v(t){if(0===arguments.length)return this;var e,n=[],r=this.length;for(e=0;r>e;e++){var i=t(this[e],e,this);i instanceof Array?n.push.apply(n,i):n.push(i)}return y(n)}function b(t){if("undefined"==typeof t&&0===arguments.length)return this;if("function"!=typeof t){var e=t instanceof Array?t:Array.prototype.slice.call(arguments);t=function(t,n){return-1!==e.indexOf(n)}}var n=this.instantiateEmptyObject();for(var r in this)this.hasOwnProperty(r)&&t(this[r],r)===!1&&(n[r]=this[r]);return A(n,{instantiateEmptyObject:this.instantiateEmptyObject})}function w(t){var e,n,r=[];if(t&&t.deep)for(e=0,n=this.length;n>e;e++)r.push(O(this[e]));else for(e=0,n=this.length;n>e;e++)r.push(this[e]);return r}function g(t){"function"!=typeof t&&(t=function(t){return t});var e,n={},r=this.length;for(e=0;r>e;e++){var i=t(this[e],e,this),o=i[0],a=i[1];n[o]=a}return A(n)}function O(t){return!t||"object"!=typeof t||!Object.getOwnPropertyDescriptor(t,q)||t instanceof Date?t:t.asMutable({deep:!0})}function j(t,e){for(var n in t)Object.getOwnPropertyDescriptor(t,n)&&(e[n]=t[n]);return e}function E(t,e){function n(t,n,i){var o=k(n[i]),u=s&&s(t[i],o,e),f=t[i];if(void 0!==r||void 0!==u||!t.hasOwnProperty(i)||o!==f&&o===o){var l;l=u?u:a&&c(f)&&c(o)?f.merge(o,e):o,(f!==l&&l===l||!t.hasOwnProperty(i))&&(void 0===r&&(r=j(t,t.instantiateEmptyObject())),r[i]=l)}}if(0===arguments.length)return this;if(null===t||"object"!=typeof t)throw new TypeError("Immutable#merge can only be invoked with objects or arrays, not "+JSON.stringify(t));var r,i,o=t instanceof Array,a=e&&e.deep,s=e&&e.merger;if(o)for(var u=0;u<t.length;u++){var f=t[u];for(i in f)f.hasOwnProperty(i)&&n(this,f,i)}else for(i in t)Object.getOwnPropertyDescriptor(t,i)&&n(this,t,i);return void 0===r?this:A(r,{instantiateEmptyObject:this.instantiateEmptyObject})}function P(t,e){var n=t[0];if(1===t.length)return I.call(this,n,e);var r,i=t.slice(1),o=this[n];if(r=this.hasOwnProperty(n)&&"object"==typeof o&&null!==o&&"function"==typeof o.setIn?o.setIn(i,e):P.call(Y,i,e),this.hasOwnProperty(n)&&o===r)return this;var a=j(this,this.instantiateEmptyObject());return a[n]=r,A(a,this)}function I(t,e){if(this.hasOwnProperty(t)&&this[t]===e)return this;var n=j(this,this.instantiateEmptyObject());return n[t]=k(e),A(n,this)}function D(t,e){var n=Array.prototype.slice.call(arguments,2),r=this[t];return this.set(t,e.apply(r,[r].concat(n)))}function T(t,e){for(var n=0,r=e.length;null!=t&&r>n;n++)t=t[e[n]];return n&&n==r?t:void 0}function _(t,e){var n=Array.prototype.slice.call(arguments,2),r=T(this,t);return this.setIn(t,e.apply(r,[r].concat(n)))}function x(t){var e,n=this.instantiateEmptyObject();if(t&&t.deep)for(e in this)this.hasOwnProperty(e)&&(n[e]=O(this[e]));else for(e in this)this.hasOwnProperty(e)&&(n[e]=this[e]);return n}function M(){return{}}function A(t,e){var n=e&&e.instantiateEmptyObject?e.instantiateEmptyObject:M;return i(t,"merge",E),i(t,"without",b),i(t,"asMutable",x),i(t,"instantiateEmptyObject",n),i(t,"set",I),i(t,"setIn",P),i(t,"update",D),i(t,"updateIn",_),f(t,F)}function S(t){return"object"==typeof t&&null!==t&&(t.$$typeof===U||t.$$typeof===C)}function k(e,n,r){if(s(e)||S(e))return e;if(e instanceof Array)return y(e.slice());if(e instanceof Date)return d(new Date(e.getTime()));var i=n&&n.prototype,o=i&&i!==Object.prototype?function(){return Object.create(i)}:M,a=o();if("production"!==t.env.NODE_ENV){if(null==r&&(r=64),0>=r)throw new u("Attempt to construct Immutable from a deeply nested object was detected. Have you tried to wrap an object with circular references (e.g. React element)? See https://github.com/rtfeldman/seamless-immutable/wiki/Deeply-nested-object-was-detected for details.");r-=1}for(var c in e)Object.getOwnPropertyDescriptor(e,c)&&(a[c]=k(e[c],void 0,r));return A(a,{instantiateEmptyObject:o})}var C="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element"),U=60103,q="__immutable_invariants_hold",F=["setPrototypeOf"],N=["keys"],L=F.concat(["push","pop","sort","splice","shift","unshift","reverse"]),$=N.concat(["map","filter","slice","concat","reduce","reduceRight"]),H=F.concat(["setDate","setFullYear","setHours","setMilliseconds","setMinutes","setMonth","setSeconds","setTime","setUTCDate","setUTCFullYear","setUTCHours","setUTCMilliseconds","setUTCMinutes","setUTCMonth","setUTCSeconds","setYear"]);u.prototype=Error.prototype;var R=k([]),Y=k({});k.from=k,k.isImmutable=s,k.ImmutableError=u,Object.freeze(k),"object"==typeof e?e.exports=k:"object"==typeof n?n.Immutable=k:"object"==typeof window?window.Immutable=k:"object"==typeof r&&(r.Immutable=k)}()}).call(this,t("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{_process:3}]},{},[1]);
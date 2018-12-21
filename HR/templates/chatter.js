String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

!function(la){if("object"==typeof exports)module.exports=la();else if("function"==typeof define&&define.amd)define(la);else{var h;"undefined"!=typeof window?h=window:"undefined"!=typeof global?h=global:"undefined"!=typeof self&&(h=self);h.autobahn=la()}}(function(){return function h(p,k,b){function a(d,e){if(!k[d]){if(!p[d]){var q="function"==typeof require&&require;if(!e&&q)return q(d,!0);if(c)return c(d,!0);throw Error("Cannot find module '"+d+"'");}q=k[d]={exports:{}};p[d][0].call(q.exports,function(c){var n=
p[d][1][c];return a(n?n:c)},q,q.exports,h,p,k,b)}return k[d].exports}for(var c="function"==typeof require&&require,e=0;e<b.length;e++)a(b[e]);return a}({1:[function(h,p,k){function b(){}h=p.exports={};h.nextTick=function(){if("undefined"!==typeof window&&window.setImmediate)return function(a){return window.setImmediate(a)};if("undefined"!==typeof window&&window.postMessage&&window.addEventListener){var a=[];window.addEventListener("message",function(c){var b=c.source;b!==window&&null!==b||"process-tick"!==
c.data||(c.stopPropagation(),0<a.length&&a.shift()())},!0);return function(c){a.push(c);window.postMessage("process-tick","*")}}return function(a){setTimeout(a,0)}}();h.title="browser";h.browser=!0;h.env={};h.argv=[];h.on=b;h.once=b;h.off=b;h.emit=b;h.binding=function(a){throw Error("process.binding is not supported");};h.cwd=function(){return"/"};h.chdir=function(a){throw Error("process.chdir is not supported");}},{}],2:[function(h,p,k){var b=h("crypto-js");k.sign=function(a,c){return b.HmacSHA256(c,
a).toString(b.enc.Base64)};k.derive_key=function(a,c,e,d){return b.PBKDF2(a,c,{keySize:(d||32)/4,iterations:e||1E3,hasher:b.algo.SHA256}).toString(b.enc.Base64)}},{"crypto-js":28}],3:[function(h,p,k){h("when");h("when/function");k.auth=function(b,a,c){var e=b.defer();navigator.id.watch({loggedInUser:a,onlogin:function(a){e.resolve(a)},onlogout:function(){b.leave("wamp.close.logout")}});return e.promise.then?e.promise:e}},{when:77,"when/function":54}],4:[function(h,p,k){var b="undefined"!==typeof self?
self:"undefined"!==typeof window?window:{};h("./polyfill.js");p=h("../package.json");var a=h("when");"AUTOBAHN_DEBUG"in b&&AUTOBAHN_DEBUG&&(h("when/monitor/console"),"console"in b&&console.log("AutobahnJS debug enabled"));var b=h("./util.js"),c=h("./log.js"),e=h("./session.js"),d=h("./connection.js"),m=h("./configure.js"),q=h("./auth/persona.js");h=h("./auth/cra.js");k.version=p.version;k.transports=m.transports;k.Connection=d.Connection;k.Session=e.Session;k.Invocation=e.Invocation;k.Event=e.Event;
k.Result=e.Result;k.Error=e.Error;k.Subscription=e.Subscription;k.Registration=e.Registration;k.Publication=e.Publication;k.auth_persona=q.auth;k.auth_cra=h;k.when=a;k.util=b;k.log=c},{"../package.json":79,"./auth/cra.js":2,"./auth/persona.js":3,"./configure.js":5,"./connection.js":6,"./log.js":7,"./polyfill.js":8,"./session.js":16,"./util.js":19,when:77,"when/monitor/console":75}],5:[function(h,p,k){function b(){this._repository={}}b.prototype.register=function(a,b){this._repository[a]=b};b.prototype.isRegistered=
function(a){return this._repository[a]?!0:!1};b.prototype.get=function(a){if(void 0!==this._repository[a])return this._repository[a];throw"no such transport: "+a;};b.prototype.list=function(){var a=[],b;for(b in this._repository)a.push(b);return a};p=new b;var a=h("./transport/websocket.js");p.register("websocket",a.Factory);h=h("./transport/longpoll.js");p.register("longpoll",h.Factory);k.transports=p},{"./transport/longpoll.js":17,"./transport/websocket.js":18}],6:[function(h,p,k){(function(b){var a=
h("when"),c=h("./session.js"),e=h("./util.js"),d=h("./log.js"),m=h("./autobahn.js"),q=function(c){(this._options=c)&&c.use_es6_promises?"Promise"in b?this._defer=function(){var a={};a.promise=new Promise(function(c,g){a.resolve=c;a.reject=g});return a}:(d.debug("Warning: ES6 promises requested, but not found! Falling back to whenjs."),this._defer=a.defer):this._defer=c&&c.use_deferred?c.use_deferred:a.defer;this._options.transports||(this._options.transports=[{type:"websocket",url:this._options.url}]);
this._transport_factories=[];this._init_transport_factories();this._session_close_message=this._session_close_reason=this._session=null;this._retry_if_unreachable=void 0!==this._options.retry_if_unreachable?this._options.retry_if_unreachable:!0;this._max_retries=this._options.max_retries||15;this._initial_retry_delay=this._options.initial_retry_delay||1.5;this._max_retry_delay=this._options.max_retry_delay||300;this._retry_delay_growth=this._options.retry_delay_growth||1.5;this._retry_delay_jitter=
this._options.retry_delay_jitter||0.1;this._connect_successes=0;this._retry=!1;this._retry_count=0;this._retry_delay=this._initial_retry_delay;this._is_retrying=!1;this._retry_timer=null};q.prototype._create_transport=function(){for(var a=0;a<this._transport_factories.length;++a){var c=this._transport_factories[a];d.debug("trying to create WAMP transport of type: "+c.type);try{var l=c.create();if(l)return d.debug("using WAMP transport type: "+c.type),l}catch(b){d.debug("could not create WAMP transport '"+
c.type+"': "+b)}}return null};q.prototype._init_transport_factories=function(){var a,c,l;e.assert(this._options.transports,"No transport.factory specified");for(var b=0;b<this._options.transports.length;++b){a=this._options.transports[b];a.url||(a.url=this._options.url);a.protocols||(a.protocols=this._options.protocols);e.assert(a.type,"No transport.type specified");e.assert("string"===typeof a.type,"transport.type must be a string");try{if(l=m.transports.get(a.type))c=new l(a),this._transport_factories.push(c)}catch(d){console.error(d)}}};
q.prototype._autoreconnect_reset_timer=function(){this._retry_timer&&clearTimeout(this._retry_timer);this._retry_timer=null};q.prototype._autoreconnect_reset=function(){this._autoreconnect_reset_timer();this._retry_count=0;this._retry_delay=this._initial_retry_delay;this._is_retrying=!1};q.prototype._autoreconnect_advance=function(){this._retry_delay_jitter&&(this._retry_delay=e.rand_normal(this._retry_delay,this._retry_delay*this._retry_delay_jitter));this._retry_delay>this._max_retry_delay&&(this._retry_delay=
this._max_retry_delay);this._retry_count+=1;var a;a=this._retry&&this._retry_count<=this._max_retries?{count:this._retry_count,delay:this._retry_delay,will_retry:!0}:{count:null,delay:null,will_retry:!1};this._retry_delay_growth&&(this._retry_delay*=this._retry_delay_growth);return a};q.prototype.open=function(){function a(){b._transport=b._create_transport();if(b._transport)b._session=new c.Session(b._transport,b._defer,b._options.onchallenge),b._session_close_reason=null,b._session_close_message=
null,b._transport.onopen=function(){b._autoreconnect_reset();b._connect_successes+=1;b._session.join(b._options.realm,b._options.authmethods,b._options.authid)},b._session.onjoin=function(a){if(b.onopen)try{b.onopen(b._session,a)}catch(c){d.debug("Exception raised from app code while firing Connection.onopen()",c)}},b._session.onleave=function(a,c){b._session_close_reason=a;b._session_close_message=c.message||"";b._retry=!1;b._transport.close(1E3)},b._transport.onclose=function(c){b._autoreconnect_reset_timer();
var e=b._transport=null;0===b._connect_successes?(e="unreachable",b._retry_if_unreachable||(b._retry=!1)):e=c.wasClean?"closed":"lost";c=b._autoreconnect_advance();if(b.onclose){var m={reason:b._session_close_reason,message:b._session_close_message,retry_delay:c.delay,retry_count:c.count,will_retry:c.will_retry};try{var q=b.onclose(e,m)}catch(v){d.debug("Exception raised from app code while firing Connection.onclose()",v)}}b._session&&(b._session._id=null,b._session=null,b._session_close_reason=null,
b._session_close_message=null);b._retry&&!q&&(c.will_retry?(b._is_retrying=!0,d.debug("retrying in "+c.delay+" s"),b._retry_timer=setTimeout(a,1E3*c.delay)):d.debug("giving up trying to reconnect"))};else if(b._retry=!1,b.onclose)b.onclose("unsupported",{reason:null,message:null,retry_delay:null,retry_count:null,will_retry:!1})}var b=this;if(b._transport)throw"connection already open (or opening)";b._autoreconnect_reset();b._retry=!0;a()};q.prototype.close=function(a,c){if(!this._transport&&!this._is_retrying)throw"connection already closed";
this._retry=!1;this._session&&this._session.isOpen?this._session.leave(a,c):this._transport&&this._transport.close(1E3)};Object.defineProperty(q.prototype,"defer",{get:function(){return this._defer}});Object.defineProperty(q.prototype,"session",{get:function(){return this._session}});Object.defineProperty(q.prototype,"isOpen",{get:function(){return this._session&&this._session.isOpen?!0:!1}});Object.defineProperty(q.prototype,"isConnected",{get:function(){return this._transport?!0:!1}});Object.defineProperty(q.prototype,
"transport",{get:function(){return this._transport?this._transport:{info:{type:"none",url:null,protocol:null}}}});Object.defineProperty(q.prototype,"isRetrying",{get:function(){return this._is_retrying}});k.Connection=q}).call(this,"undefined"!==typeof self?self:"undefined"!==typeof window?window:{})},{"./autobahn.js":4,"./log.js":7,"./session.js":16,"./util.js":19,when:77}],7:[function(h,p,k){(function(b){var a=function(){};"AUTOBAHN_DEBUG"in b&&AUTOBAHN_DEBUG&&"console"in b&&(a=function(){console.log.apply(console,
arguments)});k.debug=a}).call(this,"undefined"!==typeof self?self:"undefined"!==typeof window?window:{})},{}],8:[function(h,p,k){h("./polyfill/object");h("./polyfill/array");h("./polyfill/string");h("./polyfill/function");h("./polyfill/console");h("./polyfill/typedarray");h("./polyfill/json")},{"./polyfill/array":9,"./polyfill/console":10,"./polyfill/function":11,"./polyfill/json":12,"./polyfill/object":13,"./polyfill/string":14,"./polyfill/typedarray":15}],9:[function(h,p,k){"function"!==typeof Array.prototype.reduce&&
(Array.prototype.reduce=function(b){var a,c,e,d;if(null===this||"undefined"===typeof this)throw new TypeError("Array.prototype.reduce called on null or undefined");if("function"!==typeof b)throw new TypeError(b+" is not a function");c=Object(this);a=c.length>>>0;d=0;if(2<=arguments.length)e=arguments[1];else{for(;d<a&&!d in c;)d++;if(d>=a)throw new TypeError("Reduce of empty array with no initial value");e=c[d++]}for(;d<a;d++)d in c&&(e=b(e,c[d],d,c));return e});"indexOf"in Array.prototype||(Array.prototype.indexOf=
function(b,a){void 0===a&&(a=0);0>a&&(a+=this.length);0>a&&(a=0);for(var c=this.length;a<c;a++)if(a in this&&this[a]===b)return a;return-1});"lastIndexOf"in Array.prototype||(Array.prototype.lastIndexOf=function(b,a){void 0===a&&(a=this.length-1);0>a&&(a+=this.length);a>this.length-1&&(a=this.length-1);for(a++;0<a--;)if(a in this&&this[a]===b)return a;return-1});"forEach"in Array.prototype||(Array.prototype.forEach=function(b,a){for(var c=0,e=this.length;c<e;c++)c in this&&b.call(a,this[c],c,this)});
"map"in Array.prototype||(Array.prototype.map=function(b,a){for(var c=Array(this.length),e=0,d=this.length;e<d;e++)e in this&&(c[e]=b.call(a,this[e],e,this));return c});"filter"in Array.prototype||(Array.prototype.filter=function(b,a){for(var c=[],e,d=0,m=this.length;d<m;d++)d in this&&b.call(a,e=this[d],d,this)&&c.push(e);return c});"every"in Array.prototype||(Array.prototype.every=function(b,a){for(var c=0,e=this.length;c<e;c++)if(c in this&&!b.call(a,this[c],c,this))return!1;return!0});"some"in
Array.prototype||(Array.prototype.some=function(b,a){for(var c=0,e=this.length;c<e;c++)if(c in this&&b.call(a,this[c],c,this))return!0;return!1});"function"!==typeof Array.prototype.reduceRight&&(Array.prototype.reduceRight=function(b){if(null===this||"undefined"===typeof this)throw new TypeError("Array.prototype.reduce called on null or undefined");if("function"!==typeof b)throw new TypeError(b+" is not a function");var a=Object(this),c=(a.length>>>0)-1,e;if(2<=arguments.length)e=arguments[1];else{for(;0<=
c&&!c in a;)c--;if(0>c)throw new TypeError("Reduce of empty array with no initial value");e=a[c--]}for(;0<=c;c--)c in a&&(e=b(e,a[c],c,a));return e})},{}],10:[function(h,p,k){(function(b){(function(a){a||(a=window.console={log:function(a,b,d,m,q){},info:function(a,b,d,m,q){},warn:function(a,b,d,m,q){},error:function(a,b,d,m,q){},assert:function(a,b){}});"object"===typeof a.log&&(a.log=Function.prototype.call.bind(a.log,a),a.info=Function.prototype.call.bind(a.info,a),a.warn=Function.prototype.call.bind(a.warn,
a),a.error=Function.prototype.call.bind(a.error,a),a.debug=Function.prototype.call.bind(a.info,a));"group"in a||(a.group=function(b){a.info("\n--- "+b+" ---\n")});"groupEnd"in a||(a.groupEnd=function(){a.log("\n")});"assert"in a||(a.assert=function(a,b){if(!a)try{throw Error("assertion failed: "+b);}catch(d){setTimeout(function(){throw d;},0)}});"time"in a||function(){var b={};a.time=function(a){b[a]=(new Date).getTime()};a.timeEnd=function(e){var d=(new Date).getTime();a.info(e+": "+(e in b?d-b[e]:
0)+"ms")}}()})(b.console)}).call(this,"undefined"!==typeof self?self:"undefined"!==typeof window?window:{})},{}],11:[function(h,p,k){Function.prototype.bind||(Function.prototype.bind=function(b){var a=this,c=Array.prototype.slice.call(arguments,1);return function(){return a.apply(b,Array.prototype.concat.apply(c,arguments))}})},{}],12:[function(h,p,k){"object"!==typeof JSON&&(JSON={});(function(){function b(a){return 10>a?"0"+a:a}function a(a){d.lastIndex=0;return d.test(a)?'"'+a.replace(d,function(a){var b=
g[a];return"string"===typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function c(b,g){var d,e,v,y,H=m,f,x=g[b];x&&"object"===typeof x&&"function"===typeof x.toJSON&&(x=x.toJSON(b));"function"===typeof n&&(x=n.call(g,b,x));switch(typeof x){case "string":return a(x);case "number":return isFinite(x)?String(x):"null";case "boolean":case "null":return String(x);case "object":if(!x)return"null";m+=q;f=[];if("[object Array]"===Object.prototype.toString.apply(x)){y=x.length;
for(d=0;d<y;d+=1)f[d]=c(d,x)||"null";v=0===f.length?"[]":m?"[\n"+m+f.join(",\n"+m)+"\n"+H+"]":"["+f.join(",")+"]";m=H;return v}if(n&&"object"===typeof n)for(y=n.length,d=0;d<y;d+=1)"string"===typeof n[d]&&(e=n[d],(v=c(e,x))&&f.push(a(e)+(m?": ":":")+v));else for(e in x)Object.prototype.hasOwnProperty.call(x,e)&&(v=c(e,x))&&f.push(a(e)+(m?": ":":")+v);v=0===f.length?"{}":m?"{\n"+m+f.join(",\n"+m)+"\n"+H+"}":"{"+f.join(",")+"}";m=H;return v}}"function"!==typeof Date.prototype.toJSON&&(Date.prototype.toJSON=
function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+b(this.getUTCMonth()+1)+"-"+b(this.getUTCDate())+"T"+b(this.getUTCHours())+":"+b(this.getUTCMinutes())+":"+b(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var e,d,m,q,g,n;"function"!==typeof JSON.stringify&&(d=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,g={"\b":"\\b",
"\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(a,b,g){var d;q=m="";if("number"===typeof g)for(d=0;d<g;d+=1)q+=" ";else"string"===typeof g&&(q=g);if((n=b)&&"function"!==typeof b&&("object"!==typeof b||"number"!==typeof b.length))throw Error("JSON.stringify");return c("",{"":a})});"function"!==typeof JSON.parse&&(e=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,JSON.parse=function(a,b){function c(a,
g){var d,f,l=a[g];if(l&&"object"===typeof l)for(d in l)Object.prototype.hasOwnProperty.call(l,d)&&(f=c(l,d),void 0!==f?l[d]=f:delete l[d]);return b.call(a,g,l)}var g;a=String(a);e.lastIndex=0;e.test(a)&&(a=a.replace(e,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return g=eval("("+
a+")"),"function"===typeof b?c({"":g},""):g;throw new SyntaxError("JSON.parse");})})();k.JSON=JSON},{}],13:[function(h,p,k){Object.create||(Object.create=function(){function b(){}return function(a){if(1!=arguments.length)throw Error("Object.create implementation only accepts one parameter.");b.prototype=a;return new b}}());Object.keys||(Object.keys=function(){var b=Object.prototype.hasOwnProperty,a=!{toString:null}.propertyIsEnumerable("toString"),c="toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" "),
e=c.length;return function(d){if("object"!==typeof d&&("function"!==typeof d||null===d))throw new TypeError("Object.keys called on non-object");var m=[],q;for(q in d)b.call(d,q)&&m.push(q);if(a)for(q=0;q<e;q++)b.call(d,c[q])&&m.push(c[q]);return m}}())},{}],14:[function(h,p,k){"trim"in String.prototype||(String.prototype.trim=function(){return this.replace(/^\s+/,"").replace(/\s+$/,"")})},{}],15:[function(h,p,k){(function(b){"undefined"===typeof b.Uint8Array&&function(a,b){function e(a){switch(typeof a){case "undefined":return"undefined";
case "boolean":return"boolean";case "number":return"number";case "string":return"string";default:return null===a?"null":"object"}}function d(a){return Object.prototype.toString.call(a).replace(/^\[object *|\]$/g,"")}function m(a){return"function"===typeof a}function q(a){if(null===a||a===s)throw TypeError();return Object(a)}function g(a){function b(f){Object.defineProperty(a,f,{get:function(){return a._getter(f)},set:function(b){a._setter(f,b)},enumerable:!0,configurable:!1})}if(a.length>t)throw RangeError("Array too large for polyfill");
var f;for(f=0;f<a.length;f+=1)b(f)}function n(a,b){var f=32-b;return a<<f>>f}function l(a,b){var f=32-b;return a<<f>>>f}function z(a){return[a&255]}function h(a){return n(a[0],8)}function w(a){return[a&255]}function v(a){return l(a[0],8)}function y(a){a=aa(Number(a));return[0>a?0:255<a?255:a&255]}function H(a){return[a>>8&255,a&255]}function f(a){return n(a[0]<<8|a[1],16)}function x(a){return[a>>8&255,a&255]}function J(a){return l(a[0]<<8|a[1],16)}function A(a){return[a>>24&255,a>>16&255,a>>8&255,
a&255]}function k(a){return n(a[0]<<24|a[1]<<16|a[2]<<8|a[3],32)}function p(a){return[a>>24&255,a>>16&255,a>>8&255,a&255]}function B(a){return l(a[0]<<24|a[1]<<16|a[2]<<8|a[3],32)}function E(a,b,f){function c(a){var b=V(a);a-=b;return 0.5>a?b:0.5<a?b+1:b%2?b+1:b}var g=(1<<b-1)-1,d,l,e;a!==a?(l=(1<<b)-1,e=O(2,f-1),d=0):Infinity===a||-Infinity===a?(l=(1<<b)-1,e=0,d=0>a?1:0):0===a?(e=l=0,d=-Infinity===1/a?1:0):(d=0>a,a=u(a),a>=O(2,1-g)?(l=R(V(S(a)/r),1023),e=c(a/O(2,l)*O(2,f)),2<=e/O(2,f)&&(l+=1,e=1),
l>g?(l=(1<<b)-1,e=0):(l+=g,e-=O(2,f))):(l=0,e=c(a/O(2,1-g-f))));for(a=[];f;f-=1)a.push(e%2?1:0),e=V(e/2);for(f=b;f;f-=1)a.push(l%2?1:0),l=V(l/2);a.push(d?1:0);a.reverse();b=a.join("");for(d=[];b.length;)d.push(parseInt(b.substring(0,8),2)),b=b.substring(8);return d}function I(a,b,f){var c=[],g,d,l;for(g=a.length;g;g-=1)for(l=a[g-1],d=8;d;d-=1)c.push(l%2?1:0),l>>=1;c.reverse();d=c.join("");a=(1<<b-1)-1;c=parseInt(d.substring(0,1),2)?-1:1;g=parseInt(d.substring(1,1+b),2);d=parseInt(d.substring(1+b),
2);return g===(1<<b)-1?0!==d?NaN:Infinity*c:0<g?c*O(2,g-a)*(1+d/O(2,f)):0!==d?c*O(2,-(a-1))*(d/O(2,f)):0>c?-0:0}function Q(a){return I(a,11,52)}function N(a){return E(a,11,52)}function F(a){return I(a,8,23)}function G(a){return E(a,8,23)}var s=void 0,t=1E5,r=Math.LN2,u=Math.abs,V=Math.floor,S=Math.log,M=Math.max,R=Math.min,O=Math.pow,aa=Math.round;(function(){var a=Object.defineProperty,b;try{b=Object.defineProperty({},"x",{})}catch(f){b=!1}a&&b||(Object.defineProperty=function(b,f,c){if(a)try{return a(b,
f,c)}catch(g){}if(b!==Object(b))throw TypeError("Object.defineProperty called on non-object");Object.prototype.__defineGetter__&&"get"in c&&Object.prototype.__defineGetter__.call(b,f,c.get);Object.prototype.__defineSetter__&&"set"in c&&Object.prototype.__defineSetter__.call(b,f,c.set);"value"in c&&(b[f]=c.value);return b})})();(function(){function l(a){a>>=0;if(0>a)throw RangeError("ArrayBuffer size is not a small enough positive integer.");Object.defineProperty(this,"byteLength",{value:a});Object.defineProperty(this,
"_bytes",{value:Array(a)});for(var b=0;b<a;b+=1)this._bytes[b]=0}function n(){if(!arguments.length||"object"!==typeof arguments[0])return function(a){a>>=0;if(0>a)throw RangeError("length is not a small enough positive integer.");Object.defineProperty(this,"length",{value:a});Object.defineProperty(this,"byteLength",{value:a*this.BYTES_PER_ELEMENT});Object.defineProperty(this,"buffer",{value:new l(this.byteLength)});Object.defineProperty(this,"byteOffset",{value:0})}.apply(this,arguments);if(1<=arguments.length&&
"object"===e(arguments[0])&&arguments[0]instanceof n)return function(a){if(this.constructor!==a.constructor)throw TypeError();var b=a.length*this.BYTES_PER_ELEMENT;Object.defineProperty(this,"buffer",{value:new l(b)});Object.defineProperty(this,"byteLength",{value:b});Object.defineProperty(this,"byteOffset",{value:0});Object.defineProperty(this,"length",{value:a.length});for(b=0;b<this.length;b+=1)this._setter(b,a._getter(b))}.apply(this,arguments);if(1<=arguments.length&&"object"===e(arguments[0])&&
!(arguments[0]instanceof n||arguments[0]instanceof l||"ArrayBuffer"===d(arguments[0])))return function(a){var b=a.length*this.BYTES_PER_ELEMENT;Object.defineProperty(this,"buffer",{value:new l(b)});Object.defineProperty(this,"byteLength",{value:b});Object.defineProperty(this,"byteOffset",{value:0});Object.defineProperty(this,"length",{value:a.length});for(b=0;b<this.length;b+=1)this._setter(b,Number(a[b]))}.apply(this,arguments);if(1<=arguments.length&&"object"===e(arguments[0])&&(arguments[0]instanceof
l||"ArrayBuffer"===d(arguments[0])))return function(a,b,f){b>>>=0;if(b>a.byteLength)throw RangeError("byteOffset out of range");if(b%this.BYTES_PER_ELEMENT)throw RangeError("buffer length minus the byteOffset is not a multiple of the element size.");if(f===s){var c=a.byteLength-b;if(c%this.BYTES_PER_ELEMENT)throw RangeError("length of buffer minus byteOffset not a multiple of the element size");f=c/this.BYTES_PER_ELEMENT}else f>>>=0,c=f*this.BYTES_PER_ELEMENT;if(b+c>a.byteLength)throw RangeError("byteOffset and length reference an area beyond the end of the buffer");
Object.defineProperty(this,"buffer",{value:a});Object.defineProperty(this,"byteLength",{value:c});Object.defineProperty(this,"byteOffset",{value:b});Object.defineProperty(this,"length",{value:f})}.apply(this,arguments);throw TypeError();}function r(a,b,f){var c=function(){Object.defineProperty(this,"constructor",{value:c});n.apply(this,arguments);g(this)};"__proto__"in c?c.__proto__=n:(c.from=n.from,c.of=n.of);c.BYTES_PER_ELEMENT=a;var d=function(){};d.prototype=t;c.prototype=new d;Object.defineProperty(c.prototype,
"BYTES_PER_ELEMENT",{value:a});Object.defineProperty(c.prototype,"_pack",{value:b});Object.defineProperty(c.prototype,"_unpack",{value:f});return c}a.ArrayBuffer=a.ArrayBuffer||l;Object.defineProperty(n,"from",{value:function(a){return new this(a)}});Object.defineProperty(n,"of",{value:function(){return new this(arguments)}});var t={};n.prototype=t;Object.defineProperty(n.prototype,"_getter",{value:function(a){if(1>arguments.length)throw SyntaxError("Not enough arguments");a>>>=0;if(a>=this.length)return s;
var b=[],f,c;f=0;for(c=this.byteOffset+a*this.BYTES_PER_ELEMENT;f<this.BYTES_PER_ELEMENT;f+=1,c+=1)b.push(this.buffer._bytes[c]);return this._unpack(b)}});Object.defineProperty(n.prototype,"get",{value:n.prototype._getter});Object.defineProperty(n.prototype,"_setter",{value:function(a,b){if(2>arguments.length)throw SyntaxError("Not enough arguments");a>>>=0;if(!(a>=this.length)){var f=this._pack(b),c,d;c=0;for(d=this.byteOffset+a*this.BYTES_PER_ELEMENT;c<this.BYTES_PER_ELEMENT;c+=1,d+=1)this.buffer._bytes[d]=
f[c]}}});Object.defineProperty(n.prototype,"constructor",{value:n});Object.defineProperty(n.prototype,"copyWithin",{value:function(a,b,f){var c=q(this),d=c.length>>>0,d=M(d,0);a>>=0;a=0>a?M(d+a,0):R(a,d);b>>=0;b=0>b?M(d+b,0):R(b,d);f=f===s?d:f>>0;f=0>f?M(d+f,0):R(f,d);d=R(f-b,d-a);from<a&&a<b+d?(f=-1,b=b+d-1,a=a+d-1):f=1;for(;0<count;)c._setter(a,c._getter(b)),b+=f,a+=f,d-=1;return c}});Object.defineProperty(n.prototype,"every",{value:function(a,b){if(this===s||null===this)throw TypeError();var f=
Object(this),c=f.length>>>0;if(!m(a))throw TypeError();for(var d=0;d<c;d++)if(!a.call(b,f._getter(d),d,f))return!1;return!0}});Object.defineProperty(n.prototype,"fill",{value:function(a,b,f){var c=q(this),d=c.length>>>0,d=M(d,0);b>>=0;b=0>b?M(d+b,0):R(b,d);f=f===s?d:f>>0;for(d=0>f?M(d+f,0):R(f,d);b<d;)c._setter(b,a),b+=1;return c}});Object.defineProperty(n.prototype,"filter",{value:function(a,b){if(this===s||null===this)throw TypeError();var f=Object(this),c=f.length>>>0;if(!m(a))throw TypeError();
for(var d=[],g=0;g<c;g++){var l=f._getter(g);a.call(b,l,g,f)&&d.push(l)}return new this.constructor(d)}});Object.defineProperty(n.prototype,"find",{value:function(a){var b=q(this),f=b.length>>>0;if(!m(a))throw TypeError();for(var c=1<arguments.length?arguments[1]:s,d=0;d<f;){var g=b._getter(d),l=a.call(c,g,d,b);if(Boolean(l))return g;++d}return s}});Object.defineProperty(n.prototype,"findIndex",{value:function(a){var b=q(this),f=b.length>>>0;if(!m(a))throw TypeError();for(var c=1<arguments.length?
arguments[1]:s,d=0;d<f;){var g=b._getter(d),g=a.call(c,g,d,b);if(Boolean(g))return d;++d}return-1}});Object.defineProperty(n.prototype,"forEach",{value:function(a,b){if(this===s||null===this)throw TypeError();var f=Object(this),c=f.length>>>0;if(!m(a))throw TypeError();for(var d=0;d<c;d++)a.call(b,f._getter(d),d,f)}});Object.defineProperty(n.prototype,"indexOf",{value:function(a){if(this===s||null===this)throw TypeError();var b=Object(this),f=b.length>>>0;if(0===f)return-1;var c=0,d;0<arguments.length&&
(d=Number(arguments[1]),d!==c?c=0:0!==d&&d!==1/0&&d!==-(1/0)&&(c=(0<d||-1)*V(u(d))));if(c>=f)return-1;for(c=0<=c?c:M(f-u(c),0);c<f;c++)if(b._getter(c)===a)return c;return-1}});Object.defineProperty(n.prototype,"join",{value:function(a){if(this===s||null===this)throw TypeError();for(var b=Object(this),f=b.length>>>0,c=Array(f),d=0;d<f;++d)c[d]=b._getter(d);return c.join(a===s?",":a)}});Object.defineProperty(n.prototype,"lastIndexOf",{value:function(a){if(this===s||null===this)throw TypeError();var b=
Object(this),f=b.length>>>0;if(0===f)return-1;var c=f;1<arguments.length&&(c=Number(arguments[1]),c!==c?c=0:0!==c&&c!==1/0&&c!==-(1/0)&&(c=(0<c||-1)*V(u(c))));for(f=0<=c?R(c,f-1):f-u(c);0<=f;f--)if(b._getter(f)===a)return f;return-1}});Object.defineProperty(n.prototype,"map",{value:function(a,b){if(this===s||null===this)throw TypeError();var f=Object(this),c=f.length>>>0;if(!m(a))throw TypeError();var d=[];d.length=c;for(var g=0;g<c;g++)d[g]=a.call(b,f._getter(g),g,f);return new this.constructor(d)}});
Object.defineProperty(n.prototype,"reduce",{value:function(a){if(this===s||null===this)throw TypeError();var b=Object(this),f=b.length>>>0;if(!m(a))throw TypeError();if(0===f&&1===arguments.length)throw TypeError();var c=0,d;for(d=2<=arguments.length?arguments[1]:b._getter(c++);c<f;)d=a.call(s,d,b._getter(c),c,b),c++;return d}});Object.defineProperty(n.prototype,"reduceRight",{value:function(a){if(this===s||null===this)throw TypeError();var b=Object(this),f=b.length>>>0;if(!m(a))throw TypeError();
if(0===f&&1===arguments.length)throw TypeError();var f=f-1,c;for(c=2<=arguments.length?arguments[1]:b._getter(f--);0<=f;)c=a.call(s,c,b._getter(f),f,b),f--;return c}});Object.defineProperty(n.prototype,"reverse",{value:function(){if(this===s||null===this)throw TypeError();for(var a=Object(this),b=a.length>>>0,f=V(b/2),c=0,b=b-1;c<f;++c,--b){var d=a._getter(c);a._setter(c,a._getter(b));a._setter(b,d)}return a}});Object.defineProperty(n.prototype,"set",{value:function(a,b){if(1>arguments.length)throw SyntaxError("Not enough arguments");
var f,c,d,g,l,n;if("object"===typeof arguments[0]&&arguments[0].constructor===this.constructor){f=arguments[0];c=arguments[1]>>>0;if(c+f.length>this.length)throw RangeError("Offset plus length of array is out of range");n=this.byteOffset+c*this.BYTES_PER_ELEMENT;c=f.length*this.BYTES_PER_ELEMENT;if(f.buffer===this.buffer){d=[];g=0;for(l=f.byteOffset;g<c;g+=1,l+=1)d[g]=f.buffer._bytes[l];for(g=0;g<c;g+=1,n+=1)this.buffer._bytes[n]=d[g]}else for(g=0,l=f.byteOffset;g<c;g+=1,l+=1,n+=1)this.buffer._bytes[n]=
f.buffer._bytes[l]}else if("object"===typeof arguments[0]&&"undefined"!==typeof arguments[0].length){f=arguments[0];d=f.length>>>0;c=arguments[1]>>>0;if(c+d>this.length)throw RangeError("Offset plus length of array is out of range");for(g=0;g<d;g+=1)l=f[g],this._setter(c+g,Number(l))}else throw TypeError("Unexpected argument type(s)");}});Object.defineProperty(n.prototype,"slice",{value:function(a,b){for(var f=q(this),c=f.length>>>0,d=a>>0,d=0>d?M(c+d,0):R(d,c),g=b===s?c:b>>0,c=0>g?M(c+g,0):R(g,c),
g=new f.constructor(c-d),l=0;d<c;){var n=f._getter(d);g._setter(l,n);++d;++l}return g}});Object.defineProperty(n.prototype,"some",{value:function(a,b){if(this===s||null===this)throw TypeError();var f=Object(this),c=f.length>>>0;if(!m(a))throw TypeError();for(var d=0;d<c;d++)if(a.call(b,f._getter(d),d,f))return!0;return!1}});Object.defineProperty(n.prototype,"sort",{value:function(a){if(this===s||null===this)throw TypeError();for(var b=Object(this),f=b.length>>>0,c=Array(f),d=0;d<f;++d)c[d]=b._getter(d);
a?c.sort(a):c.sort();for(d=0;d<f;++d)b._setter(d,c[d]);return b}});Object.defineProperty(n.prototype,"subarray",{value:function(a,b){a>>=0;b>>=0;1>arguments.length&&(a=0);2>arguments.length&&(b=this.length);0>a&&(a=this.length+a);0>b&&(b=this.length+b);var f=this.length;a=0>a?0:a>f?f:a;f=this.length;f=(0>b?0:b>f?f:b)-a;0>f&&(f=0);return new this.constructor(this.buffer,this.byteOffset+a*this.BYTES_PER_ELEMENT,f)}});var E=r(1,z,h),S=r(1,w,v),I=r(1,y,v),O=r(2,H,f),aa=r(2,x,J),ha=r(4,A,k),da=r(4,p,B),
U=r(4,G,F),$=r(8,N,Q);a.Int8Array=b.Int8Array=a.Int8Array||E;a.Uint8Array=b.Uint8Array=a.Uint8Array||S;a.Uint8ClampedArray=b.Uint8ClampedArray=a.Uint8ClampedArray||I;a.Int16Array=b.Int16Array=a.Int16Array||O;a.Uint16Array=b.Uint16Array=a.Uint16Array||aa;a.Int32Array=b.Int32Array=a.Int32Array||ha;a.Uint32Array=b.Uint32Array=a.Uint32Array||da;a.Float32Array=b.Float32Array=a.Float32Array||U;a.Float64Array=b.Float64Array=a.Float64Array||$})();(function(){function b(a,f){return m(a.get)?a.get(f):a[f]}
function f(a,b,c){if(!(a instanceof ArrayBuffer||"ArrayBuffer"===d(a)))throw TypeError();b>>>=0;if(b>a.byteLength)throw RangeError("byteOffset out of range");c=c===s?a.byteLength-b:c>>>0;if(b+c>a.byteLength)throw RangeError("byteOffset and length reference an area beyond the end of the buffer");Object.defineProperty(this,"buffer",{value:a});Object.defineProperty(this,"byteLength",{value:c});Object.defineProperty(this,"byteOffset",{value:b})}function c(f){return function(c,d){c>>>=0;if(c+f.BYTES_PER_ELEMENT>
this.byteLength)throw RangeError("Array index out of range");c+=this.byteOffset;for(var g=new a.Uint8Array(this.buffer,c,f.BYTES_PER_ELEMENT),n=[],e=0;e<f.BYTES_PER_ELEMENT;e+=1)n.push(b(g,e));Boolean(d)===Boolean(l)&&n.reverse();return b(new f((new a.Uint8Array(n)).buffer),0)}}function g(f){return function(c,d,g){c>>>=0;if(c+f.BYTES_PER_ELEMENT>this.byteLength)throw RangeError("Array index out of range");d=new f([d]);d=new a.Uint8Array(d.buffer);var n=[],e;for(e=0;e<f.BYTES_PER_ELEMENT;e+=1)n.push(b(d,
e));Boolean(g)===Boolean(l)&&n.reverse();(new Uint8Array(this.buffer,c,f.BYTES_PER_ELEMENT)).set(n)}}var l=function(){var f=new a.Uint16Array([4660]),f=new a.Uint8Array(f.buffer);return 18===b(f,0)}();Object.defineProperty(f.prototype,"getUint8",{value:c(a.Uint8Array)});Object.defineProperty(f.prototype,"getInt8",{value:c(a.Int8Array)});Object.defineProperty(f.prototype,"getUint16",{value:c(a.Uint16Array)});Object.defineProperty(f.prototype,"getInt16",{value:c(a.Int16Array)});Object.defineProperty(f.prototype,
"getUint32",{value:c(a.Uint32Array)});Object.defineProperty(f.prototype,"getInt32",{value:c(a.Int32Array)});Object.defineProperty(f.prototype,"getFloat32",{value:c(a.Float32Array)});Object.defineProperty(f.prototype,"getFloat64",{value:c(a.Float64Array)});Object.defineProperty(f.prototype,"setUint8",{value:g(a.Uint8Array)});Object.defineProperty(f.prototype,"setInt8",{value:g(a.Int8Array)});Object.defineProperty(f.prototype,"setUint16",{value:g(a.Uint16Array)});Object.defineProperty(f.prototype,"setInt16",
{value:g(a.Int16Array)});Object.defineProperty(f.prototype,"setUint32",{value:g(a.Uint32Array)});Object.defineProperty(f.prototype,"setInt32",{value:g(a.Int32Array)});Object.defineProperty(f.prototype,"setFloat32",{value:g(a.Float32Array)});Object.defineProperty(f.prototype,"setFloat64",{value:g(a.Float64Array)});a.DataView=a.DataView||f})()}(k,window);"window"in b&&!("Uint8ClampedArray"in window)&&(window.Uint8ClampedArray=b.Uint8Array)}).call(this,"undefined"!==typeof self?self:"undefined"!==typeof window?
window:{})},{}],16:[function(h,p,k){(function(b){function a(){return Math.floor(9007199254740992*Math.random())}h("when");var c=h("when/function"),e=h("./log.js"),d=h("./util.js");Date.now=Date.now||function(){return+new Date};WAMP_FEATURES={caller:{features:{caller_identification:!0,progressive_call_results:!0}},callee:{features:{progressive_call_results:!0}},publisher:{features:{subscriber_blackwhite_listing:!0,publisher_exclusion:!0,publisher_identification:!0}},subscriber:{features:{publisher_identification:!0}}};
var m=function(a,b,c){this.caller=a;this.progress=b;this.procedure=c},q=function(a,b,c){this.publication=a;this.publisher=b;this.topic=c},g=function(a,b){this.args=a||[];this.kwargs=b||{}},n=function(a,b,c){this.error=a;this.args=b||[];this.kwargs=c||{}},l=function(a,b,c,f,d){this.topic=a;this.handler=b;this.options=c||{};this.session=f;this.id=d;this.active=!0};l.prototype.unsubscribe=function(){return this.session.unsubscribe(this)};var z=function(a,b,c,f,d){this.procedure=a;this.endpoint=b;this.options=
c||{};this.session=f;this.id=d;this.active=!0};z.prototype.unregister=function(){return this.session.unregister(this)};var P=function(a){this.id=a},w=function(a,d,H){var f=this;f._socket=a;f._defer=d;f._onchallenge=H;f._id=null;f._realm=null;f._features=null;f._goodbye_sent=!1;f._transport_is_closing=!1;f._publish_reqs={};f._subscribe_reqs={};f._unsubscribe_reqs={};f._call_reqs={};f._register_reqs={};f._unregister_reqs={};f._subscriptions={};f._registrations={};f._invocations={};f._prefixes={};f._send_wamp=
function(a){f._socket.send(a)};f._protocol_violation=function(a){e.debug("failing transport due to protocol violation: "+a);f._socket.close(1002,"protocol violation: "+a)};f._MESSAGE_MAP={};f._MESSAGE_MAP[8]={};f._process_SUBSCRIBED=function(a){var b=a[1];a=a[2];if(b in f._subscribe_reqs){var c=f._subscribe_reqs[b],d=c[0],g=c[1],n=c[2],c=c[3];a in f._subscriptions||(f._subscriptions[a]=[]);g=new l(g,n,c,f,a);f._subscriptions[a].push(g);d.resolve(g);delete f._subscribe_reqs[b]}else f._protocol_violation("SUBSCRIBED received for non-pending request ID "+
b)};f._MESSAGE_MAP[33]=f._process_SUBSCRIBED;f._process_SUBSCRIBE_ERROR=function(a){var b=a[2];b in f._subscribe_reqs?(a=new n(a[4],a[5],a[6]),f._subscribe_reqs[b][0].reject(a),delete f._subscribe_reqs[b]):f._protocol_violation("SUBSCRIBE-ERROR received for non-pending request ID "+b)};f._MESSAGE_MAP[8][32]=f._process_SUBSCRIBE_ERROR;f._process_UNSUBSCRIBED=function(a){a=a[1];if(a in f._unsubscribe_reqs){var b=f._unsubscribe_reqs[a],c=b[0],b=b[1];if(b in f._subscriptions){for(var d=f._subscriptions[b],
g=0;g<d.length;++g)d[g].active=!1;delete f._subscriptions[b]}c.resolve(!0);delete f._unsubscribe_reqs[a]}else f._protocol_violation("UNSUBSCRIBED received for non-pending request ID "+a)};f._MESSAGE_MAP[35]=f._process_UNSUBSCRIBED;f._process_UNSUBSCRIBE_ERROR=function(a){var b=a[2];b in f._unsubscribe_reqs?(a=new n(a[4],a[5],a[6]),f._unsubscribe_reqs[b][0].reject(a),delete f._unsubscribe_reqs[b]):f._protocol_violation("UNSUBSCRIBE-ERROR received for non-pending request ID "+b)};f._MESSAGE_MAP[8][34]=
f._process_UNSUBSCRIBE_ERROR;f._process_PUBLISHED=function(a){var b=a[1],c=a[2];b in f._publish_reqs?(a=f._publish_reqs[b][0],c=new P(c),a.resolve(c),delete f._publish_reqs[b]):f._protocol_violation("PUBLISHED received for non-pending request ID "+b)};f._MESSAGE_MAP[17]=f._process_PUBLISHED;f._process_PUBLISH_ERROR=function(a){var b=a[2];b in f._publish_reqs?(a=new n(a[4],a[5],a[6]),f._publish_reqs[b][0].reject(a),delete f._publish_reqs[b]):f._protocol_violation("PUBLISH-ERROR received for non-pending request ID "+
b)};f._MESSAGE_MAP[8][16]=f._process_PUBLISH_ERROR;f._process_EVENT=function(a){var b=a[1];if(b in f._subscriptions){var c=a[3],d=a[4]||[],g=a[5]||{};a=new q(a[2],c.publisher,c.topic);b=f._subscriptions[b];for(c=0;c<b.length;++c)try{b[c].handler(d,g,a)}catch(l){e.debug("Exception raised in event handler",l)}}else f._protocol_violation("EVENT received for non-subscribed subscription ID "+b)};f._MESSAGE_MAP[36]=f._process_EVENT;f._process_REGISTERED=function(a){var b=a[1];a=a[2];if(b in f._register_reqs){var c=
f._register_reqs[b],d=c[0],c=new z(c[1],c[2],c[3],f,a);f._registrations[a]=c;d.resolve(c);delete f._register_reqs[b]}else f._protocol_violation("REGISTERED received for non-pending request ID "+b)};f._MESSAGE_MAP[65]=f._process_REGISTERED;f._process_REGISTER_ERROR=function(a){var b=a[2];b in f._register_reqs?(a=new n(a[4],a[5],a[6]),f._register_reqs[b][0].reject(a),delete f._register_reqs[b]):f._protocol_violation("REGISTER-ERROR received for non-pending request ID "+b)};f._MESSAGE_MAP[8][64]=f._process_REGISTER_ERROR;
f._process_UNREGISTERED=function(a){a=a[1];if(a in f._unregister_reqs){var b=f._unregister_reqs[a],c=b[0],b=b[1];b.id in f._registrations&&delete f._registrations[b.id];b.active=!1;c.resolve();delete f._unregister_reqs[a]}else f._protocol_violation("UNREGISTERED received for non-pending request ID "+a)};f._MESSAGE_MAP[67]=f._process_UNREGISTERED;f._process_UNREGISTER_ERROR=function(a){var b=a[2];b in f._unregister_reqs?(a=new n(a[4],a[5],a[6]),f._unregister_reqs[b][0].reject(a),delete f._unregister_reqs[b]):
f._protocol_violation("UNREGISTER-ERROR received for non-pending request ID "+b)};f._MESSAGE_MAP[8][66]=f._process_UNREGISTER_ERROR;f._process_RESULT=function(a){var b=a[1];if(b in f._call_reqs){var c=a[2],d=a[3]||[],l=a[4]||{};a=null;1<d.length||0<Object.keys(l).length?a=new g(d,l):0<d.length&&(a=d[0]);l=f._call_reqs[b];d=l[0];l=l[1];c.progress?l&&l.receive_progress&&d.notify(a):(d.resolve(a),delete f._call_reqs[b])}else f._protocol_violation("CALL-RESULT received for non-pending request ID "+b)};
f._MESSAGE_MAP[50]=f._process_RESULT;f._process_CALL_ERROR=function(a){var b=a[2];b in f._call_reqs?(a=new n(a[4],a[5],a[6]),f._call_reqs[b][0].reject(a),delete f._call_reqs[b]):f._protocol_violation("CALL-ERROR received for non-pending request ID "+b)};f._MESSAGE_MAP[8][48]=f._process_CALL_ERROR;f._process_INVOCATION=function(a){var b=a[1],d=a[2],l=a[3];if(d in f._registrations){var d=f._registrations[d].endpoint,e=a[4]||[];a=a[5]||{};var v=null;l.receive_progress&&(v=function(a,c){var d=[70,b,{progress:!0}];
a=a||[];c=c||{};var g=Object.keys(c).length;if(a.length||g)d.push(a),g&&d.push(c);f._send_wamp(d)});l=new m(l.caller,v,l.procedure);c.call(d,e,a,l).then(function(a){var c=[70,b,{}];if(a instanceof g){var d=Object.keys(a.kwargs).length;if(a.args.length||d)c.push(a.args),d&&c.push(a.kwargs)}else c.push([a]);f._send_wamp(c)},function(a){var c=[8,68,b,{}];if(a instanceof n){c.push(a.error);var d=Object.keys(a.kwargs).length;if(a.args.length||d)c.push(a.args),d&&c.push(a.kwargs)}else c.push("wamp.error.runtime_error"),
c.push([a]);f._send_wamp(c)})}else f._protocol_violation("INVOCATION received for non-registered registration ID "+b)};f._MESSAGE_MAP[68]=f._process_INVOCATION;f._socket.onmessage=function(a){var b=a[0];if(f._id)if(6===b){if(f._goodbye_sent||f._send_wamp([6,{},"wamp.error.goodbye_and_out"]),f._id=null,f._realm=null,f._features=null,b=a[1],a=a[2],f.onleave)f.onleave(a,b)}else if(8===b){var d=a[1];if(d in f._MESSAGE_MAP[8])f._MESSAGE_MAP[b][d](a);else f._protocol_violation("unexpected ERROR message with request_type "+
d)}else if(b in f._MESSAGE_MAP)f._MESSAGE_MAP[b](a);else f._protocol_violation("unexpected message type "+b);else if(2===b){f._id=a[1];b=a[2];f._features={};if(b.roles.broker&&(f._features.subscriber={},f._features.publisher={},b.roles.broker.features)){for(d in WAMP_FEATURES.publisher.features)f._features.publisher[d]=WAMP_FEATURES.publisher.features[d]&&b.roles.broker.features[d];for(d in WAMP_FEATURES.subscriber.features)f._features.subscriber[d]=WAMP_FEATURES.subscriber.features[d]&&b.roles.broker.features[d]}if(b.roles.dealer&&
(f._features.caller={},f._features.callee={},b.roles.dealer.features)){for(d in WAMP_FEATURES.caller.features)f._features.caller[d]=WAMP_FEATURES.caller.features[d]&&b.roles.dealer.features[d];for(d in WAMP_FEATURES.callee.features)f._features.callee[d]=WAMP_FEATURES.callee.features[d]&&b.roles.dealer.features[d]}if(f.onjoin)f.onjoin(a[2])}else if(3===b){if(b=a[1],a=a[2],f.onleave)f.onleave(a,b)}else 4===b?f._onchallenge?c.call(f._onchallenge,f,a[1],a[2]).then(function(a){f._send_wamp([5,a,{}])},
function(a){e.debug("onchallenge() raised:",a);f._send_wamp([3,{message:"sorry, I cannot authenticate (onchallenge handler raised an exception)"},"wamp.error.cannot_authenticate"]);f._socket.close(1E3)}):(e.debug("received WAMP challenge, but no onchallenge() handler set"),a=[3,{message:"sorry, I cannot authenticate (no onchallenge handler set)"},"wamp.error.cannot_authenticate"],f._send_wamp(a),f._socket.close(1E3)):f._protocol_violation("unexpected message type "+b)};f._created="performance"in b&&
"now"in performance?performance.now():Date.now()};Object.defineProperty(w.prototype,"defer",{get:function(){return this._defer}});Object.defineProperty(w.prototype,"id",{get:function(){return this._id}});Object.defineProperty(w.prototype,"realm",{get:function(){return this._realm}});Object.defineProperty(w.prototype,"isOpen",{get:function(){return null!==this.id}});Object.defineProperty(w.prototype,"features",{get:function(){return this._features}});Object.defineProperty(w.prototype,"subscriptions",
{get:function(){for(var a=Object.keys(this._subscriptions),b=[],c=0;c<a.length;++c)b.push(this._subscriptions[a[c]]);return b}});Object.defineProperty(w.prototype,"registrations",{get:function(){for(var a=Object.keys(this._registrations),b=[],c=0;c<a.length;++c)b.push(this._registrations[a[c]]);return b}});w.prototype.log=function(){if("console"in b){var a=null;this._id&&this._created?(a=null,a="performance"in b&&"now"in performance?performance.now()-this._created:Date.now()-this._created,a="WAMP session "+
this._id+" on '"+this._realm+"' at "+Math.round(1E3*a)/1E3+" ms"):a="WAMP session";if("group"in console){console.group(a);for(a=0;a<arguments.length;a+=1)console.log(arguments[a]);console.groupEnd()}else{for(var c=[a+": "],a=0;a<arguments.length;a+=1)c.push(arguments[a]);console.log.apply(console,c)}}};w.prototype.join=function(a,b,c){d.assert("string"===typeof a,"Session.join: <realm> must be a string");d.assert(!b||Array.isArray(b),"Session.join: <authmethods> must be an array []");d.assert(!c||
"string"===typeof c,"Session.join: <authid> must be a string");if(this.isOpen)throw"session already open";this._goodbye_sent=!1;this._realm=a;var f={};f.roles=WAMP_FEATURES;b&&(f.authmethods=b);c&&(f.authid=c);this._send_wamp([1,a,f])};w.prototype.leave=function(a,b){d.assert(!a||"string"===typeof a,"Session.leave: <reason> must be a string");d.assert(!b||"string"===typeof b,"Session.leave: <message> must be a string");if(!this.isOpen)throw"session not open";a||(a="wamp.close.normal");var c={};b&&
(c.message=b);this._send_wamp([6,c,a]);this._goodbye_sent=!0};w.prototype.call=function(b,c,g,f){d.assert("string"===typeof b,"Session.call: <procedure> must be a string");d.assert(!c||Array.isArray(c),"Session.call: <args> must be an array []");d.assert(!g||g instanceof Object,"Session.call: <kwargs> must be an object {}");d.assert(!f||f instanceof Object,"Session.call: <options> must be an object {}");if(!this.isOpen)throw"session not open";var l=a(),n=this._defer();this._call_reqs[l]=[n,f];b=[48,
l,f||{},this.resolve(b)];c&&(b.push(c),g&&b.push(g));this._send_wamp(b);return n.promise.then?n.promise:n};w.prototype.publish=function(b,c,g,f){d.assert("string"===typeof b,"Session.publish: <topic> must be a string");d.assert(!c||Array.isArray(c),"Session.publish: <args> must be an array []");d.assert(!g||g instanceof Object,"Session.publish: <kwargs> must be an object {}");d.assert(!f||f instanceof Object,"Session.publish: <options> must be an object {}");if(!this.isOpen)throw"session not open";
var l=f&&f.acknowledge,n=null,e=a();l&&(n=this._defer(),this._publish_reqs[e]=[n,f]);b=[16,e,f||{},this.resolve(b)];c&&(b.push(c),g&&b.push(g));this._send_wamp(b);if(n)return n.promise.then?n.promise:n};w.prototype.subscribe=function(b,c,g){d.assert("string"===typeof b,"Session.subscribe: <topic> must be a string");d.assert("function"===typeof c,"Session.subscribe: <handler> must be a function");d.assert(!g||g instanceof Object,"Session.subscribe: <options> must be an object {}");if(!this.isOpen)throw"session not open";
var f=a(),l=this._defer();this._subscribe_reqs[f]=[l,b,c,g];c=[32,f];g?c.push(g):c.push({});c.push(this.resolve(b));this._send_wamp(c);return l.promise.then?l.promise:l};w.prototype.register=function(b,c,g){d.assert("string"===typeof b,"Session.register: <procedure> must be a string");d.assert("function"===typeof c,"Session.register: <endpoint> must be a function");d.assert(!g||g instanceof Object,"Session.register: <options> must be an object {}");if(!this.isOpen)throw"session not open";var f=a(),
l=this._defer();this._register_reqs[f]=[l,b,c,g];c=[64,f];g?c.push(g):c.push({});c.push(this.resolve(b));this._send_wamp(c);return l.promise.then?l.promise:l};w.prototype.unsubscribe=function(b){d.assert(b instanceof l,"Session.unsubscribe: <subscription> must be an instance of class autobahn.Subscription");if(!this.isOpen)throw"session not open";if(!(b.active&&b.id in this._subscriptions))throw"subscription not active";var c=this._subscriptions[b.id],g=c.indexOf(b);if(-1===g)throw"subscription not active";
c.splice(g,1);b.active=!1;g=this._defer();c.length?g.resolve(!1):(c=a(),this._unsubscribe_reqs[c]=[g,b.id],this._send_wamp([34,c,b.id]));return g.promise.then?g.promise:g};w.prototype.unregister=function(b){d.assert(b instanceof z,"Session.unregister: <registration> must be an instance of class autobahn.Registration");if(!this.isOpen)throw"session not open";if(!(b.active&&b.id in this._registrations))throw"registration not active";var c=a(),g=this._defer();this._unregister_reqs[c]=[g,b];this._send_wamp([66,
c,b.id]);return g.promise.then?g.promise:g};w.prototype.prefix=function(a,b){d.assert("string"===typeof a,"Session.prefix: <prefix> must be a string");d.assert(!b||"string"===typeof b,"Session.prefix: <uri> must be a string or falsy");b?this._prefixes[a]=b:a in this._prefixes&&delete this._prefixes[a]};w.prototype.resolve=function(a){d.assert("string"===typeof a,"Session.resolve: <curie> must be a string");var b=a.indexOf(":");if(0<=b){var c=a.substring(0,b);if(c in this._prefixes)return this._prefixes[c]+
"."+a.substring(b+1);throw"cannot resolve CURIE prefix '"+c+"'";}return a};k.Session=w;k.Invocation=m;k.Event=q;k.Result=g;k.Error=n;k.Subscription=l;k.Registration=z;k.Publication=P}).call(this,"undefined"!==typeof self?self:"undefined"!==typeof window?window:{})},{"./log.js":7,"./util.js":19,when:77,"when/function":54}],17:[function(h,p,k){function b(b){a.assert(void 0!==b.url,"options.url missing");a.assert("string"===typeof b.url,"options.url must be a string");this._options=b}var a=h("../util.js"),
c=h("../log.js");h("when");b.prototype.type="longpoll";b.prototype.create=function(){var b=this;c.debug("longpoll.Factory.create");var d={protocol:void 0,send:void 0,close:void 0,onmessage:function(){},onopen:function(){},onclose:function(){},info:{type:"longpoll",url:null,protocol:"wamp.2.json"},_run:function(){var m=null,q=!1,g=b._options.request_timeout||2E3;a.http_post(b._options.url+"/open",JSON.stringify({protocols:["wamp.2.json"]}),g).then(function(n){function l(){c.debug("longpoll.Transport: polling for message ...");
a.http_post(z+"/receive",null,g).then(function(a){a&&(a=JSON.parse(a),c.debug("longpoll.Transport: message received",a),d.onmessage(a));q||l()},function(a){c.debug("longpoll.Transport: could not receive message",a.code,a.text);q=!0;d.onclose({code:1001,reason:"transport receive failure (HTTP/POST status "+a.code+" - '"+a.text+"')",wasClean:!1})})}m=JSON.parse(n);var z=b._options.url+"/"+m.transport;d.info.url=z;c.debug("longpoll.Transport: open",m);d.close=function(b,l){if(q)throw"transport is already closing";
q=!0;a.http_post(z+"/close",null,g).then(function(){c.debug("longpoll.Transport: transport closed");d.onclose({code:1E3,reason:"transport closed",wasClean:!0})},function(a){c.debug("longpoll.Transport: could not close transport",a.code,a.text)})};d.send=function(b){if(q)throw"transport is closing or closed already";c.debug("longpoll.Transport: sending message ...",b);b=JSON.stringify(b);a.http_post(z+"/send",b,g).then(function(){c.debug("longpoll.Transport: message sent")},function(a){c.debug("longpoll.Transport: could not send message",
a.code,a.text);q=!0;d.onclose({code:1001,reason:"transport send failure (HTTP/POST status "+a.code+" - '"+a.text+"')",wasClean:!1})})};l();d.onopen()},function(a){c.debug("longpoll.Transport: could not open transport",a.code,a.text);q=!0;d.onclose({code:1001,reason:"transport open failure (HTTP/POST status "+a.code+" - '"+a.text+"')",wasClean:!1})})}};d._run();return d};k.Factory=b},{"../log.js":7,"../util.js":19,when:77}],18:[function(h,p,k){(function(b){function a(a){c.assert(void 0!==a.url,"options.url missing");
c.assert("string"===typeof a.url,"options.url must be a string");a.protocols?c.assert(Array.isArray(a.protocols),"options.protocols must be an array"):a.protocols=["wamp.2.json"];this._options=a}var c=h("../util.js"),e=h("../log.js");a.prototype.type="websocket";a.prototype.create=function(){var a=this,c={protocol:void 0,send:void 0,close:void 0,onmessage:function(){},onopen:function(){},onclose:function(){},info:{type:"websocket",url:null,protocol:"wamp.2.json"}};"window"in b?function(){var b;if("WebSocket"in
window)b=a._options.protocols?new window.WebSocket(a._options.url,a._options.protocols):new window.WebSocket(a._options.url);else if("MozWebSocket"in window)b=a._options.protocols?new window.MozWebSocket(a._options.url,a._options.protocols):new window.MozWebSocket(a._options.url);else throw"browser does not support WebSocket";b.onmessage=function(a){e.debug("WebSocket transport receive",a.data);a=JSON.parse(a.data);c.onmessage(a)};b.onopen=function(){c.info.url=a._options.url;c.onopen()};b.onclose=
function(a){c.onclose({code:a.code,reason:a.message,wasClean:a.wasClean})};c.send=function(a){a=JSON.stringify(a);e.debug("WebSocket transport send",a);b.send(a)};c.close=function(a,c){b.close(a,c)}}():function(){var b=h("ws"),g,n;a._options.protocols?(n=a._options.protocols,Array.isArray(n)&&(n=n.join(",")),g=new b(a._options.url,{protocol:n})):g=new b(a._options.url);c.send=function(a){a=JSON.stringify(a);g.send(a,{binary:!1})};c.close=function(a,b){g.close()};g.on("open",function(){c.onopen()});
g.on("message",function(a,b){if(!b.binary){var d=JSON.parse(a);c.onmessage(d)}});g.on("close",function(a,b){c.onclose({code:a,reason:b,wasClean:1E3===a})});g.on("error",function(a){c.onclose({code:1006,reason:"",wasClean:!1})})}();return c};k.Factory=a}).call(this,"undefined"!==typeof self?self:"undefined"!==typeof window?window:{})},{"../log.js":7,"../util.js":19,ws:78}],19:[function(h,p,k){(function(b){var a=h("./log.js"),c=h("when"),e=function(a,c){if(!a){if(e.useDebugger||"AUTOBAHN_DEBUG"in b&&
AUTOBAHN_DEBUG)debugger;throw Error(c||"Assertion failed!");}};k.rand_normal=function(a,b){var c,g;do c=2*Math.random()-1,g=2*Math.random()-1,g=c*c+g*g;while(1<=g||0==g);g=Math.sqrt(-2*Math.log(g)/g);return(a||0)+c*g*(b||1)};k.assert=e;k.http_post=function(b,e,q){a.debug("new http_post request",b,e,q);var g=c.defer(),n=new XMLHttpRequest;n.onreadystatechange=function(){if(4===n.readyState){var a=1223===n.status?204:n.status;200===a&&g.resolve(n.responseText);if(204===a)g.resolve();else{var b=null;
try{b=n.statusText}catch(c){}g.reject({code:a,text:b})}}};n.open("POST",b,!0);n.setRequestHeader("Content-type","application/json; charset=utf-8");0<q&&(n.timeout=q,n.ontimeout=function(){g.reject({code:501,text:"request timeout"})});e?n.send(e):n.send();return g.promise.then?g.promise:g}}).call(this,"undefined"!==typeof self?self:"undefined"!==typeof window?window:{})},{"./log.js":7,when:77}],20:[function(h,p,k){(function(b,a,c){"object"===typeof k?p.exports=k=a(h("./core"),h("./enc-base64"),h("./md5"),
h("./evpkdf"),h("./cipher-core")):a(b.CryptoJS)})(this,function(b){(function(){var a=b.lib.BlockCipher,c=b.algo,e=[],d=[],m=[],q=[],g=[],n=[],l=[],z=[],h=[],w=[];(function(){for(var a=[],b=0;256>b;b++)a[b]=128>b?b<<1:b<<1^283;for(var c=0,v=0,b=0;256>b;b++){var k=v^v<<1^v<<2^v<<3^v<<4,k=k>>>8^k&255^99;e[c]=k;d[k]=c;var A=a[c],p=a[A],C=a[p],B=257*a[k]^16843008*k;m[c]=B<<24|B>>>8;q[c]=B<<16|B>>>16;g[c]=B<<8|B>>>24;n[c]=B;B=16843009*C^65537*p^257*A^16843008*c;l[k]=B<<24|B>>>8;z[k]=B<<16|B>>>16;h[k]=B<<
8|B>>>24;w[k]=B;c?(c=A^a[a[a[C^A]]],v^=a[a[v]]):c=v=1}})();var v=[0,1,2,4,8,16,32,64,128,27,54],c=c.AES=a.extend({_doReset:function(){for(var a=this._key,b=a.words,c=a.sigBytes/4,a=4*((this._nRounds=c+6)+1),d=this._keySchedule=[],g=0;g<a;g++)if(g<c)d[g]=b[g];else{var n=d[g-1];g%c?6<c&&4==g%c&&(n=e[n>>>24]<<24|e[n>>>16&255]<<16|e[n>>>8&255]<<8|e[n&255]):(n=n<<8|n>>>24,n=e[n>>>24]<<24|e[n>>>16&255]<<16|e[n>>>8&255]<<8|e[n&255],n^=v[g/c|0]<<24);d[g]=d[g-c]^n}b=this._invKeySchedule=[];for(c=0;c<a;c++)g=
a-c,n=c%4?d[g]:d[g-4],b[c]=4>c||4>=g?n:l[e[n>>>24]]^z[e[n>>>16&255]]^h[e[n>>>8&255]]^w[e[n&255]]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,m,q,g,n,e)},decryptBlock:function(a,b){var c=a[b+1];a[b+1]=a[b+3];a[b+3]=c;this._doCryptBlock(a,b,this._invKeySchedule,l,z,h,w,d);c=a[b+1];a[b+1]=a[b+3];a[b+3]=c},_doCryptBlock:function(a,b,c,d,g,l,n,e){for(var m=this._nRounds,z=a[b]^c[0],q=a[b+1]^c[1],v=a[b+2]^c[2],h=a[b+3]^c[3],w=4,P=1;P<m;P++)var k=d[z>>>24]^g[q>>>16&255]^l[v>>>8&
255]^n[h&255]^c[w++],p=d[q>>>24]^g[v>>>16&255]^l[h>>>8&255]^n[z&255]^c[w++],r=d[v>>>24]^g[h>>>16&255]^l[z>>>8&255]^n[q&255]^c[w++],h=d[h>>>24]^g[z>>>16&255]^l[q>>>8&255]^n[v&255]^c[w++],z=k,q=p,v=r;k=(e[z>>>24]<<24|e[q>>>16&255]<<16|e[v>>>8&255]<<8|e[h&255])^c[w++];p=(e[q>>>24]<<24|e[v>>>16&255]<<16|e[h>>>8&255]<<8|e[z&255])^c[w++];r=(e[v>>>24]<<24|e[h>>>16&255]<<16|e[z>>>8&255]<<8|e[q&255])^c[w++];h=(e[h>>>24]<<24|e[z>>>16&255]<<16|e[q>>>8&255]<<8|e[v&255])^c[w++];a[b]=k;a[b+1]=p;a[b+2]=r;a[b+3]=
h},keySize:8});b.AES=a._createHelper(c)})();return b.AES})},{"./cipher-core":21,"./core":22,"./enc-base64":23,"./evpkdf":25,"./md5":30}],21:[function(h,p,k){(function(b,a){"object"===typeof k?p.exports=k=a(h("./core")):a(b.CryptoJS)})(this,function(b){b.lib.Cipher||function(a){var c=b.lib,e=c.Base,d=c.WordArray,m=c.BufferedBlockAlgorithm,q=b.enc.Base64,g=b.algo.EvpKDF,n=c.Cipher=m.extend({cfg:e.extend(),createEncryptor:function(a,b){return this.create(this._ENC_XFORM_MODE,a,b)},createDecryptor:function(a,
b){return this.create(this._DEC_XFORM_MODE,a,b)},init:function(a,b,c){this.cfg=this.cfg.extend(c);this._xformMode=a;this._key=b;this.reset()},reset:function(){m.reset.call(this);this._doReset()},process:function(a){this._append(a);return this._process()},finalize:function(a){a&&this._append(a);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(){return function(a){return{encrypt:function(b,c,d){return("string"==typeof c?y:v).encrypt(a,b,c,d)},
decrypt:function(b,c,d){return("string"==typeof c?y:v).decrypt(a,b,c,d)}}}}()});c.StreamCipher=n.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var l=b.mode={},z=c.BlockCipherMode=e.extend({createEncryptor:function(a,b){return this.Encryptor.create(a,b)},createDecryptor:function(a,b){return this.Decryptor.create(a,b)},init:function(a,b){this._cipher=a;this._iv=b}}),l=l.CBC=function(){function b(c,d,f){var g=this._iv;g?this._iv=a:g=this._prevBlock;for(var l=0;l<f;l++)c[d+l]^=
g[l]}var c=z.extend();c.Encryptor=c.extend({processBlock:function(a,c){var d=this._cipher,f=d.blockSize;b.call(this,a,c,f);d.encryptBlock(a,c);this._prevBlock=a.slice(c,c+f)}});c.Decryptor=c.extend({processBlock:function(a,c){var d=this._cipher,f=d.blockSize,g=a.slice(c,c+f);d.decryptBlock(a,c);b.call(this,a,c,f);this._prevBlock=g}});return c}(),h=(b.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,g=c<<24|c<<16|c<<8|c,l=[],n=0;n<c;n+=4)l.push(g);c=d.create(l,c);a.concat(c)},unpad:function(a){a.sigBytes-=
a.words[a.sigBytes-1>>>2]&255}};c.BlockCipher=n.extend({cfg:n.cfg.extend({mode:l,padding:h}),reset:function(){n.reset.call(this);var a=this.cfg,b=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=a.createEncryptor;else c=a.createDecryptor,this._minBufferSize=1;this._mode=c.call(a,this,b&&b.words)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0)}else b=
this._process(!0),a.unpad(b);return b},blockSize:4});var w=c.CipherParams=e.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),l=(b.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;return(a?d.create([1398893684,1701076831]).concat(a).concat(b):b).toString(q)},parse:function(a){a=q.parse(a);var b=a.words;if(1398893684==b[0]&&1701076831==b[1]){var c=d.create(b.slice(2,4));b.splice(0,4);a.sigBytes-=16}return w.create({ciphertext:a,
salt:c})}},v=c.SerializableCipher=e.extend({cfg:e.extend({format:l}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var g=a.createEncryptor(c,d);b=g.finalize(b);g=g.cfg;return w.create({ciphertext:b,key:c,iv:g.iv,algorithm:a,mode:g.mode,padding:g.padding,blockSize:a.blockSize,formatter:d.format})},decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);return a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return"string"==typeof a?b.parse(a,this):a}}),e=(b.kdf=
{}).OpenSSL={execute:function(a,b,c,l){l||(l=d.random(8));a=g.create({keySize:b+c}).compute(a,l);c=d.create(a.words.slice(b),4*c);a.sigBytes=4*b;return w.create({key:a,iv:c,salt:l})}},y=c.PasswordBasedCipher=v.extend({cfg:v.cfg.extend({kdf:e}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);c=d.kdf.execute(c,a.keySize,a.ivSize);d.iv=c.iv;a=v.encrypt.call(this,a,b,c.key,d);a.mixIn(c);return a},decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);c=d.kdf.execute(c,a.keySize,a.ivSize,
b.salt);d.iv=c.iv;return v.decrypt.call(this,a,b,c.key,d)}})}()})},{"./core":22}],22:[function(h,p,k){(function(b,a){"object"===typeof k?p.exports=k=a():b.CryptoJS=a()})(this,function(){var b=b||function(a,b){var e={},d=e.lib={},m=d.Base=function(){function a(){}return{extend:function(b){a.prototype=this;var c=new a;b&&c.mixIn(b);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,
arguments);return a},init:function(){},mixIn:function(a){for(var b in a)a.hasOwnProperty(b)&&(this[b]=a[b]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}}}(),q=d.WordArray=m.extend({init:function(a,d){a=this.words=a||[];this.sigBytes=d!=b?d:4*a.length},toString:function(a){return(a||n).stringify(this)},concat:function(a){var b=this.words,c=a.words,d=this.sigBytes;a=a.sigBytes;this.clamp();if(d%4)for(var g=0;g<a;g++)b[d+g>>>2]|=
(c[g>>>2]>>>24-g%4*8&255)<<24-(d+g)%4*8;else if(65535<c.length)for(g=0;g<a;g+=4)b[d+g>>>2]=c[g>>>2];else b.push.apply(b,c);this.sigBytes+=a;return this},clamp:function(){var b=this.words,c=this.sigBytes;b[c>>>2]&=4294967295<<32-c%4*8;b.length=a.ceil(c/4)},clone:function(){var a=m.clone.call(this);a.words=this.words.slice(0);return a},random:function(b){for(var c=[],d=0;d<b;d+=4)c.push(4294967296*a.random()|0);return new q.init(c,b)}}),g=e.enc={},n=g.Hex={stringify:function(a){var b=a.words;a=a.sigBytes;
for(var c=[],d=0;d<a;d++){var g=b[d>>>2]>>>24-d%4*8&255;c.push((g>>>4).toString(16));c.push((g&15).toString(16))}return c.join("")},parse:function(a){for(var b=a.length,c=[],d=0;d<b;d+=2)c[d>>>3]|=parseInt(a.substr(d,2),16)<<24-d%8*4;return new q.init(c,b/2)}},l=g.Latin1={stringify:function(a){var b=a.words;a=a.sigBytes;for(var c=[],d=0;d<a;d++)c.push(String.fromCharCode(b[d>>>2]>>>24-d%4*8&255));return c.join("")},parse:function(a){for(var b=a.length,c=[],d=0;d<b;d++)c[d>>>2]|=(a.charCodeAt(d)&255)<<
24-d%4*8;return new q.init(c,b)}},z=g.Utf8={stringify:function(a){try{return decodeURIComponent(escape(l.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data");}},parse:function(a){return l.parse(unescape(encodeURIComponent(a)))}},h=d.BufferedBlockAlgorithm=m.extend({reset:function(){this._data=new q.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=z.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(b){var c=this._data,d=c.words,g=c.sigBytes,l=
this.blockSize,n=g/(4*l),n=b?a.ceil(n):a.max((n|0)-this._minBufferSize,0);b=n*l;g=a.min(4*b,g);if(b){for(var e=0;e<b;e+=l)this._doProcessBlock(d,e);e=d.splice(0,b);c.sigBytes-=g}return new q.init(e,g)},clone:function(){var a=m.clone.call(this);a._data=this._data.clone();return a},_minBufferSize:0});d.Hasher=h.extend({cfg:m.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){h.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},
finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,c){return(new a.init(c)).finalize(b)}},_createHmacHelper:function(a){return function(b,c){return(new w.HMAC.init(a,c)).finalize(b)}}});var w=e.algo={};return e}(Math);return b})},{}],23:[function(h,p,k){(function(b,a){"object"===typeof k?p.exports=k=a(h("./core")):a(b.CryptoJS)})(this,function(b){(function(){var a=b.lib.WordArray;b.enc.Base64={stringify:function(a){var b=a.words,
d=a.sigBytes,m=this._map;a.clamp();a=[];for(var q=0;q<d;q+=3)for(var g=(b[q>>>2]>>>24-q%4*8&255)<<16|(b[q+1>>>2]>>>24-(q+1)%4*8&255)<<8|b[q+2>>>2]>>>24-(q+2)%4*8&255,n=0;4>n&&q+0.75*n<d;n++)a.push(m.charAt(g>>>6*(3-n)&63));if(b=m.charAt(64))for(;a.length%4;)a.push(b);return a.join("")},parse:function(b){var e=b.length,d=this._map,m=d.charAt(64);m&&(m=b.indexOf(m),-1!=m&&(e=m));for(var m=[],q=0,g=0;g<e;g++)if(g%4){var n=d.indexOf(b.charAt(g-1))<<g%4*2,l=d.indexOf(b.charAt(g))>>>6-g%4*2;m[q>>>2]|=(n|
l)<<24-q%4*8;q++}return a.create(m,q)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();return b.enc.Base64})},{"./core":22}],24:[function(h,p,k){(function(b,a){"object"===typeof k?p.exports=k=a(h("./core")):a(b.CryptoJS)})(this,function(b){(function(){function a(a){return a<<8&4278255360|a>>>8&16711935}var c=b.lib.WordArray,e=b.enc;e.Utf16=e.Utf16BE={stringify:function(a){var b=a.words;a=a.sigBytes;for(var c=[],g=0;g<a;g+=2)c.push(String.fromCharCode(b[g>>>2]>>>16-g%
4*8&65535));return c.join("")},parse:function(a){for(var b=a.length,e=[],g=0;g<b;g++)e[g>>>1]|=a.charCodeAt(g)<<16-g%2*16;return c.create(e,2*b)}};e.Utf16LE={stringify:function(b){var c=b.words;b=b.sigBytes;for(var e=[],g=0;g<b;g+=2){var n=a(c[g>>>2]>>>16-g%4*8&65535);e.push(String.fromCharCode(n))}return e.join("")},parse:function(b){for(var e=b.length,q=[],g=0;g<e;g++)q[g>>>1]|=a(b.charCodeAt(g)<<16-g%2*16);return c.create(q,2*e)}}})();return b.enc.Utf16})},{"./core":22}],25:[function(h,p,k){(function(b,
a,c){"object"===typeof k?p.exports=k=a(h("./core"),h("./sha1"),h("./hmac")):a(b.CryptoJS)})(this,function(b){(function(){var a=b.lib,c=a.Base,e=a.WordArray,a=b.algo,d=a.EvpKDF=c.extend({cfg:c.extend({keySize:4,hasher:a.MD5,iterations:1}),init:function(a){this.cfg=this.cfg.extend(a)},compute:function(a,b){for(var c=this.cfg,d=c.hasher.create(),l=e.create(),z=l.words,h=c.keySize,c=c.iterations;z.length<h;){w&&d.update(w);var w=d.update(a).finalize(b);d.reset();for(var v=1;v<c;v++)w=d.finalize(w),d.reset();
l.concat(w)}l.sigBytes=4*h;return l}});b.EvpKDF=function(a,b,c){return d.create(c).compute(a,b)}})();return b.EvpKDF})},{"./core":22,"./hmac":27,"./sha1":46}],26:[function(h,p,k){(function(b,a,c){"object"===typeof k?p.exports=k=a(h("./core"),h("./cipher-core")):a(b.CryptoJS)})(this,function(b){(function(a){var c=b.lib.CipherParams,e=b.enc.Hex;b.format.Hex={stringify:function(a){return a.ciphertext.toString(e)},parse:function(a){a=e.parse(a);return c.create({ciphertext:a})}}})();return b.format.Hex})},
{"./cipher-core":21,"./core":22}],27:[function(h,p,k){(function(b,a){"object"===typeof k?p.exports=k=a(h("./core")):a(b.CryptoJS)})(this,function(b){(function(){var a=b.enc.Utf8;b.algo.HMAC=b.lib.Base.extend({init:function(b,e){b=this._hasher=new b.init;"string"==typeof e&&(e=a.parse(e));var d=b.blockSize,m=4*d;e.sigBytes>m&&(e=b.finalize(e));e.clamp();for(var q=this._oKey=e.clone(),g=this._iKey=e.clone(),n=q.words,l=g.words,z=0;z<d;z++)n[z]^=1549556828,l[z]^=909522486;q.sigBytes=g.sigBytes=m;this.reset()},
reset:function(){var a=this._hasher;a.reset();a.update(this._iKey)},update:function(a){this._hasher.update(a);return this},finalize:function(a){var b=this._hasher;a=b.finalize(a);b.reset();return b.finalize(this._oKey.clone().concat(a))}})})()})},{"./core":22}],28:[function(h,p,k){(function(b,a,c){"object"===typeof k?p.exports=k=a(h("./core"),h("./x64-core"),h("./lib-typedarrays"),h("./enc-utf16"),h("./enc-base64"),h("./md5"),h("./sha1"),h("./sha256"),h("./sha224"),h("./sha512"),h("./sha384"),h("./sha3"),
h("./ripemd160"),h("./hmac"),h("./pbkdf2"),h("./evpkdf"),h("./cipher-core"),h("./mode-cfb"),h("./mode-ctr"),h("./mode-ctr-gladman"),h("./mode-ofb"),h("./mode-ecb"),h("./pad-ansix923"),h("./pad-iso10126"),h("./pad-iso97971"),h("./pad-zeropadding"),h("./pad-nopadding"),h("./format-hex"),h("./aes"),h("./tripledes"),h("./rc4"),h("./rabbit"),h("./rabbit-legacy")):a(b.CryptoJS)})(this,function(b){return b})},{"./aes":20,"./cipher-core":21,"./core":22,"./enc-base64":23,"./enc-utf16":24,"./evpkdf":25,"./format-hex":26,
"./hmac":27,"./lib-typedarrays":29,"./md5":30,"./mode-cfb":31,"./mode-ctr":33,"./mode-ctr-gladman":32,"./mode-ecb":34,"./mode-ofb":35,"./pad-ansix923":36,"./pad-iso10126":37,"./pad-iso97971":38,"./pad-nopadding":39,"./pad-zeropadding":40,"./pbkdf2":41,"./rabbit":43,"./rabbit-legacy":42,"./rc4":44,"./ripemd160":45,"./sha1":46,"./sha224":47,"./sha256":48,"./sha3":49,"./sha384":50,"./sha512":51,"./tripledes":52,"./x64-core":53}],29:[function(h,p,k){(function(b,a){"object"===typeof k?p.exports=k=a(h("./core")):
a(b.CryptoJS)})(this,function(b){(function(){if("function"==typeof ArrayBuffer){var a=b.lib.WordArray,c=a.init;(a.init=function(a){a instanceof ArrayBuffer&&(a=new Uint8Array(a));if(a instanceof Int8Array||a instanceof Uint8ClampedArray||a instanceof Int16Array||a instanceof Uint16Array||a instanceof Int32Array||a instanceof Uint32Array||a instanceof Float32Array||a instanceof Float64Array)a=new Uint8Array(a.buffer,a.byteOffset,a.byteLength);if(a instanceof Uint8Array){for(var b=a.byteLength,m=[],
q=0;q<b;q++)m[q>>>2]|=a[q]<<24-q%4*8;c.call(this,m,b)}else c.apply(this,arguments)}).prototype=a}})();return b.lib.WordArray})},{"./core":22}],30:[function(h,p,k){(function(b,a){"object"===typeof k?p.exports=k=a(h("./core")):a(b.CryptoJS)})(this,function(b){(function(a){function c(a,b,c,d,g,l,f){a=a+(b&c|~b&d)+g+f;return(a<<l|a>>>32-l)+b}function e(a,b,c,d,g,l,f){a=a+(b&d|c&~d)+g+f;return(a<<l|a>>>32-l)+b}function d(a,b,c,d,g,l,f){a=a+(b^c^d)+g+f;return(a<<l|a>>>32-l)+b}function m(a,b,c,d,g,l,f){a=
a+(c^(b|~d))+g+f;return(a<<l|a>>>32-l)+b}var q=b.lib,g=q.WordArray,n=q.Hasher,q=b.algo,l=[];(function(){for(var b=0;64>b;b++)l[b]=4294967296*a.abs(a.sin(b+1))|0})();q=q.MD5=n.extend({_doReset:function(){this._hash=new g.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(a,b){for(var g=0;16>g;g++){var n=b+g,q=a[n];a[n]=(q<<8|q>>>24)&16711935|(q<<24|q>>>8)&4278255360}var g=this._hash.words,n=a[b+0],q=a[b+1],h=a[b+2],f=a[b+3],k=a[b+4],p=a[b+5],A=a[b+6],L=a[b+7],C=a[b+8],B=a[b+
9],E=a[b+10],I=a[b+11],Q=a[b+12],N=a[b+13],F=a[b+14],G=a[b+15],s=g[0],t=g[1],r=g[2],u=g[3],s=c(s,t,r,u,n,7,l[0]),u=c(u,s,t,r,q,12,l[1]),r=c(r,u,s,t,h,17,l[2]),t=c(t,r,u,s,f,22,l[3]),s=c(s,t,r,u,k,7,l[4]),u=c(u,s,t,r,p,12,l[5]),r=c(r,u,s,t,A,17,l[6]),t=c(t,r,u,s,L,22,l[7]),s=c(s,t,r,u,C,7,l[8]),u=c(u,s,t,r,B,12,l[9]),r=c(r,u,s,t,E,17,l[10]),t=c(t,r,u,s,I,22,l[11]),s=c(s,t,r,u,Q,7,l[12]),u=c(u,s,t,r,N,12,l[13]),r=c(r,u,s,t,F,17,l[14]),t=c(t,r,u,s,G,22,l[15]),s=e(s,t,r,u,q,5,l[16]),u=e(u,s,t,r,A,9,l[17]),
r=e(r,u,s,t,I,14,l[18]),t=e(t,r,u,s,n,20,l[19]),s=e(s,t,r,u,p,5,l[20]),u=e(u,s,t,r,E,9,l[21]),r=e(r,u,s,t,G,14,l[22]),t=e(t,r,u,s,k,20,l[23]),s=e(s,t,r,u,B,5,l[24]),u=e(u,s,t,r,F,9,l[25]),r=e(r,u,s,t,f,14,l[26]),t=e(t,r,u,s,C,20,l[27]),s=e(s,t,r,u,N,5,l[28]),u=e(u,s,t,r,h,9,l[29]),r=e(r,u,s,t,L,14,l[30]),t=e(t,r,u,s,Q,20,l[31]),s=d(s,t,r,u,p,4,l[32]),u=d(u,s,t,r,C,11,l[33]),r=d(r,u,s,t,I,16,l[34]),t=d(t,r,u,s,F,23,l[35]),s=d(s,t,r,u,q,4,l[36]),u=d(u,s,t,r,k,11,l[37]),r=d(r,u,s,t,L,16,l[38]),t=d(t,
r,u,s,E,23,l[39]),s=d(s,t,r,u,N,4,l[40]),u=d(u,s,t,r,n,11,l[41]),r=d(r,u,s,t,f,16,l[42]),t=d(t,r,u,s,A,23,l[43]),s=d(s,t,r,u,B,4,l[44]),u=d(u,s,t,r,Q,11,l[45]),r=d(r,u,s,t,G,16,l[46]),t=d(t,r,u,s,h,23,l[47]),s=m(s,t,r,u,n,6,l[48]),u=m(u,s,t,r,L,10,l[49]),r=m(r,u,s,t,F,15,l[50]),t=m(t,r,u,s,p,21,l[51]),s=m(s,t,r,u,Q,6,l[52]),u=m(u,s,t,r,f,10,l[53]),r=m(r,u,s,t,E,15,l[54]),t=m(t,r,u,s,q,21,l[55]),s=m(s,t,r,u,C,6,l[56]),u=m(u,s,t,r,G,10,l[57]),r=m(r,u,s,t,A,15,l[58]),t=m(t,r,u,s,N,21,l[59]),s=m(s,t,
r,u,k,6,l[60]),u=m(u,s,t,r,I,10,l[61]),r=m(r,u,s,t,h,15,l[62]),t=m(t,r,u,s,B,21,l[63]);g[0]=g[0]+s|0;g[1]=g[1]+t|0;g[2]=g[2]+r|0;g[3]=g[3]+u|0},_doFinalize:function(){var b=this._data,c=b.words,d=8*this._nDataBytes,g=8*b.sigBytes;c[g>>>5]|=128<<24-g%32;var l=a.floor(d/4294967296);c[(g+64>>>9<<4)+15]=(l<<8|l>>>24)&16711935|(l<<24|l>>>8)&4278255360;c[(g+64>>>9<<4)+14]=(d<<8|d>>>24)&16711935|(d<<24|d>>>8)&4278255360;b.sigBytes=4*(c.length+1);this._process();b=this._hash;c=b.words;for(d=0;4>d;d++)g=c[d],
c[d]=(g<<8|g>>>24)&16711935|(g<<24|g>>>8)&4278255360;return b},clone:function(){var a=n.clone.call(this);a._hash=this._hash.clone();return a}});b.MD5=n._createHelper(q);b.HmacMD5=n._createHmacHelper(q)})(Math);return b.MD5})},{"./core":22}],31:[function(h,p,k){(function(b,a,c){"object"===typeof k?p.exports=k=a(h("./core"),h("./cipher-core")):a(b.CryptoJS)})(this,function(b){b.mode.CFB=function(){function a(a,b,c,q){var g=this._iv;g?(g=g.slice(0),this._iv=void 0):g=this._prevBlock;q.encryptBlock(g,
0);for(q=0;q<c;q++)a[b+q]^=g[q]}var c=b.lib.BlockCipherMode.extend();c.Encryptor=c.extend({processBlock:function(b,c){var m=this._cipher,q=m.blockSize;a.call(this,b,c,q,m);this._prevBlock=b.slice(c,c+q)}});c.Decryptor=c.extend({processBlock:function(b,c){var m=this._cipher,q=m.blockSize,g=b.slice(c,c+q);a.call(this,b,c,q,m);this._prevBlock=g}});return c}();return b.mode.CFB})},{"./cipher-core":21,"./core":22}],32:[function(h,p,k){(function(b,a,c){"object"===typeof k?p.exports=k=a(h("./core"),h("./cipher-core")):
a(b.CryptoJS)})(this,function(b){b.mode.CTRGladman=function(){function a(a){if(255===(a>>24&255)){var b=a>>16&255,c=a>>8&255,g=a&255;255===b?(b=0,255===c?(c=0,255===g?g=0:++g):++c):++b;a=0+(b<<16)+(c<<8);a+=g}else a+=16777216;return a}var c=b.lib.BlockCipherMode.extend(),e=c.Encryptor=c.extend({processBlock:function(b,c){var e=this._cipher,g=e.blockSize,n=this._iv,l=this._counter;n&&(l=this._counter=n.slice(0),this._iv=void 0);n=l;0===(n[0]=a(n[0]))&&(n[1]=a(n[1]));l=l.slice(0);e.encryptBlock(l,0);
for(e=0;e<g;e++)b[c+e]^=l[e]}});c.Decryptor=e;return c}();return b.mode.CTRGladman})},{"./cipher-core":21,"./core":22}],33:[function(h,p,k){(function(b,a,c){"object"===typeof k?p.exports=k=a(h("./core"),h("./cipher-core")):a(b.CryptoJS)})(this,function(b){b.mode.CTR=function(){var a=b.lib.BlockCipherMode.extend(),c=a.Encryptor=a.extend({processBlock:function(a,b){var c=this._cipher,h=c.blockSize,g=this._iv,n=this._counter;g&&(n=this._counter=g.slice(0),this._iv=void 0);g=n.slice(0);c.encryptBlock(g,
0);n[h-1]=n[h-1]+1|0;for(c=0;c<h;c++)a[b+c]^=g[c]}});a.Decryptor=c;return a}();return b.mode.CTR})},{"./cipher-core":21,"./core":22}],34:[function(h,p,k){(function(b,a,c){"object"===typeof k?p.exports=k=a(h("./core"),h("./cipher-core")):a(b.CryptoJS)})(this,function(b){b.mode.ECB=function(){var a=b.lib.BlockCipherMode.extend();a.Encryptor=a.extend({processBlock:function(a,b){this._cipher.encryptBlock(a,b)}});a.Decryptor=a.extend({processBlock:function(a,b){this._cipher.decryptBlock(a,b)}});return a}();
return b.mode.ECB})},{"./cipher-core":21,"./core":22}],35:[function(h,p,k){(function(b,a,c){"object"===typeof k?p.exports=k=a(h("./core"),h("./cipher-core")):a(b.CryptoJS)})(this,function(b){b.mode.OFB=function(){var a=b.lib.BlockCipherMode.extend(),c=a.Encryptor=a.extend({processBlock:function(a,b){var c=this._cipher,h=c.blockSize,g=this._iv,n=this._keystream;g&&(n=this._keystream=g.slice(0),this._iv=void 0);c.encryptBlock(n,0);for(c=0;c<h;c++)a[b+c]^=n[c]}});a.Decryptor=c;return a}();return b.mode.OFB})},
{"./cipher-core":21,"./core":22}],36:[function(h,p,k){(function(b,a,c){"object"===typeof k?p.exports=k=a(h("./core"),h("./cipher-core")):a(b.CryptoJS)})(this,function(b){b.pad.AnsiX923={pad:function(a,b){var e=a.sigBytes,d=4*b,d=d-e%d,e=e+d-1;a.clamp();a.words[e>>>2]|=d<<24-e%4*8;a.sigBytes+=d},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};return b.pad.Ansix923})},{"./cipher-core":21,"./core":22}],37:[function(h,p,k){(function(b,a,c){"object"===typeof k?p.exports=k=a(h("./core"),h("./cipher-core")):
a(b.CryptoJS)})(this,function(b){b.pad.Iso10126={pad:function(a,c){var e=4*c,e=e-a.sigBytes%e;a.concat(b.lib.WordArray.random(e-1)).concat(b.lib.WordArray.create([e<<24],1))},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};return b.pad.Iso10126})},{"./cipher-core":21,"./core":22}],38:[function(h,p,k){(function(b,a,c){"object"===typeof k?p.exports=k=a(h("./core"),h("./cipher-core")):a(b.CryptoJS)})(this,function(b){b.pad.Iso97971={pad:function(a,c){a.concat(b.lib.WordArray.create([2147483648],
1));b.pad.ZeroPadding.pad(a,c)},unpad:function(a){b.pad.ZeroPadding.unpad(a);a.sigBytes--}};return b.pad.Iso97971})},{"./cipher-core":21,"./core":22}],39:[function(h,p,k){(function(b,a,c){"object"===typeof k?p.exports=k=a(h("./core"),h("./cipher-core")):a(b.CryptoJS)})(this,function(b){b.pad.NoPadding={pad:function(){},unpad:function(){}};return b.pad.NoPadding})},{"./cipher-core":21,"./core":22}],40:[function(h,p,k){(function(b,a,c){"object"===typeof k?p.exports=k=a(h("./core"),h("./cipher-core")):
a(b.CryptoJS)})(this,function(b){b.pad.ZeroPadding={pad:function(a,b){var e=4*b;a.clamp();a.sigBytes+=e-(a.sigBytes%e||e)},unpad:function(a){for(var b=a.words,e=a.sigBytes-1;!(b[e>>>2]>>>24-e%4*8&255);)e--;a.sigBytes=e+1}};return b.pad.ZeroPadding})},{"./cipher-core":21,"./core":22}],41:[function(h,p,k){(function(b,a,c){"object"===typeof k?p.exports=k=a(h("./core"),h("./sha1"),h("./hmac")):a(b.CryptoJS)})(this,function(b){(function(){var a=b.lib,c=a.Base,e=a.WordArray,a=b.algo,d=a.HMAC,m=a.PBKDF2=
c.extend({cfg:c.extend({keySize:4,hasher:a.SHA1,iterations:1}),init:function(a){this.cfg=this.cfg.extend(a)},compute:function(a,b){for(var c=this.cfg,l=d.create(c.hasher,a),m=e.create(),h=e.create([1]),w=m.words,k=h.words,y=c.keySize,c=c.iterations;w.length<y;){var p=l.update(b).finalize(h);l.reset();for(var f=p.words,x=f.length,J=p,A=1;A<c;A++){J=l.finalize(J);l.reset();for(var L=J.words,C=0;C<x;C++)f[C]^=L[C]}m.concat(p);k[0]++}m.sigBytes=4*y;return m}});b.PBKDF2=function(a,b,c){return m.create(c).compute(a,
b)}})();return b.PBKDF2})},{"./core":22,"./hmac":27,"./sha1":46}],42:[function(h,p,k){(function(b,a,c){"object"===typeof k?p.exports=k=a(h("./core"),h("./enc-base64"),h("./md5"),h("./evpkdf"),h("./cipher-core")):a(b.CryptoJS)})(this,function(b){(function(){function a(){for(var a=this._X,b=this._C,c=0;8>c;c++)d[c]=b[c];b[0]=b[0]+1295307597+this._b|0;b[1]=b[1]+3545052371+(b[0]>>>0<d[0]>>>0?1:0)|0;b[2]=b[2]+886263092+(b[1]>>>0<d[1]>>>0?1:0)|0;b[3]=b[3]+1295307597+(b[2]>>>0<d[2]>>>0?1:0)|0;b[4]=b[4]+
3545052371+(b[3]>>>0<d[3]>>>0?1:0)|0;b[5]=b[5]+886263092+(b[4]>>>0<d[4]>>>0?1:0)|0;b[6]=b[6]+1295307597+(b[5]>>>0<d[5]>>>0?1:0)|0;b[7]=b[7]+3545052371+(b[6]>>>0<d[6]>>>0?1:0)|0;this._b=b[7]>>>0<d[7]>>>0?1:0;for(c=0;8>c;c++){var e=a[c]+b[c],h=e&65535,q=e>>>16;m[c]=((h*h>>>17)+h*q>>>15)+q*q^((e&4294901760)*e|0)+((e&65535)*e|0)}a[0]=m[0]+(m[7]<<16|m[7]>>>16)+(m[6]<<16|m[6]>>>16)|0;a[1]=m[1]+(m[0]<<8|m[0]>>>24)+m[7]|0;a[2]=m[2]+(m[1]<<16|m[1]>>>16)+(m[0]<<16|m[0]>>>16)|0;a[3]=m[3]+(m[2]<<8|m[2]>>>24)+
m[1]|0;a[4]=m[4]+(m[3]<<16|m[3]>>>16)+(m[2]<<16|m[2]>>>16)|0;a[5]=m[5]+(m[4]<<8|m[4]>>>24)+m[3]|0;a[6]=m[6]+(m[5]<<16|m[5]>>>16)+(m[4]<<16|m[4]>>>16)|0;a[7]=m[7]+(m[6]<<8|m[6]>>>24)+m[5]|0}var c=b.lib.StreamCipher,e=[],d=[],m=[],h=b.algo.RabbitLegacy=c.extend({_doReset:function(){for(var b=this._key.words,c=this.cfg.iv,d=this._X=[b[0],b[3]<<16|b[2]>>>16,b[1],b[0]<<16|b[3]>>>16,b[2],b[1]<<16|b[0]>>>16,b[3],b[2]<<16|b[1]>>>16],b=this._C=[b[2]<<16|b[2]>>>16,b[0]&4294901760|b[1]&65535,b[3]<<16|b[3]>>>
16,b[1]&4294901760|b[2]&65535,b[0]<<16|b[0]>>>16,b[2]&4294901760|b[3]&65535,b[1]<<16|b[1]>>>16,b[3]&4294901760|b[0]&65535],e=this._b=0;4>e;e++)a.call(this);for(e=0;8>e;e++)b[e]^=d[e+4&7];if(c){var d=c.words,c=d[0],d=d[1],c=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360,d=(d<<8|d>>>24)&16711935|(d<<24|d>>>8)&4278255360,e=c>>>16|d&4294901760,m=d<<16|c&65535;b[0]^=c;b[1]^=e;b[2]^=d;b[3]^=m;b[4]^=c;b[5]^=e;b[6]^=d;b[7]^=m;for(e=0;4>e;e++)a.call(this)}},_doProcessBlock:function(b,c){var d=this._X;a.call(this);
e[0]=d[0]^d[5]>>>16^d[3]<<16;e[1]=d[2]^d[7]>>>16^d[5]<<16;e[2]=d[4]^d[1]>>>16^d[7]<<16;e[3]=d[6]^d[3]>>>16^d[1]<<16;for(d=0;4>d;d++)e[d]=(e[d]<<8|e[d]>>>24)&16711935|(e[d]<<24|e[d]>>>8)&4278255360,b[c+d]^=e[d]},blockSize:4,ivSize:2});b.RabbitLegacy=c._createHelper(h)})();return b.RabbitLegacy})},{"./cipher-core":21,"./core":22,"./enc-base64":23,"./evpkdf":25,"./md5":30}],43:[function(h,p,k){(function(b,a,c){"object"===typeof k?p.exports=k=a(h("./core"),h("./enc-base64"),h("./md5"),h("./evpkdf"),h("./cipher-core")):
a(b.CryptoJS)})(this,function(b){(function(){function a(){for(var a=this._X,b=this._C,c=0;8>c;c++)d[c]=b[c];b[0]=b[0]+1295307597+this._b|0;b[1]=b[1]+3545052371+(b[0]>>>0<d[0]>>>0?1:0)|0;b[2]=b[2]+886263092+(b[1]>>>0<d[1]>>>0?1:0)|0;b[3]=b[3]+1295307597+(b[2]>>>0<d[2]>>>0?1:0)|0;b[4]=b[4]+3545052371+(b[3]>>>0<d[3]>>>0?1:0)|0;b[5]=b[5]+886263092+(b[4]>>>0<d[4]>>>0?1:0)|0;b[6]=b[6]+1295307597+(b[5]>>>0<d[5]>>>0?1:0)|0;b[7]=b[7]+3545052371+(b[6]>>>0<d[6]>>>0?1:0)|0;this._b=b[7]>>>0<d[7]>>>0?1:0;for(c=
0;8>c;c++){var e=a[c]+b[c],h=e&65535,q=e>>>16;m[c]=((h*h>>>17)+h*q>>>15)+q*q^((e&4294901760)*e|0)+((e&65535)*e|0)}a[0]=m[0]+(m[7]<<16|m[7]>>>16)+(m[6]<<16|m[6]>>>16)|0;a[1]=m[1]+(m[0]<<8|m[0]>>>24)+m[7]|0;a[2]=m[2]+(m[1]<<16|m[1]>>>16)+(m[0]<<16|m[0]>>>16)|0;a[3]=m[3]+(m[2]<<8|m[2]>>>24)+m[1]|0;a[4]=m[4]+(m[3]<<16|m[3]>>>16)+(m[2]<<16|m[2]>>>16)|0;a[5]=m[5]+(m[4]<<8|m[4]>>>24)+m[3]|0;a[6]=m[6]+(m[5]<<16|m[5]>>>16)+(m[4]<<16|m[4]>>>16)|0;a[7]=m[7]+(m[6]<<8|m[6]>>>24)+m[5]|0}var c=b.lib.StreamCipher,
e=[],d=[],m=[],h=b.algo.Rabbit=c.extend({_doReset:function(){for(var b=this._key.words,c=this.cfg.iv,d=0;4>d;d++)b[d]=(b[d]<<8|b[d]>>>24)&16711935|(b[d]<<24|b[d]>>>8)&4278255360;for(var e=this._X=[b[0],b[3]<<16|b[2]>>>16,b[1],b[0]<<16|b[3]>>>16,b[2],b[1]<<16|b[0]>>>16,b[3],b[2]<<16|b[1]>>>16],b=this._C=[b[2]<<16|b[2]>>>16,b[0]&4294901760|b[1]&65535,b[3]<<16|b[3]>>>16,b[1]&4294901760|b[2]&65535,b[0]<<16|b[0]>>>16,b[2]&4294901760|b[3]&65535,b[1]<<16|b[1]>>>16,b[3]&4294901760|b[0]&65535],d=this._b=0;4>
d;d++)a.call(this);for(d=0;8>d;d++)b[d]^=e[d+4&7];if(c){var d=c.words,c=d[0],d=d[1],c=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360,d=(d<<8|d>>>24)&16711935|(d<<24|d>>>8)&4278255360,e=c>>>16|d&4294901760,m=d<<16|c&65535;b[0]^=c;b[1]^=e;b[2]^=d;b[3]^=m;b[4]^=c;b[5]^=e;b[6]^=d;b[7]^=m;for(d=0;4>d;d++)a.call(this)}},_doProcessBlock:function(b,c){var d=this._X;a.call(this);e[0]=d[0]^d[5]>>>16^d[3]<<16;e[1]=d[2]^d[7]>>>16^d[5]<<16;e[2]=d[4]^d[1]>>>16^d[7]<<16;e[3]=d[6]^d[3]>>>16^d[1]<<16;for(d=0;4>d;d++)e[d]=
(e[d]<<8|e[d]>>>24)&16711935|(e[d]<<24|e[d]>>>8)&4278255360,b[c+d]^=e[d]},blockSize:4,ivSize:2});b.Rabbit=c._createHelper(h)})();return b.Rabbit})},{"./cipher-core":21,"./core":22,"./enc-base64":23,"./evpkdf":25,"./md5":30}],44:[function(h,p,k){(function(b,a,c){"object"===typeof k?p.exports=k=a(h("./core"),h("./enc-base64"),h("./md5"),h("./evpkdf"),h("./cipher-core")):a(b.CryptoJS)})(this,function(b){(function(){function a(){for(var a=this._S,b=this._i,c=this._j,d=0,e=0;4>e;e++){var b=(b+1)%256,c=
(c+a[b])%256,h=a[b];a[b]=a[c];a[c]=h;d|=a[(a[b]+a[c])%256]<<24-8*e}this._i=b;this._j=c;return d}var c=b.lib.StreamCipher,e=b.algo,d=e.RC4=c.extend({_doReset:function(){for(var a=this._key,b=a.words,a=a.sigBytes,c=this._S=[],d=0;256>d;d++)c[d]=d;for(var e=d=0;256>d;d++){var h=d%a,e=(e+c[d]+(b[h>>>2]>>>24-h%4*8&255))%256,h=c[d];c[d]=c[e];c[e]=h}this._i=this._j=0},_doProcessBlock:function(b,c){b[c]^=a.call(this)},keySize:8,ivSize:0});b.RC4=c._createHelper(d);e=e.RC4Drop=d.extend({cfg:d.cfg.extend({drop:192}),
_doReset:function(){d._doReset.call(this);for(var b=this.cfg.drop;0<b;b--)a.call(this)}});b.RC4Drop=c._createHelper(e)})();return b.RC4})},{"./cipher-core":21,"./core":22,"./enc-base64":23,"./evpkdf":25,"./md5":30}],45:[function(h,p,k){(function(b,a){"object"===typeof k?p.exports=k=a(h("./core")):a(b.CryptoJS)})(this,function(b){(function(a){function c(a,b){return a<<b|a>>>32-b}a=b.lib;var e=a.WordArray,d=a.Hasher;a=b.algo;var h=e.create([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,
0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13]),q=e.create([5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11]),g=e.create([11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,
6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6]),n=e.create([8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11]),l=e.create([0,1518500249,1859775393,2400959708,2840853838]),z=e.create([1352829926,1548603684,1836072691,2053994217,0]);a=a.RIPEMD160=d.extend({_doReset:function(){this._hash=e.create([1732584193,4023233417,2562383102,271733878,3285377520])},
_doProcessBlock:function(a,b){for(var d=0;16>d;d++){var e=b+d,k=a[e];a[e]=(k<<8|k>>>24)&16711935|(k<<24|k>>>8)&4278255360}var e=this._hash.words,k=l.words,f=z.words,p=h.words,J=q.words,A=g.words,L=n.words,C,B,E,I,Q,N,F,G,s,t;N=C=e[0];F=B=e[1];G=E=e[2];s=I=e[3];t=Q=e[4];for(var r,d=0;80>d;d+=1)r=C+a[b+p[d]]|0,r=16>d?r+((B^E^I)+k[0]):32>d?r+((B&E|~B&I)+k[1]):48>d?r+(((B|~E)^I)+k[2]):64>d?r+((B&I|E&~I)+k[3]):r+((B^(E|~I))+k[4]),r|=0,r=c(r,A[d]),r=r+Q|0,C=Q,Q=I,I=c(E,10),E=B,B=r,r=N+a[b+J[d]]|0,r=16>
d?r+((F^(G|~s))+f[0]):32>d?r+((F&s|G&~s)+f[1]):48>d?r+(((F|~G)^s)+f[2]):64>d?r+((F&G|~F&s)+f[3]):r+((F^G^s)+f[4]),r|=0,r=c(r,L[d]),r=r+t|0,N=t,t=s,s=c(G,10),G=F,F=r;r=e[1]+E+s|0;e[1]=e[2]+I+t|0;e[2]=e[3]+Q+N|0;e[3]=e[4]+C+F|0;e[4]=e[0]+B+G|0;e[0]=r},_doFinalize:function(){var a=this._data,b=a.words,c=8*this._nDataBytes,d=8*a.sigBytes;b[d>>>5]|=128<<24-d%32;b[(d+64>>>9<<4)+14]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;a.sigBytes=4*(b.length+1);this._process();a=this._hash;b=a.words;for(c=0;5>
c;c++)d=b[c],b[c]=(d<<8|d>>>24)&16711935|(d<<24|d>>>8)&4278255360;return a},clone:function(){var a=d.clone.call(this);a._hash=this._hash.clone();return a}});b.RIPEMD160=d._createHelper(a);b.HmacRIPEMD160=d._createHmacHelper(a)})(Math);return b.RIPEMD160})},{"./core":22}],46:[function(h,p,k){(function(b,a){"object"===typeof k?p.exports=k=a(h("./core")):a(b.CryptoJS)})(this,function(b){(function(){var a=b.lib,c=a.WordArray,e=a.Hasher,d=[],a=b.algo.SHA1=e.extend({_doReset:function(){this._hash=new c.init([1732584193,
4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(a,b){for(var c=this._hash.words,e=c[0],l=c[1],h=c[2],k=c[3],w=c[4],p=0;80>p;p++){if(16>p)d[p]=a[b+p]|0;else{var y=d[p-3]^d[p-8]^d[p-14]^d[p-16];d[p]=y<<1|y>>>31}y=(e<<5|e>>>27)+w+d[p];y=20>p?y+((l&h|~l&k)+1518500249):40>p?y+((l^h^k)+1859775393):60>p?y+((l&h|l&k|h&k)-1894007588):y+((l^h^k)-899497514);w=k;k=h;h=l<<30|l>>>2;l=e;e=y}c[0]=c[0]+e|0;c[1]=c[1]+l|0;c[2]=c[2]+h|0;c[3]=c[3]+k|0;c[4]=c[4]+w|0},_doFinalize:function(){var a=
this._data,b=a.words,c=8*this._nDataBytes,d=8*a.sigBytes;b[d>>>5]|=128<<24-d%32;b[(d+64>>>9<<4)+14]=Math.floor(c/4294967296);b[(d+64>>>9<<4)+15]=c;a.sigBytes=4*b.length;this._process();return this._hash},clone:function(){var a=e.clone.call(this);a._hash=this._hash.clone();return a}});b.SHA1=e._createHelper(a);b.HmacSHA1=e._createHmacHelper(a)})();return b.SHA1})},{"./core":22}],47:[function(h,p,k){(function(b,a,c){"object"===typeof k?p.exports=k=a(h("./core"),h("./sha256")):a(b.CryptoJS)})(this,function(b){(function(){var a=
b.lib.WordArray,c=b.algo,e=c.SHA256,c=c.SHA224=e.extend({_doReset:function(){this._hash=new a.init([3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428])},_doFinalize:function(){var a=e._doFinalize.call(this);a.sigBytes-=4;return a}});b.SHA224=e._createHelper(c);b.HmacSHA224=e._createHmacHelper(c)})();return b.SHA224})},{"./core":22,"./sha256":48}],48:[function(h,p,k){(function(b,a){"object"===typeof k?p.exports=k=a(h("./core")):a(b.CryptoJS)})(this,function(b){(function(a){var c=
b.lib,e=c.WordArray,d=c.Hasher,c=b.algo,h=[],q=[];(function(){function b(c){for(var d=a.sqrt(c),g=2;g<=d;g++)if(!(c%g))return!1;return!0}function c(a){return 4294967296*(a-(a|0))|0}for(var d=2,g=0;64>g;)b(d)&&(8>g&&(h[g]=c(a.pow(d,0.5))),q[g]=c(a.pow(d,1/3)),g++),d++})();var g=[],c=c.SHA256=d.extend({_doReset:function(){this._hash=new e.init(h.slice(0))},_doProcessBlock:function(a,b){for(var c=this._hash.words,d=c[0],e=c[1],h=c[2],m=c[3],k=c[4],f=c[5],p=c[6],J=c[7],A=0;64>A;A++){if(16>A)g[A]=a[b+
A]|0;else{var L=g[A-15],C=g[A-2];g[A]=((L<<25|L>>>7)^(L<<14|L>>>18)^L>>>3)+g[A-7]+((C<<15|C>>>17)^(C<<13|C>>>19)^C>>>10)+g[A-16]}L=J+((k<<26|k>>>6)^(k<<21|k>>>11)^(k<<7|k>>>25))+(k&f^~k&p)+q[A]+g[A];C=((d<<30|d>>>2)^(d<<19|d>>>13)^(d<<10|d>>>22))+(d&e^d&h^e&h);J=p;p=f;f=k;k=m+L|0;m=h;h=e;e=d;d=L+C|0}c[0]=c[0]+d|0;c[1]=c[1]+e|0;c[2]=c[2]+h|0;c[3]=c[3]+m|0;c[4]=c[4]+k|0;c[5]=c[5]+f|0;c[6]=c[6]+p|0;c[7]=c[7]+J|0},_doFinalize:function(){var b=this._data,c=b.words,d=8*this._nDataBytes,g=8*b.sigBytes;c[g>>>
5]|=128<<24-g%32;c[(g+64>>>9<<4)+14]=a.floor(d/4294967296);c[(g+64>>>9<<4)+15]=d;b.sigBytes=4*c.length;this._process();return this._hash},clone:function(){var a=d.clone.call(this);a._hash=this._hash.clone();return a}});b.SHA256=d._createHelper(c);b.HmacSHA256=d._createHmacHelper(c)})(Math);return b.SHA256})},{"./core":22}],49:[function(h,p,k){(function(b,a,c){"object"===typeof k?p.exports=k=a(h("./core"),h("./x64-core")):a(b.CryptoJS)})(this,function(b){(function(a){var c=b.lib,e=c.WordArray,d=c.Hasher,
h=b.x64.Word,c=b.algo,q=[],g=[],n=[];(function(){for(var a=1,b=0,c=0;24>c;c++){q[a+5*b]=(c+1)*(c+2)/2%64;var d=(2*a+3*b)%5,a=b%5,b=d}for(a=0;5>a;a++)for(b=0;5>b;b++)g[a+5*b]=b+(2*a+3*b)%5*5;a=1;for(b=0;24>b;b++){for(var e=d=c=0;7>e;e++){if(a&1){var l=(1<<e)-1;32>l?d^=1<<l:c^=1<<l-32}a=a&128?a<<1^113:a<<1}n[b]=h.create(c,d)}})();var l=[];(function(){for(var a=0;25>a;a++)l[a]=h.create()})();c=c.SHA3=d.extend({cfg:d.cfg.extend({outputLength:512}),_doReset:function(){for(var a=this._state=[],b=0;25>b;b++)a[b]=
new h.init;this.blockSize=(1600-2*this.cfg.outputLength)/32},_doProcessBlock:function(a,b){for(var c=this._state,d=this.blockSize/2,e=0;e<d;e++){var h=a[b+2*e],f=a[b+2*e+1],h=(h<<8|h>>>24)&16711935|(h<<24|h>>>8)&4278255360,f=(f<<8|f>>>24)&16711935|(f<<24|f>>>8)&4278255360,m=c[e];m.high^=f;m.low^=h}for(d=0;24>d;d++){for(e=0;5>e;e++){for(var k=h=0,p=0;5>p;p++)m=c[e+5*p],h^=m.high,k^=m.low;m=l[e];m.high=h;m.low=k}for(e=0;5>e;e++)for(m=l[(e+4)%5],h=l[(e+1)%5],f=h.high,p=h.low,h=m.high^(f<<1|p>>>31),k=
m.low^(p<<1|f>>>31),p=0;5>p;p++)m=c[e+5*p],m.high^=h,m.low^=k;for(f=1;25>f;f++)m=c[f],e=m.high,m=m.low,p=q[f],32>p?(h=e<<p|m>>>32-p,k=m<<p|e>>>32-p):(h=m<<p-32|e>>>64-p,k=e<<p-32|m>>>64-p),m=l[g[f]],m.high=h,m.low=k;m=l[0];e=c[0];m.high=e.high;m.low=e.low;for(e=0;5>e;e++)for(p=0;5>p;p++)f=e+5*p,m=c[f],h=l[f],f=l[(e+1)%5+5*p],k=l[(e+2)%5+5*p],m.high=h.high^~f.high&k.high,m.low=h.low^~f.low&k.low;m=c[0];e=n[d];m.high^=e.high;m.low^=e.low}},_doFinalize:function(){var b=this._data,c=b.words,d=8*b.sigBytes,
g=32*this.blockSize;c[d>>>5]|=1<<24-d%32;c[(a.ceil((d+1)/g)*g>>>5)-1]|=128;b.sigBytes=4*c.length;this._process();for(var b=this._state,c=this.cfg.outputLength/8,d=c/8,g=[],l=0;l<d;l++){var h=b[l],f=h.high,h=h.low,f=(f<<8|f>>>24)&16711935|(f<<24|f>>>8)&4278255360,h=(h<<8|h>>>24)&16711935|(h<<24|h>>>8)&4278255360;g.push(h);g.push(f)}return new e.init(g,c)},clone:function(){for(var a=d.clone.call(this),b=a._state=this._state.slice(0),c=0;25>c;c++)b[c]=b[c].clone();return a}});b.SHA3=d._createHelper(c);
b.HmacSHA3=d._createHmacHelper(c)})(Math);return b.SHA3})},{"./core":22,"./x64-core":53}],50:[function(h,p,k){(function(b,a,c){"object"===typeof k?p.exports=k=a(h("./core"),h("./x64-core"),h("./sha512")):a(b.CryptoJS)})(this,function(b){(function(){var a=b.x64,c=a.Word,e=a.WordArray,a=b.algo,d=a.SHA512,a=a.SHA384=d.extend({_doReset:function(){this._hash=new e.init([new c.init(3418070365,3238371032),new c.init(1654270250,914150663),new c.init(2438529370,812702999),new c.init(355462360,4144912697),
new c.init(1731405415,4290775857),new c.init(2394180231,1750603025),new c.init(3675008525,1694076839),new c.init(1203062813,3204075428)])},_doFinalize:function(){var a=d._doFinalize.call(this);a.sigBytes-=16;return a}});b.SHA384=d._createHelper(a);b.HmacSHA384=d._createHmacHelper(a)})();return b.SHA384})},{"./core":22,"./sha512":51,"./x64-core":53}],51:[function(h,p,k){(function(b,a,c){"object"===typeof k?p.exports=k=a(h("./core"),h("./x64-core")):a(b.CryptoJS)})(this,function(b){(function(){function a(){return d.create.apply(d,
arguments)}var c=b.lib.Hasher,e=b.x64,d=e.Word,h=e.WordArray,e=b.algo,q=[a(1116352408,3609767458),a(1899447441,602891725),a(3049323471,3964484399),a(3921009573,2173295548),a(961987163,4081628472),a(1508970993,3053834265),a(2453635748,2937671579),a(2870763221,3664609560),a(3624381080,2734883394),a(310598401,1164996542),a(607225278,1323610764),a(1426881987,3590304994),a(1925078388,4068182383),a(2162078206,991336113),a(2614888103,633803317),a(3248222580,3479774868),a(3835390401,2666613458),a(4022224774,
944711139),a(264347078,2341262773),a(604807628,2007800933),a(770255983,1495990901),a(1249150122,1856431235),a(1555081692,3175218132),a(1996064986,2198950837),a(2554220882,3999719339),a(2821834349,766784016),a(2952996808,2566594879),a(3210313671,3203337956),a(3336571891,1034457026),a(3584528711,2466948901),a(113926993,3758326383),a(338241895,168717936),a(666307205,1188179964),a(773529912,1546045734),a(1294757372,1522805485),a(1396182291,2643833823),a(1695183700,2343527390),a(1986661051,1014477480),
a(2177026350,1206759142),a(2456956037,344077627),a(2730485921,1290863460),a(2820302411,3158454273),a(3259730800,3505952657),a(3345764771,106217008),a(3516065817,3606008344),a(3600352804,1432725776),a(4094571909,1467031594),a(275423344,851169720),a(430227734,3100823752),a(506948616,1363258195),a(659060556,3750685593),a(883997877,3785050280),a(958139571,3318307427),a(1322822218,3812723403),a(1537002063,2003034995),a(1747873779,3602036899),a(1955562222,1575990012),a(2024104815,1125592928),a(2227730452,
2716904306),a(2361852424,442776044),a(2428436474,593698344),a(2756734187,3733110249),a(3204031479,2999351573),a(3329325298,3815920427),a(3391569614,3928383900),a(3515267271,566280711),a(3940187606,3454069534),a(4118630271,4000239992),a(116418474,1914138554),a(174292421,2731055270),a(289380356,3203993006),a(460393269,320620315),a(685471733,587496836),a(852142971,1086792851),a(1017036298,365543100),a(1126000580,2618297676),a(1288033470,3409855158),a(1501505948,4234509866),a(1607167915,987167468),a(1816402316,
1246189591)],g=[];(function(){for(var b=0;80>b;b++)g[b]=a()})();e=e.SHA512=c.extend({_doReset:function(){this._hash=new h.init([new d.init(1779033703,4089235720),new d.init(3144134277,2227873595),new d.init(1013904242,4271175723),new d.init(2773480762,1595750129),new d.init(1359893119,2917565137),new d.init(2600822924,725511199),new d.init(528734635,4215389547),new d.init(1541459225,327033209)])},_doProcessBlock:function(a,b){for(var c=this._hash.words,d=c[0],e=c[1],h=c[2],m=c[3],k=c[4],f=c[5],p=
c[6],c=c[7],J=d.high,A=d.low,L=e.high,C=e.low,B=h.high,E=h.low,I=m.high,Q=m.low,N=k.high,F=k.low,G=f.high,s=f.low,t=p.high,r=p.low,u=c.high,V=c.low,S=J,M=A,R=L,O=C,aa=B,ea=E,ma=I,fa=Q,X=N,T=F,ja=G,ia=s,ka=t,ga=r,ha=u,da=V,U=0;80>U;U++){var $=g[U];if(16>U)var W=$.high=a[b+2*U]|0,D=$.low=a[b+2*U+1]|0;else{var W=g[U-15],D=W.high,Y=W.low,W=(D>>>1|Y<<31)^(D>>>8|Y<<24)^D>>>7,Y=(Y>>>1|D<<31)^(Y>>>8|D<<24)^(Y>>>7|D<<25),ca=g[U-2],D=ca.high,K=ca.low,ca=(D>>>19|K<<13)^(D<<3|K>>>29)^D>>>6,K=(K>>>19|D<<13)^(K<<
3|D>>>29)^(K>>>6|D<<26),D=g[U-7],na=D.high,ba=g[U-16],Z=ba.high,ba=ba.low,D=Y+D.low,W=W+na+(D>>>0<Y>>>0?1:0),D=D+K,W=W+ca+(D>>>0<K>>>0?1:0),D=D+ba,W=W+Z+(D>>>0<ba>>>0?1:0);$.high=W;$.low=D}var na=X&ja^~X&ka,ba=T&ia^~T&ga,$=S&R^S&aa^R&aa,pa=M&O^M&ea^O&ea,Y=(S>>>28|M<<4)^(S<<30|M>>>2)^(S<<25|M>>>7),ca=(M>>>28|S<<4)^(M<<30|S>>>2)^(M<<25|S>>>7),K=q[U],qa=K.high,oa=K.low,K=da+((T>>>14|X<<18)^(T>>>18|X<<14)^(T<<23|X>>>9)),Z=ha+((X>>>14|T<<18)^(X>>>18|T<<14)^(X<<23|T>>>9))+(K>>>0<da>>>0?1:0),K=K+ba,Z=Z+
na+(K>>>0<ba>>>0?1:0),K=K+oa,Z=Z+qa+(K>>>0<oa>>>0?1:0),K=K+D,Z=Z+W+(K>>>0<D>>>0?1:0),D=ca+pa,$=Y+$+(D>>>0<ca>>>0?1:0),ha=ka,da=ga,ka=ja,ga=ia,ja=X,ia=T,T=fa+K|0,X=ma+Z+(T>>>0<fa>>>0?1:0)|0,ma=aa,fa=ea,aa=R,ea=O,R=S,O=M,M=K+D|0,S=Z+$+(M>>>0<K>>>0?1:0)|0}A=d.low=A+M;d.high=J+S+(A>>>0<M>>>0?1:0);C=e.low=C+O;e.high=L+R+(C>>>0<O>>>0?1:0);E=h.low=E+ea;h.high=B+aa+(E>>>0<ea>>>0?1:0);Q=m.low=Q+fa;m.high=I+ma+(Q>>>0<fa>>>0?1:0);F=k.low=F+T;k.high=N+X+(F>>>0<T>>>0?1:0);s=f.low=s+ia;f.high=G+ja+(s>>>0<ia>>>
0?1:0);r=p.low=r+ga;p.high=t+ka+(r>>>0<ga>>>0?1:0);V=c.low=V+da;c.high=u+ha+(V>>>0<da>>>0?1:0)},_doFinalize:function(){var a=this._data,b=a.words,c=8*this._nDataBytes,d=8*a.sigBytes;b[d>>>5]|=128<<24-d%32;b[(d+128>>>10<<5)+30]=Math.floor(c/4294967296);b[(d+128>>>10<<5)+31]=c;a.sigBytes=4*b.length;this._process();return this._hash.toX32()},clone:function(){var a=c.clone.call(this);a._hash=this._hash.clone();return a},blockSize:32});b.SHA512=c._createHelper(e);b.HmacSHA512=c._createHmacHelper(e)})();
return b.SHA512})},{"./core":22,"./x64-core":53}],52:[function(h,p,k){(function(b,a,c){"object"===typeof k?p.exports=k=a(h("./core"),h("./enc-base64"),h("./md5"),h("./evpkdf"),h("./cipher-core")):a(b.CryptoJS)})(this,function(b){(function(){function a(a,b){var c=(this._lBlock>>>a^this._rBlock)&b;this._rBlock^=c;this._lBlock^=c<<a}function c(a,b){var c=(this._rBlock>>>a^this._lBlock)&b;this._lBlock^=c;this._rBlock^=c<<a}var e=b.lib,d=e.WordArray,e=e.BlockCipher,h=b.algo,k=[57,49,41,33,25,17,9,1,58,
50,42,34,26,18,10,2,59,51,43,35,27,19,11,3,60,52,44,36,63,55,47,39,31,23,15,7,62,54,46,38,30,22,14,6,61,53,45,37,29,21,13,5,28,20,12,4],g=[14,17,11,24,1,5,3,28,15,6,21,10,23,19,12,4,26,8,16,7,27,20,13,2,41,52,31,37,47,55,30,40,51,45,33,48,44,49,39,56,34,53,46,42,50,36,29,32],n=[1,2,4,6,8,10,12,14,15,17,19,21,23,25,27,28],l=[{0:8421888,268435456:32768,536870912:8421378,805306368:2,1073741824:512,1342177280:8421890,1610612736:8389122,1879048192:8388608,2147483648:514,2415919104:8389120,2684354560:33280,
2952790016:8421376,3221225472:32770,3489660928:8388610,3758096384:0,4026531840:33282,134217728:0,402653184:8421890,671088640:33282,939524096:32768,1207959552:8421888,1476395008:512,1744830464:8421378,2013265920:2,2281701376:8389120,2550136832:33280,2818572288:8421376,3087007744:8389122,3355443200:8388610,3623878656:32770,3892314112:514,4160749568:8388608,1:32768,268435457:2,536870913:8421888,805306369:8388608,1073741825:8421378,1342177281:33280,1610612737:512,1879048193:8389122,2147483649:8421890,
2415919105:8421376,2684354561:8388610,2952790017:33282,3221225473:514,3489660929:8389120,3758096385:32770,4026531841:0,134217729:8421890,402653185:8421376,671088641:8388608,939524097:512,1207959553:32768,1476395009:8388610,1744830465:2,2013265921:33282,2281701377:32770,2550136833:8389122,2818572289:514,3087007745:8421888,3355443201:8389120,3623878657:0,3892314113:33280,4160749569:8421378},{0:1074282512,16777216:16384,33554432:524288,50331648:1074266128,67108864:1073741840,83886080:1074282496,100663296:1073758208,
117440512:16,134217728:540672,150994944:1073758224,167772160:1073741824,184549376:540688,201326592:524304,218103808:0,234881024:16400,251658240:1074266112,8388608:1073758208,25165824:540688,41943040:16,58720256:1073758224,75497472:1074282512,92274688:1073741824,109051904:524288,125829120:1074266128,142606336:524304,159383552:0,176160768:16384,192937984:1074266112,209715200:1073741840,226492416:540672,243269632:1074282496,260046848:16400,268435456:0,285212672:1074266128,301989888:1073758224,318767104:1074282496,
335544320:1074266112,352321536:16,369098752:540688,385875968:16384,402653184:16400,419430400:524288,436207616:524304,452984832:1073741840,469762048:540672,486539264:1073758208,503316480:1073741824,520093696:1074282512,276824064:540688,293601280:524288,310378496:1074266112,327155712:16384,343932928:1073758208,360710144:1074282512,377487360:16,394264576:1073741824,411041792:1074282496,427819008:1073741840,444596224:1073758224,461373440:524304,478150656:0,494927872:16400,511705088:1074266128,528482304:540672},
{0:260,1048576:0,2097152:67109120,3145728:65796,4194304:65540,5242880:67108868,6291456:67174660,7340032:67174400,8388608:67108864,9437184:67174656,10485760:65792,11534336:67174404,12582912:67109124,13631488:65536,14680064:4,15728640:256,524288:67174656,1572864:67174404,2621440:0,3670016:67109120,4718592:67108868,5767168:65536,6815744:65540,7864320:260,8912896:4,9961472:256,11010048:67174400,12058624:65796,13107200:65792,14155776:67109124,15204352:67174660,16252928:67108864,16777216:67174656,17825792:65540,
18874368:65536,19922944:67109120,20971520:256,22020096:67174660,23068672:67108868,24117248:0,25165824:67109124,26214400:67108864,27262976:4,28311552:65792,29360128:67174400,30408704:260,31457280:65796,32505856:67174404,17301504:67108864,18350080:260,19398656:67174656,20447232:0,21495808:65540,22544384:67109120,23592960:256,24641536:67174404,25690112:65536,26738688:67174660,27787264:65796,28835840:67108868,29884416:67109124,30932992:67174400,31981568:4,33030144:65792},{0:2151682048,65536:2147487808,
131072:4198464,196608:2151677952,262144:0,327680:4198400,393216:2147483712,458752:4194368,524288:2147483648,589824:4194304,655360:64,720896:2147487744,786432:2151678016,851968:4160,917504:4096,983040:2151682112,32768:2147487808,98304:64,163840:2151678016,229376:2147487744,294912:4198400,360448:2151682112,425984:0,491520:2151677952,557056:4096,622592:2151682048,688128:4194304,753664:4160,819200:2147483648,884736:4194368,950272:4198464,1015808:2147483712,1048576:4194368,1114112:4198400,1179648:2147483712,
1245184:0,1310720:4160,1376256:2151678016,1441792:2151682048,1507328:2147487808,1572864:2151682112,1638400:2147483648,1703936:2151677952,1769472:4198464,1835008:2147487744,1900544:4194304,1966080:64,2031616:4096,1081344:2151677952,1146880:2151682112,1212416:0,1277952:4198400,1343488:4194368,1409024:2147483648,1474560:2147487808,1540096:64,1605632:2147483712,1671168:4096,1736704:2147487744,1802240:2151678016,1867776:4160,1933312:2151682048,1998848:4194304,2064384:4198464},{0:128,4096:17039360,8192:262144,
12288:536870912,16384:537133184,20480:16777344,24576:553648256,28672:262272,32768:16777216,36864:537133056,40960:536871040,45056:553910400,49152:553910272,53248:0,57344:17039488,61440:553648128,2048:17039488,6144:553648256,10240:128,14336:17039360,18432:262144,22528:537133184,26624:553910272,30720:536870912,34816:537133056,38912:0,43008:553910400,47104:16777344,51200:536871040,55296:553648128,59392:16777216,63488:262272,65536:262144,69632:128,73728:536870912,77824:553648256,81920:16777344,86016:553910272,
90112:537133184,94208:16777216,98304:553910400,102400:553648128,106496:17039360,110592:537133056,114688:262272,118784:536871040,122880:0,126976:17039488,67584:553648256,71680:16777216,75776:17039360,79872:537133184,83968:536870912,88064:17039488,92160:128,96256:553910272,100352:262272,104448:553910400,108544:0,112640:553648128,116736:16777344,120832:262144,124928:537133056,129024:536871040},{0:268435464,256:8192,512:270532608,768:270540808,1024:268443648,1280:2097152,1536:2097160,1792:268435456,2048:0,
2304:268443656,2560:2105344,2816:8,3072:270532616,3328:2105352,3584:8200,3840:270540800,128:270532608,384:270540808,640:8,896:2097152,1152:2105352,1408:268435464,1664:268443648,1920:8200,2176:2097160,2432:8192,2688:268443656,2944:270532616,3200:0,3456:270540800,3712:2105344,3968:268435456,4096:268443648,4352:270532616,4608:270540808,4864:8200,5120:2097152,5376:268435456,5632:268435464,5888:2105344,6144:2105352,6400:0,6656:8,6912:270532608,7168:8192,7424:268443656,7680:270540800,7936:2097160,4224:8,
4480:2105344,4736:2097152,4992:268435464,5248:268443648,5504:8200,5760:270540808,6016:270532608,6272:270540800,6528:270532616,6784:8192,7040:2105352,7296:2097160,7552:0,7808:268435456,8064:268443656},{0:1048576,16:33555457,32:1024,48:1049601,64:34604033,80:0,96:1,112:34603009,128:33555456,144:1048577,160:33554433,176:34604032,192:34603008,208:1025,224:1049600,240:33554432,8:34603009,24:0,40:33555457,56:34604032,72:1048576,88:33554433,104:33554432,120:1025,136:1049601,152:33555456,168:34603008,184:1048577,
200:1024,216:34604033,232:1,248:1049600,256:33554432,272:1048576,288:33555457,304:34603009,320:1048577,336:33555456,352:34604032,368:1049601,384:1025,400:34604033,416:1049600,432:1,448:0,464:34603008,480:33554433,496:1024,264:1049600,280:33555457,296:34603009,312:1,328:33554432,344:1048576,360:1025,376:34604032,392:33554433,408:34603008,424:0,440:34604033,456:1049601,472:1024,488:33555456,504:1048577},{0:134219808,1:131072,2:134217728,3:32,4:131104,5:134350880,6:134350848,7:2048,8:134348800,9:134219776,
10:133120,11:134348832,12:2080,13:0,14:134217760,15:133152,2147483648:2048,2147483649:134350880,2147483650:134219808,2147483651:134217728,2147483652:134348800,2147483653:133120,2147483654:133152,2147483655:32,2147483656:134217760,2147483657:2080,2147483658:131104,2147483659:134350848,2147483660:0,2147483661:134348832,2147483662:134219776,2147483663:131072,16:133152,17:134350848,18:32,19:2048,20:134219776,21:134217760,22:134348832,23:131072,24:0,25:131104,26:134348800,27:134219808,28:134350880,29:133120,
30:2080,31:134217728,2147483664:131072,2147483665:2048,2147483666:134348832,2147483667:133152,2147483668:32,2147483669:134348800,2147483670:134217728,2147483671:134219808,2147483672:134350880,2147483673:134217760,2147483674:134219776,2147483675:0,2147483676:133120,2147483677:2080,2147483678:131104,2147483679:134350848}],p=[4160749569,528482304,33030144,2064384,129024,8064,504,2147483679],P=h.DES=e.extend({_doReset:function(){for(var a=this._key.words,b=[],c=0;56>c;c++){var d=k[c]-1;b[c]=a[d>>>5]>>>
31-d%32&1}a=this._subKeys=[];for(d=0;16>d;d++){for(var f=a[d]=[],e=n[d],c=0;24>c;c++)f[c/6|0]|=b[(g[c]-1+e)%28]<<31-c%6,f[4+(c/6|0)]|=b[28+(g[c+24]-1+e)%28]<<31-c%6;f[0]=f[0]<<1|f[0]>>>31;for(c=1;7>c;c++)f[c]>>>=4*(c-1)+3;f[7]=f[7]<<5|f[7]>>>27}b=this._invSubKeys=[];for(c=0;16>c;c++)b[c]=a[15-c]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._subKeys)},decryptBlock:function(a,b){this._doCryptBlock(a,b,this._invSubKeys)},_doCryptBlock:function(b,d,e){this._lBlock=b[d];this._rBlock=b[d+1];
a.call(this,4,252645135);a.call(this,16,65535);c.call(this,2,858993459);c.call(this,8,16711935);a.call(this,1,1431655765);for(var g=0;16>g;g++){for(var f=e[g],h=this._lBlock,m=this._rBlock,n=0,k=0;8>k;k++)n|=l[k][((m^f[k])&p[k])>>>0];this._lBlock=m;this._rBlock=h^n}e=this._lBlock;this._lBlock=this._rBlock;this._rBlock=e;a.call(this,1,1431655765);c.call(this,8,16711935);c.call(this,2,858993459);a.call(this,16,65535);a.call(this,4,252645135);b[d]=this._lBlock;b[d+1]=this._rBlock},keySize:2,ivSize:2,
blockSize:2});b.DES=e._createHelper(P);h=h.TripleDES=e.extend({_doReset:function(){var a=this._key.words;this._des1=P.createEncryptor(d.create(a.slice(0,2)));this._des2=P.createEncryptor(d.create(a.slice(2,4)));this._des3=P.createEncryptor(d.create(a.slice(4,6)))},encryptBlock:function(a,b){this._des1.encryptBlock(a,b);this._des2.decryptBlock(a,b);this._des3.encryptBlock(a,b)},decryptBlock:function(a,b){this._des3.decryptBlock(a,b);this._des2.encryptBlock(a,b);this._des1.decryptBlock(a,b)},keySize:6,
ivSize:2,blockSize:2});b.TripleDES=e._createHelper(h)})();return b.TripleDES})},{"./cipher-core":21,"./core":22,"./enc-base64":23,"./evpkdf":25,"./md5":30}],53:[function(h,p,k){(function(b,a){"object"===typeof k?p.exports=k=a(h("./core")):a(b.CryptoJS)})(this,function(b){(function(a){var c=b.lib,e=c.Base,d=c.WordArray,c=b.x64={};c.Word=e.extend({init:function(a,b){this.high=a;this.low=b}});c.WordArray=e.extend({init:function(b,c){b=this.words=b||[];this.sigBytes=c!=a?c:8*b.length},toX32:function(){for(var a=
this.words,b=a.length,c=[],e=0;e<b;e++){var h=a[e];c.push(h.high);c.push(h.low)}return d.create(c,this.sigBytes)},clone:function(){for(var a=e.clone.call(this),b=a.words=this.words.slice(0),c=b.length,d=0;d<c;d++)b[d]=b[d].clone();return a}})})();return b})},{"./core":22}],54:[function(h,p,k){(function(b){b(function(a){function b(a){var c=1<arguments.length?g.call(arguments,1):[];return function(){return e(a,this,c.concat(g.call(arguments)))}}function e(a,b,c){return 0===c.length?h.call(b,a):h.apply(b,
[a].concat(c))}var d=a("./when"),h=d["try"],k=a("./lib/liftAll"),g=Array.prototype.slice;return{lift:b,liftAll:function(a,d,e){return k(b,d,e,a)},call:h,apply:function(a,b){return e(a,this,b||[])},compose:function(a){var b=g.call(arguments,1);return function(){var c=this,e=g.call(arguments),e=h.apply(c,[a].concat(e));return d.reduce(b,function(a,b){return b.call(c,a)},e)}}}})})(function(b){p.exports=b(h)})},{"./lib/liftAll":68,"./when":77}],55:[function(h,p,k){(function(b){b(function(a){var b=a("./makePromise"),
e=a("./scheduler");a=a("./async");return b({scheduler:new e(a)})})})(function(b){p.exports=b(h)})},{"./async":58,"./makePromise":69,"./scheduler":70}],56:[function(h,p,k){(function(b){b(function(){function a(a){this.head=this.tail=this.length=0;this.buffer=Array(1<<a)}a.prototype.push=function(a){this.length===this.buffer.length&&this._ensureCapacity(2*this.length);this.buffer[this.tail]=a;this.tail=this.tail+1&this.buffer.length-1;++this.length;return this.length};a.prototype.shift=function(){var a=
this.buffer[this.head];this.buffer[this.head]=void 0;this.head=this.head+1&this.buffer.length-1;--this.length;return a};a.prototype._ensureCapacity=function(a){var b=this.head,d=this.buffer,h=Array(a),k=0,g;if(0===b)for(g=this.length;k<g;++k)h[k]=d[k];else{a=d.length;for(g=this.tail;b<a;++k,++b)h[k]=d[b];for(b=0;b<g;++k,++b)h[k]=d[b]}this.buffer=h;this.head=0;this.tail=this.length};return a})})(function(b){p.exports=b()})},{}],57:[function(h,p,k){(function(b){b(function(){function a(b){Error.call(this);
this.message=b;this.name=a.name;"function"===typeof Error.captureStackTrace&&Error.captureStackTrace(this,a)}a.prototype=Object.create(Error.prototype);return a.prototype.constructor=a})})(function(b){p.exports=b()})},{}],58:[function(h,p,k){(function(b){(function(a){a(function(a){var e;return"undefined"!==typeof b&&null!==b&&"function"===typeof b.nextTick?function(a){b.nextTick(a)}:(e="function"===typeof MutationObserver&&MutationObserver||"function"===typeof WebKitMutationObserver&&WebKitMutationObserver)?
function(a,b){var c,e=a.createElement("div");(new b(function(){var a=c;c=void 0;a()})).observe(e,{attributes:!0});return function(a){c=a;e.setAttribute("class","x")}}(document,e):function(a){try{return a("vertx").runOnLoop||a("vertx").runOnContext}catch(b){}var c=setTimeout;return function(a){c(a,0)}}(a)})})(function(a){p.exports=a(h)})}).call(this,h("c:\\Users\\oberstet\\AppData\\Roaming\\npm\\node_modules\\browserify\\node_modules\\insert-module-globals\\node_modules\\process\\browser.js"))},{"c:\\Users\\oberstet\\AppData\\Roaming\\npm\\node_modules\\browserify\\node_modules\\insert-module-globals\\node_modules\\process\\browser.js":1}],
59:[function(h,p,k){(function(b){b(function(){return function(a){var b=Array.prototype.map,e=Array.prototype.reduce,d=Array.prototype.reduceRight,h=Array.prototype.forEach,k=a.resolve,g=a.all;a.any=function(b){return new a(function(a,c){function d(a){g.push(a);0===--e&&c(g)}var e=0,g=[];h.call(b,function(b){++e;k(b).then(a,d)});0===e&&a()})};a.some=function(b,c){return new a(function(a,d,e){function g(b){0<H&&(--H,x.push(b),0===H&&a(x))}function p(a){0<f&&(--f,J.push(a),0===f&&d(J))}var H=0,f,x=[],
J=[];h.call(b,function(a){++H;k(a).then(g,p,e)});c=Math.max(c,0);f=H-c+1;H=Math.min(c,H);0===H&&a(x)})};a.settle=function(a){return g(b.call(a,function(a){function b(){return a.inspect()}a=k(a);return a.then(b,b)}))};a.map=function(a,d,e){return g(b.call(a,function(a){return k(a).then(d,e)}))};a.reduce=function(a,b){function c(a,d,e){return k(a).then(function(a){return k(d).then(function(c){return b(a,c,e)})})}return 2<arguments.length?e.call(a,c,arguments[2]):e.call(a,c)};a.reduceRight=function(a,
b){function c(a,d,e){return k(a).then(function(a){return k(d).then(function(c){return b(a,c,e)})})}return 2<arguments.length?d.call(a,c,arguments[2]):d.call(a,c)};a.prototype.spread=function(a){return this.then(g).then(function(b){return a.apply(void 0,b)})};return a}})})(function(b){p.exports=b()})},{}],60:[function(h,p,k){(function(b){b(function(){function a(){throw new TypeError("catch predicate must be a function");}function b(a,c){return function(){a.call(this);return c}}function e(){}return function(d){function h(a,
b){return function(c){return(b===Error||null!=b&&b.prototype instanceof Error?c instanceof b:b(c))?a.call(this,c):k(c)}}var k=d.reject,g=d.prototype["catch"];d.prototype.done=function(a,b){var c=this._handler;c.when({resolve:this._maybeFatal,notify:e,context:this,receiver:c.receiver,fulfilled:a,rejected:b,progress:void 0})};d.prototype["catch"]=d.prototype.otherwise=function(b){return 1===arguments.length?g.call(this,b):"function"!==typeof b?this.ensure(a):g.call(this,h(arguments[1],b))};d.prototype["finally"]=
d.prototype.ensure=function(a){if("function"!==typeof a)return this;a=b(a,this);return this.then(a,a)};d.prototype["else"]=d.prototype.orElse=function(a){return this.then(void 0,function(){return a})};d.prototype.yield=function(a){return this.then(function(){return a})};d.prototype.tap=function(a){return this.then(a).yield(this)};return d}})})(function(b){p.exports=b()})},{}],61:[function(h,p,k){(function(b){b(function(){return function(a){a.prototype.fold=function(a,b){var d=this._beget();this._handler.fold(d._handler,
a,b);return d};return a}})})(function(b){p.exports=b()})},{}],62:[function(h,p,k){(function(b){b(function(){return function(a){a.prototype.inspect=function(){return this._handler.inspect()};return a}})})(function(b){p.exports=b()})},{}],63:[function(h,p,k){(function(b){b(function(){return function(a){function b(a,h,k,g){function n(g,n){return e(k(g)).then(function(){return b(a,h,k,n)})}return e(g).then(function(b){return e(h(b)).then(function(c){return c?b:e(a(b)).spread(n)})})}var e=a.resolve;a.iterate=
function(a,e,h,g){return b(function(b){return[b,a(b)]},e,h,g)};a.unfold=b;return a}})})(function(b){p.exports=b()})},{}],64:[function(h,p,k){(function(b){b(function(){return function(a){a.prototype.progress=function(a){return this.then(void 0,void 0,a)};return a}})})(function(b){p.exports=b()})},{}],65:[function(h,p,k){(function(b){b(function(a){var b=a("../timer"),e=a("../TimeoutError");return function(a){a.prototype.delay=function(a){var d=this._beget(),e=d._handler;this._handler.map(function(d){b.set(function(){e.resolve(d)},
a)},e);return d};a.prototype.timeout=function(a,d){var g=1<arguments.length,h=this._beget(),l=h._handler,k=b.set(function(){l.reject(g?d:new e("timed out after "+a+"ms"))},a);this._handler.chain(l,function(a){b.clear(k);this.resolve(a)},function(a){b.clear(k);this.reject(a)},l.notify);return h};return a}})})(function(b){p.exports=b(h)})},{"../TimeoutError":57,"../timer":71}],66:[function(h,p,k){(function(b){b(function(a){function b(a){var c=String(a);if("[object Object]"===c&&"undefined"!==typeof JSON){var d=
c;try{c=JSON.stringify(a)}catch(e){c=d}}return c}function e(a){throw a;}function d(){}var h=a("../timer");return function(a){function g(a){if(!a.handled){y.push(a);var d=P,e="Potentially unhandled rejection ["+a.id+"] ";a=a.value;var g="object"===typeof a&&a.stack?a.stack:b(a);d(e+(a instanceof Error?g:g+" (WARNING: non-Error used)"))}}function k(a){var d=y.indexOf(a);0<=d&&(y.splice(d,1),w("Handled previous rejection ["+a.id+"] "+b(a.value)))}function l(a,b){v.push(a,b);H||(H=!0,H=h.set(p,0))}function p(){for(H=
!1;0<v.length;)v.shift()(v.shift())}var P=d,w=d;"undefined"!==typeof console&&(P="undefined"!==typeof console.error?function(a){console.error(a)}:function(a){console.log(a)},w="undefined"!==typeof console.info?function(a){console.info(a)}:function(a){console.log(a)});a.onPotentiallyUnhandledRejection=function(a){l(g,a)};a.onPotentiallyUnhandledRejectionHandled=function(a){l(k,a)};a.onFatalRejection=function(a){l(e,a.value)};var v=[],y=[],H=!1;return a}})})(function(b){p.exports=b(h)})},{"../timer":71}],
67:[function(h,p,k){(function(b){b(function(){return function(a){a.prototype["with"]=a.prototype.withThis=a.prototype._bindContext;return a}})})(function(b){p.exports=b()})},{}],68:[function(h,p,k){(function(b){b(function(){function a(a,b,c){a[c]=b;return a}function b(a){return"function"===typeof a?a.bind():Object.create(a)}return function(e,d,h,k){"undefined"===typeof d&&(d=a);return Object.keys(k).reduce(function(a,b){var c=k[b];return"function"===typeof c?d(a,e(c),b):a},"undefined"===typeof h?
b(k):h)}})})(function(b){p.exports=b()})},{}],69:[function(h,p,k){(function(b){b(function(){return function(a){function b(a,c){this._handler=a===g?c:e(a)}function e(a){function b(a){e.resolve(a)}function c(a){e.reject(a)}function d(a){e.notify(a)}var e=new n;try{a(b,c,d)}catch(f){c(f)}return e}function d(a){return new b(g,new p(new y(a)))}function h(a){return a instanceof b?a._handler.join():E(a)?k(a):new v(a)}function k(a){try{var b=a.then;return"function"===typeof b?new w(b,a):new v(a)}catch(c){return new y(c)}}
function g(){}function n(a,d){b.createContext(this,d);this.consumers=void 0;this.receiver=a;this.handler=void 0;this.resolved=!1}function l(a){this.handler=a}function p(a){this.handler=a}function P(a,b){this.handler=a;this.receiver=b}function w(a,b){n.call(this);G.enqueue(new C(a,b,this))}function v(a){b.createContext(this);this.value=a}function y(a){b.createContext(this);this.id=++t;this.value=a;this.reported=this.handled=!1;this._report()}function H(a,d){a.handled||(a.reported=!0,b.onPotentiallyUnhandledRejection(a,
d))}function f(a){if(a.reported)b.onPotentiallyUnhandledRejectionHandled(a)}function x(){y.call(this,new TypeError("Promise cycle"))}function J(){return{state:"pending"}}function A(a,b){this.continuation=a;this.handler=b}function L(a,b){this.handler=a;this.value=b}function C(a,b,c){this._then=a;this.thenable=b;this.resolver=c}function B(a,b,c,d,e){try{a.call(b,c,d,e)}catch(f){d(f)}}function E(a){return("object"===typeof a||"function"===typeof a)&&null!==a}function I(a,b,c){try{return a.call(c,b)}catch(e){return d(e)}}
function Q(a,b,c,e){try{return a.call(e,b,c)}catch(f){return d(f)}}function N(a,b){b.prototype=s(a.prototype);b.prototype.constructor=b}function F(){}var G=a.scheduler,s=Object.create||function(a){function b(){}b.prototype=a;return new b};b.resolve=function(a){return a instanceof b?a:new b(g,new p(h(a)))};b.reject=d;b.never=function(){return r};b._defer=function(){return new b(g,new n)};b.prototype.then=function(a,d){var e=this._handler;if("function"!==typeof a&&0<e.join().state())return new b(g,
e);var f=this._beget(),h=f._handler;e.when({resolve:h.resolve,notify:h.notify,context:h,receiver:e.receiver,fulfilled:a,rejected:d,progress:2<arguments.length?arguments[2]:void 0});return f};b.prototype["catch"]=function(a){return this.then(void 0,a)};b.prototype._bindContext=function(a){return new b(g,new P(this._handler,a))};b.prototype._beget=function(){var a=this._handler,a=new n(a.receiver,a.join().context);return new this.constructor(g,a)};b.prototype._maybeFatal=function(a){if(E(a)){a=h(a);
var b=this._handler.context;a.catchError(function(){this._fatal(b)},a)}};b.all=function(a){function d(a,b,c,e){c.map(function(a){b[e]=a;0===--f&&this.become(new v(b))},a)}var e=new n,f=a.length>>>0,h=Array(f),l,m,p;for(l=0;l<a.length;++l)if(m=a[l],void 0!==m||l in a)if(E(m))if(m=m instanceof b?m._handler.join():k(m),p=m.state(),0===p)d(e,h,m,l);else if(0<p)h[l]=m.value,--f;else{e.become(m);break}else h[l]=m,--f;else--f;0===f&&e.become(new v(h));return new b(g,e)};b.race=function(a){if(Object(a)===
a&&0===a.length)return r;var d=new n,e,f;for(e=0;e<a.length;++e)f=a[e],void 0!==f&&e in a&&h(f).chain(d,d.resolve,d.reject);return new b(g,d)};g.prototype.when=g.prototype.resolve=g.prototype.reject=g.prototype.notify=g.prototype._fatal=g.prototype._unreport=g.prototype._report=F;g.prototype.inspect=J;g.prototype._state=0;g.prototype.state=function(){return this._state};g.prototype.join=function(){for(var a=this;void 0!==a.handler;)a=a.handler;return a};g.prototype.chain=function(a,b,c,d){this.when({resolve:F,
notify:F,context:void 0,receiver:a,fulfilled:b,rejected:c,progress:d})};g.prototype.map=function(a,b){this.chain(b,a,b.reject,b.notify)};g.prototype.catchError=function(a,b){this.chain(b,b.resolve,a,b.notify)};g.prototype.fold=function(a,b,c){this.join().map(function(a){h(c).map(function(c){this.resolve(Q(b,c,a,this.receiver))},this)},a)};N(g,n);n.prototype._state=0;n.prototype.inspect=function(){return this.resolved?this.join().inspect():J()};n.prototype.resolve=function(a){this.resolved||this.become(h(a))};
n.prototype.reject=function(a){this.resolved||this.become(new y(a))};n.prototype.join=function(){if(this.resolved){for(var a=this;void 0!==a.handler;)if(a=a.handler,a===this)return this.handler=new x;return a}return this};n.prototype.run=function(){var a=this.consumers,b=this.join();this.consumers=void 0;for(var c=0;c<a.length;++c)b.when(a[c])};n.prototype.become=function(a){this.resolved=!0;this.handler=a;void 0!==this.consumers&&G.enqueue(this);void 0!==this.context&&a._report(this.context)};n.prototype.when=
function(a){this.resolved?G.enqueue(new A(a,this.handler)):void 0===this.consumers?this.consumers=[a]:this.consumers.push(a)};n.prototype.notify=function(a){this.resolved||G.enqueue(new L(this,a))};n.prototype._report=function(a){this.resolved&&this.handler.join()._report(a)};n.prototype._unreport=function(){this.resolved&&this.handler.join()._unreport()};n.prototype._fatal=function(a){a="undefined"===typeof a?this.context:a;this.resolved&&this.handler.join()._fatal(a)};N(g,l);l.prototype.inspect=
function(){return this.join().inspect()};l.prototype._report=function(a){this.join()._report(a)};l.prototype._unreport=function(){this.join()._unreport()};N(l,p);p.prototype.when=function(a){G.enqueue(new A(a,this.join()))};N(l,P);P.prototype.when=function(a){void 0!==this.receiver&&(a.receiver=this.receiver);this.join().when(a)};N(n,w);N(g,v);v.prototype._state=1;v.prototype.inspect=function(){return{state:"fulfilled",value:this.value}};v.prototype.when=function(a){var d;"function"===typeof a.fulfilled?
(b.enterContext(this),d=I(a.fulfilled,this.value,a.receiver),b.exitContext()):d=this.value;a.resolve.call(a.context,d)};var t=0;N(g,y);y.prototype._state=-1;y.prototype.inspect=function(){return{state:"rejected",reason:this.value}};y.prototype.when=function(a){var d;"function"===typeof a.rejected?(this._unreport(),b.enterContext(this),d=I(a.rejected,this.value,a.receiver),b.exitContext()):d=new b(g,this);a.resolve.call(a.context,d)};y.prototype._report=function(a){G.afterQueue(H,this,a)};y.prototype._unreport=
function(){this.handled=!0;G.afterQueue(f,this)};y.prototype._fatal=function(a){b.onFatalRejection(this,a)};b.createContext=b.enterContext=b.exitContext=b.onPotentiallyUnhandledRejection=b.onPotentiallyUnhandledRejectionHandled=b.onFatalRejection=F;a=new g;var r=new b(g,a);N(y,x);A.prototype.run=function(){this.handler.join().when(this.continuation)};L.prototype.run=function(){var a=this.handler.consumers;if(void 0!==a)for(var b=0;b<a.length;++b)this._notify(a[b])};L.prototype._notify=function(a){var b;
if("function"===typeof a.progress)try{b=a.progress.call(a.receiver,this.value)}catch(c){b=c}else b=this.value;a.notify.call(a.context,b)};C.prototype.run=function(){var a=this.resolver;B(this._then,this.thenable,function(b){a.resolve(b)},function(b){a.reject(b)},function(b){a.notify(b)})};return b}})})(function(b){p.exports=b()})},{}],70:[function(h,p,k){(function(b){b(function(a){function b(a){this._enqueue=a;this._handlerQueue=new e(15);this._afterQueue=new e(5);this._running=!1;var c=this;this.drain=
function(){c._drain()}}var e=a("./Queue");b.prototype.enqueue=function(a){this._handlerQueue.push(a);this._running||(this._running=!0,this._enqueue(this.drain))};b.prototype.afterQueue=function(a,b,c){this._afterQueue.push(a);this._afterQueue.push(b);this._afterQueue.push(c);this._running||(this._running=!0,this._enqueue(this.drain))};b.prototype._drain=function(){for(var a=this._handlerQueue;0<a.length;)a.shift().run();this._running=!1;for(a=this._afterQueue;0<a.length;)a.shift()(a.shift(),a.shift())};
return b})})(function(b){p.exports=b(h)})},{"./Queue":56}],71:[function(h,p,k){(function(b){b(function(a){var b,e,d;try{b=a("vertx"),e=function(a,d){return b.setTimer(d,a)},d=b.cancelTimer}catch(h){e=function(a,b){return setTimeout(a,b)},d=function(a){return clearTimeout(a)}}return{set:e,clear:d}})})(function(b){p.exports=b(h)})},{}],72:[function(h,p,k){(function(b){b(function(a){var b=a("./monitor/PromiseMonitor");a=a("./monitor/ConsoleReporter");var e=new b(new a);return function(a){return e.monitor(a)}})})(function(b){p.exports=
b(h)})},{"./monitor/ConsoleReporter":73,"./monitor/PromiseMonitor":74}],73:[function(h,p,k){(function(b){b(function(a){function b(){this._previouslyReported=!1}function e(){}var d=a("./error");b.prototype=function(){var a,b,c,d;"undefined"===typeof console?a=b=e:"function"===typeof console.error&&"function"===typeof console.dir?(b=function(a){console.error(a)},a=function(a){console.log(a)},"function"===typeof console.groupCollapsed&&(c=function(a){console.groupCollapsed(a)},d=function(){console.groupEnd()})):
"function"===typeof console.log&&"undefined"!==typeof JSON&&(a=b=function(a){if("string"!==typeof a)try{a=JSON.stringify(a)}catch(b){}console.log(a)});return{msg:a,warn:b,groupStart:c||b,groupEnd:d||e}}();b.prototype.log=function(a){if(0===a.length)this._previouslyReported&&(this._previouslyReported=!1,this.msg("[promises] All previously unhandled rejections have now been handled"));else{this._previouslyReported=!0;this.groupStart("[promises] Unhandled rejections: "+a.length);try{this._log(a)}finally{this.groupEnd()}}};
b.prototype._log=function(a){for(var b=0;b<a.length;++b)this.warn(d.format(a[b]))};return b})})(function(b){p.exports=b(h)})},{"./error":76}],74:[function(h,p,k){(function(b){b(function(a){function b(a){this.logDelay=0;this.stackFilter=k;this.stackJumpSeparator=h;this.filterDuplicateFrames=!0;this._reporter=a;"function"===typeof a.configurePromiseMonitor&&a.configurePromiseMonitor(this);this._traces=[];this._traceTask=0;var c=this;this._doLogTraces=function(){c._logTraces()}}function e(a,b){return b.filter(function(b){return!a.test(b)})}
function d(a){return!a.handler.handled}var h="from execution context:",k=/[\s\(\/\\](node|module|timers)\.js:|when([\/\\]{1,2}(lib|monitor|es6-shim)[\/\\]{1,2}|\.js)|(new\sPromise)\b|(\b(PromiseMonitor|ConsoleReporter|Scheduler|RunHandlerTask|ProgressTask|Promise|.*Handler)\.[\w_]\w\w+\b)|\b(tryCatch\w+|getHandler\w*)\b/i,g=a("../lib/timer").set,n=a("./error"),l=[];b.prototype.monitor=function(a){var b=this;a.createContext=function(a,c){a.context=b.createContext(a,c)};a.enterContext=function(a){l.push(a.context)};
a.exitContext=function(){l.pop()};a.onPotentiallyUnhandledRejection=function(a,c){return b.addTrace(a,c)};a.onPotentiallyUnhandledRejectionHandled=function(a){return b.removeTrace(a)};a.onFatalRejection=function(a,c){return b.fatal(a,c)};return this};b.prototype.createContext=function(a,b){var c={parent:b||l[l.length-1],stack:void 0};n.captureStack(c,a.constructor);return c};b.prototype.addTrace=function(a,b){var c,d;for(d=this._traces.length-1;0<=d&&(c=this._traces[d],c.handler!==a);--d);0<=d?c.extraContext=
b:this._traces.push({handler:a,extraContext:b});this.logTraces()};b.prototype.removeTrace=function(){this.logTraces()};b.prototype.fatal=function(a,b){var c=Error();c.stack=this._createLongTrace(a.value,a.context,b).join("\n");g(function(){throw c;},0)};b.prototype.logTraces=function(){this._traceTask||(this._traceTask=g(this._doLogTraces,this.logDelay))};b.prototype._logTraces=function(){this._traceTask=void 0;this._traces=this._traces.filter(d);this._reporter.log(this.formatTraces(this._traces))};
b.prototype.formatTraces=function(a){return a.map(function(a){return this._createLongTrace(a.handler.value,a.handler.context,a.extraContext)},this)};b.prototype._createLongTrace=function(a,b,c){a=n.parse(a)||[String(a)+" (WARNING: non-Error used)"];a=e(this.stackFilter,a,0);this._appendContext(a,b);this._appendContext(a,c);return this.filterDuplicateFrames?this._removeDuplicates(a):a};b.prototype._removeDuplicates=function(a){var b={},c=this.stackJumpSeparator,d=0;return a.reduceRight(function(a,
e,f){0===f?a.unshift(e):e===c?0<d&&(a.unshift(e),d=0):b[e]||(b[e]=!0,a.unshift(e),++d);return a},[])};b.prototype._appendContext=function(a,b){a.push.apply(a,this._createTrace(b))};b.prototype._createTrace=function(a){for(var b=[],c;a;){if(c=n.parse(a)){c=e(this.stackFilter,c);var d=b;1<c.length&&(c[0]=this.stackJumpSeparator,d.push.apply(d,c))}a=a.parent}return b};return b})})(function(b){p.exports=b(h)})},{"../lib/timer":71,"./error":76}],75:[function(h,p,k){(function(b){b(function(a){var b=a("../monitor");
a=a("../when").Promise;return b(a)})})(function(b){p.exports=b(h)})},{"../monitor":72,"../when":77}],76:[function(h,p,k){(function(b){b(function(){function a(a){try{throw Error();}catch(b){a.stack=b.stack}}function b(a){a.stack=Error().stack}function e(a){return h(a)}function d(a){var b=Error();b.stack=h(a);return b}function h(a){for(var b=!1,c="",d=0;d<a.length;++d)b?c+="\n"+a[d]:(c+=a[d],b=!0);return c}var k,g,n;Error.captureStackTrace?(k=function(a){return a&&a.stack&&a.stack.split("\n")},n=e,
g=Error.captureStackTrace):(k=function(a){var b=a&&a.stack&&a.stack.split("\n");b&&a.message&&b.unshift(a.message);return b},"string"!==typeof Error().stack?(n=e,g=a):(n=d,g=b));return{parse:k,format:n,captureStack:g}})})(function(b){p.exports=b()})},{}],77:[function(h,p,k){(function(b){b(function(a){function b(a,c,d){var e=x.resolve(a);return 2>arguments.length?e:3<arguments.length?e.then(c,d,arguments[3]):e.then(c,d)}function e(a){return function(){return h(a,this,J.call(arguments))}}function d(a){return h(a,
this,J.call(arguments,1))}function h(a,b,c){return x.all(c).then(function(c){return a.apply(b,c)})}function k(){function a(b){d._handler.resolve(b)}function b(a){d._handler.reject(a)}function c(a){d._handler.notify(a)}var d=x._defer();this.promise=d;this.resolve=a;this.reject=b;this.notify=c;this.resolver={resolve:a,reject:b,notify:c}}var g=a("./lib/decorators/timed"),n=a("./lib/decorators/array"),l=a("./lib/decorators/flow"),p=a("./lib/decorators/fold"),P=a("./lib/decorators/inspect"),w=a("./lib/decorators/iterate"),
v=a("./lib/decorators/progress"),y=a("./lib/decorators/with"),H=a("./lib/decorators/unhandledRejection"),f=a("./lib/TimeoutError"),x=[n,l,p,w,v,P,y,g,H].reduce(function(a,b){return b(a)},a("./lib/Promise")),J=Array.prototype.slice;b.promise=function(a){return new x(a)};b.resolve=x.resolve;b.reject=x.reject;b.lift=e;b["try"]=d;b.attempt=d;b.iterate=x.iterate;b.unfold=x.unfold;b.join=function(){return x.all(arguments)};b.all=function(a){return b(a,x.all)};b.settle=function(a){return b(a,x.settle)};
b.any=e(x.any);b.some=e(x.some);b.map=function(a,d){return b(a,function(a){return x.map(a,d)})};b.reduce=function(a,d){var e=J.call(arguments,1);return b(a,function(a){e.unshift(a);return x.reduce.apply(x,e)})};b.reduceRight=function(a,d){var e=J.call(arguments,1);return b(a,function(a){e.unshift(a);return x.reduceRight.apply(x,e)})};b.isPromiseLike=function(a){return a&&"function"===typeof a.then};b.Promise=x;b.defer=function(){return new k};b.TimeoutError=f;return b})})(function(b){p.exports=b(h)})},
{"./lib/Promise":55,"./lib/TimeoutError":57,"./lib/decorators/array":59,"./lib/decorators/flow":60,"./lib/decorators/fold":61,"./lib/decorators/inspect":62,"./lib/decorators/iterate":63,"./lib/decorators/progress":64,"./lib/decorators/timed":65,"./lib/decorators/unhandledRejection":66,"./lib/decorators/with":67}],78:[function(h,p,k){function b(b,e,d){return e?new a(b,e):new a(b)}h=function(){return this}();var a=h.WebSocket||h.MozWebSocket;p.exports=a?b:null;a&&(b.prototype=a.prototype)},{}],79:[function(h,
p,k){p.exports={name:"autobahn",version:"0.9.6",description:"An implementation of The Web Application Messaging Protocol (WAMP).",main:"index.js",scripts:{test:"nodeunit test/test.js"},dependencies:{when:">= 2.8.0",ws:">= 0.4.31","crypto-js":">= 3.1.2-2"},devDependencies:{browserify:">= 3.28.1",nodeunit:">= 0.8.6"},repository:{type:"git",url:"git://github.com/tavendo/AutobahnJS.git"},keywords:["WAMP","WebSocket","RPC","PubSub"],author:"Tavendo GmbH",license:"MIT"}},{}]},{},[4])(4)});




function setCookie(cname, cvalue, exdays) {
  console.log('set cookie');
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  // console.log(decodedCookie);
  var ca = decodedCookie.split(';');
  // console.log(ca);
  for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}



var connection = new autobahn.Connection({url: '{{wampServer}}', realm: 'default'});

var webRtcAddress = '{{webrtcAddress}}';
var wamp_prefix = '{{wamp_prefix}}'
  var msgCount=0;

var custID = {{pk}};
var custName='{{name}}'
console.log('customer id....', custID);
// var borderColor = '#ACA626';
// var custName = 'CIOC'
var windowColor = '{{windowColor}}'
var custName = '{{custName}}'
var chatSupport = '{{chat}}'
var callBackSupport = '{{callBack}}'
var videoSupport = '{{video}}'
var audioSupport = '{{audio}}'
var ticketSupport = '{{ticket}}'
var nameSupport = '{{name}}'
var dpSupport = '{{dp}}'
var supportBubbleColor = '{{supportBubbleColor}}'
var firstMessage = `{{firstMessage}}`;
var iconColor = '{{iconColor}}'
var fontAndIconColor='{{fontColor}}'


if (nameSupport=='None') {
  nameSupport = 'Agent'
}
// var color1 = tinycolor(windowColor);

var windowColorR = parseInt(windowColor.slice(1,3),16)
var windowColorG = parseInt(windowColor.slice(3,5),16)
var windowColorB = parseInt(windowColor.slice(5,7),16)
var windowColorNew = "rgba("+windowColorR+","+ windowColorG+","+ windowColorB+","+0.6 +")";

var metaTag=document.createElement('meta');
  metaTag.name="viewport";
  metaTag.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
  document.getElementsByTagName('head')[0].appendChild(metaTag);

var linkStyle = document.createElement('link');
    linkStyle.rel = 'stylesheet';
    linkStyle.href = 'https://fonts.googleapis.com/css?family=Muli';
    document.head.appendChild(linkStyle);


// Define our viewport meta values
var viewports = {
		default: metaTag.getAttribute('content'),
		landscape: 'width=990'
	};

// Change the viewport value based on screen.width
var viewport_set = function() {
		if ( screen.width > 768 )
			metaTag.setAttribute( 'content', viewports.landscape );
		else
			metaTag.setAttribute( 'content', viewports.default );
	}

// Set the correct viewport value on page load
viewport_set();

// Set the correct viewport after device orientation change or resize
window.onresize = function() {
	viewport_set();
}


if (dpSupport=='') {
  dpSupport = '{{serverAddress}}/static/images/img_avatar_card.png'
}else {
  dpSupport = '{{serverAddress}}'+'{{dp}}'
}

if (chatSupport=='True') {
  chatSupport = true
}else {
  chatSupport = false
}

if (callBackSupport=='True') {
  callBackSupport = true
}else {
  callBackSupport = false
}

if (videoSupport=='True') {
  videoSupport = true
}else {
  videoSupport = false
}

if (ticketSupport=='True') {
  ticketSupport = true
}else {
  ticketSupport = false
}
if (audioSupport=='True') {
  audioSupport = true
}else {
  audioSupport = false
}


var uid;
var broswer;
var isAgentOnline = false;
var agentPk = null;
var notification = new Audio('{{serverAddress}}/static/audio/notification.ogg');
var emailRecieved = false


var chat = {user : custName , messages : [ { message:"first", sentByAgent:true , created:  new Date() } ] }




function fetchMessages(uid) {
  console.log('user exist....' , uid);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      // console.log(this.readyState , this.status , 'onreadyyyyyyyyyyyyyyyyyy' );
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText)
        for (var i = 0; i < data.length; i++) {
          chat.messages.push(data[i])
        }
      }
  };
  xhttp.open('GET', '{{serverAddress}}/api/support/supportChat/?uid=' + uid , true);
  xhttp.send();
}



function fetchThread(uid) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText)
        if (data.length>0) {
          threadExist = true
          console.log(data,'fffffffffffffffff');
          chatThreadPk = data[0].pk
          agentPk = data[0].user
        }
        console.log(data);
        fetchMessages(uid);
      } else if (this.responseText == '{"PARAMS":"createCookie"}') {
        console.log('genertate new uid');
        document.cookie = encodeURIComponent("uid") + "=deleted; expires=" + new Date(0).toUTCString()
        uid = new Date().getTime()
        setCookie("uid", uid, 365);
        fetchMessages(uid);
      }
  };
  xhttp.open('GET', '{{serverAddress}}/api/support/chatThread/?uid=' + uid + '&checkThread', true);
  xhttp.send();
}



var threadExist
var threadResponse
var chatThreadPk


function checkCookie() {
  uid = getCookie("uid");
  if (uid != "") {
      // alert("Welcome again " + user);
      console.log('cookie exu=ist');
      fetchThread(uid);
      // if (threadExist!=undefined && threadExist) {
      //   fetchMessages(uid);
      // }
  } else {
      // uid = custID +'$'+custName+'$'+broswer.charAt(0)
      uid = new Date().getTime()
      console.log(uid);
      if (uid != "" && uid != null) {
          setCookie("uid", uid, 365);
      }
  }
}

checkCookie();




function setVisitorDetails(name , phoneNumber , email) {
  console.log('coming in chatter', name , phoneNumber , email);

  detail = getCookie("uidDetails");
  if (detail != "") {
    console.log('already there');
    document.cookie = encodeURIComponent("uidDetails") + "=deleted; expires=" + new Date(0).toUTCString()
  }

  console.log(getCookie("uid") , uid , 'getttttttttttttt`');

  if (uid!="") {
    console.log(uid);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        console.log(this.readyState , this.status , 'onreadyyyyyyyyyyyyyyyyyy' );
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          var data = JSON.parse(this.responseText)
          console.log(data,'');
          if (data.length==0) {
            console.log('vistor not there');
            var xhttp = new XMLHttpRequest();
             xhttp.onreadystatechange = function() {
               if (this.readyState == 4 && this.status == 201) {
                 console.log('posted successfully');
               }
             };
             xhttp.open('POST', '{{serverAddress}}/api/support/visitor/', true);
             xhttp.setRequestHeader("Content-type", "application/json");
             xhttp.send(JSON.stringify({uid:uid,name:name,email:email,phoneNumber:phoneNumber}));
          }
        }
    };

    xhttp.open('GET', '{{serverAddress}}/api/support/visitor/?uid='+uid  , true);
    xhttp.send();
  }
  setCookie("uidDetails", JSON.stringify({email:email , name:name , phoneNumber:phoneNumber}), 365);
}


function unsetVisitorDetails() {
  detail = getCookie("uidDetails");
  if (detail != "") {
    document.cookie = encodeURIComponent("uidDetails") + "=deleted; expires=" + new Date(0).toUTCString()
  }
}

function getVisitorDetails() {
  detail = getCookie("uidDetails");
  if (detail != "") {
    return detail
  }
}


function setIframeRotated(){
  iframeDiv.style.position = "fixed";
  iframeDiv.style.height = "70vh";
  iframeDiv.style.width = "70vh";
  iframeDiv.style.bottom = "100px";
  iframeDiv.style.right = "408px";
  iframeDiv.style.transition = "all .2s"
  iframeDiv.style.animation = "moveInFront 0.6s"
  iframeDiv.style.transform = "rotate(90deg)";
  document.getElementById('iFrame1').style.height='50px'
  iframeDiv.style.boxShadow='';
  iframeDiv.style.borderRadius='10px';

}
function setIframeToNormal(){
  iframeDiv.style.position = "fixed";
  iframeDiv.style.height = "70vh";
  iframeDiv.style.width = "50%";
  iframeDiv.style.bottom = "100px";
  iframeDiv.style.right = "410px";
  iframeDiv.style.transform = "rotate(0deg)";
  document.getElementById('iFrame1').style.height='100%'
  iframeDiv.style.boxShadow='-5px -10px 10px rgb(0,0,0,0.2)';
}
// var subs;
// var connectionIsOff=true
document.addEventListener("DOMContentLoaded", function(event) {


  connection.onopen = function (session) {
     console.log("session established!");
     // connectionIsOff=false
     // document.getElementById('noConnection').style.display='none'

    var supportChat = function(args) {
      console.log(args);
      var message;
      if(args[0]=='hideVisitorScreen'){
        document.getElementById('iframeDiv').style.display = "none";
        chatBox.style.display = "none";
        return
      }
      else if(args[0]=='ShowVisitorScreen'){
        document.getElementById('iframeDiv').style.display = "block";
        chatBox.style.display = "block";
        return
      }else if(args[0]=='ToggleVisitorVideo'){
          setIframeRotated()
          getFrameContent.postMessage('AgentClickedToHide','*')
        return
      }else if(args[0]=='ShowVisitorVideo'){
        setIframeToNormal()
        getFrameContent.postMessage('AgentClickedToshow','*')
        return
      }

      if (args[0]=='T') {
        console.log('typingggggggggggggggggggggg');
        onlineStatus.innerHTML = 'Typing...';
        // isTyping.style.display = "";
        setTimeout(function(){
          // isTyping.style.display = "none";
        onlineStatus.innerHTML = 'Online';
        }, 1500);
        return
      }

      if (args[0]=="M") {
        console.log('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM');
          // notification.play();
          message = args[1]
         // message = {msg:args[1].msg , sentByMe:false , created: args[1].created }
         // chat.messages.push(args[1]);
         if (!chatOpen) {
           unreadMsgCount+=1;
           // unreadMsg.style.display = "";
           // unreadMsg.innerHTML =   '<span style="color:#286EFA;" >'+unreadMsgCount+'</span>'
         }

      // agentName.innerHTML = args[2];
      agentName.innerHTML = args[2].first_name+' '+args[2].last_name
      document.getElementById('logo_ji').src=args[2].profile.displayPicture
      // dpSupport= args[2].profile.displayPicture

      }else if (args[0]=="MF") {
        console.log('MF');
        // notification.play();
        agentName.innerHTML = args[2].first_name+' '+args[2].last_name
        document.getElementById('logo_ji').src=args[2].profile.displayPicture

        if (!chatOpen) {
          unreadMsgCount+=1;
          // unreadMsg.style.display = "";
          // unreadMsg.innerHTML =   '<span style="color:#286EFA;" >'+unreadMsgCount+'</span>'
        }


        var attachment;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            console.log(this.readyState , this.status , 'onreadyyyyyyyyyyyyyyyyyy' );
            if (this.readyState == 4 && this.status == 200) {
              console.log(this.responseText);
              var data = JSON.parse(this.responseText)
              // attachment = data.attachment
              // console.log('attachmenttttttttttt' , attachment);
              message = data

              console.log(data,'ddddddddddd');

              if (data.attachmentType=='instructionImage') {
                openModal(data.attachment)
              }
            }
        };

        xhttp.open('GET', '{{serverAddress}}/api/support/supportChat/' + args[1].filePk + '/'  , true);
        xhttp.send();

      }else if (args[0]=='ML') {
        console.log('ML');
        // agentName.innerHTML = args[2]
        agentName.innerHTML = args[2].first_name+' '+args[2].last_name
        document.getElementById('logo_ji').src=args[2].profile.displayPicture
        if (!chatOpen) {
          unreadMsgCount+=1;
          // unreadMsg.style.display = "";
          // unreadMsg.innerHTML =   '<span style="color:#286EFA;" >'+unreadMsgCount+'</span>'
        }
         message = args[1]
      }else if (args[0]=='AP') {
        console.log('agent pk recieveddddddddddddddddddddddddddddddddd');
        agentPk = args[1];
        isAgentOnline = true;
        // videoCallAccepted = true
        // checkVideoCallAccepted()
        return
      }else if (args[0]=='O') {
        console.log('yes online');
        console.log('O');
        isAgentOnline = true;
        onlineStatus.innerHTML = 'Online'
        // agentName.innerHTML = '<p style="line-height: 1.75;">Syrow Agent</p>'
        return
      }else if (args[0]=='A') {
        console.log('asigned');
        console.log('A');
        isAgentOnline = true;
        agentName.innerHTML = args[1]
        return
      }else if (args[0]=='F') {
        console.log('F');
        console.log('open feedback');
        openFeedback(args[1])
        return
      }

      console.log('IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII');

      setTimeout(function(){
        console.log('inside timeooutttttttttttttt');
        var div = document.createElement("div");
        console.log(message,'message');
        div.innerHTML = messageDiv(message)
        messageBox.appendChild(div);
        scroll();
        chat.messages.push(message);
        notification.play();
      }, 1500);



    }

    uid = getCookie("uid");


    function heartbeat() {
      console.log('caming in heartttttttttttttttttttttttttttttttttttttt here');
      var isOnline = true
      return uid
    }


    function createCookieDetail(args) {
      console.log('create deleteeeeeeeeeeeeeeeeeeeeeee');
      console.log(args[0]);
        detail = getCookie("uidDetails");
        if (detail != "") {
          console.log('already there');
          document.cookie = encodeURIComponent("uidDetails") + "=deleted; expires=" + new Date(0).toUTCString()
        }
        if (args[0].email!='') {
          emailRecieved = true
        }
        console.log(emailRecieved);
        setCookie("uidDetails", JSON.stringify({email:args[0].email , name:args[0].name , phoneNumber:args[0].phoneNumber}), 365);
    }

    session.register(wamp_prefix+'service.support.createDetailCookie.'+uid, createCookieDetail).then(
      function (res) {
        console.log("registered to service.support.createDetailCookie'");
      },
      function (err) {
        console.log("failed to registered: ");
      }
    );

    session.register(wamp_prefix+'service.support.heartbeat.'+uid, heartbeat).then(
      function (res) {
        console.log("registered to service.support.heartbeat'");
      },
      function (err) {
        console.log("failed to registered: " + err);
      }
    );

    session.subscribe(wamp_prefix+'service.support.chat.' + uid, supportChat).then(
      function (sub) {
        subs=sub
        // alert("subscribed to topic 'service.support.chat'" , uid)
        console.log("subscribed to topic 'service.support.chat'" , uid );
      },
      function (err) {
        console.log("failed to subscribed: " + err);
      }
    );



  };

    connection.onclose = function (session) {
      // alert('hererere');
      // connectionIsOff=true;
      // document.getElementById('noConnection').style.display='block'
    }

  connection.open();



function createChatDiv() {


  var body = document.getElementsByTagName("BODY")[0];
  var mainDiv = document.createElement("mainDiv");
  mainDiv.id="mainDiv"

  mainDiv.innerHTML = '<div id="chatBox" class="ChatBoxDiv">'+
          '<div id="chatBox_header" class="chatBox_header flex_container">'+
            '<img class="logo_image" id="logo_ji" src="'+dpSupport+'" alt="">'+
            '<div class="chatBox_info">'+
              '<span id="agentName" class="chatBox_name">'+ nameSupport +'</span>'+
              '<span id="onlineStatus" class="chatBox_status">Online</span>'+
            '</div>'+
            '<i class="exitBtn SyrowFont font-SyrowPhone1" style="display:none" id="audioBtn"></i>'+
            '<i class="exitBtn SyrowFont font-SyrowVideoCall" style="display:none" id="videoBtn"></i>'+
            '<i class="closeIcon SyrowFont font-SyrowX" id="closeIcon"></i>'+
            '<i class="exitBtn SyrowFont font-SyrowLog-out" id="exitBtn"></i>'+
          '</div>'+
          '<div id="audioSection" class="audio_section">'+
          '</div>'+
          '<div id="videoSection" class="video_section">'+
          '</div>'+
          '<div id="chatBox_content" class="chatBox_content">'+
            '<div id="messageBox" class="content_section">'+
              // '<p id="noConnection" style="position:fixed;top:50%;right:120px;font-size:20px;padding:35px 5px;background-color:black;color:#fff;box-shadow:10px 10px 5px grey">No internet connection</p>'+
            '</div>'+
          '</div>'+
          '<div id="chatBox_footer" class="chatBox_footer">'+
              '<div class="chatbox_branding">'+
                '<a style="color:'+fontAndIconColor+' ;text-decoration:none" href="https://www.syrow.com/" target="_blank">We run on Syrow</a>'+
              '</div>'+
              '<div id="messageComposer" class="flex_container">'+
                '<textarea id="inputText" placeholder="Message..." name="name" rows="2" style="background-color:#fff;outline:none;font-size:14px" ></textarea>'+
                '<input id="filePicker" type="file" style="display:none;"/>'+
              '<i id="paperClip" class="paperClip SyrowFont font-SyrowPaperclip" aria-hidden="true"></i>'+
              '<i id="paperPlane" class="paperClip SyrowFont font-SyrowNavigation" aria-hidden="true"></i>'+
              '</div>'+


              '<div class="startNewChatBtn flex_container" id="startNewChatBtn" class="flex_container">'+
                '<span>Start New Conversation </span>'+
              '</div>'+
          '</div>'+
        '</div>'+



        '<div id="closeSupport" class="close-support" style="height:60px; width:60px; background-color: '+supportBubbleColor+'; border-radius:50%; position:fixed ; bottom:20px; right:40px; z-index:997654321; cursor:pointer;">'+
          '<svg style="position:absolute; top:20px; left:19px; height:51px;" viewBox="0 0 28 32">'+
             '<path id="closeChatSvg" style="fill:'+iconColor+';" d="M13.978 12.637l-1.341 1.341L6.989 8.33l-5.648 5.648L0 12.637l5.648-5.648L0 1.341 1.341 0l5.648 5.648L12.637 0l1.341 1.341L8.33 6.989l5.648 5.648z" fill-rule="evenodd"></path>'+
           '</svg>'+
        '</div>'+

        '<div id="supportCircle">'+
    			'<div style="background: '+supportBubbleColor+' !important; color:'+iconColor+';cursor:pointer" class="sy-circle first_animation" onclick="" id="sy-main-icon">'+
    				'<span id="Syrow24hSupportText" style="background: '+supportBubbleColor+' !important; color:'+iconColor+'" class="sy-text">24 Hours Support</span>'+
    				'<span id="chatSuggestionBar" style="display:none;background: '+supportBubbleColor+' !important; color:'+iconColor+'" class="sy-text-Suggested">We are here to help you</span>'+
    				'<span class="SyrowFont font-Syrow24hSupport sy-md-1 sy-ops"></span>'+
    				'<div  id="sy-sub-icons">'+
    					'<div style="background: '+supportBubbleColor+' !important; color:'+iconColor+';cursor:pointer" id="callCircle" class="sy-circle">'+
    						'<span id="callCircleText" style="background: '+supportBubbleColor+' !important; color:'+iconColor+'" class="sy-text">Callback</span>'+
    						'<span class="SyrowFont font-SyrowCallBack sy-md-2 sy-ops"></span></a>'+
    					'</div>'+
    					'<div style="background: '+supportBubbleColor+' !important; color:'+iconColor+';cursor:pointer" id="chatCircle" class="sy-circle">'+
    						'<span id="chatCircleText" style="background: '+supportBubbleColor+' !important; color:'+iconColor+'" class="sy-text">Chat</span>'+
    						'<span class="SyrowFont font-SyrowChat sy-md-2 sy-ops"></span>'+
    					'</div>'+
    					'<div style="background: '+supportBubbleColor+' !important; color:'+iconColor+';cursor:pointer" id="audioCircle" class="sy-circle">'+
    						'<span id="audioCircleText" style="background: '+supportBubbleColor+' !important; color:'+iconColor+'" class="sy-text">Audio Call</span>'+
    						'<span class="SyrowFont font-SyrowAudioCall sy-md-2 sy-ops"></span>'+
    					'</div>'+
    					'<div style="background: '+supportBubbleColor+' !important; color:'+iconColor+';cursor:pointer" id="videoCircle" class="sy-circle" >'+
    						'<span id="videoCircleText" style="background: '+supportBubbleColor+' !important; color:'+iconColor+'" class="sy-text">Video Call</span>'+
    						'<span class="SyrowFont font-SyrowVideoCall sy-md-2 sy-ops"></span>'+
    					'</div>'+
    					'<div style="background: '+supportBubbleColor+' !important; color:'+iconColor+';cursor:pointer" id="ticketCircle" class="sy-circle">'+
    						'<span id="ticketCircleText" style="background: '+supportBubbleColor+' !important; color:'+iconColor+'" class="sy-text">Ticket</span>'+
    						'<span class="SyrowFont font-SyrowTicket sy-md-1 sy-ops"></span>'+
    					'</div>'+
    				'</div>'+
    			'</div>'+
    		'</div>'+

        '<div id="singleService" style="background: '+supportBubbleColor+' !important; color:'+iconColor+';cursor:pointer" class="sy-circle first_animation">'+
          '<span id="singleServiceText" style="background: '+supportBubbleColor+' !important; color:'+iconColor+' ; right:105px; display:none; transition: .5s" class="sy-text">Chat</span>'+

          '<span id="singleServiceFont" class="SyrowFont font-SyrowCallBack sy-md-2 sy-ops"></span></a>'+
        '</div>'+
          '</div>'+
        '</div>'+
        '<div id="myModal" class="modal">'+
          '<div id="modalContent" class="modal-content">'+
          '</div>'+
        '</div>'
        '<div id="myModal" class="modal">'+
          '<div id="modalContent" class="modal-content">'+
          '</div>'+
        '</div>'



  mainDiv.style.font ="normal 75% Arial, Helvetica, sans-serif"
  body.appendChild(mainDiv);

}

  createChatDiv()

  //variables
  var device;
  var chatOpen = false;
  var audioContains=false,videoContains=false;
  var chatBox = document.getElementById('chatBox');
  var closeIcon = document.getElementById("closeIcon");
  var headerChat = document.getElementById("headerChat");
  var messageBox = document.getElementById("messageBox");
  var syrowBranding = document.getElementById("syrowBranding");
  var footer = document.getElementById("footer");
  var startNewChatBtn = document.getElementById('startNewChatBtn')
  var paperClip = document.getElementById("paperClip");
  var filePicker = document.getElementById('filePicker');
  var inputText = document.getElementById("inputText");
  var startConversation = document.getElementById("startConversation");
  var headerInit = document.getElementById('headerInit');
  var closeIconInit = document.getElementById('closeIconInit');
  var onlineStatus = document.getElementById('onlineStatus');
  var agentName = document.getElementById('agentName');
  var paperPlane = document.getElementById('paperPlane')
  var welcomeMessage = document.getElementById('welcomeMessage');
  var unreadMsg = document.getElementById('unreadMsg');
  var chatCircle =  document.getElementById("chatCircle");
  var callCircle = document.getElementById('callCircle');
  var audioCircle = document.getElementById('audioCircle');
  var videoCircle = document.getElementById('videoCircle');
  var ticketCircle = document.getElementById('ticketCircle');
  var closeSupport = document.getElementById('closeSupport');
  var supportCircle = document.getElementById('supportCircle');
  var audioSection = document.getElementById('audioSection')
  var videoSection = document.getElementById('videoSection')
  var chatBox_header = document.getElementById('chatBox_header')
  var chatBox_footer = document.getElementById('chatBox_footer')
  var chatBox_content = document.getElementById('chatBox_content')


  var xhttp1 = new XMLHttpRequest();
   xhttp1.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText)
        console.log(data);
     }
   };
    xhttp1.open('GET', '{{serverAddress}}/api/support/customerProfile/' + custID + '/' , true);
   // xhttp1.open('GET', '{{serverAddress}}/api/support/supportChat/', true);
   xhttp1.send();

  var exitBtn = document.getElementById('exitBtn');

  var singleService = document.getElementById('singleService');


  var modal = document.getElementById('myModal');
  var modalContent = document.getElementById('modalContent');


  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }


  chatBox.style.display = "none";
    inputText.addEventListener('keyup',function(e){
      if(inputText.value.length>0){
        document.getElementById('paperPlane').style.color=windowColor
      }else{
        document.getElementById('paperPlane').style.color="#A0A0A0"
      }
    })


  inputText.addEventListener('keydown',function(e){

    if(window.innerWidth <= 600) {
      console.log('mobile');
     return
   } else {
     console.log('desktop');
     if (e.keyCode == 13 && !e.shiftKey)
         {
             // prevent default behavior
             e.preventDefault();
             console.log('both');
             sendMessage(inputText.value);
         }
         if (e.keyCode == 13&&e.shiftKey)
         {
           console.log('here');
         }
   }

  })

  var chatCircleText =   document.getElementById('chatCircleText')
  var callCircleText =   document.getElementById('callCircleText')
  var audioCircleText =  document.getElementById('audioCircleText')
  var videoCircleText = document.getElementById('videoCircleText')
  var ticketCircleText = document.getElementById('ticketCircleText')
  var Syrow24hSupportText = document.getElementById('Syrow24hSupportText')
  var urlforConferenceForAgent,urlforConference,winCol;


  function openModal(imageSrc) {
    modalContent.innerHTML = '<img  src="'+ imageSrc +'" style="width:100%; box-sizing:border-box;">';
    modal.style.display = "block";
  }

function activeVideoCall(){
  winCol = windowColor.split('#')[1]
  urlforConferenceForAgent= webRtcAddress +'/'+uid+'?audio_video=video&windowColor='+winCol+'&agent=true';
  urlforConference =  webRtcAddress +'/' +uid+'?audio_video=video&windowColor='+winCol+'&agent=false';
  console.log(urlforConference);
  if (device=='sm') {
    urlforConferenceForAgent = urlforConferenceForAgent + '&userMob=true'
    urlforConference = urlforConference + '&userMob=true'
  }
 openVideoAudioIframe(urlforConference , urlforConferenceForAgent,'video')
}
function activeAudioCall(){
  winCol = windowColor.split('#')[1]
  urlforConferenceForAgent= webRtcAddress +'/' +uid+'?audio_video=audio&windowColor='+winCol+'&agent=true';
  urlforConference =  webRtcAddress +'/' +uid+'?audio_video=audio&windowColor='+winCol+'&agent=false';
  openVideoAudioIframe(urlforConference , urlforConferenceForAgent , 'audio')
}

  videoCircle.addEventListener('click',function () {
    activeVideoCall()
    openChat();
    hideAudioAndVidoeBtn();
  })

  function reachChatBoxForInfo(){
    connection.session.publish(wamp_prefix+'service.support.agent.'+agentPk, [uid , 'CustmorClosedTheChat' ] , {}, {
      acknowledge: true
    }).
    then(function(publication) {
      console.log("Published daaaaaaaaaaaaaaaaaaaaaa");
    });
  }

  audioCircle.addEventListener('click',function () {
    // activeAudioCall();
    openChat();
    // hideAudioAndVidoeBtn();
    audioBtn.click()

  })

  var videoOpened = false
  var audioOpened = false
  var getFrameContent;

  var openVideoAudioIframe =   function(urlforConference , urlforConferenceForAgent, streamTyp){


    if (videoOpened || audioOpened) {
      return
    }


    var dataToSend = {uid: uid , sentByAgent:false , created: new Date() };

    if (streamTyp=='video') {
      videoOpened = true
      var callType = 'VCS'
      chatBox_header.style.borderRadius = "0px 10px 0px 0px"
      chatBox_footer.style.borderRadius = "0px 0px 10px 0px"
      dataToSend.logs = 'video call started'
    }else if(streamTyp=='audio'){
      audioOpened = true
      var callType = 'AC'
      dataToSend.logs = 'audio call started'
    }


    // console.log(agentPk);
    if (agentPk) {
      console.log('agent pk is pnline',isAgentOnline);
      dataToSend.user = agentPk
      if (!isAgentOnline) {
        console.log('agetn oflineee');
        dataToSend.user = null
      }else {
        dataToSend.user = agentPk
      }
    }
    // var message = dataToSend
    dataToSend = JSON.stringify(dataToSend)


    var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 201) {
         console.log('posted successfully');
       }
     };
     xhttp.open('POST', '{{serverAddress}}/api/support/supportChat/', true);
     xhttp.setRequestHeader("Content-type", "application/json");
     xhttp.send(dataToSend);

      if (threadExist==undefined) {
        dataToPublish = [uid, callType, [] , custID]
        details = getCookie("uidDetails");
        if (details != "") {
          console.log(details);
           dataToPublish.push(JSON.parse(details))
        } else {
          dataToPublish.push(false)
        }

        var dataToSend = JSON.stringify({uid: uid , company: custID, typ: streamTyp});
        var xhttp = new XMLHttpRequest();
         xhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 201) {
             console.log('posted successfully');
             var data = JSON.parse(this.responseText)
             threadExist=true
             chatThreadPk = data.pk
             dataToPublish.push(chatThreadPk)
             dataToPublish.push(urlforConferenceForAgent)
             connection.session.publish(wamp_prefix+'service.support.agent', dataToPublish , {}, {
               acknowledge: true
             }).
             then(function(publication) {
               console.log("Published");
             }).catch(function(){
               // alert('disconnected');
             });
           }
         };
         xhttp.open('POST', '{{serverAddress}}/api/support/chatThread/', true);
         xhttp.setRequestHeader("Content-type", "application/json");
         xhttp.send(dataToSend);
      }else {


        var xhttp = new XMLHttpRequest();
         xhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
             console.log('chat thread typ changed');
           }
         };
         xhttp.open('PATCH', '{{serverAddress}}/api/support/chatThread/'+ chatThreadPk + '/', true);
         xhttp.setRequestHeader("Content-type", "application/json");
         xhttp.send(JSON.stringify({typ:streamTyp}));



        dataToPublish = [uid, callType, [] , custID, urlforConferenceForAgent]
        if (isAgentOnline) {
          console.log('ONLINE' , agentPk);
          connection.session.publish(wamp_prefix+'service.support.agent.'+agentPk, dataToPublish , {}, {
            acknowledge: true
          }).
          then(function(publication) {
            console.log("Published service.support.agent."+agentPk);
          }).catch(function(){
            // alert('problem ho gyi internet me')
          });
        }else {
          console.log('offline send to all');
          connection.session.publish(wamp_prefix+'service.support.agent', dataToPublish , {}, {
            acknowledge: true
          }).
          then(function(publication) {
            console.log("Published");
          });
        }

      }

      if (streamTyp=='video') {
        var body = document.getElementsByTagName("BODY")[0]
        var iframeDiv = document.createElement('div')
        iframeDiv.id = "iframeDiv";
        iframeDiv.style.position = "fixed";
        iframeDiv.style.height = "70vh";
        iframeDiv.style.width = "50%";
        iframeDiv.style.bottom = "100px";
        iframeDiv.style.right = "410px";
        iframeDiv.style.animation = "moveInFront 0.6s"
        iframeDiv.style.boxShadow='-5px -5px 10px rgb(0,0,0,0.2)';
      }


        var iFrame = document.createElement('iframe');
        iFrame.id = "iFrame1"
        iFrame.src = urlforConference;
        iFrame.style.width = "100%";
        iFrame.scrolling = "no";
        iFrame.style.height = "100%";
        iFrame.style.border='none';
        iFrame.setAttribute('allowFullScreen', '')
        iFrame.setAttribute('allow','geolocation; microphone; camera')
        setTimeout(function () {
            getFrameContent = document.getElementById("iFrame1").contentWindow;
        }, 1000);

        if (streamTyp=='audio') {
          audioSection.appendChild(iFrame)
          audioSection.style.display = "block";
          chatBox_content.style.marginTop = "40px";
          console.log(messageBox.style,'messageBoxmessageBoxmessageBoxmessageBox');
        }else {

          if (device=='sm') {
            videoSection.style.display = "block";
            videoSection.appendChild(iFrame)
            chatBox_content.style.marginTop = "200px"
          }else if (device=='lg') {
            iframeDiv.appendChild(iFrame)
            body.appendChild(iframeDiv)
          }
        }
    }

  singleService.style.display = "none";


  document.getElementById('sy-main-icon').style.display = "none";
  setTimeout(function(){
    document.getElementById('sy-main-icon').style.display = "";


  }, 2000);

  var unreadMsgCount = 0;

  var mainStr = "";
  var supportOptions = [ {name:'callCircle' , value:true} , {name:'chatCircle' , value:true} , {name:'audioCircle' , value:true}, {name:'videoCircle' , value:true} , {name:'ticketCircle' , value:true} ];

  for (var i = 0; i < supportOptions.length; i++) {
    if (supportOptions[i].name=='callCircle') {
      supportOptions[i].value = callBackSupport;
    }
    if (supportOptions[i].name=='chatCircle') {
      supportOptions[i].value = chatSupport;
    }
    if (supportOptions[i].name=='audioCircle') {

      console.log('************************');
      if(videoSupport){
          videoContains=true;
      }
      supportOptions[i].value = audioSupport;
    }
    if (supportOptions[i].name=='videoCircle') {
      supportOptions[i].value = videoSupport;
      if(audioSupport){
          audioContains=true;
      }


    }
    if (supportOptions[i].name=='ticketCircle') {
      supportOptions[i].value = ticketSupport;
    }
  }

  console.log(supportOptions,'so');
    serviceCount = 0
    setTimeout(function () {
      for (var i = 0 , rD = 0 , mB = 0 , mR=0 ; i < supportOptions.length; i++) {

        if (supportOptions[i].value) {
          serviceCount++;
          var activeService = supportOptions[i].name
          rD+=2;
          mB+=60;
          mR+=1;
          var itemName = 'item-'+(i+1);

          supportString = "\
            @-moz-keyframes "+ itemName +" { 100% { \
            margin-bottom: "+mB+"px; \
            margin-right: -"+mR+"px; \
            opacity: 1; \
            -webkit-transform: rotate("+rD+"deg); \
          } }\
          @-webkit-keyframes "+ itemName +" { 100% { \
            margin-bottom: "+mB+"px; \
            margin-right: -"+mR+"px; \
            opacity: 1; \
            -webkit-transform: rotate("+rD+"deg); \
          } }\
          @-ms-keyframes item-1 { 100% { \
            margin-bottom: "+mB+"px; \
            margin-right: -"+mR+"px; \
            opacity: 1; \
            -ms-transform: rotate("+rD+"deg); \
          } }\
          "
          mainStr = mainStr.concat(supportString);
        }else {
            document.getElementById(supportOptions[i].name).style.display = "none";
        }

      }
      if (serviceCount==1) {

        // alert('display only one service')
        // display none of main
        setTimeout(function () {
            singleService.style.display = ""
            supportCircle.style.display = "none"

            var singleServiceText = document.getElementById('singleServiceText')
            var singleServiceFont = document.getElementById('singleServiceFont')

            // singleService = document.getElementById('singleService')

            singleService.addEventListener("mouseover" , function () {
              singleServiceText.style.display = ""
            })

            singleService.addEventListener("mouseleave" , function () {
              singleServiceText.style.display = "none"
            })

            if (activeService == 'callCircle') {
              singleServiceText.innerHTML = "Callback"
              singleServiceFont.className = "SyrowFont font-SyrowCallBack sy-md-2 sy-ops"
            }else if (activeService == 'chatCircle') {
              singleServiceText.innerHTML = "Chat"
              singleServiceFont.className = "SyrowFont font-SyrowChat sy-md-2 sy-ops"
              singleService.addEventListener("click" , openChat , false)
            }else if (activeService == 'audioCircle') {
              singleServiceText.innerHTML = "Audio Call"
              singleServiceFont.className = "SyrowFont font-SyrowAudioCall sy-md-2 sy-ops"
            }else if (activeService == 'videoCircle') {
              singleServiceText.innerHTML = "Video Call"
              singleServiceFont.className = "SyrowFont font-SyrowVideoCall sy-md-2 sy-ops"
            }else if (activeService == 'ticketCircle') {
              singleServiceText.innerHTML = "Ticket"
              singleServiceFont.className = "SyrowFont font-SyrowTicket sy-md-1 sy-ops"
            }

        }, 110);

      }
    }, 1000);



    function setStyle() {

            var newStyle = document.createElement('style');
            newStyle.appendChild(document.createTextNode("\
            @font-face {\
              font-family: 'Syrow';\
              src:  url('https://raw.githubusercontent.com/pkyad/libreERP-main/syrow/static_shared/fonts/syrow/Syrow.eot?a8jyi4#iefix') format('embedded-opentype'),\
              url('https://raw.githubusercontent.com/pkyad/libreERP-main/syrow/static_shared/fonts/syrow/Syrow.ttf?a8jyi4') format('truetype'),\
              url('https://raw.githubusercontent.com/pkyad/libreERP-main/syrow/static_shared/fonts/syrow/Syrow.woff?a8jyi4') format('woff'),\
              url('https://raw.githubusercontent.com/pkyad/libreERP-main/syrow/static_shared/fonts/syrow/Syrow.svg?a8jyi4#Syrow') format('svg');\
              font-weight: normal;\
              font-style: normal;\
            }\
            @font-face {\
              font-family: 'Syrow';\
              src:  url('https://raw.githubusercontent.com/pkyad/libreERP-main/syrow/static_shared/fonts/syrow/Syrow.eot?7na8rs');\
              src:  url('https://raw.githubusercontent.com/pkyad/libreERP-main/syrow/static_shared/fonts/syrow/Syrow.eot?7na8rs#iefix') format('embedded-opentype'),\
                url('https://raw.githubusercontent.com/pkyad/libreERP-main/syrow/static_shared/fonts/syrow/Syrow.ttf?7na8rs') format('truetype'),\
                url('https://raw.githubusercontent.com/pkyad/libreERP-main/syrow/static_shared/fonts/syrow/Syrow.woff?7na8rs') format('woff'),\
                url('https://raw.githubusercontent.com/pkyad/libreERP-main/syrow/static_shared/fonts/syrow/Syrow.svg?7na8rs#Syrow') format('svg');\
              font-weight: normal;\
              font-style: normal;\
            }\
              .SyrowFont {\
              /* use !important to prevent issues with browser extensions that change fonts */\
              font-family: 'Syrow';\
              speak: none;\
              font-style: normal;\
              font-weight: normal;\
              font-variant: normal;\
              text-transform: none;\
              line-height: 1;\
              /* Better Font Rendering =========== */\
              -webkit-font-smoothing: antialiased;\
              -moz-osx-font-smoothing: grayscale;\
            }\
              .font-Syrow24hSupport:before {\
              content: '\\61';\
            }\
            .font-SyrowX:before {\
               content: '\\e97e';\
             }\
             .font-SyrowLog-out:before {\
                content: '\\e92b';\
              }\
             .font-SyrowPhone-call:before {\
                content: '\\e93d';\
              }\
             .font-SyrowNavigation:before {\
                content: '\\e93a';\
              }\
             .font-SyrowPaperclip:before {\
                content: '\\e93b';\
              }\
              .font-SyrowChat:before {\
              content: '\\62';\
            }\
              .font-SyrowAudioCall:before {\
              content: '\\63';\
            }\
              .font-SyrowVideoCall:before {\
              content: '\\64';\
            }\
              .font-SyrowCallBack:before {\
              content: '\\65';\
            }\
            .font-SyrowPhone1:before {\
                content: '\\e93c';\
              }\
              .font-SyrowPhone-call:before {\
                content: '\\e93d';\
              }\
              .font-SyrowTicket:before {\
              content: '\\66';\
            }\
            .font-SyrowBar-chart-2:before {\
              content: '\\e902';\
            }\
              .sy-circle {\
              z-index: 987654321!important;\
              position: fixed!important;\
              bottom: 20px;\
              right: 40px;\
              width: 60px!important;\
              height: 60px!important;\
              border-radius: 50%!important;\
            }\
              .fa1 {\
                  display: inline-block;\
                  font: normal normal normal 14px/1 'FontAwesome' !important;\
                  font-size: inherit;\
                  text-rendering: auto;\
                  -webkit-font-smoothing: antialiased;\
                  -moz-osx-font-smoothing: grayscale;\
                }\
            .fa-stack1 {\
                position: relative;\
                display: inline-block;\
                width: 2em;\
                height: 2em;\
                line-height: 2em;\
                vertical-align: middle;\
              }\
              .sy-md-1 {\
              font-size: 40px;\
            }\
              .sy-md-2 {\
              font-size: 34px;\
            }\
              .sy-ops {\
              position: absolute;\
              top: 0;\
              bottom: 0;\
              width: 100%;\
              display: -webkit-box;\
              display: -ms-flexbox;\
              display: flex;\
              -webkit-box-align: center;\
              -ms-flex-align: center;\
              align-items: center;\
              -webkit-box-pack: center;\
              -ms-flex-pack: center;\
              justify-content: center;\
              -webkit-transition: opacity .08s linear,-webkit-transform .16s linear;\
              transition: opacity .08s linear,-webkit-transform .16s linear;\
              transition: transform .16s linear,opacity .08s linear;\
              transition: transform .16s linear,opacity .08s linear,-webkit-transform .16s linear;\
            }\
            .changeColor{\
              animation:coloringg 2s infinite\
            }\
              .sy-text {\
              position: fixed;\
              right: 70px;\
              margin-top: 15px;\
              border-radius: 15px;\
              padding: 4px 8px;\
              font-family: Verdana, Arial, sans-serif;\
              font-size: 14px;\
              display: inline-block;\
              white-space: nowrap;\
              max-width: 250px;\
              overflow: hidden;\
            }\
              .sy-text-Suggested {\
              position: fixed;\
              right: 100px;\
              margin-top: 15px;\
              border-radius: 15px;\
              padding: 4px 8px;\
              font-family: Verdana, Arial, sans-serif;\
              font-size: 18px;\
              white-space: nowrap;\
              max-width: 250px;\
              overflow: hidden;\
              animation:chatSuggestionBar 1s\
            }\
              .sy-circle a, .sy-circle a:visited, .sy-circle a:active, .sy-circle a:hover, .sy-circle a:link {\
              text-decoration: none;\
            }\
              #sy-sub-icons .sy-circle, #sy-main-icon > .sy-text {\
              display: none;\
            }\
              #sy-main-icon:hover > .sy-text {\
              display: inline-block;\
              right: 110px;\
            }\
              #sy-main-icon:hover > .sy-text-Suggested {\
              display: none !important;\
            }\
            "+ mainStr+"\
              #sy-main-icon:hover > #sy-sub-icons > div:nth-of-type(1) { \
              display: block;\
              -webkit-animation: item-1 0.5s forwards; \
              -ms-animation: item-1 0.5s forwards; \
              -moz-animation: item-1 0.5s forwards;\
            }\
              #sy-main-icon:hover > #sy-sub-icons > div:nth-of-type(2) { \
              display: block;\
              -webkit-animation: item-2 0.5s forwards; \
              -ms-animation: item-2 0.5s forwards;\
              -moz-animation: item-2 0.5s forwards; \
            }\
              #sy-main-icon:hover > #sy-sub-icons > div:nth-of-type(3) {\
              display: block;\
              -webkit-animation: item-3 0.5s forwards; \
              -ms-animation: item-3 0.5s forwards; \
              -moz-animation: item-3 0.5s forwards; \
            }\
              #sy-main-icon:hover > #sy-sub-icons > div:nth-of-type(4) { \
              display: block;\
              -webkit-animation: item-4 0.5s forwards; \
              -ms-animation: item-4 0.5s forwards; \
              -moz-animation: item-4 0.5s forwards; \
            }\
              #sy-main-icon:hover > #sy-sub-icons > div:nth-of-type(5) { \
              display: block;\
              -webkit-animation: item-5 0.5s forwards; \
              -ms-animation: item-5 0.5s forwards; \
              -moz-animation: item-5 0.5s forwards; \
            }\
                div.stars {\
                display: inline-block;\
              }\
              input.star { display: none; }\
              label.star {\
                float: right;\
                padding: 8px;\
                font-size: 32px;\
                color: #fff;\
                text-shadow: #ff720b 1px 0 1px;\
                transition: all .5s;\
              }\
              input.star:checked ~ label.star:before {\
                content: '\\2605';\
                color: #ff720b;\
                transition: all .25s;\
              }\
              .star1 {\
                content: '\\2605';\
                color: #ff720b;\
              }\
              input.star-5:checked ~ label.star:before {\
                color: #ff720b;\
                text-shadow: 0 0 20px #952;\
              }\
              input.star-1:checked ~ label.star:before { color: #ff720b; }\
              label.star:hover { color: #ff720b; }\
              label.star:hover ~ label.star:before { color: #ff720b; }\
              label.star:before {\
                content: '\\2605';\
              }\
              .messageOpacity{\
                animation: msgDiv 1s ease;\
              }\
              @keyframes msgDiv{\
                0%{\
                    opacity:0;\
                	}\
                100%{\
                    opacity:1;\
                	}\
                }\
                .modal {\
                display: none;\
                position: fixed;\
                z-index: 999999999;\
                padding-top: 100px;\
                left: 0;\
                top: 0;\
                width: 100%;\
                height: 100%;\
                overflow: auto;\
                background-color: rgb(0,0,0);\
                background-color: rgba(0,0,0,0.4);\
            }\
            .modal-content {\
                background-color: #fefefe;\
                margin: auto;\
                padding: 20px;\
                border: 1px solid #888;\
                width: 60%;\
                box-shadow:5px 10px 10px rgb(0,0,0,0.2);\
                animation:modalBox 1s ease;\
            }\
              .close {\
              color:  rgb(0,0,0);\
              float: right;\
              font-size: 28px;\
              font-weight: bold;\
          }\
              .first_animation {\
              animation:  first_animation 1s;\
          }\
          @keyframes modalBox{\
        	0%{\
              transform:translateY(-200px);\
          	}\
            70%{\
              transform:translateY(20px);\
          	}\
            100%{\
              	transform:translateY(0px);\
          	}\
          }\
          @keyframes first_animation{\
        	0%{\
              transform:translateY(400px);\
          	}\
            50%{\
              transform:translateY(-100px);\
          	}\
            100%{\
              	transform:translateY(0px);\
          	}\
          }\
          @keyframes coloringg{\
        	0%{\
              color:red;\
          	}\
            100%{\
              	color:green;\
          	}\
          }\
          @keyframes chatSuggestionBar{\
        	0%{\
              transform:translateY(100px);\
          	}\
            50%{\
              transform:translateY(-10px);\
            }\
            100%{\
              	transform:translateY(0px);\
          	}\
          }\
            @media only screen and (max-width: 600px) {\
              .ChatBoxDiv{\
                padding:0px;\
                margin:0px;\
                height: 100%;\
                position: fixed;\
                top:0px;\
                font-family: 'Muli', sans-serif;\
                right: 0px;\
                min-width: 100%;\
                color:black;\
                z-index:9999999999999999999;\
                border-radius:0px\
              }\
              .chatBox_header{\
                border-radius:0px !important;\
              }\
              .chatBox_footer{\
                border-radius:0px !important;\
              }\
              .closeIcon{\
                display:block;\
              }\
              .closeIcon_box{\
                display:block;\
              }\
              .close-support{\
                display:none;\
              }\
            }\
            @media only screen and (min-width: 600px) {\
              .ChatBoxDiv{\
                padding:0px;\
                margin:0px;\
                height: 70vh;\
                position: fixed;\
                bottom: 100px;\
                right: 40px;\
                font-family: 'Muli', sans-serif;\
                min-width: 370px;\
                border-radius:10px;\
                box-shadow: 0px 0px 25px 5px rgba(0,0,0,0.2);\
                z-index:9999999999999999999;\
                color:black;\
              }\
              .closeIcon{\
                display:none;\
              }\
              .closeIcon_box{\
                display:none;\
              }\
              .close-support{\
                display:block;\
              }\
            }\
            .flex_container {\
              display: flex;\
              flex-wrap: nowrap;\
            }\
            .chatBox_content{\
              padding:0px;\
              margin:0px;\
              position: absolute;\
              top:81px;\
              width:100%;\
              bottom: 80px;\
              background-color: white;\
              overflow-x:hidden;\
              overflow-y: auto;\
            }\
            .audio_section{\
              display:none;\
              height: 40px;\
              background-color: "+windowColor+";\
              padding:0px;\
              margin:0px;\
              position: absolute;\
              top:80px;\
              width:100%;\
            }\
            .video_section{\
              display:none;\
              height: 201px;\
              background-color: "+windowColor+";\
              padding:0px;\
              margin:0px;\
              position: absolute;\
              top:80px;\
              width:100%;\
            }\
            .chatBox_content .content_section{\
              padding:0px;\
              margin-top: 0px;\
            }\
            .chatBox_header{\
              padding:0px;\
              margin:0px;\
              position: absolute;\
              width:100%;\
              min-height: 80px;\
              background-image:linear-gradient(to right, "+windowColor +","+ windowColor+","+ windowColor+");\
              color: rgba(255, 255, 255, 0.8);\
              border-radius: 10px 10px 0 0;\
            }\
            .chatBox_header i{\
               font-size:25px;\
               color:"+fontAndIconColor+"\
            }\
            .chatBox_header > .logo_image{\
              width: 70px;\
              height:70px;\
              border-radius: 50%;\
              margin: 10px;\
              padding: 10px;\
              box-sizing:border-box;\
            }\
            .chatBox_header .chatBox_info{\
              margin: 20px 10px;;\
              width: 60%;\
              padding:0px;\
              color:"+fontAndIconColor+"\
            }\
            .chatBox_header .chatBox_name{\
              display: block;\
              font-size: 15px;\
              padding:0px;\
              margin:0px;\
            }\
            .chatBox_header .chatBox_status{\
              display: block;\
              font-size: 10px;\
              margin-top:5px;\
              padding:0px;\
            }\
            .exitBtn, .closeIcon {\
              margin: 15px 10px;\
              padding-top: 10px;\
              text-align: center;\
              width: 50px;\
              height:34px;\
              transition: 0.5s;\
              box-sizing:border-box;\
            }\
            .paperClip{\
              font-size:25px;\
              margin:10px;\
              color:#A0A0A0\
            }\
            .exitBtn:hover{\
              transform: scale(1.1) ;\
              cursor: pointer;\
            }\
            .closeIcon:hover{\
              transform: scale(0.9) ;\
              cursor: pointer;\
            }\
            .chatBox_footer{\
              padding:0px;\
              margin:0px;\
              position: absolute;\
              bottom:0px;\
              width:100%;\
              min-height: 80px;\
              background-color: white;\
              border-radius:0px 0px 10px 10px;\
            }\
            .chatBox_footer  textarea {\
              width: 77%;\
              margin: 10px;\
              font-size: 16px;\
              resize:none;\
              overflow: visible;\
              border: none;\
              padding:0px;\
            }\
            .chatBox_footer img {\
              margin: 10px;\
              width: 25px;\
              height:25px;\
              text-align: center;\
              opacity: 0.6;\
              transition: 0.5s;\
              padding:0px;\
            }\
            .chatBox_footer  img:hover{\
              opacity: 1;\
              cursor: pointer;\
            }\
            .chatBox_footer .chatbox_branding{\
              min-height: 13px;\
              text-align: center;\
              font-size: 10px;\
              background-image:linear-gradient(to right, "+windowColor +","+ windowColor+","+ windowColor+");\
              width: 100%;\
              color: "+fontAndIconColor+";;\
              padding:0px;\
              margin:0px;\
            }\
            .startNewChatBtn{\
              text-align: center;\
              padding-top:15px; \
              background-color:#fff;\
              color:"+windowColor+";\
              cursor:pointer;\
              width:100%;\
              display:none;\
            }\
            .startNewChatBtn > span{\
              font-size:14px;\
              font-weight:bolder;\
            }\
            @keyframes moveInLeft{\
              0%{\
                opacity:0;\
              }\
              80%{\
                opacity:1;\
              }\
              100%{\
                opacity:1;\
                transform:translateX(0px);\
              }\
            }\
            @keyframes moveInDown{\
              0%{\
                opacity:1;\
                transform:translateY(0px);\
              }\
              100%{\
                opacity:0;\
                transform:translateY(10px) scale(0.0);\
              }\
            }\
            @keyframes rotateAnti{\
              0%{\
                opacity:0;\
                transform:rotate(45deg);\
              }\
              100%{\
                opacity:1;\
                transform:rotate(0deg);\
              }\
            }\
            @keyframes rotateClock{\
              0%{\
                opacity:0;\
                transform:rotate(0deg);\
              }\
              100%{\
                opacity:1;\
                transform:rotate(45deg);\
              }\
            }\
            @keyframes moveInFront{\
              0%{\
                opacity:0;\
                transform:scale(0);\
              }\
              80%{\
                opacity:0.5;\
              }\
              100%{\
                opacity:1;\
                transform:scale(1);\
              }\
            }\
            "));

            document.head.appendChild(newStyle);
    }

    setTimeout(function () {
      setStyle()
    }, 1500);




  function endChat() {

    console.log('inside end chattttttttttt');
    chatClosed = true

    console.log(feedbackFormOpened);

    if (feedbackFormOpened) {
      return
    }

    var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
         console.log('posted successfully');

          setCookie("chatOpenCookie", false, 365);


         var dataToSend = {uid:uid , userEndedChat: 'CHAT CLOSED BY USER' , sentByAgent:false };

         connection.session.publish(wamp_prefix+'service.support.agent.'+agentPk, [uid , 'CL' , dataToSend ] , {}, {
           acknowledge: true
         }).
         then(function(publication) {
           console.log("Published daaaaaaaaaaaaaaaaaaaaaa");
         });



       }
     };
     xhttp.open('PATCH', '{{serverAddress}}/api/support/chatThread/'+ chatThreadPk + '/', true);
     xhttp.setRequestHeader("Content-type", "application/json");
     xhttp.send(JSON.stringify({status:"closed",closedByUser:1}));

    openFeedback()
  }

  feedbackFormOpened = false
  feedbackFormSubmitted = false

  function openFeedback(id) {
    hideAudioAndVidoeBtn();

    console.log(feedbackFormOpened , 'feedbackFormOpened');

    if (feedbackFormOpened) {
      return
    }

    feedbackFormOpened = true
    console.log('coming in open feedback');
    var id = id;
    var div = document.createElement("div");
    div.id="offlineMessage"
    div.innerHTML =  '<div style="margin:0px 0px 10px; box-sizing:border-box;" >'+
                      '<div style="text-align:center;clear: both; float:left; background-color:#f6f6f6; padding:10px;margin:8px; box-sizing:border-box;font-size:14px">'+
                      '<p style="line-height: 1.75; margin:0px; word-wrap: break-word; font-size:12px;color:rgba(0,0,0,0.5); box-sizing:border-box;">Please provide your feedback below:</p>'+
                      '<form>'+
                        '<div class="stars">'+
                          '<form id="stars">'+
                            '<input class="star star-5" id="star-5" type="radio" name="star"/>'+
                            '<label class="star star-5" for="star-5"></label>'+
                            '<input class="star star-4" id="star-4" type="radio" name="star"/>'+
                            '<label class="star star-4" for="star-4"></label>'+
                            '<input class="star star-3" id="star-3" type="radio" name="star"/>'+
                            '<label class="star star-3" for="star-3"></label>'+
                            '<input class="star star-2" id="star-2" type="radio" name="star"/>'+
                            '<label class="star star-2" for="star-2"></label>'+
                            '<input class="star star-1" id="star-1" type="radio" name="star"/>'+
                            '<label class="star star-1" for="star-1"></label>'+
                          '</form>'+
                        '</div>'+
                        '<input type="text" id="emailId" placeholder="Email (Optional)"  style="width:100%; padding:5px;border:none; margin-bottom:10px;">'+
                         '<textarea id="feedbackText" style="width:100%;outline:none;padding:5px; resize:none;border:none; box-shadow:.3px .3px #fff; box-sizing:border-box;" rows="3" placeholder="Feedback"></textarea>'+
                         '<button id="submitCancel" type="button" style="margin-top:10px; padding:4px 8px; border-radius:8px; background-color:'+fontAndIconColor+' ; color:'+windowColor+'; text-transform:none; font-size:11px; cursor:pointer;" >'+
                           'Cancel'+
                         '</button>'+
                         '<button id="submitStars" type="button" style="margin-top:10px;margin-left:10%; padding:4px 8px; border-radius:8px; background-color:'+windowColor+' ; color:'+fontAndIconColor+'; text-transform:none; font-size:11px; cursor:pointer;" >'+
                           'Submit'+
                         '</button>'+
                        '</form>'+
                      '</div> '+
                    '</div>'
    messageBox.appendChild(div);
    scroll();
    var stars = document.getElementById('stars');
    var submitStars = document.getElementById('submitStars');

    messageComposer.style.display = "none";
    startNewChatBtn.style.display = "block";

    if (emailRecieved) {
      // ratingForm.email = emailId
      var emailId = document.getElementById('emailId')
      emailId.style.display = "none"
    }


    submitStarForm(id);
  }

  function thankYouMessage() {
    console.log('coming in thankyou');
    var div = document.createElement("div");
    div.id="thankYou"
    div.innerHTML = '<div style="margin:0px 0px 10px; box-sizing:border-box;" >'+
                    '<div style="clear: both; float:left; background-color:#f6f6f6; padding:10px;margin:8px; border-radius:0px 20px 20px 20px; box-sizing:border-box;">'+
                    '<p style="line-height: 1.75; margin:0px; word-wrap: break-word; font-size:14px; box-sizing:border-box;">Thank You !</p>'+
                    '</div> '+
                    '</div>'
  messageBox.appendChild(div);
  scroll();
  }




  function submitStarForm(id) {

    var submitCancel=document.getElementById('submitCancel')
    var offlineMessage=document.getElementById('offlineMessage')

    submitCancel.addEventListener('click',function(){
        thankYouMessage();
        submitStars.style.display = "none";
        offlineMessage.style.display="none"
    })

var myformrating;

    submitStars.addEventListener("click", function() {
      // console.log('somthing hereeeeee' , this);
      submitStars.style.display = "none";
      offlineMessage.style.display="none"
      // id="star-5"
      // console.log(document.getElementById('feedbackText').value);
      var feedbackText = document.getElementById('feedbackText')

      var ratingForm = {
        customerRating:0,
        customerFeedback:feedbackText.value
      }

      var emailId = document.getElementById('emailId').value


      if (!emailRecieved) {
        ratingForm.email = emailId
      }

      var star1 = document.getElementById('star-1')
      var star2 = document.getElementById('star-2')
      var star3 = document.getElementById('star-3')
      var star4 = document.getElementById('star-4')
      var star5 = document.getElementById('star-5')


      // var rating;
      if (star1.checked) {
        ratingForm.customerRating = 1
      }
      if (star2.checked) {
        ratingForm.customerRating = 2
      }
      if (star3.checked) {
        ratingForm.customerRating = 3
      }
      if (star4.checked) {
        ratingForm.customerRating = 4
      }
      if (star5.checked) {
        ratingForm.customerRating = 5
      }
      myformrating=ratingForm.customerRating
    console.log(ratingForm);
    ratingFormObject = ratingForm
    ratingForm = JSON.stringify(ratingForm)
      var xhttp = new XMLHttpRequest();
       xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
           console.log('posted successfully');
           console.log(ratingForm);
           submitStars.style.display = "none";
           submitCancel.style.display='none'
           thankYouMessage()
           feedbackFormSubmitted = true

           console.log(ratingFormObject);

            var dataToSend = {uid:uid , usersFeedback:ratingFormObject.customerFeedback  , rating:ratingFormObject.customerRating , sentByAgent:false };

             connection.session.publish(wamp_prefix+'service.support.agent.'+agentPk, [uid , 'FB' , dataToSend ] , {}, {
               acknowledge: true
             }).
             then(function(publication) {
               console.log("Published daaaaaaaaaaaaaaaaaaaaaa");
             });
         }
       };
       xhttp.open('PATCH', '{{serverAddress}}/api/support/chatThread/'+ chatThreadPk + '/', true);
       xhttp.setRequestHeader("Content-type", "application/json");
       xhttp.send(ratingForm);

    }, false);

  }

  closeSupport.style.display = "none";

  var chatClosed = false

  startNewChatBtn.addEventListener("click" , function () {
    // or you can use variable feedbackFormSubmitted which is true only if feedbackForm is submitted
    messageBox.innerHTML = '';
    isConfirmedToEnd=false;
    msgCount=0;
    agentName.innerHTML = nameSupport
    document.cookie = encodeURIComponent("uid") + "=deleted; expires=" + new Date(0).toUTCString()
    uid = new Date().getTime()
    setCookie("uid", uid, 365);
    chat = {user : custName , messages : [ { message:"first", sentByAgent:true , created:  new Date() } ] }
    pushMessages()
    setAudioVideoBtn();
    countForFrameContent=0;
    if(countForFrameContent>0){
      document.getElementById('iFrame1').src = '';
    }

    console.log('Came here ... chat ');
    messageComposer.style.display = "";
    startNewChatBtn.style.display = "none";
    audioSection.style.display = "none";
    videoSection.style.display = "none";
    chatBox_content.style.marginTop = "0"

    agentPk =  null;
    threadExist = undefined;
    chatThreadPk = undefined;
    emailRecieved = false;
    unreadMsgCount = 0;
    isAgentOnline = false;

    connection._transport.close()
    inputText.disabled = true;
    inputText.placeholder = "Initializing....";
    paperClip.style.display = "none";
    paperPlane.style.display = "none";

    setTimeout(function () {
      inputText.disabled = false;
      inputText.placeholder = "Message...";
      paperClip.style.display = "";
      paperPlane.style.display = "";
    }, 2000);

    connection.onclose = function(reason, details) {
      console.log("Connection lost: ");
      var connection = new autobahn.Connection({url: '{{wampServer}}', realm: 'default'});
      connection.open()
    }

    feedbackFormOpened = false
    feedbackFormSubmitted = false

  })


  window.addEventListener("message", receiveMessage, false);

  function receiveMessage(event){
    if (event.data=='loadMyOrders') {
      var url = 'https://chrome.google.com/webstore/detail/screen-capturing/ajhifddimkapgcifgcodmmfdlknahffk'
       window.open(url);

    }
    if (event.data=='calledToHideVideo') {
      setIframeRotated()
      connection.session.publish(wamp_prefix+'service.support.agent.'+agentPk, [uid , 'calledToHideVideo' ] , {}, {
        acknowledge: true
      }).
      then(function(publication) {
        console.log("Published daaaaaaaaaaaaaaaaaaaaaa");
      });
    }
    if (event.data=='calledToShowVideo') {
      setIframeToNormal()
      connection.session.publish(wamp_prefix+'service.support.agent.'+agentPk, [uid , 'calledToShowVideo' ] , {}, {
        acknowledge: true
      }).
      then(function(publication) {
        console.log("Published daaaaaaaaaaaaaaaaaaaaaa");
      });
    }
    if (event.data=='hideTheMainFrame') {
      document.getElementById('iframeDiv').style.display = "none";
    }else if(event.data=='showTheMainFrame'){
      document.getElementById('iframeDiv').style.display = "block";
    }
    if (event.data== 'replyToUseruserleft'){
      setTimeout(endOfConversation, 5000);
    }
    if (event.data== 'dintPickTheCall'){
      if(isAudioClicked){
        hideTheIframeOnAgentSide()
        audioBtn.click()
      }else if(isVideoClicked){
        // isVideoClicked=false
        videoBtn.click()
      }
    }
  }

function endOfConversation() {
    if (videoOpened) {

      if (device=='sm') {
        videoSection.innerHTML = "";
        videoSection.style.display = "none";
        chatBox_content.style.marginTop = "0";
      }else {
        chatBox_header.style.borderRadius = "10px 10px 0px 0px"
        chatBox_footer.style.borderRadius = "0px 0px 10px 10px"
        var iframeDiv = document.getElementById('iframeDiv')
        iframeDiv.parentNode.removeChild(iframeDiv);
      }
      var iFrame = document.getElementById('iFrame1')
      iFrame.src = '';
      videoOpened = false
    }else if (audioOpened) {
      var iFrame = document.getElementById('iFrame1')
      iFrame.src = '';
      audioSection.innerHTML = "";
      audioSection.style.display = "none";
      chatBox_content.style.marginTop = "0";
      audioOpened = false;
    }
  }

function deactivateAudioFrame(){
  if(getFrameContent!=undefined){
    getFrameContent.postMessage('userleft',webRtcAddress );
  }
  audioSection.style.display = "none";
  chatBox_content.style.marginTop = "0";
}

function togglingActive(element,value){
  if(value){
    element.classList.add('changeColor')
  }else{
    element.classList.remove('changeColor')
  }
}
var videoBtn=document.getElementById('videoBtn')
var audioBtn=document.getElementById('audioBtn')
var isVideoClicked=false;
var isAudioClicked=false;

function setAudioVideoBtn(){
  setTimeout(function () {
    if(videoContains){
      videoBtn.style.display='block'
    }
    if(audioContains){
      console.log('comgggggggggggggggggg');
      audioBtn.style.display='block'
    }
  }, 1000);
}
setAudioVideoBtn();
videoBtn.addEventListener("click",function(){
  if(isAudioClicked){
    alert('Audio call is Active')
    return
  }
  audioBtn.style.display='none'
  isVideoClicked=!isVideoClicked
  if(isVideoClicked){
    videoOpened=false;
    countForFrameContent++;
    if(countForFrameContent>1){
      getFrameContent.postMessage('refreshIT',webRtcAddress);
    }
  }
  togglingActive(videoBtn,isVideoClicked)
  activeVideoCall()
})

var countForFrameContent=0;

audioBtn.addEventListener("click",function(){
  videoBtn.style.display='none';
  isAudioClicked=!isAudioClicked
  if(isVideoClicked){
    alert('Video call is Active')
    return
  }
  // alert(isAudioClicked);
  if(isAudioClicked){
    countForFrameContent++;
    activeAudioCall()
    audioOpened = false
    if(countForFrameContent>1){
      getFrameContent.postMessage('refreshIT',webRtcAddress);
    }
  }else{
    deactivateAudioFrame()
    hideTheIframeOnAgentSide()
  }
  togglingActive(audioBtn,isAudioClicked)
})

function hideTheIframeOnAgentSide(){
  connection.session.publish(wamp_prefix+'service.support.agent.'+agentPk, [uid , 'hideTheIframe' ] , {}, {
    acknowledge: true
  }).
  then(function(publication) {
    // alert('maine to bol diya chhupane ko')
  });
}
function hideAudioAndVidoeBtn(){
  videoBtn.style.display='none'
  audioBtn.style.display='none'
}

var isConfirmedToEnd=false;

  exitBtn.addEventListener("click", function() {

    if(isConfirmedToEnd){
      if (feedbackFormOpened) {
        closeSupport.click()
        return
      }
    }else{
      if (confirm("Are you sure you want to end this chat ?")) {
        isConfirmedToEnd=true
          if(getFrameContent!=undefined){
            getFrameContent.postMessage('userleft',webRtcAddress );
          }
            if (threadExist==undefined) {
              return
            }
            endChat();
            hideAudioAndVidoeBtn()
      } else {
        return
      }
    }
  }, false);

  paperPlane.addEventListener("click", function() {
    document.getElementById('inputText').focus()
    sendMessage(inputText.value);
  }, false);

  // document.getElementById('hereg').addEventListener('click',function(e){
  //   alert(e)
  // })


  function messageDiv(message) {

    function timeSince(date) {
      t = date;
      var now = new Date();
      var diff = Math.floor((now - t)/60000)
      if (diff<60) {
        return diff+' Mins';
      }else if (diff>=60 && diff<60*24) {
        return Math.floor(diff/60)+' Hrs';
      }else if (diff>=60*24) {
        return Math.floor(diff/(60*24))+' Days';
      }
    }

    function timeWithDate(date) {
      var abc  = date
      var hours = abc.getHours();
      var minutes = abc.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime
    }



    // setTimeout(function () {
    //   for (var i = 1; i <= msgCount; i++) {
    //     console.log(i,msgCount,"***************");
    //     document.getElementById('attachedFile'+i).addEventListener("click",function(e){
    //       openModal(e.target.src)
    //       alert(msgCount);
    //     },false)
    //   }
    // }, 1000);
    message.timeDate = timeWithDate(new Date(message.created))

    if (message.attachment) {
      setTimeout(function () {
        for (var i = 1; i <= msgCount; i++) {
          document.getElementById('attachedFile'+i).addEventListener("click",function(e){
            openModal(e.target.src)
          },false)
        }
      }, 1000);
      if (message.attachmentType=='image') {
        msgCount++;
        attachedFile = '<img  id="attachedFile'+msgCount+'" src="'+ message.attachment +'" style="width:200px; box-sizing:border-box;">'
      }else if (message.attachmentType=='instructionImage') {
          console.log('instructionImage');
        attachedFile = '<img  src="'+ message.attachment +'" style="width:200px; box-sizing:border-box;">'

      }else if (message.attachmentType=='audio') {
          console.log('audio');
        attachedFile = '<audio style="width:200px; box-sizing:border-box;" src="'+ message.attachment +'" controls></audio>'
      }else if (message.attachmentType=='video') {
          console.log('video');
        attachedFile = '<video width="200" height="180" style="box-sizing:border-box;" src="'+ message.attachment +'" controls></video>'
      }else if (message.attachmentType=='application') {
          console.log('application');
          attachedFile ='<p style="line-height: 1.75; margin:0px 0px 10px; box-sizing:border-box;">  <a style="color:#fff;" href="'+message.attachment+'"> '+message.attachment+' </a></p>'
      }
    }


    if (message.logs==null) {
      if (message.message!=null && message.attachmentType!=null) {
        console.log('youtube link');
        attachedFile = '<iframe width="100%" height="180" style="box-sizing:border-box;" src="'+message.message+'"frameborder="0" allowfullscreen></iframe>'
        var msgDiv =attachedFile
      }else {
        if (message.attachment==null) {
          console.log(message.message.replace(/\n/g,'<br>') , 'FFF');
          console.log(message.message,'GGGGGGGGGGGGGGGGGGGGGGGGGGGG');
          // alert(typeof(message.message))
          var str= message.message
          var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
          var regex = new RegExp(expression);
          var res = str.split(' ');
          var pTag
          res.forEach((r)=>{
            if (r.match(regex)) {
              str=str.replace(r,'<a href="'+r+'" target="_blank">'+r+'</a>')
                pTag='<p style="word-break: break-all !important; font-size:14px; margin:5px 0px; box-sizing:border-box;">'+ str +'</p>'
            }else{
                 pTag='<p style="word-break: break-all !important; font-size:14px; margin:5px 0px; box-sizing:border-box;">'+ str +'</p>'
            }
          })
          msgDiv = pTag
        }else {
          msgDiv = attachedFile
        }

      }
    }else {
    }


    if (message.logs==null) {
      if (!message.sentByAgent) {
        var msgHtml = '<div style="margin : 0px 0px 15px; box-sizing:border-box;">'+
                        '<div style=" clear: both; float:right; background-color:'+ windowColor +'; color:'+fontAndIconColor+';  padding:5px 10px;margin:8px; border-radius:20px 0px 20px 20px; box-sizing:border-box;">'+
                          msgDiv+
                        '</div>'+
                        '<div style="clear: both; float:right; padding:0px 10px; font-size:9px">'+ message.timeDate +'</div>'+
                      '</div>'
        return msgHtml

      }else {
        var msgHtml = '<div style="margin:0px 0px 10px; box-sizing:border-box;" >'+
                  '<div style="clear: both; float:left; background-color:#f6f6f6; padding:5px 10px;margin:8px; border-radius:0px 20px 20px 20px; box-sizing:border-box;">'+
                     msgDiv+
                  '</div> '+
                  '<div style="clear: both; float:left; padding:0px 10px; font-size:9px">'+ message.timeDate +'</div>'+
                '</div> '
        return msgHtml
      }
    }else {
      return ''
    }
  }

  let currentUrl=window.location.href;
setTimeout(function () {
  connection.session.publish(wamp_prefix+'service.support.agent.'+agentPk, [uid , 'UC' , currentUrl] , {}, {
    acknowledge: true
  }).
  then(function(publication) {
    console.log("Published" + "service.support.agent."+agentPk);
  });
}, 4000);

setInterval(function () {
  if(currentUrl!==window.location.href){
    console.log('changed url $$$$$$$$$$$$$$$$$$$$$$$$$$$4');

    currentUrl=window.location.href;
    connection.session.publish(wamp_prefix+'service.support.agent.'+agentPk, [uid , 'UC' , currentUrl] , {}, {
      acknowledge: true
    }).
    then(function(publication) {
      console.log("Published" + "service.support.agent."+agentPk);
    });

  }
}, 5000);


  function pushMessages() {
    for (var i = 0; i < chat.messages.length; i++) {
      var div = document.createElement("div");
      div.setAttribute("id", "herere")
      if (chat.messages[i].message=="first") {
        console.log(firstMessage);
        firstMessage = firstMessage.replaceAll("&lt;",'<')
        firstMessage = firstMessage.replaceAll("&gt;",">")
        firstMessage = firstMessage.replaceAll("<a","<a style="+'color:'+windowColor+';text-decoration:none')
        firstMessage = firstMessage.replaceAll("<li>","<li style='list-style:none'>")
          div.innerHTML = '<div style="margin:0px 0px 10px; box-sizing:border-box;" >'+
                  '<div id="herere" style="clear: both; float:left; background-color:#f6f6f6; padding:5px 10px;margin:8px; border-radius:5px; box-sizing:border-box;font-size:14px">'+
                     firstMessage+
                  '</div> '+
                '</div> '
console.log(firstMessage);
        console.log(div);
        console.log('firstttttttt' , typeof firstMessage);
      }else {
        div.innerHTML = messageDiv(chat.messages[i])
      }
      messageBox.appendChild(div);
    }
    scroll();
  }

  setTimeout(function () {
    pushMessages();
  }, 2000);

  function scroll() {
    setTimeout(function () {
      var id = document.getElementById("chatBox_content");
      id.scrollTop = id.scrollHeight;
    }, 200);
  }

  function onlineAgent() {
    console.log('in onlineAgent######333333333' , agentPk);
    if (agentPk) {
        connection.session.call(wamp_prefix+'service.support.heartbeat.' + agentPk, []).then(
          function (res) {
           console.log("Result:", res);
           isAgentOnline = true;
           onlineStatus.innerHTML = 'Online';
         },
         function (err) {
          console.log("Error:", err);
          isAgentOnline = false;
          onlineStatus.innerHTML = 'Away';
        }
       );
    }
  }


  setTimeout(function(){
    onlineAgent();
  },2000 )

  setInterval(function(){
    onlineAgent();
  },10000 )

  function spying(inputVal) {
    countOnchange = 0;
    console.log('values' , inputVal);
      connection.session.publish(wamp_prefix+'service.support.agent.'+agentPk, [uid , 'T' , inputVal] , {}, {
        acknowledge: true
      }).
      then(function(publication) {
        console.log("Published" + "service.support.agent."+agentPk);
      });
  }


  inputText.addEventListener('keydown', function(evt) {

    if (evt.keyCode==32 || evt.keyCode == 8 || evt.keyCode == 13 ) {
      spying(this.value)
    }
  });



  function sendMessage(inptText) {

    if (inptText.length<=0) {
      return;
    }

    console.log(inptText,'input');

    console.log(uid);
    console.log(getCookie("uid"));
    if (uid!=getCookie("uid")) {
      uid = getCookie("uid");
    }

    console.log(uid);
    console.log(chat.messages.length);

    var youtubeLink = inptText.includes("yout");

    if (youtubeLink) {
      status = "ML";
      link = "https://www.youtube.com/embed/" + inptText.split("v=")[1];

      var dataToSend = {uid: uid , message: link, attachmentType:'youtubeLink' , sentByAgent:false , created: new Date() };
      if (agentPk) {
        console.log('agent pk is pnline',isAgentOnline);
        dataToSend.user = agentPk
        if (!isAgentOnline) {
          console.log('agetn oflineee');
          dataToSend.user = null
        }else {
          dataToSend.user = agentPk
        }
      }
      var message = dataToSend
      dataToSend = JSON.stringify(dataToSend)
    }else {
      status = "M";
      var dataToSend = {uid: uid , message: inptText , sentByAgent:false , created: new Date() };
      console.log(agentPk);
      if (agentPk) {
        console.log('agent pk is pnline',isAgentOnline);
        dataToSend.user = agentPk
        if (!isAgentOnline) {
          console.log('agetn oflineee');
          dataToSend.user = null
        }else {
          dataToSend.user = agentPk
        }
      }
      var message = dataToSend
      dataToSend = JSON.stringify(dataToSend)
    }

    var div = document.createElement("div");
    div.className = "messageOpacity"
    div.innerHTML = messageDiv(message)
    messageBox.appendChild(div);
    scroll();

    chat.messages.push(message);
    inputText.value ='';

    setTimeout(function() {
      console.log(isAgentOnline, ' is agent online..........');

      if (!isAgentOnline) {
        agentName.innerHTML = nameSupport
        var div = document.createElement("div");
        div.id="offlineMessage"

        div.innerHTML =  '<div style="margin:0px 0px 10px; box-sizing:border-box;" >'+
                          '<div style="clear: both; float:left; background-color:#f6f6f6; padding:10px;margin:8px; border-radius:0px 20px 20px 20px; box-sizing:border-box;">'+
                          '<p style="line-height: 1.75; margin:0px 0px 10px; word-wrap: break-word; font-size:14px; box-sizing:border-box;">Sorry we are offline. Please email us your query.</p>'+
                          '<form>'+
                            '<input id="emailAddr" style="width:100%; margin-bottom:8px; box-sizing:border-box;" name="fname" type="text" placeholder="Email.." >'+
                             '<textarea style="width:100%; outline:none;resize:none; box-shadow:none; box-sizing:border-box;" rows="3" placeholder="Type your message here.."></textarea>'+
                             '<button id="sendEmail" type="button" style="margin-top:10px; border:none; margin-left:38%; padding:8px; border-radius:8px; background-color:#286EFA ; color:#fff; text-transform:none; font-size:11px; cursor:pointer;" >'+
                               'Submit'+
                             '</button>'+
                            '</form>'+
                          '</div> '+
                        '</div>'
        scroll();
        }
    }, 4000)


    console.log(dataToSend,'data to send');
    var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 201) {
         console.log('posted successfully');
       }
     };
     xhttp.open('POST', '{{serverAddress}}/api/support/supportChat/', true);
     xhttp.setRequestHeader("Content-type", "application/json");
     xhttp.send(dataToSend);


     var dataToPublish = [uid , status , message ];

     if (threadExist==undefined) {
      var dataToPublish = [uid , status , message , custID ];
      details = getCookie("uidDetails");
      if (details != "") {
        console.log(details);
         dataToPublish.push(JSON.parse(details))
      } else {
        dataToPublish.push(false)
      }

      var dataToSend = JSON.stringify({uid: uid , company: custID});
       var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 201) {
            console.log('posted successfully');
            var data = JSON.parse(this.responseText)
            threadExist=true
            console.log(data , 'data$$$$$$$$$$$$$$$$$$$');
            chatThreadPk = data.pk
            dataToPublish.push(chatThreadPk)
            connection.session.publish(wamp_prefix+'service.support.agent', dataToPublish , {}, {
              acknowledge: true
            }).
            then(function(publication) {
              console.log("Published");
            });
          }
        };
        xhttp.open('POST', '{{serverAddress}}/api/support/chatThread/', true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(dataToSend);
     }else {
       console.log('chat threAD EXIST');
       if (isAgentOnline) {
         console.log('ONLINE' , agentPk);
         connection.session.publish(wamp_prefix+'service.support.agent.'+agentPk, dataToPublish , {}, {
           acknowledge: true
         }).
         then(function(publication) {
           console.log("Published service.support.agent."+agentPk);
         }).catch(function(){
           // alert('error aa gya')
         });
       }else {
         console.log('offline send to all');
         connection.session.publish(wamp_prefix+'service.support.agent', dataToPublish , {}, {
           acknowledge: true
         }).
         then(function(publication) {
           console.log("Published");
         }).catch(function(){
           // alert('error aa gya message send krne me')
         });
       }
       console.log('chat thread exist');
     }
  }

  paperClip.addEventListener("click", function() {
    filePicker.click();
  }, false);

  function sendFile() {

    status = "MF";


    if (uid!=getCookie("uid")) {
      uid = getCookie("uid");
    }

    var file = filePicker;
    console.log(file.files[0],'typpppppppppppppppppppppp' );


    console.log(chat.messages.length);

    var fd = new FormData();
    fd.append('uid', uid);
    fd.append('attachment', file.files[0]);
    fd.append('attachmentType' , file.files[0].type.split('/')[0] )

    if (agentPk) {
      fd.append('user' , agentPk)
    }

     var xhttp = new XMLHttpRequest();


      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {
          console.log(this.responseText);
          var data = JSON.parse(this.responseText)
          filePk = data.pk

          var typ = file.files[0].type.split('/')[0]
          console.log(typ);

          var fileData = {
            filePk : data.pk,
            typ : data.attachmentType
          }


          if (agentPk) {
            console.log('agent pk is pnline',isAgentOnline);
            fileData.user = agentPk;
            if (!isAgentOnline) {
              console.log('agetn oflineee');
              fileData.user = null
            }else {
              fileData.user = agentPk;
            }
          }

          var div = document.createElement("div");
          div.innerHTML = messageDiv(data)
          messageBox.appendChild(div);
          scroll();
          chat.messages.push(data);
          filePicker.value = ""
          var dataToPublish = [uid , status , fileData];
          if (threadExist==undefined) {
            var dataToPublish = [uid , status , fileData , custID ];
            details = getCookie("uidDetails");
            if (details != "") {
              console.log(details);
               dataToPublish.push(JSON.parse(details))
            } else {
              dataToPublish.push(false)
            }
            var dataToSend = JSON.stringify({uid: uid , company: custID});
            var xhttp = new XMLHttpRequest();
             xhttp.onreadystatechange = function() {
               if (this.readyState == 4 && this.status == 201) {
                 console.log('posted successfully');
                 threadExist=true
                 console.log(data , 'data$$$$$$$$$$$$$$$$$$$');
                 chatThreadPk = data.pk
                 dataToPublish.push(chatThreadPk)

                 connection.session.publish(wamp_prefix+'service.support.agent', dataToPublish, {}, {
                   acknowledge: true
                 }).
                 then(function(publication) {
                   console.log("Published");
                 });
               }
             };
             xhttp.open('POST', '{{serverAddress}}/api/support/chatThread/', true);
             xhttp.setRequestHeader("Content-type", "application/json");
             xhttp.send(dataToSend);
          }else {
            console.log('chat threAD EXIST');
            if (isAgentOnline) {
              console.log('ONLINE' , agentPk);
              connection.session.publish(wamp_prefix+'service.support.agent.'+agentPk, dataToPublish , {}, {
                acknowledge: true
              }).
              then(function(publication) {
                console.log("Published");
              });
            }else {
              console.log('offline send to all');
              connection.session.publish(wamp_prefix+'service.support.agent', dataToPublish , {}, {
                acknowledge: true
              }).
              then(function(publication) {
                console.log("Published");
              });
            }
            console.log('chat thread exist');
          }

        }
      };
      xhttp.open('POST', '{{serverAddress}}/api/support/supportChat/', true);
      xhttp.send(fd);

  }


  filePicker.onchange = function(e) {
    var file = filePicker;
    sendFile();
  }

  chatCircle.addEventListener("click", openChat , false);

var chathasOpenedOnce=false;

setTimeout(function () {
  if(!chathasOpenedOnce){
    chatSuggestionBar.style.display="block"
  }
}, 10000);

var chatSuggestionBar= document.getElementById('chatSuggestionBar')
chatSuggestionBar.style.display="none"

  function openChat() {
    chathasOpenedOnce=true;
    chatSuggestionBar.style.display="none"
    chatOpen = !chatOpen
    setCookie("chatOpenCookie", chatOpen, 365);

    if (chatOpen) {
      supportCircle.style.display = "none";

      if (serviceCount==1) {
        console.log('coming heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
        singleService.style.display = "none";
      }

      if (feedbackFormOpened) {
        startNewChatBtn.style.display = "block";
        messageComposer.style.display = "none";
      }

      console.log('oddddd' , device);

      if (device=='sm') {
        document.getElementsByTagName("BODY")[0].style.overflowY = "hidden";
      }else {
        document.getElementsByTagName("BODY")[0].style.overflowY = "";
      }
      closeSupport.style.display = "";
      unreadMsgCount = 0;
      chatBox.style.animation = ""
      chatBox.style.display = "block";
      messageBox.style.animation = "moveInLeft 3s ease-out"
      closeSupport.style.animation = "rotateAnti 0.4s"
    }else {
      document.getElementsByTagName("BODY")[0].style.overflowY = "";
    }
  }

  closeSupport.addEventListener("click", function() {
    // if(isConfirmedToEnd){
    //   connection.session.unsubscribe(subs).then(
    //     function (gone) {
    //       alert('unsubscrribed')
    //     },
    //     function (err) {
    //       console.log("failed to subscribed: " + err);
    //     }
    //   );
    // }

    endOfConversation();

    if (chatOpen) {
      chatOpen = !chatOpen
      setCookie("chatOpenCookie", chatOpen, 365);
      console.log('coming here.');
      messageBox.style.animation = ""
      if (serviceCount==1) {
        supportCircle.style.display = "none";
        singleService.style.display = "";
      }else {
        supportCircle.style.display = "";
      }
      chatBox.style.animation = "moveInDown 0.4s ease-out"
      closeSupport.style.display = "none";
      closeSupport.style.animation = "";
      setTimeout(function () {
        chatBox.style.display = "none";
      }, 400);
    }

  }, false);

  closeIcon.addEventListener("click", function() {
    //top close icon display only in smaller screen
    if (chatOpen) {
      chatOpen = !chatOpen
      setCookie("chatOpenCookie", chatOpen, 365);
      console.log('coming here.');
      messageBox.style.animation = ""
      if (serviceCount==1) {
        supportCircle.style.display = "none";
        singleService.style.display = "";
      }else {
        supportCircle.style.display = "";
      }
      chatBox.style.animation = "moveInDown 0.4s ease-out"
      closeSupport.style.display = "none";
      closeSupport.style.animation = "";
      setTimeout(function () {
        chatBox.style.display = "none";
      }, 400);
      if (device=='sm') {
        document.getElementsByTagName("BODY")[0].style.overflowY = "";
      }
    }
  } , false);

function lgDevice(x) {
    if (x.matches) {
    device = 'lg'
    document.getElementsByTagName("BODY")[0].style.overflowY = "";
  }
}

function smDevice(x) {
  if (x.matches) {
    device = 'sm'
    if (chatOpen) {
       document.getElementsByTagName("BODY")[0].style.overflowY = "hidden";
     }else {
        document.getElementsByTagName("BODY")[0].style.overflowY = "";
     }
   }
}

var sm = window.matchMedia("(max-width: 600px)")
smDevice(sm) // Call listener function at run time
sm.addListener(smDevice) // Attach listener function on state changes

var lg = window.matchMedia("(min-width: 600px)")
lgDevice(lg)
lg.addListener(lgDevice)



  });

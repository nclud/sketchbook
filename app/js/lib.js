/*!
 * imagesLoaded PACKAGED v3.0.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function(){"use strict";function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var i=e.prototype;i.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},i.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},i.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},i.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},i.on=n("addListener"),i.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},i.once=n("addOnceListener"),i.defineEvent=function(e){return this.getListeners(e),this},i.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},i.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},i.off=n("removeListener"),i.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},i.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},i.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},i.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},i.removeAllListeners=n("removeEvent"),i.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],n.once===!0&&this.removeListener(e,n.listener),o=n.listener.apply(this,t||[]),o===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},i.trigger=n("emitEvent"),i.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},i.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},"function"==typeof define&&define.amd?define(function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){"use strict";var t=document.documentElement,n=function(){};t.addEventListener?n=function(e,t,n){e.addEventListener(t,n,!1)}:t.attachEvent&&(n=function(t,n,i){t[n+i]=i.handleEvent?function(){var t=e.event;t.target=t.target||t.srcElement,i.handleEvent.call(i,t)}:function(){var n=e.event;n.target=n.target||n.srcElement,i.call(t,n)},t.attachEvent("on"+n,t[n+i])});var i=function(){};t.removeEventListener?i=function(e,t,n){e.removeEventListener(t,n,!1)}:t.detachEvent&&(i=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var r={bind:n,unbind:i};"function"==typeof define&&define.amd?define(r):e.eventie=r}(this),function(e){"use strict";function t(e,t){for(var n in t)e[n]=t[n];return e}function n(e){return"[object Array]"===c.call(e)}function i(e){var t=[];if(n(e))t=e;else if("number"==typeof e.length)for(var i=0,r=e.length;r>i;i++)t.push(e[i]);else t.push(e);return t}function r(e,n){function r(e,n,s){if(!(this instanceof r))return new r(e,n);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=i(e),this.options=t({},this.options),"function"==typeof n?s=n:t(this.options,n),s&&this.on("always",s),this.getImages(),o&&(this.jqDeferred=new o.Deferred);var a=this;setTimeout(function(){a.check()})}function c(e){this.img=e}r.prototype=new e,r.prototype.options={},r.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);for(var i=n.querySelectorAll("img"),r=0,o=i.length;o>r;r++){var s=i[r];this.addImage(s)}}},r.prototype.addImage=function(e){var t=new c(e);this.images.push(t)},r.prototype.check=function(){function e(e,r){return t.options.debug&&a&&s.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},r.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify(t,e)})},r.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},o&&(o.fn.imagesLoaded=function(e,t){var n=new r(this,e,t);return n.jqDeferred.promise(o(this))});var f={};return c.prototype=new e,c.prototype.check=function(){var e=f[this.img.src];if(e)return this.useCached(e),void 0;if(f[this.img.src]=this,this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this.proxyImage=new Image;n.bind(t,"load",this),n.bind(t,"error",this),t.src=this.img.src},c.prototype.useCached=function(e){if(e.isConfirmed)this.confirm(e.isLoaded,"cached was confirmed");else{var t=this;e.on("confirm",function(e){return t.confirm(e.isLoaded,"cache emitted confirmed"),!0})}},c.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},c.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},c.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindProxyEvents()},c.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindProxyEvents()},c.prototype.unbindProxyEvents=function(){n.unbind(this.proxyImage,"load",this),n.unbind(this.proxyImage,"error",this)},r}var o=e.jQuery,s=e.console,a=s!==void 0,c=Object.prototype.toString;"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],r):e.imagesLoaded=r(e.EventEmitter,e.eventie)}(window);

/*
 Copyright (c) 2009-2013 Petr Vostrel (http://petr.vostrel.cz/)
 Licensed under the MIT License (LICENSE.txt).

 jQuery Reel
 http://reel360.org
 Version: 1.3.0
 Updated: 2013-11-04

 Requires jQuery 1.6.2 or higher
*/
(function(k){var U=typeof define=="function"&&define.amd&&(define(["jquery"],k)||true),X=!U&&typeof module=="object"&&typeof module.exports=="object"&&(module.exports=k);!U&&!X&&k()})(function(){return jQuery.reel||function(k,U,X,s){function Bc(f){return n.instances.push(f[0])&&f}function Cc(f){return(n.instances=n.instances.not(Ca(f.attr(ka))))&&f}function Y(f){return n.instances.first().data(f)}function Dc(f){return"data:image/gif;base64,R0lGODlh"+f}function V(f){return"<"+f+"/>"}function x(f){return"."+
(f||"")}function Va(f){return f.replace(Da,n.cdn)}function Ea(f){return"url('"+$b(f)+"')"}function ac(f,j){return typeof j==tb?j[f]:j}function Fa(f,j,o){return ub(f,Ga(j,o))}function Ha(f,j){return H(f)*(j?-1:1)}function Wa(f){return f.touch||f.originalEvent.touches&&f.originalEvent.touches[0]||f}function vb(f){return f.originalEvent}function y(f){return f===s?0:typeof f==wb?f:f+"px"}function Ca(f){return"#"+f}function bc(f,j,o){for(;f.length<j;)f=o+f;return f}function xb(f){return bc(f,2,"0")}function $b(f){return encodeURI(decodeURI(f))}
function yb(f){return n.re.array.exec(f)?f.split(n.re.array):f}function Ec(f){return!f.parents(zb).length}function cc(f){return typeof f==wb?f:k.each(f,function(j,o){f[j]=o?+o:s})}function Ab(f){try{console.error("[ Reel ] "+f)}catch(j){}}if(k){var Z=k&&k().jquery.split(/\./);if(!Z||+(xb(Z[0])+xb(Z[1])+xb(Z[2]||""))<10602)return Ab("Too old jQuery library. Please upgrade your jQuery to version 1.6.2 or higher");var n=k.reel={version:"1.3.0",def:{frame:1,frames:36,loops:true,clickfree:false,draggable:true,
scrollable:true,steppable:true,throwable:true,wheelable:true,orientable:false,cw:false,revolution:s,stitched:0,directional:false,row:1,rows:0,rowlock:false,framelock:false,orbital:0,vertical:false,inversed:false,footage:6,spacing:0,horizontal:true,suffix:"-reel",image:s,images:"",path:"",preload:"fidelity",shy:false,speed:0,delay:0,timeout:2,duration:s,rebound:0.5,entry:s,opening:0,brake:0.23,velocity:0,tempo:36,laziness:6,cursor:s,hint:"",indicator:0,klass:"",preloader:2,area:s,attr:{},annotations:s,
responsive:false,graph:s,monitor:s},scan:function(){return k(x(z)+":not("+x(Bb)+" > "+x(z)+")").each(function(f,j){f=k(j);j=f.data();j.images=yb(j.images);var o={};k(x(dc)+"[data-for="+f.attr(ka)+"]").each(function(t,r){t=k(r);r=t.data();r.x=cc(yb(r.x));r.y=cc(yb(r.y));var g=t.attr(ka);r.node=t.removeData();o[g]=r});j.annotations=o;f.removeData().reel(j)})},fn:{reel:function(){var f=arguments,j=k(this),o=j.data(),t=f[0]||{},r=f[1];if(typeof t!="object")if(t.slice(0,1)==":")return j.trigger(t.slice(1),
r);else if(f.length==1)return o[t];else{if(r!==s){n.normal[t]&&(r=n.normal[t](r,o));if(o[t]===s)o[t]=r;else if(o[t]!==r)j.trigger(t+"Change",[s,o[t]=r])}return j}else{var g=k.extend({},n.def,t),K=[];j.filter(Xa).unreel().filter(function(){var h=k(this),e=g.attr,a=e.src||h.attr(ra),I=e.width||h.attr(L)||h.width();h=e.height||h.attr(D)||h.height();if(!a)return Ab("`src` attribute missing on target image");if(!I||!h)return Ab("Dimension(s) of the target image unknown");return true}).each(function(){var h=
k(this),e=function(c,d){return h.reel(c,d)&&a(c)},a=function(c){return h.data(c)},I={setup:function(){if(!(h.hasClass(z)&&h.parent().hasClass(Bb))){e(Ia,g);var c={src:h.attr(ra),width:h.attr(D)||null,height:h.attr(L)||null,style:h.attr($)||null,"class":h.attr(ec)||null},d=h.attr(g.attr).attr(ra),b=e(ka,h.attr(ka)||h.attr(ka,z+"-"+ +new Date).attr(ka)),i=k.extend({},h.data()),p=e(aa,g.images||[]),m=e(W,g.stitched),l=!p.length||m;l=e(Ya,g.responsive&&(Fc?true:!l));var q=e(fc,{}),u=g.loops,v=g.orbital,
E=g.revolution,ba=g.rows,ca=e(sa,Ga(g.footage,g.frames));e(Za,g.spacing);var Cb=e(D,+h.attr(D)||h.width()),Db=e(L,+h.attr(L)||h.height()),Gc=e(Ja,g.shy),gc=e(O,v&&ca||ba<=1&&p.length||g.frames),Hc=ba>1||v;e(Ka,ac("x",E)||m/2||Cb*2);e(Eb,!Hc?0:ac("y",E)||(ba>3?Db:Db/(5-ba)));ba=m?1:la(gc/ca);e(Fb,m-(u?0:Cb));e($a,0);b=Ca(b+g.suffix);u=h.attr(ec);u=!u?P:u+A;u=k(V(ta),{id:b.substr(1),"class":u+A+Bb+A+hc+"0"});u=h.wrap(u.addClass(g.klass)).addClass(z);K.push(Bc(u)[0]);u=u.parent().bind(I.instance);e(Gb,
p.length?P:g.image||d.replace(n.re.image,"$1"+g.suffix+".$2"));e(ab,k(V(ta),{"class":Hb}).appendTo("body"));e(La,k());e(ic,[]);e(J,null);e(B,null);e(Q,g.row);e(ua,0);e(Ib,ba);e(jc,g.rowlock);e(kc,g.framelock);e(bb,e(Ma,e(cb,0)));e(db,1/gc);e(lc,b);e(M,e(va,g.speed)<0);e(Na,false);e(ma,0);e(wa,g.vertical);e(da,0);e(xa,Ha(1,!g.cw&&!m));e(eb,{});e(ea,false);e(fb,e(Jb,0));e(gb,e(hb,0));e(Oa,false);e(Kb,false);e(fa,false);e(mc,g.brake);e(Lb,!!v);e(ga,g.tempo/(n.lazy?g.laziness:1));e(ya,-1);e(ib,-1);e(Pa,
g.annotations||u.unbind(x(Pa))&&{});e(Mb,1);e(nc,{attr:c,data:i});g.steppable||u.unbind("up.steppable");g.indicator||u.unbind(".indicator");C(P,{overflow:Nb,position:"relative"});l||C(P,{width:Cb,height:Db});l&&k.each(Ic,function(cd,oc){q[oc]=a(oc)});C(na+A+x(z),{display:Ob});C(x(Hb),{position:"fixed",left:y(-100),top:y(-100)},true);C(x(Hb)+A+Xa,{position:Qa,width:10,height:10},true);ha.bind(I.pool);h.trigger(Gc?"prepare":"setup")}},instance:{teardown:function(){var c=h.data(nc);h.parent().unbind(I.instance);
if(a(Ja))h.parent().unbind(jb,ia);else a($).remove()&&a(La).unbind(F);a(ab).empty();clearTimeout(Pb);clearTimeout(Qb);k(U).unbind(pc,qc);k(U).unbind(F);ha.unbind(I.pool);oa.unbind(ja);h.siblings().unbind(F).remove();kb();h.removeAttr("onloaded");Cc(h.unbind(F).removeData().unwrap().attr(c.attr).data(c.data));h.attr($)==P&&h.removeAttr($)},setup:function(){function c(q){return h.trigger("down",[Wa(q).clientX,Wa(q).clientY,q])&&q.give}function d(q,u){return!u||h.trigger("wheel",[u,q])&&q.give}var b=
h.parent().append(za()),i=e(La,k(g.area||b)),p=g.rows>1,m=g.cursor,l=m==rc?Jc:m||Kc;m=m==rc?Lc+A+"!important":s;C(A+x(z),{MozUserSelect:lb,WebkitUserSelect:lb,MozTransform:"translateZ(0)"});h.unbind(jb,ia);i.bind(Mc,c).bind(g.clickfree?Nc:Oc,c).bind(g.wheelable?Pc:null,d).bind(Qc,function(){return false});C(P,{cursor:Va(l)});C(x(Rb),{cursor:"wait"});C(x(mb)+na+x(mb)+" *",{cursor:Va(m||l)},true);if(a(Ya)){C(A+x(z),{width:"100%",height:Sb});k(U).bind(pc,qc)}g.hint&&i.attr("title",g.hint);g.indicator&&
b.append(Ra("x"));p&&g.indicator&&b.append(Ra("y"));g.monitor&&b.append(sc=k(V(ta),{"class":tc}))&&C(A+x(tc),{position:Qa,left:0,top:0})},preload:function(){function c(){var q=l.children(":not([src]):first");return q.attr(ra,q.data(ra))}var d=h.parent(),b=a(aa),i=!b.length,p=n.preload[g.preload]||n.preload[n.def.preload];b=i?[a(Gb)]:p(b.slice(0),g,a);e(da,i?0.5:0);var m=0,l=a(ab).empty();i=[];d.addClass(Rb);e($,a($)||k("<"+$+' type="text/css">'+C.rules.join("\n")+"</"+$+">").prependTo(Tb));e(Na,true);
h.trigger("stop");g.responsive&&Ub();for(h.trigger("resize",true);b.length;){p=n.substitute(g.path+b.shift(),a);k(V(Xa)).data(ra,p).appendTo(l).bind("load error abort",function(q){q.type!="load"&&h.trigger(q.type);return!Ec(d)&&h.trigger("preloaded")&&c()&&false});i.push(p)}setTimeout(function(){for(;++m<n.concurrent_requests;)c()},0);e(ic,i);e(Ja,false)},preloaded:function(){var c=a(aa).length||1,d=e(da,Ga(a(da)+1,c));d===1&&h.trigger("frameChange",[s,a(J)]);if(d===c){h.parent().removeClass(Rb);
h.trigger("loaded")}},loaded:function(){a(aa).length>1||h.css({backgroundImage:Ea(n.substitute(g.path+a(Gb),a))}).attr({src:Va(uc)});a(W)&&h.attr({src:Va(uc)});a(Kb)||e(ma,g.velocity||0);e(Na,false);pa=true},prepare:function(){h.css("display",Ob).parent().one(jb,ia)},opening:function(){if(!g.opening)return h.trigger("openingDone");e(fa,true);e(Vb,!a(va));var c=g.entry||g.speed,d=a(B),b=g.opening;e(B,d-c*b);e(ya,la(b*Y(ga)))},openingDone:function(){function c(b){return h.trigger("orient",[vb(b).alpha,
vb(b).beta,vb(b).gamma,b])&&b.give}e(Sa,false);e(fa,false);var d=nb+x(fa);ha.unbind(d,I.pool[d]);g.orientable&&k(U).bind(Rc,c);if(g.delay>0)Pb=setTimeout(function(){h.trigger("play")},g.delay*1E3);else h.trigger("play")},play:function(c,d){d=d?e(va,d):a(va)*Ha(1,a(M));(c=g.duration)&&e(ib,la(c*Y(ga)));e(M,d<0);d=e(Sa,!!d);e(Vb,!d);Aa()},reach:function(c,d,b){if(d!=a(J)){c=a(O);e(Q,la(d/c));var i=e(bb,a(J));d=e(Ma,d);d=e(cb,n.math.distance(i,d,c));b=H(b||a(va))*Ha(1,d<0);h.trigger("play",b)}},pause:function(){w()},
stop:function(){var c=e(Vb,true);e(Sa,!c)},down:function(c,d,b,i){function p(l){return h.trigger("pan",[Wa(l).clientX,Wa(l).clientY,l])&&l.give}function m(l){return h.trigger("up",[l])&&l.give}if(!(!g.clickfree&&i&&i.button!==s&&i.button!=Sc))if(g.draggable){e(ea,a(J));c=g.clickfree;e(ma,0);i=c?a(La):oa;ob=pb(a(Ka),d,b);w();kb();G=0;k(zb,oa).addClass(mb);i.bind(Tc+A+Uc,p).bind(Vc+A+Wc,m).bind(c?Xc:Yc,m)}},up:function(){e(ea,false);e(Oa,false);var c=g.throwable,d=H(Ta[0]+Ta[1])/60;N=e(ma,!c?0:c===
true?d:Ga(c,d))?1:0;w();kb();k(zb,oa).removeClass(mb);(g.clickfree?a(La):oa).unbind(ja)},pan:function(c,d,b,i){if(g.draggable&&Ua){Ua=false;w();c=g.rows;var p=g.orbital,m=!a(Oa)&&c<=1&&!p&&g.scrollable,l={x:d-ob.x,y:b-ob.y},q={x:H(l.x),y:H(l.y)};if(i&&m&&q.x<q.y)return i.give=true;if(q.x>0||q.y>0){i&&(i.give=false);G=ub(q.x,q.y);ob={x:d,y:b};i=a(Ka);m=a(eb);q=a(wa);if(!a(kc)){var u=e(B,vc(q?b-m.y:d-m.x,a(fb),i,a(gb),a(hb),a(xa),q?b-m.y:d-m.x));e(Oa,a(Oa)||a(J)!=a(ea));(l=wc(q?l.y:l.x||0))&&e(M,l<
0)}if(p&&a(Lb)){e(wa,H(b-m.y)>H(d-m.x));m=pb(i,d,b)}if(c>1&&!a(jc)){c=a(Eb);p=a(Jb);l=-p*c;e(ua,n.math.envelope(b-m.y,p,c,l,l+c,-1))}!(u%1)&&!g.loops&&pb(i,d,b)}}},wheel:function(c,d,b){if(d){qb=true;c=la(qa.sqrt(H(d))/2);c=Ha(c,d>0);d=0.0833*a(Ka);pb(d);c&&e(M,c<0);e(ma,0);e(B,vc(c,a(fb),d,a(gb),a(hb),a(xa)));b&&b.preventDefault();b&&(b.give=false);w();h.trigger("up",[b])}},orient:function(c,d){if(!(!Ua||R)){xc=true;c=d/360;fraction=e(B,+(g.stitched||g.cw?1-c:c).toFixed(2));Ua=false}},fractionChange:function(c,
d,b){if(d===s){c=1+rb(b/a(db));d=g.rows>1;b=g.orbital;e(Lb,!!b&&(c<=b||c>=a(sa)-b+2));if(d)c+=(a(Q)-1)*a(O);e(J,c)}},tierChange:function(c,d,b){if(d===s){c=e(Q,S(Wb(b,1,g.rows)));d=a(O);b=a(J)%d||d;e(J,b+c*d-d)}},rowChange:function(c,d,b){d===s&&Xb(ua,s,b,g.rows)},frameChange:function(c,d,b){if(d===s){this.className=this.className.replace(n.re.frame_klass,hc+b);c=a(O);d=g.rows;var i=g.path,p=b%c||c,m=((b-p)/c+1-1)/(d-1),l=a(Q);!d?a(ua):Xb(ua,m,l,d);var q=Xb(B,s,p,c),u=a(sa);if(g.orbital&&a(wa)){b=
g.inversed?u+1-b:b;b+=u}var v=a(W);c=a(aa);if(!c.length||v){p=a(Za);var E=a(D);m=a(L);if(v){b=e($a,S(Wb(q,0,a(Fb)))%v);d=d<=1?0:(m+p)*(d-l);b=[y(-b),y(-d)];c=c.length>1&&c[l-1];d=n.substitute(i+c,a);c&&h.css("backgroundImage").search(d)<0&&h.css({backgroundImage:Ea(d)})}else{i=g.horizontal;l=b%u-1;l=l<0?u-1:l;b=rb((b-0.1)/u);b+=d>1?0:a(M)?0:!g.directional?0:a(Ib);b=b*((i?m:E)+p);d=l*((i?E:m)+p);b=c.length?[0,0]:i?[y(-d),y(-b)]:[y(-b),y(-d)]}h.css({backgroundPosition:b.join(A)})}else{a(Ya)&&Ub();a(da)&&
h.attr({src:$b(n.substitute(i+c[b-1],a))})}}},"frameChange.reach":function(c,d,b){if(!(!a(Ma)||d!==s)){c=n.math.distance(a(bb),b,a(O));if(H(c)>=H(a(cb))){e(J,e(Ma));e(Ma,e(cb,e(bb,0)));h.trigger("stop")}}},"imageChange imagesChange":function(){h.trigger("preload")},"fractionChange.indicator":function(c,d,b){if(g.indicator&&d===s){c=g.indicator;var i=g.orbital;d=i&&a(wa)?a(L):a(D);i=i?a(sa):g.images.length||a(O);i=la(d/i);d-=i;b=S(Wb(b,0,d));b=!g.cw||a(W)?b:d-b;Ra.$x.css(a(wa)?{left:0,top:y(b),bottom:Sb,
width:c,height:i}:{bottom:0,left:y(b),top:Sb,width:i,height:c})}},"tierChange.indicator":function(c,d,b){if(g.rows>1&&g.indicator&&d===s){var i=a(L);c=g.indicator;d=la(i/g.rows);i-=d;b=S(b*i);Ra.$y.css({left:0,top:b,width:c,height:d})}},"setup.annotations":function(){var c=h.parent();k.each(a(Pa),function(d,b){var i=typeof b.node==wb?k(b.node):b.node||{};i=i.jquery?i:k(V(ta),i);i=i.attr({id:d}).addClass(dc);var p=b.image?k(V(Xa),b.image):k(),m=b.link?k(V("a"),b.link).click(function(){h.trigger("up.annotations",
{target:m})}):k();C(Ca(d),{display:lb,position:Qa},true);b.image||b.link&&i.append(m);b.link||b.image&&i.append(p);b.link&&b.image&&i.append(m.append(p));i.appendTo(c)})},"prepare.annotations":function(){k.each(a(Pa),function(c){k(Ca(c)).hide()})},"frameChange.annotations":function(c,d){if(!(!a(da)||d!==s)){var b=a(D),i=a(W),p=a($a);k.each(a(Pa),function(m,l){m=k(Ca(m));var q=l.start||1,u=l.end,v=v||a(J),E=v-1,ba=l.at?l.at[E]=="+":false;E=l.at?E:E-q+1;v=typeof l.x!=tb?l.x:l.x[E];var ca=typeof l.y!=
tb?l.y:l.y[E];l=v!==s&&ca!==s&&(l.at?ba:E>=0&&(!u||E<=u-q));if(i){q=v>i-b&&p>=0&&p<b;v=!(v<b&&p>i-b)?v:v+i;v=!q?v:v-i;v-=p}if(a(Ya)){q=a(Mb);v=v&&v*q;ca=ca&&ca*q}v={display:l?Ob:lb,left:y(v),top:y(ca)};m.css(v)})}},"up.annotations":function(c,d){if(!(G>10||qb)){c=k(d.target);(c.is("a")?c:c.parents("a")).attr("href")&&(G=10)}},"up.steppable":function(){G||qb||h.trigger(a(eb).x-h.offset().left>0.5*a(D)?"stepRight":"stepLeft")},"stepLeft stepRight":function(){w()},stepLeft:function(){e(M,false);e(B,
a(B)-a(db)*a(xa))},stepRight:function(){e(M,true);e(B,a(B)+a(db)*a(xa))},stepUp:function(){e(Q,a(Q)-1)},stepDown:function(){e(Q,a(Q)+1)},resize:function(c,d){if(!(a(Na)&&!d)){var b=a(W),i=a(Za);c=a(L);var p=!a(aa).length||b,m=g.rows||1;b=a(aa).length?!b?s:y(b)+A+y(c):b&&y(b)+A+y((c+i)*m-i)||y((a(D)+i)*a(sa)-i)+A+y((c+i)*a(Ib)*m*(g.directional?2:1)-i);h.css({height:p?y(c):null,backgroundSize:b||null});d||h.trigger("imagesChange")}},"setup.fu":function(){e(J,g.frame+(a(Q)-1)*a(O));h.trigger("preload")},
"wheel.fu":function(){qb=false},"clean.fu":function(){h.trigger("teardown")},"loaded.fu":function(){h.trigger("opening")}},pool:{"tick.reel.preload":function(){if(!(!(pa||a(Na))||a(Ja))){var c=a(D),d=Zc(za.$.css(D)),b=a(aa).length||1,i=S(1/b*a(da)*c);za.$.css({width:d+(i-d)/3+1});if(a(da)===b&&d>c-1){pa=false;za.$.fadeOut(300,function(){za.$.css({opacity:1,width:0})})}}},"tick.reel":function(c){if(!a(Ja)){var d=a(ma),b=Y(ga),i=g.monitor;if(!(!n.intense&&$c())){if(N){d=d-a(mc)/b*N;d=e(ma,d>0.1?d:(N=
R=0))}i&&sc.text(a(i));d&&N++;R&&R++;wc(0);Ua=true;if(R&&!d)return T(c);if(a(ea))return T(c,w());if(!(a(ya)>0)){if(!g.loops&&g.rebound){!R&&!(a(B)%1)?Yb++:(Yb=0);Yb>=g.rebound*1E3/b&&e(M,!a(M))}c=a(xa)*Ha(1,a(M));b=a(ib);d=(!a(Sa)||xc||!b?d:H(a(va))+d)/Y(ga);e(B,a(B)-d*c);b=!g.duration?b:b>0&&e(ib,b-1);!b&&a(Sa)&&h.trigger("stop")}}}},"tick.reel.opening":function(){if(a(fa)){var c=(g.entry||g.speed)/Y(ga)*(g.cw?-1:1),d=e(ya,a(ya)-1);e(B,a(B)+c);d||h.trigger("openingDone")}}}},pa=false,T=function(c,
d){return c.stopImmediatePropagation()||d},ia=function(){h.trigger("setup")},R,N=0,Aa=function(){return R=0},w=function(){clearTimeout(Pb);ha.unbind(nb+x(fa),I.pool[nb+x(fa)]);e(ya,0);e(Kb,true);return R=-g.timeout*Y(ga)},G=0,qb=false,xc=false,sc=k(),za=function(){C(A+x(yc),{position:Qa,left:0,bottom:0,height:g.preloader,overflow:Nb,backgroundColor:"#000"});return za.$=k(V(ta),{"class":yc})},Ra=function(c){C(A+x(zc)+x(c),{position:Qa,width:0,height:0,overflow:Nb,backgroundColor:"#000"});return Ra["$"+
c]=k(V(ta),{"class":zc+A+c})},C=function(c,d,b){function i(p){var m=[];k.each(p,function(l,q){m.push(l.replace(/([A-Z])/g,"-$1").toLowerCase()+":"+y(q)+";")});return"{"+m.join(P)+"}"}b=b?P:a(lc);c=c.replace(/^/,b).replace(na,na+b);return C.rules.push(c+i(d))&&d},$c=function(){var c=a(L),d=a(D),b=h[0].getBoundingClientRect();return b.top<-c||b.left<-d||b.right>d+k(U).width()||b.bottom>c+k(U).height()},Yb=0,ob={x:0,y:0},wc=function(c){return Ta.push(c)&&Ta.shift()&&c},kb=function(){return Ta=[0,0]},
Ta=kb(),vc=g.graph||n.math[g.loops?"hatch":"envelope"],qc=function(){clearTimeout(Qb);Qb=setTimeout(Ub,n.resize_gauge)},Ub=function(){if(h.width()!=a(D)){var c=a(fc),d=e(Mb,h.width()/c.width);k.each(c,function(b,i){e(b,S(i*d))});h.trigger("resize")}},Pb,Qb,pb=function(c,d,b){var i=e(fb,a(B));e(Jb,a(ua));var p=g.loops;e(gb,p?0:-i*c);e(hb,p?c:c-i*c);return d!==s&&e(eb,{x:d,y:b})||s},Ua=true,Xb=function(c,d,b,i){if(i){var p=a(c)||0;b=d!==s?d:(b-1)/(i-1);b=c!=B?b:Ga(b,0.9999);return d=+H(p-b).toFixed(8)>=
+(1/(i-1)).toFixed(8)?e(c,b):d||p}},oa=ha;try{if(ha[0]!=top.document)oa=ha.add(top.document)}catch(dd){}top===self?k():function(c){k("iframe",oa.last()).each(function(){try{if(k(this).contents().find(Tb).html()==k(Tb).html())return(c=k(this))&&false}catch(d){}});return c}();C.rules=[];I.setup()});sb=sb||function h(){var e=+new Date,a=Y(ga);if(!a)return sb=null;ha.trigger(nb);n.cost=(+new Date+n.cost-e)/2;return sb=setTimeout(h,ub(4,1E3/a-n.cost))}();return k(K)}},unreel:function(){return this.trigger("teardown")}},
re:{image:/^(.*)\.(jpg|jpeg|png|gif)\??.*$/i,ua:[/(msie|opera|firefox|chrome|safari)[ \/:]([\d.]+)/i,/(webkit)\/([\d.]+)/i,/(mozilla)\/([\d.]+)/i],array:/ *, */,lazy_agent:/\(iphone|ipod|android|fennec|blackberry/i,frame_klass:/frame-\d+/,substitution:/(@([A-Z]))/g,no_match:/^(undefined|)$/,sequence:/(^[^#|]*([#]+)[^#|]*)($|[|]([0-9]+)\.\.([0-9]+))($|[|]([0-9]+)$)/},cdn:"http://code.vostrel.net/",math:{envelope:function(f,j,o,t,r,g){return j+Fa(t,r,-f*g)/o},hatch:function(f,j,o,t,r,g){f=(f<t?r:0)+
f%r;f=j+-f*g/o;return f-rb(f)},interpolate:function(f,j,o){return j+f*(o-j)},distance:function(f,j,o){var t=o/2;f=j-f;return f<-t?f+o:f>t?f-o:f}},preload:{fidelity:function(f,j,o){function t(e,a,I){function pa(G){for(;!(G>=1&&G<=N);)G+=G<1?+N:-N;return h[I+G]||(h[I+G]=!!T.push(G))}if(!e.length)return[];var T=[],ia=4*a,R=j.frame,N=e.length;a=true;for(var Aa=N/ia,w=0;w<ia;w++)pa(R+S(w*Aa));for(;Aa>1;){w=0;ia=T.length;Aa/=2;for(a=!a;w<ia;w++)pa(T[w]+(a?1:-1)*S(Aa))}for(w=0;w<=N;w++)pa(w);for(w=0;w<T.length;w++)T[w]=
e[T[w]-1];return T}var r=j.orbital,g=r?2:j.rows||1,K=r?o(sa):o(O);o=(j.row-1)*K;r=[].concat(f);var h=new Array(f.length+1);f=g<2?[]:r.slice(o,o+K);return t(f,1,o).concat(t(r,g,0))},linear:function(f){return f}},substitute:function(f,j){return f.replace(n.re.substitution,function(o,t,r){return typeof n.substitutes[r]=="function"?n.substitutes[r](j):Ac[r]?j(Ac[r]):t})},substitutes:{T:function(){return+new Date}},normal:{fraction:function(f,j){if(f===null)return f;return j[Ia].loops?f-rb(f):Fa(0,1,f)},
tier:function(f){if(f===null)return f;return Fa(0,1,f)},row:function(f,j){if(f===null)return f;return S(Fa(1,j[Ia].rows,f))},frame:function(f,j){if(f===null)return f;var o=j[Ia];j=j[O]*(o.orbital?2:o.rows||1);f=S(o.loops?f%j||j:Fa(1,j,f));return f<0?f+j:f},images:function(f,j){var o=n.re.sequence.exec(f);return!o?f:n.sequence(o,j[Ia])}},sequence:function(f,j){if(f.length<=1)return j.images;var o=[],t=j.orbital,r=f[1],g=f[2],K=f[4];K=n.re.no_match.test(K+P)?1:+K;var h=t?2:j.rows||1;j=t?j.footage:j.stitched?
1:j.frames;h=+(f[5]||h*j)-K;f=+f[7]||1;for(j=0;j<=h;){o.push(r.replace(g,bc(K+j+P,g.length,"0")));j+=f}return o},instances:k(),leader:Y,resize_gauge:300,concurrent_requests:4,cost:0},ha=k(X);X=navigator.userAgent;var Ba=n.re.ua[0].exec(X)||n.re.ua[1].exec(X)||n.re.ua[2].exec(X);Z=+Ba[2].split(".").slice(0,2).join(".");Ba=Ba[1]=="MSIE";var ad=!(Ba&&Z<8),Fc=!(Ba&&Z<9),sb,z="reel",Bb=z+"-overlay",Hb=z+"-cache",zc=z+"-indicator",yc=z+"-preloader",tc=z+"-monitor",dc=z+"-annotation",mb=z+"-panning",Rb=
z+"-loading",hc="frame-",qa=Math,S=qa.round,rb=qa.floor,la=qa.ceil,Ga=qa.min,ub=qa.max,H=qa.abs,Zc=parseInt,Wb=n.math.interpolate,Pa="annotations",La="area",Sb="auto",nc="backup",M="backwards",db="bit",mc="brake",ab="cache",ic=ab+"d",Lb="center",ec="class",jb="click",ea=jb+"ed",eb=ea+"_location",fb=ea+"_on",Jb=ea+"_tier",xa="cwish",bb="departure",Ma="destination",cb="distance",sa="footage",B="fraction",J="frame",kc="framelock",O="frames",L="height",hb="hi",Nb="hidden",Gb="image",aa="images",gb="lo",
Na="loading",fa="opening",ya=fa+"_ticks",Ia="options",Sa="playing",da="preloaded",Mb="ratio",Oa="reeling",Kb="reeled",Ya="responsive",Ka="revolution",Eb="revolution_y",Q="row",jc="rowlock",Ib="rows",Ja="shy",Za="spacing",va="speed",ra="src",lc="stage",W="stitched",$a=W+"_shift",Fb=W+"_travel",Vb="stopped",$="style",ga="tempo",ib="ticks",ua="tier",fc="truescale",ma="velocity",wa="vertical",D="width",F=x(z),ja=x("pan")+F,Rc="deviceorientation"+F,Qc="dragstart"+F,Oc="mousedown"+F,Nc="mouseenter"+F,Xc=
"mouseleave"+ja,Uc="mousemove"+ja,Yc="mouseup"+ja,Pc="mousewheel"+F,nb="tick"+F,Wc="touchcancel"+ja,Vc="touchend"+ja,Mc="touchstart"+F,Tc="touchmove"+ja,pc="resize"+F,P="",A=" ",na=",",Qa="absolute",Ob="block",Da="@CDN@",ta="div",rc="hand",Tb="head",zb="html",ka="id",Xa="img",Zb="jquery."+z,lb="none",tb="object",wb="string",Ic=[D,L,Za,Ka,Eb,W,$a,Fb],Ac={W:D,H:L},uc=ad?Dc("CAAIAIAAAAAAAAAAACH5BAEAAAAALAAAAAAIAAgAAAIHhI+py+1dAAA7"):Da+"blank.gif",Kc=Ea(Da+Zb+".cur")+na+"move",Jc=Ea(Da+Zb+"-drag.cur")+
na+"move",Lc=Ea(Da+Zb+"-drag-down.cur")+na+"move";n.lazy=n.re.lazy_agent.test(X);var Sc=Ba&&Z<9?1:0,bd=k.cleanData;k.cleanData=function(f){k(f).each(function(){k(this).triggerHandler("clean")});return bd.apply(this,arguments)};k.extend(k.fn,n.fn)&&k(n.scan);return n}}(jQuery,window,document)});
/*
 * Wallpaper v3.0.2 - 2014-01-13
 * A jQuery plugin for smooth-scaling image and video backgrounds. Part of the Formstone Library.
 * http://formstone.it/wallpaper/
 *
 * Copyright 2014 Ben Plum; MIT Licensed
 */

;(function ($, window) {
	"use strict";

	var $window = $(window),
		$body = $("body"),
		nativeSupport = ("backgroundSize" in document.documentElement.style);

	/**
	 * @options
	 * @param autoPlay [boolean] <true> "Autoplay video"
	 * @param hoverPlay [boolean] <false> "Play video on hover"
	 * @param loop [boolean] <true> "Loop video"
	 * @param onLoad [function] <$.noop> "On load callback"
	 * @param onReady [function] <$.noop> "On ready callback"
	 * @param source [string | object] <null> "Source image (string) or video (object)"
	 */
	var options = {
		autoPlay: true,
		hoverPlay: false,
		loop: true,
		onLoad: $.noop,
		onReady: $.noop,
		id: null,
		source: null,
		speed: 500
	};

	/**
	 * @events
	 * @event wallpaper.loaded "Source media loaded"
	 */

	var pub = {

		/**
		 * @method
		 * @name defaults
		 * @description Sets default plugin options
		 * @param opts [object] <{}> "Options object"
		 * @example $.wallpaper("defaults", opts);
		 */
		defaults: function(opts) {
			options = $.extend(options, opts || {});
			return $(this);
		},

		/**
		 * @method
		 * @name destroy
		 * @description Removes instance of plugin
		 * @example $(".target").wallpaper("destroy");
		 */
		destroy: function() {
			var $targets = $(this).each(function() {
				var data = $(this).data("wallpaper");

				data.$target.removeClass("wallpaper")
							.off(".boxer");
				data.$container.remove();
			});

			if ($(".wallpaper").length < 1) {
				$body.removeClass("wallpaper-initialized");
				$window.off(".wallpaper");
			}

			return $targets;
		},

		/**
		 * @method
		 * @name load
		 * @description Loads source media
		 * @param source [string | object] "Source image (string) or video (object)"
		 * @example $(".target").wallpaper("load", "path/to/image.jpg");
		 */
		load: function(source) {
			return $(this).each(function() {
				var data = $(this).data("wallpaper");

				_loadMedia(source, data);
			});
		},

		/**
		 * @method
		 * @name play
		 * @description Plays target video
		 * @example $(".target").wallpaper("play");
		 */
		play: function() {
			return $(this).each(function() {
				var data = $(this).data("wallpaper"),
					$video = data.$container.find("video");

				if ($video.length) {
					$video[0].play();
				}
			});
		},

		/**
		 * @method
		 * @name stop
		 * @description Stops target video
		 * @example $(".target").wallpaper("stop");
		 */
		stop: function() {
			return $(this).each(function() {
				var data = $(this).data("wallpaper"),
					$video = data.$container.find("video");

				if ($video.length) {
					$video[0].pause();
				}
			});
		}
	};

	/**
	 * @method private
	 * @name _init
	 * @description Initializes plugin instances
	 * @param opts [object] "Initialization options"
	 */
	function _init(opts) {
		var data = $.extend({}, options, opts);

		// Apply to each
		var $targets = $(this);
		for (var i = 0, count = $targets.length; i < count; i++) {
			_build.apply($targets.eq(i), [ $.extend({}, data) ]);
		}

		// Global events
		if (!$body.hasClass("wallpaper-initialized")) {
			$body.addClass("wallpaper-initialized");
			$window.on("resize.wallpaper", data, _onResizeAll);
		}

		// Maintain chainability
		return $targets;
	}

	/**
	 * @method private
	 * @name _build
	 * @description Builds each instance
	 * @param data [object] "Instance data"
	 */
	function _build(data) {
		var $target = $(this);
		if (!$target.hasClass("wallpaper")) {
			$.extend(data, $target.data("wallpaper-options"));

			$target.addClass("wallpaper loading")
				   .append('<div class="wallpaper-container"></div>');

			data.isAnimating = false;
			data.$target = $target;
			data.$container = data.$target.find(".wallpaper-container");

			// Bind data & events
			data.$target.data("wallpaper", data)
						.on("resize.wallpaper", data, _onResize);

			var source = data.source;
			data.source = null;

			_loadMedia(source, data);

			data.onReady.call();
		}
	}

	/**
	 * @method private
	 * @name _loadMedia
	 * @description Determines how to handle source media
	 * @param source [string | object] "Source image (string) or video (object)"
	 * @param data [object] "Instance data"
	 */
	function _loadMedia(source, data) {
		// Check if we're animating
		if (!data.isAnimating) {
			// Check if the source is new
			if (data.source !== source) {
				data.$target.addClass("loading");

				data.source = source;
				data.isAnimating = true;

				if (typeof source === "object") {
					_loadVideo(source, data);
				} else {
					_loadImage(source, data);
				}
			} else {
				data.$target.trigger("wallpaper.loaded");
			}
		}
	}

	/**
	 * @method private
	 * @name _loadImage
	 * @description Loads source image
	 * @param source [string] "Source image"
	 * @param data [object] "Instance data"
	 */
	function _loadImage(source, data) {
		var $imgContainer = $('<div class="wallpaper-media wallpaper-image"><img /></div>'),
			$img = $imgContainer.find("img");

		$img.one("load.wallpaper", function() {

			if (nativeSupport) {
				$imgContainer.addClass("native")
							 .css({ backgroundImage: "url(" + data.source + ")" });
			}

			if (data.$container.find(".wallpaper-media").length < 1) {
				// If it's the first image just append it
				$imgContainer.appendTo(data.$container)
							 .animate({ opacity: 1 }, data.speed);
				data.isAnimating = false;
				data.$target.trigger("wallpaper.loaded");
			} else {
				// Otherwise we need to animate it in
				$imgContainer.appendTo(data.$container)
						     .animate({ opacity: 1 }, data.speed, function() {
								 // Remove the old image
								 data.$container.find(".wallpaper-image").not(":last").remove();
								 data.isAnimating = false;
								 data.$target.trigger("wallpaper.loaded");
							 });
			}

			data.$target.removeClass("loading");

			_onResize({ data: data });
			data.onLoad.call();
		}).attr("src", data.source);

		// Check if image is cached
		if ($img[0].complete || $img[0].readyState === 4) {
			$img.trigger("load");
		}
	}

	/**
	 * @method private
	 * @name _loadVideo
	 * @description Loads source video
	 * @param source [object] "Source video"
	 * @param data [object] "Instance data"
	 */
	function _loadVideo(source, data) {
		var $videoContainer = $('<div class="wallpaper-media wallpaper-video"></div>'),
			html = '<video';

		if (data.id) {
			html += ' id="' + data.id + '"';
		}
		if (data.loop) {
			html += ' loop';
		}
		html += '>';
		if (data.source.webm) {
			html += '<source src="' + data.source.webm + '" type="video/webm" />';
		}
		if (data.source.mp4) {
			html += '<source src="' + data.source.mp4 + '" type="video/mp4" />';
		}
		if (data.source.ogg) {
			html += '<source src="' + data.source.ogg + '" type="video/ogg" />';
		}
		html += '</video>';

		$videoContainer.append(html).find("video").one("loadedmetadata", function(e) {
			if (data.$container.find(".wallpaper-media").length < 1) {
				// If it's the first video just append it
				$videoContainer.appendTo(data.$container)
							   .animate({ opacity: 1 }, data.speed);
				data.isAnimating = false;
				data.$target.trigger("wallpaper.loaded");

				if (data.hoverPlay) {
					data.$target.on("mouseover.boxer", pub.play)
								.on("mouseout.boxer", pub.stop);
				} else if (data.autoPlay) {
					this.play();
				}
			} else {
				// Otherwise we need to animate it in
				$videoContainer.appendTo(data.$container)
						       .animate({ opacity: 1 }, data.speed, function() {
								   // Remove the old image
								   data.$container.find(".wallpaper-image").not(":last").remove();
								   data.isAnimating = false;
								   data.$target.trigger("wallpaper.loaded");
							   });
			}

			data.$target.removeClass("loading")
						.trigger("wallpaper.loaded");

			_onResize({ data: data });
			data.onLoad.call();
		});
	}

	/**
	 * @method private
	 * @name _onResize
	 * @description Resize target instance
	 * @param e [object] "Event data"
	 */
	function _onResize(e) {
		if (e.preventDefault) {
			e.preventDefault();
			e.stopPropagation();
		}

		var data = e.data;

		// Target all media
		var $mediaContainers = data.$container.find(".wallpaper-media");

		for (var i = 0, count = $mediaContainers.length; i < count; i++) {
			var $mediaContainer = $mediaContainers.eq(i),
				type = $mediaContainer.find("video").length ? "video" : "image",
				$media = $mediaContainer.find(type);

			// If media found and scaling is not natively support
			if ($media.length && !(type === "image" && data.nativeSupport)) {
				var frameWidth = data.$target.outerWidth(),
					frameHeight = data.$target.outerHeight(),
					frameRatio = frameWidth / frameHeight,
					naturalSize = _naturalSize($media);

				data.width = naturalSize.naturalWidth;
				data.height = naturalSize.naturalHeight;
				data.left = 0;
				data.top = 0;

				var mediaRatio = data.width / data.height;

				// First check the height
				data.height = frameHeight;
				data.width = data.height * mediaRatio;

				// Next check the width
				if (data.width < frameWidth) {
					data.width = frameWidth;
					data.height = data.width / mediaRatio;
				}

				// Position the media
				data.left = -(data.width - frameWidth) / 2;
				data.top = -(data.height - frameHeight) / 2;

				$mediaContainer.css({
					height: data.height,
					width: data.width,
					left: data.left,
					top: data.top
				});
			}
		}
	}

	/**
	 * @method private
	 * @name _onResizeAll
	 * @description Resizes all target instances
	 */
	function _onResizeAll() {
		$(".wallpaper").each(function() {
			var data = $(this).data("wallpaper");
			_onResize({ data: data });
		});
	}

	/**
	 * @method private
	 * @name _naturalSize
	 * @description Determines natural size of target media
	 * @param $media [jQuery object] "Source media object"
	 * @return [object | boolean] "Object containing natural height and width values or false"
	 */
	function _naturalSize($media) {
		if ($media.is("img")) {
			var node = $media[0];

			if (typeof node.naturalHeight !== "undefined") {
				return {
					naturalHeight: node.naturalHeight,
					naturalWidth:  node.naturalWidth
				};
			} else {
				var img = new Image();
				img.src = node.src;
				return {
					naturalHeight: img.height,
					naturalWidth:  img.width
				};
			}
		} else {
			return {
				naturalHeight: $media[0].videoHeight,
				naturalWidth:  $media[0].videoWidth
			};
		}
		return false;
	}

	$.fn.wallpaper = function(method) {
		if (pub[method]) {
			return pub[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return _init.apply(this, arguments);
		}
		return this;
	};

	$.wallpaper = function(method) {
		if (method === "defaults") {
			pub.defaults.apply(this, Array.prototype.slice.call(arguments, 1));
		}
	};
})(jQuery, window);
/* Copyright (c) 2012 HyeonJe Jun (http://github.com/noraesae)
 * Licensed under the MIT License
 */
'use strict';
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {

  // The default settings for the plugin
  var defaultSettings = {
    wheelSpeed: 10,
    wheelPropagation: false,
    minScrollbarLength: null,
    useBothWheelAxes: false,
    useKeyboard: true,
    suppressScrollX: false,
    suppressScrollY: false,
    scrollXMarginOffset: 0,
    scrollYMarginOffset: 0
  };

  var getEventClassName = (function () {
    var incrementingId = 0;
    return function () {
      var id = incrementingId;
      incrementingId += 1;
      return '.perfect-scrollbar-' + id;
    };
  }());

  $.fn.perfectScrollbar = function (suppliedSettings, option) {

    return this.each(function () {
      // Use the default settings
      var settings = $.extend(true, {}, defaultSettings),
          $this = $(this);

      if (typeof suppliedSettings === "object") {
        // But over-ride any supplied
        $.extend(true, settings, suppliedSettings);
      } else {
        // If no settings were supplied, then the first param must be the option
        option = suppliedSettings;
      }

      // Catch options

      if (option === 'update') {
        if ($this.data('perfect-scrollbar-update')) {
          $this.data('perfect-scrollbar-update')();
        }
        return $this;
      }
      else if (option === 'destroy') {
        if ($this.data('perfect-scrollbar-destroy')) {
          $this.data('perfect-scrollbar-destroy')();
        }
        return $this;
      }

      if ($this.data('perfect-scrollbar')) {
        // if there's already perfect-scrollbar
        return $this.data('perfect-scrollbar');
      }


      // Or generate new perfectScrollbar

      // Set class to the container
      $this.addClass('ps-container');

      var $scrollbarXRail = $("<div class='ps-scrollbar-x-rail'></div>").appendTo($this),
          $scrollbarYRail = $("<div class='ps-scrollbar-y-rail'></div>").appendTo($this),
          $scrollbarX = $("<div class='ps-scrollbar-x'></div>").appendTo($scrollbarXRail),
          $scrollbarY = $("<div class='ps-scrollbar-y'></div>").appendTo($scrollbarYRail),
          scrollbarXActive,
          scrollbarYActive,
          containerWidth,
          containerHeight,
          contentWidth,
          contentHeight,
          scrollbarXWidth,
          scrollbarXLeft,
          scrollbarXBottom = parseInt($scrollbarXRail.css('bottom'), 10),
          scrollbarYHeight,
          scrollbarYTop,
          scrollbarYRight = parseInt($scrollbarYRail.css('right'), 10),
          eventClassName = getEventClassName();

      var updateContentScrollTop = function (currentTop, deltaY) {
        var newTop = currentTop + deltaY,
            maxTop = containerHeight - scrollbarYHeight;

        if (newTop < 0) {
          scrollbarYTop = 0;
        }
        else if (newTop > maxTop) {
          scrollbarYTop = maxTop;
        }
        else {
          scrollbarYTop = newTop;
        }

        var scrollTop = parseInt(scrollbarYTop * (contentHeight - containerHeight) / (containerHeight - scrollbarYHeight), 10);
        $this.scrollTop(scrollTop);
        $scrollbarXRail.css({bottom: scrollbarXBottom - scrollTop});
      };

      var updateContentScrollLeft = function (currentLeft, deltaX) {
        var newLeft = currentLeft + deltaX,
            maxLeft = containerWidth - scrollbarXWidth;

        if (newLeft < 0) {
          scrollbarXLeft = 0;
        }
        else if (newLeft > maxLeft) {
          scrollbarXLeft = maxLeft;
        }
        else {
          scrollbarXLeft = newLeft;
        }

        var scrollLeft = parseInt(scrollbarXLeft * (contentWidth - containerWidth) / (containerWidth - scrollbarXWidth), 10);
        $this.scrollLeft(scrollLeft);
        $scrollbarYRail.css({right: scrollbarYRight - scrollLeft});
      };

      var getSettingsAdjustedThumbSize = function (thumbSize) {
        if (settings.minScrollbarLength) {
          thumbSize = Math.max(thumbSize, settings.minScrollbarLength);
        }
        return thumbSize;
      };

      var updateScrollbarCss = function () {
        $scrollbarXRail.css({left: $this.scrollLeft(), bottom: scrollbarXBottom - $this.scrollTop(), width: containerWidth, display: scrollbarXActive ? "inherit": "none"});
        $scrollbarYRail.css({top: $this.scrollTop(), right: scrollbarYRight - $this.scrollLeft(), height: containerHeight, display: scrollbarYActive ? "inherit": "none"});
        $scrollbarX.css({left: scrollbarXLeft, width: scrollbarXWidth});
        $scrollbarY.css({top: scrollbarYTop, height: scrollbarYHeight});
      };

      var updateBarSizeAndPosition = function () {
        containerWidth = $this.width();
        containerHeight = $this.height();
        contentWidth = $this.prop('scrollWidth');
        contentHeight = $this.prop('scrollHeight');

        if (!settings.suppressScrollX && containerWidth + settings.scrollXMarginOffset < contentWidth) {
          scrollbarXActive = true;
          scrollbarXWidth = getSettingsAdjustedThumbSize(parseInt(containerWidth * containerWidth / contentWidth, 10));
          scrollbarXLeft = parseInt($this.scrollLeft() * (containerWidth - scrollbarXWidth) / (contentWidth - containerWidth), 10);
        }
        else {
          scrollbarXActive = false;
          scrollbarXWidth = 0;
          scrollbarXLeft = 0;
          $this.scrollLeft(0);
        }

        if (!settings.suppressScrollY && containerHeight + settings.scrollYMarginOffset < contentHeight) {
          scrollbarYActive = true;
          scrollbarYHeight = getSettingsAdjustedThumbSize(parseInt(containerHeight * containerHeight / contentHeight, 10));
          scrollbarYTop = parseInt($this.scrollTop() * (containerHeight - scrollbarYHeight) / (contentHeight - containerHeight), 10);
        }
        else {
          scrollbarYActive = false;
          scrollbarYHeight = 0;
          scrollbarYTop = 0;
          $this.scrollTop(0);
        }

        if (scrollbarYTop >= containerHeight - scrollbarYHeight) {
          scrollbarYTop = containerHeight - scrollbarYHeight;
        }
        if (scrollbarXLeft >= containerWidth - scrollbarXWidth) {
          scrollbarXLeft = containerWidth - scrollbarXWidth;
        }

        updateScrollbarCss();
      };

      var bindMouseScrollXHandler = function () {
        var currentLeft,
            currentPageX;

        $scrollbarX.bind('mousedown' + eventClassName, function (e) {
          currentPageX = e.pageX;
          currentLeft = $scrollbarX.position().left;
          $scrollbarXRail.addClass('in-scrolling');
          e.stopPropagation();
          e.preventDefault();
        });

        $(document).bind('mousemove' + eventClassName, function (e) {
          if ($scrollbarXRail.hasClass('in-scrolling')) {
            updateContentScrollLeft(currentLeft, e.pageX - currentPageX);
            e.stopPropagation();
            e.preventDefault();
          }
        });

        $(document).bind('mouseup' + eventClassName, function (e) {
          if ($scrollbarXRail.hasClass('in-scrolling')) {
            $scrollbarXRail.removeClass('in-scrolling');
          }
        });

        currentLeft =
        currentPageX = null;
      };

      var bindMouseScrollYHandler = function () {
        var currentTop,
            currentPageY;

        $scrollbarY.bind('mousedown' + eventClassName, function (e) {
          currentPageY = e.pageY;
          currentTop = $scrollbarY.position().top;
          $scrollbarYRail.addClass('in-scrolling');
          e.stopPropagation();
          e.preventDefault();
        });

        $(document).bind('mousemove' + eventClassName, function (e) {
          if ($scrollbarYRail.hasClass('in-scrolling')) {
            updateContentScrollTop(currentTop, e.pageY - currentPageY);
            e.stopPropagation();
            e.preventDefault();
          }
        });

        $(document).bind('mouseup' + eventClassName, function (e) {
          if ($scrollbarYRail.hasClass('in-scrolling')) {
            $scrollbarYRail.removeClass('in-scrolling');
          }
        });

        currentTop =
        currentPageY = null;
      };

      // check if the default scrolling should be prevented.
      var shouldPreventDefault = function (deltaX, deltaY) {
        var scrollTop = $this.scrollTop();
        if (deltaX === 0) {
          if (!scrollbarYActive) {
            return false;
          }
          if ((scrollTop === 0 && deltaY > 0) || (scrollTop >= contentHeight - containerHeight && deltaY < 0)) {
            return !settings.wheelPropagation;
          }
        }

        var scrollLeft = $this.scrollLeft();
        if (deltaY === 0) {
          if (!scrollbarXActive) {
            return false;
          }
          if ((scrollLeft === 0 && deltaX < 0) || (scrollLeft >= contentWidth - containerWidth && deltaX > 0)) {
            return !settings.wheelPropagation;
          }
        }
        return true;
      };

      // bind handlers
      var bindMouseWheelHandler = function () {
        var shouldPrevent = false;
        $this.bind('mousewheel' + eventClassName, function (e, deprecatedDelta, deprecatedDeltaX, deprecatedDeltaY) {
          var deltaX = e.deltaX ? e.deltaX / 10 : deprecatedDeltaX,
              deltaY = e.deltaY ? e.deltaY / 10 : deprecatedDeltaY;

          if (!settings.useBothWheelAxes) {
            // deltaX will only be used for horizontal scrolling and deltaY will
            // only be used for vertical scrolling - this is the default
            $this.scrollTop($this.scrollTop() - (deltaY * settings.wheelSpeed));
            $this.scrollLeft($this.scrollLeft() + (deltaX * settings.wheelSpeed));
          } else if (scrollbarYActive && !scrollbarXActive) {
            // only vertical scrollbar is active and useBothWheelAxes option is
            // active, so let's scroll vertical bar using both mouse wheel axes
            if (deltaY) {
              $this.scrollTop($this.scrollTop() - (deltaY * settings.wheelSpeed));
            } else {
              $this.scrollTop($this.scrollTop() + (deltaX * settings.wheelSpeed));
            }
          } else if (scrollbarXActive && !scrollbarYActive) {
            // useBothWheelAxes and only horizontal bar is active, so use both
            // wheel axes for horizontal bar
            if (deltaX) {
              $this.scrollLeft($this.scrollLeft() + (deltaX * settings.wheelSpeed));
            } else {
              $this.scrollLeft($this.scrollLeft() - (deltaY * settings.wheelSpeed));
            }
          }

          // update bar position
          updateBarSizeAndPosition();

          shouldPrevent = shouldPreventDefault(deltaX, deltaY);
          if (shouldPrevent) {
            e.preventDefault();
          }
        });

        // fix Firefox scroll problem
        $this.bind('MozMousePixelScroll' + eventClassName, function (e) {
          if (shouldPrevent) {
            e.preventDefault();
          }
        });
      };

      var bindKeyboardHandler = function () {
        var hovered = false;
        $this.bind('mouseenter' + eventClassName, function (e) {
          hovered = true;
        });
        $this.bind('mouseleave' + eventClassName, function (e) {
          hovered = false;
        });

        var shouldPrevent = false;
        $(document).bind('keydown' + eventClassName, function (e) {
          if (!hovered) {
            return;
          }

          var deltaX = 0,
              deltaY = 0;

          switch (e.which) {
          case 37: // left
            deltaX = -3;
            break;
          case 38: // up
            deltaY = 3;
            break;
          case 39: // right
            deltaX = 3;
            break;
          case 40: // down
            deltaY = -3;
            break;
          case 33: // page up
            deltaY = 9;
            break;
          case 32: // space bar
          case 34: // page down
            deltaY = -9;
            break;
          case 35: // end
            deltaY = -containerHeight;
            break;
          case 36: // home
            deltaY = containerHeight;
            break;
          default:
            return;
          }

          $this.scrollTop($this.scrollTop() - (deltaY * settings.wheelSpeed));
          $this.scrollLeft($this.scrollLeft() + (deltaX * settings.wheelSpeed));

          shouldPrevent = shouldPreventDefault(deltaX, deltaY);
          if (shouldPrevent) {
            e.preventDefault();
          }
        });
      };

      var bindRailClickHandler = function () {
        var stopPropagation = function (e) { e.stopPropagation(); };

        $scrollbarY.bind('click' + eventClassName, stopPropagation);
        $scrollbarYRail.bind('click' + eventClassName, function (e) {
          var halfOfScrollbarLength = parseInt(scrollbarYHeight / 2, 10),
              positionTop = e.pageY - $scrollbarYRail.offset().top - halfOfScrollbarLength,
              maxPositionTop = containerHeight - scrollbarYHeight,
              positionRatio = positionTop / maxPositionTop;

          if (positionRatio < 0) {
            positionRatio = 0;
          } else if (positionRatio > 1) {
            positionRatio = 1;
          }

          $this.scrollTop((contentHeight - containerHeight) * positionRatio);
        });

        $scrollbarX.bind('click' + eventClassName, stopPropagation);
        $scrollbarXRail.bind('click' + eventClassName, function (e) {
          var halfOfScrollbarLength = parseInt(scrollbarXWidth / 2, 10),
              positionLeft = e.pageX - $scrollbarXRail.offset().left - halfOfScrollbarLength,
              maxPositionLeft = containerWidth - scrollbarXWidth,
              positionRatio = positionLeft / maxPositionLeft;

          if (positionRatio < 0) {
            positionRatio = 0;
          } else if (positionRatio > 1) {
            positionRatio = 1;
          }

          $this.scrollLeft((contentWidth - containerWidth) * positionRatio);
        });
      };

      // bind mobile touch handler
      var bindMobileTouchHandler = function () {
        var applyTouchMove = function (differenceX, differenceY) {
          $this.scrollTop($this.scrollTop() - differenceY);
          $this.scrollLeft($this.scrollLeft() - differenceX);

          // update bar position
          updateBarSizeAndPosition();
        };

        var startCoords = {},
            startTime = 0,
            speed = {},
            breakingProcess = null,
            inGlobalTouch = false;

        $(window).bind("touchstart" + eventClassName, function (e) {
          inGlobalTouch = true;
        });
        $(window).bind("touchend" + eventClassName, function (e) {
          inGlobalTouch = false;
        });

        $this.bind("touchstart" + eventClassName, function (e) {
          var touch = e.originalEvent.targetTouches[0];

          startCoords.pageX = touch.pageX;
          startCoords.pageY = touch.pageY;

          startTime = (new Date()).getTime();

          if (breakingProcess !== null) {
            clearInterval(breakingProcess);
          }

          e.stopPropagation();
        });
        $this.bind("touchmove" + eventClassName, function (e) {
          if (!inGlobalTouch && e.originalEvent.targetTouches.length === 1) {
            var touch = e.originalEvent.targetTouches[0];

            var currentCoords = {};
            currentCoords.pageX = touch.pageX;
            currentCoords.pageY = touch.pageY;

            var differenceX = currentCoords.pageX - startCoords.pageX,
              differenceY = currentCoords.pageY - startCoords.pageY;

            applyTouchMove(differenceX, differenceY);
            startCoords = currentCoords;

            var currentTime = (new Date()).getTime();

            var timeGap = currentTime - startTime;
            if (timeGap > 0) {
              speed.x = differenceX / timeGap;
              speed.y = differenceY / timeGap;
              startTime = currentTime;
            }

            e.preventDefault();
          }
        });
        $this.bind("touchend" + eventClassName, function (e) {
          clearInterval(breakingProcess);
          breakingProcess = setInterval(function () {
            if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
              clearInterval(breakingProcess);
              return;
            }

            applyTouchMove(speed.x * 30, speed.y * 30);

            speed.x *= 0.8;
            speed.y *= 0.8;
          }, 10);
        });
      };

      var bindScrollHandler = function () {
        $this.bind('scroll' + eventClassName, function (e) {
          updateBarSizeAndPosition();
        });
      };

      var destroy = function () {
        $this.unbind(eventClassName);
        $(window).unbind(eventClassName);
        $(document).unbind(eventClassName);
        $this.data('perfect-scrollbar', null);
        $this.data('perfect-scrollbar-update', null);
        $this.data('perfect-scrollbar-destroy', null);
        $scrollbarX.remove();
        $scrollbarY.remove();
        $scrollbarXRail.remove();
        $scrollbarYRail.remove();

        // clean all variables
        $scrollbarX =
        $scrollbarY =
        containerWidth =
        containerHeight =
        contentWidth =
        contentHeight =
        scrollbarXWidth =
        scrollbarXLeft =
        scrollbarXBottom =
        scrollbarYHeight =
        scrollbarYTop =
        scrollbarYRight = null;
      };

      var ieSupport = function (version) {
        $this.addClass('ie').addClass('ie' + version);

        var bindHoverHandlers = function () {
          var mouseenter = function () {
            $(this).addClass('hover');
          };
          var mouseleave = function () {
            $(this).removeClass('hover');
          };
          $this.bind('mouseenter' + eventClassName, mouseenter).bind('mouseleave' + eventClassName, mouseleave);
          $scrollbarXRail.bind('mouseenter' + eventClassName, mouseenter).bind('mouseleave' + eventClassName, mouseleave);
          $scrollbarYRail.bind('mouseenter' + eventClassName, mouseenter).bind('mouseleave' + eventClassName, mouseleave);
          $scrollbarX.bind('mouseenter' + eventClassName, mouseenter).bind('mouseleave' + eventClassName, mouseleave);
          $scrollbarY.bind('mouseenter' + eventClassName, mouseenter).bind('mouseleave' + eventClassName, mouseleave);
        };

        var fixIe6ScrollbarPosition = function () {
          updateScrollbarCss = function () {
            $scrollbarX.css({left: scrollbarXLeft + $this.scrollLeft(), bottom: scrollbarXBottom, width: scrollbarXWidth});
            $scrollbarY.css({top: scrollbarYTop + $this.scrollTop(), right: scrollbarYRight, height: scrollbarYHeight});
            $scrollbarX.hide().show();
            $scrollbarY.hide().show();
          };
        };

        if (version === 6) {
          bindHoverHandlers();
          fixIe6ScrollbarPosition();
        }
      };

      var supportsTouch = (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch);

      var initialize = function () {
        var ieMatch = navigator.userAgent.toLowerCase().match(/(msie) ([\w.]+)/);
        if (ieMatch && ieMatch[1] === 'msie') {
          // must be executed at first, because 'ieSupport' may addClass to the container
          ieSupport(parseInt(ieMatch[2], 10));
        }

        updateBarSizeAndPosition();
        bindScrollHandler();
        bindMouseScrollXHandler();
        bindMouseScrollYHandler();
        bindRailClickHandler();
        if (supportsTouch) {
          bindMobileTouchHandler();
        }
        if ($this.mousewheel) {
          bindMouseWheelHandler();
        }
        if (settings.useKeyboard) {
          bindKeyboardHandler();
        }
        $this.data('perfect-scrollbar', $this);
        $this.data('perfect-scrollbar-update', updateBarSizeAndPosition);
        $this.data('perfect-scrollbar-destroy', destroy);
      };

      // initialize
      initialize();

      return $this;
    });
  };
}));
/*!
* jQuery Cycle2; version: 2.1.1 build: 20140128
* http://jquery.malsup.com/cycle2/
* Copyright (c) 2014 M. Alsup; Dual licensed: MIT/GPL
*/
(function(e){"use strict";function t(e){return(e||"").toLowerCase()}var i="2.1.1";e.fn.cycle=function(i){var n;return 0!==this.length||e.isReady?this.each(function(){var n,s,o,c,l=e(this),r=e.fn.cycle.log;if(!l.data("cycle.opts")){(l.data("cycle-log")===!1||i&&i.log===!1||s&&s.log===!1)&&(r=e.noop),r("--c2 init--"),n=l.data();for(var a in n)n.hasOwnProperty(a)&&/^cycle[A-Z]+/.test(a)&&(c=n[a],o=a.match(/^cycle(.*)/)[1].replace(/^[A-Z]/,t),r(o+":",c,"("+typeof c+")"),n[o]=c);s=e.extend({},e.fn.cycle.defaults,n,i||{}),s.timeoutId=0,s.paused=s.paused||!1,s.container=l,s._maxZ=s.maxZ,s.API=e.extend({_container:l},e.fn.cycle.API),s.API.log=r,s.API.trigger=function(e,t){return s.container.trigger(e,t),s.API},l.data("cycle.opts",s),l.data("cycle.API",s.API),s.API.trigger("cycle-bootstrap",[s,s.API]),s.API.addInitialSlides(),s.API.preInitSlideshow(),s.slides.length&&s.API.initSlideshow()}}):(n={s:this.selector,c:this.context},e.fn.cycle.log("requeuing slideshow (dom not ready)"),e(function(){e(n.s,n.c).cycle(i)}),this)},e.fn.cycle.API={opts:function(){return this._container.data("cycle.opts")},addInitialSlides:function(){var t=this.opts(),i=t.slides;t.slideCount=0,t.slides=e(),i=i.jquery?i:t.container.find(i),t.random&&i.sort(function(){return Math.random()-.5}),t.API.add(i)},preInitSlideshow:function(){var t=this.opts();t.API.trigger("cycle-pre-initialize",[t]);var i=e.fn.cycle.transitions[t.fx];i&&e.isFunction(i.preInit)&&i.preInit(t),t._preInitialized=!0},postInitSlideshow:function(){var t=this.opts();t.API.trigger("cycle-post-initialize",[t]);var i=e.fn.cycle.transitions[t.fx];i&&e.isFunction(i.postInit)&&i.postInit(t)},initSlideshow:function(){var t,i=this.opts(),n=i.container;i.API.calcFirstSlide(),"static"==i.container.css("position")&&i.container.css("position","relative"),e(i.slides[i.currSlide]).css({opacity:1,display:"block",visibility:"visible"}),i.API.stackSlides(i.slides[i.currSlide],i.slides[i.nextSlide],!i.reverse),i.pauseOnHover&&(i.pauseOnHover!==!0&&(n=e(i.pauseOnHover)),n.hover(function(){i.API.pause(!0)},function(){i.API.resume(!0)})),i.timeout&&(t=i.API.getSlideOpts(i.currSlide),i.API.queueTransition(t,t.timeout+i.delay)),i._initialized=!0,i.API.updateView(!0),i.API.trigger("cycle-initialized",[i]),i.API.postInitSlideshow()},pause:function(t){var i=this.opts(),n=i.API.getSlideOpts(),s=i.hoverPaused||i.paused;t?i.hoverPaused=!0:i.paused=!0,s||(i.container.addClass("cycle-paused"),i.API.trigger("cycle-paused",[i]).log("cycle-paused"),n.timeout&&(clearTimeout(i.timeoutId),i.timeoutId=0,i._remainingTimeout-=e.now()-i._lastQueue,(0>i._remainingTimeout||isNaN(i._remainingTimeout))&&(i._remainingTimeout=void 0)))},resume:function(e){var t=this.opts(),i=!t.hoverPaused&&!t.paused;e?t.hoverPaused=!1:t.paused=!1,i||(t.container.removeClass("cycle-paused"),0===t.slides.filter(":animated").length&&t.API.queueTransition(t.API.getSlideOpts(),t._remainingTimeout),t.API.trigger("cycle-resumed",[t,t._remainingTimeout]).log("cycle-resumed"))},add:function(t,i){var n,s=this.opts(),o=s.slideCount,c=!1;"string"==e.type(t)&&(t=e.trim(t)),e(t).each(function(){var t,n=e(this);i?s.container.prepend(n):s.container.append(n),s.slideCount++,t=s.API.buildSlideOpts(n),s.slides=i?e(n).add(s.slides):s.slides.add(n),s.API.initSlide(t,n,--s._maxZ),n.data("cycle.opts",t),s.API.trigger("cycle-slide-added",[s,t,n])}),s.API.updateView(!0),c=s._preInitialized&&2>o&&s.slideCount>=1,c&&(s._initialized?s.timeout&&(n=s.slides.length,s.nextSlide=s.reverse?n-1:1,s.timeoutId||s.API.queueTransition(s)):s.API.initSlideshow())},calcFirstSlide:function(){var e,t=this.opts();e=parseInt(t.startingSlide||0,10),(e>=t.slides.length||0>e)&&(e=0),t.currSlide=e,t.reverse?(t.nextSlide=e-1,0>t.nextSlide&&(t.nextSlide=t.slides.length-1)):(t.nextSlide=e+1,t.nextSlide==t.slides.length&&(t.nextSlide=0))},calcNextSlide:function(){var e,t=this.opts();t.reverse?(e=0>t.nextSlide-1,t.nextSlide=e?t.slideCount-1:t.nextSlide-1,t.currSlide=e?0:t.nextSlide+1):(e=t.nextSlide+1==t.slides.length,t.nextSlide=e?0:t.nextSlide+1,t.currSlide=e?t.slides.length-1:t.nextSlide-1)},calcTx:function(t,i){var n,s=t;return i&&s.manualFx&&(n=e.fn.cycle.transitions[s.manualFx]),n||(n=e.fn.cycle.transitions[s.fx]),n||(n=e.fn.cycle.transitions.fade,s.API.log('Transition "'+s.fx+'" not found.  Using fade.')),n},prepareTx:function(e,t){var i,n,s,o,c,l=this.opts();return 2>l.slideCount?(l.timeoutId=0,void 0):(!e||l.busy&&!l.manualTrump||(l.API.stopTransition(),l.busy=!1,clearTimeout(l.timeoutId),l.timeoutId=0),l.busy||(0!==l.timeoutId||e)&&(n=l.slides[l.currSlide],s=l.slides[l.nextSlide],o=l.API.getSlideOpts(l.nextSlide),c=l.API.calcTx(o,e),l._tx=c,e&&void 0!==o.manualSpeed&&(o.speed=o.manualSpeed),l.nextSlide!=l.currSlide&&(e||!l.paused&&!l.hoverPaused&&l.timeout)?(l.API.trigger("cycle-before",[o,n,s,t]),c.before&&c.before(o,n,s,t),i=function(){l.busy=!1,l.container.data("cycle.opts")&&(c.after&&c.after(o,n,s,t),l.API.trigger("cycle-after",[o,n,s,t]),l.API.queueTransition(o),l.API.updateView(!0))},l.busy=!0,c.transition?c.transition(o,n,s,t,i):l.API.doTransition(o,n,s,t,i),l.API.calcNextSlide(),l.API.updateView()):l.API.queueTransition(o)),void 0)},doTransition:function(t,i,n,s,o){var c=t,l=e(i),r=e(n),a=function(){r.animate(c.animIn||{opacity:1},c.speed,c.easeIn||c.easing,o)};r.css(c.cssBefore||{}),l.animate(c.animOut||{},c.speed,c.easeOut||c.easing,function(){l.css(c.cssAfter||{}),c.sync||a()}),c.sync&&a()},queueTransition:function(t,i){var n=this.opts(),s=void 0!==i?i:t.timeout;return 0===n.nextSlide&&0===--n.loop?(n.API.log("terminating; loop=0"),n.timeout=0,s?setTimeout(function(){n.API.trigger("cycle-finished",[n])},s):n.API.trigger("cycle-finished",[n]),n.nextSlide=n.currSlide,void 0):(s&&(n._lastQueue=e.now(),void 0===i&&(n._remainingTimeout=t.timeout),n.paused||n.hoverPaused||(n.timeoutId=setTimeout(function(){n.API.prepareTx(!1,!n.reverse)},s))),void 0)},stopTransition:function(){var e=this.opts();e.slides.filter(":animated").length&&(e.slides.stop(!1,!0),e.API.trigger("cycle-transition-stopped",[e])),e._tx&&e._tx.stopTransition&&e._tx.stopTransition(e)},advanceSlide:function(e){var t=this.opts();return clearTimeout(t.timeoutId),t.timeoutId=0,t.nextSlide=t.currSlide+e,0>t.nextSlide?t.nextSlide=t.slides.length-1:t.nextSlide>=t.slides.length&&(t.nextSlide=0),t.API.prepareTx(!0,e>=0),!1},buildSlideOpts:function(i){var n,s,o=this.opts(),c=i.data()||{};for(var l in c)c.hasOwnProperty(l)&&/^cycle[A-Z]+/.test(l)&&(n=c[l],s=l.match(/^cycle(.*)/)[1].replace(/^[A-Z]/,t),o.API.log("["+(o.slideCount-1)+"]",s+":",n,"("+typeof n+")"),c[s]=n);c=e.extend({},e.fn.cycle.defaults,o,c),c.slideNum=o.slideCount;try{delete c.API,delete c.slideCount,delete c.currSlide,delete c.nextSlide,delete c.slides}catch(r){}return c},getSlideOpts:function(t){var i=this.opts();void 0===t&&(t=i.currSlide);var n=i.slides[t],s=e(n).data("cycle.opts");return e.extend({},i,s)},initSlide:function(t,i,n){var s=this.opts();i.css(t.slideCss||{}),n>0&&i.css("zIndex",n),isNaN(t.speed)&&(t.speed=e.fx.speeds[t.speed]||e.fx.speeds._default),t.sync||(t.speed=t.speed/2),i.addClass(s.slideClass)},updateView:function(e,t){var i=this.opts();if(i._initialized){var n=i.API.getSlideOpts(),s=i.slides[i.currSlide];!e&&t!==!0&&(i.API.trigger("cycle-update-view-before",[i,n,s]),0>i.updateView)||(i.slideActiveClass&&i.slides.removeClass(i.slideActiveClass).eq(i.currSlide).addClass(i.slideActiveClass),e&&i.hideNonActive&&i.slides.filter(":not(."+i.slideActiveClass+")").css("visibility","hidden"),0===i.updateView&&setTimeout(function(){i.API.trigger("cycle-update-view",[i,n,s,e])},n.speed/(i.sync?2:1)),0!==i.updateView&&i.API.trigger("cycle-update-view",[i,n,s,e]),e&&i.API.trigger("cycle-update-view-after",[i,n,s]))}},getComponent:function(t){var i=this.opts(),n=i[t];return"string"==typeof n?/^\s*[\>|\+|~]/.test(n)?i.container.find(n):e(n):n.jquery?n:e(n)},stackSlides:function(t,i,n){var s=this.opts();t||(t=s.slides[s.currSlide],i=s.slides[s.nextSlide],n=!s.reverse),e(t).css("zIndex",s.maxZ);var o,c=s.maxZ-2,l=s.slideCount;if(n){for(o=s.currSlide+1;l>o;o++)e(s.slides[o]).css("zIndex",c--);for(o=0;s.currSlide>o;o++)e(s.slides[o]).css("zIndex",c--)}else{for(o=s.currSlide-1;o>=0;o--)e(s.slides[o]).css("zIndex",c--);for(o=l-1;o>s.currSlide;o--)e(s.slides[o]).css("zIndex",c--)}e(i).css("zIndex",s.maxZ-1)},getSlideIndex:function(e){return this.opts().slides.index(e)}},e.fn.cycle.log=function(){window.console&&console.log&&console.log("[cycle2] "+Array.prototype.join.call(arguments," "))},e.fn.cycle.version=function(){return"Cycle2: "+i},e.fn.cycle.transitions={custom:{},none:{before:function(e,t,i,n){e.API.stackSlides(i,t,n),e.cssBefore={opacity:1,visibility:"visible",display:"block"}}},fade:{before:function(t,i,n,s){var o=t.API.getSlideOpts(t.nextSlide).slideCss||{};t.API.stackSlides(i,n,s),t.cssBefore=e.extend(o,{opacity:0,visibility:"visible",display:"block"}),t.animIn={opacity:1},t.animOut={opacity:0}}},fadeout:{before:function(t,i,n,s){var o=t.API.getSlideOpts(t.nextSlide).slideCss||{};t.API.stackSlides(i,n,s),t.cssBefore=e.extend(o,{opacity:1,visibility:"visible",display:"block"}),t.animOut={opacity:0}}},scrollHorz:{before:function(e,t,i,n){e.API.stackSlides(t,i,n);var s=e.container.css("overflow","hidden").width();e.cssBefore={left:n?s:-s,top:0,opacity:1,visibility:"visible",display:"block"},e.cssAfter={zIndex:e._maxZ-2,left:0},e.animIn={left:0},e.animOut={left:n?-s:s}}}},e.fn.cycle.defaults={allowWrap:!0,autoSelector:".cycle-slideshow[data-cycle-auto-init!=false]",delay:0,easing:null,fx:"fade",hideNonActive:!0,loop:0,manualFx:void 0,manualSpeed:void 0,manualTrump:!0,maxZ:100,pauseOnHover:!1,reverse:!1,slideActiveClass:"cycle-slide-active",slideClass:"cycle-slide",slideCss:{position:"absolute",top:0,left:0},slides:"> img",speed:500,startingSlide:0,sync:!0,timeout:4e3,updateView:0},e(document).ready(function(){e(e.fn.cycle.defaults.autoSelector).cycle()})})(jQuery),/*! Cycle2 autoheight plugin; Copyright (c) M.Alsup, 2012; version: 20130913 */
function(e){"use strict";function t(t,n){var s,o,c,l=n.autoHeight;if("container"==l)o=e(n.slides[n.currSlide]).outerHeight(),n.container.height(o);else if(n._autoHeightRatio)n.container.height(n.container.width()/n._autoHeightRatio);else if("calc"===l||"number"==e.type(l)&&l>=0){if(c="calc"===l?i(t,n):l>=n.slides.length?0:l,c==n._sentinelIndex)return;n._sentinelIndex=c,n._sentinel&&n._sentinel.remove(),s=e(n.slides[c].cloneNode(!0)),s.removeAttr("id name rel").find("[id],[name],[rel]").removeAttr("id name rel"),s.css({position:"static",visibility:"hidden",display:"block"}).prependTo(n.container).addClass("cycle-sentinel cycle-slide").removeClass("cycle-slide-active"),s.find("*").css("visibility","hidden"),n._sentinel=s}}function i(t,i){var n=0,s=-1;return i.slides.each(function(t){var i=e(this).height();i>s&&(s=i,n=t)}),n}function n(t,i,n,s){var o=e(s).outerHeight();i.container.animate({height:o},i.autoHeightSpeed,i.autoHeightEasing)}function s(i,o){o._autoHeightOnResize&&(e(window).off("resize orientationchange",o._autoHeightOnResize),o._autoHeightOnResize=null),o.container.off("cycle-slide-added cycle-slide-removed",t),o.container.off("cycle-destroyed",s),o.container.off("cycle-before",n),o._sentinel&&(o._sentinel.remove(),o._sentinel=null)}e.extend(e.fn.cycle.defaults,{autoHeight:0,autoHeightSpeed:250,autoHeightEasing:null}),e(document).on("cycle-initialized",function(i,o){function c(){t(i,o)}var l,r=o.autoHeight,a=e.type(r),d=null;("string"===a||"number"===a)&&(o.container.on("cycle-slide-added cycle-slide-removed",t),o.container.on("cycle-destroyed",s),"container"==r?o.container.on("cycle-before",n):"string"===a&&/\d+\:\d+/.test(r)&&(l=r.match(/(\d+)\:(\d+)/),l=l[1]/l[2],o._autoHeightRatio=l),"number"!==a&&(o._autoHeightOnResize=function(){clearTimeout(d),d=setTimeout(c,50)},e(window).on("resize orientationchange",o._autoHeightOnResize)),setTimeout(c,30))})}(jQuery),/*! caption plugin for Cycle2;  version: 20130306 */
function(e){"use strict";e.extend(e.fn.cycle.defaults,{caption:"> .cycle-caption",captionTemplate:"{{slideNum}} / {{slideCount}}",overlay:"> .cycle-overlay",overlayTemplate:"<div>{{title}}</div><div>{{desc}}</div>",captionModule:"caption"}),e(document).on("cycle-update-view",function(t,i,n,s){"caption"===i.captionModule&&e.each(["caption","overlay"],function(){var e=this,t=n[e+"Template"],o=i.API.getComponent(e);o.length&&t?(o.html(i.API.tmpl(t,n,i,s)),o.show()):o.hide()})}),e(document).on("cycle-destroyed",function(t,i){var n;e.each(["caption","overlay"],function(){var e=this,t=i[e+"Template"];i[e]&&t&&(n=i.API.getComponent("caption"),n.empty())})})}(jQuery),/*! command plugin for Cycle2;  version: 20130707 */
function(e){"use strict";var t=e.fn.cycle;e.fn.cycle=function(i){var n,s,o,c=e.makeArray(arguments);return"number"==e.type(i)?this.cycle("goto",i):"string"==e.type(i)?this.each(function(){var l;return n=i,o=e(this).data("cycle.opts"),void 0===o?(t.log('slideshow must be initialized before sending commands; "'+n+'" ignored'),void 0):(n="goto"==n?"jump":n,s=o.API[n],e.isFunction(s)?(l=e.makeArray(c),l.shift(),s.apply(o.API,l)):(t.log("unknown command: ",n),void 0))}):t.apply(this,arguments)},e.extend(e.fn.cycle,t),e.extend(t.API,{next:function(){var e=this.opts();if(!e.busy||e.manualTrump){var t=e.reverse?-1:1;e.allowWrap===!1&&e.currSlide+t>=e.slideCount||(e.API.advanceSlide(t),e.API.trigger("cycle-next",[e]).log("cycle-next"))}},prev:function(){var e=this.opts();if(!e.busy||e.manualTrump){var t=e.reverse?1:-1;e.allowWrap===!1&&0>e.currSlide+t||(e.API.advanceSlide(t),e.API.trigger("cycle-prev",[e]).log("cycle-prev"))}},destroy:function(){this.stop();var t=this.opts(),i=e.isFunction(e._data)?e._data:e.noop;clearTimeout(t.timeoutId),t.timeoutId=0,t.API.stop(),t.API.trigger("cycle-destroyed",[t]).log("cycle-destroyed"),t.container.removeData(),i(t.container[0],"parsedAttrs",!1),t.retainStylesOnDestroy||(t.container.removeAttr("style"),t.slides.removeAttr("style"),t.slides.removeClass(t.slideActiveClass)),t.slides.each(function(){e(this).removeData(),i(this,"parsedAttrs",!1)})},jump:function(e){var t,i=this.opts();if(!i.busy||i.manualTrump){var n=parseInt(e,10);if(isNaN(n)||0>n||n>=i.slides.length)return i.API.log("goto: invalid slide index: "+n),void 0;if(n==i.currSlide)return i.API.log("goto: skipping, already on slide",n),void 0;i.nextSlide=n,clearTimeout(i.timeoutId),i.timeoutId=0,i.API.log("goto: ",n," (zero-index)"),t=i.currSlide<i.nextSlide,i.API.prepareTx(!0,t)}},stop:function(){var t=this.opts(),i=t.container;clearTimeout(t.timeoutId),t.timeoutId=0,t.API.stopTransition(),t.pauseOnHover&&(t.pauseOnHover!==!0&&(i=e(t.pauseOnHover)),i.off("mouseenter mouseleave")),t.API.trigger("cycle-stopped",[t]).log("cycle-stopped")},reinit:function(){var e=this.opts();e.API.destroy(),e.container.cycle()},remove:function(t){for(var i,n,s=this.opts(),o=[],c=1,l=0;s.slides.length>l;l++)i=s.slides[l],l==t?n=i:(o.push(i),e(i).data("cycle.opts").slideNum=c,c++);n&&(s.slides=e(o),s.slideCount--,e(n).remove(),t==s.currSlide?s.API.advanceSlide(1):s.currSlide>t?s.currSlide--:s.currSlide++,s.API.trigger("cycle-slide-removed",[s,t,n]).log("cycle-slide-removed"),s.API.updateView())}}),e(document).on("click.cycle","[data-cycle-cmd]",function(t){t.preventDefault();var i=e(this),n=i.data("cycle-cmd"),s=i.data("cycle-context")||".cycle-slideshow";e(s).cycle(n,i.data("cycle-arg"))})}(jQuery),/*! hash plugin for Cycle2;  version: 20130905 */
function(e){"use strict";function t(t,i){var n;return t._hashFence?(t._hashFence=!1,void 0):(n=window.location.hash.substring(1),t.slides.each(function(s){if(e(this).data("cycle-hash")==n){if(i===!0)t.startingSlide=s;else{var o=s>t.currSlide;t.nextSlide=s,t.API.prepareTx(!0,o)}return!1}}),void 0)}e(document).on("cycle-pre-initialize",function(i,n){t(n,!0),n._onHashChange=function(){t(n,!1)},e(window).on("hashchange",n._onHashChange)}),e(document).on("cycle-update-view",function(e,t,i){i.hash&&"#"+i.hash!=window.location.hash&&(t._hashFence=!0,window.location.hash=i.hash)}),e(document).on("cycle-destroyed",function(t,i){i._onHashChange&&e(window).off("hashchange",i._onHashChange)})}(jQuery),/*! loader plugin for Cycle2;  version: 20131121 */
function(e){"use strict";e.extend(e.fn.cycle.defaults,{loader:!1}),e(document).on("cycle-bootstrap",function(t,i){function n(t,n){function o(t){var o;"wait"==i.loader?(l.push(t),0===a&&(l.sort(c),s.apply(i.API,[l,n]),i.container.removeClass("cycle-loading"))):(o=e(i.slides[i.currSlide]),s.apply(i.API,[t,n]),o.show(),i.container.removeClass("cycle-loading"))}function c(e,t){return e.data("index")-t.data("index")}var l=[];if("string"==e.type(t))t=e.trim(t);else if("array"===e.type(t))for(var r=0;t.length>r;r++)t[r]=e(t[r])[0];t=e(t);var a=t.length;a&&(t.css("visibility","hidden").appendTo("body").each(function(t){function c(){0===--r&&(--a,o(d))}var r=0,d=e(this),u=d.is("img")?d:d.find("img");return d.data("index",t),u=u.filter(":not(.cycle-loader-ignore)").filter(':not([src=""])'),u.length?(r=u.length,u.each(function(){this.complete?c():e(this).load(function(){c()}).on("error",function(){0===--r&&(i.API.log("slide skipped; img not loaded:",this.src),0===--a&&"wait"==i.loader&&s.apply(i.API,[l,n]))})}),void 0):(--a,l.push(d),void 0)}),a&&i.container.addClass("cycle-loading"))}var s;i.loader&&(s=i.API.add,i.API.add=n)})}(jQuery),/*! pager plugin for Cycle2;  version: 20130525 */
function(e){"use strict";function t(t,i,n){var s,o=t.API.getComponent("pager");o.each(function(){var o=e(this);if(i.pagerTemplate){var c=t.API.tmpl(i.pagerTemplate,i,t,n[0]);s=e(c).appendTo(o)}else s=o.children().eq(t.slideCount-1);s.on(t.pagerEvent,function(e){e.preventDefault(),t.API.page(o,e.currentTarget)})})}function i(e,t){var i=this.opts();if(!i.busy||i.manualTrump){var n=e.children().index(t),s=n,o=s>i.currSlide;i.currSlide!=s&&(i.nextSlide=s,i.API.prepareTx(!0,o),i.API.trigger("cycle-pager-activated",[i,e,t]))}}e.extend(e.fn.cycle.defaults,{pager:"> .cycle-pager",pagerActiveClass:"cycle-pager-active",pagerEvent:"click.cycle",pagerTemplate:"<span>&bull;</span>"}),e(document).on("cycle-bootstrap",function(e,i,n){n.buildPagerLink=t}),e(document).on("cycle-slide-added",function(e,t,n,s){t.pager&&(t.API.buildPagerLink(t,n,s),t.API.page=i)}),e(document).on("cycle-slide-removed",function(t,i,n){if(i.pager){var s=i.API.getComponent("pager");s.each(function(){var t=e(this);e(t.children()[n]).remove()})}}),e(document).on("cycle-update-view",function(t,i){var n;i.pager&&(n=i.API.getComponent("pager"),n.each(function(){e(this).children().removeClass(i.pagerActiveClass).eq(i.currSlide).addClass(i.pagerActiveClass)}))}),e(document).on("cycle-destroyed",function(e,t){var i=t.API.getComponent("pager");i&&(i.children().off(t.pagerEvent),t.pagerTemplate&&i.empty())})}(jQuery),/*! prevnext plugin for Cycle2;  version: 20130709 */
function(e){"use strict";e.extend(e.fn.cycle.defaults,{next:"> .cycle-next",nextEvent:"click.cycle",disabledClass:"disabled",prev:"> .cycle-prev",prevEvent:"click.cycle",swipe:!1}),e(document).on("cycle-initialized",function(e,t){if(t.API.getComponent("next").on(t.nextEvent,function(e){e.preventDefault(),t.API.next()}),t.API.getComponent("prev").on(t.prevEvent,function(e){e.preventDefault(),t.API.prev()}),t.swipe){var i=t.swipeVert?"swipeUp.cycle":"swipeLeft.cycle swipeleft.cycle",n=t.swipeVert?"swipeDown.cycle":"swipeRight.cycle swiperight.cycle";t.container.on(i,function(){t.API.next()}),t.container.on(n,function(){t.API.prev()})}}),e(document).on("cycle-update-view",function(e,t){if(!t.allowWrap){var i=t.disabledClass,n=t.API.getComponent("next"),s=t.API.getComponent("prev"),o=t._prevBoundry||0,c=void 0!==t._nextBoundry?t._nextBoundry:t.slideCount-1;t.currSlide==c?n.addClass(i).prop("disabled",!0):n.removeClass(i).prop("disabled",!1),t.currSlide===o?s.addClass(i).prop("disabled",!0):s.removeClass(i).prop("disabled",!1)}}),e(document).on("cycle-destroyed",function(e,t){t.API.getComponent("prev").off(t.nextEvent),t.API.getComponent("next").off(t.prevEvent),t.container.off("swipeleft.cycle swiperight.cycle swipeLeft.cycle swipeRight.cycle swipeUp.cycle swipeDown.cycle")})}(jQuery),/*! progressive loader plugin for Cycle2;  version: 20130315 */
function(e){"use strict";e.extend(e.fn.cycle.defaults,{progressive:!1}),e(document).on("cycle-pre-initialize",function(t,i){if(i.progressive){var n,s,o=i.API,c=o.next,l=o.prev,r=o.prepareTx,a=e.type(i.progressive);if("array"==a)n=i.progressive;else if(e.isFunction(i.progressive))n=i.progressive(i);else if("string"==a){if(s=e(i.progressive),n=e.trim(s.html()),!n)return;if(/^(\[)/.test(n))try{n=e.parseJSON(n)}catch(d){return o.log("error parsing progressive slides",d),void 0}else n=n.split(RegExp(s.data("cycle-split")||"\n")),n[n.length-1]||n.pop()}r&&(o.prepareTx=function(e,t){var s,o;return e||0===n.length?(r.apply(i.API,[e,t]),void 0):(t&&i.currSlide==i.slideCount-1?(o=n[0],n=n.slice(1),i.container.one("cycle-slide-added",function(e,t){setTimeout(function(){t.API.advanceSlide(1)},50)}),i.API.add(o)):t||0!==i.currSlide?r.apply(i.API,[e,t]):(s=n.length-1,o=n[s],n=n.slice(0,s),i.container.one("cycle-slide-added",function(e,t){setTimeout(function(){t.currSlide=1,t.API.advanceSlide(-1)},50)}),i.API.add(o,!0)),void 0)}),c&&(o.next=function(){var e=this.opts();if(n.length&&e.currSlide==e.slideCount-1){var t=n[0];n=n.slice(1),e.container.one("cycle-slide-added",function(e,t){c.apply(t.API),t.container.removeClass("cycle-loading")}),e.container.addClass("cycle-loading"),e.API.add(t)}else c.apply(e.API)}),l&&(o.prev=function(){var e=this.opts();if(n.length&&0===e.currSlide){var t=n.length-1,i=n[t];n=n.slice(0,t),e.container.one("cycle-slide-added",function(e,t){t.currSlide=1,t.API.advanceSlide(-1),t.container.removeClass("cycle-loading")}),e.container.addClass("cycle-loading"),e.API.add(i,!0)}else l.apply(e.API)})}})}(jQuery),/*! tmpl plugin for Cycle2;  version: 20121227 */
function(e){"use strict";e.extend(e.fn.cycle.defaults,{tmplRegex:"{{((.)?.*?)}}"}),e.extend(e.fn.cycle.API,{tmpl:function(t,i){var n=RegExp(i.tmplRegex||e.fn.cycle.defaults.tmplRegex,"g"),s=e.makeArray(arguments);return s.shift(),t.replace(n,function(t,i){var n,o,c,l,r=i.split(".");for(n=0;s.length>n;n++)if(c=s[n]){if(r.length>1)for(l=c,o=0;r.length>o;o++)c=l,l=l[r[o]]||i;else l=c[i];if(e.isFunction(l))return l.apply(c,s);if(void 0!==l&&null!==l&&l!=i)return l}return i})}})}(jQuery);
//@ sourceMappingURL=jquery.cycle2.js.map
/* Plugin for Cycle2; Copyright (c) 2012 M. Alsup; v20140128 */
(function(e){"use strict";e.event.special.swipe=e.event.special.swipe||{scrollSupressionThreshold:10,durationThreshold:1e3,horizontalDistanceThreshold:30,verticalDistanceThreshold:75,setup:function(){var i=e(this);i.bind("touchstart",function(t){function n(i){if(r){var t=i.originalEvent.touches?i.originalEvent.touches[0]:i;s={time:(new Date).getTime(),coords:[t.pageX,t.pageY]},Math.abs(r.coords[0]-s.coords[0])>e.event.special.swipe.scrollSupressionThreshold&&i.preventDefault()}}var s,o=t.originalEvent.touches?t.originalEvent.touches[0]:t,r={time:(new Date).getTime(),coords:[o.pageX,o.pageY],origin:e(t.target)};i.bind("touchmove",n).one("touchend",function(){i.unbind("touchmove",n),r&&s&&s.time-r.time<e.event.special.swipe.durationThreshold&&Math.abs(r.coords[0]-s.coords[0])>e.event.special.swipe.horizontalDistanceThreshold&&Math.abs(r.coords[1]-s.coords[1])<e.event.special.swipe.verticalDistanceThreshold&&r.origin.trigger("swipe").trigger(r.coords[0]>s.coords[0]?"swipeleft":"swiperight"),r=s=void 0})})}},e.event.special.swipeleft=e.event.special.swipeleft||{setup:function(){e(this).bind("swipe",e.noop)}},e.event.special.swiperight=e.event.special.swiperight||e.event.special.swipeleft})(jQuery);

(function (window) {
    // This library re-implements setTimeout, setInterval, clearTimeout, clearInterval for iOS6.
    // iOS6 suffers from a bug that kills timers that are created while a page is scrolling.
    // This library fixes that problem by recreating timers after scrolling finishes (with interval correction).
    // This code is free to use by anyone (MIT, blabla).
    // Original Author: rkorving@wizcorp.jp
    var timeouts = {};
    var intervals = {};
    var orgSetTimeout = window.setTimeout;
    var orgSetInterval = window.setInterval;
    var orgClearTimeout = window.clearTimeout;
    var orgClearInterval = window.clearInterval;
    // To prevent errors if loaded on older IE.
    if (!window.addEventListener) return false;
    function createTimer(set, map, args) {
        var id, cb = args[0],
            repeat = (set === orgSetInterval);

        function callback() {
            if (cb) {
                cb.apply(window, arguments);
                if (!repeat) {
                    delete map[id];
                    cb = null;
                }
            }
        }
        args[0] = callback;
        id = set.apply(window, args);
        map[id] = {
            args: args,
            created: Date.now(),
            cb: cb,
            id: id
        };
        return id;
    }

    function resetTimer(set, clear, map, virtualId, correctInterval) {
        var timer = map[virtualId];
        if (!timer) {
            return;
        }
        var repeat = (set === orgSetInterval);
        // cleanup
        clear(timer.id);
        // reduce the interval (arg 1 in the args array)
        if (!repeat) {
            var interval = timer.args[1];
            var reduction = Date.now() - timer.created;
            if (reduction < 0) {
                reduction = 0;
            }
            interval -= reduction;
            if (interval < 0) {
                interval = 0;
            }
            timer.args[1] = interval;
        }
        // recreate
        function callback() {
            if (timer.cb) {
                timer.cb.apply(window, arguments);
                if (!repeat) {
                    delete map[virtualId];
                    timer.cb = null;
                }
            }
        }
        timer.args[0] = callback;
        timer.created = Date.now();
        timer.id = set.apply(window, timer.args);
    }
    window.setTimeout = function () {
        return createTimer(orgSetTimeout, timeouts, arguments);
    };
    window.setInterval = function () {
        return createTimer(orgSetInterval, intervals, arguments);
    };
    window.clearTimeout = function (id) {
        var timer = timeouts[id];
        if (timer) {
            delete timeouts[id];
            orgClearTimeout(timer.id);
        }
    };
    window.clearInterval = function (id) {
        var timer = intervals[id];
        if (timer) {
            delete intervals[id];
            orgClearInterval(timer.id);
        }
    };
    //check and add listener on the top window if loaded on frameset/iframe
    var win = window;
    while (win.location != win.parent.location) {
        win = win.parent;
    }
    win.addEventListener('scroll', function () {
        // recreate the timers using adjusted intervals
        // we cannot know how long the scroll-freeze lasted, so we cannot take that into account
        var virtualId;
        for (virtualId in timeouts) {
            resetTimer(orgSetTimeout, orgClearTimeout, timeouts, virtualId);
        }
        for (virtualId in intervals) {
            resetTimer(orgSetInterval, orgClearInterval, intervals, virtualId);
        }
    });
}(window));
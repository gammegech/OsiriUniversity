!function(t){"function"==typeof define&&define.amd?define(["./picker","jquery"],t):"object"==typeof exports?module.exports=t(require("picker.html"),require("jquery")):t(Picker,jQuery)}(function(t,l){var e,m=60,n=1440,h=t._;function i(n,a){var t,e=this,i=n.$node[0].value,r=n.$node.data("value"),i=r||i,r=r?a.formatSubmit:a.format;e.settings=a,e.$node=n.$node,e.queue={interval:"i",min:"measure create",max:"measure create",now:"now create",select:"parse create validate",highlight:"parse create validate",view:"parse create validate",disable:"deactivate",enable:"activate"},e.item={},e.item.clear=null,e.item.interval=a.interval||30,e.item.disable=(a.disable||[]).slice(0),e.item.enable=-(!0===(t=e.item.disable)[0]?t.shift():-1),e.set("min",a.min).set("max",a.max).set("now"),i?e.set("select",i,{format:r}):e.set("select",null).set("highlight",e.item.now),e.key={40:1,38:-1,39:1,37:-1,go:function(t){e.set("highlight",e.item.highlight.pick+t*e.item.interval,{interval:t*e.item.interval}),this.render()}},n.on("render",function(){function t(e,i){r("transform").map(function(t){e.css(t,i)}),r("transition").map(function(t){e.css(t,i)})}var e=n.$root.children(),i=e.find("."+a.klass.viewset),r=function(e){return["webkit","moz","ms","o",""].map(function(t){return(t?"-"+t+"-":"")+e})};i.length&&(t(e,"none"),e[0].scrollTop=~~i.position().top-2*i[0].clientHeight,t(e,""))},1).on("open",function(){n.$root.find("button").attr("disabled",!1)},1).on("close",function(){n.$root.find("button").attr("disabled",!0)},1)}i.prototype.set=function(e,i,r){var n=this,t=n.item;return null===i?t[e="clear"==e?"select":e]=i:(t["enable"==e?"disable":"flip"==e?"enable":e]=n.queue[e].split(" ").map(function(t){return i=n[t](e,i,r)}).pop(),"select"==e?n.set("highlight",t.select,r):"highlight"==e?n.set("view",t.highlight,r):"interval"==e?n.set("min",t.min,r).set("max",t.max,r):e.match(/^(flip|min|max|disable|enable)$/)&&(t.select&&n.disabled(t.select)&&n.set("select",i,r),t.highlight&&n.disabled(t.highlight)&&n.set("highlight",i,r),"min"==e)&&n.set("max",t.max,r)),n},i.prototype.get=function(t){return this.item[t]},i.prototype.create=function(t,e,i){var r=this;return h.isDate(e=void 0===e?t:e)&&(e=[e.getHours(),e.getMinutes()]),l.isPlainObject(e)&&h.isInteger(e.pick)?e=e.pick:l.isArray(e)?e=+e[0]*m+ +e[1]:h.isInteger(e)||(e=r.now(t,e,i)),"max"==t&&e<r.item.min.pick&&(e+=n),"min"!=t&&"max"!=t&&(e-r.item.min.pick)%r.item.interval!=0&&(e+=r.item.interval),{hour:~~(24+(e=r.normalize(t,e,i))/m)%24,mins:(m+e%m)%m,time:(n+e)%n,pick:e%n}},i.prototype.createRange=function(t,e){function i(t){return!0===t||l.isArray(t)||h.isDate(t)?r.create(t):t}var r=this;return h.isInteger(t)||(t=i(t)),h.isInteger(e)||(e=i(e)),h.isInteger(t)&&l.isPlainObject(e)?t=[e.hour,e.mins+t*r.settings.interval]:h.isInteger(e)&&l.isPlainObject(t)&&(e=[t.hour,t.mins+e*r.settings.interval]),{from:i(t),to:i(e)}},i.prototype.withinRange=function(t,e){return t=this.createRange(t.from,t.to),e.pick>=t.from.pick&&e.pick<=t.to.pick},i.prototype.overlapRanges=function(t,e){var i=this;return t=i.createRange(t.from,t.to),e=i.createRange(e.from,e.to),i.withinRange(t,e.from)||i.withinRange(t,e.to)||i.withinRange(e,t.from)||i.withinRange(e,t.to)},i.prototype.now=function(t,e){var i,r=this.item.interval,n=new Date,n=n.getHours()*m+n.getMinutes();return n-=n%r,i=e<0&&r*e+n<=-r,n+="min"==t&&i?0:r,h.isInteger(e)&&(n+=r*(i&&"max"!=t?e+1:e)),n},i.prototype.normalize=function(t,e){var i=this.item.interval,r=this.item.min&&this.item.min.pick||0;return e-="min"==t?0:(e-r)%i},i.prototype.measure=function(t,e,i){return"string"==typeof(e=e||("min"==t?[0,0]:[23,59]))?e=this.parse(t,e):!0===e||h.isInteger(e)?e=this.now(t,e,i):l.isPlainObject(e)&&h.isInteger(e.pick)&&(e=this.normalize(t,e.pick,i)),e},i.prototype.validate=function(t,e,i){var r=this,i=(i&&i.interval?i:r.item).interval;return r.disabled(e)&&(e=r.shift(e,i)),e=r.scope(e),e=r.disabled(e)?r.shift(e,-1*i):e},i.prototype.disabled=function(e){var i=this,t=(t=i.item.disable.filter(function(t){return h.isInteger(t)?e.hour==t:l.isArray(t)||h.isDate(t)?e.pick==i.create(t).pick:l.isPlainObject(t)?i.withinRange(t,e):void 0})).length&&!t.filter(function(t){return l.isArray(t)&&"inverted"==t[2]||l.isPlainObject(t)&&t.inverted}).length;return-1===i.item.enable?!t:t||e.pick<i.item.min.pick||e.pick>i.item.max.pick},i.prototype.shift=function(t,e){var i=this,r=i.item.min.pick,n=i.item.max.pick;for(e=e||i.item.interval;i.disabled(t)&&!((t=i.create(t.pick+=e)).pick<=r||t.pick>=n););return t},i.prototype.scope=function(t){var e=this.item.min.pick,i=this.item.max.pick;return this.create(t.pick>i?i:t.pick<e?e:t)},i.prototype.parse=function(t,r,e){var i,n,a,s,o,l=this,c={};if(!r||"string"!=typeof r)return r;for(s in e&&e.format||((e=e||{}).format=l.settings.format),l.formats.toArray(e.format).map(function(t){var e=l.formats[t],i=e?h.trigger(e,l,[r,c]):t.replace(/^!/,"").length;e&&(e=r.substr(0,i),c[t]=e.match(/^\d+$/)?+e:e),r=r.substr(i)}),c)o=c[s],h.isInteger(o)?s.match(/^(h|hh)$/i)?(i=o,"h"!=s&&"hh"!=s||(i%=12)):"i"==s&&(n=o):s.match(/^a$/i)&&o.match(/^p/i)&&("h"in c||"hh"in c)&&(a=!0);return(a?i+12:i)*m+n},i.prototype.formats={h:function(t,e){return t?h.digits(t):e.hour%12||12},hh:function(t,e){return t?2:h.lead(e.hour%12||12)},H:function(t,e){return t?h.digits(t):""+e.hour%24},HH:function(t,e){return t?h.digits(t):h.lead(e.hour%24)},i:function(t,e){return t?2:h.lead(e.mins)},a:function(t,e){return t?4:e.time%n<720?"a.m.":"p.m."},A:function(t,e){return t?2:e.time%n<720?"AM":"PM"},toArray:function(t){return t.split(/(h{1,2}|H{1,2}|i|a|A|!.)/g)},toString:function(t,e){var i=this;return i.formats.toArray(t).map(function(t){return h.trigger(i.formats[t],i,[0,e])||t.replace(/^!/,"")}).join("")}},i.prototype.isTimeExact=function(t,e){return h.isInteger(t)&&h.isInteger(e)||"boolean"==typeof t&&"boolean"==typeof e?t===e:(h.isDate(t)||l.isArray(t))&&(h.isDate(e)||l.isArray(e))?this.create(t).pick===this.create(e).pick:!(!l.isPlainObject(t)||!l.isPlainObject(e))&&this.isTimeExact(t.from,e.from)&&this.isTimeExact(t.to,e.to)},i.prototype.isTimeOverlap=function(t,e){return h.isInteger(t)&&(h.isDate(e)||l.isArray(e))?t===this.create(e).hour:h.isInteger(e)&&(h.isDate(t)||l.isArray(t))?e===this.create(t).hour:!(!l.isPlainObject(t)||!l.isPlainObject(e))&&this.overlapRanges(t,e)},i.prototype.flipEnable=function(t){var e=this.item;e.enable=t||(-1==e.enable?1:-1)},i.prototype.deactivate=function(t,e){var r=this,n=r.item.disable.slice(0);return"flip"==e?r.flipEnable():!1===e?(r.flipEnable(1),n=[]):!0===e?(r.flipEnable(-1),n=[]):e.map(function(t){for(var e,i=0;i<n.length;i+=1)if(r.isTimeExact(t,n[i])){e=!0;break}e||(h.isInteger(t)||h.isDate(t)||l.isArray(t)||l.isPlainObject(t)&&t.from&&t.to)&&n.push(t)}),n},i.prototype.activate=function(t,e){var a=this,s=a.item.disable,o=s.length;return"flip"==e?a.flipEnable():!0===e?(a.flipEnable(1),s=[]):!1===e?(a.flipEnable(-1),s=[]):e.map(function(t){for(var e,i,r,n=0;n<o;n+=1){if(i=s[n],a.isTimeExact(i,t)){r=!(e=s[n]=null);break}if(a.isTimeOverlap(i,t)){l.isPlainObject(t)?(t.inverted=!0,e=t):l.isArray(t)?(e=t)[2]||e.push("inverted"):h.isDate(t)&&(e=[t.getFullYear(),t.getMonth(),t.getDate(),"inverted"]);break}}if(e)for(n=0;n<o;n+=1)if(a.isTimeExact(s[n],t)){s[n]=null;break}if(r)for(n=0;n<o;n+=1)if(a.isTimeOverlap(s[n],t)){s[n]=null;break}e&&s.push(e)}),s.filter(function(t){return null!=t})},i.prototype.i=function(t,e){return h.isInteger(e)&&0<e?e:this.item.interval},i.prototype.nodes=function(t){var o=this,l=o.settings,c=o.item.select,m=o.item.highlight,u=o.item.view,p=o.item.disable;return h.node("ul",h.group({min:o.item.min.pick,max:o.item.max.pick,i:o.item.interval,node:"li",item:function(t){var e,i=(t=o.create(t)).pick,r=c&&c.pick==i,n=m&&m.pick==i,a=p&&o.disabled(t),s=h.trigger(o.formats.toString,o,[l.format,t]);return[h.trigger(o.formats.toString,o,[h.trigger(l.formatLabel,o,[t])||l.format,t]),(e=[l.klass.listItem],r&&e.push(l.klass.selected),n&&e.push(l.klass.highlighted),u&&u.pick==i&&e.push(l.klass.viewset),a&&e.push(l.klass.disabled),e.join(" ")),"data-pick="+t.pick+" "+h.ariaAttr({role:"option",label:s,selected:!(!r||o.$node.val()!==s)||null,activedescendant:!!n||null,disabled:!!a||null})]}})+h.node("li",h.node("button",l.clear,l.klass.buttonClear,"type=button data-clear=1"+(t?"":" disabled")+" "+h.ariaAttr({controls:o.$node[0].id})),"",h.ariaAttr({role:"presentation"})),l.klass.list,h.ariaAttr({role:"listbox",controls:o.$node[0].id}))},i.defaults={clear:"Clear",format:"h:i A",interval:30,closeOnSelect:!0,closeOnClear:!0,updateInput:!0,klass:{picker:(e=t.klasses().picker)+" "+e+"--time",holder:e+"__holder",list:e+"__list",listItem:e+"__list-item",disabled:e+"__list-item--disabled",selected:e+"__list-item--selected",highlighted:e+"__list-item--highlighted",viewset:e+"__list-item--viewset",now:e+"__list-item--now",buttonClear:e+"__button--clear"}},t.extend("pickatime",i)});;
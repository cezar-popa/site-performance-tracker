!function(e){var t={};function n(i){if(t[i])return t[i].exports;var a=t[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(i,a,function(t){return e[t]}.bind(null,a));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t),n.d(t,"measureWebVitals",(function(){return I}));var i,a,r,o,u=function(e,t){return{name:e,value:void 0===t?-1:t,delta:0,entries:[],id:"v2-".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12)}},c=function(e,t){try{if(PerformanceObserver.supportedEntryTypes.includes(e)){if("first-input"===e&&!("PerformanceEventTiming"in self))return;var n=new PerformanceObserver((function(e){return e.getEntries().map(t)}));return n.observe({type:e,buffered:!0}),n}}catch(e){}},s=function(e,t){var n=function n(i){"pagehide"!==i.type&&"hidden"!==document.visibilityState||(e(i),t&&(removeEventListener("visibilitychange",n,!0),removeEventListener("pagehide",n,!0)))};addEventListener("visibilitychange",n,!0),addEventListener("pagehide",n,!0)},d=function(e){addEventListener("pageshow",(function(t){t.persisted&&e(t)}),!0)},l=function(e,t,n){var i;return function(a){t.value>=0&&(a||n)&&(t.delta=t.value-(i||0),(t.delta||void 0===i)&&(i=t.value,e(t)))}},f=-1,v=function(){return"hidden"===document.visibilityState?0:1/0},m=function(){s((function(e){var t=e.timeStamp;f=t}),!0)},p=function(){return f<0&&(f=v(),m(),d((function(){setTimeout((function(){f=v(),m()}),0)}))),{get firstHiddenTime(){return f}}},w=function(e,t){var n,i=p(),a=u("FCP"),r=function(e){"first-contentful-paint"===e.name&&(s&&s.disconnect(),e.startTime<i.firstHiddenTime&&(a.value=e.startTime,a.entries.push(e),n(!0)))},o=performance.getEntriesByName&&performance.getEntriesByName("first-contentful-paint")[0],s=o?null:c("paint",r);(o||s)&&(n=l(e,a,t),o&&r(o),d((function(i){a=u("FCP"),n=l(e,a,t),requestAnimationFrame((function(){requestAnimationFrame((function(){a.value=performance.now()-i.timeStamp,n(!0)}))}))})))},b=!1,g=-1,y={passive:!0,capture:!0},h=new Date,L=function(e,t){i||(i=t,a=e,r=new Date,D(removeEventListener),_())},_=function(){if(a>=0&&a<r-h){var e={entryType:"first-input",name:i.type,target:i.target,cancelable:i.cancelable,startTime:i.timeStamp,processingStart:i.timeStamp+a};o.forEach((function(t){t(e)})),o=[]}},S=function(e){if(e.cancelable){var t=(e.timeStamp>1e12?new Date:performance.now())-e.timeStamp;"pointerdown"==e.type?function(e,t){var n=function(){L(e,t),a()},i=function(){a()},a=function(){removeEventListener("pointerup",n,y),removeEventListener("pointercancel",i,y)};addEventListener("pointerup",n,y),addEventListener("pointercancel",i,y)}(t,e):L(t,e)}},D=function(e){["mousedown","keydown","touchstart","pointerdown"].forEach((function(t){return e(t,S,y)}))},E=new Set;const T={CLS:[.1,.25],FCP:[1800,3e3],FID:[100,300],LCP:[2500,4e3]},C=window.webVitalsAnalyticsData.measurementVersion?window.webVitalsAnalyticsData.measurementVersion:"dimension1",V=window.webVitalsAnalyticsData.eventMeta?window.webVitalsAnalyticsData.eventMeta:"dimension2",A=window.webVitalsAnalyticsData.eventDebug?window.webVitalsAnalyticsData.eventDebug:"dimension3";let P=!1;function k(e){return window[e]||console.log}function F(e,t){return e>t[1]?"poor":e>t[0]?"ni":"good"}function M(e){try{let t=e.nodeName.toLowerCase();return"body"===t?"html>body":e.id?`${t}#${e.id}`:(e.className&&e.className.length&&(t+="."+[...e.classList.values()].join(".")),`${M(e.parentElement)}>${t}`)}catch(e){return"(error)"}}function j(e,t=[]){const n=t[0],i=t[t.length-1];switch(e){case"LCP":if(i)return M(i.element);break;case"FID":if(n){const{name:e}=n;return`${e}(${M(n.target)})`}break;case"CLS":if(t.length){const e=t.reduce((e,t)=>e&&e.value>t.value?e:t);if(e&&e.sources){const t=e.sources.reduce((e,t)=>e.node&&e.previousRect.width*e.previousRect.height>t.previousRect.width*t.previousRect.height?e:t);if(t)return M(t.node)}}break;default:return"(not set)"}}function O({name:e,value:t,delta:n,id:i,entries:a}){window.webVitalsAnalyticsData.gtag_id&&(!function(e){!P&&window.gtag&&(P=!0,gtag("config",e,{transport_type:"beacon",measurement_version:"6",custom_map:{[C]:"measurement_version",[V]:"event_meta",[A]:"event_debug"}}))}(window.webVitalsAnalyticsData.gtag_id),k("gtag")("event",e,{event_category:"Web Vitals",event_label:i,value:Math.round("CLS"===e?1e3*n:n),non_interaction:!0,event_meta:F(t,T[e]),event_debug:j(e,a)})),window.webVitalsAnalyticsData.ga_id&&k("ga")("send","event",{eventCategory:"Web Vitals",eventAction:e,eventLabel:i,eventValue:Math.round("CLS"===e?1e3*n:n),nonInteraction:!0,transport:"beacon",[V]:F(t,T[e]),[A]:j(e,a),[C]:"6"}),window.webVitalsAnalyticsData.ga4_id&&k("gtag")("event",e,{value:n,metric_id:i,metric_value:Math.round("CLS"===e?1e3*n:n),event_meta:F(t,T[e]),event_debug:j(e,a),measurement_version:"6"})}function I(){!function(e,t){b||(w((function(e){g=e.value})),b=!0);var n,i=function(t){g>-1&&e(t)},a=u("CLS",0),r=0,o=[],f=function(e){if(!e.hadRecentInput){var t=o[0],i=o[o.length-1];r&&e.startTime-i.startTime<1e3&&e.startTime-t.startTime<5e3?(r+=e.value,o.push(e)):(r=e.value,o=[e]),r>a.value&&(a.value=r,a.entries=o,n())}},v=c("layout-shift",f);v&&(n=l(i,a,t),s((function(){v.takeRecords().map(f),n(!0)})),d((function(){r=0,g=-1,a=u("CLS",0),n=l(i,a,t)})))}(O),w(O),function(e,t){var n,r=p(),f=u("FID"),v=function(e){e.startTime<r.firstHiddenTime&&(f.value=e.processingStart-e.startTime,f.entries.push(e),n(!0))},m=c("first-input",v);n=l(e,f,t),m&&s((function(){m.takeRecords().map(v),m.disconnect()}),!0),m&&d((function(){var r;f=u("FID"),n=l(e,f,t),o=[],a=-1,i=null,D(addEventListener),r=v,o.push(r),_()}))}(O),function(e,t){var n,i=p(),a=u("LCP"),r=function(e){var t=e.startTime;t<i.firstHiddenTime&&(a.value=t,a.entries.push(e)),n()},o=c("largest-contentful-paint",r);if(o){n=l(e,a,t);var f=function(){E.has(a.id)||(o.takeRecords().map(r),o.disconnect(),E.add(a.id),n(!0))};["keydown","click"].forEach((function(e){addEventListener(e,f,{once:!0,capture:!0})})),s(f,!0),d((function(i){a=u("LCP"),n=l(e,a,t),requestAnimationFrame((function(){requestAnimationFrame((function(){a.value=performance.now()-i.timeStamp,E.add(a.id),n(!0)}))}))}))}}(O)}"requestIdleCallback"in window&&"object"==typeof window.webVitalsAnalyticsData&&requestIdleCallback(I)}]);
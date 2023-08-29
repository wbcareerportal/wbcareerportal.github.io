import{s as U,n as M,c as j,d as F,u as O,g as P,e as S}from"../chunks/scheduler.75742420.js";import{S as D,i as N,g as p,s as C,h as v,j as $,x as k,c as b,f as g,k as n,a as V,y as u,r as q,u as G,v as z,d as T,t as R,w as B}from"../chunks/index.fc90ae2a.js";import{p as J}from"../chunks/stores.6a51c8e6.js";const K=""+new URL("../assets/unicef-logo.c4134194.png",import.meta.url).href;function Q(f){let e,a,d=`<a href="/" class="svelte-1fwk7wr"><img src="${K}" alt="UNICEF Logo" class="svelte-1fwk7wr"/></a>`,o,c,l,_,i,y="English",r,t,s,h,H="Hindi",E;return{c(){e=p("header"),a=p("div"),a.innerHTML=d,o=C(),c=p("nav"),l=p("ul"),_=p("li"),i=p("a"),i.textContent=y,t=C(),s=p("li"),h=p("a"),h.textContent=H,this.h()},l(w){e=v(w,"HEADER",{class:!0});var m=$(e);a=v(m,"DIV",{class:!0,"data-svelte-h":!0}),k(a)!=="svelte-1xb5ug5"&&(a.innerHTML=d),o=b(m),c=v(m,"NAV",{class:!0});var x=$(c);l=v(x,"UL",{class:!0});var L=$(l);_=v(L,"LI",{"aria-current":!0,class:!0});var I=$(_);i=v(I,"A",{href:!0,class:!0,"data-svelte-h":!0}),k(i)!=="svelte-1ks1d4d"&&(i.textContent=y),I.forEach(g),t=b(L),s=v(L,"LI",{"aria-current":!0,class:!0});var A=$(s);h=v(A,"A",{href:!0,class:!0,"data-svelte-h":!0}),k(h)!=="svelte-19hoyo2"&&(h.textContent=H),A.forEach(g),L.forEach(g),x.forEach(g),m.forEach(g),this.h()},h(){n(a,"class","corner svelte-1fwk7wr"),n(i,"href","/"),n(i,"class","svelte-1fwk7wr"),n(_,"aria-current",r=f[0].url.pathname==="/"?"page":void 0),n(_,"class","svelte-1fwk7wr"),n(h,"href","/hi"),n(h,"class","svelte-1fwk7wr"),n(s,"aria-current",E=f[0].url.pathname==="/hi"?"page":void 0),n(s,"class","svelte-1fwk7wr"),n(l,"class","svelte-1fwk7wr"),n(c,"class","svelte-1fwk7wr"),n(e,"class","d-flex justify-content-between mb-4")},m(w,m){V(w,e,m),u(e,a),u(e,o),u(e,c),u(c,l),u(l,_),u(_,i),u(l,t),u(l,s),u(s,h)},p(w,[m]){m&1&&r!==(r=w[0].url.pathname==="/"?"page":void 0)&&n(_,"aria-current",r),m&1&&E!==(E=w[0].url.pathname==="/hi"?"page":void 0)&&n(s,"aria-current",E)},i:M,o:M,d(w){w&&g(e)}}}function W(f,e,a){let d;return j(f,J,o=>a(0,d=o)),[d]}class X extends D{constructor(e){super(),N(this,e,W,Q,U,{})}}const Y=""+new URL("../assets/github.1ea8d62e.svg",import.meta.url).href;function Z(f){let e,a,d,o,c,l,_=`<p>Career Path 2023</p> <p>Powered by <img src="${Y}" alt="GitHub Logo" class="svelte-11sdn39"/></p>`,i;a=new X({});const y=f[1].default,r=F(y,f,f[0],null);return{c(){e=p("div"),q(a.$$.fragment),d=C(),o=p("main"),r&&r.c(),c=C(),l=p("footer"),l.innerHTML=_,this.h()},l(t){e=v(t,"DIV",{class:!0});var s=$(e);G(a.$$.fragment,s),d=b(s),o=v(s,"MAIN",{class:!0});var h=$(o);r&&r.l(h),h.forEach(g),c=b(s),l=v(s,"FOOTER",{class:!0,"data-svelte-h":!0}),k(l)!=="svelte-1ippgi"&&(l.innerHTML=_),s.forEach(g),this.h()},h(){n(o,"class","container"),n(l,"class","svelte-11sdn39"),n(e,"class","app svelte-11sdn39")},m(t,s){V(t,e,s),z(a,e,null),u(e,d),u(e,o),r&&r.m(o,null),u(e,c),u(e,l),i=!0},p(t,[s]){r&&r.p&&(!i||s&1)&&O(r,y,t,t[0],i?S(y,t[0],s,null):P(t[0]),null)},i(t){i||(T(a.$$.fragment,t),T(r,t),i=!0)},o(t){R(a.$$.fragment,t),R(r,t),i=!1},d(t){t&&g(e),B(a),r&&r.d(t)}}}function ee(f,e,a){let{$$slots:d={},$$scope:o}=e;return f.$$set=c=>{"$$scope"in c&&a(0,o=c.$$scope)},[o,d]}class re extends D{constructor(e){super(),N(this,e,ee,Z,U,{})}}export{re as component};

if(!self.define){let e,d={};const i=(i,c)=>(i=new URL(i+".js",c).href,d[i]||new Promise((d=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=d,document.head.appendChild(e)}else e=i,importScripts(i),d()})).then((()=>{let e=d[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(c,n)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(d[r])return;let a={};const f=e=>i(e,r),b={module:{uri:r},exports:a,require:f};d[r]=Promise.all(c.map((e=>b[e]||f(e)))).then((e=>(n(...e),a)))}}define(["./workbox-ec7a9748"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"AppComponent.18b6acd4.js",revision:"289d9291ba8d68d1bfb25b9621fea9e7"},{url:"duai.26477e76.png",revision:"a6284665b1d979fb9620257c39849cde"},{url:"duai.336f7de4.png",revision:"d7f0d67dc54df0c8a5fe31276dfa0993"},{url:"duai.3ce4a8b2.png",revision:"7531a30cc98bec49127c07b8db384d9c"},{url:"duai.42424e40.png",revision:"de261f636ba1993e7e7e0cbad6ede0fc"},{url:"duai.734a05b6.png",revision:"c3d98258065abf1b6aa49e22ecf71278"},{url:"duai.78b4841c.png",revision:"8c0fa7e4977ab1ccd1bc9dd2c1e66ad5"},{url:"duai.846dec8d.png",revision:"5222597534b358f5647c29ebc38d8e4a"},{url:"duai.968efa7e.png",revision:"d6178c9a2412b96262c07e3f1b384e59"},{url:"duai.acb22036.png",revision:"61ccf1ee7c8c0deac74b12d7873623fa"},{url:"duai.d0b622c2.webmanifest",revision:"0fec7462f0de208f6f9df67162c040d9"},{url:"duai.e23f21b3.png",revision:"9d93e22330862de1aee4c2a3bbb1cb8f"},{url:"index.b214a9d1.css",revision:"60b29101f470c187142a5bf46d3429cb"},{url:"index.c48a7992.js",revision:"22f75a8405c950b61d7501b43d278423"},{url:"index.html",revision:"ee62d2255d6304e328d87b49ef369a48"}],{})}));
//# sourceMappingURL=service-worker.js.map
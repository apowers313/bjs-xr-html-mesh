(function(p,c){typeof exports=="object"&&typeof module<"u"?c(exports,require("@babylonjs/core")):typeof define=="function"&&define.amd?define(["exports","@babylonjs/core"],c):(p=typeof globalThis<"u"?globalThis:p||self,c(p.HtmlMesh={},p.BABYLON))})(this,function(p,c){"use strict";var L=Object.defineProperty;var F=(p,c,w)=>c in p?L(p,c,{enumerable:!0,configurable:!0,writable:!0,value:w}):p[c]=w;var E=(p,c,w)=>(F(p,typeof c!="symbol"?c+"":c,w),w);function w(g,m,u,h){const d={clientX:u*g.offsetWidth+g.offsetLeft,clientY:h*g.offsetHeight+g.offsetTop,view:g.ownerDocument.defaultView},C=new MouseEvent(m,d);window.dispatchEvent(C);const x=g.getBoundingClientRect();u=u*x.width+x.left,h=h*x.height+x.top;function b(l){if(l.nodeType!==Node.TEXT_NODE&&l.nodeType!==Node.COMMENT_NODE){const t=l.getBoundingClientRect();if(u>t.left&&u<t.right&&h>t.top&&h<t.bottom&&(l.dispatchEvent(new MouseEvent(m,d)),l instanceof HTMLInputElement&&l.type==="range"&&(m==="mousedown"||m==="click"))){const[v,e]=["min","max"].map(r=>parseFloat(l[r])),i=t.width,o=(u-t.x)/i;l.value=v+(e-v)*o,l.dispatchEvent(new InputEvent("input",{bubbles:!0}))}for(let v=0;v<l.childNodes.length;v++)b(l.childNodes[v])}}b(g)}const O=new WeakMap;function R(g){const m=document.createRange();function u(e){const i=[];let n=!1;function o(){if(n&&(n=!1,e.restore()),i.length===0)return;let r=-1/0,a=-1/0,M=1/0,s=1/0;for(let T=0;T<i.length;T++){const k=i[T];r=Math.max(r,k.x),a=Math.max(a,k.y),M=Math.min(M,k.x+k.width),s=Math.min(s,k.y+k.height)}e.save(),e.beginPath(),e.rect(r,a,M-r,s-a),e.clip(),n=!0}return{add:function(r){i.push(r),o()},remove:function(){i.pop(),o()}}}function h(e,i,n,o){o!==""&&(e.textTransform==="uppercase"&&(o=o.toUpperCase()),t.font=e.fontWeight+" "+e.fontSize+" "+e.fontFamily,t.textBaseline="top",t.fillStyle=e.color,t.fillText(o,i,n+parseFloat(e.fontSize)*.1))}function d(e,i,n,o,r){n<2*r&&(r=n/2),o<2*r&&(r=o/2),t.beginPath(),t.moveTo(e+r,i),t.arcTo(e+n,i,e+n,i+o,r),t.arcTo(e+n,i+o,e,i+o,r),t.arcTo(e,i+o,e,i,r),t.arcTo(e,i,e+n,i,r),t.closePath()}function C(e,i,n,o,r,a){const M=e[i+"Width"],s=e[i+"Style"],T=e[i+"Color"];M!=="0px"&&s!=="none"&&T!=="transparent"&&T!=="rgba(0, 0, 0, 0)"&&(t.strokeStyle=T,t.lineWidth=parseFloat(M),t.beginPath(),t.moveTo(n,o),t.lineTo(n+r,o+a),t.stroke())}function x(e,i){let n=0,o=0,r=0,a=0;if(e.nodeType===Node.TEXT_NODE){m.selectNode(e);const s=m.getBoundingClientRect();n=s.left-b.left-.5,o=s.top-b.top-.5,r=s.width,a=s.height,h(i,n,o,e.nodeValue.trim())}else{if(e.nodeType===Node.COMMENT_NODE)return;if(e instanceof HTMLCanvasElement){if(e.style.display==="none")return;const s=e.getBoundingClientRect();n=s.left-b.left-.5,o=s.top-b.top-.5,t.save();const T=window.devicePixelRatio;t.scale(1/T,1/T),t.drawImage(e,n,o),t.restore()}else if(e instanceof HTMLImageElement){if(e.style.display==="none")return;const s=e.getBoundingClientRect();n=s.left-b.left-.5,o=s.top-b.top-.5,r=s.width,a=s.height,t.drawImage(e,n,o,r,a)}else{if(e.style.display==="none")return;const s=e.getBoundingClientRect();n=s.left-b.left-.5,o=s.top-b.top-.5,r=s.width,a=s.height,i=window.getComputedStyle(e),d(n,o,r,a,parseFloat(i.borderRadius));const T=i.backgroundColor;T!=="transparent"&&T!=="rgba(0, 0, 0, 0)"&&(t.fillStyle=T,t.fill());const k=["borderTop","borderLeft","borderBottom","borderRight"];let W=!0,S=null;for(const f of k){if(S!==null&&(W=i[f+"Width"]===i[S+"Width"]&&i[f+"Color"]===i[S+"Color"]&&i[f+"Style"]===i[S+"Style"]),W===!1)break;S=f}if(W===!0){const f=parseFloat(i.borderTopWidth);i.borderTopWidth!=="0px"&&i.borderTopStyle!=="none"&&i.borderTopColor!=="transparent"&&i.borderTopColor!=="rgba(0, 0, 0, 0)"&&(t.strokeStyle=i.borderTopColor,t.lineWidth=f,t.stroke())}else C(i,"borderTop",n,o,r,0),C(i,"borderLeft",n,o,0,a),C(i,"borderBottom",n,o+a,r,0),C(i,"borderRight",n+r,o,0,a);if(e instanceof HTMLInputElement){let f=i.accentColor;(f===void 0||f==="auto")&&(f=i.color);const A="white";if(e.type==="radio"&&(d(n,o,r,a,a),t.fillStyle="white",t.strokeStyle=f,t.lineWidth=1,t.fill(),t.stroke(),e.checked&&(d(n+2,o+2,r-4,a-4,a),t.fillStyle=f,t.strokeStyle=A,t.lineWidth=2,t.fill(),t.stroke())),e.type==="checkbox"&&(d(n,o,r,a,2),t.fillStyle=e.checked?f:"white",t.strokeStyle=e.checked?A:f,t.lineWidth=1,t.stroke(),t.fill(),e.checked)){const N=t.textAlign;t.textAlign="center";const B={color:A,fontFamily:i.fontFamily,fontSize:a+"px",fontWeight:"bold"};h(B,n+r/2,o,"✔"),t.textAlign=N}if(e.type==="range"){const[N,B,H]=["min","max","value"].map(y=>parseFloat(e[y])),I=(H-N)/(B-N)*(r-a);d(n,o+a/4,r,a/2,a/4),t.fillStyle=A,t.strokeStyle=f,t.lineWidth=1,t.fill(),t.stroke(),d(n,o+a/4,I+a/2,a/2,a/4),t.fillStyle=f,t.fill(),d(n+I,o,a,a,a/2),t.fillStyle=f,t.fill()}(e.type==="color"||e.type==="text"||e.type==="number")&&(v.add({x:n,y:o,width:r,height:a}),h(i,n+parseInt(i.paddingLeft),o+parseInt(i.paddingTop),e.value),v.remove())}}}const M=i.overflow==="auto"||i.overflow==="hidden";M&&v.add({x:n,y:o,width:r,height:a});for(let s=0;s<e.childNodes.length;s++)x(e.childNodes[s],i);M&&v.remove()}const b=g.getBoundingClientRect();let l=O.get(g);l===void 0&&(l=document.createElement("canvas"),l.width=b.width,l.height=b.height,O.set(g,l));const t=l.getContext("2d"),v=new u(t);return t.clearRect(0,0,l.width,l.height),x(g),l}class D extends c.DynamicTexture{constructor(u,h){const d=R(u);super("HtmlTexture",d,h);E(this,"domElement");E(this,"scheduleUpdate");E(this,"observer");E(this,"canvas");this.canvas=d,this.domElement=u,this.scheduleUpdate=null;const C=new MutationObserver(()=>{this.scheduleUpdate||(this.scheduleUpdate=setTimeout(()=>this.update(),16))}),x={attributes:!0,childList:!0,subtree:!0,characterData:!0};C.observe(u,x),this.observer=C}get width(){return this.canvas.width}get height(){return this.canvas.height}update(){R(this.domElement),super.update(),this.scheduleUpdate=null}}class P{constructor(m,u){E(this,"domElement");E(this,"texture");E(this,"mesh");E(this,"material");this.domElement=m,this.texture=new D(m,u),this.texture.hasAlpha=!0,this.mesh=c.MeshBuilder.CreatePlane("plane",{height:5,width:5}),this.material=new c.StandardMaterial("Mat",u),this.material.diffuseTexture=this.texture,this.mesh.material=this.material,this.texture.update(),this.mesh.actionManager=new c.ActionManager(u),this.mesh.actionManager.registerAction(new c.ExecuteCodeAction({trigger:c.ActionManager.OnPickDownTrigger},h=>{const d=h.additionalData.getTextureCoordinates();w(this.domElement,"mousedown",d.x,1-d.y)})),this.mesh.actionManager.registerAction(new c.ExecuteCodeAction({trigger:c.ActionManager.OnPickUpTrigger},h=>{const d=h.additionalData.getTextureCoordinates();w(this.domElement,"mouseup",d.x,1-d.y)})),this.mesh.actionManager.registerAction(new c.ExecuteCodeAction({trigger:c.ActionManager.OnPickTrigger},h=>{const d=h.additionalData.getTextureCoordinates();w(this.domElement,"click",d.x,1-d.y)})),this.mesh.actionManager.registerAction(new c.ExecuteCodeAction({trigger:c.ActionManager.OnPointerOverTrigger},h=>{const d=h.additionalData.pickResult.getTextureCoordinates();w(this.domElement,"mousemove",d.x,1-d.y)})),this.mesh.pointerOverDisableMeshTesting=!0}}p.HtmlMesh=P,p.HtmlTexture=D,Object.defineProperty(p,Symbol.toStringTag,{value:"Module"})});
function parseGIF(e,t,a){var r=new OffscreenCanvas(t||100,a||100),n=new OffscreenCanvas(t||100,a||100),i=r.getContext("2d"),d=n.getContext("2d"),l=[],h=null,c=!1,s=new Stream(e),p={};if(p.sig=s.read(3),"GIF"!==p.sig)throw new Error("Not a GIF file.");p.ver=s.read(3),p.width=s.readUnsigned(),p.height=s.readUnsigned();var o=C(s.readByte());p.gctFlag=o.shift(),p.colorRes=S(o.splice(0,3)),p.sorted=o.shift(),p.gctSize=S(o.splice(0,3)),p.bgColor=s.readByte(),p.pixelAspectRatio=s.readByte(),p.gctFlag&&(p.gct=b(1<<p.gctSize+1)),r.width=t||p.width,r.height=a||p.height,n.width=p.width,n.height=p.height,d.setTransform(1,0,0,1,0,0);var f=null,u=null,g=null,y=null,w=null;do{switch((f={}).sentinel=s.readByte(),String.fromCharCode(f.sentinel)){case"!":f.type="ext",v(f);break;case",":f.type="img",m(f);break;case";":f.type="eof",B();break;default:throw new Error("Unknown block: 0x"+f.sentinel.toString(16))}}while("eof"!==f.type);function v(e){switch(e.label=s.readByte(),e.label){case 249:e.extType="gce",function(e){s.readByte();var t=C(s.readByte());e.reserved=t.splice(0,3),e.disposalMethod=S(t.splice(0,3)),e.userInput=t.shift(),e.transparencyGiven=t.shift(),e.delayTime=s.readUnsigned(),e.transparencyIndex=s.readByte(),e.terminator=s.readByte(),function(e){w=10*e.delayTime,B(),lastDisposalMethod=g,g=u=null,u=e.transparencyGiven?e.transparencyIndex:null,g=e.disposalMethod}(e)}(e);break;case 254:e.extType="com",(a=e).comment=x(),handler.com&&handler.com(a);break;case 1:e.extType="pte",function(e){s.readByte();e.ptHeader=s.readBytes(12),e.ptData=x(),handler.pte&&handler.pte(e)}(e);break;case 255:e.extType="app",function(e){s.readByte();switch(e.identifier=s.read(8),e.authCode=s.read(3),e.identifier){case"NETSCAPE":!function(e){s.readByte();e.unknown=s.readByte(),e.iterations=s.readUnsigned(),e.terminator=s.readByte()}(e);break;default:!function(e){e.appData=x()}(e)}}(e);break;default:e.extType="unknown",(t=e).data=x(),handler.unknown&&handler.unknown(t)}var t,a}function m(e){e.leftPos=s.readUnsigned(),e.topPos=s.readUnsigned(),e.width=s.readUnsigned(),e.height=s.readUnsigned();var t=C(s.readByte());e.lctFlag=t.shift(),e.interlaced=t.shift(),e.sorted=t.shift(),e.reserved=t.splice(0,2),e.lctSize=S(t.splice(0,3)),e.lctFlag&&(e.lct=b(1<<e.lctSize+1)),e.lzwMinCodeSize=s.readByte();var a=x();e.pixels=function(t,r){var e,a,n=0,i=[],s=1<<t,o=s+1,d=t+1,l=[],h=null;for(;;)if(a=e,(e=c(d))!==s){if(e===o)break;if(e<l.length)a!==s&&l.push(l[a].concat(l[e][0]));else{if(e!==l.length)throw new Error("Invalid LZW code.");l.push(l[a].concat(l[a][0]))}i.push.apply(i,l[e]),l.length===1<<d&&d<12&&d++}else p();return i;function c(e){for(var t=0,a=0;a<e;a++)r.charCodeAt(n>>3)&1<<(7&n)&&(t|=1<<a),n++;return t}function p(){if(d=t+1,!h){h=new Array(o+1);for(var e=0;e<s;e++)h[e]=[e];h[s]=[],h[o]=null}l=h.slice()}}(e.lzwMinCodeSize,a),e.interlaced&&(e.pixels=function(e,t){for(var a=new Array(e.length),r=e.length/t,n=[0,4,2,1],i=[8,8,4,2],s=0,o=0;o<4;o++)for(var d=n[o];d<r;d+=i[o])l=d,h=s,c=e.slice(h*t,(h+1)*t),a.splice.apply(a,[l*t,t].concat(c)),s++;var l,h,c;return a}(e.pixels,e.width)),function(e){var t=l.length;0<t&&(3===lastDisposalMethod?null!==y?d.putImageData(l[y],0,0):d.clearRect(h.leftPos,h.topPos,h.width,h.height):y=t-1,2===lastDisposalMethod&&d.clearRect(h.leftPos,h.topPos,h.width,h.height));for(var a=d.getImageData(e.leftPos,e.topPos,e.width,e.height),r=e.lctFlag?e.lct:p.gct,n=e.pixels,i=n.length,s=null,o=0;o<i;++o)(s=n[o])!==u&&(a.data[4*o+0]=r[s][0],a.data[4*o+1]=r[s][1],a.data[4*o+2]=r[s][2],a.data[4*o+3]=255);d.putImageData(a,e.leftPos,e.topPos),h=e,c=c||!0}(e)}function B(){var e;c&&(i.drawImage(n,0,0,n.width,n.height,0,0,r.width,r.height),e=i.getImageData(0,0,r.width,r.height),l.push(e),postMessage({data:e,delay:w}))}function x(){for(var e,t="";e=s.readByte(),t+=s.read(e),0!==e;);return t}function S(e){return e.reduce(function(e,t){return 2*e+t},0)}function C(e){for(var t=[],a=7;0<=a;a--)t.push(!!(e&1<<a));return t}function b(e){for(var t=[],a=0;a<e;a++)t.push(s.readBytes(3));return t}postMessage({finish:!0}),close()}function Stream(e){this.data=e,this.len=this.data.length,this.pos=0}onmessage=function(e){var t=e.data,a=t.url,r=t.width,n=t.height,i=new XMLHttpRequest;i.open("GET",a,!0),"overrideMimeType"in i?i.overrideMimeType("text/plain; charset=x-user-defined"):"responseType"in i&&(i.responseType="arraybuffer"),i.onprogress=function(e){e.lengthComputable&&(e.loaded,e.total)},i.onload=function(e){var t;(200<=this.status&&this.status<300||304===this.status)&&(0<(t=this.response).toString().indexOf("ArrayBuffer")&&(t=new Uint8Array(t)),parseGIF(t,r,n))},i.send()},Stream.prototype.readByte=function(){if(this.pos>=this.len)throw new Error("Attempted to read past end of stream.");return this.data instanceof Uint8Array?this.data[this.pos++]:255&this.data.charCodeAt(this.pos++)},Stream.prototype.readBytes=function(e){for(var t=[],a=0;a<e;a++)t.push(this.readByte());return t},Stream.prototype.read=function(e){for(var t="",a=0;a<e;a++)t+=String.fromCharCode(this.readByte());return t},Stream.prototype.readUnsigned=function(){var e=this.readBytes(2);return(e[1]<<8)+e[0]};
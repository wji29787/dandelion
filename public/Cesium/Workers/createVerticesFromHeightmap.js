define(["./when-b43ff45e","./Check-d404a0fe","./Math-336da716","./Cartesian3-2b5b9afe","./Cartesian2-577f67dc","./Transforms-18f02e2b","./RuntimeError-bf10f3d5","./WebGLConstants-56de22c0","./ComponentDatatype-8956ad9a","./JulianDate-53cdb307","./RequestType-beb1291d","./AttributeCompression-c335d1ea","./IntersectionTests-8ff35218","./Plane-5b30f0ff","./WebMercatorProjection-8f9f9d73","./createTaskProcessorWorker","./EllipsoidTangentPlane-51ba1d6b","./OrientedBoundingBox-c229c76c","./TerrainEncoding-3a09cff0"],function(Ke,e,$e,et,tt,at,n,t,a,i,r,s,l,o,it,f,rt,nt,st){"use strict";var u=Object.freeze({NONE:0,LERC:1}),lt={};lt.DEFAULT_STRUCTURE=Object.freeze({heightScale:1,heightOffset:0,elementsPerHeight:1,stride:1,elementMultiplier:256,isBigEndian:!1});var ot=new et.Cartesian3,ft=new at.Matrix4,ut=new et.Cartesian3,dt=new et.Cartesian3;lt.computeVertices=function(e){var t,a,i,r=Math.cos,n=Math.sin,s=Math.sqrt,l=Math.atan,o=Math.exp,f=$e.CesiumMath.PI_OVER_TWO,u=$e.CesiumMath.toRadians,d=e.isUpsample,c=e.heightmap,h=e.width,m=e.height,g=e.skirtHeight,p=Ke.defaultValue(e.isGeographic,!0),w=Ke.defaultValue(e.ellipsoid,tt.Ellipsoid.WGS84),x=1/w.maximumRadius,y=e.nativeRectangle,k=e.rectangle,I=Ke.defined(k)?(t=k.west,a=k.south,i=k.east,k.north):p?(t=u(y.west),a=u(y.south),i=u(y.east),u(y.north)):(t=y.west*x,a=f-2*l(o(-y.south*x)),i=y.east*x,f-2*l(o(-y.north*x))),b=e.relativeToCenter,v=Ke.defined(b),b=v?b:et.Cartesian3.ZERO,U=Ke.defaultValue(e.exaggeration,1),M=Ke.defaultValue(e.includeWebMercatorT,!1),T=Ke.defaultValue(e.structure,lt.DEFAULT_STRUCTURE),V=Ke.defaultValue(T.heightScale,lt.DEFAULT_STRUCTURE.heightScale),A=Ke.defaultValue(T.heightOffset,lt.DEFAULT_STRUCTURE.heightOffset),B=Ke.defaultValue(T.elementsPerHeight,lt.DEFAULT_STRUCTURE.elementsPerHeight),D=Ke.defaultValue(T.stride,lt.DEFAULT_STRUCTURE.stride),S=Ke.defaultValue(T.elementMultiplier,lt.DEFAULT_STRUCTURE.elementMultiplier),P=Ke.defaultValue(T.isBigEndian,lt.DEFAULT_STRUCTURE.isBigEndian),E=tt.Rectangle.computeWidth(y),C=tt.Rectangle.computeHeight(y),F=E/(h-1),L=C/(m-1);p||(E*=x,C*=x);var O,N,R=w.radiiSquared,z=R.x,_=R.y,H=R.z,Y=65536,W=-65536,X=at.Transforms.eastNorthUpToFixedFrame(b,w),Z=at.Matrix4.inverseTransformation(X,ft);M&&(O=it.WebMercatorProjection.geodeticLatitudeToMercatorAngle(a),N=1/(it.WebMercatorProjection.geodeticLatitudeToMercatorAngle(I)-O));var j=ut;j.x=Number.POSITIVE_INFINITY,j.y=Number.POSITIVE_INFINITY,j.z=Number.POSITIVE_INFINITY;var G=dt;G.x=Number.NEGATIVE_INFINITY,G.y=Number.NEGATIVE_INFINITY,G.z=Number.NEGATIVE_INFINITY;var q=Number.POSITIVE_INFINITY,Q=h*m,J=Q+(0<g?2*h+2*m:0),K=new Array(J),$=new Array(J),ee=new Array(J),te=M?new Array(J):[],ae=0,ie=m,re=0,ne=h;0<g&&(--ae,++ie,--re,++ne);p||(1.4844222297453322==k.north?k.north=f:-1.4844222297453324==k.south&&(k.south=-f),a=k.south,I=k.north);for(var se=ae;se<ie;++se){var le=se;le<0&&(le=0),m<=le&&(le=m-1);var oe=y.north-L*le;p?oe=u(oe):1.4844222297453322==(oe=f-2*l(o(-oe*x)))?oe=f:-1.4844222297453324==oe&&(oe=-f);var fe=(oe-a)/(I-a),fe=$e.CesiumMath.clamp(fe,0,1),ue=se===ae,de=se===ie-1;0<g&&(ue?oe+=1e-5*C:de&&(oe-=1e-5*C));var ce,he=r(oe),me=n(oe),ge=H*me;M&&(ce=(it.WebMercatorProjection.geodeticLatitudeToMercatorAngle(oe)-O)*N);for(var pe=re;pe<ne;++pe){var we=pe;we<0&&(we=0),h<=we&&(we=h-1);var xe=le*(h*D)+we*D;if(1===B)ke=c[xe];else{var ye,ke=0;if(P)for(ye=0;ye<B;++ye)ke=ke*S+c[xe+ye];else for(ye=B-1;0<=ye;--ye)ke=ke*S+c[xe+ye]}ke=(ke*V+A)*U,W=Math.max(W,ke),Y=Math.min(Y,ke);var Ie=y.west+F*we;p?Ie=u(Ie):Ie*=x;var be=(Ie-t)/(i-t),be=$e.CesiumMath.clamp(be,0,1),ve=le*h+we;if(0<g){var Ue=pe===re,Me=pe===ne-1,Te=ue||de||Ue||Me;if((ue||de)&&(Ue||Me))continue;Te&&(ke-=g,Ue?(ve=m-le-1+Q,Ie-=1e-5*E):de?ve=Q+m+(h-we-1):Me?(ve=Q+m+h+le,Ie+=1e-5*E):ue&&(ve=Q+m+h+m+we))}var Ve=he*r(Ie),Ae=he*n(Ie),Be=z*Ve,De=_*Ae,Se=1/s(Be*Ve+De*Ae+ge*me),Pe=Be*Se,Ee=De*Se,Ce=ge*Se,Fe=Ke.defaultValue(e.createdByUpsampling,!1),Le=e.structure.terrainModifyInfoCollection;if(Ke.defined(Le)){for(var Oe=Le._array.length,Ne=0;Ne<Oe;Ne++){var Re=Le._array[Ne],ze=lt.isPointInsidePolygon(Re._points,oe,Ie),_e=Re._terrainModifyType,He=Re._value;!0===ze&&(0!=_e||Fe?1!=_e||Fe?2==_e&&(ke=He):d||(ke+=He):d||(ke*=He))}W=Math.max(W,ke),Y=Math.min(Y,ke)}var Ye=new et.Cartesian3;Ye.x=Pe+Ve*ke,Ye.y=Ee+Ae*ke,Ye.z=Ce+me*ke,K[ve]=Ye,$[ve]=ke,ee[ve]=new tt.Cartesian2(be,fe),M&&(te[ve]=ce),at.Matrix4.multiplyByPoint(Z,Ye,ot),et.Cartesian3.minimumByComponent(ot,j,j),et.Cartesian3.maximumByComponent(ot,G,G),q=Math.min(q,ke)}}var We,Xe,Ze=at.BoundingSphere.fromPoints(K);Ke.defined(k)&&(We=nt.OrientedBoundingBox.fromRectangle(k,Y,W,w)),v&&(Xe=new st.EllipsoidalOccluder(w).computeHorizonCullingPointPossiblyUnderEllipsoid(b,K,Y));for(var je=new rt.AxisAlignedBoundingBox(j,G,b),Ge=new st.TerrainEncoding(je,q,W,X,!1,M),qe=new Float32Array(J*Ge.getStride()),Qe=0,Je=0;Je<J;++Je)Qe=Ge.encode(qe,Qe,K[Je],ee[Je],$[Je],void 0,te[Je]);return{vertices:qe,maximumHeight:W,minimumHeight:Y,encoding:Ge,boundingSphere3D:Ze,orientedBoundingBox:We,occludeePointInScaledSpace:Xe}},lt.isPointInsidePolygon=function(e,t,a){var i=e.length;if(i<=2)return!1;for(var r=!1,n=0,s=i-1;n<i;n++){var l=e[n],o=e[s];(l.latitude<t&&o.latitude>=t||o.latitude<t&&l.latitude>=t)&&l.longitude+(t-l.latitude)/(o.latitude-l.latitude)*(o.longitude-l.longitude)<a&&(r=!r),s=n}return r};var d,c,h,m,g,B,V,A,D,S,P,E,z,C,p,w,x,y,k,I,b={};d={defaultNoDataValue:-34027999387901484e22,decode:function(e,t){var a=(t=t||{}).encodedMaskData||null===t.encodedMaskData,i=g(e,t.inputOffset||0,a),r=null!==t.noDataValue?t.noDataValue:d.defaultNoDataValue,n=c(i,t.pixelType||Float32Array,t.encodedMaskData,r,t.returnMask),s={width:i.width,height:i.height,pixelData:n.resultPixels,minValue:n.minValue,maxValue:i.pixels.maxValue,noDataValue:r};return n.resultMask&&(s.maskData=n.resultMask),t.returnEncodedMask&&i.mask&&(s.encodedMaskData=i.mask.bitset?i.mask.bitset:null),t.returnFileInfo&&(s.fileInfo=h(i),t.computeUsedBitDepths&&(s.fileInfo.bitDepths=m(i))),s}},c=function(e,t,a,i,r){var n,s,l,o=0,f=e.pixels.numBlocksX,u=e.pixels.numBlocksY,d=Math.floor(e.width/f),c=Math.floor(e.height/u),h=2*e.maxZError,m=Number.MAX_VALUE;a=a||(e.mask?e.mask.bitset:null),s=new t(e.width*e.height),r&&a&&(l=new Uint8Array(e.width*e.height));for(var g,p,w=new Float32Array(d*c),x=0;x<=u;x++){var y=x!==u?c:e.height%u;if(0!==y)for(var k=0;k<=f;k++){var I=k!==f?d:e.width%f;if(0!==I){var b,v,U,M,T=x*e.width*c+k*d,V=e.width-I,A=e.pixels.blocks[o];if(A.encoding<2?(b=0===A.encoding?A.rawData:(B(A.stuffedData,A.bitsPerPixel,A.numValidPixels,A.offset,h,w,e.pixels.maxValue),w),v=0):U=2===A.encoding?0:A.offset,a)for(p=0;p<y;p++){for(7&T&&(M=a[T>>3],M<<=7&T),g=0;g<I;g++)7&T||(M=a[T>>3]),128&M?(l&&(l[T]=1),m=(n=A.encoding<2?b[v++]:U)<m?n:m,s[T++]=n):(l&&(l[T]=0),s[T++]=i),M<<=1;T+=V}else if(A.encoding<2)for(p=0;p<y;p++){for(g=0;g<I;g++)m=(n=b[v++])<m?n:m,s[T++]=n;T+=V}else for(m=U<m?U:m,p=0;p<y;p++){for(g=0;g<I;g++)s[T++]=U;T+=V}if(1===A.encoding&&v!==A.numValidPixels)throw"Block and Mask do not match";o++}}}return{resultPixels:s,resultMask:l,minValue:m}},h=function(e){return{fileIdentifierString:e.fileIdentifierString,fileVersion:e.fileVersion,imageType:e.imageType,height:e.height,width:e.width,maxZError:e.maxZError,eofOffset:e.eofOffset,mask:e.mask?{numBlocksX:e.mask.numBlocksX,numBlocksY:e.mask.numBlocksY,numBytes:e.mask.numBytes,maxValue:e.mask.maxValue}:null,pixels:{numBlocksX:e.pixels.numBlocksX,numBlocksY:e.pixels.numBlocksY,numBytes:e.pixels.numBytes,maxValue:e.pixels.maxValue,noDataValue:e.noDataValue}}},m=function(e){for(var t=e.pixels.numBlocksX*e.pixels.numBlocksY,a={},i=0;i<t;i++){var r=e.pixels.blocks[i];0===r.encoding?a.float32=!0:1===r.encoding?a[r.bitsPerPixel]=!0:a[0]=!0}return Object.keys(a)},g=function(e,t,a){var i={},r=new Uint8Array(e,t,10);if(i.fileIdentifierString=String.fromCharCode.apply(null,r),"CntZImage"!==i.fileIdentifierString.trim())throw"Unexpected file identifier string: "+i.fileIdentifierString;t+=10;var n=new DataView(e,t,24);if(i.fileVersion=n.getInt32(0,!0),i.imageType=n.getInt32(4,!0),i.height=n.getUint32(8,!0),i.width=n.getUint32(12,!0),i.maxZError=n.getFloat64(16,!0),t+=24,!a)if(n=new DataView(e,t,16),i.mask={},i.mask.numBlocksY=n.getUint32(0,!0),i.mask.numBlocksX=n.getUint32(4,!0),i.mask.numBytes=n.getUint32(8,!0),i.mask.maxValue=n.getFloat32(12,!0),t+=16,0<i.mask.numBytes){var s=new Uint8Array(Math.ceil(i.width*i.height/8)),l=(n=new DataView(e,t,i.mask.numBytes)).getInt16(0,!0),o=2,f=0;do{if(0<l)for(;l--;)s[f++]=n.getUint8(o++);else for(var u=n.getUint8(o++),l=-l;l--;)s[f++]=u;l=n.getInt16(o,!0),o+=2}while(o<i.mask.numBytes);if(-32768!==l||f<s.length)throw"Unexpected end of mask RLE encoding";i.mask.bitset=s,t+=i.mask.numBytes}else 0==(i.mask.numBytes|i.mask.numBlocksY|i.mask.maxValue)&&(i.mask.bitset=new Uint8Array(Math.ceil(i.width*i.height/8)));n=new DataView(e,t,16),i.pixels={},i.pixels.numBlocksY=n.getUint32(0,!0),i.pixels.numBlocksX=n.getUint32(4,!0),i.pixels.numBytes=n.getUint32(8,!0),i.pixels.maxValue=n.getFloat32(12,!0),t+=16;var d=i.pixels.numBlocksX,c=i.pixels.numBlocksY,h=d+(0<i.width%d?1:0),m=c+(0<i.height%c?1:0);i.pixels.blocks=new Array(h*m);for(var g=0,p=0;p<m;p++)for(var w=0;w<h;w++){var x=0,y=e.byteLength-t;n=new DataView(e,t,Math.min(10,y));var k={};i.pixels.blocks[g++]=k;var I,b,v,U=n.getUint8(0);if(x++,k.encoding=63&U,3<k.encoding)throw"Invalid block encoding ("+k.encoding+")";if(2!==k.encoding){if(0!==U&&2!==U){if(U>>=6,2===(k.offsetType=U))k.offset=n.getInt8(1),x++;else if(1===U)k.offset=n.getInt16(1,!0),x+=2;else{if(0!==U)throw"Invalid block offset type";k.offset=n.getFloat32(1,!0),x+=4}if(1===k.encoding)if(U=n.getUint8(x),x++,k.bitsPerPixel=63&U,U>>=6,2===(k.numValidPixelsType=U))k.numValidPixels=n.getUint8(x),x++;else if(1===U)k.numValidPixels=n.getUint16(x,!0),x+=2;else{if(0!==U)throw"Invalid valid pixel count type";k.numValidPixels=n.getUint32(x,!0),x+=4}}if(t+=x,3!==k.encoding)if(0===k.encoding){var M=(i.pixels.numBytes-1)/4;if(M!==Math.floor(M))throw"uncompressed block has invalid length";v=new ArrayBuffer(4*M),new Uint8Array(v).set(new Uint8Array(e,t,4*M));var T=new Float32Array(v);k.rawData=T,t+=4*M}else{1===k.encoding&&(I=Math.ceil(k.numValidPixels*k.bitsPerPixel/8),b=Math.ceil(I/4),v=new ArrayBuffer(4*b),new Uint8Array(v).set(new Uint8Array(e,t,I)),k.stuffedData=new Uint32Array(v),t+=I)}}else t++}return i.eofOffset=t,i},B=function(e,t,a,i,r,n,s){var l,o,f,u,d=(1<<t)-1,c=0,h=0,m=Math.ceil((s-i)/r),g=4*e.length-Math.ceil(t*a/8);for(e[e.length-1]<<=8*g,l=0;l<a;l++){0===h&&(u=e[c++],h=32),t<=h?(f=u>>>h-t&d,h-=t):(f=(u&d)<<(o=t-h)&d,f+=(u=e[c++])>>>(h=32-o)),n[l]=f<m?i+f*r:s}return n},x=d,V=function(e,t,a,i,r,n,s,l){var o,f,u,d,c,h=(1<<a)-1,m=0,g=0,p=4*e.length-Math.ceil(a*i/8);if(e[e.length-1]<<=8*p,r)for(o=0;o<i;o++)0===g&&(u=e[m++],g=32),a<=g?(f=u>>>g-a&h,g-=a):(f=(u&h)<<(d=a-g)&h,f+=(u=e[m++])>>>(g=32-d)),t[o]=r[f];else for(c=Math.ceil((l-n)/s),o=0;o<i;o++)0===g&&(u=e[m++],g=32),a<=g?(f=u>>>g-a&h,g-=a):(f=(u&h)<<(d=a-g)&h,f+=(u=e[m++])>>>(g=32-d)),t[o]=f<c?n+f*s:l},A=function(e,t,a,i,r,n){var s,l=(1<<t)-1,o=0,f=0,u=0,d=0,c=0,h=[],m=4*e.length-Math.ceil(t*a/8);e[e.length-1]<<=8*m;for(var g=Math.ceil((n-i)/r),f=0;f<a;f++)0===d&&(s=e[o++],d=32),t<=d?(c=s>>>d-t&l,d-=t):(c=(s&l)<<(u=t-d)&l,c+=(s=e[o++])>>>(d=32-u)),h[f]=c<g?i+c*r:n;return h.unshift(i),h},D=function(e,t,a,i,r,n,s,l){var o,f,u,d=(1<<a)-1,c=0,h=0,m=0;if(r)for(p=0;p<i;p++)0===h&&(f=e[c++],h=32,m=0),a<=h?(o=f>>>m&d,h-=a,m+=a):(o=f>>>m&d,h=32-(u=a-h),o|=((f=e[c++])&(1<<u)-1)<<a-u,m=u),t[p]=r[o];else for(var g=Math.ceil((l-n)/s),p=0;p<i;p++)0===h&&(f=e[c++],h=32,m=0),a<=h?(o=f>>>m&d,h-=a,m+=a):(o=f>>>m&d,h=32-(u=a-h),o|=((f=e[c++])&(1<<u)-1)<<a-u,m=u),t[p]=o<g?n+o*s:l;return t},S=function(e,t,a,i,r,n){for(var s,l=(1<<t)-1,o=0,f=0,u=0,d=0,c=0,h=0,m=[],g=Math.ceil((n-i)/r),f=0;f<a;f++)0===d&&(s=e[o++],d=32,h=0),t<=d?(c=s>>>h&l,d-=t,h+=t):(c=s>>>h&l,d=32-(u=t-d),c|=((s=e[o++])&(1<<u)-1)<<t-u,h=u),m[f]=c<g?i+c*r:n;return m.unshift(i),m},P=function(e,t,a,i){var r,n,s,l,o=(1<<a)-1,f=0,u=0,d=4*e.length-Math.ceil(a*i/8);for(e[e.length-1]<<=8*d,r=0;r<i;r++)0===u&&(s=e[f++],u=32),a<=u?(n=s>>>u-a&o,u-=a):(n=(s&o)<<(l=a-u)&o,n+=(s=e[f++])>>>(u=32-l)),t[r]=n;return t},E=function(e,t,a,i){for(var r,n,s,l=(1<<a)-1,o=0,f=0,u=0,d=0;d<i;d++)0===f&&(n=e[o++],f=32,u=0),a<=f?(r=n>>>u&l,f-=a,u+=a):(r=n>>>u&l,f=32-(s=a-f),r|=((n=e[o++])&(1<<s)-1)<<a-s,u=s),t[d]=r;return t},z={HUFFMAN_LUT_BITS_MAX:12,computeChecksumFletcher32:function(e){for(var t=65535,a=65535,i=e.length,r=Math.floor(i/2),n=0;r;){var s=359<=r?359:r;for(r-=s;t+=e[n++]<<8,a+=t+=e[n++],--s;);t=(65535&t)+(t>>>16),a=(65535&a)+(a>>>16)}return 1&i&&(a+=t+=e[n]<<8),((a=(65535&a)+(a>>>16))<<16|(t=(65535&t)+(t>>>16)))>>>0},readHeaderInfo:function(e,t){var a=t.ptr,i=new Uint8Array(e,a,6),r={};if(r.fileIdentifierString=String.fromCharCode.apply(null,i),0!==r.fileIdentifierString.lastIndexOf("Lerc2",0))throw"Unexpected file identifier string (expect Lerc2 ): "+r.fileIdentifierString;a+=6;var n,s=new DataView(e,a,8),l=s.getInt32(0,!0);if(a+=4,3<=(r.fileVersion=l)&&(r.checksum=s.getUint32(4,!0),a+=4),s=new DataView(e,a,12),r.height=s.getUint32(0,!0),r.width=s.getUint32(4,!0),a+=8,4<=l?(r.numDims=s.getUint32(8,!0),a+=4):r.numDims=1,s=new DataView(e,a,40),r.numValidPixel=s.getUint32(0,!0),r.microBlockSize=s.getInt32(4,!0),r.blobSize=s.getInt32(8,!0),r.imageType=s.getInt32(12,!0),r.maxZError=s.getFloat64(16,!0),r.zMin=s.getFloat64(24,!0),r.zMax=s.getFloat64(32,!0),a+=40,t.headerInfo=r,t.ptr=a,3<=l&&(n=4<=l?52:48,this.computeChecksumFletcher32(new Uint8Array(e,a-n,r.blobSize-14))!==r.checksum))throw"Checksum failed.";return!0},checkMinMaxRanges:function(e,t){var a=t.headerInfo,i=this.getDataTypeArray(a.imageType),r=a.numDims*this.getDataTypeSize(a.imageType),n=this.readSubArray(e,t.ptr,i,r),s=this.readSubArray(e,t.ptr+r,i,r);t.ptr+=2*r;for(var l=!0,o=0;o<a.numDims;o++)if(n[o]!==s[o]){l=!1;break}return a.minValues=n,a.maxValues=s,l},readSubArray:function(e,t,a,i){var r,n=a===Uint8Array?new Uint8Array(e,t,i):(r=new ArrayBuffer(i),new Uint8Array(r).set(new Uint8Array(e,t,i)),new a(r));return n},readMask:function(e,t){var a,i,r=t.ptr,n=t.headerInfo,s=n.width*n.height,l=n.numValidPixel,o=new DataView(e,r,4),f={};if(f.numBytes=o.getUint32(0,!0),r+=4,(0===l||s===l)&&0!==f.numBytes)throw"invalid mask";if(0===l)a=new Uint8Array(Math.ceil(s/8)),f.bitset=a,i=new Uint8Array(s),t.pixels.resultMask=i,r+=f.numBytes;else if(0<f.numBytes){a=new Uint8Array(Math.ceil(s/8));var u=(o=new DataView(e,r,f.numBytes)).getInt16(0,!0),d=2,c=0,h=0;do{if(0<u)for(;u--;)a[c++]=o.getUint8(d++);else for(h=o.getUint8(d++),u=-u;u--;)a[c++]=h;u=o.getInt16(d,!0),d+=2}while(d<f.numBytes);if(-32768!==u||c<a.length)throw"Unexpected end of mask RLE encoding";i=new Uint8Array(s);for(var m=0,g=0,g=0;g<s;g++)7&g?(m=a[g>>3],m<<=7&g):m=a[g>>3],128&m&&(i[g]=1);t.pixels.resultMask=i,f.bitset=a,r+=f.numBytes}return t.ptr=r,t.mask=f,!0},readDataOneSweep:function(e,t,a){var i,r=t.ptr,n=t.headerInfo,s=n.numDims,l=n.width*n.height,o=n.imageType,f=n.numValidPixel*z.getDataTypeSize(o)*s,u=t.pixels.resultMask,d=a===Uint8Array?new Uint8Array(e,r,f):(i=new ArrayBuffer(f),new Uint8Array(i).set(new Uint8Array(e,r,f)),new a(i));if(d.length===l*s)t.pixels.resultPixels=d;else{t.pixels.resultPixels=new a(l*s);var c=0,h=0,m=0,g=0;if(1<s)for(m=0;m<s;m++)for(g=m*l,h=0;h<l;h++)u[h]&&(t.pixels.resultPixels[g+h]=d[c++]);else for(h=0;h<l;h++)u[h]&&(t.pixels.resultPixels[h]=d[c++])}return r+=f,t.ptr=r,!0},readHuffmanTree:function(e,t){var a=this.HUFFMAN_LUT_BITS_MAX,i=new DataView(e,t.ptr,16);if(t.ptr+=16,i.getInt32(0,!0)<2)throw"unsupported Huffman version";var r=i.getInt32(4,!0),n=i.getInt32(8,!0),s=i.getInt32(12,!0);if(s<=n)return!1;var l=new Uint32Array(s-n);z.decodeBits(e,t,l);for(var o,f,u,d=[],c=n;c<s;c++)d[o=c-(c<r?0:r)]={first:l[c-n],second:null};var h=e.byteLength-t.ptr,m=Math.ceil(h/4),g=new ArrayBuffer(4*m);new Uint8Array(g).set(new Uint8Array(e,t.ptr,h));var p=new Uint32Array(g),w=0,x=0,y=p[0];for(c=n;c<s;c++)0<(u=d[o=c-(c<r?0:r)].first)&&(d[o].second=y<<w>>>32-u,u<=32-w?32===(w+=u)&&(w=0,y=p[++x]):(w+=u-32,y=p[++x],d[o].second|=y>>>32-w));var k=0,I=0,b=new C;for(c=0;c<d.length;c++)void 0!==d[c]&&(k=Math.max(k,d[c].first));I=a<=k?a:k,30<=k&&console.log("WARning, large NUM LUT BITS IS "+k);var v,U,M,T,V,A=[];for(c=n;c<s;c++)if(0<(u=d[o=c-(c<r?0:r)].first))if(v=[u,o],u<=I)for(U=d[o].second<<I-u,M=1<<I-u,f=0;f<M;f++)A[U|f]=v;else for(U=d[o].second,V=b,T=u-1;0<=T;T--)V=U>>>T&1?(V.right||(V.right=new C),V.right):(V.left||(V.left=new C),V.left),0!==T||V.val||(V.val=v[1]);return{decodeLut:A,numBitsLUTQick:I,numBitsLUT:k,tree:b,stuffedData:p,srcPtr:x,bitPos:w}},readHuffman:function(e,t,a){var i,r,n,s,l,o,f,u,d,c=t.headerInfo,h=c.numDims,m=t.headerInfo.height,g=t.headerInfo.width,p=g*m,w=this.readHuffmanTree(e,t),x=w.decodeLut,y=w.tree,k=w.stuffedData,I=w.srcPtr,b=w.bitPos,v=w.numBitsLUTQick,U=w.numBitsLUT,M=0===t.headerInfo.imageType?128:0,T=t.pixels.resultMask,V=0;0<b&&(I++,b=0);for(var A=k[I],B=1===t.encodeMode,D=new a(p*h),S=D,P=0;P<c.numDims;P++){if(1<h&&(S=new a(D.buffer,p*P,p),V=0),t.headerInfo.numValidPixel===g*m)for(o=u=0;o<m;o++)for(f=0;f<g;f++,u++){if(r=0,l=s=A<<b>>>32-v,32-b<v&&(l=s|=k[I+1]>>>64-b-v),x[l])r=x[l][1],b+=x[l][0];else for(l=s=A<<b>>>32-U,32-b<U&&(l=s|=k[I+1]>>>64-b-U),i=y,d=0;d<U;d++)if(!(i=s>>>U-d-1&1?i.right:i.left).left&&!i.right){r=i.val,b=b+d+1;break}32<=b&&(b-=32,A=k[++I]),n=r-M,B?(n+=!(0<f)&&0<o?S[u-g]:V,n&=255,V=S[u]=n):S[u]=n}else for(o=u=0;o<m;o++)for(f=0;f<g;f++,u++)if(T[u]){if(r=0,l=s=A<<b>>>32-v,32-b<v&&(l=s|=k[I+1]>>>64-b-v),x[l])r=x[l][1],b+=x[l][0];else for(l=s=A<<b>>>32-U,32-b<U&&(l=s|=k[I+1]>>>64-b-U),i=y,d=0;d<U;d++)if(!(i=s>>>U-d-1&1?i.right:i.left).left&&!i.right){r=i.val,b=b+d+1;break}32<=b&&(b-=32,A=k[++I]),n=r-M,B?(!(0<f&&T[u-1])&&0<o&&T[u-g]?n+=S[u-g]:n+=V,n&=255,V=S[u]=n):S[u]=n}t.ptr=t.ptr+4*(I+1)+(0<b?4:0)}t.pixels.resultPixels=D},decodeBits:function(e,t,a,i,r){var n=t.headerInfo,s=n.fileVersion,l=0,o=5<=e.byteLength-t.ptr?5:e.byteLength-t.ptr,f=new DataView(e,t.ptr,o),u=f.getUint8(0);l++;var d=u>>6,c=0==d?4:3-d,h=0<(32&u),m=31&u,g=0;if(1==c)g=f.getUint8(l),l++;else if(2==c)g=f.getUint16(l,!0),l+=2;else{if(4!=c)throw"Invalid valid pixel count type";g=f.getUint32(l,!0),l+=4}var p,w,x,y,k,I,b,v,U,M=2*n.maxZError,T=1<n.numDims?n.maxValues[r]:n.zMax;if(h){for(t.counter.lut++,v=f.getUint8(l),l++,y=Math.ceil((v-1)*m/8),k=Math.ceil(y/4),w=new ArrayBuffer(4*k),x=new Uint8Array(w),t.ptr+=l,x.set(new Uint8Array(e,t.ptr,y)),b=new Uint32Array(w),t.ptr+=y,U=0;v-1>>>U;)U++;y=Math.ceil(g*U/8),k=Math.ceil(y/4),w=new ArrayBuffer(4*k),(x=new Uint8Array(w)).set(new Uint8Array(e,t.ptr,y)),p=new Uint32Array(w),t.ptr+=y,I=(3<=s?S:A)(b,m,v-1,i,M,T),(3<=s?D:V)(p,a,U,g,I)}else t.counter.bitstuffer++,U=m,t.ptr+=l,0<U&&(y=Math.ceil(g*U/8),k=Math.ceil(y/4),w=new ArrayBuffer(4*k),(x=new Uint8Array(w)).set(new Uint8Array(e,t.ptr,y)),p=new Uint32Array(w),t.ptr+=y,3<=s?null===i?E(p,a,U,g):D(p,a,U,g,!1,i,M,T):null===i?P(p,a,U,g):V(p,a,U,g,!1,i,M,T))},readTiles:function(e,t,a){var i=t.headerInfo,r=i.width,n=i.height,s=i.microBlockSize,l=i.imageType,o=z.getDataTypeSize(l),f=Math.ceil(r/s),u=Math.ceil(n/s);t.pixels.numBlocksY=u,t.pixels.numBlocksX=f;for(var d,c,h,m,g,p,w,x,y=t.pixels.ptr=0,k=0,I=0,b=0,v=0,U=0,M=0,T=0,V=0,A=0,B=0,D=0,S=0,P=0,E=0,C=new a(s*s),F=n%s||s,L=r%s||s,O=i.numDims,N=t.pixels.resultMask,R=t.pixels.resultPixels,I=0;I<u;I++)for(v=I!==u-1?s:F,b=0;b<f;b++)for(A=I*r*s+b*s,B=r-(U=b!==f-1?s:L),x=0;x<O;x++){if(1<O&&(R=new a(t.pixels.resultPixels.buffer,r*n*x*o,r*n)),M=e.byteLength-t.ptr,c={},E=0,E++,V=(T=(d=new DataView(e,t.ptr,Math.min(10,M))).getUint8(0))>>6&255,(T>>2&15)!==(b*s>>3&15))throw"integrity issue";if(3<(g=3&T))throw t.ptr+=E,"Invalid block encoding ("+g+")";if(2!=g)if(0==g){if(t.counter.uncompressed++,t.ptr+=E,D=(D=v*U*o)<(S=e.byteLength-t.ptr)?D:S,h=new ArrayBuffer(D%o==0?D:D+o-D%o),new Uint8Array(h).set(new Uint8Array(e,t.ptr,D)),m=new a(h),P=0,N)for(y=0;y<v;y++){for(k=0;k<U;k++)N[A]&&(R[A]=m[P++]),A++;A+=B}else for(y=0;y<v;y++){for(k=0;k<U;k++)R[A++]=m[P++];A+=B}t.ptr+=P*o}else if(p=z.getDataTypeUsed(l,V),w=z.getOnePixel(c,E,p,d),E+=z.getDataTypeSize(p),3==g)if(t.ptr+=E,t.counter.constantoffset++,N)for(y=0;y<v;y++){for(k=0;k<U;k++)N[A]&&(R[A]=w),A++;A+=B}else for(y=0;y<v;y++){for(k=0;k<U;k++)R[A++]=w;A+=B}else if(t.ptr+=E,z.decodeBits(e,t,C,w,x),E=0,N)for(y=0;y<v;y++){for(k=0;k<U;k++)N[A]&&(R[A]=C[E++]),A++;A+=B}else for(y=0;y<v;y++){for(k=0;k<U;k++)R[A++]=C[E++];A+=B}else t.counter.constant++,t.ptr+=E}},formatFileInfo:function(e){return{fileIdentifierString:e.headerInfo.fileIdentifierString,fileVersion:e.headerInfo.fileVersion,imageType:e.headerInfo.imageType,height:e.headerInfo.height,width:e.headerInfo.width,numValidPixel:e.headerInfo.numValidPixel,microBlockSize:e.headerInfo.microBlockSize,blobSize:e.headerInfo.blobSize,maxZError:e.headerInfo.maxZError,pixelType:z.getPixelType(e.headerInfo.imageType),eofOffset:e.eofOffset,mask:e.mask?{numBytes:e.mask.numBytes}:null,pixels:{numBlocksX:e.pixels.numBlocksX,numBlocksY:e.pixels.numBlocksY,maxValue:e.headerInfo.zMax,minValue:e.headerInfo.zMin,noDataValue:e.noDataValue}}},constructConstantSurface:function(e){var t=e.headerInfo.zMax,a=e.headerInfo.numDims,i=e.headerInfo.height*e.headerInfo.width,r=i*a,n=0,s=0,l=0,o=e.pixels.resultMask;if(o)if(1<a)for(n=0;n<a;n++)for(l=n*i,s=0;s<i;s++)o[s]&&(e.pixels.resultPixels[l+s]=t);else for(s=0;s<i;s++)o[s]&&(e.pixels.resultPixels[s]=t);else if(e.pixels.resultPixels.fill)e.pixels.resultPixels.fill(t);else for(s=0;s<r;s++)e.pixels.resultPixels[s]=t},getDataTypeArray:function(e){var t;switch(e){case 0:t=Int8Array;break;case 1:t=Uint8Array;break;case 2:t=Int16Array;break;case 3:t=Uint16Array;break;case 4:t=Int32Array;break;case 5:t=Uint32Array;break;case 6:t=Float32Array;break;case 7:t=Float64Array;break;default:t=Float32Array}return t},getPixelType:function(e){var t;switch(e){case 0:t="S8";break;case 1:t="U8";break;case 2:t="S16";break;case 3:t="U16";break;case 4:t="S32";break;case 5:t="U32";break;case 6:t="F32";break;case 7:t="F64";break;default:t="F32"}return t},isValidPixelValue:function(e,t){if(null===t)return!1;var a;switch(e){case 0:a=-128<=t&&t<=127;break;case 1:a=0<=t&&t<=255;break;case 2:a=-32768<=t&&t<=32767;break;case 3:a=0<=t&&t<=65536;break;case 4:a=-2147483648<=t&&t<=2147483647;break;case 5:a=0<=t&&t<=4294967296;break;case 6:a=-34027999387901484e22<=t&&t<=34027999387901484e22;break;case 7:a=5e-324<=t&&t<=17976931348623157e292;break;default:a=!1}return a},getDataTypeSize:function(e){var t=0;switch(e){case 0:case 1:t=1;break;case 2:case 3:t=2;break;case 4:case 5:case 6:t=4;break;case 7:t=8;break;default:t=e}return t},getDataTypeUsed:function(e,t){var a=e;switch(e){case 2:case 4:a=e-t;break;case 3:case 5:a=e-2*t;break;case 6:a=0===t?e:1===t?2:1;break;case 7:a=0===t?e:e-2*t+1;break;default:a=e}return a},getOnePixel:function(e,t,a,i){var r=0;switch(a){case 0:r=i.getInt8(t);break;case 1:r=i.getUint8(t);break;case 2:r=i.getInt16(t,!0);break;case 3:r=i.getUint16(t,!0);break;case 4:r=i.getInt32(t,!0);break;case 5:r=i.getUInt32(t,!0);break;case 6:r=i.getFloat32(t,!0);break;case 7:r=i.getFloat64(t,!0);break;default:throw"the decoder does not understand this pixel type"}return r}},C=function(e,t,a){this.val=e,this.left=t,this.right=a},y={decode:function(e,t){var a=(t=t||{}).noDataValue,i=0,r={};if(r.ptr=t.inputOffset||0,r.pixels={},z.readHeaderInfo(e,r)){var n=r.headerInfo,s=n.fileVersion,l=z.getDataTypeArray(n.imageType);z.readMask(e,r),n.numValidPixel===n.width*n.height||r.pixels.resultMask||(r.pixels.resultMask=t.maskData);var o,f=n.width*n.height;if(r.pixels.resultPixels=new l(f*n.numDims),r.counter={onesweep:0,uncompressed:0,lut:0,bitstuffer:0,constant:0,constantoffset:0},0!==n.numValidPixel)if(n.zMax===n.zMin)z.constructConstantSurface(r);else if(4<=s&&z.checkMinMaxRanges(e,r))z.constructConstantSurface(r);else{var u=new DataView(e,r.ptr,2),d=u.getUint8(0);if(r.ptr++,d)z.readDataOneSweep(e,r,l);else if(1<s&&n.imageType<=1&&Math.abs(n.maxZError-.5)<1e-5){var c=u.getUint8(1);if(r.ptr++,2<(r.encodeMode=c)||s<4&&1<c)throw"Invalid Huffman flag "+c;c?z.readHuffman(e,r,l):z.readTiles(e,r,l)}else z.readTiles(e,r,l)}r.eofOffset=r.ptr,t.inputOffset?(o=r.headerInfo.blobSize+t.inputOffset-r.ptr,1<=Math.abs(o)&&(r.eofOffset=t.inputOffset+r.headerInfo.blobSize)):(o=r.headerInfo.blobSize-r.ptr,1<=Math.abs(o)&&(r.eofOffset=r.headerInfo.blobSize));var h={width:n.width,height:n.height,pixelData:r.pixels.resultPixels,minValue:n.zMin,maxValue:n.zMax,validPixelCount:n.numValidPixel,dimCount:n.numDims,dimStats:{minValues:n.minValues,maxValues:n.maxValues},maskData:r.pixels.resultMask};if(r.pixels.resultMask&&z.isValidPixelValue(n.imageType,a)){for(var m=r.pixels.resultMask,i=0;i<f;i++)m[i]||(h.pixelData[i]=a);h.noDataValue=a}return r.noDataValue=a,t.returnFileInfo&&(h.fileInfo=z.formatFileInfo(r)),h}},getBandCount:function(e){for(var t=0,a=0,i={ptr:0,pixels:{}};a<e.byteLength-58;)z.readHeaderInfo(e,i),a+=i.headerInfo.blobSize,t++,i.ptr=a;return t}},p=new ArrayBuffer(4),w=new Uint8Array(p),k=(new Uint32Array(p)[0]=1)===w[0],I={decode:function(e,t){if(!k)throw"Big endian system is not supported.";var a,i,r=(t=t||{}).inputOffset||0,n=new Uint8Array(e,r,10),s=String.fromCharCode.apply(null,n);if("CntZImage"===s.trim())a=x,i=1;else{if("Lerc2"!==s.substring(0,5))throw"Unexpected file identifier string: "+s;a=y,i=2}for(var l,o,f,u,d,c,h=0,m=e.byteLength-10,g=[],p={width:0,height:0,pixels:[],pixelType:t.pixelType,mask:null,statistics:[]};r<m;){var w=a.decode(e,{inputOffset:r,encodedMaskData:l,maskData:f,returnMask:0===h,returnEncodedMask:0===h,returnFileInfo:!0,pixelType:t.pixelType||null,noDataValue:t.noDataValue||null}),r=w.fileInfo.eofOffset;0===h&&(l=w.encodedMaskData,f=w.maskData,p.width=w.width,p.height=w.height,p.dimCount=w.dimCount||1,p.pixelType=w.pixelType||w.fileInfo.pixelType,p.mask=w.maskData),1<i&&w.fileInfo.mask&&0<w.fileInfo.mask.numBytes&&g.push(w.maskData),h++,p.pixels.push(w.pixelData),p.statistics.push({minValue:w.minValue,maxValue:w.maxValue,noDataValue:w.noDataValue,dimStats:w.dimStats})}if(1<i&&1<g.length){for(c=p.width*p.height,p.bandMasks=g,(f=new Uint8Array(c)).set(g[0]),u=1;u<g.length;u++)for(o=g[u],d=0;d<c;d++)f[d]=f[d]&o[d];p.maskData=f}return p}},b.Lerc=I;var v=b.Lerc;return f(function(e,t){if(e.encoding===u.LERC){var a;try{a=v.decode(e.heightmap)}catch(e){throw new n.RuntimeError(e)}if(a.statistics[0].minValue===Number.MAX_VALUE)throw new n.RuntimeError("Invalid tile data");e.heightmap=a.pixels[0],e.width=a.width,e.height=a.height}e.ellipsoid=tt.Ellipsoid.clone(e.ellipsoid),e.rectangle=tt.Rectangle.clone(e.rectangle);var i=lt.computeVertices(e),r=i.vertices;return t.push(r.buffer),{vertices:r.buffer,numberOfAttributes:i.encoding.getStride(),minimumHeight:i.minimumHeight,maximumHeight:i.maximumHeight,gridWidth:e.width,gridHeight:e.height,boundingSphere3D:i.boundingSphere3D,orientedBoundingBox:i.orientedBoundingBox,occludeePointInScaledSpace:i.occludeePointInScaledSpace,encoding:i.encoding,westIndicesSouthToNorth:i.westIndicesSouthToNorth,southIndicesEastToWest:i.southIndicesEastToWest,eastIndicesNorthToSouth:i.eastIndicesNorthToSouth,northIndicesWestToEast:i.northIndicesWestToEast}})});

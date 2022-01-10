define(["./when-b43ff45e","./Check-d404a0fe","./Math-336da716","./Cartesian3-2b5b9afe","./Cartesian2-577f67dc","./Transforms-18f02e2b","./RuntimeError-bf10f3d5","./WebGLConstants-56de22c0","./ComponentDatatype-8956ad9a","./GeometryAttribute-5eb995bc","./JulianDate-53cdb307","./RequestType-beb1291d","./GeometryAttributes-fbf888b4","./IndexDatatype-c5295474","./IntersectionTests-8ff35218","./Plane-5b30f0ff","./VertexFormat-89c0971b","./arrayRemoveDuplicates-a7dee4b8","./ArcType-46047bc6","./EllipsoidRhumbLine-b4761ded","./EllipsoidGeodesic-47c65dee","./PolylinePipeline-76ef9442","./Color-b5533cf2"],function(z,e,j,K,y,Q,t,r,X,Z,a,o,$,ee,n,i,m,te,re,l,s,ae,oe){"use strict";var ne=[];function ie(e,t,r,a,o){var n=ne;n.length=o;var i=r.red,l=r.green,s=r.blue,p=r.alpha,c=a.red,d=a.green,u=a.blue,y=a.alpha;if(oe.Color.equals(r,a)){for(v=0;v<o;v++)n[v]=oe.Color.clone(r);return n}for(var m=(c-i)/o,f=(d-l)/o,h=(u-s)/o,C=(y-p)/o,v=0;v<o;v++)n[v]=new oe.Color(i+v*m,l+v*f,s+v*h,p+v*C);return n}function f(e){var t=(e=z.defaultValue(e,z.defaultValue.EMPTY_OBJECT)).positions,r=e.colors,a=z.defaultValue(e.width,1),o=z.defaultValue(e.colorsPerVertex,!1);this._positions=t,this._colors=r,this._width=a,this._colorsPerVertex=o,this._vertexFormat=m.VertexFormat.clone(z.defaultValue(e.vertexFormat,m.VertexFormat.DEFAULT)),this._arcType=z.defaultValue(e.arcType,re.ArcType.GEODESIC),this._granularity=z.defaultValue(e.granularity,j.CesiumMath.RADIANS_PER_DEGREE),this._ellipsoid=y.Ellipsoid.clone(z.defaultValue(e.ellipsoid,y.Ellipsoid.WGS84)),this._workerName="createPolylineGeometry";var n=1+t.length*K.Cartesian3.packedLength;n+=z.defined(r)?1+r.length*oe.Color.packedLength:1,this.packedLength=n+y.Ellipsoid.packedLength+m.VertexFormat.packedLength+4}f.pack=function(e,t,r){var a;r=z.defaultValue(r,0);var o=e._positions,n=o.length;for(t[r++]=n,a=0;a<n;++a,r+=K.Cartesian3.packedLength)K.Cartesian3.pack(o[a],t,r);var i=e._colors,n=z.defined(i)?i.length:0;for(t[r++]=n,a=0;a<n;++a,r+=oe.Color.packedLength)oe.Color.pack(i[a],t,r);return y.Ellipsoid.pack(e._ellipsoid,t,r),r+=y.Ellipsoid.packedLength,m.VertexFormat.pack(e._vertexFormat,t,r),r+=m.VertexFormat.packedLength,t[r++]=e._width,t[r++]=e._colorsPerVertex?1:0,t[r++]=e._arcType,t[r]=e._granularity,t};var h=y.Ellipsoid.clone(y.Ellipsoid.UNIT_SPHERE),C=new m.VertexFormat,v={positions:void 0,colors:void 0,ellipsoid:h,vertexFormat:C,width:void 0,colorsPerVertex:void 0,arcType:void 0,granularity:void 0};f.unpack=function(e,t,r){t=z.defaultValue(t,0);for(var a=e[t++],o=new Array(a),n=0;n<a;++n,t+=K.Cartesian3.packedLength)o[n]=K.Cartesian3.unpack(e,t);var i=0<(a=e[t++])?new Array(a):void 0;for(n=0;n<a;++n,t+=oe.Color.packedLength)i[n]=oe.Color.unpack(e,t);var l=y.Ellipsoid.unpack(e,t,h);t+=y.Ellipsoid.packedLength;var s=m.VertexFormat.unpack(e,t,C);t+=m.VertexFormat.packedLength;var p=e[t++],c=1===e[t++],d=e[t++],u=e[t];return z.defined(r)?(r._positions=o,r._colors=i,r._ellipsoid=y.Ellipsoid.clone(l,r._ellipsoid),r._vertexFormat=m.VertexFormat.clone(s,r._vertexFormat),r._width=p,r._colorsPerVertex=c,r._arcType=d,r._granularity=u,r):(v.positions=o,v.colors=i,v.width=p,v.colorsPerVertex=c,v.arcType=d,v.granularity=u,new f(v))};var le=new K.Cartesian3,se=new K.Cartesian3,pe=new K.Cartesian3,ce=new K.Cartesian3;return f.createGeometry=function(e){var t=e._width,r=e._vertexFormat,a=e._colors,o=e._colorsPerVertex,n=e._arcType,i=e._granularity,l=e._ellipsoid,s=te.arrayRemoveDuplicates(e._positions,K.Cartesian3.equalsEpsilon),p=s.length;if(!(p<2||t<=0)){if(n===re.ArcType.GEODESIC||n===re.ArcType.RHUMB){var c,d=n===re.ArcType.GEODESIC?(c=j.CesiumMath.chordLength(i,l.maximumRadius),ae.PolylinePipeline.numberOfPoints):(c=i,ae.PolylinePipeline.numberOfPointsRhumbLine),u=ae.PolylinePipeline.extractHeights(s,l);if(z.defined(a)){for(var y=1,m=0;m<p-1;++m)y+=d(s[m],s[m+1],c);var f=new Array(y),h=0;for(m=0;m<p-1;++m){var C=s[m],v=s[m+1],b=a[m],g=d(C,v,c);if(o&&m<y)for(var _=ie(0,0,b,a[m+1],g),A=_.length,E=0;E<A;++E)f[h++]=_[E];else for(E=0;E<g;++E)f[h++]=oe.Color.clone(b)}f[h]=oe.Color.clone(a[a.length-1]),a=f,ne.length=0}s=n===re.ArcType.GEODESIC?ae.PolylinePipeline.generateCartesianArc({positions:s,minDistance:c,ellipsoid:l,height:u}):ae.PolylinePipeline.generateCartesianRhumbArc({positions:s,granularity:c,ellipsoid:l,height:u})}var P,w,T,x=4*(p=s.length)-4,D=new Float64Array(3*x),k=new Float64Array(3*x),V=new Float64Array(3*x),L=new Float32Array(2*x),F=r.st?new Float32Array(2*x):void 0,G=z.defined(a)?new Uint8Array(4*x):void 0,R=0,O=0,I=0,S=0;for(E=0;E<p;++E){0===E?(P=le,K.Cartesian3.subtract(s[0],s[1],P),K.Cartesian3.add(s[0],P,P)):P=s[E-1],K.Cartesian3.clone(P,pe),K.Cartesian3.clone(s[E],se),E===p-1?(P=le,K.Cartesian3.subtract(s[p-1],s[p-2],P),K.Cartesian3.add(s[p-1],P,P)):P=s[E+1],K.Cartesian3.clone(P,ce),z.defined(G)&&(w=0===E||o?a[E]:a[E-1],E!==p-1&&(T=a[E]));for(var B=E===p-1?2:4,U=0===E?2:0;U<B;++U){K.Cartesian3.pack(se,D,R),K.Cartesian3.pack(pe,k,R),K.Cartesian3.pack(ce,V,R),R+=3;var N,M=U-2<0?-1:1;L[O++]=U%2*2-1,L[O++]=M*t,r.st&&(F[I++]=E/(p-1),F[I++]=Math.max(L[O-2],0)),z.defined(G)&&(N=U<2?w:T,G[S++]=oe.Color.floatToByte(N.red),G[S++]=oe.Color.floatToByte(N.green),G[S++]=oe.Color.floatToByte(N.blue),G[S++]=oe.Color.floatToByte(N.alpha))}}var q=new $.GeometryAttributes;q.position=new Z.GeometryAttribute({componentDatatype:X.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:D}),q.prevPosition=new Z.GeometryAttribute({componentDatatype:X.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:k}),q.nextPosition=new Z.GeometryAttribute({componentDatatype:X.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:V}),q.expandAndWidth=new Z.GeometryAttribute({componentDatatype:X.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:L}),r.st&&(q.st=new Z.GeometryAttribute({componentDatatype:X.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:F})),z.defined(G)&&(q.color=new Z.GeometryAttribute({componentDatatype:X.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:4,values:G,normalize:!0}));var H=ee.IndexDatatype.createTypedArray(x,6*p-6),W=0,Y=0,J=p-1;for(E=0;E<J;++E)H[Y++]=W,H[Y++]=W+2,H[Y++]=W+1,H[Y++]=W+1,H[Y++]=W+2,H[Y++]=W+3,W+=4;return new Z.Geometry({attributes:q,indices:H,primitiveType:Z.PrimitiveType.TRIANGLES,boundingSphere:Q.BoundingSphere.fromPoints(s),geometryType:Z.GeometryType.POLYLINES})}},function(e,t){return z.defined(t)&&(e=f.unpack(e,t)),e._ellipsoid=y.Ellipsoid.clone(e._ellipsoid),f.createGeometry(e)}});

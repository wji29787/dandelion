define(["exports","./when-b43ff45e","./Check-d404a0fe","./Math-336da716","./Cartesian3-2b5b9afe","./Cartesian2-577f67dc","./Transforms-18f02e2b","./IntersectionTests-8ff35218","./Plane-5b30f0ff","./EllipsoidRhumbLine-b4761ded","./EllipsoidGeodesic-88e13409"],function(a,T,e,w,P,y,v,m,b,A,r){"use strict";var E={numberOfPoints:function(a,e,r){var t=P.Cartesian3.distance(a,e);return Math.ceil(t/r)},numberOfPointsRhumbLine:function(a,e,r){var t=Math.pow(a.longitude-e.longitude,2)+Math.pow(a.latitude-e.latitude,2);return Math.ceil(Math.sqrt(t/(r*r)))}},o=new y.Cartographic;E.extractHeights=function(a,e){for(var r=a.length,t=new Array(r),n=0;n<r;n++){var i=a[n];t[n]=e.cartesianToCartographic(i,o).height}return t};var S=new v.Matrix4,R=new P.Cartesian3,M=new P.Cartesian3,D=new b.Plane(P.Cartesian3.UNIT_X,0),G=new P.Cartesian3,x=new b.Plane(P.Cartesian3.UNIT_X,0),N=new P.Cartesian3,I=new P.Cartesian3,V=[];function k(a,e,r){var t=V;if(t.length=a,e===r){for(i=0;i<a;i++)t[i]=e;return t}for(var n=(r-e)/a,i=0;i<a;i++){var o=e+i*n;t[i]=o}return t}var L=new y.Cartographic,_=new y.Cartographic,O=new P.Cartesian3,B=new P.Cartesian3,U=new P.Cartesian3,z=new r.EllipsoidGeodesic,X=new A.EllipsoidRhumbLine;function q(a,e,r,t,n,i,o,s){var c=t.scaleToGeodeticSurface(a,B),l=t.scaleToGeodeticSurface(e,U),u=E.numberOfPoints(a,e,r),h=t.cartesianToCartographic(c,L),f=t.cartesianToCartographic(l,_),C=k(u,n,i);z.setEndPoints(h,f);var d=z.surfaceDistance/u,g=s;h.height=n;var p=t.cartographicToCartesian(h,O);P.Cartesian3.pack(p,o,g),g+=3;for(var v=1;v<u;v++){var m=z.interpolateUsingSurfaceDistance(v*d,_);m.height=C[v],p=t.cartographicToCartesian(m,O),P.Cartesian3.pack(p,o,g),g+=3}return g}function W(a,e,r,t,n,i,o,s){var c=t.scaleToGeodeticSurface(a,B),l=t.scaleToGeodeticSurface(e,U),u=t.cartesianToCartographic(c,L),h=t.cartesianToCartographic(l,_),f=E.numberOfPointsRhumbLine(u,h,r),C=k(f,n,i);X.ellipsoid.equals(t)||(X=new A.EllipsoidRhumbLine(void 0,void 0,t)),X.setEndPoints(u,h);var d=X.surfaceDistance/f,g=s;u.height=n;var p=t.cartographicToCartesian(u,O);P.Cartesian3.pack(p,o,g),g+=3;for(var v=1;v<f;v++){var m=X.interpolateUsingSurfaceDistance(v*d,_);m.height=C[v],p=t.cartographicToCartesian(m,O),P.Cartesian3.pack(p,o,g),g+=3}return g}E.wrapLongitude=function(a,e){var r=[],t=[];if(T.defined(a)&&0<a.length){e=T.defaultValue(e,v.Matrix4.IDENTITY);var n=v.Matrix4.inverseTransformation(e,S),i=v.Matrix4.multiplyByPoint(n,P.Cartesian3.ZERO,R),o=P.Cartesian3.normalize(v.Matrix4.multiplyByPointAsVector(n,P.Cartesian3.UNIT_Y,M),M),s=b.Plane.fromPointNormal(i,o,D),c=P.Cartesian3.normalize(v.Matrix4.multiplyByPointAsVector(n,P.Cartesian3.UNIT_X,G),G),l=b.Plane.fromPointNormal(i,c,x),u=1;r.push(P.Cartesian3.clone(a[0]));for(var h=r[0],f=a.length,C=1;C<f;++C){var d,g,p=a[C];(b.Plane.getPointDistance(l,h)<0||b.Plane.getPointDistance(l,p)<0)&&(d=m.IntersectionTests.lineSegmentPlane(h,p,s,N),T.defined(d)&&(g=P.Cartesian3.multiplyByScalar(o,5e-9,I),b.Plane.getPointDistance(s,h)<0&&P.Cartesian3.negate(g,g),r.push(P.Cartesian3.add(d,g,new P.Cartesian3)),t.push(u+1),P.Cartesian3.negate(g,g),r.push(P.Cartesian3.add(d,g,new P.Cartesian3)),u=1)),r.push(P.Cartesian3.clone(a[C])),u++,h=p}t.push(u)}return{positions:r,lengths:t}},E.generateArc=function(a){T.defined(a)||(a={});var e=a.positions,r=e.length,t=T.defaultValue(a.ellipsoid,y.Ellipsoid.WGS84),n=T.defaultValue(a.height,0),i=Array.isArray(n),o=T.defaultValue(a.ignoreEndPosition,!1);if(r<1)return[];if(1===r){var s,c=t.scaleToGeodeticSurface(e[0],B);return 0!==(n=i?n[0]:n)&&(s=t.geodeticSurfaceNormal(c,O),P.Cartesian3.multiplyByScalar(s,n,s),P.Cartesian3.add(c,s,c)),[c.x,c.y,c.z]}var l,u=a.minDistance;T.defined(u)||(l=T.defaultValue(a.granularity,w.CesiumMath.RADIANS_PER_DEGREE),u=w.CesiumMath.chordLength(l,t.maximumRadius));for(var h,f=0,C=0;C<r-1;C++)f+=E.numberOfPoints(e[C],e[C+1],u);h=o?3*f:3*(f+1);var d,g,p,v=new Array(h),m=0;for(C=0;C<r-1;C++)m=q(e[C],e[C+1],u,t,i?n[C]:n,i?n[C+1]:n,v,m);return V.length=0,o||(d=e[r-1],(g=t.cartesianToCartographic(d,L)).height=i?n[r-1]:n,p=t.cartographicToCartesian(g,O),P.Cartesian3.pack(p,v,h-3)),v};var Y=new y.Cartographic,H=new y.Cartographic;E.generateRhumbArc=function(a){T.defined(a)||(a={});var e=a.positions,r=e.length,t=T.defaultValue(a.ellipsoid,y.Ellipsoid.WGS84),n=T.defaultValue(a.height,0),i=Array.isArray(n);if(r<1)return[];if(1===r){var o,s=t.scaleToGeodeticSurface(e[0],B);return 0!==(n=i?n[0]:n)&&(o=t.geodeticSurfaceNormal(s,O),P.Cartesian3.multiplyByScalar(o,n,o),P.Cartesian3.add(s,o,s)),[s.x,s.y,s.z]}for(var c,l=T.defaultValue(a.granularity,w.CesiumMath.RADIANS_PER_DEGREE),u=0,h=t.cartesianToCartographic(e[0],Y),f=0;f<r-1;f++)c=t.cartesianToCartographic(e[f+1],H),u+=E.numberOfPointsRhumbLine(h,c,l),h=y.Cartographic.clone(c,Y);var C=3*(u+1),d=new Array(C),g=0;for(f=0;f<r-1;f++)g=W(e[f],e[f+1],l,t,i?n[f]:n,i?n[f+1]:n,d,g);V.length=0;var p=e[r-1],v=t.cartesianToCartographic(p,L);v.height=i?n[r-1]:n;var m=t.cartographicToCartesian(v,O);return P.Cartesian3.pack(m,d,C-3),d},E.generateCartesianArc=function(a){for(var e=E.generateArc(a),r=e.length/3,t=new Array(r),n=0;n<r;n++)t[n]=P.Cartesian3.unpack(e,3*n);return t},E.generateCartesianRhumbArc=function(a){for(var e=E.generateRhumbArc(a),r=e.length/3,t=new Array(r),n=0;n<r;n++)t[n]=P.Cartesian3.unpack(e,3*n);return t},a.PolylinePipeline=E});

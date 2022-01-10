define(["exports","./Math-336da716","./Cartesian3-7e3c315f","./Cartesian2-3f7e7089","./Transforms-77894148","./EllipsoidTangentPlane-0fc79016","./PolylinePipeline-fc1ec7d2"],function(a,j,Q,P,E,M,F){"use strict";var U=Object.freeze({ROUNDED:0,MITERED:1,BEVELED:2,EV_ARC:3}),_=[new Q.Cartesian3,new Q.Cartesian3],q=new Q.Cartesian3,Y=new Q.Cartesian3,Z=new Q.Cartesian3,k=new Q.Cartesian3,H=new Q.Cartesian3,J=new Q.Cartesian3,K=new Q.Cartesian3,W=new Q.Cartesian3,X=new Q.Cartesian3,$=new Q.Cartesian3,p=new Q.Cartesian3,aa={},ea=new P.Cartographic;function ra(a,e,r,n){var t=a[0],i=a[1],s=Q.Cartesian3.angleBetween(t,i),o=Math.ceil(s/n),l=new Array(o);if(e===r){for(c=0;c<o;c++)l[c]=e;return l.push(r),l}for(var C=(r-e)/o,c=1;c<o;c++){var u=e+c*C;l[c]=u}return l[0]=e,l.push(r),l}var T=new Q.Cartesian3,B=new Q.Cartesian3;var z=new Q.Cartesian3(-1,0,0),A=new E.Matrix4,S=new E.Matrix4,D=new E.Matrix3,b=E.Matrix3.IDENTITY.clone(),O=new Q.Cartesian3,V=new E.Cartesian4,N=new Q.Cartesian3;function na(a,e,r,n,t,i,s,o){var l=O,C=V;A=E.Transforms.eastNorthUpToFixedFrame(a,t,A),l=E.Matrix4.multiplyByPointAsVector(A,z,l),l=Q.Cartesian3.normalize(l,l);var c,u,y,m,d,f,p,g,w=(c=l,u=e,y=a,m=t,d=new M.EllipsoidTangentPlane(y,m),f=d.projectPointOntoPlane(Q.Cartesian3.add(y,c,T),T),p=d.projectPointOntoPlane(Q.Cartesian3.add(y,u,B),B),g=P.Cartesian2.angleBetween(f,p),0<=p.x*f.y-p.y*f.x?-g:g);D=E.Matrix3.fromRotationZ(w,D),N.z=i,A=E.Matrix4.multiplyTransformation(A,E.Matrix4.fromRotationTranslation(D,N,S),A);var h=b;h[0]=s;for(var v=0;v<o;v++)for(var x=0;x<r.length;x+=3)C=Q.Cartesian3.fromArray(r,x,C),C=E.Matrix3.multiplyByVector(h,C,C),C=E.Matrix4.multiplyByPoint(A,C,C),n.push(C.x,C.y,C.z);return n}var l=new Q.Cartesian3;function ta(a,e,r,n,t,i,s){for(var o=0;o<a.length;o+=3){n=na(Q.Cartesian3.fromArray(a,o,l),e,r,n,t,i[o/3],s,1)}return n}function ia(a,e){for(var r=a.length,n=new Array(3*r),t=0,i=e.x+e.width/2,s=e.y+e.height/2,o=0;o<r;o++)n[t++]=a[o].x-i,n[t++]=0,n[t++]=a[o].y-s;return n}var g=new E.Quaternion,w=new Q.Cartesian3,h=new E.Matrix3;function sa(a,e,r,n,t,i,s,o,l,C){var c,u=Q.Cartesian3.angleBetween(Q.Cartesian3.subtract(e,a,$),Q.Cartesian3.subtract(r,a,p)),y=n===U.BEVELED?0:Math.ceil(u/j.CesiumMath.toRadians(5)),m=t?E.Matrix3.fromQuaternion(E.Quaternion.fromAxisAngle(Q.Cartesian3.negate(a,$),u/(y+1),g),h):E.Matrix3.fromQuaternion(E.Quaternion.fromAxisAngle(a,u/(y+1),g),h);if(e=Q.Cartesian3.clone(e,w),0<y)for(var d=C?2:1,f=0;f<y;f++)e=E.Matrix3.multiplyByVector(m,e,e),c=Q.Cartesian3.subtract(e,a,$),c=Q.Cartesian3.normalize(c,c),t||(c=Q.Cartesian3.negate(c,c)),s=na(i.scaleToGeodeticSurface(e,p),c,o,s,i,l,1,d);else c=Q.Cartesian3.subtract(e,a,$),c=Q.Cartesian3.normalize(c,c),t||(c=Q.Cartesian3.negate(c,c)),s=na(i.scaleToGeodeticSurface(e,p),c,o,s,i,l,1,1),r=Q.Cartesian3.clone(r,w),c=Q.Cartesian3.subtract(r,a,$),c=Q.Cartesian3.normalize(c,c),t||(c=Q.Cartesian3.negate(c,c)),s=na(i.scaleToGeodeticSurface(r,p),c,o,s,i,l,1,1);return s}aa.removeDuplicatesFromShape=function(a){for(var e=a.length,r=[],n=e-1,t=0;t<e;n=t++){var i=a[n],s=a[t];P.Cartesian2.equals(i,s)||r.push(s)}return r},aa.angleIsGreaterThanPi=function(a,e,r,n){var t=new M.EllipsoidTangentPlane(r,n),i=t.projectPointOntoPlane(Q.Cartesian3.add(r,a,T),T),s=t.projectPointOntoPlane(Q.Cartesian3.add(r,e,B),B);return 0<=s.x*i.y-s.y*i.x};var oa=new Q.Cartesian3,la=new Q.Cartesian3;aa.computePositions=function(a,e,r,n,t,i){var s=n._ellipsoid,o=function(a,e){for(var r=new Array(a.length),n=0;n<a.length;n++){var t=a[n];ea=e.cartesianToCartographic(t,ea),r[n]=ea.height,a[n]=e.scaleToGeodeticSurface(t,t)}return r}(a,s),l=n._granularity,C=n._cornerType,c=(t?function(a,e){var r=a.length,n=new Array(6*r),t=0,i=e.x+e.width/2,s=e.y+e.height/2,o=a[0];n[t++]=o.x-i,n[t++]=0,n[t++]=o.y-s;for(var l=1;l<r;l++){var C=(o=a[l]).x-i,c=o.y-s;n[t++]=C,n[t++]=0,n[t++]=c,n[t++]=C,n[t++]=0,n[t++]=c}return o=a[0],n[t++]=o.x-i,n[t++]=0,n[t++]=o.y-s,n}:ia)(e,r),u=t?ia(e,r):void 0,y=r.height/2;i&&(y=0);var m=r.width/2,d=a.length,f=[],p=t?[]:void 0,g=q,w=Y,h=Z,v=k,x=H,P=J,E=K,M=W,T=X,B=a[0],z=a[1],v=s.geodeticSurfaceNormal(B,v);g=Q.Cartesian3.subtract(z,B,g),g=Q.Cartesian3.normalize(g,g),M=Q.Cartesian3.cross(v,g,M),M=Q.Cartesian3.normalize(M,M);var A,S=o[0],D=o[1];t&&(p=na(B,M,u,p,s,S+y,1,1)),T=Q.Cartesian3.clone(B,T),B=z,w=Q.Cartesian3.negate(g,w);for(var b=1;b<d-1;b++){var O=t?2:1,z=a[b+1],g=Q.Cartesian3.subtract(z,B,g);g=Q.Cartesian3.normalize(g,g),h=Q.Cartesian3.add(g,w,h),h=Q.Cartesian3.normalize(h,h),v=s.geodeticSurfaceNormal(B,v);var V=Q.Cartesian3.multiplyByScalar(v,Q.Cartesian3.dot(g,v),oa);Q.Cartesian3.subtract(g,V,V),Q.Cartesian3.normalize(V,V);var N,R,G=Q.Cartesian3.multiplyByScalar(v,Q.Cartesian3.dot(w,v),la);Q.Cartesian3.subtract(w,G,G),Q.Cartesian3.normalize(G,G),!j.CesiumMath.equalsEpsilon(Math.abs(Q.Cartesian3.dot(V,G)),1,j.CesiumMath.EPSILON7)?(h=Q.Cartesian3.cross(h,v,h),h=Q.Cartesian3.cross(v,h,h),h=Q.Cartesian3.normalize(h,h),N=1/Math.max(.25,Q.Cartesian3.magnitude(Q.Cartesian3.cross(h,w,$))),(R=aa.angleIsGreaterThanPi(g,w,B,s))?(x=Q.Cartesian3.add(B,Q.Cartesian3.multiplyByScalar(h,N*m,h),x),P=Q.Cartesian3.add(x,Q.Cartesian3.multiplyByScalar(M,m,P),P),_[0]=Q.Cartesian3.clone(T,_[0]),_[1]=Q.Cartesian3.clone(P,_[1]),A=ra(_,S+y,D+y,l),f=ta(F.PolylinePipeline.generateArc({positions:_,granularity:l,ellipsoid:s}),M,c,f,s,A,1),M=Q.Cartesian3.cross(v,g,M),M=Q.Cartesian3.normalize(M,M),E=Q.Cartesian3.add(x,Q.Cartesian3.multiplyByScalar(M,m,E),E),C===U.ROUNDED||C===U.BEVELED?sa(x,P,E,C,R,s,f,c,D+y,t):f=na(B,h=Q.Cartesian3.negate(h,h),c,f,s,D+y,N,O)):(x=Q.Cartesian3.add(B,Q.Cartesian3.multiplyByScalar(h,N*m,h),x),P=Q.Cartesian3.add(x,Q.Cartesian3.multiplyByScalar(M,-m,P),P),_[0]=Q.Cartesian3.clone(T,_[0]),_[1]=Q.Cartesian3.clone(P,_[1]),A=ra(_,S+y,D+y,l),f=ta(F.PolylinePipeline.generateArc({positions:_,granularity:l,ellipsoid:s}),M,c,f,s,A,1),M=Q.Cartesian3.cross(v,g,M),M=Q.Cartesian3.normalize(M,M),E=Q.Cartesian3.add(x,Q.Cartesian3.multiplyByScalar(M,-m,E),E),C===U.ROUNDED||C===U.BEVELED?sa(x,P,E,C,R,s,f,c,D+y,t):f=na(B,h,c,f,s,D+y,N,O)),T=Q.Cartesian3.clone(E,T),w=Q.Cartesian3.negate(g,w)):(f=na(T,M,c,f,s,S+y,1,1),T=B),S=D,D=o[b+1],B=z}_[0]=Q.Cartesian3.clone(T,_[0]),_[1]=Q.Cartesian3.clone(B,_[1]),A=ra(_,S+y,D+y,l),f=ta(F.PolylinePipeline.generateArc({positions:_,granularity:l,ellipsoid:s}),M,c,f,s,A,1),t&&(p=na(B,M,u,p,s,D+y,1,1)),d=f.length;var I=t?d+p.length:d,L=new Float64Array(I);return L.set(f),t&&L.set(p,d),L},a.CornerType=U,a.PolylineVolumeGeometryLibrary=aa});

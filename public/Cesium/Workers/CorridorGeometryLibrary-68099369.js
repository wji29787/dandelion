define(["exports","./when-b43ff45e","./Math-336da716","./Cartesian3-7e3c315f","./Transforms-77894148","./PolylineVolumeGeometryLibrary-55dfe377","./PolylinePipeline-fc1ec7d2"],function(a,l,ra,na,u,ta,ia){"use strict";var e={},sa=new na.Cartesian3,p=new na.Cartesian3,m=new na.Cartesian3,g=new na.Cartesian3,la=[new na.Cartesian3,new na.Cartesian3],Ca=new na.Cartesian3,oa=new na.Cartesian3,ya=new na.Cartesian3,ca=new na.Cartesian3,ua=new na.Cartesian3,da=new na.Cartesian3,pa=new na.Cartesian3,ma=new na.Cartesian3,ga=new na.Cartesian3,fa=new na.Cartesian3,d=new u.Quaternion,f=new u.Matrix3;function ha(a,e,r,n,t){var i,s=na.Cartesian3.angleBetween(na.Cartesian3.subtract(e,a,sa),na.Cartesian3.subtract(r,a,p)),l=n===ta.CornerType.BEVELED?1:Math.ceil(s/ra.CesiumMath.toRadians(5))+1,C=3*l,o=new Array(C);o[C-3]=r.x,o[C-2]=r.y,o[C-1]=r.z,i=t?u.Matrix3.fromQuaternion(u.Quaternion.fromAxisAngle(na.Cartesian3.negate(a,sa),s/l,d),f):u.Matrix3.fromQuaternion(u.Quaternion.fromAxisAngle(a,s/l,d),f);var y=0;e=na.Cartesian3.clone(e,sa);for(var c=0;c<l;c++)e=u.Matrix3.multiplyByVector(i,e,e),o[y++]=e.x,o[y++]=e.y,o[y++]=e.z;return o}function wa(a,e,r,n){var t=sa;return[(t=(n||(e=na.Cartesian3.negate(e,e)),na.Cartesian3.add(a,e,t))).x,t.y,t.z,r.x,r.y,r.z]}function za(a,e,r,n){for(var t=new Array(a.length),i=new Array(a.length),s=na.Cartesian3.multiplyByScalar(e,r,sa),l=na.Cartesian3.negate(s,p),C=0,o=a.length-1,y=0;y<a.length;y+=3){var c=na.Cartesian3.fromArray(a,y,m),u=na.Cartesian3.add(c,l,g);t[C++]=u.x,t[C++]=u.y,t[C++]=u.z;var d=na.Cartesian3.add(c,s,g);i[o--]=d.z,i[o--]=d.y,i[o--]=d.x}return n.push(t,i),n}function Ba(a,e){for(var r=a[0],n=a[1],t=a[2],i=new na.Cartesian3,s=new na.Cartesian3,l=new na.Cartesian3,C=1/(e+1),o=0,y=new Array(e),c=0;c<e;c++){var u=(1-(o=(c+1)*C))*(1-o),d=2*o*(1-o),p=o*o;na.Cartesian3.multiplyByScalar(r,u,i),na.Cartesian3.multiplyByScalar(n,d,s),na.Cartesian3.multiplyByScalar(t,p,l),na.Cartesian3.add(i,s,s),y[c]=na.Cartesian3.add(s,l,new na.Cartesian3)}return y}e.addAttribute=function(a,e,r,n){var t=e.x,i=e.y,s=e.z;l.defined(r)&&(a[r]=t,a[r+1]=i,a[r+2]=s),l.defined(n)&&(a[n]=s,a[n-1]=i,a[n-2]=t)};var Sa=new na.Cartesian3,Pa=new na.Cartesian3;e.computePositions=function(a){var e,r=a.granularity,n=a.positions,t=a.ellipsoid,i=a.width/2,s=a.cornerType,l=a.saveAttributes,C=Ca,o=oa,y=ya,c=ca,u=ua,d=da,p=pa,m=ma,g=ga,f=fa,h=[],w=l?[]:void 0,z=l?[]:void 0,B=n[0],S=n[1],P=Math.cos(ra.CesiumMath.toRadians(170)),o=na.Cartesian3.normalize(na.Cartesian3.subtract(S,B,o),o),C=t.geodeticSurfaceNormal(B,C),c=na.Cartesian3.normalize(na.Cartesian3.cross(C,o,c),c);l&&(w.push(c.x,c.y,c.z),z.push(C.x,C.y,C.z)),p=na.Cartesian3.clone(B,p),B=S,y=na.Cartesian3.negate(o,y);var x,v,A,b,E,D,T,M,N,L=[],R=n.length;if(s===ta.CornerType.EV_ARC)for(x=1;x<R-1;x++){C=t.geodeticSurfaceNormal(B,C),S=n[x+1],o=na.Cartesian3.normalize(na.Cartesian3.subtract(S,B,o),o),u=na.Cartesian3.normalize(na.Cartesian3.add(o,y,u),u);var V=na.Cartesian3.multiplyByScalar(C,na.Cartesian3.dot(o,C),Sa);na.Cartesian3.subtract(o,V,V),na.Cartesian3.normalize(V,V);var G=na.Cartesian3.multiplyByScalar(C,na.Cartesian3.dot(y,C),Pa);if(na.Cartesian3.subtract(y,G,G),na.Cartesian3.normalize(G,G),na.Cartesian3.dot(V,G)>P){var O=2*i;na.Cartesian3.add(B,na.Cartesian3.multiplyByScalar(y,O,f),f),na.Cartesian3.clone(p,la[0]),na.Cartesian3.clone(f,la[1]);var Q=(h=za(ia.PolylinePipeline.generateArc({positions:la,granularity:r,ellipsoid:t}),c,i,h)).length,U=h[Q-1],I=h[Q-2],k=na.Cartesian3.unpack(U,0),q=na.Cartesian3.unpack(I,I.length-3),_=i/na.Cartesian3.magnitude(na.Cartesian3.cross(u,y,sa)),u=na.Cartesian3.multiplyByScalar(u,_,u);(ea=ta.PolylineVolumeGeometryLibrary.angleIsGreaterThanPi(o,y,B,t))?(m=na.Cartesian3.add(B,u,m),g=na.Cartesian3.add(B,na.Cartesian3.negate(u,u),g)):(na.Cartesian3.add(B,u,g),na.Cartesian3.add(B,na.Cartesian3.negate(u,u),m)),na.Cartesian3.add(B,na.Cartesian3.multiplyByScalar(o,O,p),p),na.Cartesian3.normalize(na.Cartesian3.cross(C,o,c),c);for(var j=na.Cartesian3.multiplyByScalar(c,i,new na.Cartesian3),F=na.Cartesian3.add(p,j),H=[q,m,na.Cartesian3.subtract(p,j)],J=Ba([k,g,F],2e3),K=Ba(H,2e3),W=new Array(6e3),X=new Array(6e3),Y=0,Z=5999,$=0,aa=K.length;$<aa;$++)W[Y++]=K[$].x,W[Y++]=K[$].y,W[Y++]=K[$].z,X[Z--]=J[$].z,X[Z--]=J[$].y,X[Z--]=J[$].x;h[Q-2]=I.concat(W),h[Q-1]=X.concat(U)}else na.Cartesian3.clone(p,la[0]),na.Cartesian3.clone(B,la[1]),h=za(ia.PolylinePipeline.generateArc({positions:la,granularity:r,ellipsoid:t,ignoreEndPosition:!0}),c,i,h),na.Cartesian3.normalize(na.Cartesian3.cross(C,o,c),c),p=B;y=na.Cartesian3.negate(o,y),B=S}else for(x=1;x<R-1;x++){C=t.geodeticSurfaceNormal(B,C),S=n[x+1],o=na.Cartesian3.normalize(na.Cartesian3.subtract(S,B,o),o),u=na.Cartesian3.normalize(na.Cartesian3.add(o,y,u),u);V=na.Cartesian3.multiplyByScalar(C,na.Cartesian3.dot(o,C),Sa);na.Cartesian3.subtract(o,V,V),na.Cartesian3.normalize(V,V);var ea,G=na.Cartesian3.multiplyByScalar(C,na.Cartesian3.dot(y,C),Pa);na.Cartesian3.subtract(y,G,G),na.Cartesian3.normalize(G,G),!ra.CesiumMath.equalsEpsilon(Math.abs(na.Cartesian3.dot(V,G)),1,ra.CesiumMath.EPSILON7)&&(_=i/na.Cartesian3.magnitude(na.Cartesian3.cross(u,y,sa)),u=na.Cartesian3.multiplyByScalar(u,_,u),(ea=ta.PolylineVolumeGeometryLibrary.angleIsGreaterThanPi(o,y,B,t))?(m=na.Cartesian3.add(B,u,m),na.Cartesian3.add(m,na.Cartesian3.multiplyByScalar(c,i,f),f),g=na.Cartesian3.add(m,na.Cartesian3.multiplyByScalar(c,2*i,g),g),la[0]=na.Cartesian3.clone(p,la[0]),la[1]=na.Cartesian3.clone(f,la[1]),h=za(ia.PolylinePipeline.generateArc({positions:la,granularity:r,ellipsoid:t}),c,i,h),l&&(w.push(c.x,c.y,c.z),z.push(C.x,C.y,C.z)),d=na.Cartesian3.clone(g,d),c=na.Cartesian3.normalize(na.Cartesian3.cross(C,o,c),c),g=na.Cartesian3.add(m,na.Cartesian3.multiplyByScalar(c,2*i,g),g),p=na.Cartesian3.add(m,na.Cartesian3.multiplyByScalar(c,i,p),p),s===ta.CornerType.ROUNDED||s===ta.CornerType.BEVELED?L.push({leftPositions:ha(m,d,g,s,ea)}):L.push({leftPositions:wa(B,na.Cartesian3.negate(u,u),g,ea)})):(g=na.Cartesian3.add(B,u,g),f=na.Cartesian3.add(g,na.Cartesian3.negate(na.Cartesian3.multiplyByScalar(c,i,f),f),f),m=na.Cartesian3.add(g,na.Cartesian3.negate(na.Cartesian3.multiplyByScalar(c,2*i,m),m),m),la[0]=na.Cartesian3.clone(p,la[0]),la[1]=na.Cartesian3.clone(f,la[1]),h=za(ia.PolylinePipeline.generateArc({positions:la,granularity:r,ellipsoid:t}),c,i,h),l&&(w.push(c.x,c.y,c.z),z.push(C.x,C.y,C.z)),d=na.Cartesian3.clone(m,d),c=na.Cartesian3.normalize(na.Cartesian3.cross(C,o,c),c),m=na.Cartesian3.add(g,na.Cartesian3.negate(na.Cartesian3.multiplyByScalar(c,2*i,m),m),m),p=na.Cartesian3.add(g,na.Cartesian3.negate(na.Cartesian3.multiplyByScalar(c,i,p),p),p),s===ta.CornerType.ROUNDED||s===ta.CornerType.BEVELED?L.push({rightPositions:ha(g,d,m,s,ea)}):L.push({rightPositions:wa(B,u,m,ea)})),y=na.Cartesian3.negate(o,y)),B=S}return C=t.geodeticSurfaceNormal(B,C),la[0]=na.Cartesian3.clone(p,la[0]),la[1]=na.Cartesian3.clone(B,la[1]),h=za(ia.PolylinePipeline.generateArc({positions:la,granularity:r,ellipsoid:t}),c,i,h),l&&(w.push(c.x,c.y,c.z),z.push(C.x,C.y,C.z)),s===ta.CornerType.ROUNDED&&(A=Ca,b=oa,E=ya,D=(v=h)[1],b=na.Cartesian3.fromArray(v[1],D.length-3,b),E=na.Cartesian3.fromArray(v[0],0,E),T=ha(A=na.Cartesian3.midpoint(b,E,A),b,E,ta.CornerType.ROUNDED,!1),M=v.length-1,N=v[M-1],D=v[M],b=na.Cartesian3.fromArray(N,N.length-3,b),E=na.Cartesian3.fromArray(D,0,E),e=[T,ha(A=na.Cartesian3.midpoint(b,E,A),b,E,ta.CornerType.ROUNDED,!1)]),{positions:h,corners:L,lefts:w,normals:z,endPositions:e}},a.CorridorGeometryLibrary=e});

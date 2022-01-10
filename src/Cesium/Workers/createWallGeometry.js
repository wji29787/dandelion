define(["./when-b43ff45e","./Check-d404a0fe","./Math-336da716","./Cartesian3-2b5b9afe","./Cartesian2-577f67dc","./Transforms-18f02e2b","./RuntimeError-bf10f3d5","./WebGLConstants-56de22c0","./ComponentDatatype-8956ad9a","./GeometryAttribute-5eb995bc","./JulianDate-53cdb307","./RequestType-beb1291d","./GeometryAttributes-fbf888b4","./IndexDatatype-c5295474","./IntersectionTests-8ff35218","./Plane-5b30f0ff","./VertexFormat-89c0971b","./EllipsoidTangentPlane-51ba1d6b","./EllipsoidRhumbLine-b4761ded","./PolygonPipeline-6cd12a44","./EllipsoidGeodesic-47c65dee","./PolylinePipeline-76ef9442","./WallGeometryLibrary-6bf4e538"],function(Z,e,j,K,p,Q,t,a,X,$,i,n,ee,te,r,o,u,s,m,l,d,c,ae){"use strict";var ie=new K.Cartesian3,ne=new K.Cartesian3,re=new K.Cartesian3,oe=new K.Cartesian3,se=new K.Cartesian3,me=new K.Cartesian3,le=new K.Cartesian3,de=new K.Cartesian3;function f(e){var t=(e=Z.defaultValue(e,Z.defaultValue.EMPTY_OBJECT)).positions,a=e.maximumHeights,i=e.minimumHeights,n=Z.defaultValue(e.vertexFormat,u.VertexFormat.DEFAULT),r=Z.defaultValue(e.granularity,j.CesiumMath.RADIANS_PER_DEGREE),o=Z.defaultValue(e.ellipsoid,p.Ellipsoid.WGS84);this._positions=t,this._minimumHeights=i,this._maximumHeights=a,this._vertexFormat=u.VertexFormat.clone(n),this._granularity=r,this._ellipsoid=p.Ellipsoid.clone(o),this._workerName="createWallGeometry";var s=1+t.length*K.Cartesian3.packedLength+2;Z.defined(i)&&(s+=i.length),Z.defined(a)&&(s+=a.length),this.packedLength=s+p.Ellipsoid.packedLength+u.VertexFormat.packedLength+1}f.pack=function(e,t,a){var i;a=Z.defaultValue(a,0);var n=e._positions,r=n.length;for(t[a++]=r,i=0;i<r;++i,a+=K.Cartesian3.packedLength)K.Cartesian3.pack(n[i],t,a);var o=e._minimumHeights,r=Z.defined(o)?o.length:0;if(t[a++]=r,Z.defined(o))for(i=0;i<r;++i)t[a++]=o[i];var s=e._maximumHeights;if(r=Z.defined(s)?s.length:0,t[a++]=r,Z.defined(s))for(i=0;i<r;++i)t[a++]=s[i];return p.Ellipsoid.pack(e._ellipsoid,t,a),a+=p.Ellipsoid.packedLength,u.VertexFormat.pack(e._vertexFormat,t,a),t[a+=u.VertexFormat.packedLength]=e._granularity,t};var y=p.Ellipsoid.clone(p.Ellipsoid.UNIT_SPHERE),g=new u.VertexFormat,h={positions:void 0,minimumHeights:void 0,maximumHeights:void 0,ellipsoid:y,vertexFormat:g,granularity:void 0};return f.unpack=function(e,t,a){t=Z.defaultValue(t,0);for(var i,n,r=e[t++],o=new Array(r),s=0;s<r;++s,t+=K.Cartesian3.packedLength)o[s]=K.Cartesian3.unpack(e,t);if(0<(r=e[t++]))for(i=new Array(r),s=0;s<r;++s)i[s]=e[t++];if(0<(r=e[t++]))for(n=new Array(r),s=0;s<r;++s)n[s]=e[t++];var m=p.Ellipsoid.unpack(e,t,y);t+=p.Ellipsoid.packedLength;var l=u.VertexFormat.unpack(e,t,g),d=e[t+=u.VertexFormat.packedLength];return Z.defined(a)?(a._positions=o,a._minimumHeights=i,a._maximumHeights=n,a._ellipsoid=p.Ellipsoid.clone(m,a._ellipsoid),a._vertexFormat=u.VertexFormat.clone(l,a._vertexFormat),a._granularity=d,a):(h.positions=o,h.minimumHeights=i,h.maximumHeights=n,h.granularity=d,new f(h))},f.fromConstantHeights=function(e){var t=(e=Z.defaultValue(e,Z.defaultValue.EMPTY_OBJECT)).positions,a=e.minimumHeight,i=e.maximumHeight,n=Z.defined(a),r=Z.defined(i);if(n||r)for(var o=t.length,s=n?new Array(o):void 0,m=r?new Array(o):void 0,l=0;l<o;++l)n&&(s[l]=a),r&&(m[l]=i);return new f({positions:t,maximumHeights:m,minimumHeights:s,ellipsoid:e.ellipsoid,vertexFormat:e.vertexFormat})},f.createGeometry=function(e){var t=e._positions,a=e._minimumHeights,i=e._maximumHeights,n=e._vertexFormat,r=e._granularity,o=e._ellipsoid,s=ae.WallGeometryLibrary.computePositions(o,t,i,a,r,!0);if(Z.defined(s)){var m=s.bottomPositions,l=s.topPositions,d=s.numCorners,p=l.length,u=2*p,c=n.position?new Float64Array(u):void 0,f=n.normal?new Float32Array(u):void 0,y=n.tangent?new Float32Array(u):void 0,g=n.bitangent?new Float32Array(u):void 0,h=n.st?new Float32Array(u/3*2):void 0,C=0,b=0,v=0,A=0,x=0,_=de,E=le,w=me,F=!0,L=0,k=1/((p/=3)-t.length+1);for(p-t.length+1==0&&(k=1/(t.length-1)),N=0;N<p;++N){var G,P,H,T,V,D=3*N,z=K.Cartesian3.fromArray(l,D,ie),O=K.Cartesian3.fromArray(m,D,ne);n.position&&(c[C++]=O.x,c[C++]=O.y,c[C++]=O.z,c[C++]=z.x,c[C++]=z.y,c[C++]=z.z),n.st&&(h[x++]=L,h[x++]=0,h[x++]=L,h[x++]=1),(n.normal||n.tangent||n.bitangent)&&(P=K.Cartesian3.clone(K.Cartesian3.ZERO,se),H=o.scaleToGeodeticSurface(K.Cartesian3.fromArray(l,D,ne),ne),N+1<p&&(G=o.scaleToGeodeticSurface(K.Cartesian3.fromArray(l,3+D,re),re),P=K.Cartesian3.fromArray(l,3+D,se)),F&&(T=K.Cartesian3.subtract(P,z,oe),V=K.Cartesian3.subtract(H,z,ie),_=K.Cartesian3.normalize(K.Cartesian3.cross(V,T,_),_),F=!1),K.Cartesian3.equalsEpsilon(G,H,j.CesiumMath.EPSILON10)?F=!0:(L=1<(L+=k)?L-1:L,n.tangent&&(E=K.Cartesian3.normalize(K.Cartesian3.subtract(G,H,E),E)),n.bitangent&&(w=K.Cartesian3.normalize(K.Cartesian3.cross(_,E,w),w))),n.normal&&(f[b++]=_.x,f[b++]=_.y,f[b++]=_.z,f[b++]=_.x,f[b++]=_.y,f[b++]=_.z),n.tangent&&(y[A++]=E.x,y[A++]=E.y,y[A++]=E.z,y[A++]=E.x,y[A++]=E.y,y[A++]=E.z),n.bitangent&&(g[v++]=w.x,g[v++]=w.y,g[v++]=w.z,g[v++]=w.x,g[v++]=w.y,g[v++]=w.z))}var S=new ee.GeometryAttributes;n.position&&(S.position=new $.GeometryAttribute({componentDatatype:X.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:c})),n.normal&&(S.normal=new $.GeometryAttribute({componentDatatype:X.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:f})),n.tangent&&(S.tangent=new $.GeometryAttribute({componentDatatype:X.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:y})),n.bitangent&&(S.bitangent=new $.GeometryAttribute({componentDatatype:X.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:g})),n.st&&(S.st=new $.GeometryAttribute({componentDatatype:X.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:h}));var R=u/3;u-=6*(d+1);for(var I=te.IndexDatatype.createTypedArray(R,u),M=0,N=0;N<R-2;N+=2){var W,B,q=N,J=N+2,U=K.Cartesian3.fromArray(c,3*q,ie),Y=K.Cartesian3.fromArray(c,3*J,ne);K.Cartesian3.equalsEpsilon(U,Y,j.CesiumMath.EPSILON10)||(W=N+1,B=N+3,I[M++]=W,I[M++]=q,I[M++]=B,I[M++]=B,I[M++]=q,I[M++]=J)}return new $.Geometry({attributes:S,indices:I,primitiveType:$.PrimitiveType.TRIANGLES,boundingSphere:new Q.BoundingSphere.fromVertices(c)})}},function(e,t){return Z.defined(t)&&(e=f.unpack(e,t)),e._ellipsoid=p.Ellipsoid.clone(e._ellipsoid),f.createGeometry(e)}});
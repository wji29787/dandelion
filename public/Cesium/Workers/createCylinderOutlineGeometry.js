define(["./when-b43ff45e","./Check-d404a0fe","./Math-336da716","./Cartesian3-2b5b9afe","./Cartesian2-577f67dc","./Transforms-18f02e2b","./RuntimeError-bf10f3d5","./WebGLConstants-56de22c0","./ComponentDatatype-8956ad9a","./GeometryAttribute-5eb995bc","./JulianDate-53cdb307","./RequestType-beb1291d","./GeometryAttributes-fbf888b4","./IndexDatatype-c5295474","./GeometryOffsetAttribute-9f7392ac","./CylinderGeometryLibrary-e4433c22"],function(h,e,t,v,A,R,i,a,G,O,r,n,C,V,L,g){"use strict";var w=new A.Cartesian2;function f(e){var t=(e=h.defaultValue(e,h.defaultValue.EMPTY_OBJECT)).length,i=e.topRadius,a=e.bottomRadius,r=h.defaultValue(e.slices,128),n=Math.max(h.defaultValue(e.numberOfVerticalLines,16),0);this._length=t,this._topRadius=i,this._bottomRadius=a,this._slices=r,this._numberOfVerticalLines=n,this._offsetAttribute=e.offsetAttribute,this._workerName="createCylinderOutlineGeometry"}f.packedLength=6,f.pack=function(e,t,i){return i=h.defaultValue(i,0),t[i++]=e._length,t[i++]=e._topRadius,t[i++]=e._bottomRadius,t[i++]=e._slices,t[i++]=e._numberOfVerticalLines,t[i]=h.defaultValue(e._offsetAttribute,-1),t};var d={length:void 0,topRadius:void 0,bottomRadius:void 0,slices:void 0,numberOfVerticalLines:void 0,offsetAttribute:void 0};return f.unpack=function(e,t,i){t=h.defaultValue(t,0);var a=e[t++],r=e[t++],n=e[t++],o=e[t++],u=e[t++],s=e[t];return h.defined(i)?(i._length=a,i._topRadius=r,i._bottomRadius=n,i._slices=o,i._numberOfVerticalLines=u,i._offsetAttribute=-1===s?void 0:s,i):(d.length=a,d.topRadius=r,d.bottomRadius=n,d.slices=o,d.numberOfVerticalLines=u,d.offsetAttribute=-1===s?void 0:s,new f(d))},f.createGeometry=function(e){var t=e._length,i=e._topRadius,a=e._bottomRadius,r=e._slices,n=e._numberOfVerticalLines;if(!(t<=0||i<0||a<0||0===i&&0===a)){var o,u,s=2*r,f=g.CylinderGeometryLibrary.computePositions(t,i,a,r,!1),d=2*r;0<n&&(o=Math.min(n,r),u=Math.round(r/o),d+=o);for(var b=V.IndexDatatype.createTypedArray(s,2*d),l=0,m=0;m<r-1;m++)b[l++]=m,b[l++]=m+1,b[l++]=m+r,b[l++]=m+1+r;if(b[l++]=r-1,b[l++]=0,b[l++]=r+r-1,b[l++]=r,0<n)for(m=0;m<r;m+=u)b[l++]=m,b[l++]=m+r;var c=new C.GeometryAttributes;c.position=new O.GeometryAttribute({componentDatatype:G.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:f}),w.x=.5*t,w.y=Math.max(a,i);var p,y,_=new R.BoundingSphere(v.Cartesian3.ZERO,A.Cartesian2.magnitude(w));return h.defined(e._offsetAttribute)&&(t=f.length,p=new Uint8Array(t/3),y=e._offsetAttribute===L.GeometryOffsetAttribute.NONE?0:1,L.arrayFill(p,y),c.applyOffset=new O.GeometryAttribute({componentDatatype:G.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:p})),new O.Geometry({attributes:c,indices:b,primitiveType:O.PrimitiveType.LINES,boundingSphere:_,offsetAttribute:e._offsetAttribute})}},function(e,t){return h.defined(t)&&(e=f.unpack(e,t)),f.createGeometry(e)}});
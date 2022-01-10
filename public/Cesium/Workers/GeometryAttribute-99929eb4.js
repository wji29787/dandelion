define(["exports","./when-b43ff45e","./Check-d404a0fe","./Cartesian3-c7287f49","./Cartesian2-9a499d77","./Transforms-51e94f16","./WebGLConstants-56de22c0"],function(e,a,t,O,M,v,n){"use strict";var r=Object.freeze({NONE:0,TRIANGLES:1,LINES:2,POLYLINES:3});function R(e,t,n,r){this[0]=a.defaultValue(e,0),this[1]=a.defaultValue(n,0),this[2]=a.defaultValue(t,0),this[3]=a.defaultValue(r,0)}R.packedLength=4,R.pack=function(e,t,n){return n=a.defaultValue(n,0),t[n++]=e[0],t[n++]=e[1],t[n++]=e[2],t[n++]=e[3],t},R.unpack=function(e,t,n){return t=a.defaultValue(t,0),a.defined(n)||(n=new R),n[0]=e[t++],n[1]=e[t++],n[2]=e[t++],n[3]=e[t++],n},R.clone=function(e,t){if(a.defined(e))return a.defined(t)?(t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t):new R(e[0],e[2],e[1],e[3])},R.fromArray=function(e,t,n){return t=a.defaultValue(t,0),a.defined(n)||(n=new R),n[0]=e[t],n[1]=e[t+1],n[2]=e[t+2],n[3]=e[t+3],n},R.fromColumnMajorArray=function(e,t){return R.clone(e,t)},R.fromRowMajorArray=function(e,t){return a.defined(t)?(t[0]=e[0],t[1]=e[2],t[2]=e[1],t[3]=e[3],t):new R(e[0],e[1],e[2],e[3])},R.fromScale=function(e,t){return a.defined(t)?(t[0]=e.x,t[1]=0,t[2]=0,t[3]=e.y,t):new R(e.x,0,0,e.y)},R.fromUniformScale=function(e,t){return a.defined(t)?(t[0]=e,t[1]=0,t[2]=0,t[3]=e,t):new R(e,0,0,e)},R.fromRotation=function(e,t){var n=Math.cos(e),r=Math.sin(e);return a.defined(t)?(t[0]=n,t[1]=r,t[2]=-r,t[3]=n,t):new R(n,-r,r,n)},R.toArray=function(e,t){return a.defined(t)?(t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t):[e[0],e[1],e[2],e[3]]},R.getElementIndex=function(e,t){return 2*e+t},R.getColumn=function(e,t,n){var r=2*t,a=e[r],i=e[1+r];return n.x=a,n.y=i,n},R.setColumn=function(e,t,n,r){var a=2*t;return(r=R.clone(e,r))[a]=n.x,r[1+a]=n.y,r},R.getRow=function(e,t,n){var r=e[t],a=e[t+2];return n.x=r,n.y=a,n},R.setRow=function(e,t,n,r){return(r=R.clone(e,r))[t]=n.x,r[t+2]=n.y,r};var i=new M.Cartesian2;R.getScale=function(e,t){return t.x=M.Cartesian2.magnitude(M.Cartesian2.fromElements(e[0],e[1],i)),t.y=M.Cartesian2.magnitude(M.Cartesian2.fromElements(e[2],e[3],i)),t};var u=new M.Cartesian2;R.getMaximumScale=function(e){return R.getScale(e,u),M.Cartesian2.maximumComponent(u)},R.multiply=function(e,t,n){var r=e[0]*t[0]+e[2]*t[1],a=e[0]*t[2]+e[2]*t[3],i=e[1]*t[0]+e[3]*t[1],u=e[1]*t[2]+e[3]*t[3];return n[0]=r,n[1]=i,n[2]=a,n[3]=u,n},R.add=function(e,t,n){return n[0]=e[0]+t[0],n[1]=e[1]+t[1],n[2]=e[2]+t[2],n[3]=e[3]+t[3],n},R.subtract=function(e,t,n){return n[0]=e[0]-t[0],n[1]=e[1]-t[1],n[2]=e[2]-t[2],n[3]=e[3]-t[3],n},R.multiplyByVector=function(e,t,n){var r=e[0]*t.x+e[2]*t.y,a=e[1]*t.x+e[3]*t.y;return n.x=r,n.y=a,n},R.multiplyByScalar=function(e,t,n){return n[0]=e[0]*t,n[1]=e[1]*t,n[2]=e[2]*t,n[3]=e[3]*t,n},R.multiplyByScale=function(e,t,n){return n[0]=e[0]*t.x,n[1]=e[1]*t.x,n[2]=e[2]*t.y,n[3]=e[3]*t.y,n},R.negate=function(e,t){return t[0]=-e[0],t[1]=-e[1],t[2]=-e[2],t[3]=-e[3],t},R.transpose=function(e,t){var n=e[0],r=e[2],a=e[1],i=e[3];return t[0]=n,t[1]=r,t[2]=a,t[3]=i,t},R.abs=function(e,t){return t[0]=Math.abs(e[0]),t[1]=Math.abs(e[1]),t[2]=Math.abs(e[2]),t[3]=Math.abs(e[3]),t},R.equals=function(e,t){return e===t||a.defined(e)&&a.defined(t)&&e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]},R.equalsArray=function(e,t,n){return e[0]===t[n]&&e[1]===t[n+1]&&e[2]===t[n+2]&&e[3]===t[n+3]},R.equalsEpsilon=function(e,t,n){return e===t||a.defined(e)&&a.defined(t)&&Math.abs(e[0]-t[0])<=n&&Math.abs(e[1]-t[1])<=n&&Math.abs(e[2]-t[2])<=n&&Math.abs(e[3]-t[3])<=n},R.IDENTITY=Object.freeze(new R(1,0,0,1)),R.ZERO=Object.freeze(new R(0,0,0,0)),R.COLUMN0ROW0=0,R.COLUMN0ROW1=1,R.COLUMN1ROW0=2,R.COLUMN1ROW1=3,Object.defineProperties(R.prototype,{length:{get:function(){return R.packedLength}}}),R.prototype.clone=function(e){return R.clone(this,e)},R.prototype.equals=function(e){return R.equals(this,e)},R.prototype.equalsEpsilon=function(e,t){return R.equalsEpsilon(this,e,t)},R.prototype.toString=function(){return"("+this[0]+", "+this[2]+")\n("+this[1]+", "+this[3]+")"};var o={POINTS:n.WebGLConstants.POINTS,LINES:n.WebGLConstants.LINES,LINE_LOOP:n.WebGLConstants.LINE_LOOP,LINE_STRIP:n.WebGLConstants.LINE_STRIP,TRIANGLES:n.WebGLConstants.TRIANGLES,TRIANGLE_STRIP:n.WebGLConstants.TRIANGLE_STRIP,TRIANGLE_FAN:n.WebGLConstants.TRIANGLE_FAN,validate:function(e){return e===o.POINTS||e===o.LINES||e===o.LINE_LOOP||e===o.LINE_STRIP||e===o.TRIANGLES||e===o.TRIANGLE_STRIP||e===o.TRIANGLE_FAN}},s=Object.freeze(o);function f(e){e=a.defaultValue(e,a.defaultValue.EMPTY_OBJECT),this.attributes=e.attributes,this.indices=e.indices,this.primitiveType=a.defaultValue(e.primitiveType,s.TRIANGLES),this.boundingSphere=e.boundingSphere,this.geometryType=a.defaultValue(e.geometryType,r.NONE),this.boundingSphereCV=e.boundingSphereCV,this.offsetAttribute=e.offsetAttribute}f.computeNumberOfVertices=function(e){var t,n=-1;for(var r in e.attributes){e.attributes.hasOwnProperty(r)&&a.defined(e.attributes[r])&&a.defined(e.attributes[r].values)&&(n=(t=e.attributes[r]).values.length/t.componentsPerAttribute)}return n};var P=new M.Cartographic,V=new O.Cartesian3,G=new v.Matrix4,_=[new M.Cartographic,new M.Cartographic,new M.Cartographic],W=[new M.Cartesian2,new M.Cartesian2,new M.Cartesian2],B=[new M.Cartesian2,new M.Cartesian2,new M.Cartesian2],F=new O.Cartesian3,k=new v.Quaternion,Y=new v.Matrix4,j=new R;f._textureCoordinateRotationPoints=function(e,t,n,r){var a=M.Rectangle.center(r,P),i=M.Cartographic.toCartesian(a,n,V),u=v.Transforms.eastNorthUpToFixedFrame(i,n,G),o=v.Matrix4.inverse(u,G),s=W,f=_;f[0].longitude=r.west,f[0].latitude=r.south,f[1].longitude=r.west,f[1].latitude=r.north,f[2].longitude=r.east,f[2].latitude=r.south;for(var c=F,l=0;l<3;l++)M.Cartographic.toCartesian(f[l],n,c),c=v.Matrix4.multiplyByPointAsVector(o,c,c),s[l].x=c.x,s[l].y=c.y;var d=v.Quaternion.fromAxisAngle(O.Cartesian3.UNIT_Z,-t,k),y=v.Matrix3.fromQuaternion(d,Y),m=e.length,p=Number.POSITIVE_INFINITY,h=Number.POSITIVE_INFINITY,N=Number.NEGATIVE_INFINITY,I=Number.NEGATIVE_INFINITY;for(l=0;l<m;l++)c=v.Matrix4.multiplyByPointAsVector(o,e[l],c),c=v.Matrix3.multiplyByVector(y,c,c),p=Math.min(p,c.x),h=Math.min(h,c.y),N=Math.max(N,c.x),I=Math.max(I,c.y);var C=R.fromRotation(t,j),b=B;b[0].x=p,b[0].y=h,b[1].x=p,b[1].y=I,b[2].x=N,b[2].y=h;var T=s[0],E=s[2].x-T.x,x=s[1].y-T.y;for(l=0;l<3;l++){var L=b[l];R.multiplyByVector(C,L,L),L.x=(L.x-T.x)/E,L.y=(L.y-T.y)/x}var w=b[0],g=b[1],S=b[2],A=new Array(6);return M.Cartesian2.pack(w,A),M.Cartesian2.pack(g,A,2),M.Cartesian2.pack(S,A,4),A},e.Geometry=f,e.GeometryAttribute=function(e){e=a.defaultValue(e,a.defaultValue.EMPTY_OBJECT),this.componentDatatype=e.componentDatatype,this.componentsPerAttribute=e.componentsPerAttribute,this.normalize=a.defaultValue(e.normalize,!1),this.values=e.values},e.GeometryType=r,e.Matrix2=R,e.PrimitiveType=s});
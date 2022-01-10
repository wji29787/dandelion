define(["exports","./when-b43ff45e","./Check-d404a0fe","./Math-336da716"],function(n,d,i,u){"use strict";function y(n,e,r){this.x=d.defaultValue(n,0),this.y=d.defaultValue(e,0),this.z=d.defaultValue(r,0)}y.fromSpherical=function(n,e){d.defined(e)||(e=new y);var r=n.clock,t=n.cone,a=d.defaultValue(n.magnitude,1),i=a*Math.sin(t);return e.x=i*Math.cos(r),e.y=i*Math.sin(r),e.z=a*Math.cos(t),e},y.fromElements=function(n,e,r,t){return d.defined(t)?(t.x=n,t.y=e,t.z=r,t):new y(n,e,r)},y.fromCartesian4=y.clone=function(n,e){if(d.defined(n))return d.defined(e)?(e.x=n.x,e.y=n.y,e.z=n.z,e):new y(n.x,n.y,n.z)},y.packedLength=3,y.pack=function(n,e,r){return r=d.defaultValue(r,0),e[r++]=n.x,e[r++]=n.y,e[r]=n.z,e},y.unpack=function(n,e,r){return e=d.defaultValue(e,0),d.defined(r)||(r=new y),r.x=n[e++],r.y=n[e++],r.z=n[e],r},y.packArray=function(n,e){var r=n.length,t=3*r;if(d.defined(e)){if(!Array.isArray(e)&&e.length!==t)throw new i.DeveloperError("If result is a typed array, it must have exactly array.length * 3 elements");e.length!==t&&(e.length=t)}else e=new Array(t);for(var a=0;a<r;++a)y.pack(n[a],e,3*a);return e},y.unpackArray=function(n,e){var r=n.length;d.defined(e)?e.length=r/3:e=new Array(r/3);for(var t=0;t<r;t+=3){var a=t/3;e[a]=y.unpack(n,t,e[a])}return e},y.fromArray=y.unpack,y.maximumComponent=function(n){return Math.max(n.x,n.y,n.z)},y.minimumComponent=function(n){return Math.min(n.x,n.y,n.z)},y.minimumByComponent=function(n,e,r){return r.x=Math.min(n.x,e.x),r.y=Math.min(n.y,e.y),r.z=Math.min(n.z,e.z),r},y.maximumByComponent=function(n,e,r){return r.x=Math.max(n.x,e.x),r.y=Math.max(n.y,e.y),r.z=Math.max(n.z,e.z),r},y.magnitudeSquared=function(n){return n.x*n.x+n.y*n.y+n.z*n.z},y.magnitude=function(n){return Math.sqrt(y.magnitudeSquared(n))};var r=new y;y.distance=function(n,e){return y.subtract(n,e,r),y.magnitude(r)},y.distanceSquared=function(n,e){return y.subtract(n,e,r),y.magnitudeSquared(r)},y.normalize=function(n,e){var r=y.magnitude(n);return d.defined(e)||(e=new y),e.x=n.x/r,e.y=n.y/r,e.z=n.z/r,e},y.dot=function(n,e){return n.x*e.x+n.y*e.y+n.z*e.z},y.multiplyComponents=function(n,e,r){return r.x=n.x*e.x,r.y=n.y*e.y,r.z=n.z*e.z,r},y.divideComponents=function(n,e,r){return r.x=n.x/e.x,r.y=n.y/e.y,r.z=n.z/e.z,r},y.add=function(n,e,r){return d.defined(r)||(r=new y),r.x=n.x+e.x,r.y=n.y+e.y,r.z=n.z+e.z,r},y.subtract=function(n,e,r){return d.defined(r)||(r=new y),r.x=n.x-e.x,r.y=n.y-e.y,r.z=n.z-e.z,r},y.multiplyByScalar=function(n,e,r){return r.x=n.x*e,r.y=n.y*e,r.z=n.z*e,r},y.divideByScalar=function(n,e,r){return r.x=n.x/e,r.y=n.y/e,r.z=n.z/e,r},y.negate=function(n,e){return d.defined(e)||(e=new y),e.x=-n.x,e.y=-n.y,e.z=-n.z,e},y.abs=function(n,e){return e.x=Math.abs(n.x),e.y=Math.abs(n.y),e.z=Math.abs(n.z),e};var a=new y;y.lerp=function(n,e,r,t){return y.multiplyByScalar(e,r,a),t=y.multiplyByScalar(n,1-r,t),y.add(a,t,t)};var o=new y,f=new y;y.angleBetween=function(n,e){y.normalize(n,o),y.normalize(e,f);var r=y.dot(o,f),t=y.magnitude(y.cross(o,f,o));return Math.atan2(t,r)};var t=new y;y.mostOrthogonalAxis=function(n,e){var r=y.normalize(n,t);return y.abs(r,r),e=r.x<=r.y?r.x<=r.z?y.clone(y.UNIT_X,e):y.clone(y.UNIT_Z,e):r.y<=r.z?y.clone(y.UNIT_Y,e):y.clone(y.UNIT_Z,e)},y.projectVector=function(n,e,r){var t=y.dot(n,e)/y.dot(e,e);return y.multiplyByScalar(e,t,r)},y.equals=function(n,e){return n===e||d.defined(n)&&d.defined(e)&&n.x===e.x&&n.y===e.y&&n.z===e.z},y.equalsArray=function(n,e,r){return n.x===e[r]&&n.y===e[r+1]&&n.z===e[r+2]},y.equalsEpsilon=function(n,e,r,t){return n===e||d.defined(n)&&d.defined(e)&&u.CesiumMath.equalsEpsilon(n.x,e.x,r,t)&&u.CesiumMath.equalsEpsilon(n.y,e.y,r,t)&&u.CesiumMath.equalsEpsilon(n.z,e.z,r,t)},y.cross=function(n,e,r){var t=n.x,a=n.y,i=n.z,u=e.x,o=e.y,f=e.z,d=a*f-i*o,y=i*u-t*f,c=t*o-a*u;return r.x=d,r.y=y,r.z=c,r},y.midpoint=function(n,e,r){return r.x=.5*(n.x+e.x),r.y=.5*(n.y+e.y),r.z=.5*(n.z+e.z),r},y.fromDegrees=function(n,e,r,t,a){return n=u.CesiumMath.toRadians(n),e=u.CesiumMath.toRadians(e),y.fromRadians(n,e,r,t,a)};var c=new y,l=new y;y.wgs84RadiiSquared=new y(40680631590769,40680631590769,40408299984661.445),y.fromRadians=function(n,e,r,t,a){r=d.defaultValue(r,0);var i=d.defined(t)?t.radiiSquared:this.wgs84RadiiSquared,u=Math.cos(e);c.x=u*Math.cos(n),c.y=u*Math.sin(n),c.z=Math.sin(e),c=y.normalize(c,c),y.multiplyComponents(i,c,l);var o=Math.sqrt(y.dot(c,l));return l=y.divideByScalar(l,o,l),c=y.multiplyByScalar(c,r,c),d.defined(a)||(a=new y),y.add(l,c,a)},y.fromDegreesArray=function(n,e,r){var t=n.length;d.defined(r)?r.length=t/2:r=new Array(t/2);for(var a=0;a<t;a+=2){var i=n[a],u=n[a+1],o=a/2;r[o]=y.fromDegrees(i,u,0,e,r[o])}return r},y.fromRadiansArray=function(n,e,r){var t=n.length;d.defined(r)?r.length=t/2:r=new Array(t/2);for(var a=0;a<t;a+=2){var i=n[a],u=n[a+1],o=a/2;r[o]=y.fromRadians(i,u,0,e,r[o])}return r},y.fromDegreesArrayHeights=function(n,e,r){var t=n.length;d.defined(r)?r.length=t/3:r=new Array(t/3);for(var a=0;a<t;a+=3){var i=n[a],u=n[a+1],o=n[a+2],f=a/3;r[f]=y.fromDegrees(i,u,o,e,r[f])}return r},y.fromRadiansArrayHeights=function(n,e,r){var t=n.length;d.defined(r)?r.length=t/3:r=new Array(t/3);for(var a=0;a<t;a+=3){var i=n[a],u=n[a+1],o=n[a+2],f=a/3;r[f]=y.fromRadians(i,u,o,e,r[f])}return r},y.ZERO=Object.freeze(new y(0,0,0)),y.UNIT_X=Object.freeze(new y(1,0,0)),y.UNIT_Y=Object.freeze(new y(0,1,0)),y.UNIT_Z=Object.freeze(new y(0,0,1)),y.prototype.clone=function(n){return y.clone(this,n)},y.prototype.equals=function(n){return y.equals(this,n)},y.prototype.equalsEpsilon=function(n,e,r){return y.equalsEpsilon(this,n,e,r)},y.prototype.toString=function(){return"("+this.x+", "+this.y+", "+this.z+")"},n.Cartesian3=y});

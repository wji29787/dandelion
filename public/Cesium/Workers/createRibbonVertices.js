define(["./when-b43ff45e","./Check-d404a0fe","./Math-336da716","./Cartesian3-2b5b9afe","./Cartesian2-577f67dc","./Transforms-18f02e2b","./RuntimeError-bf10f3d5","./WebGLConstants-56de22c0","./JulianDate-53cdb307","./RequestType-beb1291d","./IndexDatatype-c5295474","./createTaskProcessorWorker","./Color-b5533cf2"],function(H,a,I,q,n,z,t,e,r,i,G,o,L){"use strict";return o(function(a,n){for(var t=a.ribbons,e=z.Transforms.localFrameToFixedFrameGenerator("north","west"),r=new z.Matrix4,i=t.length,o=[],s=0,l=0,f=0;f<i;f++)if(H.defined(t[f])&&1<t[f].trackPoints.length){t[f].scale=I.CesiumMath.equalsEpsilon(t[f].scale,0,I.CesiumMath.EPSILON7)?1:t[f].scale;var u=1/t[f].scale,p=t[f].scale,w=t[f].trackPoints,c=[],C=w.length;if(300<C){for(var d=C-100,h=Math.floor(d/200)+1,m=C-100-h,y=0;y<m;y+=h){var P=z.Quaternion.fromHeadingPitchRoll(w[y].headingPitchRoll,new z.Quaternion),b=z.Matrix4.fromTranslationQuaternionRotationScale(new q.Cartesian3(0,0,0),P,new q.Cartesian3(p,p,p)),r=e(w[y].wcPosition,void 0,r);r=z.Matrix4.multiply(r,b,r);var x=z.Matrix4.multiplyByPoint(r,new q.Cartesian3(0,0,1),new q.Cartesian3);x=q.Cartesian3.subtract(x,w[y].wcPosition,x);var M=z.Matrix4.multiplyByPoint(r,new q.Cartesian3(t[f].forwardOffset*u,t[f].upOffset,0),new q.Cartesian3),g=z.Matrix4.multiplyByPoint(r,new q.Cartesian3(t[f].forwardOffset*u,-t[f].upOffset,0),new q.Cartesian3);c.push({position:M,normal:x}),c.push({position:g,normal:x}),s+=2}for(;y<C-1;y++){P=z.Quaternion.fromHeadingPitchRoll(w[y].headingPitchRoll,new z.Quaternion),b=z.Matrix4.fromTranslationQuaternionRotationScale(new q.Cartesian3(0,0,0),P,new q.Cartesian3(p,p,p));r=e(w[y].wcPosition,void 0,r),r=z.Matrix4.multiply(r,b,r);x=z.Matrix4.multiplyByPoint(r,new q.Cartesian3(0,0,1),new q.Cartesian3);x=q.Cartesian3.subtract(x,w[y].wcPosition,x);M=z.Matrix4.multiplyByPoint(r,new q.Cartesian3(t[f].forwardOffset*u,t[f].upOffset,0),new q.Cartesian3),g=z.Matrix4.multiplyByPoint(r,new q.Cartesian3(t[f].forwardOffset*u,-t[f].upOffset,0),new q.Cartesian3);c.push({position:M,normal:x}),c.push({position:g,normal:x}),s+=2}}else for(var B=0;B<w.length;B++){P=z.Quaternion.fromHeadingPitchRoll(w[B].headingPitchRoll,new z.Quaternion),b=z.Matrix4.fromTranslationQuaternionRotationScale(new q.Cartesian3(0,0,0),P,new q.Cartesian3(p,p,p));r=e(w[B].wcPosition,void 0,r),r=z.Matrix4.multiply(r,b,r);x=z.Matrix4.multiplyByPoint(r,new q.Cartesian3(0,0,1),new q.Cartesian3);x=q.Cartesian3.subtract(x,w[B].wcPosition,x);M=z.Matrix4.multiplyByPoint(r,new q.Cartesian3(t[f].forwardOffset*u,t[f].upOffset,0),new q.Cartesian3),g=z.Matrix4.multiplyByPoint(r,new q.Cartesian3(t[f].forwardOffset*u,-t[f].upOffset,0),new q.Cartesian3);c.push({position:M,normal:x}),c.push({position:g,normal:x}),s+=2}o.push(c),l+=6*(c.length/2-1)}if(0!=o.length){for(var v=new z.BoundingSphere,O=G.IndexDatatype.createTypedArray(s,l),T=new Float64Array(3*s),x=new Float64Array(3*s),R=new Uint8Array(4*s),Q=0,S=0,f=0;f<o.length;f++){for(var k=t[f].color,F=(c=o[f]).length,A=0;A<F;A++){v=z.BoundingSphere.expand(v,c[A].position),T[3*(S+A)]=c[A].position.x,T[3*(S+A)+1]=c[A].position.y,T[3*(S+A)+2]=c[A].position.z,x[3*(S+A)]=c[A].normal.x,x[3*(S+A)+1]=c[A].normal.y,x[3*(S+A)+2]=c[A].normal.z;var D=1-(F-A)/F*1;R[4*(S+A)]=L.Color.floatToByte(k.red),R[4*(S+A)+1]=L.Color.floatToByte(k.green),R[4*(S+A)+2]=L.Color.floatToByte(k.blue),R[4*(S+A)+3]=L.Color.floatToByte(k.alpha*D)}for(var E=0;E+3<F;E+=2)O[Q++]=S+E,O[Q++]=S+E+1,O[Q++]=S+E+2,O[Q++]=S+E+1,O[Q++]=S+E+3,O[Q++]=S+E+2;S+=F}return a.ribbons=void 0,{positionBuffer:T.buffer,normalBuffer:x.buffer,colorBuffer:R.buffer,indices:O.buffer,boundingSphere:v}}})});
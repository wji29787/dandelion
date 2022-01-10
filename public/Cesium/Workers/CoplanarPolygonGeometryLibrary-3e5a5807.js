define(["exports","./Check-d404a0fe","./Cartesian3-7e3c315f","./Cartesian2-3f7e7089","./Transforms-77894148","./OrientedBoundingBox-74f3d66b"],function(n,e,l,s,x,B){"use strict";var t={},C=new l.Cartesian3,P=new l.Cartesian3,M=new l.Cartesian3,h=new l.Cartesian3,v=new B.OrientedBoundingBox;function o(n,e,t,r,a){var i=l.Cartesian3.subtract(n,e,C),o=l.Cartesian3.dot(t,i),u=l.Cartesian3.dot(r,i);return s.Cartesian2.fromElements(o,u,a)}t.validOutline=function(n){var e=B.OrientedBoundingBox.fromPoints(n,v).halfAxes,t=x.Matrix3.getColumn(e,0,P),r=x.Matrix3.getColumn(e,1,M),a=x.Matrix3.getColumn(e,2,h),i=l.Cartesian3.magnitude(t),o=l.Cartesian3.magnitude(r),u=l.Cartesian3.magnitude(a);return!(0===i&&(0===o||0===u)||0===o&&0===u)},t.computeProjectTo2DArguments=function(n,e,t,r){var a,i,o=B.OrientedBoundingBox.fromPoints(n,v),u=o.halfAxes,s=x.Matrix3.getColumn(u,0,P),C=x.Matrix3.getColumn(u,1,M),m=x.Matrix3.getColumn(u,2,h),c=l.Cartesian3.magnitude(s),d=l.Cartesian3.magnitude(C),f=l.Cartesian3.magnitude(m),g=Math.min(c,d,f);return(0!==c||0!==d&&0!==f)&&(0!==d||0!==f)&&(g!==d&&g!==f||(a=s),g===c?a=C:g===f&&(i=C),g!==c&&g!==d||(i=m),l.Cartesian3.normalize(a,t),l.Cartesian3.normalize(i,r),l.Cartesian3.clone(o.center,e),!0)},t.createProjectPointsTo2DFunction=function(r,a,i){return function(n){for(var e=new Array(n.length),t=0;t<n.length;t++)e[t]=o(n[t],r,a,i);return e}},t.createProjectPointTo2DFunction=function(t,r,a){return function(n,e){return o(n,t,r,a,e)}},n.CoplanarPolygonGeometryLibrary=t});
define(["./when-b43ff45e","./Check-d404a0fe","./Math-336da716","./Cartesian3-2b5b9afe","./RuntimeError-bf10f3d5","./createTaskProcessorWorker","./AssociativeArray-cac22402"],function(s,r,e,n,a,t,_){"use strict";function o(e,a,t){if(!s.defined(e))throw new r.DeveloperError("wsserver undefined!");this.url=e,this.datSource=a,this.startPlay=0,this.callbackFunc=t,this.websocket=new WebSocket(e),this.websocket.onopen=this.onOpen.bind(this),this.websocket.onclose=this.onClose.bind(this),this.websocket.onmessage=this.onMessage.bind(this),this.websocket.onerror=this.onError.bind(this)}o.prototype.onOpen=function(e){this.websocket.binaryType="arraybuffer",console.log("Connection open ...");var a=JSON.stringify({type:0,fileName:this.datSource});this.doSend(a)},o.prototype.doSend=function(e){this.websocket.send(e)},o.prototype.onMessage=function(e){var a,t=10,r=this,s=JSON.parse(e.data);if(r.dataI3NSArr=[],r.dataRTSN=[],r.dataRTKN=[],r.dataTRAJ=[],r.dataGTSPI=[],r.dataIrsm=[],r.radarTarget=[],r.RadarWM=[],r.IRSTworkMode=[],r.dataEWS=[],r.LargePlane=[],r.SafetyAlarm=[],r.CombatPower=[],r.StaticTarget=[],r.flightState=[],r.SDRState=[],s.uint8Array instanceof Array){for(var n=s.uint8Array,o=0;o<n.length;o++){var c,S=new Uint8Array(n[o]).buffer,i=(a=void 0,{time:(a=new DataView(S)).getBigInt64(0,!0),nLen:a.getUint8(8,!0)}).nLen,l=new DataView(S);switch(new _.EV_ParseHeader(l,t).msgType){case _.EV_MsgType.NET_MSG_TSPI:95==i?c=new _.EV_ParseI3NS_Deprecated(l,t):96==i&&(c=new _.EV_ParseI3NS(l,t)),r.dataI3NSArr.push(c);break;case _.EV_MsgType.NET_MSG_FIGHTER:var T=new _.EV_ParseFlight(l,t);r.flightState.push(T);break;case _.EV_MsgType.NET_MSG_RTSN:var E=new _.EV_ParseRTSN(l,t);r.dataRTSN.push(E);break;case _.EV_MsgType.NET_MSG_MISSILEPARAM:var d=new _.EV_ParseParam(l,t);break;case _.EV_MsgType.NET_MSG_RTKN:d=new _.EV_ParseRTKN(l,t);r.dataRTKN.push(d);break;case _.EV_MsgType.NET_MSG_WPN_TRAJ:d=new _.EV_ParseTRAJ(l,t);r.dataTRAJ.push(d);break;case _.EV_MsgType.NET_MSG_RDR_STATE:d=new _.EV_ParseRadarWM(l,t);r.RadarWM.push(d);break;case _.EV_MsgType.NET_MSG_TARGET:d=new _.EV_ParseRadarTarget(l,t);r.radarTarget.push(d);break;case _.EV_MsgType.NET_MSG_IRST:d=new _.EV_ParseIRSTworkMode(l,t);r.IRSTworkMode.push(d);break;case _.EV_MsgType.NET_MSG_IRMSL_STATE:d=new _.EV_ParseIrsmState(l,t);r.dataIrsm.push(d);break;case _.EV_MsgType.NET_MSG_EWS_STA:d=new _.EV_ParseEWS(l,t);r.dataEWS.push(d);break;case _.EV_MsgType.NET_MSG_START_STOP:d=new _.EV_ParseStartStop(l,t);console.log(d);break;case _.EV_MsgType.NET_MSG_GTSPI:d=new _.EV_ParseGTspi(l,t);r.dataGTSPI.push(d);break;case _.EV_MsgType.NET_MSG_RAD_STATE:d=new _.EV_ParseSDRState(l,t);r.SDRState.push(d);break;case _.EV_MsgType.NET_MSG_COMBATPOWER:d=new _.EV_ParseCombatPower(l,t);r.CombatPower.push(d);break;case _.EV_MsgType.NET_MSG_SAFETYALARM:d=new _.EV_ParseSafetyAlarm(l,t);r.SafetyAlarm.push(d);break;case _.EV_MsgType.NET_MSG_LARGE_PLANE:d=new _.EV_ParseLargePlane(l,t);r.LargePlane.push(d)}}0!=r.dataI3NSArr.length&&r.callbackFunc(r.dataI3NSArr),0!=r.dataRTKN.length&&r.callbackFunc(r.dataRTKN),0!=r.dataRTSN.length&&r.callbackFunc(r.dataRTSN),0!=r.dataGTSPI.length&&r.callbackFunc(r.dataGTSPI),0!=r.dataTRAJ.length&&r.callbackFunc(r.dataTRAJ),0!=r.dataIrsm.length&&r.callbackFunc(r.dataIrsm),0!=r.radarTarget.length&&r.callbackFunc(r.radarTarget),0!=r.RadarWM.length&&r.callbackFunc(r.RadarWM),0!=r.IRSTworkMode.length&&r.callbackFunc(r.IRSTworkMode),0!=r.dataEWS.length&&r.callbackFunc(r.dataEWS),0!=r.LargePlane.length&&r.callbackFunc(r.LargePlane),0!=r.SafetyAlarm.length&&r.callbackFunc(r.SafetyAlarm),0!=r.CombatPower.length&&r.callbackFunc(r.CombatPower),0!=r.StaticTarget.length&&r.callbackFunc(r.StaticTarget),0!=r.flightState.length&&r.callbackFunc(r.flightState),0!=r.SDRState.length&&r.callbackFunc(r.SDRState)}else r.callbackFunc(s)},o.prototype.onClose=function(){console.log("DISCONNECTED")},o.prototype.onError=function(e){console.log("websocket error")};var c,S=[],i=self.postMessage,l=[];function T(e){Array.isArray(e)?(95==e[0].SIZE||96==e[0].SIZE?e.forEach(function(e){var a;e.position=(a=e,n.Cartesian3.fromDegrees(a.fLon,a.fLat,a.fAlt))}):77==e[0].SIZE?e.forEach(function(a){var e,t=a.header.sID;S.forEach(function(e){e.header.sID==t&&(a.nRedOrBlue=e.nRedOrBlue)}),a.position=(e=a,n.Cartesian3.fromDegrees(e.mslLongitude,e.mslLatitude,e.mslAltitude))}):58==e[0].SIZE?e.forEach(function(e){var a;e.position=(a=e,n.Cartesian3.fromDegrees(a.gTspiLon,a.gTspiLat,a.gTspiAlt))}):139==e[0].SIZE||e[0].SIZE,i(e)):(l.push(e.firstTime),l.push(e.lastTime),2==l.length&&i(l))}return t(function(e){var a,t=e.url,r=e.datSource;s.defined(t)?c=new o(t,r,T):(a=JSON.stringify({type:2,fileName:r}),c.doSend(a))})});

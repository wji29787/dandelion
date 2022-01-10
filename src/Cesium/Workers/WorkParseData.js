define(["./when-b43ff45e","./Check-d404a0fe","./Math-336da716","./Cartesian3-2b5b9afe","./RuntimeError-bf10f3d5","./JulianDate-53cdb307","./createTaskProcessorWorker","./AssociativeArray-cac22402"],function(t,r,a,s,e,n,o,_){"use strict";function c(a,e){if(!t.defined(a))throw new r.DeveloperError("wsserver undefined!");this.url=a,this.startPlay=0,this.callbackFunc=e,this.websocket=new WebSocket(a),this.websocket.onopen=this.onOpen.bind(this),this.websocket.onclose=this.onClose.bind(this),this.websocket.onmessage=this.onMessage.bind(this),this.websocket.onerror=this.onError.bind(this)}c.prototype.onOpen=function(a){this.websocket.binaryType="arraybuffer",console.log("Connection open ..."),this.doSend(a)},c.prototype.doSend=function(a){this.websocket.send(a)},c.prototype.onMessage=function(a){var e,t,r,s=0,n=this,o=a.data;if(n.dataI3NSArr=[],n.dataRTSN=[],n.dataRTKN=[],n.dataTRAJ=[],n.dataGTSPI=[],n.dataIrsm=[],n.radarTarget=[],n.RadarWM=[],n.IRSTworkMode=[],n.dataEWS=[],n.LargePlane=[],n.SafetyAlarm=[],n.CombatPower=[],n.StaticTarget=[],n.flightState=[],n.SDRState=[],a.data instanceof ArrayBuffer){for(;s<o.byteLength;){var c=(e=a.data,t=s,r=void 0,{time:(r=new DataView(e)).getBigInt64(t,!0),nLen:r.getUint8(t+8,!0)});s+=10;var T,l=c.nLen,S=new DataView(o,s,l);switch(new _.EV_ParseHeader(S,0).msgType){case _.EV_MsgType.NET_MSG_TSPI:95==l?T=new _.EV_ParseI3NS_Deprecated(S):96==l&&(T=new _.EV_ParseI3NS(S)),n.dataI3NSArr.push(T);break;case _.EV_MsgType.NET_MSG_FIGHTER:var E=new _.EV_ParseFlight(S);n.flightState.push(E);break;case _.EV_MsgType.NET_MSG_RTSN:var i=new _.EV_ParseRTSN(S);n.dataRTSN.push(i);break;case _.EV_MsgType.NET_MSG_MISSILEPARAM:var d=new _.EV_ParseParam(S);break;case _.EV_MsgType.NET_MSG_RTKN:d=new _.EV_ParseRTKN(S);n.dataRTKN.push(d);break;case _.EV_MsgType.NET_MSG_WPN_TRAJ:d=new _.EV_ParseTRAJ(S);n.dataTRAJ.push(d);break;case _.EV_MsgType.NET_MSG_RDR_STATE:d=new _.EV_ParseRadarWM(S);n.RadarWM.push(d);break;case _.EV_MsgType.NET_MSG_TARGET:d=new _.EV_ParseRadarTarget(S);n.radarTarget.push(d);break;case _.EV_MsgType.NET_MSG_IRST:d=new _.EV_ParseIRSTworkMode(S);n.IRSTworkMode.push(d);break;case _.EV_MsgType.NET_MSG_IRMSL_STATE:d=new _.EV_ParseIrsmState(S);n.dataIrsm.push(d);break;case _.EV_MsgType.NET_MSG_EWS_STA:d=new _.EV_ParseEWS(S);n.dataEWS.push(d);break;case _.EV_MsgType.NET_MSG_START_STOP:d=new _.EV_ParseStartStop(S);console.log(d);break;case _.EV_MsgType.NET_MSG_GTSPI:d=new _.EV_ParseGTspi(S);n.dataGTSPI.push(d);break;case _.EV_MsgType.NET_MSG_RAD_STATE:d=new _.EV_ParseSDRState(S);n.SDRState.push(d);break;case _.EV_MsgType.NET_MSG_COMBATPOWER:d=new _.EV_ParseCombatPower(S);n.CombatPower.push(d);break;case _.EV_MsgType.NET_MSG_SAFETYALARM:d=new _.EV_ParseSafetyAlarm(S);n.SafetyAlarm.push(d);break;case _.EV_MsgType.NET_MSG_LARGE_PLANE:d=new _.EV_ParseLargePlane(S);n.LargePlane.push(d)}s+=l}0!=n.dataI3NSArr.length&&n.callbackFunc(n.dataI3NSArr),0!=n.dataRTKN.length&&n.callbackFunc(n.dataRTKN),0!=n.dataRTSN.length&&n.callbackFunc(n.dataRTSN),0!=n.dataGTSPI.length&&n.callbackFunc(n.dataGTSPI),0!=n.dataTRAJ.length&&n.callbackFunc(n.dataTRAJ),0!=n.dataIrsm.length&&n.callbackFunc(n.dataIrsm),0!=n.radarTarget.length&&n.callbackFunc(n.radarTarget),0!=n.RadarWM.length&&n.callbackFunc(n.RadarWM),0!=n.IRSTworkMode.length&&n.callbackFunc(n.IRSTworkMode),0!=n.dataEWS.length&&n.callbackFunc(n.dataEWS),0!=n.LargePlane.length&&n.callbackFunc(n.LargePlane),0!=n.SafetyAlarm.length&&n.callbackFunc(n.SafetyAlarm),0!=n.CombatPower.length&&n.callbackFunc(n.CombatPower),0!=n.StaticTarget.length&&n.callbackFunc(n.StaticTarget),0!=n.flightState.length&&n.callbackFunc(n.flightState),0!=n.SDRState.length&&n.callbackFunc(n.SDRState)}else n.callbackFunc(a.data)},c.prototype.onClose=function(){console.log("DISCONNECTED")},c.prototype.onError=function(a){console.log("websocket error")};var T,l=[],S=self.postMessage,E=[];function i(a){Array.isArray(a)?(95==a[0].SIZE||96==a[0].SIZE?a.forEach(function(a){var e;a.position=(e=a,s.Cartesian3.fromDegrees(e.fLon,e.fLat,e.fAlt))}):77==a[0].SIZE?a.forEach(function(e){var a,t=e.header.sID;l.forEach(function(a){a.header.sID==t&&(e.nRedOrBlue=a.nRedOrBlue)}),e.position=(a=e,s.Cartesian3.fromDegrees(a.mslLongitude,a.mslLatitude,a.mslAltitude))}):58==a[0].SIZE?a.forEach(function(a){var e;a.position=(e=a,s.Cartesian3.fromDegrees(e.gTspiLon,e.gTspiLat,e.gTspiAlt))}):139==a[0].SIZE||a[0].SIZE,S(a)):(E.push(a),2==E.length&&S(E))}return o(function(a){var e=a.url;t.defined(e)?T=new c(e,i):T.doSend(1)})});

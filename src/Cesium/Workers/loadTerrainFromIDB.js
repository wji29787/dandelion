define(["./when-b43ff45e","./RequestType-beb1291d","./createTaskProcessorWorker","./EV_IndexedDBProvider-38116392"],function(t,o,e,d){"use strict";var i=void 0;function n(e){var r=self.webkitPostMessage||self.postMessage;try{r({workerType:e.requestType,dataName:e.keyName,workerTaskID:e.workerTaskID,data:void 0})}catch(e){r({})}}function k(e,r){var a=self.webkitPostMessage||self.postMessage;try{a({workerType:e.requestType,dataName:e.keyName,workerTaskID:e.workerTaskID,level:e.level,x:e.x,y:e.y,upsample:e.upsample,data:r})}catch(e){a({})}}return e(function(e,r){var a=e.indexedDB,s=e.taskData;s.workerTaskID=e.workerTaskID,t.defined(i)?t.defined(i.iDB)?s.requestType==o.RequestType.TERRAIN?i.downloadTerrainData("EVIDB",1,"terrain",s,n,k):s.requestType==o.RequestType.IMAGERY&&i.downloadTerrainData("EVIDB",1,"imagery",s,n,k):n(s):((i=new d.EV_IndexedDBProvider(a)).createIDB("EVIDB",1,["model","imagery","terrain","3DTile"]),n(s))})});

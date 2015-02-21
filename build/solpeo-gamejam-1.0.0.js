/***********************************************************************
* 
* 1.0.0
* 
***********************************************************************/
!(function(){'use strict';
var viewport=new Engine.Viewport("engine",800,400),scene=new Engine.Scene({color:"#dcdcdc"}),camera=new Engine.Camera({lookAt:scene});viewport.addCamera(camera);})();
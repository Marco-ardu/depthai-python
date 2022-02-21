window.onload = function(){
  !function(){
    if(!document.getElementById("gzfy")){
      var zfyan=document.createElement("span");
      zfyan.id="gzfy";
      zfyan.innerHTML="翻译";
      zfyan.style.cssText="display:flex;text-align:center !important;font-size:20px;width:28px;height:56px;line-height:28px;text-align:center;float:right;position:fixed;right:52px;top:60%;color:#000;opacity:0.8;background:#e3edcd;cursor:pointer;position:fixed !important;z-index:9999999999 !important;box-shadow:0px 1px 1px #000;border-radius:50%";
      zfyan.addEventListener("click",function(){zfy()});
      document.body.appendChild(zfyan);
    }
    var zfyhdy1,zfyhdy2;
    document.addEventListener("touchstart",function(e){zfyhdy1=e.changedTouches[0].clientY});
    document.addEventListener("touchmove",function(e){zfyhdy2=e.changedTouches[0].clientY;
    document.getElementById("gzfy").style.display=zfyhdy2-zfyhdy1>0?"block":"none"});
    function zfy(){
      var zfyfy=document.getElementById("gzfy");
      zfyfy.parentNode.removeChild(zfyfy);
      var cyfy=document.createElement("script");
      cyfy.type="text/javascript";
      cyfy.charset="UTF-8";
      cyfy.src=("https:"==document.location.protocol?" https://":"http://")+"caiyunapp.com/dest/trs.js";
      document.body.appendChild(cyfy); 
    }}();
}
    
(function(){
  var futuryfy = { 
    init: function(){
      //Options  
      var futuryfymsg_headline = 'Outdated Browser';   
      var futuryfymsg_content = 'Your Browser does not support modern web-standards. In order to display web content correctly and in fact of security concerns consider to update to a modern web-browser.';
      //modal creation
      if(this.webgl_detect() != true){
        if(sessionStorage.getItem("futuryfyDisabled")){
          return false;
        }else if(document.cookie.indexOf("futuryfyDisabled")  >= 0){
          return false;    
        }else{
          this.create( futuryfymsg_headline, futuryfymsg_content );
        }
      }  
    },
    create: function(headline, message){
      var newEl = document.createDocumentFragment();
      var modalCancel = document.createElement("a");
          modalCancel.id = "futuryfy-cancel";
          modalCancel.href = "#";
          modalCancel.addEventListener('click',function(e){
              futuryfy.cancel(e);
          });
          modalCancel.innerHTML = "Do not show again";
      var modalCancelX = document.createElement("a");
          modalCancelX.id = "futuryfy-cancel-x";
          modalCancelX.href = "#";
          modalCancelX.addEventListener('click',function(e){
              futuryfy.cancelX(e);
          });
          modalCancelX.innerHTML = "&#10006;";
      var modal = document.createElement("div");
          modal.id = "futuryfy-modal";      
          modal.innerHTML = '<div id="futuryfy-content">' + 
                            '<strong>' + headline + '</strong>' + 
                            '<p>' + message + '</p>' + 
                            '<div id="futuryfy-action-bar">' +
                            '<a href="" class="further-information">Further information</a>' +
                            '</div></div>';  
       newEl.appendChild(modal);
       document.getElementsByTagName('body')[0].appendChild(modal);
       document.getElementById('futuryfy-action-bar').appendChild(modalCancel);
       var container = document.getElementById('futuryfy-content');
       container.insertBefore(modalCancelX, container.childNodes[0]);
       if(window.jQuery){
         var jqEl = $("#futuryfy-modal");
         jqEl.hide().fadeIn(500);
       }
     },
     cancel: function(e){
       e.stopPropagation();
       e.preventDefault();
       if(window.jQuery){$('#futuryfy-content').fadeOut(200,function(){$(this).add('#futuryfy-modal').remove();})}else{
         var el = document.getElementById('futuryfy-modal');
         el.parentNode.removeChild(el);
       }
       if(typeof window.sessionStorage != 'undefined'){//IF SESSIONSTORAGE IS AVAILABLE
         sessionStorage.setItem('futuryfyDisabled', 'disabled');
       }else{//ELSE COOKIE(FALLBACK)  
         var now = new Date();
         var time = now.getTime();
         var expireTime = time + 1000*60;
         now.setTime(expireTime);
         document.cookie = 'cookie=futuryfyDisabled;expires='+now.toGMTString()+';path=/';
       }
      return;
    },
    cancelX: function(e){
       e.stopPropagation();
       e.preventDefault();
       if(window.jQuery){$('#futuryfy-content').fadeOut(200,function(){$(this).add('#futuryfy-modal').remove();})}else{
         var el = document.getElementById('futuryfy-modal');
         el.parentNode.removeChild(el);
       }
       return;
    },
    webgl_detect: function(return_context){//Check if WebGL is available (modern Browser)
      if(window.WebGLRenderingContext){
        var canvas = document.createElement("canvas"),
            names = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"],
            context = false;
        for(var i=0;i<4;i++) {
            try {
                context = canvas.getContext(names[i]);
                if (context && typeof context.getParameter == "function") {
                    if (return_context) {
                        return {name:names[i], gl:context};
                    }
                    return true;
                }
            } catch(e) {}
        }
        return "disabled";
      }
      return false;
    }
  };
  futuryfy.init();
})();
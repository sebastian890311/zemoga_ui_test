document.addEventListener("DOMContentLoaded",function(){
   
    var header_obj = document.querySelector("header");
   
    window.onscroll = function(e) {
        if(window.scrollY >0){
            header_obj.classList.add("nav-fixed");
        }
        else{
            header_obj.classList.remove("nav-fixed");
        }
        
    };
    
    
});


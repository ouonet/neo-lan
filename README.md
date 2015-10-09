# neo-lang
Target:
   this is a javascript library for basic enhancement of javascript.
#Usage
   var neo=require('neo-lang');
   
#API
   extend
      var neo=require('neo-lang');
      function Shap(){
        this.color=0;
        return this;
      }
      Shap.prototype.draw=function(){console.log('draw');}
      function Point(){
        Shap.call(this);
        this.x=0;
        this.y=0;
        return this;
      }
      neo.extend(Point,Shap,{
         draw:function(){console.log(' Point is drawing');}
      })
      

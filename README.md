# neo-lang
Target:
    this is a javascript library for basic enhancement of javascript.
#Usage
    var neo=require('neo-lang');
   
#API
    extend
        var neo=require('neo-lang');
        function Shape(){
          this.color=0;
          return this;
        }
        Shape.prototype.draw=function(){console.log('draw');}
        function Point(){
          Shape.call(this);
          this.x=0;
          this.y=0;
          return this;
        }
        neo.extend(Point,Shape,{
           draw:function(){console.log(' Point is drawing');}
        })
      

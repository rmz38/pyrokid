package ui
{
   import flash.display.Sprite;
   import flash.text.TextField;
   
   public class ButtonBackground extends Sprite
   {
       
      
      public function ButtonBackground(param1:int, param2:int, param3:int, param4:String)
      {
         super();
         var _loc5_:TextField;
         (_loc5_ = new TextField()).selectable = false;
         _loc5_.appendText(param4);
         _loc5_.width = param2;
         _loc5_.height = param3;
         addChild(_loc5_);
         graphics.lineStyle(0);
         graphics.beginFill(param1);
         graphics.drawRect(0,0,param2,param3);
         graphics.endFill();
      }
   }
}

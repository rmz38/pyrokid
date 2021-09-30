package pyrokid.tools
{
   import flash.display.Sprite;
   import pyrokid.Constants;
   
   public class Box extends Sprite
   {
       
      
      private var _w:int;
      
      private var _h:int;
      
      public function Box(param1:int, param2:int, param3:int, param4:int)
      {
         super();
         this.x = param1;
         this.y = param2;
         this._w = param3;
         this._h = param4;
         graphics.lineStyle(2,16711680);
         graphics.drawRect(0,0,param3,param4);
         this.visible = Constants.DEBUG;
      }
      
      public function get w() : int
      {
         return this._w;
      }
      
      public function get h() : int
      {
         return this._h;
      }
      
      public function get center() : Vector2i
      {
         return new Vector2i(x + this.w / 2,y + this.h / 2);
      }
   }
}

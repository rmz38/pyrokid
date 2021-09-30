package pyrokid.tools
{
   import flash.display.Stage;
   import flash.events.KeyboardEvent;
   
   public class Key
   {
      
      public static var debug:Boolean = false;
      
      private static var keysDown:Array = [];
      
      public static var UP:int = 38;
      
      public static var DOWN:int = 40;
      
      public static var LEFT:int = 37;
      
      public static var RIGHT:int = 39;
      
      public static var SPACE:int = 32;
      
      public static var A:int = 65;
      
      public static var S:int = 83;
      
      public static var W:int = 87;
      
      public static var D:int = 68;
       
      
      public function Key()
      {
         super();
      }
      
      public static function init(param1:Stage) : void
      {
         var _loc2_:int = 0;
         while(_loc2_ < 128)
         {
            keysDown.push(false);
            _loc2_++;
         }
         param1.addEventListener(KeyboardEvent.KEY_DOWN,keyDown);
         param1.addEventListener(KeyboardEvent.KEY_UP,keyUp);
      }
      
      public static function isDown(param1:int) : Boolean
      {
         if(param1 < 0 || param1 > keysDown.length)
         {
            return false;
         }
         return keysDown[param1];
      }
      
      private static function keyDown(param1:KeyboardEvent) : void
      {
         if(!debug)
         {
         }
         keysDown[param1.keyCode] = true;
      }
      
      private static function keyUp(param1:KeyboardEvent) : void
      {
         keysDown[param1.keyCode] = false;
      }
      
      public static function reset() : void
      {
         var _loc1_:int = 0;
         while(_loc1_ < 128)
         {
            keysDown[_loc1_] = false;
            _loc1_++;
         }
      }
   }
}

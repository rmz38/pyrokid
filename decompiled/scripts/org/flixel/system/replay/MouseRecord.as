package org.flixel.system.replay
{
   public class MouseRecord
   {
       
      
      public var x:int;
      
      public var y:int;
      
      public var button:int;
      
      public var wheel:int;
      
      public function MouseRecord(param1:int, param2:int, param3:int, param4:int)
      {
         super();
         this.x = param1;
         this.y = param2;
         this.button = param3;
         this.wheel = param4;
      }
   }
}

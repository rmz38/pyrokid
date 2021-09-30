package org.flixel.plugin
{
   import org.flixel.FlxBasic;
   import org.flixel.FlxCamera;
   import org.flixel.FlxG;
   import org.flixel.FlxPath;
   
   public class DebugPathDisplay extends FlxBasic
   {
       
      
      protected var _paths:Array;
      
      public function DebugPathDisplay()
      {
         super();
         this._paths = new Array();
         active = false;
      }
      
      override public function destroy() : void
      {
         super.destroy();
         this.clear();
         this._paths = null;
      }
      
      override public function draw() : void
      {
         if(!FlxG.visualDebug || ignoreDrawDebug)
         {
            return;
         }
         if(cameras == null)
         {
            cameras = FlxG.cameras;
         }
         var _loc1_:uint = 0;
         var _loc2_:uint = cameras.length;
         while(_loc1_ < _loc2_)
         {
            this.drawDebug(cameras[_loc1_++]);
         }
      }
      
      override public function drawDebug(param1:FlxCamera = null) : void
      {
         var _loc3_:FlxPath = null;
         if(param1 == null)
         {
            param1 = FlxG.camera;
         }
         var _loc2_:int = this._paths.length - 1;
         while(_loc2_ >= 0)
         {
            _loc3_ = this._paths[_loc2_--] as FlxPath;
            if(_loc3_ != null && !_loc3_.ignoreDrawDebug)
            {
               _loc3_.drawDebug(param1);
            }
         }
      }
      
      public function add(param1:FlxPath) : void
      {
         this._paths.push(param1);
      }
      
      public function remove(param1:FlxPath) : void
      {
         var _loc2_:int = this._paths.indexOf(param1);
         if(_loc2_ >= 0)
         {
            this._paths.splice(_loc2_,1);
         }
      }
      
      public function clear() : void
      {
         var _loc2_:FlxPath = null;
         var _loc1_:int = this._paths.length - 1;
         while(_loc1_ >= 0)
         {
            _loc2_ = this._paths[_loc1_--] as FlxPath;
            if(_loc2_ != null)
            {
               _loc2_.destroy();
            }
         }
         this._paths.length = 0;
      }
   }
}

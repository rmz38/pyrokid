package pyrokid.graphics.Camera
{
   import flash.display.Sprite;
   import flash.geom.Point;
   import pyrokid.Constants;
   import pyrokid.tools.Camera;
   
   public class CameraController
   {
       
      
      public var zoneBinds:Array;
      
      public var zoneStack:Array;
      
      public var camera:Camera = null;
      
      public var time:Number = 0.0;
      
      private var curTarget:CameraTarget;
      
      public function CameraController(param1:Camera, param2:Vector2)
      {
         this.zoneBinds = [];
         this.zoneStack = [];
         super();
         this.camera = param1;
         this.curTarget = new CameraTarget();
         if(param2 != null)
         {
            this.curTarget.position.SetV(param2);
         }
         this.curTarget.scaling = 1;
         this.curTarget.rotation = 0;
      }
      
      public function addZone(param1:CameraZone) : void
      {
         var _loc2_:* = new Object();
         _loc2_.zone = param1;
         _loc2_.isInStack = false;
         this.zoneBinds.push(_loc2_);
      }
      
      public function update(param1:Vector2, param2:Sprite, param3:Point, param4:Point, param5:Number, param6:Number = 1.0) : void
      {
         this.time += param5;
         var _loc7_:CameraTarget;
         (_loc7_ = new CameraTarget()).position.SetV(param1);
         _loc7_.scaling = param6;
         _loc7_.rotation = 0;
         this.updateZones(param1);
         if(this.zoneStack.length > 0)
         {
            _loc7_ = this.zoneStack[this.zoneStack.length - 1].zone.camTarget;
         }
         this.curTarget = CameraTarget.lerp(this.curTarget,_loc7_,Constants.CAMERA_LAG);
         this.camera.xCamera = Math.round(this.curTarget.position.x);
         this.camera.yCamera = Math.round(this.curTarget.position.y);
         this.camera.scaleCamera = this.curTarget.scaling;
         this.camera.x = Constants.WIDTH / 2;
         this.camera.y = Constants.HEIGHT / 2;
         var _loc8_:Point = new Point(0,0);
         param3 = param2.localToGlobal(param3);
         if((param4 = param2.localToGlobal(param4)).x < Constants.WIDTH)
         {
            _loc8_.x = param4.x - Constants.WIDTH;
         }
         if(param4.y < Constants.HEIGHT)
         {
            _loc8_.y = param4.y - Constants.HEIGHT;
         }
         if(param3.x > 0)
         {
            _loc8_.x = param3.x;
         }
         if(param3.y > 0)
         {
            _loc8_.y = param3.y;
         }
         if(_loc8_.x != 0 || _loc8_.y != 0)
         {
            _loc8_.x += Constants.WIDTH / 2;
            _loc8_.y += Constants.HEIGHT / 2;
            _loc8_ = this.camera.globalToLocal(_loc8_);
            this.camera.xCamera += _loc8_.x;
            this.camera.yCamera += _loc8_.y;
         }
         this.camera.rotationCamera = this.curTarget.rotation;
      }
      
      private function updateZones(param1:Vector2) : void
      {
         var _loc3_:Object = null;
         var _loc4_:CameraZone = null;
         var _loc2_:int = this.zoneStack.length - 1;
         while(_loc2_ >= 0)
         {
            if((_loc4_ = this.zoneStack[_loc2_].zone).isInZone(param1))
            {
               break;
            }
            this.zoneStack[_loc2_].isInStack = false;
            this.zoneStack.pop();
            _loc2_--;
         }
         for each(_loc3_ in this.zoneBinds)
         {
            if(!_loc3_.isInStack)
            {
               _loc3_.isInStack = _loc3_.zone.isInZone(param1);
               if(_loc3_.isInStack)
               {
                  this.zoneStack.push(_loc3_);
               }
            }
         }
      }
   }
}

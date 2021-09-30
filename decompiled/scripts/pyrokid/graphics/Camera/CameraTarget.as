package pyrokid.graphics.Camera
{
   public class CameraTarget
   {
       
      
      public var position:Vector2;
      
      public var rotation:Number = 0.0;
      
      public var scaling:Number = 1.0;
      
      public function CameraTarget()
      {
         this.position = new Vector2();
         super();
      }
      
      public static function lerp(param1:CameraTarget, param2:CameraTarget, param3:Number) : CameraTarget
      {
         var _loc4_:CameraTarget;
         (_loc4_ = new CameraTarget()).position.SetV(param2.position).SubV(param1.position).MulD(param3).AddV(param1.position);
         _loc4_.rotation = (param2.rotation - param1.rotation) * param3 + param1.rotation;
         _loc4_.scaling = (param2.scaling - param1.scaling) * param3 + param1.scaling;
         return _loc4_;
      }
   }
}

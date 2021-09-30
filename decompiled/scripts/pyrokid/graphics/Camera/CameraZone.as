package pyrokid.graphics.Camera
{
   public class CameraZone
   {
       
      
      public var center:Vector2;
      
      public var halfSize:Vector2;
      
      public var camTarget:CameraTarget;
      
      public function CameraZone()
      {
         this.center = new Vector2();
         this.halfSize = new Vector2();
         this.camTarget = new CameraTarget();
         super();
      }
      
      public function isInZone(param1:Vector2) : Boolean
      {
         return Math.abs(param1.x - this.center.x) <= this.halfSize.x && Math.abs(param1.y - this.center.y) <= this.halfSize.y;
      }
   }
}

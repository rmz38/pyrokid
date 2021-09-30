package physics
{
   public final class PRect
   {
       
      
      public var center:Vector2;
      
      public var halfSize:Vector2;
      
      public function PRect()
      {
         this.center = new Vector2(0,0);
         this.halfSize = new Vector2(1,1);
         super();
      }
      
      public static function intersects(param1:PRect, param2:PRect, param3:Vector2) : Boolean
      {
         param3.SetV(param2.center).SubV(param1.center);
         var _loc4_:Number = param1.halfSize.x + param2.halfSize.x;
         var _loc5_:Number = param1.halfSize.y + param2.halfSize.y;
         return param3.x >= -_loc4_ && param3.x <= _loc4_ && param3.y >= -_loc5_ && param3.y <= _loc5_;
      }
      
      public function get NX() : Number
      {
         return this.center.x - this.halfSize.x;
      }
      
      public function get PX() : Number
      {
         return this.center.x + this.halfSize.x;
      }
      
      public function get NY() : Number
      {
         return this.center.y - this.halfSize.y;
      }
      
      public function get PY() : Number
      {
         return this.center.y + this.halfSize.y;
      }
      
      public function set NX(param1:Number) : void
      {
         this.center.x = param1 + this.halfSize.x;
      }
      
      public function set PX(param1:Number) : void
      {
         this.center.x = param1 - this.halfSize.x;
      }
      
      public function set NY(param1:Number) : void
      {
         this.center.y = param1 + this.halfSize.y;
      }
      
      public function set PY(param1:Number) : void
      {
         this.center.y = param1 - this.halfSize.y;
      }
   }
}

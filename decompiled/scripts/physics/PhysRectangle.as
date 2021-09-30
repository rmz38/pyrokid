package physics
{
   import pyrokid.Constants;
   
   public class PhysRectangle
   {
       
      
      public var rect:PRect;
      
      public var velocity:Vector2;
      
      public var motion:Vector2;
      
      public function PhysRectangle()
      {
         this.rect = new PRect();
         this.velocity = new Vector2();
         this.motion = new Vector2();
         super();
      }
      
      public function get center() : Vector2
      {
         return this.rect.center;
      }
      
      public function get halfSize() : Vector2
      {
         return this.rect.halfSize;
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
      
      public function Update() : void
      {
         this.motion.SetV(this.velocity).MulD(Constants.DT);
         this.motion.x = CollisionResolver.ClampedMotionEntity(this.motion.x);
         this.motion.y = CollisionResolver.ClampedMotionEntity(this.motion.y);
         this.center.AddV(this.motion);
      }
   }
}

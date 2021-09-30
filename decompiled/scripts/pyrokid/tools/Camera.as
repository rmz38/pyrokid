package pyrokid.tools
{
   import flash.display.Sprite;
   
   public class Camera extends Sprite
   {
       
      
      private var world:Sprite;
      
      private var scale:Number = 1.0;
      
      private var baseScale:Number = 1.0;
      
      public function Camera(param1:Sprite)
      {
         super();
         this.world = param1;
         addChild(this.world);
      }
      
      public function set xCamera(param1:Number) : void
      {
         this.world.x = -param1;
      }
      
      public function get xCamera() : Number
      {
         return -this.world.x;
      }
      
      public function set yCamera(param1:Number) : void
      {
         this.world.y = -param1;
      }
      
      public function get yCamera() : Number
      {
         return -this.world.y;
      }
      
      public function set rotationCamera(param1:Number) : void
      {
         rotation = param1;
      }
      
      public function get rotationCamera() : Number
      {
         return rotation;
      }
      
      public function set scaleCamera(param1:Number) : void
      {
         this.scale = param1;
         scaleX = this.baseScale * this.scale;
         scaleY = this.baseScale * this.scale;
      }
      
      public function get scaleCamera() : Number
      {
         return this.scale;
      }
      
      public function tareScale(param1:Number) : void
      {
         this.scale = 1;
         this.baseScale = param1;
         scaleX = this.baseScale;
         scaleY = this.baseScale;
      }
   }
}

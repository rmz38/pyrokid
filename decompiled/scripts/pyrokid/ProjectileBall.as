package pyrokid
{
   import flash.display.MovieClip;
   import flash.display.Sprite;
   
   public class ProjectileBall extends Sprite
   {
       
      
      public var speedX:int;
      
      public var speedY:int;
      
      public var fball:MovieClip;
      
      private var age:int;
      
      private var range:Number = 0;
      
      public var speed:Number;
      
      public function ProjectileBall()
      {
         super();
         this.age = 0;
      }
      
      public function setDirection(param1:int) : *
      {
         if(param1 == Constants.DIR_LEFT)
         {
            this.speedX = -this.speed;
            rotation = 180;
         }
         else if(param1 == Constants.DIR_RIGHT)
         {
            this.speedX = this.speed;
            rotation = 0;
         }
         else if(param1 == Constants.DIR_UP)
         {
            this.speedY = -this.speed;
            rotation = 270;
         }
         else if(param1 == Constants.DIR_DOWN)
         {
            this.speedY = this.speed;
            rotation = 90;
         }
      }
      
      public function setVelocity(param1:Vector2) : *
      {
         this.speedX = param1.x;
         this.speedY = param1.y;
      }
      
      public function setRange(param1:Number) : void
      {
         this.range = param1 * Constants.CELL / this.speed;
      }
      
      public function isDead() : Boolean
      {
         ++this.age;
         if(this.age > this.range)
         {
            return true;
         }
         return false;
      }
   }
}

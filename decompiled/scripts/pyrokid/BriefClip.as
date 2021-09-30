package pyrokid
{
   import flash.display.DisplayObject;
   import flash.display.MovieClip;
   
   public class BriefClip extends MovieClip
   {
       
      
      public var velocity:Vector2;
      
      public var clip:DisplayObject;
      
      private var timeToEnd:int;
      
      private var numFrames:int;
      
      private var affectedByGravity:Boolean;
      
      private var deathClipType:int;
      
      private var position:Vector2;
      
      private var bottom:int;
      
      public function BriefClip(param1:Vector2, param2:DisplayObject, param3:Vector2 = null, param4:int = -1, param5:Boolean = false, param6:int = -1)
      {
         super();
         this.velocity = param3 == null ? new Vector2() : param3;
         this.clip = param2;
         this.timeToEnd = param4;
         this.affectedByGravity = param5;
         this.deathClipType = param6;
         this.position = param1;
         this.bottom = param1.y + param2.height;
         if(param6 == Constants.DEATH_CLIP_TYPE_SMOOSH)
         {
            param2.x = -param2.width / 2;
            param2.y = -param2.height / 2;
            x = param1.x + param2.width / 2;
            y = param1.y + param2.height / 2;
         }
         else
         {
            x = param1.x;
            y = param1.y;
         }
         this.numFrames = 0;
         addChild(param2);
      }
      
      public function update() : Boolean
      {
         var _loc2_:MovieClip = null;
         this.numFrames += 1;
         if(this.affectedByGravity)
         {
            this.velocity.Add(0,Constants.GRAVITY * Constants.DT * Constants.CELL);
         }
         var _loc1_:Vector2 = this.velocity.copy().MulD(Constants.DT);
         x += _loc1_.x;
         y += _loc1_.y;
         if(this.deathClipType == Constants.DEATH_CLIP_TYPE_SMOOSH && this.numFrames < 15)
         {
            scaleY *= 0.95;
            scaleX *= 1.025;
         }
         if(this.deathClipType == Constants.DEATH_CLIP_TYPE_SMOOSH)
         {
            rotation += (this.velocity.x < 0 ? -5 : 5) + this.velocity.x / 15;
         }
         if(this.deathClipType == Constants.DEATH_CLIP_TYPE_FIRE)
         {
            height = this.calculateYScale(this.numFrames);
            y = this.bottom - height;
         }
         if(this.timeToEnd == -1)
         {
            _loc2_ = this.clip as MovieClip;
            return _loc2_.currentFrame == _loc2_.totalFrames;
         }
         return this.numFrames == this.timeToEnd;
      }
      
      public function calculateYScale(param1:int) : Number
      {
         return 150 - Math.pow(param1 / 1.15 - 10,2);
      }
   }
}

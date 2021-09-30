package pyrokid.entities
{
   import flash.display.MovieClip;
   import flash.display.Sprite;
   import pyrokid.BriefClip;
   import pyrokid.Constants;
   import pyrokid.Embedded;
   import pyrokid.Level;
   import pyrokid.SoundManager;
   
   public class Exit extends FreeEntity
   {
       
      
      private var _canExit:Boolean = false;
      
      private var bombSwf:Sprite;
      
      private var holeSwf:Sprite;
      
      public var isHole:Boolean;
      
      public function Exit(param1:Level, param2:Boolean = false)
      {
         super(param1,1,48,48,10,10,30,30);
         this.bombSwf = new Embedded.Bomb1SWF() as Sprite;
         this.holeSwf = new Embedded.Bomb3SWF() as Sprite;
         addChild(this.bombSwf);
         addChild(this.holeSwf);
         this.setIsHole(param2);
         if(param2)
         {
            this._canExit = true;
         }
      }
      
      private function setIsHole(param1:Boolean) : void
      {
         this.isHole = param1;
         this.bombSwf.visible = !param1;
         this.holeSwf.visible = param1;
      }
      
      public function canExit() : Boolean
      {
         return this._canExit;
      }
      
      override public function ignite(param1:Level, param2:Vector2i = null, param3:int = -1) : Boolean
      {
         if(this.isHole || isOnFire())
         {
            return false;
         }
         super.ignite(param1,param2,param3);
         this.setIsHole(true);
         SoundManager.playSound(Embedded.bombSound);
         var _loc4_:MovieClip = new Embedded.Bomb2SWF() as MovieClip;
         var _loc5_:BriefClip = new BriefClip(new Vector2(x,y),_loc4_);
         param1.briefClips.push(_loc5_);
         param1.addChild(_loc5_);
         return true;
      }
      
      override public function update(param1:Level) : void
      {
         if(isBeingSmooshed())
         {
            this.ignite(param1);
         }
         if(!this.isHole)
         {
            velocity.Add(0,Constants.GRAVITY * Constants.CELL * Constants.DT);
         }
      }
      
      override public function updateFire(param1:Level, param2:int) : void
      {
         if(!isOnFire())
         {
            return;
         }
         if(param2 - ignitionTime == Constants.SPREAD_RATE)
         {
            this._canExit = true;
            _ignitionTime = -1;
         }
      }
      
      override public function projectileCanPassThrough() : Boolean
      {
         return this.isHole;
      }
   }
}

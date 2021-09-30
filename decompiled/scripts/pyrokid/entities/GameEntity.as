package pyrokid.entities
{
   import flash.display.Sprite;
   import pyrokid.BriefClip;
   import pyrokid.Level;
   
   public class GameEntity extends Sprite
   {
       
      
      protected var _ignitionTime:int = -1;
      
      private var _isDead:Boolean = false;
      
      public var velocity:Vector2;
      
      public function GameEntity()
      {
         this.velocity = new Vector2();
         super();
      }
      
      public function kill(param1:Level, param2:BriefClip = null, param3:String = "") : void
      {
         this._isDead = true;
         param1.dirty = true;
         if(param2 != null)
         {
            param1.briefClips.push(param2);
            param1.addChild(param2);
         }
      }
      
      public function get ignitionTime() : int
      {
         return this._ignitionTime;
      }
      
      public function get isDead() : Boolean
      {
         return this._isDead;
      }
      
      public function isOnFire() : Boolean
      {
         return this.ignitionTime >= 0;
      }
      
      public function isMoving() : Boolean
      {
         return this.velocity.x + this.velocity.y != 0;
      }
      
      public function ignite(param1:Level, param2:Vector2i = null, param3:int = -1) : Boolean
      {
         if(!this.isOnFire())
         {
            this._ignitionTime = param1.frameCount;
            return true;
         }
         return false;
      }
      
      public function updateFire(param1:Level, param2:int) : void
      {
      }
      
      public function mutualIgnite(param1:Level, param2:GameEntity) : void
      {
         var _loc3_:BurnForeverEnemy = null;
         if(this is WaterBat && param2 is BurnForeverEnemy)
         {
            _loc3_ = param2 as BurnForeverEnemy;
            _loc3_.douse(param1);
            return;
         }
         if(this is BurnForeverEnemy && param2 is WaterBat)
         {
            _loc3_ = this as BurnForeverEnemy;
            _loc3_.douse(param1);
            return;
         }
         var _loc4_:Boolean = this.isOnFire();
         var _loc5_:Boolean;
         if(_loc5_ = param2.isOnFire())
         {
            this.ignite(param1);
         }
         if(_loc4_)
         {
            param2.ignite(param1);
         }
      }
   }
}

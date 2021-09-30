package pyrokid.entities
{
   import flash.display.Bitmap;
   import flash.display.Sprite;
   import flash.geom.ColorTransform;
   import physics.CollisionAccumulator;
   import physics.PhysCallbackOptions;
   import physics.PhysEdge;
   import physics.PhysRectangle;
   import pyrokid.BriefClip;
   import pyrokid.Constants;
   import pyrokid.Embedded;
   import pyrokid.Level;
   import pyrokid.SoundManager;
   import pyrokid.tools.Box;
   
   public class FreeEntity extends GameEntity
   {
       
      
      protected var _direction:int;
      
      protected var hitBox:Box;
      
      protected var scale:Number;
      
      protected var wArt:int;
      
      protected var hArt:int;
      
      protected var xHit:int;
      
      protected var yHit:int;
      
      protected var wHit:int;
      
      protected var hHit:int;
      
      public var isGrounded:Boolean = false;
      
      public var touchLeft:Boolean = false;
      
      public var touchRight:Boolean = false;
      
      public var touchTop:Boolean = false;
      
      protected var timeSinceHitCeiling:int = 0;
      
      private var _collisionCallback:Function;
      
      private var glowSprite:Sprite;
      
      private var glowImage:Bitmap;
      
      public function FreeEntity(param1:Level, param2:Number, param3:int, param4:int, param5:int = 0, param6:int = 0, param7:int = -1, param8:int = -1)
      {
         this.glowSprite = new Sprite();
         this.glowImage = new Embedded.GlowBMP() as Bitmap;
         super();
         this.wArt = param3;
         this.hArt = param4;
         this.xHit = param5;
         this.yHit = param6;
         if(param7 == -1 || param8 == -1)
         {
            this.wHit = this.wArt;
            this.hHit = this.hArt;
         }
         else
         {
            this.wHit = param7;
            this.hHit = param8;
         }
         this.scale = param2;
         this.hitBox = new Box(param5 * param2,param6 * param2,this.wHit * param2,this.hHit * param2);
         addChild(this.hitBox);
         this._collisionCallback = this.genCollisionCallback(param1);
         if(Constants.DEBUG)
         {
            graphics.lineStyle(1,0);
            graphics.beginFill(8947967);
            graphics.drawRect(0,0,param3 * param2,param4 * param2);
            graphics.endFill();
         }
         this.glowSprite.addChild(this.glowImage);
         this.glowImage.x = -this.glowImage.width / 2;
         this.glowImage.y = -this.glowImage.height / 2;
         addChild(this.glowSprite);
         this.glowSprite.x = this.wHit * 0.5;
         this.glowSprite.y = this.hHit * 0.5;
         this.glow = 1;
         this.glowRadius = this.wHit + this.hHit * 0.25;
         this.glowVisible = false;
      }
      
      public function getLeadingCoorInGlobal() : Vector2i
      {
         var _loc1_:int = this.direction == Constants.DIR_RIGHT ? int(this.wArt) : 0;
         return new Vector2(x + _loc1_,y + this.hArt / 2).DivD(Constants.CELL).floor();
      }
      
      public function getCurrentCoorInGlobal() : Vector2i
      {
         return new Vector2(x + this.wArt / 2,y + this.hArt / 2).DivD(Constants.CELL).floor();
      }
      
      public function set direction(param1:int) : void
      {
         this._direction = param1;
      }
      
      public function get direction() : int
      {
         return this._direction;
      }
      
      public function getCenter() : Vector2i
      {
         return this.getCenterLocal().Add(x,y);
      }
      
      public function getCenterLocal() : Vector2i
      {
         return new Vector2i(this.wArt / 2,this.hArt / 2);
      }
      
      public function genPhysRect() : PhysRectangle
      {
         var _loc1_:PhysRectangle = new PhysRectangle();
         _loc1_.halfSize.Set(this.wArt * this.scale / 2,this.hArt * this.scale / 2).DivD(Constants.CELL);
         return _loc1_;
      }
      
      public function resolveCollision(param1:PhysRectangle, param2:CollisionAccumulator, param3:PhysCallbackOptions) : Boolean
      {
         if(param2.accumNY > 0)
         {
            this.isGrounded = true;
         }
         if(param2.accumPY > 0)
         {
            param3.breakYVelocity = false;
            this.touchTop = true;
         }
         if(param2.accumNX > 0)
         {
            this.touchRight = true;
         }
         if(param2.accumPX > 0)
         {
            this.touchLeft = true;
         }
         if(!param3.breakYVelocity)
         {
            this.timeSinceHitCeiling += 1;
            if(this.timeSinceHitCeiling > Constants.PLAYER_CEILING_HANG_TIME)
            {
               param3.breakYVelocity = true;
               this.timeSinceHitCeiling = 0;
            }
         }
         return true;
      }
      
      public function get entityWidth() : int
      {
         return this.wArt * this.scale;
      }
      
      public function get entityHeight() : int
      {
         return this.hArt * this.scale;
      }
      
      public function get collisionCallback() : Function
      {
         return this._collisionCallback;
      }
      
      public function set glow(param1:Number) : void
      {
         var _loc2_:Number = 0;
         var _loc3_:Number = 0;
         var _loc4_:Number = 0;
         var _loc5_:Number = 1;
         var _loc6_:Number = 1 - Math.abs(3 * param1 / Math.PI % 2 - 1);
         var _loc7_:int = int(3 * param1 / Math.PI);
         switch(_loc7_)
         {
            case 0:
               _loc2_ = 1;
               _loc3_ = _loc6_;
               break;
            case 1:
               _loc3_ = 1;
               _loc2_ = _loc6_;
               break;
            case 2:
               _loc3_ = 1;
               _loc4_ = _loc6_;
               break;
            case 3:
               _loc4_ = 1;
               _loc3_ = _loc6_;
               break;
            case 4:
               _loc4_ = 1;
               _loc2_ = _loc6_;
               break;
            case 5:
               _loc2_ = 1;
               _loc4_ = _loc6_;
         }
         var _loc8_:ColorTransform = new ColorTransform(_loc2_ * 0.3,_loc3_ * 0.3,_loc4_ * 0.3,0.5,150,150,150,0);
         this.glowSprite.transform.colorTransform = _loc8_;
      }
      
      public function set glowRadius(param1:Number) : void
      {
         this.glowImage.width = param1 * 2;
         this.glowImage.height = param1 * 2;
         this.glowImage.x = -param1;
         this.glowImage.y = -param1;
      }
      
      public function set glowVisible(param1:Boolean) : void
      {
         this.glowSprite.visible = param1;
      }
      
      override public function ignite(param1:Level, param2:Vector2i = null, param3:int = -1) : Boolean
      {
         return super.ignite(param1,param2,param3);
      }
      
      protected function isBeingSmooshed() : Boolean
      {
         return this.isGrounded && this.touchTop;
      }
      
      public function update(param1:Level) : void
      {
         var _loc2_:int = 0;
         var _loc3_:Class = null;
         var _loc4_:FreeEntity = null;
         var _loc5_:BriefClip = null;
         if(this is WaterBat)
         {
            if(this.touchTop)
            {
               velocity.y = 5;
            }
            else
            {
               velocity.y = 0;
            }
            if(velocity.y == 0)
            {
               Utils.centerInCellVert(this,Math.round(this.getCenter().y / Constants.CELL));
            }
         }
         if(this.isBeingSmooshed())
         {
            _loc2_ = (Math.random() * 75 + 25) * (Math.random() > 0.5 ? -1 : 1);
            _loc3_ = Object(this).constructor;
            _loc4_ = new _loc3_(param1);
            _loc4_.removeChild(_loc4_.glowSprite);
            SoundManager.playSound(Embedded.squishSound);
            _loc5_ = new BriefClip(new Vector2(x,y),_loc4_,new Vector2(_loc2_,-300),Constants.FADE_TIME,true,Constants.DEATH_CLIP_TYPE_SMOOSH);
            if(_loc4_ is Player)
            {
               param1.smooshedPlayer = _loc5_;
            }
            kill(param1,_loc5_,Constants.DEATH_BY_SMOOSH);
         }
      }
      
      private function genCollisionCallback(param1:Level) : Function
      {
         var self:FreeEntity = null;
         var level:Level = param1;
         self = this;
         return function(param1:PhysEdge, param2:Vector2):void
         {
            var _loc4_:* = undefined;
            var _loc7_:* = undefined;
            var _loc8_:* = undefined;
            var _loc9_:* = undefined;
            var _loc10_:* = undefined;
            var _loc3_:* = new Vector2(param1.center.x,param1.center.y);
            if(param1.direction == Cardinal.NX)
            {
               _loc4_ = new Vector2i(_loc3_.x,Math.floor(_loc3_.y));
            }
            else if(param1.direction == Cardinal.PX)
            {
               _loc4_ = new Vector2i(_loc3_.x - 1,Math.floor(_loc3_.y));
            }
            else if(param1.direction == Cardinal.NY)
            {
               _loc4_ = new Vector2i(Math.floor(_loc3_.x),_loc3_.y);
            }
            else
            {
               if(param1.direction != Cardinal.PY)
               {
                  return;
               }
               _loc4_ = new Vector2i(Math.floor(_loc3_.x),_loc3_.y - 1);
            }
            var _loc5_:* = Cardinal.getOpposite(param1.direction);
            var _loc6_:*;
            if((_loc6_ = Utils.index(level.tileEntityGrid,_loc4_.x,_loc4_.y)) != null)
            {
               _loc7_ = new Vector2i(_loc4_.x,_loc4_.y).SubV(_loc6_.getGlobalAnchorAsVec2i());
               _loc8_ = self.isOnFire();
               _loc9_ = self is WaterBat;
               _loc10_ = _loc6_.isOnFire();
               if(!_loc9_)
               {
                  if(_loc10_ && _loc6_.canIgniteFrom(_loc7_,param1.direction))
                  {
                     self.ignite(level);
                  }
                  if(_loc8_)
                  {
                     _loc6_.ignite(level,_loc7_,_loc5_);
                  }
               }
               else if(_loc10_ && _loc6_.canIgniteFrom(_loc7_,param1.direction))
               {
                  if(_loc6_ is BurnForever)
                  {
                     BurnForever(_loc6_).douse(level);
                  }
               }
            }
         };
      }
      
      public function isTouching(param1:Sprite) : Boolean
      {
         var _loc2_:FreeEntity = null;
         if(param1 is FreeEntity)
         {
            _loc2_ = param1 as FreeEntity;
            return this.hitBox.hitTestObject(_loc2_.hitBox);
         }
         return this.hitBox.hitTestObject(param1);
      }
      
      public function projectileCanPassThrough() : Boolean
      {
         return false;
      }
   }
}

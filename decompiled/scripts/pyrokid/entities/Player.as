package pyrokid.entities
{
   import flash.display.MovieClip;
   import flash.display.Sprite;
   import pyrokid.BriefClip;
   import pyrokid.Constants;
   import pyrokid.Embedded;
   import pyrokid.GameSettings;
   import pyrokid.Level;
   import pyrokid.tools.Key;
   
   public class Player extends FreeEntity
   {
       
      
      private var _width:Number;
      
      private var _height:Number;
      
      private var legsSWF:MovieClip;
      
      private var torsoSWF:MovieClip;
      
      private var aimSWF:Sprite;
      
      public var fireballCooldown:int = 0;
      
      public var animIsRunning:Boolean = false;
      
      public var isShooting:Boolean = false;
      
      private var shootDirection:int = 0;
      
      public var prevFrameFireBtn:Boolean = false;
      
      public var prevFrameJumpBtn:Boolean = false;
      
      private var onFireSprite:Sprite;
      
      public var fireDisabled:Boolean = false;
      
      public function Player(param1:Level)
      {
         super(param1,1,26,44,8,8,16,40);
         this.legsSWF = new Embedded.PlayerLegsSWF() as MovieClip;
         this.legsSWF.stop();
         this.legsSWF.y = -5;
         addChild(this.legsSWF);
         this.torsoSWF = new Embedded.PlayerTorsoSWF() as MovieClip;
         this.torsoSWF.stop();
         this.torsoSWF.y = -5;
         addChild(this.torsoSWF);
         this.aimSWF = new Embedded.CrosshairSWF() as Sprite;
         this.aimSWF.x = getCenterLocal().x;
         this.aimSWF.y = getCenterLocal().y;
         this.aimSWF.scaleX = this.aimSWF.scaleY = 0.7;
         this.aimSWF.alpha = 0;
         addChild(this.aimSWF);
         this._width = width;
         this._height = height;
         this.direction = Constants.DIR_RIGHT;
         this.onFireSprite = new Sprite();
         addChild(this.onFireSprite);
         this.onFireSprite.x = x;
         this.onFireSprite.y = y;
         this.onFireSprite.graphics.lineStyle(0);
         this.onFireSprite.graphics.beginFill(16711765);
         this.onFireSprite.graphics.drawRect(0,0,20,20);
         this.onFireSprite.graphics.endFill();
         this.onFireSprite.visible = false;
      }
      
      override public function ignite(param1:Level, param2:Vector2i = null, param3:int = -1) : Boolean
      {
         var _loc5_:BriefClip = null;
         var _loc4_:Boolean;
         if(_loc4_ = super.ignite(param1,param2,param3))
         {
            this.onFireSprite.visible = true;
            _loc5_ = new BriefClip(new Vector2(x,y),new Embedded.PlayerDieFireSWF() as MovieClip);
            this.kill(param1,_loc5_,Constants.DEATH_BY_FIRE);
         }
         return _loc4_;
      }
      
      override public function kill(param1:Level, param2:BriefClip = null, param3:String = "") : void
      {
         var level:Level = param1;
         var deathAnimation:BriefClip = param2;
         var method:String = param3;
         level.gameOverState = Constants.GAME_OVER_FADING;
         var fade_time:int = method == Constants.DEATH_BY_FALLING ? 30 : int(Constants.FADE_TIME);
         var delayedFunc:Function = function():void
         {
            level.gameOverState = Constants.GAME_OVER_COMPLETE;
         };
         level.delayedFunctions[delayedFunc] = fade_time;
         var center:Vector2i = getCenter();
         Main.log.logDeath(Utils.realToCell(center.x),Utils.realToCell(center.y),method,level.frameCount);
         Main.log.logEndLevel();
         super.kill(level,deathAnimation);
      }
      
      public function damageFromEnemyContact(param1:Level) : void
      {
         var _loc2_:BriefClip = new BriefClip(new Vector2(x,y),new Embedded.PlayerDiePainSWF() as MovieClip);
         this.kill(param1,_loc2_,Constants.DEATH_BY_ENEMY);
      }
      
      override public function update(param1:Level) : void
      {
         super.update(param1);
         velocity.x = 0;
         this.animIsRunning = false;
         if(Key.isDown(GameSettings.leftBtn))
         {
            velocity.x -= Constants.PLAYER_XSPEED;
            direction = Constants.DIR_LEFT;
            this.animIsRunning = true;
         }
         if(Key.isDown(GameSettings.rightBtn))
         {
            velocity.x += Constants.PLAYER_XSPEED;
            direction = Constants.DIR_RIGHT;
            this.animIsRunning = true;
         }
         if(isGrounded && Key.isDown(GameSettings.jumpBtn) && (!this.prevFrameJumpBtn || Constants.ALLOW_JUMP_HOLD))
         {
            velocity.y -= Constants.PLAYER_JUMP_SPEED * (1 + velocity.y * Constants.PLAYER_JUMP_FALLING_MULTIPLIER);
            timeSinceHitCeiling = 0;
         }
         velocity.Add(0,Constants.GRAVITY_ENT * Constants.CELL * Constants.DT);
         this.prevFrameJumpBtn = Key.isDown(GameSettings.jumpBtn);
         var _loc2_:Boolean = (Key.isDown(GameSettings.shootLeftBtn) || Key.isDown(GameSettings.shootRightBtn) || Key.isDown(GameSettings.shootUpBtn) || Key.isDown(GameSettings.shootDownBtn)) && !this.fireDisabled;
         if(Key.isDown(GameSettings.shootLeftBtn))
         {
            this.shootDirection = Constants.DIR_LEFT;
         }
         if(Key.isDown(GameSettings.shootRightBtn))
         {
            this.shootDirection = Constants.DIR_RIGHT;
         }
         if(Key.isDown(GameSettings.shootUpBtn))
         {
            this.shootDirection = Constants.DIR_UP;
         }
         if(Key.isDown(GameSettings.shootDownBtn))
         {
            this.shootDirection = Constants.DIR_DOWN;
         }
         if(_loc2_ && !this.prevFrameFireBtn && this.fireballCooldown == 0)
         {
            if(isGrounded && this.shootDirection == Constants.DIR_DOWN)
            {
               param1.launchFireball(0.5,this.shootDirection);
            }
            else
            {
               param1.launchFireball(Constants.MAX_BALL_RANGE,this.shootDirection);
            }
            this.fireballCooldown = Constants.FIREBALL_COOLDOWN;
            this.isShooting = true;
         }
         if(this.fireballCooldown > 0)
         {
            --this.fireballCooldown;
         }
         this.prevFrameFireBtn = _loc2_;
         this.updateAnimation();
      }
      
      public function updateAnimation() : void
      {
         var _loc2_:* = undefined;
         var _loc1_:* = direction;
         if(this.isShooting && (this.shootDirection == Constants.DIR_LEFT || this.shootDirection == Constants.DIR_RIGHT))
         {
            _loc1_ = this.shootDirection;
         }
         if(_loc1_ == Constants.DIR_RIGHT)
         {
            this.legsSWF.scaleX = 1;
            this.legsSWF.x = 0;
            this.torsoSWF.scaleX = 1;
            this.torsoSWF.x = 0;
         }
         if(_loc1_ == Constants.DIR_LEFT)
         {
            this.legsSWF.scaleX = -1;
            this.legsSWF.x = 30;
            this.torsoSWF.scaleX = -1;
            this.torsoSWF.x = 30;
         }
         if(!isGrounded)
         {
            this.legsSWF.gotoAndStop(3);
         }
         else if(this.animIsRunning)
         {
            this.legsSWF.gotoAndStop(2);
         }
         else
         {
            this.legsSWF.gotoAndStop(1);
         }
         if(this.isShooting)
         {
            _loc2_ = this.torsoSWF.currentFrame == 7 || this.torsoSWF.currentFrame == 10 || this.torsoSWF.currentFrame == 13;
            if(_loc2_)
            {
               if(this.torsoSWF.playershoot.currentFrame == this.torsoSWF.playershoot.totalFrames)
               {
                  this.isShooting = false;
               }
            }
            else if(this.shootDirection == Constants.DIR_LEFT || this.shootDirection == Constants.DIR_RIGHT)
            {
               this.torsoSWF.gotoAndStop(7);
            }
            else if(this.shootDirection == Constants.DIR_UP)
            {
               this.torsoSWF.gotoAndStop(10);
            }
            else if(this.shootDirection == Constants.DIR_DOWN)
            {
               this.torsoSWF.gotoAndStop(13);
            }
         }
         else if(!isGrounded)
         {
            if(velocity.y < 0)
            {
               this.torsoSWF.gotoAndStop(3);
            }
            else
            {
               this.torsoSWF.gotoAndStop(4);
            }
         }
         else if(velocity.x == 0)
         {
            this.torsoSWF.gotoAndStop(1);
         }
         else
         {
            this.torsoSWF.gotoAndStop(2);
         }
      }
   }
}

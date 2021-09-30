package pyrokid.entities
{
   import flash.display.MovieClip;
   import flash.display.Sprite;
   import pyrokid.BriefClip;
   import pyrokid.Constants;
   import pyrokid.Embedded;
   import pyrokid.Level;
   
   public class WaterBat extends BackAndForthEnemy
   {
       
      
      public var batHead:MovieClip;
      
      private var HEAD_ROT_OFFSET:int = 225;
      
      private var X_CENTER_TO_HEAD:int = 7;
      
      private var LENGTH_OF_HEAD:int = 10;
      
      private var dirToShoot:int;
      
      private var timeToWaterball:int = 0;
      
      public function WaterBat(param1:Level)
      {
         var _loc2_:MovieClip = new Embedded.WaterBatSWF() as MovieClip;
         this.batHead = _loc2_.head;
         var _loc3_:Sprite = _loc2_;
         super(param1,_loc3_,1,45,35,8,9,26,19,false);
         this.batHead.gotoAndStop(1);
      }
      
      override public function ignite(param1:Level, param2:Vector2i = null, param3:int = -1) : Boolean
      {
         var _loc5_:MovieClip = null;
         var _loc6_:int = 0;
         var _loc7_:BriefClip = null;
         var _loc4_:Boolean;
         if(_loc4_ = super.ignite(param1,param2,param3))
         {
            kill(param1);
            (_loc5_ = new Embedded.WaterBatDieSWF() as MovieClip).scaleX = swf.scaleX;
            _loc5_.scaleY = swf.scaleY;
            _loc6_ = direction == Constants.DIR_RIGHT ? int(x) : int(x + wArt);
            _loc7_ = new BriefClip(new Vector2(_loc6_,y),_loc5_);
            param1.addChild(_loc7_);
            param1.briefClips.push(_loc7_);
         }
         return _loc4_;
      }
      
      override public function update(param1:Level) : void
      {
         var _loc4_:Vector2i = null;
         var _loc5_:Vector2i = null;
         var _loc6_:Vector2 = null;
         super.update(param1);
         var _loc2_:int = param1.player.x - this.x;
         var _loc3_:int = param1.player.y - this.y;
         this.dirToShoot = Utils.getQuadrant(_loc2_,_loc3_);
         if(this.dirToShoot == Constants.DIR_UP)
         {
            this.batHead.rotation = -90 - this.HEAD_ROT_OFFSET;
         }
         else if(this.dirToShoot == Constants.DIR_DOWN)
         {
            this.batHead.rotation = 90 - this.HEAD_ROT_OFFSET;
         }
         else if(this.dirToShoot != this.direction)
         {
            this.dirToShoot = Constants.DIR_DOWN;
            this.batHead.rotation = 90 - this.HEAD_ROT_OFFSET;
         }
         else
         {
            this.batHead.rotation = -this.HEAD_ROT_OFFSET;
         }
         if(this.timeToWaterball < Constants.WATERBALL_COOLDOWN)
         {
            ++this.timeToWaterball;
         }
         else
         {
            this.timeToWaterball = 0;
            (_loc4_ = this.getCenter()).AddV(new Vector2i(direction == Constants.DIR_RIGHT ? int(this.X_CENTER_TO_HEAD) : int(-this.X_CENTER_TO_HEAD),0));
            _loc5_ = Utils.getXYMultipliers(this.dirToShoot).MulD(this.LENGTH_OF_HEAD);
            _loc4_.AddV(_loc5_);
            _loc6_ = new Vector2(0,0);
            if(direction == Constants.DIR_LEFT)
            {
               _loc6_.x = -2;
            }
            else if(direction == Constants.DIR_RIGHT)
            {
               _loc6_.x = 2;
            }
            param1.launchWaterball(_loc4_.x,_loc4_.y,5,this.dirToShoot,_loc6_);
         }
      }
   }
}

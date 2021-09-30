package pyrokid.entities
{
   import flash.display.Sprite;
   import pyrokid.Constants;
   import pyrokid.Level;
   
   public class BackAndForthEnemy extends FreeEntity
   {
       
      
      protected var swf:Sprite;
      
      protected var gravity:Boolean;
      
      protected var health:int;
      
      public function BackAndForthEnemy(param1:Level, param2:Sprite, param3:Number, param4:int, param5:int, param6:int = 0, param7:int = 0, param8:int = -1, param9:int = -1, param10:Boolean = true)
      {
         super(param1,param3,param4,param5,param6,param7,param8,param9);
         this.swf = param2;
         addChild(param2);
         param2.scaleX = param2.scaleY = param3;
         this.gravity = param10;
         this.direction = Constants.DIR_RIGHT;
         if(Constants.DEBUG)
         {
            setChildIndex(this.swf,0);
         }
      }
      
      override public function set direction(param1:int) : void
      {
         _direction = param1;
         if(param1 == Constants.DIR_RIGHT)
         {
            this.swf.scaleX = scale;
            this.swf.x = 0;
            hitBox.x = xHit * scale;
            hitBox.scaleX = 1;
         }
         else
         {
            this.swf.scaleX = -scale;
            this.swf.x = scale * wArt;
            hitBox.x = scale * wArt - xHit * scale;
            hitBox.scaleX = -1;
         }
      }
      
      override public function ignite(param1:Level, param2:Vector2i = null, param3:int = -1) : Boolean
      {
         if(this.health > 1)
         {
            --this.health;
            return false;
         }
         return super.ignite(param1,param2,param3);
      }
      
      override public function update(param1:Level) : void
      {
         super.update(param1);
         var _loc2_:Vector2i = getLeadingCoorInGlobal();
         var _loc3_:Vector2i = getCurrentCoorInGlobal().Add(0,1);
         var _loc4_:TileEntity = Utils.index(param1.tileEntityGrid,_loc2_.x,_loc2_.y);
         var _loc5_:TileEntity = Utils.index(param1.tileEntityGrid,_loc3_.x,_loc3_.y);
         var _loc6_:TileEntity = Utils.index(param1.tileEntityGrid,_loc2_.x,_loc2_.y + 1);
         if(this.gravity && velocity.y == 0 && _loc4_ == null && _loc6_ == null && _loc5_ != null)
         {
            if(direction == Constants.DIR_RIGHT)
            {
               this.direction = Constants.DIR_LEFT;
            }
            else
            {
               this.direction = Constants.DIR_RIGHT;
            }
         }
         if(touchRight)
         {
            this.direction = Constants.DIR_LEFT;
         }
         else if(touchLeft)
         {
            this.direction = Constants.DIR_RIGHT;
         }
         if(this.gravity)
         {
            velocity.Add(0,Constants.GRAVITY * Constants.CELL * Constants.DT);
         }
         velocity.Set(direction == Constants.DIR_RIGHT ? Number(Constants.SPIDER_SPEED) : Number(-Constants.SPIDER_SPEED),velocity.y);
      }
   }
}

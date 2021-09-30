package pyrokid.entities
{
   import flash.display.DisplayObject;
   import flash.display.MovieClip;
   import pyrokid.BriefClip;
   import pyrokid.Constants;
   import pyrokid.Embedded;
   import pyrokid.Level;
   
   public class BurnQuickly extends TileEntity
   {
       
      
      public function BurnQuickly(param1:int, param2:int, param3:int)
      {
         super(param1,param2,param3);
      }
      
      override public function ignite(param1:Level, param2:Vector2i = null, param3:int = -1) : Boolean
      {
         var _loc5_:DisplayObject = null;
         var _loc4_:Boolean;
         if(_loc4_ = super.ignite(param1,param2,param3))
         {
            for each(_loc5_ in fireSprites)
            {
               addChild(_loc5_);
            }
         }
         return _loc4_;
      }
      
      override public function updateFire(param1:Level, param2:int) : void
      {
         var _loc3_:Vector2 = null;
         var _loc4_:Vector2i = null;
         if(!isOnFire())
         {
            return;
         }
         if(param2 - ignitionTime == Constants.QUICK_BURN_TIME)
         {
            for each(_loc3_ in coorsInGlobal())
            {
               this.addWoodExplode(_loc3_,param1);
            }
            for each(_loc4_ in visualCells)
            {
               this.addWoodExplode(_loc4_.copyAsVec2().AddV(getGlobalAnchor()),param1);
            }
            kill(param1);
         }
      }
      
      private function addWoodExplode(param1:Vector2, param2:Level) : void
      {
         var _loc3_:MovieClip = new Embedded.WoodExplodeSWF() as MovieClip;
         var _loc4_:BriefClip = new BriefClip(param1.MulD(Constants.CELL),_loc3_,velocity.copy().MulD(0.1));
         param2.briefClips.push(_loc4_);
         param2.addChild(_loc4_);
      }
   }
}

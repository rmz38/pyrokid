package pyrokid
{
   import flash.display.Sprite;
   import pyrokid.entities.FreeEntity;
   import pyrokid.entities.TileEntity;
   
   public class FireHandler extends Sprite
   {
       
      
      public function FireHandler()
      {
         super();
      }
      
      public static function spreadFire(param1:Level) : void
      {
         var _loc2_:FreeEntity = null;
         var _loc3_:TileEntity = null;
         var _loc4_:* = false;
         for each(_loc2_ in param1.enemies)
         {
            _loc2_.updateFire(param1,param1.frameCount);
         }
         param1.player.updateFire(param1,param1.frameCount);
         for each(_loc3_ in param1.onFire)
         {
            _loc3_.updateFire(param1,param1.frameCount);
            if(_loc4_ = param1.frameCount % Constants.SPREAD_RATE == (_loc3_.ignitionTime - 1) % Constants.SPREAD_RATE)
            {
               _loc3_.spreadToNeighbors(param1);
            }
         }
      }
   }
}

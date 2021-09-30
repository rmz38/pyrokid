package pyrokid.entities
{
   import flash.display.DisplayObject;
   import pyrokid.Constants;
   import pyrokid.Embedded;
   import pyrokid.Level;
   
   public class NonFlammableTile extends TileEntity
   {
       
      
      public function NonFlammableTile(param1:int, param2:int, param3:int)
      {
         super(param1,param2,param3);
      }
      
      override public function ignite(param1:Level, param2:Vector2i = null, param3:int = -1) : Boolean
      {
         return false;
      }
      
      override protected function getSpriteForCell(param1:Vector2i) : DisplayObject
      {
         if(objectCode == Constants.METAL_TILE_CODE)
         {
            return new Embedded.MetalBMP();
         }
         return new Embedded.DirtBMP();
      }
   }
}

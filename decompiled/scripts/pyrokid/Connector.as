package pyrokid
{
   import flash.display.Sprite;
   import pyrokid.entities.TileEntity;
   
   public class Connector extends Sprite
   {
       
      
      public function Connector()
      {
         super();
      }
      
      public static function getActualConnectedGrid(param1:Array, param2:Array) : Array
      {
         var allConnectors:Array = null;
         var connectedGrid:Array = param1;
         var tileEntityGrid:Array = param2;
         allConnectors = Utils.newArrayOfSize(tileEntityGrid);
         Utils.foreach(tileEntityGrid,function(param1:int, param2:int, param3:TileEntity):void
         {
            var _loc8_:Vector2i = null;
            var _loc9_:TileEntity = null;
            if(param3 == null)
            {
               return;
            }
            var _loc4_:Vector2i = new Vector2i(param1,param2);
            var _loc5_:Array = Utils.getBooleansFromInt(connectedGrid[_loc4_.y][_loc4_.x]);
            var _loc6_:Array = [false,false,false,false];
            var _loc7_:int = 0;
            while(_loc7_ < 4)
            {
               _loc8_ = Cardinal.getVector2i(_loc7_).AddV(_loc4_);
               _loc9_ = Utils.index(tileEntityGrid,_loc8_.x,_loc8_.y);
               if(_loc5_[_loc7_] && _loc9_ != null && param3 != _loc9_)
               {
                  _loc6_[_loc7_] = true;
               }
               _loc7_++;
            }
            allConnectors[param2][param1] = Utils.getIntFromBooleans(_loc6_);
         });
         return allConnectors;
      }
      
      public static function coorAndDirToString(param1:Vector2i, param2:int) : String
      {
         return param1.toString() + ", " + param2;
      }
   }
}

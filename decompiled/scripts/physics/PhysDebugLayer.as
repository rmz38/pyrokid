package physics
{
   import flash.display.Sprite;
   import pyrokid.Constants;
   
   public class PhysDebugLayer extends Sprite
   {
       
      
      public function PhysDebugLayer()
      {
         super();
      }
      
      public function draw(param1:Array, param2:Array) : *
      {
         var _loc4_:PhysIsland = null;
         var _loc5_:PhysRectangle = null;
         var _loc6_:PossibleTile = null;
         var _loc7_:int = 0;
         var _loc8_:int = 0;
         graphics.clear();
         graphics.lineStyle(0.05);
         var _loc3_:Array = [];
         graphics.beginFill(16711680,0.3);
         for each(_loc4_ in param1)
         {
            _loc7_ = 0;
            while(_loc7_ < _loc4_.tilesHeight)
            {
               _loc8_ = 0;
               while(_loc8_ < _loc4_.tilesWidth)
               {
                  if(_loc4_.tileGrid[_loc7_][_loc8_] != null)
                  {
                     _loc3_.push(new PossibleTile(_loc4_,_loc8_,_loc7_));
                     graphics.drawRect(_loc8_ + _loc4_.globalAnchor.x,_loc7_ + _loc4_.globalAnchor.y,1,1);
                  }
                  _loc8_++;
               }
               _loc7_++;
            }
         }
         graphics.endFill();
         graphics.beginFill(65280,0.3);
         for each(_loc5_ in param2)
         {
            graphics.drawRect(_loc5_.rect.NX,_loc5_.rect.NY,_loc5_.rect.halfSize.x * 2,_loc5_.rect.halfSize.y * 2);
         }
         graphics.endFill();
         CollisionResolver.cullEdges(_loc3_);
         graphics.lineStyle(0.15,65535);
         for each(_loc6_ in _loc3_)
         {
            if(_loc6_.collideNX)
            {
               graphics.moveTo(_loc6_.rect.NX,_loc6_.rect.NY);
               graphics.lineTo(_loc6_.rect.NX,_loc6_.rect.PY);
            }
            if(_loc6_.collidePX)
            {
               graphics.moveTo(_loc6_.rect.PX,_loc6_.rect.NY);
               graphics.lineTo(_loc6_.rect.PX,_loc6_.rect.PY);
            }
            if(_loc6_.collideNY)
            {
               graphics.moveTo(_loc6_.rect.NX,_loc6_.rect.NY);
               graphics.lineTo(_loc6_.rect.PX,_loc6_.rect.NY);
            }
            if(_loc6_.collidePY)
            {
               graphics.moveTo(_loc6_.rect.NX,_loc6_.rect.PY);
               graphics.lineTo(_loc6_.rect.PX,_loc6_.rect.PY);
            }
         }
         scaleX = scaleY = Constants.CELL;
      }
   }
}

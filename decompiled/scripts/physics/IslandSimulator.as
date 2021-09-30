package physics
{
   public class IslandSimulator
   {
       
      
      public function IslandSimulator()
      {
         super();
      }
      
      public static function ConstructIslands(param1:Array) : Array
      {
         var _loc2_:* = [];
         var _loc3_:Array = BuildIDs(param1,_loc2_);
         MergeIDs(param1,_loc3_,_loc2_);
         var _loc4_:Array = GetIslandPositions(_loc3_);
         var _loc5_:* = new Array(_loc4_.length);
         var _loc6_:int = 0;
         while(_loc6_ < _loc4_.length)
         {
            _loc5_[_loc6_] = ConstructIsland(_loc4_[_loc6_],param1);
            _loc6_++;
         }
         return _loc5_;
      }
      
      private static function BuildIDs(param1:Array, param2:Array) : Array
      {
         var _loc6_:int = 0;
         var _loc7_:IPhysTile = null;
         var _loc3_:Array = new Array(param1.length);
         var _loc4_:int = 1;
         var _loc5_:int = 0;
         while(_loc5_ < param1.length)
         {
            _loc3_[_loc5_] = new Array(param1[_loc5_].length);
            _loc6_ = 0;
            while(_loc6_ < param1[_loc5_].length)
            {
               if((_loc7_ = param1[_loc5_][_loc6_]) == null)
               {
                  _loc3_[_loc5_][_loc6_] = 0;
               }
               else
               {
                  _loc3_[_loc5_][_loc6_] = _loc4_;
                  param2.push(new Vector2i(_loc6_,_loc5_));
                  _loc4_++;
               }
               _loc6_++;
            }
            _loc5_++;
         }
         return _loc3_;
      }
      
      private static function MergeIDs(param1:Array, param2:Array, param3:Array) : *
      {
         var _loc6_:Vector2i = null;
         var _loc7_:int = 0;
         var _loc4_:int = param1.length;
         var _loc5_:Vector2i = new Vector2i(0,0);
         while(param3.length > 0)
         {
            _loc6_ = param3.shift();
            _loc7_ = param1[_loc6_.y].length;
            if(_loc6_.x > 0)
            {
               MergeTiles(param1,param2,_loc6_,_loc5_.SetV(_loc6_).Sub(1,0),Cardinal.NX);
            }
            if(_loc6_.x < _loc7_ - 1)
            {
               MergeTiles(param1,param2,_loc6_,_loc5_.SetV(_loc6_).Add(1,0),Cardinal.PX);
            }
            if(_loc6_.y > 0)
            {
               MergeTiles(param1,param2,_loc6_,_loc5_.SetV(_loc6_).Sub(0,1),Cardinal.NY);
            }
            if(_loc6_.y < _loc4_ - 1)
            {
               MergeTiles(param1,param2,_loc6_,_loc5_.SetV(_loc6_).Add(0,1),Cardinal.PY);
            }
         }
      }
      
      private static function MergeTiles(param1:Array, param2:Array, param3:Vector2i, param4:Vector2i, param5:int) : *
      {
         var _loc6_:IPhysTile = param1[param3.y][param3.x];
         var _loc7_:int = param2[param3.y][param3.x];
         var _loc8_:IPhysTile = param1[param4.y][param4.x];
         var _loc9_:int = param2[param4.y][param4.x];
         if(_loc6_ == null || _loc8_ == null)
         {
            return;
         }
         if(_loc7_ == _loc9_)
         {
            return;
         }
         if(_loc6_.CanBind(param5,_loc8_) && _loc8_.CanBind(param5 ^ 1,_loc6_))
         {
            if(_loc7_ < _loc9_)
            {
               SwapIDs(param2,param4.x,param4.y,_loc9_,_loc7_);
            }
            else
            {
               SwapIDs(param2,param3.x,param3.y,_loc7_,_loc9_);
            }
         }
      }
      
      private static function SwapIDs(param1:Array, param2:int, param3:int, param4:int, param5:int) : *
      {
         var _loc6_:int = 0;
         var _loc7_:int = 0;
         if(param1[param3][param2] == param4)
         {
            param1[param3][param2] = param5;
            _loc6_ = param1.length;
            _loc7_ = param1[param3].length;
            if(param2 > 0)
            {
               SwapIDs(param1,param2 - 1,param3,param4,param5);
            }
            if(param2 < _loc7_ - 1)
            {
               SwapIDs(param1,param2 + 1,param3,param4,param5);
            }
            if(param3 > 0)
            {
               SwapIDs(param1,param2,param3 - 1,param4,param5);
            }
            if(param3 < _loc6_ - 1)
            {
               SwapIDs(param1,param2,param3 + 1,param4,param5);
            }
         }
      }
      
      private static function GetIslandPositions(param1:Array) : Array
      {
         var _loc5_:int = 0;
         var _loc6_:int = 0;
         var _loc7_:String = null;
         var _loc8_:Array = null;
         var _loc2_:Object = new Object();
         var _loc3_:* = [];
         var _loc4_:int = 0;
         while(_loc4_ < param1.length)
         {
            _loc5_ = 0;
            while(_loc5_ < param1[_loc4_].length)
            {
               if((_loc6_ = param1[_loc4_][_loc5_]) != 0)
               {
                  _loc7_ = _loc6_.toString();
                  if(!_loc2_.hasOwnProperty(_loc7_))
                  {
                     _loc8_ = [];
                     _loc2_[_loc7_] = _loc8_;
                     _loc3_.push(_loc8_);
                  }
                  _loc2_[_loc7_].push(new Vector2i(_loc5_,_loc4_));
               }
               _loc5_++;
            }
            _loc4_++;
         }
         return _loc3_;
      }
      
      private static function ConstructIsland(param1:Array, param2:Array) : PhysIsland
      {
         var _loc5_:Vector2i = null;
         var _loc6_:PhysIsland = null;
         var _loc7_:IPhysTile = null;
         var _loc3_:Vector2i = new Vector2i(int.MAX_VALUE,int.MIN_VALUE);
         var _loc4_:Vector2i = new Vector2i(int.MAX_VALUE,int.MIN_VALUE);
         for each(_loc5_ in param1)
         {
            if(_loc5_.x < _loc3_.x)
            {
               _loc3_.x = _loc5_.x;
            }
            if(_loc5_.x > _loc3_.y)
            {
               _loc3_.y = _loc5_.x;
            }
            if(_loc5_.y < _loc4_.x)
            {
               _loc4_.x = _loc5_.y;
            }
            if(_loc5_.y > _loc4_.y)
            {
               _loc4_.y = _loc5_.y;
            }
         }
         (_loc6_ = new PhysIsland(_loc3_.y - _loc3_.x + 1,_loc4_.y - _loc4_.x + 1)).tileOriginalLocation.Set(_loc3_.x,_loc4_.x);
         _loc6_.x = _loc3_.x;
         _loc6_.y = _loc4_.x;
         for each(_loc5_ in param1)
         {
            _loc7_ = param2[_loc5_.y][_loc5_.x];
            _loc5_.Sub(_loc3_.x,_loc4_.x);
            _loc6_.AddTile(_loc5_.x,_loc5_.y,_loc7_);
         }
         return _loc6_;
      }
      
      public static function ConstructCollisionColumns(param1:Array) : Array
      {
         var _loc4_:PhysIsland = null;
         var _loc5_:int = 0;
         var _loc6_:* = undefined;
         var _loc7_:int = 0;
         var _loc8_:int = 0;
         var _loc9_:int = 0;
         var _loc10_:int = 0;
         var _loc11_:* = undefined;
         var _loc12_:CollisionColumn = null;
         var _loc13_:int = 0;
         var _loc2_:int = int.MAX_VALUE;
         var _loc3_:int = int.MIN_VALUE;
         for each(_loc4_ in param1)
         {
            _loc9_ = (_loc8_ = int(_loc4_.globalAnchor.x + 0.5)) + _loc4_.tilesWidth - 1;
            if(_loc8_ < _loc2_)
            {
               _loc2_ = _loc8_;
            }
            if(_loc9_ > _loc3_)
            {
               _loc3_ = _loc9_;
            }
         }
         _loc5_ = _loc3_ - _loc2_ + 1;
         _loc6_ = new Array(_loc5_);
         _loc7_ = 0;
         while(_loc7_ < _loc5_)
         {
            _loc6_[_loc7_] = [];
            _loc7_++;
         }
         for each(_loc4_ in param1)
         {
            _loc10_ = (_loc10_ = int(_loc4_.globalAnchor.x + 0.5)) - _loc2_;
            _loc11_ = BuildIslandCollisionColumns(_loc4_);
            for each(_loc12_ in _loc11_)
            {
               _loc13_ = int(_loc12_.pyEdge.center.x);
               _loc6_[_loc10_ + _loc13_].push(_loc12_);
            }
         }
         return _loc6_;
      }
      
      private static function BuildIslandCollisionColumns(param1:PhysIsland) : Array
      {
         var _loc4_:int = 0;
         var _loc5_:int = 0;
         var _loc2_:Array = [];
         var _loc3_:int = 0;
         while(_loc3_ < param1.tilesWidth)
         {
            _loc4_ = 0;
            while(_loc4_ < param1.tilesHeight)
            {
               while(_loc4_ < param1.tilesHeight && param1.tileGrid[_loc4_][_loc3_] == null)
               {
                  _loc4_++;
               }
               if(_loc4_ != param1.tilesHeight)
               {
                  _loc5_ = _loc4_;
                  while(_loc4_ < param1.tilesHeight && param1.tileGrid[_loc4_][_loc3_] != null)
                  {
                     _loc4_++;
                  }
                  _loc2_.push(CreateColumn(param1,_loc3_,_loc5_,_loc4_ - _loc5_));
               }
            }
            _loc3_++;
         }
         return _loc2_;
      }
      
      private static function CreateColumn(param1:PhysIsland, param2:int, param3:int, param4:int) : CollisionColumn
      {
         var _loc5_:CollisionColumn;
         (_loc5_ = new CollisionColumn(param1)).nyEdge = new PhysEdge(Cardinal.NY,param2 + 0.5,param3,1);
         _loc5_.pyEdge = new PhysEdge(Cardinal.PY,param2 + 0.5,param3 + param4,1);
         return _loc5_;
      }
      
      public static function Simulate(param1:Array, param2:Array, param3:Vector2, param4:Number) : void
      {
         var _loc5_:PhysIsland = null;
         var _loc6_:Array = null;
         var _loc7_:CollisionColumn = null;
         var _loc8_:CollisionColumn = null;
         var _loc9_:Number = NaN;
         for each(_loc5_ in param1)
         {
            if(!_loc5_.isGrounded)
            {
               _loc5_.velocity.Add(param3.x * param4,param3.y * param4);
               _loc5_.motion.SetV(_loc5_.velocity).MulD(param4);
               _loc5_.motion.x = CollisionResolver.ClampedMotion(_loc5_.motion.x);
               _loc5_.motion.y = CollisionResolver.ClampedMotion(_loc5_.motion.y);
               _loc5_.globalAnchor.AddV(_loc5_.motion);
               _loc5_.resetBoundingRect();
               _loc5_.columnAccumulator.Set(0,0);
            }
         }
         for each(_loc6_ in param2)
         {
            for each(_loc7_ in _loc6_)
            {
               for each(_loc8_ in _loc6_)
               {
                  CollideColumns(_loc7_,_loc8_);
               }
            }
         }
         for each(_loc5_ in param1)
         {
            if((_loc9_ = _loc5_.columnAccumulator.y - _loc5_.columnAccumulator.x) != 0)
            {
               _loc5_.velocity.y = 0;
               _loc5_.motion.y += _loc9_;
               _loc5_.globalAnchor.y += _loc9_;
               _loc5_.resetBoundingRect();
            }
            _loc5_.motion.MulD(1.1);
         }
      }
      
      private static function CollideColumns(param1:CollisionColumn, param2:CollisionColumn) : *
      {
         var _loc5_:Number = NaN;
         var _loc6_:Number = NaN;
         var _loc7_:Number = NaN;
         if(param1 == param2 || param1.island == param2.island || param1.island.isGrounded && param2.island.isGrounded)
         {
            return;
         }
         var _loc3_:Number = (param1.pyEdge.center.y + param1.nyEdge.center.y) * 0.5 + param1.island.globalAnchor.y;
         var _loc4_:Number = (param2.pyEdge.center.y + param2.nyEdge.center.y) * 0.5 + param2.island.globalAnchor.y;
         if(_loc3_ > _loc4_)
         {
            _loc6_ = param1.nyEdge.center.y + param1.island.globalAnchor.y;
            _loc7_ = param2.pyEdge.center.y + param2.island.globalAnchor.y;
            if((_loc5_ = _loc6_ - _loc7_) < 0)
            {
               DisplaceIsland(param1,param2,-_loc5_);
            }
         }
         else
         {
            _loc6_ = param2.nyEdge.center.y + param2.island.globalAnchor.y;
            _loc7_ = param1.pyEdge.center.y + param1.island.globalAnchor.y;
            if((_loc5_ = _loc6_ - _loc7_) < 0)
            {
               DisplaceIsland(param2,param1,-_loc5_);
            }
         }
      }
      
      private static function DisplaceIsland(param1:CollisionColumn, param2:CollisionColumn, param3:Number) : *
      {
         if(!param2.island.isGrounded)
         {
            param2.island.columnAccumulator.x = Math.max(param2.island.columnAccumulator.x,param3);
         }
         else if(!param1.island.isGrounded)
         {
            param1.island.columnAccumulator.y = Math.max(param1.island.columnAccumulator.y,param3);
         }
         else
         {
            param1.island.columnAccumulator.y = Math.max(param1.island.columnAccumulator.y,param3 / 2);
            param2.island.columnAccumulator.x = Math.max(param2.island.columnAccumulator.x,param3 / 2);
         }
      }
      
      public static function DestroyTile(param1:PhysIsland, param2:int, param3:int) : Array
      {
         var _loc5_:PhysIsland = null;
         if(param2 < 0 || param2 >= param1.tilesWidth)
         {
            return [param1];
         }
         if(param3 < 0 || param3 >= param1.tilesHeight)
         {
            return [param1];
         }
         if(param1.tileGrid[param3][param2] == null)
         {
            return [param1];
         }
         if(param1.tilesWidth == 1 && param1.tilesHeight == 1)
         {
            return null;
         }
         param1.tileGrid[param3][param2] = null;
         var _loc4_:Array;
         if((_loc4_ = IslandSimulator.ConstructIslands(param1.tileGrid)) == null || _loc4_.length < 1)
         {
            return null;
         }
         for each(_loc5_ in _loc4_)
         {
            _loc5_.globalAnchor.AddV(param1.globalAnchor);
            _loc5_.tileOriginalLocation.AddV(param1.tileOriginalLocation);
         }
         return _loc4_;
      }
   }
}

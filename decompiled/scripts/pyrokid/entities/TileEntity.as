package pyrokid.entities
{
   import flash.display.Bitmap;
   import flash.display.DisplayObject;
   import flash.display.Sprite;
   import flash.utils.Dictionary;
   import pyrokid.Connector;
   import pyrokid.Constants;
   import pyrokid.Embedded;
   import pyrokid.FireFilm;
   import pyrokid.Island;
   import pyrokid.Level;
   import pyrokid.graphics.ConnectedSpriteBuilder;
   import pyrokid.graphics.Filmstrip;
   import pyrokid.tools.HashSet;
   
   public class TileEntity extends GameEntity
   {
       
      
      public var cells:Array;
      
      private var edges:Dictionary;
      
      private var neighborCells:Array;
      
      public var islandAnchor:Vector2i;
      
      public var parentIsland:Island;
      
      public var fireSprites:Array;
      
      protected var objectCode:int;
      
      private var connectors:Dictionary;
      
      private var partnerConnectors:Array;
      
      public var visualCells:Array;
      
      public function TileEntity(param1:int, param2:int, param3:int)
      {
         super();
         this.objectCode = param3;
         this.x = param1;
         this.y = param2;
         this.cells = [];
         this.fireSprites = [];
         this.visualCells = [];
         this.connectors = new Dictionary();
         this.partnerConnectors = [];
      }
      
      private static function getEdgeOffset(param1:int, param2:int) : Vector2i
      {
         switch(param2)
         {
            case Constants.CONNECTOR_CODE:
               switch(param1)
               {
                  case Cardinal.NX:
                     return new Vector2i(0,Constants.CELL / 2);
                  case Cardinal.PX:
                     return new Vector2i(Constants.CELL,Constants.CELL / 2);
                  case Cardinal.NY:
                     return new Vector2i(Constants.CELL / 2,0);
                  case Cardinal.PY:
                     return new Vector2i(Constants.CELL / 2,Constants.CELL);
               }
               break;
            case Constants.METAL_EDGE_CODE:
               switch(param1)
               {
                  case Cardinal.NX:
                     return new Vector2i(0,Constants.CELL);
                  case Cardinal.PX:
                     return new Vector2i(Constants.CELL,0);
                  case Cardinal.NY:
                     return new Vector2i(0,0);
                  case Cardinal.PY:
                     return new Vector2i(Constants.CELL,Constants.CELL);
               }
         }
         return null;
      }
      
      private static function getEdgeRotation(param1:int, param2:int) : int
      {
         switch(param2)
         {
            case Constants.CONNECTOR_CODE:
               return param1 == Cardinal.NY || param1 == Cardinal.PY ? 90 : 0;
            case Constants.METAL_EDGE_CODE:
               switch(param1)
               {
                  case Cardinal.NX:
                     return 270;
                  case Cardinal.PX:
                     return 90;
                  case Cardinal.NY:
                     return 0;
                  case Cardinal.PY:
                     return 180;
               }
         }
         return 0;
      }
      
      public function coorsInGlobal() : Array
      {
         return this.getCoorsInGlobal(this.cells);
      }
      
      public function coorsInIsland() : Array
      {
         return this.getCoorsInIsland(this.cells);
      }
      
      private function neighborsInGlobal() : Array
      {
         return this.getCoorsInGlobal(this.neighborCells);
      }
      
      private function neighborsInIsland() : Array
      {
         return this.getCoorsInIsland(this.neighborCells);
      }
      
      private function getCoorsInGlobal(param1:Array) : Array
      {
         var globalA:Vector2 = null;
         var coors:Array = param1;
         globalA = this.getGlobalAnchor();
         return coors.map(function(param1:*):*
         {
            return param1.copyAsVec2().AddV(globalA);
         });
      }
      
      private function getCoorsInIsland(param1:Array) : Array
      {
         var coors:Array = param1;
         return coors.map(function(param1:*):*
         {
            return islandAnchor.copy().AddV(param1);
         });
      }
      
      public function getGlobalAnchor() : Vector2
      {
         return this.parentIsland.globalAnchor.copy().AddV(this.islandAnchor.copyAsVec2());
      }
      
      public function getGlobalAnchorAsVec2i() : Vector2i
      {
         return this.parentIsland.globalAnchor.copyAsVec2i().AddV(this.islandAnchor);
      }
      
      protected function getSpriteForCell(param1:Vector2i) : DisplayObject
      {
         return null;
      }
      
      private function isFlammable() : Boolean
      {
         return this.objectCode != Constants.METAL_TILE_CODE && this.objectCode != Constants.WALL_TILE_CODE;
      }
      
      public function addFireLocation(param1:Vector2i) : void
      {
         var _loc2_:DisplayObject = null;
         _loc2_ = new FireFilm();
         _loc2_.x = param1.x * Constants.CELL;
         _loc2_.y = param1.y * Constants.CELL;
         this.fireSprites.push(_loc2_);
      }
      
      public function finalizeCells(param1:Level, param2:Vector2i) : void
      {
         var _loc5_:Vector2i = null;
         var _loc6_:Bitmap = null;
         var _loc7_:Vector2i = null;
         var _loc3_:Bitmap = Constants.GET_TILE_SET(this.objectCode);
         if(_loc3_ != null)
         {
            _loc6_ = ConnectedSpriteBuilder.buildSpriteFromCoors(this.cells,param2,this.objectCode == Constants.WALL_TILE_CODE,_loc3_,param1.cellWidth,param1.cellHeight);
            addChild(_loc6_);
            if(!(this is NonFlammableTile))
            {
               for each(_loc5_ in this.cells)
               {
                  this.addFireLocation(_loc5_);
               }
            }
         }
         this.edges = new Dictionary();
         var _loc4_:HashSet = new HashSet();
         for each(_loc5_ in this.cells)
         {
            for each(_loc7_ in Utils.getNeighborCoors(_loc5_.x,_loc5_.y))
            {
               _loc4_.add(_loc7_);
            }
         }
         for each(_loc5_ in this.cells)
         {
            _loc4_.remove(_loc5_);
         }
         this.neighborCells = _loc4_.toArray();
      }
      
      public function removePartnerConnectors() : void
      {
         var partnerConn:Array = null;
         var oppositeEntity:TileEntity = null;
         var child:Sprite = null;
         for each(partnerConn in this.partnerConnectors)
         {
            oppositeEntity = partnerConn[0];
            child = partnerConn[1];
            oppositeEntity.removeChild(child);
            oppositeEntity.partnerConnectors.filter(function(param1:Array, param2:int, param3:Array):Boolean
            {
               return param1[0] != this;
            });
         }
      }
      
      public function clearConnectorDict() : void
      {
         this.connectors = null;
      }
      
      public function setUpPartnerConnectors() : void
      {
         var _loc1_:Array = null;
         var _loc2_:Vector2i = null;
         var _loc3_:int = 0;
         var _loc4_:Vector2i = null;
         var _loc5_:int = 0;
         var _loc6_:TileEntity = null;
         var _loc7_:String = null;
         var _loc8_:Array = null;
         var _loc9_:Sprite = null;
         for each(_loc1_ in this.connectors)
         {
            _loc2_ = _loc1_[0];
            _loc3_ = _loc1_[1];
            _loc4_ = Cardinal.getVector2i(_loc3_).AddV(_loc2_);
            _loc5_ = Cardinal.getOpposite(_loc3_);
            _loc6_ = Utils.index(this.parentIsland.tileEntityGrid,_loc4_.x,_loc4_.y);
            _loc7_ = Connector.coorAndDirToString(_loc4_,_loc5_);
            _loc9_ = (_loc8_ = _loc6_.connectors[_loc7_])[2];
            this.partnerConnectors.push([_loc6_,_loc9_]);
         }
      }
      
      public function addEdges(param1:Array, param2:Boolean = false) : void
      {
         var _loc3_:Vector2i = null;
         var _loc4_:Vector2i = null;
         var _loc5_:Array = null;
         var _loc6_:int = 0;
         for each(_loc3_ in this.cells)
         {
            _loc4_ = this.getGlobalAnchorAsVec2i().AddV(_loc3_);
            _loc5_ = Utils.getBooleansFromInt(param1[_loc4_.y][_loc4_.x]);
            if(!param2)
            {
               this.edges[_loc3_.toString()] = _loc5_;
            }
            _loc6_ = 0;
            while(_loc6_ < 4)
            {
               if(_loc5_[_loc6_])
               {
                  this.addEdge(_loc3_,_loc6_,param2);
               }
               _loc6_++;
            }
         }
      }
      
      private function addEdge(param1:Vector2i, param2:int, param3:Boolean) : void
      {
         var _loc4_:DisplayObject = null;
         var _loc5_:int = 0;
         var _loc7_:Vector2i = null;
         if(param3)
         {
            _loc4_ = new Filmstrip(new Embedded.ConnectorBMP(),17,17,0,0,0,1);
            _loc5_ = Constants.CONNECTOR_CODE;
            _loc7_ = param1.copy().AddV(this.islandAnchor);
            this.connectors[Connector.coorAndDirToString(_loc7_,param2)] = [_loc7_,param2,_loc4_];
         }
         else
         {
            _loc4_ = new Embedded.MetalEdgeBMP() as Bitmap;
            _loc5_ = Constants.METAL_EDGE_CODE;
         }
         _loc4_.rotation = getEdgeRotation(param2,_loc5_);
         var _loc6_:Vector2i = getEdgeOffset(param2,_loc5_);
         _loc4_.x = param1.x * Constants.CELL + _loc6_.x;
         _loc4_.y = param1.y * Constants.CELL + _loc6_.y;
         addChild(_loc4_);
      }
      
      public function spreadToNeighbors(param1:Level) : void
      {
         var _loc4_:Vector2i = null;
         var _loc5_:Array = null;
         var _loc6_:int = 0;
         var _loc7_:Vector2i = null;
         var _loc8_:Vector2i = null;
         var _loc9_:TileEntity = null;
         var _loc10_:Vector2i = null;
         var _loc2_:Array = !!isMoving() ? this.parentIsland.tileEntityGrid : param1.tileEntityGrid;
         var _loc3_:Vector2i = !!isMoving() ? this.islandAnchor.copy() : this.getGlobalAnchorAsVec2i();
         for each(_loc4_ in this.cells)
         {
            _loc5_ = this.edges[_loc4_.toString()];
            for each(_loc6_ in Cardinal.DIRECTIONS)
            {
               _loc7_ = Cardinal.getVector2i(_loc6_).AddV(_loc4_);
               if(!_loc5_[_loc6_] && this.cells.indexOf(_loc7_) == -1)
               {
                  _loc8_ = _loc7_.copy().AddV(_loc3_);
                  if((_loc9_ = Utils.index(_loc2_,_loc8_.x,_loc8_.y)) != null)
                  {
                     _loc10_ = !!isMoving() ? _loc9_.islandAnchor.copy() : _loc9_.getGlobalAnchorAsVec2i();
                     _loc8_.SubV(_loc10_);
                     _loc9_.ignite(param1,_loc8_,_loc6_);
                  }
               }
            }
         }
      }
      
      public function canIgniteFrom(param1:Vector2i, param2:int) : Boolean
      {
         return !this.edges[param1.toString()][param2];
      }
      
      override public function ignite(param1:Level, param2:Vector2i = null, param3:int = -1) : Boolean
      {
         if(isOnFire())
         {
            return false;
         }
         if(param2 == null || param3 == -1)
         {
            param1.onFire.push(this);
            return super.ignite(param1,param2,param3);
         }
         var _loc4_:Array;
         if((_loc4_ = this.edges[param2.toString()]) == null)
         {
            return false;
         }
         var _loc5_:Boolean;
         if(!(_loc5_ = _loc4_[Cardinal.getOpposite(param3)]))
         {
            param1.onFire.push(this);
            super.ignite(param1,param2,param3);
         }
         return !_loc5_;
      }
      
      override public function updateFire(param1:Level, param2:int) : void
      {
      }
   }
}

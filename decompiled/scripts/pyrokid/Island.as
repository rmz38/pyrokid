package pyrokid
{
   import physics.PhysIsland;
   import pyrokid.entities.TileEntity;
   
   public class Island
   {
       
      
      private var _velocity:Vector2;
      
      private var _globalAnchor:Vector2;
      
      public var tileEntityGrid:Array;
      
      public var entityList:Array;
      
      public var island:PhysIsland;
      
      public function Island(param1:PhysIsland)
      {
         super();
         this.island = param1;
         this.entityList = [];
         this.tileEntityGrid = Utils.newArrayOfSize(param1.tileGrid);
         this._velocity = param1.velocity.copy().MulD(Constants.CELL);
         this._globalAnchor = param1.globalAnchor.copy();
      }
      
      public function addEntity(param1:TileEntity, param2:Vector2) : void
      {
         var _loc3_:Vector2i = null;
         param1.parentIsland = this;
         param1.islandAnchor = param2.copy().SubV(this.globalAnchor).copyAsVec2i();
         for each(_loc3_ in param1.coorsInIsland())
         {
            if(Utils.inBounds(this.tileEntityGrid,_loc3_.x,_loc3_.y))
            {
            }
            this.tileEntityGrid[_loc3_.y][_loc3_.x] = param1;
         }
         this.entityList.push(param1);
      }
      
      public function get velocity() : Vector2
      {
         return this._velocity;
      }
      
      public function set velocity(param1:Vector2) : void
      {
         var _loc2_:TileEntity = null;
         this._velocity = param1;
         for each(_loc2_ in this.entityList)
         {
            _loc2_.velocity = this._velocity;
         }
      }
      
      public function isMoving() : Boolean
      {
         return this.velocity.x + this.velocity.y != 0;
      }
      
      public function get globalAnchor() : Vector2
      {
         return this._globalAnchor;
      }
      
      public function getAnchorAsInt() : Vector2i
      {
         return new Vector2i(Math.round(this.globalAnchor.x),Math.round(this.globalAnchor.y));
      }
      
      public function set globalAnchor(param1:Vector2) : void
      {
         var _loc2_:TileEntity = null;
         this._globalAnchor = param1;
         for each(_loc2_ in this.entityList)
         {
            _loc2_.x = (param1.x + _loc2_.islandAnchor.x) * Constants.CELL;
            _loc2_.y = (param1.y + _loc2_.islandAnchor.y) * Constants.CELL;
         }
      }
   }
}

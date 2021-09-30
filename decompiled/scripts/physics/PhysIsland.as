package physics
{
   public class PhysIsland
   {
       
      
      public var tileOriginalLocation:Vector2i;
      
      public var globalAnchor:Vector2;
      
      public var velocity:Vector2;
      
      public var motion:Vector2;
      
      public var tilesWidth:int;
      
      public var tilesHeight:int;
      
      public var tileGrid:Array;
      
      public var boundingRect:PRect;
      
      public var columnAccumulator:Vector2;
      
      public var isGrounded:Boolean = false;
      
      public function PhysIsland(param1:int, param2:int)
      {
         var _loc3_:int = 0;
         this.tileOriginalLocation = new Vector2i();
         this.globalAnchor = new Vector2();
         this.velocity = new Vector2();
         this.motion = new Vector2();
         this.boundingRect = new PRect();
         this.columnAccumulator = new Vector2();
         super();
         this.tilesWidth = param1;
         this.tilesHeight = param2;
         this.boundingRect.halfSize.Set(param1,param2).MulD(0.5);
         this.tileGrid = new Array(this.tilesHeight);
         while(_loc3_ < this.tileGrid.length)
         {
            this.tileGrid[_loc3_] = new Array(this.tilesWidth);
            _loc3_++;
         }
      }
      
      public function set x(param1:Number) : void
      {
         this.globalAnchor.x = param1;
         this.boundingRect.center.x = this.globalAnchor.x + this.boundingRect.halfSize.x;
      }
      
      public function set y(param1:Number) : void
      {
         this.globalAnchor.y = param1;
         this.boundingRect.center.y = this.globalAnchor.y + this.boundingRect.halfSize.y;
      }
      
      public function set position(param1:Vector2) : void
      {
         this.x = param1.x;
         this.y = param1.y;
      }
      
      public function AddTile(param1:int, param2:int, param3:IPhysTile) : void
      {
         if(param3 == null)
         {
            return;
         }
         this.tileGrid[param2][param1] = param3;
         this.isGrounded = this.isGrounded || param3.IsGrounded;
      }
      
      public function getBoundingRect() : PRect
      {
         var _loc1_:PRect = new PRect();
         _loc1_.halfSize.Set(this.tilesWidth,this.tilesHeight).MulD(0.5);
         _loc1_.center.SetV(this.globalAnchor).AddV(_loc1_.halfSize);
         return _loc1_;
      }
      
      public function resetBoundingRect() : void
      {
         this.boundingRect.center.SetV(this.globalAnchor).AddV(this.boundingRect.halfSize);
      }
   }
}

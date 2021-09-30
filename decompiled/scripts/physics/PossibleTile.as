package physics
{
   class PossibleTile
   {
       
      
      public var rect:PRect;
      
      public var island:PhysIsland;
      
      public var tx:int;
      
      public var ty:int;
      
      public var collideNX:Boolean = true;
      
      public var collidePX:Boolean = true;
      
      public var collideNY:Boolean = true;
      
      public var collidePY:Boolean = true;
      
      function PossibleTile(param1:PhysIsland, param2:int, param3:int)
      {
         this.rect = new PRect();
         super();
         this.island = param1;
         this.tx = param2;
         this.ty = param3;
         this.rect.center.SetV(this.island.globalAnchor).Add(this.tx + 0.5,this.ty + 0.5);
         this.rect.halfSize.Set(0.5,0.5);
         if(this.ty > 0 && param1.tileGrid[this.ty - 1][this.tx] != null)
         {
            this.collideNY = false;
         }
         if(this.ty < param1.tilesHeight - 1 && param1.tileGrid[this.ty + 1][this.tx] != null)
         {
            this.collidePY = false;
         }
         if(this.tx > 0 && param1.tileGrid[this.ty][this.tx - 1] != null)
         {
            this.collideNX = false;
         }
         if(this.tx < param1.tilesWidth - 1 && param1.tileGrid[this.ty][this.tx + 1] != null)
         {
            this.collidePX = false;
         }
      }
   }
}

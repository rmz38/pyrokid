package physics
{
   public class CollisionColumn
   {
       
      
      public var island:PhysIsland;
      
      public var pyEdge:PhysEdge = null;
      
      public var nyEdge:PhysEdge = null;
      
      public function CollisionColumn(param1:PhysIsland)
      {
         super();
         this.island = param1;
      }
   }
}

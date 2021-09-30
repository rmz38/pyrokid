package physics
{
   import pyrokid.Constants;
   import pyrokid.Island;
   
   public class ViewPIsland
   {
       
      
      public var sprite:Island;
      
      public var phys:PhysIsland;
      
      public function ViewPIsland(param1:Island, param2:PhysIsland)
      {
         super();
         this.sprite = param1;
         this.phys = param2;
      }
      
      public static function updatePhysics(param1:Array, param2:Array, param3:Vector2) : *
      {
         IslandSimulator.Simulate(param1,param2,param3,Constants.DT);
      }
      
      public function onUpdate() : void
      {
         this.sprite.velocity = this.phys.velocity.copy().MulD(Constants.CELL);
         this.sprite.globalAnchor = this.phys.globalAnchor.copy();
      }
   }
}

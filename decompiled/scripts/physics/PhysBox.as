package physics
{
   public class PhysBox implements IPhysTile
   {
      
      private static var edges:Array = [new PhysEdge(Cardinal.NX,0,0.5,1),new PhysEdge(Cardinal.PX,1,0.5,1),new PhysEdge(Cardinal.NY,0.5,0,1),new PhysEdge(Cardinal.PY,0.5,1,1)];
       
      
      public var id:int;
      
      public var fallingType:Boolean;
      
      private var connectorBools:Array;
      
      public function PhysBox(param1:Array, param2:Boolean = false)
      {
         super();
         this.fallingType = param2;
         this.connectorBools = param1;
      }
      
      public function ProvideEdgesSpecial(param1:Array, param2:Vector2) : void
      {
      }
      
      public function ProvideEdgesDirection(param1:int, param2:Array, param3:Vector2) : void
      {
         var _loc4_:int = 0;
         switch(param1)
         {
            case Cardinal.NX:
               _loc4_ = 0;
               break;
            case Cardinal.PX:
               _loc4_ = 1;
               break;
            case Cardinal.NY:
               _loc4_ = 2;
               break;
            case Cardinal.PY:
               _loc4_ = 3;
         }
         var _loc5_:PhysEdge;
         (_loc5_ = new PhysEdge(edges[_loc4_].direction,edges[_loc4_].center.x,edges[_loc4_].center.y,edges[_loc4_].halfSize * 2)).center.AddV(param3);
         param2.push(_loc5_);
      }
      
      public function get IsGrounded() : Boolean
      {
         return !this.fallingType;
      }
      
      public function CanBind(param1:int, param2:IPhysTile) : Boolean
      {
         if(param2 is PhysBox)
         {
            return this.connectorBools[param1];
         }
         return false;
      }
   }
}

package physics
{
   public class PhysEdge
   {
       
      
      public var center:Vector2;
      
      public var halfSize:Number;
      
      public var direction:int;
      
      public function PhysEdge(param1:int, param2:Number, param3:Number, param4:Number)
      {
         super();
         this.direction = param1;
         this.center = new Vector2(param2,param3);
         this.halfSize = param4 / 2;
      }
      
      public function Clone(param1:Vector2) : PhysEdge
      {
         return new PhysEdge(this.direction,this.center.x + param1.x,this.center.y + param1.y,this.halfSize * 2);
      }
   }
}

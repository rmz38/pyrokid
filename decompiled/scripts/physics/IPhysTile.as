package physics
{
   public interface IPhysTile
   {
       
      
      function ProvideEdgesSpecial(param1:Array, param2:Vector2) : void;
      
      function ProvideEdgesDirection(param1:int, param2:Array, param3:Vector2) : void;
      
      function get IsGrounded() : Boolean;
      
      function CanBind(param1:int, param2:IPhysTile) : Boolean;
   }
}

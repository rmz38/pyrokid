package
{
   public class Vector2i
   {
       
      
      public var x:int;
      
      public var y:int;
      
      public function Vector2i(param1:int = 0, param2:int = 0)
      {
         super();
         this.x = param1;
         this.y = param2;
      }
      
      public function copy() : Vector2i
      {
         return new Vector2i(this.x,this.y);
      }
      
      public function copyAsVec2() : Vector2
      {
         return new Vector2(this.x,this.y);
      }
      
      public function Set(param1:int, param2:int) : Vector2i
      {
         this.x = param1;
         this.y = param2;
         return this;
      }
      
      public function SetV(param1:Vector2i) : Vector2i
      {
         return this.Set(param1.x,param1.y);
      }
      
      public function Add(param1:int, param2:int) : Vector2i
      {
         this.x += param1;
         this.y += param2;
         return this;
      }
      
      public function AddD(param1:int) : Vector2i
      {
         return this.Add(param1,param1);
      }
      
      public function AddV(param1:Vector2i) : Vector2i
      {
         return this.Add(param1.x,param1.y);
      }
      
      public function Sub(param1:int, param2:int) : Vector2i
      {
         this.x -= param1;
         this.y -= param2;
         return this;
      }
      
      public function SubD(param1:int) : Vector2i
      {
         return this.Sub(param1,param1);
      }
      
      public function SubV(param1:Vector2i) : Vector2i
      {
         return this.Sub(param1.x,param1.y);
      }
      
      public function Mul(param1:int, param2:int) : Vector2i
      {
         this.x *= param1;
         this.y *= param2;
         return this;
      }
      
      public function MulD(param1:int) : Vector2i
      {
         return this.Mul(param1,param1);
      }
      
      public function MulV(param1:Vector2i) : Vector2i
      {
         return this.Mul(param1.x,param1.y);
      }
      
      public function Div(param1:int, param2:int) : Vector2i
      {
         this.x /= param1;
         this.y /= param2;
         return this;
      }
      
      public function DivD(param1:int) : Vector2i
      {
         return this.MulD(1 / param1);
      }
      
      public function DivV(param1:Vector2i) : Vector2i
      {
         return this.Div(param1.x,param1.y);
      }
      
      public function toString() : String
      {
         return this.x.toString() + " " + this.y.toString();
      }
   }
}

package
{
   public class Vector2
   {
       
      
      public var x:Number;
      
      public var y:Number;
      
      public function Vector2(param1:Number = 0, param2:Number = 0)
      {
         super();
         this.x = param1;
         this.y = param2;
      }
      
      public function copy() : Vector2
      {
         return new Vector2(this.x,this.y);
      }
      
      public function round() : void
      {
         this.x = Math.round(this.x);
         this.y = Math.round(this.y);
      }
      
      public function floor() : Vector2i
      {
         return new Vector2i(Math.floor(this.x),Math.floor(this.y));
      }
      
      public function copyAsVec2i() : Vector2i
      {
         return new Vector2i(Math.round(this.x),Math.round(this.y));
      }
      
      public function Set(param1:Number, param2:Number) : Vector2
      {
         this.x = param1;
         this.y = param2;
         return this;
      }
      
      public function SetV(param1:Vector2) : Vector2
      {
         return this.Set(param1.x,param1.y);
      }
      
      public function Add(param1:Number, param2:Number) : Vector2
      {
         this.x += param1;
         this.y += param2;
         return this;
      }
      
      public function AddD(param1:Number) : Vector2
      {
         return this.Add(param1,param1);
      }
      
      public function AddV(param1:Vector2) : Vector2
      {
         return this.Add(param1.x,param1.y);
      }
      
      public function Sub(param1:Number, param2:Number) : Vector2
      {
         this.x -= param1;
         this.y -= param2;
         return this;
      }
      
      public function SubD(param1:Number) : Vector2
      {
         return this.Sub(param1,param1);
      }
      
      public function SubV(param1:Vector2) : Vector2
      {
         return this.Sub(param1.x,param1.y);
      }
      
      public function Mul(param1:Number, param2:Number) : Vector2
      {
         this.x *= param1;
         this.y *= param2;
         return this;
      }
      
      public function MulD(param1:Number) : Vector2
      {
         return this.Mul(param1,param1);
      }
      
      public function MulV(param1:Vector2) : Vector2
      {
         return this.Mul(param1.x,param1.y);
      }
      
      public function Div(param1:Number, param2:Number) : Vector2
      {
         this.x /= param1;
         this.y /= param2;
         return this;
      }
      
      public function DivD(param1:Number) : Vector2
      {
         return this.MulD(1 / param1);
      }
      
      public function DivV(param1:Vector2) : Vector2
      {
         return this.Div(param1.x,param1.y);
      }
      
      public function get lengthSq() : Number
      {
         return this.x * this.x + this.y * this.y;
      }
      
      public function get length() : Number
      {
         return Math.sqrt(this.lengthSq);
      }
      
      public function toString() : String
      {
         return this.x.toString() + " " + this.y.toString();
      }
   }
}

package pyrokid
{
   import flash.display.Sprite;
   
   public class Spotlight extends Sprite
   {
       
      
      private var big:Number = 15;
      
      private var small:Number = 1;
      
      public var shrink:Boolean = false;
      
      public function Spotlight()
      {
         super();
         this.addChild(new Embedded.SpotlightSWF());
      }
      
      public function step() : void
      {
         var _loc1_:Number = !!this.shrink ? Number(this.small) : Number(this.big);
         this.scaleX += (_loc1_ - this.scaleX) / 5;
         this.scaleY = this.scaleX;
         this.visible = this.scaleX < this.big - 1;
      }
   }
}

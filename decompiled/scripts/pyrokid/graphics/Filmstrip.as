package pyrokid.graphics
{
   import flash.display.Bitmap;
   import flash.display.BitmapData;
   import flash.display.Sprite;
   import flash.events.Event;
   import flash.geom.Matrix;
   import flash.geom.Rectangle;
   
   public class Filmstrip extends Sprite
   {
      
      public static var allStrips:Array = [];
       
      
      private var crop:Rectangle;
      
      private var frameNumber:int;
      
      private var image:Bitmap;
      
      private var originX:int;
      
      private var originY:int;
      
      private var imageHeight:int;
      
      private var imageWidth:int;
      
      private var imagesInRow:int;
      
      private var numberOfImages:int;
      
      private var drawnObject:Bitmap;
      
      public function Filmstrip(param1:Bitmap, param2:int, param3:int, param4:int, param5:int, param6:int, param7:int)
      {
         super();
         this.crop = new Rectangle(0,0,param4,param5);
         if(param7 > 1)
         {
            this.frameNumber = 0;
            this.image = param1;
            this.originX = param2;
            this.originY = param3;
            this.imageWidth = param4;
            this.imageHeight = param5;
            this.imagesInRow = param6;
            this.numberOfImages = param7;
            this.drawnObject = new Bitmap();
            this.drawnObject.x = -param2;
            this.drawnObject.y = -param3;
            this.drawnObject.bitmapData = new BitmapData(param4,param5);
            addChild(this.drawnObject);
            this.render();
            addEventListener(Event.ADDED_TO_STAGE,this.attach);
            addEventListener(Event.REMOVED_FROM_STAGE,this.detach);
         }
         else
         {
            addChild(param1);
            param1.x = -param2;
            param1.y = -param3;
         }
      }
      
      public static function update() : *
      {
         var _loc1_:* = 0;
         while(_loc1_ < allStrips.length)
         {
            allStrips[_loc1_].nextFrame();
            _loc1_++;
         }
      }
      
      public function nextFrame() : *
      {
         this.frameNumber = (this.frameNumber + 1) % this.numberOfImages;
         this.render();
      }
      
      private function render() : *
      {
         var _loc1_:Matrix = new Matrix();
         var _loc2_:* = -(this.frameNumber % this.imagesInRow) * this.imageWidth;
         var _loc3_:* = -Math.floor(this.frameNumber / this.imagesInRow) * this.imageHeight;
         _loc1_.translate(_loc2_,_loc3_);
         this.drawnObject.bitmapData.fillRect(new Rectangle(0,0,this.imageWidth,this.imageHeight),16777215);
         this.drawnObject.bitmapData.draw(this.image,_loc1_,null,null,this.crop);
      }
      
      private function attach(param1:*) : *
      {
         allStrips.push(this);
      }
      
      private function detach(param1:*) : *
      {
         allStrips.splice(allStrips.indexOf(this),1);
      }
   }
}

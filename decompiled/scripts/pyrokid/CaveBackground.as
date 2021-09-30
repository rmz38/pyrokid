package pyrokid
{
   import flash.display.Bitmap;
   import flash.display.Sprite;
   import ui.LevelsInfo;
   
   public class CaveBackground extends Sprite
   {
       
      
      private var isRock:Boolean = false;
      
      private var menu:Boolean;
      
      public function CaveBackground(param1:int, param2:int, param3:Boolean = false)
      {
         var _loc9_:* = undefined;
         super();
         var _loc4_:int = LevelsInfo.currLevel;
         this.menu = param3;
         var _loc5_:* = param1 * Constants.CELL + 640;
         var _loc6_:* = param2 * Constants.CELL + 480;
         var _loc7_:Bitmap;
         var _loc8_:* = -(_loc7_ = this.getBackgroundBitmap(_loc4_)).width;
         while(_loc8_ < _loc5_)
         {
            if(this.isRock)
            {
               _loc9_ = -_loc7_.height;
               while(_loc9_ < _loc6_)
               {
                  (_loc7_ = this.getBackgroundBitmap(_loc4_)).x = _loc8_;
                  _loc7_.y = _loc9_;
                  addChild(_loc7_);
                  _loc9_ += _loc7_.height;
               }
            }
            else
            {
               (_loc7_ = this.getBackgroundBitmap(_loc4_)).x = _loc8_;
               addChild(_loc7_);
            }
            _loc8_ += _loc7_.width;
         }
      }
      
      private function getBackgroundBitmap(param1:int) : Bitmap
      {
         var _loc2_:Bitmap = null;
         var _loc3_:Number = 1.05;
         if(this.menu)
         {
            _loc2_ = new Embedded.RockBMP() as Bitmap;
            _loc2_.scaleX = _loc2_.scaleY = 0.5;
            this.isRock = true;
         }
         else if(param1 == 1)
         {
            _loc2_ = new Embedded.TutorialBackground1() as Bitmap;
            _loc2_.scaleY = _loc3_;
         }
         else if(param1 == 2)
         {
            _loc2_ = new Embedded.TutorialBackground2() as Bitmap;
            _loc2_.scaleY = _loc3_;
         }
         else if(param1 == 3 || param1 == 4)
         {
            _loc2_ = new Embedded.TutorialBackground3() as Bitmap;
            _loc2_.scaleY = _loc3_;
         }
         else
         {
            _loc2_ = new Embedded.RockBMP() as Bitmap;
            _loc2_.scaleX = _loc2_.scaleY = 0.5;
            this.isRock = true;
         }
         return _loc2_;
      }
   }
}

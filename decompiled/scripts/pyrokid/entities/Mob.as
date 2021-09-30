package pyrokid.entities
{
   import flash.display.MovieClip;
   import pyrokid.Embedded;
   import pyrokid.Level;
   
   public class Mob extends BackAndForthEnemy
   {
       
      
      public function Mob(param1:Level)
      {
         var _loc2_:MovieClip = null;
         _loc2_ = new Embedded.Mob() as MovieClip;
         _loc2_.gotoAndStop(Math.ceil(Math.random() * 3));
         _loc2_.y = -5;
         _loc2_.x = 20;
         super(param1,_loc2_,1,48,40,12,8,32,29);
         var _loc3_:int = 0;
         while(_loc3_ < 1)
         {
            _loc2_ = new Embedded.Mob() as MovieClip;
            _loc2_.y = -5;
            _loc2_.scaleX = _loc2_.scaleY = 1 + Math.random() / 6;
            _loc2_.gotoAndStop(Math.ceil(Math.random() * 3));
            if(_loc3_ == 0)
            {
               _loc2_.x = -20;
            }
            else
            {
               _loc2_.x = 10;
            }
            addChild(_loc2_);
            _loc3_++;
         }
      }
      
      override public function ignite(param1:Level, param2:Vector2i = null, param3:int = -1) : Boolean
      {
         return false;
      }
   }
}

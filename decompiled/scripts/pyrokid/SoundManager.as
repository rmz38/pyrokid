package pyrokid
{
   import flash.media.Sound;
   import flash.utils.Dictionary;
   
   public class SoundManager
   {
      
      private static var MAX_OVERLAP:int = 2;
      
      public static var currentlyStarted:Dictionary = new Dictionary();
       
      
      public function SoundManager()
      {
         super();
      }
      
      public static function endFrame() : *
      {
         var _loc1_:* = null;
         for(_loc1_ in currentlyStarted)
         {
            currentlyStarted[_loc1_] = 0;
         }
      }
      
      public static function playSound(param1:Sound) : *
      {
         if(GameSettings.soundOn)
         {
            if(getCount(param1) < MAX_OVERLAP)
            {
               param1.play();
               increment(param1);
            }
         }
      }
      
      private static function increment(param1:Object) : *
      {
         if(currentlyStarted[param1] == undefined)
         {
            currentlyStarted[param1] = 1;
         }
         else
         {
            currentlyStarted[param1] += 1;
         }
      }
      
      private static function getCount(param1:Object) : *
      {
         if(currentlyStarted[param1] == undefined)
         {
            return 0;
         }
         return currentlyStarted[param1];
      }
   }
}

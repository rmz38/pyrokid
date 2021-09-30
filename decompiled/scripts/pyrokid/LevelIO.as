package pyrokid
{
   import flash.events.Event;
   import flash.net.FileFilter;
   import flash.net.FileReference;
   import flash.utils.ByteArray;
   
   public class LevelIO
   {
      
      private static var loadLevelCallback:Function;
      
      private static var fileRef:FileReference;
       
      
      public function LevelIO()
      {
         super();
      }
      
      public static function loadLevel(param1:Function, param2:ByteArray = null) : void
      {
         var _loc3_:FileFilter = null;
         loadLevelCallback = param1;
         if(param2 == null)
         {
            fileRef = new FileReference();
            fileRef.addEventListener(Event.SELECT,onFileSelected);
            _loc3_ = new FileFilter("Text Files","*.txt");
            fileRef.browse([_loc3_]);
         }
         else
         {
            loadLevelCallback(param2.readObject());
         }
      }
      
      public static function saveLevel(param1:Object) : void
      {
         var _loc2_:ByteArray = new ByteArray();
         _loc2_.writeObject(param1);
         var _loc3_:FileReference = new FileReference();
         _loc3_.save(_loc2_);
      }
      
      private static function onFileSelected(param1:Event) : void
      {
         fileRef.addEventListener(Event.COMPLETE,onComplete);
         fileRef.load();
      }
      
      private static function onComplete(param1:Event) : void
      {
         var _loc2_:* = fileRef.data.readObject();
         fileRef.removeEventListener(Event.SELECT,onFileSelected);
         loadLevelCallback(_loc2_);
      }
   }
}

package pyrokid
{
   import flash.utils.ByteArray;
   import mx.core.MovieClipLoaderAsset;
   
   public class Embedded_MainMenuSWF extends MovieClipLoaderAsset
   {
      
      private static var bytes:ByteArray = null;
       
      
      public var dataClass:Class;
      
      public function Embedded_MainMenuSWF()
      {
         this.dataClass = Embedded_MainMenuSWF_dataClass;
         super();
         initialWidth = 16000 / 20;
         initialHeight = 12000 / 20;
      }
      
      override public function get movieClipData() : ByteArray
      {
         if(bytes == null)
         {
            bytes = ByteArray(new this.dataClass());
         }
         return bytes;
      }
   }
}

package
{
   import flash.display.Sprite;
   import org.flixel.system.FlxPreloader;
   
   public class Preloader extends FlxPreloader
   {
      
      private static var P_WIDTH:int = 300;
      
      private static var P_HEIGHT:int = 30;
       
      
      private var outline:Sprite;
      
      private var fill:Sprite;
      
      public function Preloader()
      {
         className = "Main";
         super();
      }
   }
}

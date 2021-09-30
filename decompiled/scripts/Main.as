package
{
   import flash.display.Sprite;
   import flash.display.Stage;
   import flash.events.Event;
   import net.hires.debug.Stats;
   import pyrokid.Constants;
   import pyrokid.Embedded;
   import pyrokid.tools.Key;
   import pyrokid.tools.LogMaster;
   import ui.playstates.StateController;
   
   public class Main extends Sprite
   {
      
      public static var MainStage:Stage;
      
      public static var log:LogMaster;
       
      
      private var curr_state:int;
      
      public function Main()
      {
         super();
         if(stage)
         {
            this.init();
         }
         else
         {
            addEventListener(Event.ADDED_TO_STAGE,this.init);
         }
      }
      
      private function init(param1:Event = null) : void
      {
         log = new LogMaster();
         MainStage = stage;
         Key.init(stage);
         Utils.loadSavedData();
         if(Constants.MUSIC_STARTS_ON)
         {
            Embedded.musicSound.play(0,999999);
         }
         addChild(StateController.display);
         StateController.goToMainMenu();
         if(Constants.DEBUG_DRAW)
         {
            addChild(new Stats());
         }
      }
   }
}

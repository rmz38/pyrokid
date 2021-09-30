package ui.playstates
{
   import flash.display.Sprite;
   import flash.events.Event;
   import pyrokid.Constants;
   import pyrokid.GameController;
   import ui.LevelsInfo;
   
   public class StateController extends Sprite
   {
      
      public static var display:Sprite = new Sprite();
      
      public static const allowLevelEditor:Boolean = true;
      
      private static var currGameController:GameController = null;
       
      
      public function StateController()
      {
         super();
         display = new Sprite();
         goToMainMenu();
      }
      
      public static function goToMainMenu(param1:Event = null) : *
      {
         Utils.removeAllChildren(display);
         if(currGameController != null)
         {
            currGameController.destroy();
            currGameController = null;
         }
         display.addChild(new MainMenu());
      }
      
      public static function goToLevelSelect(param1:Event = null, param2:int = 1) : *
      {
         Utils.removeAllChildren(display);
         if(currGameController != null)
         {
            currGameController.destroy();
            currGameController = null;
         }
         display.addChild(new LevelSelect(param2));
      }
      
      public static function goToLevelSelectAtPage(param1:int) : *
      {
         var pageNum:int = param1;
         return function():*
         {
            goToLevelSelect(null,pageNum);
         };
      }
      
      public static function goToLevelEditor() : void
      {
         LevelsInfo.currLevel = -1;
         goToGame();
         currGameController.toggleLevelEditor();
      }
      
      public static function goToGame() : void
      {
         var _loc1_:Object = LevelsInfo.getCurrLevelRecipe();
         Utils.removeAllChildren(display);
         if(currGameController != null)
         {
            currGameController.destroy();
            currGameController = null;
         }
         currGameController = new GameController(_loc1_);
         display.addChild(currGameController);
      }
      
      public static function restartCurrLevel(param1:Event = null) : void
      {
         StateController.goToGame();
      }
      
      public static function doOnLevelComplete(param1:int) : void
      {
         var _loc2_:String = null;
         if(LevelsInfo.currLevel == 1)
         {
            _loc2_ = !!Constants.IS_VERSION_A ? "A" : "B";
            Main.log.logEvent(3,"ABversion:" + _loc2_);
         }
         LevelsInfo.setCurrentLevelAsCompleted(param1);
         LevelSelect.startAndSetLevel(LevelsInfo.currLevel + 1)();
      }
      
      public static function goToCompletedLevel(param1:Event = null) : void
      {
         Utils.removeAllChildren(display);
         display.addChild(new CompletedLevel());
      }
      
      public static function goToOptions(param1:Event = null) : void
      {
         Utils.removeAllChildren(display);
         if(currGameController != null)
         {
            currGameController.destroy();
            currGameController = null;
         }
         displayOptions(false,Constants.WIDTH / 2,Constants.HEIGHT / 2);
      }
      
      public static function goToCredits(param1:Event = null) : void
      {
         Utils.removeAllChildren(display);
         if(currGameController != null)
         {
            currGameController.destroy();
            currGameController = null;
         }
         display.addChild(new Credits());
      }
      
      public static function displayHowToPlay(param1:Event = null) : void
      {
         display.addChild(new HowToPlayMenu());
      }
      
      public static function displayOptions(param1:Boolean = false, param2:int = 0, param3:int = 0) : void
      {
         display.addChild(new OptionsMenu(param1,param2,param3));
      }
      
      public static function removeOverlayedScreen(param1:BasePlayState) : void
      {
         param1.removeAllEventListeners();
         display.removeChild(param1);
      }
   }
}

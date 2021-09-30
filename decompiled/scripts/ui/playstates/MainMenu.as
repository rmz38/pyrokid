package ui.playstates
{
   import pyrokid.Constants;
   import pyrokid.Embedded;
   import ui.buttons.CoreButton;
   import ui.levelorderer.LevelOrderer;
   
   public class MainMenu extends BasePlayState
   {
       
      
      public function MainMenu()
      {
         super();
         addChild(new Embedded.MainMenuSWF());
         addCoreButton(CoreButton.create(140,29,StateController.goToLevelSelect,"Start Game").centerOn(600,350));
         addCoreButton(CoreButton.create(140,29,StateController.goToCredits,"Credits").centerOn(600,400));
         addCoreButton(CoreButton.create(140,29,StateController.goToOptions,"Options").centerOn(600,450));
         if(Constants.LEVEL_EDITOR_ENABLED)
         {
            addCoreButton(CoreButton.create(140,29,StateController.goToLevelEditor,"Level Editor").centerOn(600,500));
         }
         addCoreButton(CoreButton.create(140,29,this.hardCodedPoop,"Level Orderer").centerOn(600,550));
      }
      
      public function hardCodedPoop() : *
      {
         var _loc1_:LevelOrderer = new LevelOrderer();
         addChild(_loc1_);
      }
   }
}

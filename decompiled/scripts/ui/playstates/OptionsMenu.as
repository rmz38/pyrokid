package ui.playstates
{
   import flash.display.Sprite;
   import pyrokid.Embedded;
   import pyrokid.GameSettings;
   import ui.buttons.CoreButton;
   
   public class OptionsMenu extends BasePlayState
   {
      
      private static var buttonSpacing:int = 10;
      
      private static var mainButtonSpacing:int = 30;
      
      private static var smallButtonWidth:int = 60;
      
      private static var smallButtonHeight:int = 50;
       
      
      private var inPauseMenu:Boolean;
      
      public function OptionsMenu(param1:Boolean = false, param2:int = 0, param3:int = 0)
      {
         super(!param1);
         this.inPauseMenu = param1;
         var _loc4_:CoreButton = createCoreButton(60,50,GameSettings.toggleSound,new Embedded.SoundIcon() as Sprite,new Embedded.SoundMutedIcon() as Sprite);
         if(!GameSettings.soundOn)
         {
            _loc4_.toggle();
         }
         var _loc5_:CoreButton = createCoreButton(60,50,GameSettings.toggleMusic,new Embedded.MusicIcon() as Sprite,new Embedded.MusicMutedIcon() as Sprite).setCorner(smallButtonWidth + buttonSpacing,0);
         if(!GameSettings.musicOn)
         {
            _loc5_.toggle();
         }
         var _loc6_:CoreButton = createCoreButton(130,106,GameSettings.toggleControlScheme,new Embedded.ControlsDefaultIcon() as Sprite,new Embedded.ControlsInvertedIcon() as Sprite).setCorner(0,smallButtonHeight + buttonSpacing);
         if(GameSettings.controlSchemeInverted)
         {
            _loc6_.toggle();
         }
         if(!param1)
         {
            createReturnToMainMenuButton().centerOn(65,300);
         }
         this.x = !!param1 ? Number(param2) : Number(param2 - 65);
         this.y = !!param1 ? Number(param3) : Number(param3 - 65);
      }
   }
}

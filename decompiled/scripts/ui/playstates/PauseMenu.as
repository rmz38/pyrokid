package ui.playstates
{
   import flash.display.Bitmap;
   import flash.display.JointStyle;
   import flash.display.Sprite;
   import flash.events.Event;
   import flash.text.TextFormat;
   import flash.text.TextFormatAlign;
   import pyrokid.Constants;
   import pyrokid.GameController;
   import pyrokid.Level;
   import ui.LevelsInfo;
   
   public class PauseMenu extends BasePlayState
   {
       
      
      private var game_controller:GameController;
      
      public function PauseMenu(param1:GameController)
      {
         super(false);
         this.game_controller = param1;
         this.addMinimap(param1.level);
         var _loc2_:TextFormat = new TextFormat();
         _loc2_.size = 40;
         _loc2_.align = TextFormatAlign.CENTER;
         _loc2_.font = "Impact";
         _loc2_.color = 16777215;
         addTextToScreen("Paused",800,100,400,70,_loc2_);
         var _loc3_:int = 526;
         createButtonDefaultSize(this.unpauseGame,"Resume").centerOn(100,_loc3_);
         createButtonDefaultSize(StateController.restartCurrLevel,"Restart").centerOn(300,_loc3_);
         createButtonDefaultSize(StateController.goToLevelSelectAtPage(LevelSelect.levelToPageNum(LevelsInfo.currLevel)),"Levels").centerOn(500,_loc3_);
         createReturnToMainMenuButton().centerOn(700,_loc3_);
         addChild(new OptionsMenu(true,Constants.BUTTON_PADDING,Constants.BUTTON_PADDING));
      }
      
      private function addMinimap(param1:Level) : void
      {
         var _loc2_:Bitmap = null;
         var _loc5_:int = 0;
         var _loc6_:int = 0;
         _loc2_ = Utils.generateMinimap(param1);
         _loc2_.scaleY = _loc2_.scaleX = 0.2;
         _loc2_.x = (Constants.WIDTH - _loc2_.width) / 2;
         _loc2_.y = (Constants.HEIGHT - _loc2_.height) / 2 - 20;
         addChild(_loc2_);
         var _loc3_:Sprite = new Sprite();
         var _loc4_:int = 0;
         while(_loc4_ < 70)
         {
            _loc5_ = 5;
            _loc3_.graphics.lineStyle(_loc5_,0,Math.min(1,0.75 + _loc4_ * 0.003),false,"normal",null,JointStyle.MITER);
            _loc6_ = _loc5_ / 2 + _loc5_ * _loc4_;
            _loc3_.graphics.drawRect(_loc2_.x - _loc6_,_loc2_.y - _loc6_,_loc2_.width + 2 * _loc6_,_loc2_.height + 2 * _loc6_);
            _loc4_++;
         }
         addChild(_loc3_);
      }
      
      private function unpauseGame(param1:Event = null) : void
      {
         removeAllEventListeners();
         Utils.removeAllChildren(this);
         this.game_controller.removeChild(this);
         this.game_controller.isPaused = false;
      }
      
      private function goToPreviousScreen(param1:Event = null) : Function
      {
         var self:BasePlayState = null;
         var e:Event = param1;
         self = this;
         return function():void
         {
            StateController.removeOverlayedScreen(self);
         };
      }
   }
}

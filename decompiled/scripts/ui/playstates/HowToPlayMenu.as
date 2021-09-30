package ui.playstates
{
   import flash.events.Event;
   import ui.LevelEditorButton;
   
   public class HowToPlayMenu extends BasePlayState
   {
       
      
      public function HowToPlayMenu()
      {
         super();
         addChild(new LevelEditorButton(this.goToPreviousScreen(),80,40,0,0,["Return"],[LevelEditorButton.upColor]));
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

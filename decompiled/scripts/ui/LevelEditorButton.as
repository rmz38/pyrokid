package ui
{
   import flash.display.SimpleButton;
   import flash.events.MouseEvent;
   
   public class LevelEditorButton extends SimpleButton
   {
      
      public static var upColor:uint = 52479;
      
      public static var overColor:uint = 13434624;
      
      public static var downColor:uint = 16763904;
       
      
      private var texts:Array;
      
      private var colors:Array;
      
      private var toggleState:int;
      
      protected var w:int;
      
      protected var h:int;
      
      private var isToggle:Boolean;
      
      public function LevelEditorButton(param1:Function, param2:int, param3:int, param4:int, param5:int, param6:Array, param7:Array)
      {
         super();
         this.x = param4;
         this.y = param5;
         this.w = param2;
         this.h = param3;
         this.texts = param6;
         this.colors = param7;
         this.toggleState = 0;
         this.isToggle = param6.length > 1;
         this.setBackgroundStates();
         hitTestState = upState;
         useHandCursor = true;
         this.setOnClick(param1);
      }
      
      public function reset() : void
      {
         this.toggleState = 0;
         this.setBackgroundStates();
      }
      
      public function toggle() : void
      {
         this.toggleState = (this.toggleState + 1) % this.texts.length;
         this.setBackgroundStates();
      }
      
      public function setOnClick(param1:Function) : void
      {
         var onClick:Function = param1;
         if(onClick == null)
         {
            return;
         }
         if(this.isToggle)
         {
            addEventListener(MouseEvent.CLICK,function():void
            {
               toggle();
               onClick();
            });
         }
         else
         {
            addEventListener(MouseEvent.CLICK,onClick);
         }
      }
      
      protected function setBackgroundStates() : void
      {
         upState = new ButtonBackground(this.colors[this.toggleState],this.w,this.h,this.texts[this.toggleState]);
         downState = new ButtonBackground(downColor,this.w,this.h,this.texts[this.toggleState]);
         overState = new ButtonBackground(overColor,this.w,this.h,this.texts[this.toggleState]);
      }
   }
}

package ui
{
   import flash.display.Sprite;
   import flash.events.FocusEvent;
   import flash.events.MouseEvent;
   import flash.text.TextField;
   import flash.text.TextFieldType;
   import flash.text.TextFormat;
   
   public class LevelEditorInput extends Sprite
   {
       
      
      private var input:TextField;
      
      private var onUpdate:Function;
      
      private var storedValue:int;
      
      private var poop:int;
      
      public function LevelEditorInput(param1:String, param2:int, param3:int, param4:int, param5:Function)
      {
         super();
         this.input = new TextField();
         this.onUpdate = param5;
         this.storedValue = int(param2);
         var _loc6_:TextFormat;
         (_loc6_ = new TextFormat()).size = 20;
         this.input.defaultTextFormat = _loc6_;
         this.input.border = true;
         this.input.background = true;
         this.input.width = 50;
         this.input.height = 25;
         this.input.type = TextFieldType.INPUT;
         this.input.maxChars = 3;
         this.input.restrict = "0-9";
         this.input.text = String(param2);
         var _loc7_:LevelEditorButton = new LevelEditorButton(this.updateOnValue,70,25,50,0,[param1],[LevelEditorButton.upColor]);
         addChild(this.input);
         addChild(_loc7_);
         this.x = param3;
         this.y = param4;
      }
      
      public function changeText(param1:String) : void
      {
         this.input.text = param1;
      }
      
      private function updateOnValue(param1:MouseEvent) : void
      {
         this.onUpdate(this.input.text);
      }
      
      private function enterFocus(param1:FocusEvent) : void
      {
      }
      
      private function exitFocus(param1:FocusEvent) : void
      {
      }
   }
}

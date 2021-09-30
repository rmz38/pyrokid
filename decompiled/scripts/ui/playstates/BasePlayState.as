package ui.playstates
{
   import flash.display.Shape;
   import flash.display.SimpleButton;
   import flash.display.Sprite;
   import flash.events.MouseEvent;
   import flash.text.TextField;
   import flash.text.TextFormat;
   import flash.text.TextFormatAlign;
   import flash.utils.Dictionary;
   import ui.buttons.CoreButton;
   
   public class BasePlayState extends Sprite
   {
       
      
      protected var listenersArray:Array;
      
      protected var buttonListenersDict:Dictionary;
      
      protected var background:Shape;
      
      private var buttons:Array;
      
      public function BasePlayState(param1:Boolean = true)
      {
         this.listenersArray = [];
         this.buttonListenersDict = new Dictionary();
         super();
         if(param1)
         {
            this.addBackground(0);
         }
         this.buttons = [];
      }
      
      public function destroy() : void
      {
         var _loc1_:CoreButton = null;
         for each(_loc1_ in this.buttons)
         {
            _loc1_.removeListeners();
         }
         this.buttons = null;
         Utils.removeAllChildren(this);
      }
      
      public function addCoreButton(param1:CoreButton) : CoreButton
      {
         addChild(param1);
         this.buttons.push(param1);
         return param1;
      }
      
      public function createReturnToMainMenuButton() : CoreButton
      {
         return this.createButtonDefaultSize(StateController.goToMainMenu,"Main Menu");
      }
      
      public function createButtonDefaultSize(param1:Function, ... rest) : CoreButton
      {
         return this.addCoreButton(CoreButton.createDefaultSize.apply(null,[param1].concat(rest)));
      }
      
      public function createCoreButton(param1:int, param2:int, param3:Function, ... rest) : CoreButton
      {
         return this.addCoreButton(CoreButton.create.apply(null,[param1,param2,param3].concat(rest)));
      }
      
      protected function addBackground(param1:uint, param2:Number = 1.0) : void
      {
         this.background = new Shape();
         this.background.graphics.beginFill(param1,param2);
         this.background.graphics.drawRect(0,0,Main.MainStage.stageWidth,Main.MainStage.stageHeight);
         this.background.graphics.endFill();
         addChild(this.background);
      }
      
      override public function addEventListener(param1:String, param2:Function, param3:Boolean = false, param4:int = 0, param5:Boolean = false) : void
      {
         super.addEventListener(param1,param2,param3,param4,param5);
         this.listenersArray.push({
            "type":param1,
            "listener":param2
         });
      }
      
      public function removeAllEventListeners() : void
      {
         var _loc2_:* = undefined;
         var _loc3_:CoreButton = null;
         var _loc1_:Number = 0;
         while(_loc1_ < this.listenersArray.length)
         {
            if(this.hasEventListener(this.listenersArray[_loc1_].type))
            {
               this.removeEventListener(this.listenersArray[_loc1_].type,this.listenersArray[_loc1_].listener);
            }
            _loc1_++;
         }
         for(_loc2_ in this.buttonListenersDict)
         {
            if(this.buttonListenersDict[_loc2_] != undefined && _loc2_.hasEventListener(this.buttonListenersDict[_loc2_].type))
            {
               _loc2_.removeEventListener(this.buttonListenersDict[_loc2_].type,this.buttonListenersDict[_loc2_].listener);
            }
         }
         for each(_loc3_ in this.buttons)
         {
            _loc3_.removeListeners();
         }
         this.buttons = null;
         this.listenersArray = null;
      }
      
      public function addTextToScreen(param1:String, param2:int, param3:int, param4:int, param5:int, param6:TextFormat = null) : void
      {
         var _loc7_:TextField;
         (_loc7_ = new TextField()).width = param2;
         _loc7_.height = param3;
         _loc7_.text = String(param1);
         _loc7_.y = param5 - param3 / 2;
         _loc7_.x = param4 - param2 / 2;
         if(param6 == null)
         {
            (param6 = new TextFormat()).align = TextFormatAlign.CENTER;
            param6.font = "Impact";
            param6.size = 20;
            param6.color = 16777215;
         }
         _loc7_.setTextFormat(param6);
         addChild(_loc7_);
      }
      
      protected function addButton(param1:SimpleButton, param2:Function) : void
      {
         addChild(param1);
         var _loc3_:String = MouseEvent.CLICK;
         param1.addEventListener(_loc3_,param2);
         this.buttonListenersDict[param1] = {
            "type":_loc3_,
            "listener":param2
         };
      }
   }
}

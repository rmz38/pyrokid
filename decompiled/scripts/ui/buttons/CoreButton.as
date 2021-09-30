package ui.buttons
{
   import flash.display.DisplayObject;
   import flash.display.SimpleButton;
   import flash.display.Sprite;
   import flash.events.Event;
   import flash.events.MouseEvent;
   import flash.text.TextField;
   import flash.text.TextFormat;
   import flash.text.TextFormatAlign;
   import pyrokid.Constants;
   
   public class CoreButton extends SimpleButton
   {
      
      private static var cornerSizeX:int = 18;
      
      private static var cornerSizeY:int = 18;
      
      private static var lineWidth:int = 3;
       
      
      private var _w:int;
      
      private var _h:int;
      
      private var toggleState:int;
      
      private var stateChildren:Array;
      
      private var stateOverlays:Array;
      
      private var listener:Function;
      
      public function CoreButton()
      {
         super();
      }
      
      public static function createDefaultSize(param1:Function, ... rest) : CoreButton
      {
         var _loc3_:Array = [Constants.DEFAULT_BUTTON_WIDTH,Constants.DEFAULT_BUTTON_HEIGHT,param1];
         return CoreButton.create.apply(null,_loc3_.concat(rest));
      }
      
      public static function create(param1:int, param2:int, param3:Function, ... rest) : CoreButton
      {
         var _loc5_:CoreButton;
         (_loc5_ = new CoreButton())._w = param1;
         _loc5_._h = param2;
         _loc5_.x = 0;
         _loc5_.y = 0;
         _loc5_.toggleState = 0;
         var _loc6_:Sprite;
         (_loc6_ = new Sprite()).graphics.beginFill(0);
         _loc6_.graphics.drawRoundRect(0,0,param1,param2,cornerSizeX,cornerSizeY);
         _loc6_.graphics.endFill();
         _loc5_.hitTestState = _loc6_;
         _loc5_.useHandCursor = true;
         _loc5_.visible = true;
         _loc5_.setButtonContent(rest);
         _loc5_.setOnClick(param3);
         _loc5_.reset();
         return _loc5_;
      }
      
      public function get w() : int
      {
         return this._w;
      }
      
      public function get h() : int
      {
         return this._h;
      }
      
      public function centerOn(param1:int, param2:int) : CoreButton
      {
         this.x = param1 - this.w / 2;
         this.y = param2 - this.h / 2;
         return this;
      }
      
      public function setCorner(param1:int, param2:int) : CoreButton
      {
         this.x = param1;
         this.y = param2;
         return this;
      }
      
      public function addOverlay(param1:Object, param2:int = 0) : CoreButton
      {
         this.stateOverlays[param2] = this.getDisplayObject(param1);
         return this;
      }
      
      public function removeListeners() : void
      {
         if(this.listener != null)
         {
            removeEventListener(MouseEvent.CLICK,this.listener);
         }
      }
      
      public function get numStates() : int
      {
         return this.stateChildren[0].length;
      }
      
      public function getState() : int
      {
         return this.toggleState;
      }
      
      public function reset() : void
      {
         this.updateToggleState(0);
      }
      
      public function toggle() : void
      {
         this.updateToggleState((this.toggleState + 1) % this.numStates);
      }
      
      private function updateToggleState(param1:int) : void
      {
         if(param1 < 0 || param1 >= this.numStates)
         {
            return;
         }
         this.toggleState = param1;
         upState = this.stateChildren[Constants.MOUSE_STATE_UP][this.toggleState];
         overState = this.stateChildren[Constants.MOUSE_STATE_OVER][this.toggleState];
         downState = this.stateChildren[Constants.MOUSE_STATE_DOWN][this.toggleState];
      }
      
      private function setOnClick(param1:Function) : void
      {
         var onClick:Function = param1;
         if(onClick == null)
         {
            return;
         }
         this.listener = function(param1:Event):void
         {
            toggle();
            onClick();
         };
         addEventListener(MouseEvent.CLICK,this.listener);
      }
      
      private function getDisplayObject(param1:Object) : DisplayObject
      {
         var _loc2_:DisplayObject = null;
         var _loc3_:Class = null;
         if(param1 is String)
         {
            _loc2_ = this.getTextSprite(param1 as String);
         }
         else
         {
            _loc3_ = Object(param1).constructor;
            _loc2_ = new _loc3_() as DisplayObject;
            _loc2_.scaleX = _loc2_.scaleY = param1.scaleX;
            _loc2_.x = this.w / 2;
            _loc2_.y = this.h / 2;
         }
         return _loc2_;
      }
      
      private function setButtonContent(param1:Array) : void
      {
         var _loc3_:Object = null;
         var _loc4_:int = 0;
         var _loc5_:DisplayObject = null;
         var _loc6_:DisplayObject = null;
         this.stateChildren = new Array(Constants.MOUSE_STATES.length);
         this.stateOverlays = [];
         var _loc2_:int = 0;
         while(_loc2_ < this.stateChildren.length)
         {
            this.stateChildren[_loc2_] = [];
            _loc2_++;
         }
         for each(_loc3_ in param1)
         {
            if(_loc3_ is String || _loc3_ is DisplayObject)
            {
               for each(_loc4_ in Constants.MOUSE_STATES)
               {
                  _loc5_ = this.getDisplayObject(_loc3_);
                  _loc6_ = this.getBackground(_loc5_,_loc4_);
                  this.stateChildren[_loc4_].push(_loc6_);
               }
               this.stateOverlays.push(null);
            }
         }
      }
      
      private function getTextSprite(param1:String) : TextField
      {
         var _loc2_:TextFormat = new TextFormat();
         _loc2_.size = 20;
         _loc2_.align = TextFormatAlign.CENTER;
         _loc2_.font = "Impact";
         _loc2_.color = 16777215;
         var _loc3_:TextField = new TextField();
         _loc3_.selectable = false;
         _loc3_.appendText(param1);
         _loc3_.width = this.w;
         _loc3_.height = this.h;
         _loc3_.setTextFormat(_loc2_);
         _loc3_.y += Math.round((_loc3_.height - _loc3_.textHeight) / 2) - 4;
         return _loc3_;
      }
      
      private function getBackground(param1:DisplayObject, param2:int) : Sprite
      {
         var _loc3_:Sprite = new Sprite();
         if(param2 != Constants.MOUSE_STATE_UP)
         {
            _loc3_.graphics.lineStyle(lineWidth,16777215,1,true);
            if(param2 == Constants.MOUSE_STATE_DOWN)
            {
               _loc3_.graphics.beginFill(11474454);
               this.drawBorder(_loc3_);
               _loc3_.graphics.endFill();
            }
            else
            {
               this.drawBorder(_loc3_);
            }
         }
         _loc3_.addChild(param1);
         return _loc3_;
      }
      
      private function drawBorder(param1:Sprite) : void
      {
         param1.graphics.drawRoundRect(0,0,this.w,this.h,cornerSizeX,cornerSizeY);
      }
   }
}

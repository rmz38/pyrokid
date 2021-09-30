package ui
{
   import flash.display.Sprite;
   import flash.utils.Dictionary;
   
   public class SelectorButton extends Sprite
   {
       
      
      private var toggleChildren:Array;
      
      private var onSelectedChange:Function;
      
      private var selectedButton:LevelEditorButton;
      
      public function SelectorButton(param1:Dictionary, param2:Function)
      {
         var _loc4_:* = null;
         var _loc5_:* = undefined;
         var _loc6_:String = null;
         var _loc7_:LevelEditorButton = null;
         super();
         this.toggleChildren = [];
         this.onSelectedChange = param2;
         var _loc3_:Array = [];
         for(_loc4_ in param1)
         {
            _loc3_.push(_loc4_);
         }
         _loc3_.sort();
         _loc5_ = 0;
         while(_loc5_ < _loc3_.length)
         {
            _loc4_ = _loc3_[_loc5_];
            _loc6_ = param1[_loc4_];
            (_loc7_ = new LevelEditorButton(null,120,20,0,200 + _loc5_ * 20,[_loc6_,_loc6_],[LevelEditorButton.upColor,16711680])).setOnClick(this.getSelectorFunction(_loc4_,_loc7_));
            addChild(_loc7_);
            if(_loc5_ == 0)
            {
               this.selectedButton = _loc7_;
               this.selectedButton.toggle();
            }
            _loc5_++;
         }
      }
      
      private function getSelectorFunction(param1:Object, param2:LevelEditorButton) : Function
      {
         var id:Object = param1;
         var button:LevelEditorButton = param2;
         return function():void
         {
            selectedButton.toggle();
            selectedButton = button;
            onSelectedChange(id);
         };
      }
   }
}

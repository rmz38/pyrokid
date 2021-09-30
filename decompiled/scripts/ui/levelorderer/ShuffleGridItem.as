package ui.levelorderer
{
   import flash.display.Bitmap;
   import flash.display.Sprite;
   import flash.text.TextField;
   import flash.text.TextFieldAutoSize;
   import flash.text.TextFormat;
   import flash.text.TextFormatAlign;
   import flash.utils.ByteArray;
   import pyrokid.Embedded;
   import ui.LevelsInfo;
   
   public class ShuffleGridItem extends Sprite
   {
       
      
      public var textField:TextField;
      
      public var levelByteArray:ByteArray;
      
      public function ShuffleGridItem(param1:int, param2:Number, param3:Number)
      {
         var _loc4_:Bitmap = null;
         var _loc5_:Number = NaN;
         var _loc6_:Number = NaN;
         var _loc7_:Number = NaN;
         super();
         if(LevelsInfo.levelDict[param1] != undefined)
         {
            this.levelByteArray = LevelsInfo.levelDict[param1];
            _loc4_ = Utils.getLevelIcon(param1);
            _loc5_ = param2 / _loc4_.width;
            _loc6_ = param3 / _loc4_.height;
            _loc7_ = Math.min(_loc5_,_loc6_);
            _loc4_.scaleX = _loc4_.scaleY = _loc7_;
            addChild(_loc4_);
         }
         else
         {
            this.textField = new TextField();
            this.textField.defaultTextFormat = new TextFormat("Arial",11,16777215,false,false,false,null,null,TextFormatAlign.CENTER);
            this.textField.autoSize = TextFieldAutoSize.LEFT;
            this.textField.selectable = false;
            this.textField.mouseEnabled = false;
            this.textField.x = 2;
            this.textField.y = 2;
            addChild(this.textField);
            graphics.lineStyle(0,16777215);
            graphics.beginFill(1118481);
            graphics.drawRect(0,0,40,40);
            graphics.endFill();
         }
      }
      
      override public function toString() : String
      {
         return Embedded.levelObjToString[this.levelByteArray];
      }
   }
}

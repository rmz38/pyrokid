package ui.buttons
{
   import flash.display.DisplayObjectContainer;
   import flash.display.SimpleButton;
   import flash.text.TextField;
   
   public class UnlockedButton extends SimpleButton
   {
       
      
      public function UnlockedButton(param1:String, param2:int, param3:int)
      {
         super();
         this.x = param2;
         this.y = param3;
         (this.upState as TextField).text = param1;
         ((this.downState as DisplayObjectContainer).getChildAt(1) as TextField).text = param1;
         ((this.overState as DisplayObjectContainer).getChildAt(1) as TextField).text = param1;
      }
   }
}

package ui
{
   import flash.display.Sprite;
   import flash.text.TextField;
   import flash.text.TextFormat;
   import pyrokid.Constants;
   
   public class TimerHUD extends Sprite
   {
       
      
      private var tf:TextField;
      
      private var format:TextFormat;
      
      public function TimerHUD()
      {
         super();
         x = Constants.WIDTH - 45;
         y = 10;
         this.tf = new TextField();
         this.tf.selectable = false;
         this.format = new TextFormat();
         this.format.size = 20;
         this.format.font = "Impact";
         this.format.color = 16777215;
         addChild(this.tf);
      }
      
      public function set time(param1:int) : *
      {
         this.tf.text = Utils.frameCountToTimeDisplay(param1);
         this.tf.setTextFormat(this.format);
      }
   }
}

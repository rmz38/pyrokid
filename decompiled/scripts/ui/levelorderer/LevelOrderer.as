package ui.levelorderer
{
   import flash.display.Bitmap;
   import flash.display.MovieClip;
   import flash.display.Shape;
   import flash.events.Event;
   import flash.events.KeyboardEvent;
   import flash.ui.Keyboard;
   import ui.LevelsInfo;
   
   public class LevelOrderer extends MovieClip
   {
       
      
      private var grid:ShuffleGrid;
      
      protected var background:Shape;
      
      private var down_key:uint = 0;
      
      public function LevelOrderer()
      {
         super();
         this.addBackground(0);
         var _loc1_:Bitmap = Utils.getLevelIcon(45);
         _loc1_.scaleX = _loc1_.scaleY = 0.14;
         var _loc2_:int = LevelsInfo.getTotalNumberOfLevels();
         var _loc3_:Number = 7;
         var _loc4_:* = Math.ceil(_loc2_ / _loc3_);
         var _loc5_:int = _loc1_.width;
         var _loc6_:int = _loc1_.height;
         this.grid = new ShuffleGrid(_loc4_,_loc3_,_loc6_,_loc5_,1);
         var _loc7_:int = 0;
         while(_loc7_ < this.grid.numCells)
         {
            this.grid.addItem(new ShuffleGridItem(_loc7_ + 1,_loc5_,_loc6_));
            _loc7_++;
         }
         addChild(this.grid);
         addEventListener(KeyboardEvent.KEY_DOWN,this.onKeyDown);
         addEventListener(KeyboardEvent.KEY_UP,this.onKeyUp);
      }
      
      private function onKeyDown(param1:KeyboardEvent) : void
      {
         if(param1.keyCode == Keyboard.UP || param1.keyCode == Keyboard.DOWN || param1.keyCode == Keyboard.LEFT || param1.keyCode == Keyboard.RIGHT)
         {
            this.down_key = param1.keyCode;
            addEventListener(Event.ENTER_FRAME,this.whileKeyDown);
         }
      }
      
      private function onKeyUp(param1:KeyboardEvent) : void
      {
         if(param1.keyCode == Keyboard.SHIFT)
         {
            this.printLevelList();
         }
         if(param1.keyCode == Keyboard.UP || param1.keyCode == Keyboard.DOWN || param1.keyCode == Keyboard.LEFT || param1.keyCode == Keyboard.RIGHT)
         {
            removeEventListener(Event.ENTER_FRAME,this.whileKeyDown);
         }
      }
      
      private function whileKeyDown(param1:Event) : void
      {
         if(this.down_key == Keyboard.UP)
         {
            this.grid.y += 5;
         }
         if(this.down_key == Keyboard.DOWN)
         {
            this.grid.y -= 5;
         }
         if(this.down_key == Keyboard.LEFT)
         {
            this.grid.x += 5;
         }
         if(this.down_key == Keyboard.RIGHT)
         {
            this.grid.x -= 5;
         }
      }
      
      private function printLevelList() : void
      {
         var _loc3_:int = 0;
         var _loc1_:* = "[\nnull,\n";
         var _loc2_:int = 0;
         while(_loc2_ < this.grid.rows)
         {
            _loc3_ = 0;
            while(_loc3_ < this.grid.cols)
            {
               _loc1_ += this.grid.getItemAtPosition(_loc2_,_loc3_).toString() + ",\n";
               _loc3_++;
            }
            _loc2_++;
         }
         _loc1_ += "];";
      }
      
      protected function addBackground(param1:uint, param2:Number = 1.0) : void
      {
         this.background = new Shape();
         this.background.graphics.beginFill(param1,param2);
         this.background.graphics.drawRect(0,0,Main.MainStage.stageWidth,Main.MainStage.stageHeight);
         this.background.graphics.endFill();
         addChild(this.background);
      }
   }
}

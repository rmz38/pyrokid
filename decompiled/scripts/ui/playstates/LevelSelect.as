package ui.playstates
{
   import flash.display.Sprite;
   import flash.events.Event;
   import pyrokid.CaveBackground;
   import pyrokid.Constants;
   import ui.LevelsInfo;
   import ui.buttons.CompletedButton;
   import ui.buttons.LockedButton;
   import ui.buttons.UnlockedButton;
   
   public class LevelSelect extends BasePlayState
   {
      
      public static var x_tiles:int = 3;
      
      public static var y_tiles:int = 3;
      
      public static var levelsPerPage:Number = x_tiles * y_tiles;
       
      
      private var curr_page:int = 1;
      
      var x_offset:int = 300;
      
      var y_offset:int = 200;
      
      var x_spacing:int = 100;
      
      var y_spacing:int = 100;
      
      public function LevelSelect(param1:int = 1)
      {
         super();
         this.curr_page = param1;
         this.displayLevelButtons();
      }
      
      public static function startAndSetLevel(param1:int) : Function
      {
         var levelNum:int = param1;
         return function():void
         {
            var _loc1_:* = undefined;
            if(LevelsInfo.levelDict[levelNum] == undefined)
            {
               StateController.goToCredits();
            }
            else
            {
               _loc1_ = LevelSelect.levelToPageNum(levelNum);
               if(LevelsInfo.isPageLocked(_loc1_) && !Constants.ALL_LEVELS_UNLOCKED)
               {
                  StateController.goToLevelSelectAtPage(_loc1_ - 1)();
               }
               else
               {
                  LevelsInfo.currLevel = levelNum;
                  StateController.goToGame();
               }
            }
         };
      }
      
      public static function levelToPageNum(param1:int) : int
      {
         return (param1 - LevelsInfo.numOfTutorialLevels - 1) / levelsPerPage + 2;
      }
      
      private function displayLevelButtons() : void
      {
         var max_level_displayed:* = undefined;
         var numToUnlock:int = 0;
         var numLevelsToAdvanceNextPage:int = 0;
         var x:int = 0;
         var y:int = 0;
         var curr_level_num:int = 0;
         addChild(new CaveBackground(10,10,true));
         if(this.curr_page == 1)
         {
            addTextToScreen("Tutorial Levels",200,50,400,100);
         }
         else if(LevelsInfo.isPageLocked(this.curr_page))
         {
            if(this.curr_page == 2)
            {
               addTextToScreen("Complete tutorial levels to advance.",500,50,400,100);
            }
            else
            {
               numToUnlock = LevelsInfo.getNumLevelsLeftBeforePageUnlocked(this.curr_page);
               addTextToScreen("Complete " + numToUnlock + " levels on page " + (this.curr_page - 1) + " to advance.",500,50,400,100);
            }
         }
         else
         {
            addTextToScreen("Choose A Level",200,50,400,100);
            max_level_displayed = (this.curr_page - 1) * (x_tiles * y_tiles) + LevelsInfo.numOfTutorialLevels;
            if(max_level_displayed < LevelsInfo.getTotalNumberOfLevels())
            {
               numLevelsToAdvanceNextPage = LevelsInfo.getNumLevelsLeftBeforePageUnlocked(this.curr_page + 1);
               if(numLevelsToAdvanceNextPage > 0)
               {
                  addTextToScreen("Complete " + numLevelsToAdvanceNextPage + " levels on this page to advance.",500,50,400,150);
               }
            }
         }
         addTextToScreen("page " + this.curr_page,150,50,400,530);
         createReturnToMainMenuButton().setCorner(10,10);
         if(this.curr_page == 1)
         {
            x = 0;
            while(x < x_tiles)
            {
               y = 0;
               while(y < y_tiles)
               {
                  curr_level_num = (this.curr_page - 1) * (x_tiles * y_tiles) + (y * x_tiles + (x + 1));
                  if(curr_level_num > LevelsInfo.numOfTutorialLevels)
                  {
                     break;
                  }
                  if(LevelsInfo.levelDict[curr_level_num] != undefined)
                  {
                     if(LevelsInfo.isLevelLocked(curr_level_num) && !Constants.ALL_LEVELS_UNLOCKED)
                     {
                        addButton(new LockedButton("" + curr_level_num,this.x_offset + this.x_spacing * x,this.y_offset + this.y_spacing * y),function():*
                        {
                        });
                     }
                     else if(LevelsInfo.isLevelCompleted(curr_level_num))
                     {
                        addButton(new CompletedButton("" + curr_level_num,this.x_offset + this.x_spacing * x,this.y_offset + this.y_spacing * y),startAndSetLevel(curr_level_num));
                     }
                     else
                     {
                        addButton(new UnlockedButton("" + curr_level_num,this.x_offset + this.x_spacing * x,this.y_offset + this.y_spacing * y),startAndSetLevel(curr_level_num));
                     }
                  }
                  y++;
               }
               x++;
            }
         }
         else
         {
            x = 0;
            while(x < x_tiles)
            {
               y = 0;
               while(y < y_tiles)
               {
                  curr_level_num = (this.curr_page - 2) * (x_tiles * y_tiles) + (y * x_tiles + (x + 1)) + LevelsInfo.numOfTutorialLevels;
                  if(LevelsInfo.levelDict[curr_level_num] != undefined)
                  {
                     if(LevelsInfo.isPageLocked(this.curr_page) && !Constants.ALL_LEVELS_UNLOCKED)
                     {
                        addButton(new LockedButton("" + curr_level_num,this.x_offset + this.x_spacing * x,this.y_offset + this.y_spacing * y),function():*
                        {
                        });
                     }
                     else if(LevelsInfo.isLevelCompleted(curr_level_num))
                     {
                        addButton(new CompletedButton("" + curr_level_num,this.x_offset + this.x_spacing * x,this.y_offset + this.y_spacing * y),startAndSetLevel(curr_level_num));
                        if(LevelsInfo.bestLevelCompletionTimes[curr_level_num] != undefined && (!Constants.IS_VERSION_A || Constants.ALWAYS_DISPLAY_COMPLETION_TIME))
                        {
                           addTextToScreen(Utils.frameCountToTimeDisplay(LevelsInfo.bestLevelCompletionTimes[curr_level_num]),60,50,this.x_offset + this.x_spacing * x,this.y_offset + this.y_spacing * y + 40);
                        }
                     }
                     else
                     {
                        addButton(new UnlockedButton("" + curr_level_num,this.x_offset + this.x_spacing * x,this.y_offset + this.y_spacing * y),startAndSetLevel(curr_level_num));
                     }
                  }
                  y++;
               }
               x++;
            }
         }
         if(this.curr_page > 1)
         {
            addButton(new UnlockedButton("<",100,300),this.goToPreviousPage);
         }
         max_level_displayed = (this.curr_page - 1) * (x_tiles * y_tiles) + LevelsInfo.numOfTutorialLevels;
         if(max_level_displayed < LevelsInfo.getTotalNumberOfLevels())
         {
            addButton(new UnlockedButton(">",700,300),this.goToNextPage);
         }
      }
      
      private function goToPreviousPage(param1:Event) : void
      {
         Utils.removeAllChildren(this);
         --this.curr_page;
         if(this.curr_page < 1)
         {
            this.curr_page = 1;
         }
         this.displayLevelButtons();
      }
      
      private function goToNextPage(param1:Event) : void
      {
         Utils.removeAllChildren(this);
         ++this.curr_page;
         this.displayLevelButtons();
      }
      
      private function goToPageNum(param1:int) : Function
      {
         var screen:Sprite = null;
         var pageNum:int = param1;
         screen = this;
         return function():void
         {
            Utils.removeAllChildren(screen);
            curr_page = pageNum;
            displayLevelButtons();
         };
      }
   }
}

package ui
{
   import flash.utils.ByteArray;
   import flash.utils.Dictionary;
   import pyrokid.Constants;
   import pyrokid.Embedded;
   import pyrokid.GameSettings;
   import pyrokid.LevelRecipe;
   import ui.playstates.LevelSelect;
   
   public class LevelsInfo
   {
      
      public static var levelDict:Array = [null,Embedded.firstIntroTown,Embedded.secondIntroTown,Embedded.thirdIntroTown,Embedded.fourthIntroTown,Embedded.introFallUnderground,Embedded.levelLearnDirectionalShoot,Embedded.level5,Embedded.alevel1,Embedded.level4New,Embedded.level6,Embedded.level7,Embedded.alevel2,Embedded.introSpider,Embedded.alevel10,Embedded.wBatIntro,Embedded.level10,Embedded.levelLearnShootDown,Embedded.level8,Embedded.alevel4,Embedded.alevel5,Embedded.alevel9,Embedded.alevel8,Embedded.alevel6,Embedded.alevel12,Embedded.learnToSmoosh,Embedded.alevel13,Embedded.wBat8,Embedded.wBat1,Embedded.wBat5,Embedded.wBat2,Embedded.wBat6,Embedded.wBat3,Embedded.level11,Embedded.alevel7,Embedded.alevel3,Embedded.shootInCorrectOrder,Embedded.nickDrop,Embedded.nickAnvil,Embedded.runFast,Embedded.level12,Embedded.wBat9,Embedded.spiderFun,Embedded.mazeRunner,Embedded.level13,Embedded.clevel1,Embedded.clevel2,Embedded.wBat7,Embedded.level14];
      
      private static var _currLevel:int = 1;
      
      public static var maxUnlockedLevel:int = 1;
      
      public static var totalNumberOfLevels:int = -1;
      
      public static const numOfTutorialLevels:int = 8;
      
      public static var completedLevels:Dictionary = new Dictionary();
      
      public static var completedLevelsByPage:Dictionary = new Dictionary();
      
      public static var bestLevelCompletionTimes:Dictionary = new Dictionary();
      
      public static var tutorialTalisman:Object = {2:new Vector2i(10,7)};
      
      public static var tutorialHouses:Object = {
         2:[new Vector2i(34,6)],
         3:[new Vector2i(22,6)],
         4:[new Vector2i(33,4),new Vector2i(23,4)]
      };
      
      public static var tutorialBuildings:Object = {
         1:[new Vector2i(2,8),new Vector2i(16,7),new Vector2i(35,6)],
         2:[new Vector2i(1,6),new Vector2i(17,4)]
      };
       
      
      public function LevelsInfo()
      {
         super();
      }
      
      public static function get currLevel() : int
      {
         return _currLevel;
      }
      
      public static function set currLevel(param1:int) : void
      {
         _currLevel = param1;
      }
      
      public static function getCurrLevelRecipe(param1:* = -1) : Object
      {
         var _loc3_:ByteArray = null;
         var _loc2_:int = param1 != -1 ? int(param1) : int(currLevel);
         if(_loc2_ <= 0 || _loc2_ >= levelDict.length)
         {
            return LevelRecipe.generateTemplate();
         }
         _loc3_ = levelDict[_loc2_] as ByteArray;
         _loc3_.position = 0;
         return _loc3_.readObject();
      }
      
      public static function getTutorialMessages(param1:int) : Array
      {
         var _loc3_:String = null;
         var _loc2_:* = levelDict[param1];
         switch(_loc2_)
         {
            case Embedded.firstIntroTown:
               _loc3_ = !!GameSettings.controlSchemeInverted ? "arrow" : "WASD";
               return [[new Vector2(100,560),"Use the " + _loc3_ + " keys to move and jump. Use ESC to pause."]];
            case Embedded.thirdIntroTown:
               _loc3_ = !GameSettings.controlSchemeInverted ? "an arrow key" : "W, A, S, or D";
               return [[new Vector2(40,570),"Use " + _loc3_ + " to shoot a fireball"]];
            case Embedded.fourthIntroTown:
               return [[new Vector2(240,110),"He\'s burning houses, get him!"]];
            case Embedded.levelLearnDirectionalShoot:
               return [[new Vector2(0,10),"Remember, you can shoot in any direction."]];
            case Embedded.level5:
               return [[new Vector2(0,10),"Latches will hold objects together."]];
            case Embedded.level4New:
               return [[new Vector2(0,10),"If you get stuck, you can press R to restart."]];
            case Embedded.levelLearnShootDown:
               return [[new Vector2(0,10),"Sometimes you\'ll need to jump and shoot down at the same time"]];
            case Embedded.level10:
               return [[new Vector2(0,10),"You can shoot while falling. At any time\nPress R to restart."]];
            case Embedded.alevel1:
               return [[new Vector2(0,10),"Sometimes you have to make your own exit. Look for a bomb in the cave."]];
            case Embedded.alevel9:
               return [[new Vector2(0,10),"Some blocks are guarded by metal edges. Fire will not go past that side."]];
            default:
               return [];
         }
      }
      
      public static function getTotalNumberOfLevels() : int
      {
         if(totalNumberOfLevels == -1)
         {
            totalNumberOfLevels = levelDict.length - 1;
         }
         return totalNumberOfLevels;
      }
      
      public static function restoreCompletedLevels(param1:Dictionary) : void
      {
         var _loc2_:* = undefined;
         var _loc3_:int = 0;
         var _loc4_:Dictionary = null;
         for(_loc2_ in param1)
         {
            _loc3_ = LevelSelect.levelToPageNum(_loc2_);
            if(completedLevelsByPage[_loc3_] == undefined)
            {
               completedLevelsByPage[_loc3_] = new Dictionary();
            }
            _loc4_ = completedLevelsByPage[_loc3_];
            if(completedLevels[_loc2_] == undefined)
            {
               completedLevels[_loc2_] = 1;
            }
            if(_loc4_[_loc2_] == undefined)
            {
               _loc4_[_loc2_] = 1;
            }
         }
      }
      
      public static function setCurrentLevelAsCompleted(param1:int) : void
      {
         var _loc2_:int = LevelSelect.levelToPageNum(currLevel);
         if(completedLevelsByPage[_loc2_] == undefined)
         {
            completedLevelsByPage[_loc2_] = new Dictionary();
         }
         var _loc3_:Dictionary = completedLevelsByPage[_loc2_];
         if(completedLevels[currLevel] == undefined)
         {
            completedLevels[currLevel] = 1;
            ++maxUnlockedLevel;
         }
         if(_loc3_[currLevel] == undefined)
         {
            _loc3_[currLevel] = 1;
         }
         if(bestLevelCompletionTimes[currLevel] == undefined)
         {
            bestLevelCompletionTimes[currLevel] = param1;
         }
         else
         {
            bestLevelCompletionTimes[currLevel] = Math.min(param1,bestLevelCompletionTimes[currLevel]);
         }
         Utils.saveLevelData();
      }
      
      public static function isLevelLocked(param1:int) : Boolean
      {
         return levelDict[param1] != undefined && param1 > maxUnlockedLevel;
      }
      
      public static function isPageLocked(param1:int) : Boolean
      {
         var _loc2_:Dictionary = null;
         var _loc3_:Number = NaN;
         if(param1 == 1)
         {
            return false;
         }
         if(completedLevelsByPage[param1 - 1] == undefined)
         {
            return true;
         }
         _loc2_ = completedLevelsByPage[param1 - 1];
         _loc3_ = Utils.sizeOfDict(_loc2_);
         if(param1 == 1)
         {
            return false;
         }
         if(param1 == 2)
         {
            return _loc3_ / numOfTutorialLevels < 1;
         }
         return _loc3_ / LevelSelect.levelsPerPage < Constants.LEVEL_UNLOCK_NEXT_PAGE_PROPORTION;
      }
      
      public static function getNumOfUnlockedLevelsForPage(param1:int) : int
      {
         var _loc2_:Dictionary = null;
         var _loc3_:Number = NaN;
         if(completedLevelsByPage[param1] == undefined)
         {
            return 0;
         }
         _loc2_ = completedLevelsByPage[param1];
         return Number(Utils.sizeOfDict(_loc2_));
      }
      
      public static function getNumLevelsLeftBeforePageUnlocked(param1:int) : int
      {
         var _loc2_:int = getNumOfUnlockedLevelsForPage(param1 - 1);
         var _loc3_:Number = LevelSelect.levelsPerPage * Constants.LEVEL_UNLOCK_NEXT_PAGE_PROPORTION;
         return _loc3_ - _loc2_;
      }
      
      public static function isLevelCompleted(param1:int) : Boolean
      {
         return completedLevels[param1] != undefined;
      }
   }
}

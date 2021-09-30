package
{
   import flash.display.Bitmap;
   import flash.display.BitmapData;
   import flash.display.DisplayObject;
   import flash.display.MovieClip;
   import flash.display.Sprite;
   import flash.net.SharedObject;
   import flash.utils.Dictionary;
   import pyrokid.Constants;
   import pyrokid.Level;
   import pyrokid.entities.FreeEntity;
   import pyrokid.tools.HashSet;
   import ui.LevelsInfo;
   import ui.playstates.BasePlayState;
   
   public class Utils
   {
      
      private static var directNeighbors:Array = [new Vector2i(0,-1),new Vector2i(0,1),new Vector2i(-1,0),new Vector2i(1,0)];
       
      
      public function Utils()
      {
         super();
      }
      
      public static function realToCell(param1:Number) : Number
      {
         return Math.floor(param1 / Constants.CELL);
      }
      
      public static function topOfCell(param1:int) : Number
      {
         return param1 * Constants.CELL;
      }
      
      public static function bottomOfCell(param1:int) : Number
      {
         return (param1 + 1) * Constants.CELL;
      }
      
      public static function createMultiArray(param1:Array) : Array
      {
         if(param1 == null || param1.length < 1)
         {
            return null;
         }
         return createMultiArrayRec(0,param1);
      }
      
      private static function createMultiArrayRec(param1:int, param2:Array) : Array
      {
         var _loc4_:int = 0;
         var _loc3_:Array = new Array(param2[param1]);
         if(param1 + 1 < param2.length)
         {
            param1++;
            _loc4_ = 0;
            while(_loc4_ < _loc3_.length)
            {
               _loc3_[_loc4_] = createMultiArrayRec(param1,param2);
               _loc4_++;
            }
         }
         return _loc3_;
      }
      
      public static function lerp(param1:Number, param2:Number, param3:Number) : Number
      {
         return param1 + param3 * (param2 - param1);
      }
      
      public static function removeAllChildren(param1:Sprite) : void
      {
         if(param1 == null)
         {
            return;
         }
         var _loc2_:int = param1.numChildren - 1;
         while(_loc2_ >= 0)
         {
            if(param1.getChildAt(_loc2_) is BasePlayState)
            {
               BasePlayState(param1.getChildAt(_loc2_)).removeAllEventListeners();
            }
            param1.removeChildAt(_loc2_);
            _loc2_--;
         }
      }
      
      public static function getIntFromBooleans(param1:Array) : int
      {
         var _loc2_:int = 0;
         var _loc3_:int = 0;
         while(_loc3_ < param1.length)
         {
            _loc2_ += int(param1[_loc3_]) << _loc3_;
            _loc3_++;
         }
         return _loc2_;
      }
      
      public static function getBooleansFromInt(param1:int) : Array
      {
         var _loc2_:Array = [];
         var _loc3_:int = 0;
         while(_loc3_ < 4)
         {
            _loc2_.push(Boolean(param1 >> _loc3_ & 1));
            _loc3_++;
         }
         return _loc2_;
      }
      
      public static function sizeOfDict(param1:Object) : int
      {
         var _loc3_:* = undefined;
         var _loc2_:int = 0;
         for(_loc3_ in param1)
         {
            _loc2_++;
         }
         return _loc2_;
      }
      
      public static function BFS(param1:int, param2:int, param3:Vector2i, param4:Function, param5:Function) : void
      {
         var coor:Vector2i = null;
         var finishedSearch:Boolean = false;
         var neighbors:Array = null;
         var neighbor:Vector2i = null;
         var width:int = param1;
         var height:int = param2;
         var start:Vector2i = param3;
         var isNeighbor:Function = param4;
         var processNode:Function = param5;
         var queue:Array = [start];
         var visited:HashSet = new HashSet();
         visited.add(start);
         while(queue.length > 0)
         {
            coor = queue.shift();
            finishedSearch = processNode(coor);
            if(finishedSearch)
            {
               return;
            }
            neighbors = getNeighborCoors(coor.x,coor.y);
            neighbors = neighbors.filter(function(param1:*):*
            {
               return inBoundsWH(width,height,param1.x,param1.y) && isNeighbor(param1);
            });
            for each(neighbor in neighbors)
            {
               if(!visited.contains(neighbor))
               {
                  queue.push(neighbor);
                  visited.add(neighbor);
               }
            }
         }
      }
      
      public static function getCellMap(param1:Array) : Dictionary
      {
         var dict:Dictionary = null;
         var ids:Array = param1;
         dict = new Dictionary();
         foreach(ids,function(param1:int, param2:int, param3:int):void
         {
            if(param3 == 0)
            {
               return;
            }
            if(dict[param3] == undefined)
            {
               dict[param3] = [];
            }
            dict[param3].push(new Vector2i(param1,param2));
         });
         return dict;
      }
      
      public static function getAnchor(param1:Array) : Vector2
      {
         var _loc4_:Vector2i = null;
         var _loc2_:int = int.MAX_VALUE;
         var _loc3_:int = int.MAX_VALUE;
         for each(_loc4_ in param1)
         {
            _loc2_ = Math.min(_loc2_,_loc4_.x);
            _loc3_ = Math.min(_loc3_,_loc4_.y);
         }
         return new Vector2(_loc2_,_loc3_);
      }
      
      public static function print2DArr(param1:Array, param2:int = 3, param3:Boolean = false) : void
      {
         var _loc4_:Array = null;
         var _loc5_:String = null;
         var _loc6_:int = 0;
         var _loc7_:* = null;
         var _loc8_:* = undefined;
         var _loc9_:int = 0;
         for each(_loc4_ in param1)
         {
            _loc5_ = "";
            _loc6_ = 0;
            while(_loc6_ < _loc4_.length)
            {
               _loc7_ = _loc4_[_loc6_] != undefined ? _loc4_[_loc6_].toString() : "NA";
               _loc8_ = Math.max(param2 - _loc7_.length,0);
               _loc9_ = 0;
               while(_loc9_ < _loc8_)
               {
                  _loc7_ += " ";
                  _loc9_++;
               }
               if(param3 && _loc4_)
               {
                  _loc7_ = _loc7_.substring(0,param2);
               }
               _loc7_ += ",";
               _loc5_ += _loc7_;
               _loc6_++;
            }
         }
      }
      
      public static function foreach(param1:Array, param2:Function) : void
      {
         var _loc4_:int = 0;
         var _loc3_:int = 0;
         while(_loc3_ < getH(param1))
         {
            _loc4_ = 0;
            while(_loc4_ < getW(param1))
            {
               param2(_loc4_,_loc3_,param1[_loc3_][_loc4_]);
               _loc4_++;
            }
            _loc3_++;
         }
      }
      
      public static function getNeighbors(param1:Array, param2:int, param3:int) : Array
      {
         var array:Array = param1;
         var x:int = param2;
         var y:int = param3;
         return filterNull(getNeighborCoors(x,y).map(function(param1:Vector2i):*
         {
            return index(array,param1.x,param1.y);
         }));
      }
      
      public static function getNeighborCoors(param1:int, param2:int, param3:Array = null) : Array
      {
         var _loc4_:Vector2i = null;
         if(param3 == null)
         {
            param3 = [];
         }
         for each(_loc4_ in directNeighbors)
         {
            param3.push(new Vector2i(param1 + _loc4_.x,param2 + _loc4_.y));
         }
         return param3;
      }
      
      public static function newArray(param1:int, param2:int) : Array
      {
         var _loc3_:Array = [];
         var _loc4_:int = 0;
         while(_loc4_ < param2)
         {
            _loc3_.push(new Array(param1));
            _loc4_++;
         }
         return _loc3_;
      }
      
      public static function newArrayOfSize(param1:Array) : Array
      {
         return newArray(getW(param1),getH(param1));
      }
      
      public static function getW(param1:Array) : int
      {
         return param1[0].length;
      }
      
      public static function getH(param1:Array) : int
      {
         return param1.length;
      }
      
      public static function inBounds(param1:Array, param2:int, param3:int) : Boolean
      {
         return inBoundsWH(getW(param1),getH(param1),param2,param3);
      }
      
      public static function inBoundsWH(param1:int, param2:int, param3:int, param4:int) : Boolean
      {
         return param4 >= 0 && param3 >= 0 && param4 < param2 && param3 < param1;
      }
      
      public static function index(param1:Array, param2:int, param3:int) : *
      {
         if(inBounds(param1,param2,param3))
         {
            return param1[param3][param2];
         }
         return null;
      }
      
      public static function filterNull(param1:Array) : Array
      {
         var array:Array = param1;
         return array.filter(function(param1:*):*
         {
            return param1 != null;
         });
      }
      
      public static function moveInDirFacing(param1:DisplayObject, param2:int, param3:Number = 0) : *
      {
         param1.x += param2 * Math.cos((param1.rotation + param3) * (Math.PI / 180));
         param1.y += param2 * Math.sin((param1.rotation + param3) * (Math.PI / 180));
      }
      
      public static function getXYMultipliers(param1:int) : Vector2i
      {
         if(param1 == Constants.DIR_LEFT)
         {
            return new Vector2i(-1,0);
         }
         if(param1 == Constants.DIR_RIGHT)
         {
            return new Vector2i(1,0);
         }
         if(param1 == Constants.DIR_UP)
         {
            return new Vector2i(0,-1);
         }
         if(param1 == Constants.DIR_DOWN)
         {
            return new Vector2i(0,1);
         }
         return new Vector2i(0,0);
      }
      
      public static function centerInCell(param1:FreeEntity, param2:int, param3:int) : void
      {
         centerInCellVert(param1,param3);
         centerInCellHoriz(param1,param2);
      }
      
      public static function centerInCellVert(param1:FreeEntity, param2:int) : void
      {
         param1.y = (param2 + 0.5) * Constants.CELL - param1.entityHeight / 2;
      }
      
      public static function centerInCellHoriz(param1:FreeEntity, param2:int) : void
      {
         param1.x = (param2 + 0.5) * Constants.CELL - param1.entityWidth / 2;
      }
      
      public static function getQuadrant(param1:int, param2:int) : *
      {
         var _loc3_:* = param1 > param2;
         var _loc4_:* = param1 > -param2;
         if(_loc3_ && _loc4_)
         {
            return Constants.DIR_RIGHT;
         }
         if(_loc3_)
         {
            return Constants.DIR_UP;
         }
         if(_loc4_)
         {
            return Constants.DIR_DOWN;
         }
         return Constants.DIR_LEFT;
      }
      
      public static function distance(param1:DisplayObject, param2:DisplayObject) : *
      {
         var _loc3_:int = param2.x - param1.x;
         var _loc4_:int = param2.y - param1.y;
         return Math.sqrt(_loc3_ * _loc3_ + _loc4_ * _loc4_);
      }
      
      public static function toMC(param1:Object) : MovieClip
      {
         return param1 as MovieClip;
      }
      
      public static function frameCountToTimeDisplay(param1:int) : String
      {
         var _loc2_:int = param1 / 60;
         var _loc3_:int = _loc2_ / 60;
         _loc2_ %= 60;
         return _loc3_ + ":" + (_loc2_ < 10 ? "0" + _loc2_ : _loc2_);
      }
      
      public static function cellToPixel(param1:int) : int
      {
         return param1 * Constants.CELL;
      }
      
      public static function clampI(param1:int, param2:int, param3:int) : int
      {
         if(param1 < param2)
         {
            return param2;
         }
         if(param1 > param3)
         {
            return param3;
         }
         return param1;
      }
      
      public static function clampF(param1:Number, param2:Number, param3:Number) : Number
      {
         if(param1 < param2)
         {
            return param2;
         }
         if(param1 > param3)
         {
            return param3;
         }
         return param1;
      }
      
      public static function generateMinimap(param1:Level) : *
      {
         var _loc2_:Bitmap = new Bitmap();
         _loc2_.bitmapData = new BitmapData(param1.cellWidth * Constants.CELL,param1.cellHeight * Constants.CELL);
         _loc2_.bitmapData.draw(param1);
         return _loc2_;
      }
      
      public static function getLevelIcon(param1:int) : *
      {
         var _loc2_:int = LevelsInfo.currLevel;
         LevelsInfo.currLevel = param1;
         var _loc3_:Object = LevelsInfo.getCurrLevelRecipe(param1);
         var _loc4_:Level = new Level(_loc3_);
         LevelsInfo.currLevel = _loc2_;
         return generateMinimap(_loc4_);
      }
      
      public static function loadSavedData() : void
      {
         if(Constants.START_FRESH_GAME)
         {
            return;
         }
         var _loc1_:SharedObject = SharedObject.getLocal("pyrokid_levelData_kongregate");
         if(_loc1_ != undefined)
         {
            if(_loc1_.data.hasOwnProperty("maxUnlockedLevel"))
            {
               LevelsInfo.maxUnlockedLevel = _loc1_.data.maxUnlockedLevel;
            }
            if(_loc1_.data.hasOwnProperty("completedLevels"))
            {
               LevelsInfo.restoreCompletedLevels(_loc1_.data.completedLevels);
            }
            if(_loc1_.data.hasOwnProperty("bestLevelCompletionTimes"))
            {
               LevelsInfo.bestLevelCompletionTimes = _loc1_.data.bestLevelCompletionTimes;
            }
         }
      }
      
      public static function saveLevelData() : void
      {
         var _loc1_:SharedObject = SharedObject.getLocal("pyrokid_levelData_kongregate");
         _loc1_.data.maxUnlockedLevel = LevelsInfo.maxUnlockedLevel;
         _loc1_.data.completedLevels = LevelsInfo.completedLevels;
         _loc1_.data.bestLevelCompletionTimes = LevelsInfo.bestLevelCompletionTimes;
         _loc1_.flush();
      }
   }
}

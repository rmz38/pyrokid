package ui.levelorderer
{
   import flash.display.Sprite;
   import flash.events.MouseEvent;
   import flash.geom.Point;
   import flash.utils.Dictionary;
   import ui.levelorderer.gs.TweenLite;
   import ui.levelorderer.gs.easing.Expo;
   
   public class ShuffleGrid extends Sprite
   {
       
      
      public var tweenTime:Number = 0.2;
      
      public var itemAlphaOff:Number = 0.8;
      
      private var _rows:int;
      
      private var _cols:int;
      
      private var _padd:int;
      
      private var _rowSize:int;
      
      private var _colSize:int;
      
      private var _index:Array;
      
      private var _items:Array;
      
      private var _numItems:int;
      
      private var _dictionary:Dictionary;
      
      private var _currentItem:ShuffleGridItem;
      
      public function ShuffleGrid(param1:int, param2:int, param3:int, param4:int, param5:Number = 0)
      {
         super();
         this._rows = param1;
         this._cols = param2;
         this._padd = param5;
         this._rowSize = param3;
         this._colSize = param4;
         this._numItems = 0;
         this.initIndex();
      }
      
      public function get numCells() : int
      {
         return this._rows * this._cols;
      }
      
      public function get rows() : int
      {
         return this._rows;
      }
      
      public function get cols() : int
      {
         return this._cols;
      }
      
      public function addItem(param1:ShuffleGridItem) : ShuffleGridItem
      {
         var _loc3_:int = 0;
         var _loc4_:ShuffleGridItemVO = null;
         var _loc5_:Point = null;
         var _loc2_:int = this._numItems % this._cols;
         _loc3_ = Math.floor(this._numItems / this._cols);
         _loc4_ = new ShuffleGridItemVO();
         _loc5_ = this.getPosition(_loc3_,_loc2_);
         _loc4_.row = _loc3_;
         _loc4_.col = _loc2_;
         _loc4_.item = param1;
         param1.x = _loc5_.x;
         param1.y = _loc5_.y;
         param1.mouseEnabled = true;
         param1.buttonMode = true;
         param1.addEventListener(MouseEvent.MOUSE_DOWN,this.onItemPress);
         param1.addEventListener(MouseEvent.MOUSE_UP,this.onItemRelease);
         addChild(param1);
         this._items.push(param1);
         this._index[_loc3_][_loc2_] = _loc4_;
         this._dictionary[param1] = _loc4_;
         ++this._numItems;
         return param1;
      }
      
      public function getItemAt(param1:int) : ShuffleGridItem
      {
         return this._items[param1];
      }
      
      public function getItemAtPosition(param1:int, param2:int) : ShuffleGridItem
      {
         var _loc3_:ShuffleGridItemVO = this._index[param1][param2];
         return _loc3_.item;
      }
      
      private function initIndex() : void
      {
         this._dictionary = new Dictionary();
         this._index = new Array(this._rows);
         this._items = [];
         var _loc1_:int = 0;
         while(_loc1_ < this._rows)
         {
            this._index[_loc1_] = new Array(this._cols);
            _loc1_++;
         }
      }
      
      private function shuffleItems() : void
      {
         var _loc7_:int = 0;
         var _loc8_:ShuffleGridItemVO = null;
         var _loc1_:ShuffleGridItemVO = this._dictionary[this._currentItem];
         var _loc2_:Point = this.getCell(this._currentItem.x,this._currentItem.y);
         var _loc3_:int = _loc2_.x;
         var _loc4_:int = _loc2_.y;
         if(_loc3_ == _loc1_.col && _loc4_ == _loc1_.row)
         {
            return;
         }
         var _loc5_:int = _loc3_ - _loc1_.col;
         var _loc6_:int = _loc4_ - _loc1_.row;
         var _loc9_:Array = [];
         if(_loc5_ < 0)
         {
            _loc7_ = _loc1_.col - 1;
            while(_loc7_ >= _loc1_.col + _loc5_)
            {
               if(this._index[_loc1_.row][_loc7_])
               {
                  ++(_loc8_ = this._index[_loc1_.row][_loc7_]).col;
                  this._index[_loc8_.row][_loc8_.col] = _loc8_;
                  _loc9_.push(_loc8_);
               }
               _loc7_--;
            }
         }
         else
         {
            _loc7_ = _loc1_.col + 1;
            while(_loc7_ <= _loc1_.col + _loc5_)
            {
               if(this._index[_loc1_.row][_loc7_])
               {
                  --(_loc8_ = this._index[_loc1_.row][_loc7_]).col;
                  this._index[_loc8_.row][_loc8_.col] = _loc8_;
                  _loc9_.push(_loc8_);
               }
               _loc7_++;
            }
         }
         if(_loc6_ < 0)
         {
            _loc7_ = _loc1_.row - 1;
            while(_loc7_ >= _loc1_.row + _loc6_)
            {
               if(this._index[_loc7_][_loc1_.col + _loc5_])
               {
                  ++(_loc8_ = this._index[_loc7_][_loc1_.col + _loc5_]).row;
                  this._index[_loc8_.row][_loc8_.col] = _loc8_;
                  _loc9_.push(_loc8_);
               }
               _loc7_--;
            }
         }
         else
         {
            _loc7_ = _loc1_.row + 1;
            while(_loc7_ <= _loc1_.row + _loc6_)
            {
               if(this._index[_loc7_][_loc1_.col + _loc5_])
               {
                  --(_loc8_ = this._index[_loc7_][_loc1_.col + _loc5_]).row;
                  this._index[_loc8_.row][_loc8_.col] = _loc8_;
                  _loc9_.push(_loc8_);
               }
               _loc7_++;
            }
         }
         _loc7_ = 0;
         while(_loc7_ < _loc9_.length)
         {
            this.snapToGrid(_loc9_[_loc7_]);
            _loc7_++;
         }
         _loc1_.row = _loc4_;
         _loc1_.col = _loc3_;
         this._index[_loc4_][_loc3_] = _loc1_;
      }
      
      private function snapToGrid(param1:ShuffleGridItemVO) : void
      {
         var _loc2_:Point = this.getPosition(param1.row,param1.col);
         TweenLite.to(param1.item,this.tweenTime,{
            "x":_loc2_.x,
            "y":_loc2_.y,
            "ease":Expo.easeInOut
         });
      }
      
      private function getPosition(param1:int, param2:int) : Point
      {
         return new Point(param2 * (this._colSize + this._padd),param1 * (this._rowSize + this._padd));
      }
      
      private function getCell(param1:Number, param2:Number) : Point
      {
         var _loc3_:Point = new Point();
         _loc3_.x = Math.max(0,Math.min(this._cols - 1,Math.round(param1 / (this._colSize + this._padd))));
         _loc3_.y = Math.max(0,Math.min(this._rows - 1,Math.round(param2 / (this._rowSize + this._padd))));
         return _loc3_;
      }
      
      private function onItemPress(param1:MouseEvent) : void
      {
         this._currentItem = param1.currentTarget as ShuffleGridItem;
         this._currentItem.addEventListener(MouseEvent.MOUSE_OUT,this.onItemRelease);
         this._currentItem.alpha = this.itemAlphaOff;
         this._currentItem.startDrag();
         stage.addEventListener(MouseEvent.MOUSE_MOVE,this.onItemMove);
         addChild(this._currentItem);
      }
      
      private function onItemMove(param1:MouseEvent) : void
      {
         this.shuffleItems();
      }
      
      private function onItemRelease(param1:MouseEvent) : void
      {
         this._currentItem.removeEventListener(MouseEvent.MOUSE_OUT,this.onItemRelease);
         this._currentItem.alpha = 1;
         this._currentItem.stopDrag();
         stage.removeEventListener(MouseEvent.MOUSE_MOVE,this.onItemMove);
         this.snapToGrid(this._dictionary[this._currentItem]);
      }
   }
}

import ui.levelorderer.ShuffleGridItem;

class ShuffleGridItemVO
{
    
   
   public var row:int;
   
   public var col:int;
   
   public var item:ShuffleGridItem;
   
   function ShuffleGridItemVO()
   {
      super();
   }
}

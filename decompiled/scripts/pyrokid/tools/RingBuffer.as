package pyrokid.tools
{
   public class RingBuffer
   {
       
      
      private var maxItems:int;
      
      public var buffer:Array;
      
      private var head:int = 0;
      
      private var _size:int = 0;
      
      private var evictFcn:Function;
      
      private var markedForDel:HashSet;
      
      public function RingBuffer(param1:int, param2:Function = null)
      {
         super();
         this.maxItems = param1;
         this.buffer = new Array(param1);
         var _loc3_:int = 0;
         while(_loc3_ < param1)
         {
            this.buffer[_loc3_] = null;
            _loc3_++;
         }
         this.markedForDel = new HashSet(true);
         this.evictFcn = param2;
      }
      
      public function size() : int
      {
         return this._size;
      }
      
      public function push(param1:Object) : void
      {
         var _loc2_:Object = this.buffer[this.head];
         if(_loc2_ != null)
         {
            this.evict(_loc2_);
         }
         this.buffer[this.head] = param1;
         this.head = this.clamp(this.head + 1);
         if(this._size < this.maxItems)
         {
            ++this._size;
         }
      }
      
      public function pop() : Object
      {
         var _loc1_:Object = null;
         if(this._size > 0)
         {
            _loc1_ = this.buffer[this.tail()];
            this.evict(this.buffer[this.tail()]);
            this.buffer[this.tail()] = null;
            --this._size;
            return _loc1_;
         }
         return null;
      }
      
      public function peek() : Object
      {
         if(this._size > 0)
         {
            return this.buffer[this.tail()];
         }
         return null;
      }
      
      private function tail() : int
      {
         return this.clamp(this.head - this._size);
      }
      
      public function get(param1:int) : Object
      {
         var _loc2_:int = this.clamp(this.tail() + param1);
         return this.buffer[_loc2_];
      }
      
      public function markForDeletion(param1:Object) : void
      {
         this.markedForDel.add(param1);
      }
      
      public function deleteAllMarked() : void
      {
         var _loc5_:int = 0;
         var _loc6_:Object = null;
         var _loc1_:Array = this.buffer.slice();
         var _loc2_:int = this.head;
         var _loc3_:int = this._size;
         this.buffer = new Array(this.maxItems);
         var _loc4_:int = 0;
         while(_loc4_ < this.maxItems)
         {
            this.buffer[_loc4_] = null;
            _loc4_++;
         }
         this.head = 0;
         this._size = 0;
         _loc4_ = 0;
         while(_loc4_ < _loc3_)
         {
            _loc5_ = this.clamp(_loc2_ - _loc3_ + _loc4_);
            _loc6_ = _loc1_[_loc5_];
            if(this.markedForDel.contains(_loc6_))
            {
               this.evict(_loc6_);
            }
            else
            {
               this.push(_loc1_[_loc5_]);
            }
            _loc4_++;
         }
         this.markedForDel = new HashSet(true);
      }
      
      public function remove(param1:Object) : void
      {
         this.markForDeletion(param1);
         this.deleteAllMarked();
      }
      
      public function contains(param1:Object) : Boolean
      {
         return this.buffer.indexOf(param1) != -1;
      }
      
      public function filter(param1:Function) : void
      {
         var _loc3_:Object = null;
         var _loc2_:int = 0;
         while(_loc2_ < this.size())
         {
            _loc3_ = this.get(_loc2_);
            if(!param1(_loc3_))
            {
               this.markForDeletion(_loc3_);
            }
            _loc2_++;
         }
         this.deleteAllMarked();
      }
      
      private function clamp(param1:int) : int
      {
         return (param1 + this.maxItems) % this.maxItems;
      }
      
      private function evict(param1:Object) : void
      {
         if(this.evictFcn != null)
         {
            this.evictFcn(param1);
         }
      }
   }
}

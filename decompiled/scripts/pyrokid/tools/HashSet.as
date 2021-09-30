package pyrokid.tools
{
   import flash.utils.Dictionary;
   
   public dynamic class HashSet extends Dictionary
   {
       
      
      private var identity:Boolean;
      
      public function HashSet(param1:Boolean = false)
      {
         super();
         this.identity = param1;
      }
      
      public function add(param1:*) : void
      {
         if(param1 == null)
         {
            throw new Error("Cannot use null in HashSet");
         }
         this[this.getKey(param1)] = param1;
      }
      
      public function remove(param1:*) : void
      {
         if(param1 == null)
         {
            throw new Error("Cannot use null in HashSet");
         }
         delete this[this.getKey(param1)];
      }
      
      public function contains(param1:*) : Boolean
      {
         if(param1 == null)
         {
            throw new Error("Cannot use null in HashSet");
         }
         return this[this.getKey(param1)] != undefined;
      }
      
      public function toArray() : Array
      {
         var _loc2_:* = undefined;
         var _loc1_:Array = [];
         for each(_loc2_ in this)
         {
            _loc1_.push(_loc2_);
         }
         return _loc1_;
      }
      
      private function getKey(param1:*) : *
      {
         return !!this.identity ? param1 : param1.toString();
      }
   }
}

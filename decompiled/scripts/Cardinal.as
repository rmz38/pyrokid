package
{
   public class Cardinal
   {
      
      public static var NX:int = 0;
      
      public static var PX:int = 1;
      
      public static var NY:int = 2;
      
      public static var PY:int = 3;
      
      public static var DIRECTIONS:Array = [NX,PX,NY,PY];
      
      public static var DIRECTION_VECTORS:Array = [new Vector2i(-1,0),new Vector2i(1,0),new Vector2i(0,-1),new Vector2i(0,1)];
       
      
      public function Cardinal()
      {
         super();
      }
      
      public static function isValidDir(param1:int) : Boolean
      {
         return DIRECTIONS.indexOf(param1) != -1;
      }
      
      public static function getOpposite(param1:int) : int
      {
         switch(param1)
         {
            case NX:
               return PX;
            case PX:
               return NX;
            case NY:
               return PY;
            case PY:
               return NY;
            default:
               throw new Error("not a real direction");
         }
      }
      
      public static function getVector2i(param1:int) : Vector2i
      {
         var _loc2_:Vector2i = DIRECTION_VECTORS[param1];
         if(_loc2_ == undefined)
         {
            throw new Error("not a real direction");
         }
         return _loc2_.copy();
      }
      
      public static function getDir(param1:Vector2i) : int
      {
         var _loc2_:int = 0;
         while(_loc2_ < DIRECTION_VECTORS.length)
         {
            if(param1.x == DIRECTION_VECTORS[_loc2_].x && param1.y == DIRECTION_VECTORS[_loc2_].y)
            {
               return _loc2_;
            }
            _loc2_++;
         }
         throw new Error("not a real direction vector");
      }
   }
}

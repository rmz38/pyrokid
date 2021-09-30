package pyrokid
{
   public class LevelRecipe
   {
       
      
      public var walls:Array;
      
      public var islands:Array;
      
      public var tileEntities:Array;
      
      public var edges:Array;
      
      public var playerStart:Array;
      
      public var freeEntities:Array;
      
      public function LevelRecipe()
      {
         super();
      }
      
      public static function generateTemplate(param1:int = 16, param2:int = 12) : LevelRecipe
      {
         var rec:LevelRecipe = null;
         var cellsWide:int = param1;
         var cellsTall:int = param2;
         rec = new LevelRecipe();
         rec.islands = Utils.newArray(cellsWide,cellsTall);
         rec.tileEntities = Utils.newArray(cellsWide,cellsTall);
         rec.walls = Utils.newArray(cellsWide,cellsTall);
         rec.edges = Utils.newArray(cellsWide,cellsTall);
         var id:int = 1;
         Utils.foreach(rec.walls,function(param1:int, param2:int, param3:int):void
         {
            var _loc6_:Array = null;
            var _loc5_:int = !!(_loc4_ = Boolean(param2 == 0 || param1 == 0 || param2 == cellsTall - 1 || param1 == cellsWide - 1)) ? 1 : 0;
            rec.walls[param2][param1] = _loc5_;
            if(_loc4_)
            {
               (_loc6_ = new Array(4))[Cardinal.PX] = (param2 == 0 || param2 == cellsTall - 1) && param1 != cellsWide - 1;
               _loc6_[Cardinal.NX] = (param2 == 0 || param2 == cellsTall - 1) && param1 != 0;
               _loc6_[Cardinal.PY] = (param1 == 0 || param1 == cellsWide - 1) && param2 != cellsTall - 1;
               _loc6_[Cardinal.NY] = (param1 == 0 || param1 == cellsWide - 1) && param2 != 0;
               rec.islands[param2][param1] = Utils.getIntFromBooleans(_loc6_);
            }
            else
            {
               rec.islands[param2][param1] = 0;
            }
            rec.tileEntities[param2][param1] = _loc5_;
            rec.edges[param2][param1] = 0;
         });
         rec.playerStart = [1,cellsTall - 2];
         rec.freeEntities = [];
         return rec;
      }
      
      public static function complete(param1:Object) : void
      {
         var recipe:Object = param1;
         if(recipe.freeEntities == null)
         {
            recipe.freeEntities = [];
         }
         if(recipe.playerStart == null)
         {
            recipe.playerStart = [1,Utils.getH(recipe.walls) - 2];
         }
         if(recipe.islands == null)
         {
            recipe.islands = Utils.newArrayOfSize(recipe.walls);
         }
         if(recipe.tileEntities == null)
         {
            recipe.tileEntities = Utils.newArrayOfSize(recipe.walls);
         }
         if(recipe.edges == null)
         {
            recipe.edges = Utils.newArrayOfSize(recipe.walls);
            Utils.foreach(recipe.edges,function(param1:int, param2:int, param3:int):void
            {
               recipe.edges[param2][param1] = 0;
            });
         }
      }
   }
}

package physics
{
   public class CollisionResolver
   {
      
      public static var DISTANCE_TOLERANCE:Number = 1.05;
      
      public static var OFFSET_TOLERANCE:Number = 0.05;
      
      public static var MAX_MOTION:Number = 0.2;
      
      public static var MAX_MOTION_ENT:Number = 0.205;
       
      
      public function CollisionResolver()
      {
         super();
      }
      
      public static function ClampedMotion(param1:Number) : Number
      {
         if(param1 < -MAX_MOTION)
         {
            return -MAX_MOTION;
         }
         if(param1 > MAX_MOTION)
         {
            return MAX_MOTION;
         }
         return param1;
      }
      
      public static function ClampedMotionEntity(param1:Number) : Number
      {
         if(param1 < -MAX_MOTION_ENT)
         {
            return -MAX_MOTION_ENT;
         }
         if(param1 > MAX_MOTION_ENT)
         {
            return MAX_MOTION_ENT;
         }
         return param1;
      }
      
      public static function ConstructEdges(param1:Array) : Array
      {
         var _loc5_:int = 0;
         var _loc2_:Array = [];
         var _loc3_:Vector2 = new Vector2(0,0);
         var _loc4_:int = 0;
         while(_loc4_ < param1.length)
         {
            _loc5_ = 0;
            while(_loc5_ < param1[_loc4_].length)
            {
               if(param1[_loc4_][_loc5_] != null)
               {
                  _loc3_.Set(_loc5_,_loc4_);
                  param1[_loc4_][_loc5_].ProvideEdgesSpecial(_loc2_,_loc3_);
                  if(_loc5_ == 0 || param1[_loc4_][_loc5_ - 1] == null)
                  {
                     param1[_loc4_][_loc5_].ProvideEdgesDirection(Cardinal.NX,_loc2_,_loc3_);
                  }
                  if(_loc5_ == param1[_loc4_].length - 1 || param1[_loc4_][_loc5_ + 1] == null)
                  {
                     param1[_loc4_][_loc5_].ProvideEdgesDirection(Cardinal.PX,_loc2_,_loc3_);
                  }
                  if(_loc4_ == 0 || param1[_loc4_ - 1][_loc5_] == null)
                  {
                     param1[_loc4_][_loc5_].ProvideEdgesDirection(Cardinal.NY,_loc2_,_loc3_);
                  }
                  if(_loc4_ == param1.length - 1 || param1[_loc4_ + 1][_loc5_] == null)
                  {
                     param1[_loc4_][_loc5_].ProvideEdgesDirection(Cardinal.PY,_loc2_,_loc3_);
                  }
               }
               _loc5_++;
            }
            _loc4_++;
         }
         return _loc2_;
      }
      
      public static function Resolve(param1:PhysRectangle, param2:Array, param3:Function = null, param4:Function = null) : void
      {
         var xBounds:Vector2i = null;
         var yBounds:Vector2i = null;
         var i:PhysIsland = null;
         var a:CollisionAccumulator = null;
         var pc:PossibleTile = null;
         var opt:PhysCallbackOptions = null;
         var doResolve:Boolean = false;
         var iy:int = 0;
         var ix:int = 0;
         var dx:* = undefined;
         var dy:* = undefined;
         var r:PhysRectangle = param1;
         var iList:Array = param2;
         var fCallback:Function = param3;
         var fCollisionCallback:Function = param4;
         var possibleCollisions:Array = [];
         var disp:Vector2 = new Vector2();
         xBounds = new Vector2i();
         yBounds = new Vector2i();
         var iBounds:PRect = new PRect();
         for each(i in iList)
         {
            iBounds.center.Set(i.tilesWidth,i.tilesHeight).MulD(0.5).Add(i.globalAnchor.x,i.globalAnchor.y);
            iBounds.halfSize.Set(i.tilesWidth,i.tilesHeight).MulD(0.5).AddD(0.5);
            if(PRect.intersects(iBounds,r.rect,disp))
            {
               r.center.SubV(i.globalAnchor);
               xBounds.x = MathHelper.clampI(int(r.NX - 0.5),0,i.tilesWidth - 1);
               xBounds.y = MathHelper.clampI(int(r.PX + 0.5),0,i.tilesWidth - 1);
               yBounds.x = MathHelper.clampI(int(r.NY - 0.5),0,i.tilesHeight - 1);
               yBounds.y = MathHelper.clampI(int(r.PY + 0.5),0,i.tilesHeight - 1);
               r.center.AddV(i.globalAnchor);
               iy = yBounds.x;
               while(iy <= yBounds.y)
               {
                  ix = xBounds.x;
                  while(ix <= xBounds.y)
                  {
                     if(i.tileGrid[iy][ix] != null)
                     {
                        possibleCollisions.push(new PossibleTile(i,ix,iy));
                     }
                     ix++;
                  }
                  iy++;
               }
            }
         }
         cullEdges(possibleCollisions);
         r.rect.center.SubV(r.motion);
         possibleCollisions = possibleCollisions.sort(function(param1:PossibleTile, param2:PossibleTile):Number
         {
            var _loc3_:* = tileDistanceSq(param1,r.rect,r.velocity);
            var _loc4_:* = tileDistanceSq(param2,r.rect,r.velocity);
            return _loc3_ - _loc4_;
         });
         r.rect.center.AddV(r.motion);
         a = new CollisionAccumulator();
         for each(pc in possibleCollisions)
         {
            resolve(r,pc,a,fCollisionCallback);
         }
         opt = new PhysCallbackOptions();
         doResolve = fCallback == null ? true : Boolean(fCallback.call(null,r,a,opt));
         if(doResolve)
         {
            dx = a.accumPX - a.accumNX;
            dy = a.accumPY - a.accumNY;
            if(dx != 0 && opt.breakXVelocity)
            {
               r.velocity.x = 0;
            }
            if(dy != 0 && opt.breakYVelocity)
            {
               r.velocity.y = 0;
            }
            if(opt.resolveXDisplacement)
            {
               r.center.x += dx;
            }
            if(opt.resolveYDisplacement)
            {
               r.center.y += dy;
            }
         }
      }
      
      private static function tileDistanceSq(param1:PossibleTile, param2:PRect, param3:Vector2) : Number
      {
         var _loc4_:Number = 0;
         if(param2.center.x < param1.rect.center.x)
         {
            _loc4_ = param2.center.x + param2.halfSize.x;
         }
         else
         {
            _loc4_ = param2.center.x - param2.halfSize.x;
         }
         var _loc5_:Number = 0;
         if(param2.center.y < param1.rect.center.y)
         {
            _loc5_ = param2.center.y + param2.halfSize.y;
         }
         else
         {
            _loc5_ = param2.center.y - param2.halfSize.y;
         }
         _loc4_ -= param1.rect.center.x;
         _loc5_ -= param1.rect.center.y;
         return _loc4_ * _loc4_ + _loc5_ * _loc5_;
      }
      
      public static function cullEdges(param1:Array) : void
      {
         var _loc3_:int = 0;
         var _loc2_:int = 0;
         while(_loc2_ < param1.length - 1)
         {
            _loc3_ = _loc2_ + 1;
            while(_loc3_ < param1.length)
            {
               checkEdges(param1[_loc2_],param1[_loc3_]);
               _loc3_++;
            }
            _loc2_++;
         }
      }
      
      private static function checkEdges(param1:PossibleTile, param2:PossibleTile) : void
      {
         if(Math.abs(param1.rect.center.x - param2.rect.center.x) < DISTANCE_TOLERANCE)
         {
            if(Math.abs(param1.rect.center.y - param2.rect.center.y) < OFFSET_TOLERANCE)
            {
               if(param1.rect.center.x < param2.rect.center.x)
               {
                  param1.collidePX = false;
                  param2.collideNX = false;
               }
               else
               {
                  param1.collideNX = false;
                  param2.collidePX = false;
               }
            }
         }
         if(Math.abs(param1.rect.center.y - param2.rect.center.y) < DISTANCE_TOLERANCE)
         {
            if(Math.abs(param1.rect.center.x - param2.rect.center.x) < OFFSET_TOLERANCE)
            {
               if(param1.rect.center.y < param2.rect.center.y)
               {
                  param1.collidePY = false;
                  param2.collideNY = false;
               }
               else
               {
                  param1.collideNY = false;
                  param2.collidePY = false;
               }
            }
         }
      }
      
      private static function resolvePass(param1:PhysRectangle, param2:Array, param3:Function, param4:Function) : *
      {
         var _loc6_:PossibleTile = null;
         var _loc7_:PhysCallbackOptions = null;
         var _loc8_:Boolean = false;
         var _loc9_:* = undefined;
         var _loc10_:* = undefined;
         var _loc5_:CollisionAccumulator = new CollisionAccumulator();
         for each(_loc6_ in param2)
         {
            resolve(param1,_loc6_,_loc5_,param4);
         }
         _loc7_ = new PhysCallbackOptions();
         if(_loc8_ = param3 == null ? true : Boolean(param3.call(null,param1,_loc5_,_loc7_)))
         {
            _loc9_ = _loc5_.accumPX - _loc5_.accumNX;
            _loc10_ = _loc5_.accumPY - _loc5_.accumNY;
            if(_loc9_ != 0 && _loc7_.breakXVelocity)
            {
               param1.velocity.x = 0;
            }
            if(_loc10_ != 0 && _loc7_.breakYVelocity)
            {
               param1.velocity.y = 0;
            }
            if(_loc7_.resolveXDisplacement)
            {
               param1.center.x += _loc9_;
            }
            if(_loc7_.resolveYDisplacement)
            {
               param1.center.y += _loc10_;
            }
         }
      }
      
      private static function resolve(param1:PhysRectangle, param2:PossibleTile, param3:CollisionAccumulator, param4:Function) : void
      {
         var _loc5_:Vector2 = new Vector2(param1.center.x,param1.center.y).SubV(param2.rect.center);
         var _loc6_:*;
         if((_loc6_ = new Vector2(_loc5_.x,_loc5_.y)).x < 0)
         {
            _loc6_.x = -_loc6_.x;
         }
         if(_loc6_.y < 0)
         {
            _loc6_.y = -_loc6_.y;
         }
         _loc6_.SubV(param1.rect.halfSize).SubV(param2.rect.halfSize);
         var _loc7_:* = _loc6_.x < _loc6_.y;
         var _loc8_:* = 0;
         var _loc9_:* = 0;
         var _loc10_:Vector2 = new Vector2(param1.velocity.x,param1.velocity.y).SubV(param2.island.velocity);
         if(param1.rect.NX <= param2.rect.PX && param1.rect.PX >= param2.rect.NX && param1.rect.NY <= param2.rect.PY && param1.rect.PY >= param2.rect.NY)
         {
            if(param2.collidePX && _loc5_.x > 0 && _loc10_.x < 0)
            {
               if(param1.rect.NX < param2.rect.PX)
               {
                  _loc8_ = param2.rect.PX - param1.rect.NX;
               }
            }
            else if(param2.collideNX && _loc5_.x < 0 && _loc10_.x > 0)
            {
               if(param1.rect.PX > param2.rect.NX)
               {
                  _loc8_ = param2.rect.NX - param1.rect.PX;
               }
            }
            if(param2.collidePY && _loc5_.y > 0 && _loc10_.y < 0)
            {
               if(param1.rect.NY < param2.rect.PY)
               {
                  _loc9_ = param2.rect.PY - param1.rect.NY;
               }
            }
            else if(param2.collideNY && _loc5_.y < 0 && _loc10_.y > 0)
            {
               if(param1.rect.PY > param2.rect.NY)
               {
                  _loc9_ = param2.rect.NY - param1.rect.PY;
               }
            }
         }
         if(_loc8_ == 0 && _loc9_ == 0)
         {
            return;
         }
         _loc8_ *= 1.02;
         if(_loc9_ == 0 || _loc8_ != 0 && Math.abs(_loc8_) < Math.abs(_loc9_))
         {
            if(_loc8_ < 0)
            {
               param3.accumNX = Math.max(param3.accumNX,-_loc8_);
               if(param4 != null)
               {
                  param4.call(null,new PhysEdge(Cardinal.NX,param2.rect.NX,param2.rect.center.y,1),param2.island.globalAnchor);
               }
            }
            else
            {
               param3.accumPX = Math.max(param3.accumPX,_loc8_);
               if(param4 != null)
               {
                  param4.call(null,new PhysEdge(Cardinal.PX,param2.rect.PX,param2.rect.center.y,1),param2.island.globalAnchor);
               }
            }
         }
         else if(_loc9_ < 0)
         {
            param3.accumNY = Math.max(param3.accumNY,-_loc9_);
            if(param4 != null)
            {
               param4.call(null,new PhysEdge(Cardinal.NY,param2.rect.center.x,param2.rect.NY,1),param2.island.globalAnchor);
            }
         }
         else
         {
            param3.accumPY = Math.max(param3.accumPY,_loc9_);
            if(param4 != null)
            {
               param4.call(null,new PhysEdge(Cardinal.PY,param2.rect.center.x,param2.rect.PY,1),param2.island.globalAnchor);
            }
         }
      }
   }
}

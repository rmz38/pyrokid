package pyrokid.graphics
{
   import flash.display.Bitmap;
   import flash.display.BitmapData;
   import flash.display.PixelSnapping;
   import flash.geom.Matrix;
   import flash.geom.Rectangle;
   
   public class ConnectedSpriteBuilder
   {
       
      
      public function ConnectedSpriteBuilder()
      {
         super();
      }
      
      public static function buildSpriteFromCoors(param1:Array, param2:Vector2i, param3:Boolean, param4:Bitmap, param5:int, param6:int) : Bitmap
      {
         var _loc7_:Vector2i = null;
         var _loc8_:Vector2i = null;
         var _loc9_:Vector2i = null;
         var _loc10_:* = undefined;
         var _loc12_:Object = null;
         _loc8_ = new Vector2i();
         _loc9_ = new Vector2i();
         for each(_loc7_ in param1)
         {
            _loc8_.x = Math.min(_loc8_.x,_loc7_.x);
            _loc8_.y = Math.min(_loc8_.y,_loc7_.y);
            _loc9_.x = Math.max(_loc9_.x,_loc7_.x);
            _loc9_.y = Math.max(_loc9_.y,_loc7_.y);
         }
         _loc10_ = [0,0,0,0];
         if(_loc8_.x + param2.x == 0 && param3)
         {
            _loc10_[Cardinal.NX] = 1;
         }
         if(_loc8_.y + param2.y == 0 && param3)
         {
            _loc10_[Cardinal.NY] = 1;
         }
         if(_loc9_.x + param2.x == param5 - 1 && param3)
         {
            _loc10_[Cardinal.PX] = 1;
         }
         if(_loc9_.y + param2.y == param6 - 1 && param3)
         {
            _loc10_[Cardinal.PY] = 1;
         }
         _loc9_.AddD(1);
         var _loc11_:Array = Utils.newArray(_loc9_.x,_loc9_.y);
         for each(_loc7_ in param1)
         {
            _loc11_[_loc7_.y][_loc7_.x] = 1;
         }
         (_loc12_ = new Object())["1"] = param4.bitmapData;
         return buildSprite(_loc11_,_loc12_,new ConnectedSpriteOptions(),_loc10_);
      }
      
      public static function buildSprite(param1:Array, param2:Object, param3:ConnectedSpriteOptions, param4:Array) : Bitmap
      {
         var _loc8_:* = undefined;
         var _loc13_:* = undefined;
         var _loc14_:int = 0;
         var _loc15_:int = 0;
         var _loc16_:int = 0;
         var _loc17_:int = 0;
         var _loc18_:Matrix = null;
         var _loc19_:BitmapData = null;
         var _loc5_:int = param1.length;
         var _loc6_:int = param1[0].length;
         var _loc7_:* = new Array(_loc5_ + 2);
         _loc8_ = 0;
         while(_loc8_ < _loc7_.length)
         {
            _loc7_[_loc8_] = new Array(_loc6_ + 2);
            _loc13_ = 0;
            while(_loc13_ < _loc7_[_loc8_].length)
            {
               if(_loc13_ == 0)
               {
                  _loc7_[_loc8_][_loc13_] = param4[Cardinal.NX];
               }
               else if(_loc8_ == 0)
               {
                  _loc7_[_loc8_][_loc13_] = param4[Cardinal.NY];
               }
               else if(_loc13_ == _loc6_ + 1)
               {
                  _loc7_[_loc8_][_loc13_] = param4[Cardinal.PX];
               }
               else if(_loc8_ == _loc5_ + 1)
               {
                  _loc7_[_loc8_][_loc13_] = param4[Cardinal.PY];
               }
               else
               {
                  _loc7_[_loc8_][_loc13_] = param1[_loc8_ - 1][_loc13_ - 1];
               }
               _loc13_++;
            }
            _loc8_++;
         }
         var _loc9_:Array = ConnectedAtlasStitcher.getConnectedTextureIndices(_loc7_);
         var _loc10_:BitmapData = new BitmapData(_loc6_ * param3.imageTileSize,_loc5_ * param3.imageTileSize,true,0);
         var _loc11_:Bitmap = new Bitmap(_loc10_,PixelSnapping.ALWAYS,true);
         var _loc12_:Rectangle = new Rectangle(0,0,param3.imageTileSize,param3.imageTileSize);
         _loc8_ = 0;
         while(_loc8_ < _loc5_)
         {
            _loc13_ = 0;
            while(_loc13_ < _loc6_)
            {
               if((_loc14_ = param1[_loc8_][_loc13_]) != 0 && param2.hasOwnProperty(_loc14_))
               {
                  _loc16_ = (_loc15_ = _loc9_[_loc8_][_loc13_]) % 12;
                  _loc17_ = _loc15_ / 12;
                  _loc12_.x = param3.imageTileSize * _loc13_;
                  _loc12_.y = param3.imageTileSize * _loc8_;
                  (_loc18_ = new Matrix()).translate((_loc13_ - _loc16_) * param3.imageTileSize,(_loc8_ - _loc17_) * param3.imageTileSize);
                  _loc19_ = param2[param1[_loc8_][_loc13_]];
                  _loc10_.draw(_loc19_,_loc18_,null,null,_loc12_,false);
               }
               _loc13_++;
            }
            _loc8_++;
         }
         _loc11_.width = param3.spriteTileSize * _loc6_;
         _loc11_.height = param3.spriteTileSize * _loc5_;
         return _loc11_;
      }
   }
}

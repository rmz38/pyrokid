package pyrokid.graphics
{
   public class ConnectedAtlasStitcher
   {
      
      private static var ico:int = 0;
      
      private static var connectedTextureOffsets:Array = new Array(256);
      
      {
         while(ico < 256)
         {
            connectedTextureOffsets[ico] = 0;
            ++ico;
         }
         connectedTextureOffsets[255] = 0;
         connectedTextureOffsets[239] = 1;
         connectedTextureOffsets[238] = 2;
         connectedTextureOffsets[254] = 3;
         connectedTextureOffsets[235] = 4;
         connectedTextureOffsets[250] = 5;
         connectedTextureOffsets[171] = 6;
         connectedTextureOffsets[234] = 7;
         connectedTextureOffsets[138] = 8;
         connectedTextureOffsets[162] = 9;
         connectedTextureOffsets[40] = 10;
         connectedTextureOffsets[10] = 11;
         connectedTextureOffsets[251] = 12;
         connectedTextureOffsets[227] = 13;
         connectedTextureOffsets[224] = 14;
         connectedTextureOffsets[248] = 15;
         connectedTextureOffsets[175] = 16;
         connectedTextureOffsets[190] = 17;
         connectedTextureOffsets[174] = 18;
         connectedTextureOffsets[186] = 19;
         connectedTextureOffsets[42] = 20;
         connectedTextureOffsets[168] = 21;
         connectedTextureOffsets[160] = 22;
         connectedTextureOffsets[130] = 23;
         connectedTextureOffsets[187] = 24;
         connectedTextureOffsets[131] = 25;
         connectedTextureOffsets[0] = 26;
         connectedTextureOffsets[56] = 27;
         connectedTextureOffsets[163] = 28;
         connectedTextureOffsets[232] = 29;
         connectedTextureOffsets[139] = 30;
         connectedTextureOffsets[226] = 31;
         connectedTextureOffsets[8] = 32;
         connectedTextureOffsets[2] = 33;
         connectedTextureOffsets[136] = 34;
         connectedTextureOffsets[34] = 35;
         connectedTextureOffsets[191] = 36;
         connectedTextureOffsets[143] = 37;
         connectedTextureOffsets[14] = 38;
         connectedTextureOffsets[62] = 39;
         connectedTextureOffsets[142] = 40;
         connectedTextureOffsets[58] = 41;
         connectedTextureOffsets[46] = 42;
         connectedTextureOffsets[184] = 43;
         connectedTextureOffsets[32] = 44;
         connectedTextureOffsets[128] = 45;
         connectedTextureOffsets[170] = 46;
      }
      
      public function ConnectedAtlasStitcher()
      {
         super();
      }
      
      public static function getConnectedTextureIndices(param1:Array) : Array
      {
         var _loc6_:int = 0;
         var _loc2_:int = param1.length - 2;
         var _loc3_:int = param1[0].length - 2;
         var _loc4_:* = new Array(_loc2_);
         var _loc5_:int = 1;
         while(_loc5_ <= _loc2_)
         {
            _loc4_[_loc5_ - 1] = new Array(_loc3_);
            _loc6_ = 1;
            while(_loc6_ <= _loc3_)
            {
               _loc4_[_loc5_ - 1][_loc6_ - 1] = getConnectedTextureOffset(param1,_loc6_,_loc5_);
               _loc6_++;
            }
            _loc5_++;
         }
         return _loc4_;
      }
      
      private static function getConnectedTextureOffset(param1:Array, param2:int, param3:int) : int
      {
         var _loc4_:* = 0;
         var _loc5_:int = param1[param3][param2];
         if(param1[param3 - 1][param2 - 1] != _loc5_)
         {
            _loc4_ |= 128;
         }
         if(param1[param3 - 1][param2] != _loc5_)
         {
            _loc4_ |= 224;
         }
         if(param1[param3 - 1][param2 + 1] != _loc5_)
         {
            _loc4_ |= 32;
         }
         if(param1[param3][param2 + 1] != _loc5_)
         {
            _loc4_ |= 56;
         }
         if(param1[param3 + 1][param2 + 1] != _loc5_)
         {
            _loc4_ |= 8;
         }
         if(param1[param3 + 1][param2] != _loc5_)
         {
            _loc4_ |= 14;
         }
         if(param1[param3 + 1][param2 - 1] != _loc5_)
         {
            _loc4_ |= 2;
         }
         if(param1[param3][param2 - 1] != _loc5_)
         {
            _loc4_ |= 131;
         }
         return connectedTextureOffsets[_loc4_];
      }
   }
}

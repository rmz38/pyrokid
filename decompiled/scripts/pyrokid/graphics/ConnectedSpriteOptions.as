package pyrokid.graphics
{
   public class ConnectedSpriteOptions
   {
      
      public static var DEFAULT_SPRITE_TILE_SIZE = 50;
      
      public static var DEFAULT_IMAGE_TILE_SIZE = 50;
       
      
      public var spriteTileSize:int;
      
      public var imageTileSize:int;
      
      public function ConnectedSpriteOptions()
      {
         this.spriteTileSize = DEFAULT_SPRITE_TILE_SIZE;
         this.imageTileSize = DEFAULT_IMAGE_TILE_SIZE;
         super();
      }
   }
}

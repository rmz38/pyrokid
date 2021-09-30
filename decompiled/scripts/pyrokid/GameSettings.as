package pyrokid
{
   import flash.media.SoundMixer;
   import flash.ui.Keyboard;
   
   public class GameSettings
   {
      
      private static var _soundOn:Boolean = true;
      
      private static var _musicOn:Boolean = Constants.MUSIC_STARTS_ON;
      
      private static var _controlsInverted:Boolean = Constants.CONTROLS_START_INVERTED;
       
      
      public function GameSettings()
      {
         super();
      }
      
      public static function get soundOn() : Boolean
      {
         return _soundOn;
      }
      
      public static function get musicOn() : Boolean
      {
         return _musicOn;
      }
      
      public static function get controlSchemeInverted() : Boolean
      {
         return _controlsInverted;
      }
      
      public static function toggleSound() : void
      {
         _soundOn = !_soundOn;
      }
      
      public static function toggleMusic() : void
      {
         _musicOn = !_musicOn;
         if(_musicOn)
         {
            Embedded.musicSound.play(0,999999);
         }
         else
         {
            SoundMixer.stopAll();
         }
      }
      
      public static function toggleControlScheme() : void
      {
         _controlsInverted = !_controlsInverted;
      }
      
      public static function get leftBtn() : int
      {
         return !!_controlsInverted ? int(Keyboard.LEFT) : int(Keyboard.A);
      }
      
      public static function get rightBtn() : int
      {
         return !!_controlsInverted ? int(Keyboard.RIGHT) : int(Keyboard.D);
      }
      
      public static function get jumpBtn() : int
      {
         return !!_controlsInverted ? int(Keyboard.UP) : int(Keyboard.W);
      }
      
      public static function get shootLeftBtn() : int
      {
         return !!_controlsInverted ? int(Keyboard.A) : int(Keyboard.LEFT);
      }
      
      public static function get shootRightBtn() : int
      {
         return !!_controlsInverted ? int(Keyboard.D) : int(Keyboard.RIGHT);
      }
      
      public static function get shootUpBtn() : int
      {
         return !!_controlsInverted ? int(Keyboard.W) : int(Keyboard.UP);
      }
      
      public static function get shootDownBtn() : int
      {
         return !!_controlsInverted ? int(Keyboard.S) : int(Keyboard.DOWN);
      }
   }
}

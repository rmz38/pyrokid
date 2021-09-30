package ui.playstates
{
   public class Credits extends BasePlayState
   {
       
      
      public function Credits()
      {
         super();
         var _loc1_:* = "\n\n\nCREDITS:\n\n";
         _loc1_ += "Created by:\nNick Cheng, Michelle Liu, Aaron Nelson, Evan Niederhoffer, Cristian Zaloj\n\n";
         _loc1_ += "Music by WISP X\n\n";
         _loc1_ += "\"QUICK_SMASH_002.wav\" by JoelAudio used under Creative Commons Attribution 3.0 License \n https://www.freesound.org/people/JoelAudio/sounds/135461/\n\n";
         _loc1_ += "\"groan.aiff\" by SoundCollectah used under CC0 Public Domain Dedication License \n https://www.freesound.org/people/SoundCollectah/sounds/108927/\n\n";
         _loc1_ += "\"Bomb - Small\" by Zangrutz used under Creative Commons Attribution 3.0 License \n https://www.freesound.org/people/Zangrutz/sounds/155235/\n\n";
         _loc1_ += "\"Filth squash2.wav\" by gelo_papas used under Creative Commons Attribution 3.0 License \n http://www.freesound.org/people/gelo_papas/sounds/47341/\n\n";
         addTextToScreen(_loc1_,800,600,400,300);
         createReturnToMainMenuButton().setCorner(10,10);
      }
   }
}

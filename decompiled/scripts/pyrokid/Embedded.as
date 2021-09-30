package pyrokid
{
   import flash.media.Sound;
   import flash.utils.ByteArray;
   import flash.utils.Dictionary;
   
   public class Embedded
   {
      
      public static var levelObjToString:Dictionary = new Dictionary();
      
      public static var BrickBuildingBMP:Class = Embedded_BrickBuildingBMP;
      
      public static var HouseBMP:Class = Embedded_HouseBMP;
      
      public static var Mob:Class = Embedded_Mob;
      
      public static var Talisman:Class = Embedded_Talisman;
      
      public static var TalismanObtain:Class = Embedded_TalismanObtain;
      
      public static var CheckIcon:Class = Embedded_CheckIcon;
      
      public static var SoundIcon:Class = Embedded_SoundIcon;
      
      public static var SoundMutedIcon:Class = Embedded_SoundMutedIcon;
      
      public static var MusicIcon:Class = Embedded_MusicIcon;
      
      public static var MusicMutedIcon:Class = Embedded_MusicMutedIcon;
      
      public static var ControlsDefaultIcon:Class = Embedded_ControlsDefaultIcon;
      
      public static var ControlsInvertedIcon:Class = Embedded_ControlsInvertedIcon;
      
      private static var FirstIntroTown:Class = Embedded_FirstIntroTown;
      
      public static var firstIntroTown:ByteArray = new FirstIntroTown();
      
      private static var MazeRunner:Class = Embedded_MazeRunner;
      
      public static var mazeRunner:ByteArray = new MazeRunner();
      
      private static var NewBlankLevel:Class = Embedded_NewBlankLevel;
      
      public static var newBlankLevel:ByteArray = new NewBlankLevel();
      
      private static var SecondIntroTown:Class = Embedded_SecondIntroTown;
      
      public static var secondIntroTown:ByteArray = new SecondIntroTown();
      
      private static var ThirdIntroTown:Class = Embedded_ThirdIntroTown;
      
      public static var thirdIntroTown:ByteArray = new ThirdIntroTown();
      
      private static var FourthIntroTown:Class = Embedded_FourthIntroTown;
      
      public static var fourthIntroTown:ByteArray = new FourthIntroTown();
      
      private static var IntroFallUnderground:Class = Embedded_IntroFallUnderground;
      
      public static var introFallUnderground:ByteArray = new IntroFallUnderground();
      
      private static var LevelLearnDirectionalShoot:Class = Embedded_LevelLearnDirectionalShoot;
      
      public static var levelLearnDirectionalShoot:ByteArray = new LevelLearnDirectionalShoot();
      
      private static var LevelLearnShootDown:Class = Embedded_LevelLearnShootDown;
      
      public static var levelLearnShootDown:ByteArray = new LevelLearnShootDown();
      
      private static var Level3:Class = Embedded_Level3;
      
      public static var level3:ByteArray = new Level3();
      
      private static var LearnToSmoosh:Class = Embedded_LearnToSmoosh;
      
      public static var learnToSmoosh:ByteArray = new LearnToSmoosh();
      
      private static var RunFast:Class = Embedded_RunFast;
      
      public static var runFast:ByteArray = new RunFast();
      
      private static var ShootInCorrectOrder:Class = Embedded_ShootInCorrectOrder;
      
      public static var shootInCorrectOrder:ByteArray = new ShootInCorrectOrder();
      
      private static var Level4:Class = Embedded_Level4;
      
      public static var level4:ByteArray = new Level4();
      
      private static var Level4New:Class = Embedded_Level4New;
      
      public static var level4New:ByteArray = new Level4New();
      
      private static var Level5:Class = Embedded_Level5;
      
      public static var level5:ByteArray = new Level5();
      
      private static var Level6:Class = Embedded_Level6;
      
      public static var level6:ByteArray = new Level6();
      
      private static var Level7:Class = Embedded_Level7;
      
      public static var level7:ByteArray = new Level7();
      
      private static var Level8:Class = Embedded_Level8;
      
      public static var level8:ByteArray = new Level8();
      
      private static var Level9:Class = Embedded_Level9;
      
      public static var level9:ByteArray = new Level9();
      
      private static var Level10:Class = Embedded_Level10;
      
      public static var level10:ByteArray = new Level10();
      
      private static var Level11:Class = Embedded_Level11;
      
      public static var level11:ByteArray = new Level11();
      
      private static var Level12:Class = Embedded_Level12;
      
      public static var level12:ByteArray = new Level12();
      
      private static var Level13:Class = Embedded_Level13;
      
      public static var level13:ByteArray = new Level13();
      
      private static var Level14:Class = Embedded_Level14;
      
      public static var level14:ByteArray = new Level14();
      
      private static var CLevel1:Class = Embedded_CLevel1;
      
      public static var clevel1:ByteArray = new CLevel1();
      
      private static var CLevel2:Class = Embedded_CLevel2;
      
      public static var clevel2:ByteArray = new CLevel2();
      
      public static var DirtBMP:Class = Embedded_DirtBMP;
      
      public static var DirtMergeBMP:Class = Embedded_DirtMergeBMP;
      
      public static var WoodMergeBMP:Class = Embedded_WoodMergeBMP;
      
      public static var MetalMergeBMP:Class = Embedded_MetalMergeBMP;
      
      public static var FireTileStripBMP:Class = Embedded_FireTileStripBMP;
      
      public static var LavaMergeBMP:Class = Embedded_LavaMergeBMP;
      
      public static var BGBMP:Class = Embedded_BGBMP;
      
      public static var TutorialBackground1:Class = Embedded_TutorialBackground1;
      
      public static var TutorialBackground2:Class = Embedded_TutorialBackground2;
      
      public static var TutorialBackground3:Class = Embedded_TutorialBackground3;
      
      public static var RockBMP:Class = Embedded_RockBMP;
      
      public static var FireTileSWF:Class = Embedded_FireTileSWF;
      
      public static var DouseSWF:Class = Embedded_DouseSWF;
      
      public static var ConnectorSWF:Class = Embedded_ConnectorSWF;
      
      public static var ConnectorBMP:Class = Embedded_ConnectorBMP;
      
      public static var GlowBMP:Class = Embedded_GlowBMP;
      
      public static var PlayerLegsSWF:Class = Embedded_PlayerLegsSWF;
      
      public static var PlayerTorsoSWF:Class = Embedded_PlayerTorsoSWF;
      
      public static var PlayerDieFireSWF:Class = Embedded_PlayerDieFireSWF;
      
      public static var PlayerDiePainSWF:Class = Embedded_PlayerDiePainSWF;
      
      public static var FireballSWF:Class = Embedded_FireballSWF;
      
      public static var FireballFizzSWF:Class = Embedded_FireballFizzSWF;
      
      public static var FiresplooshSWF:Class = Embedded_FiresplooshSWF;
      
      public static var Bomb2SWF:Class = Embedded_Bomb2SWF;
      
      public static var Bomb1SWF:Class = Embedded_Bomb1SWF;
      
      public static var Bomb3SWF:Class = Embedded_Bomb3SWF;
      
      public static var SpiderSWF:Class = Embedded_SpiderSWF;
      
      public static var SpiderArmorSWF:Class = Embedded_SpiderArmorSWF;
      
      public static var ArmorFlySWF:Class = Embedded_ArmorFlySWF;
      
      public static var WaterBatSWF:Class = Embedded_WaterBatSWF;
      
      public static var WaterBatDieSWF:Class = Embedded_WaterBatDieSWF;
      
      public static var SpiderDieSWF:Class = Embedded_SpiderDieSWF;
      
      public static var SpiderDie2SWF:Class = Embedded_SpiderDie2SWF;
      
      public static var BurningManSWF:Class = Embedded_BurningManSWF;
      
      public static var LizardSWF:Class = Embedded_LizardSWF;
      
      public static var OilSWF:Class = Embedded_OilSWF;
      
      public static var WoodSWF:Class = Embedded_WoodSWF;
      
      public static var WoodExplodeSWF:Class = Embedded_WoodExplodeSWF;
      
      public static var MetalBMP:Class = Embedded_MetalBMP;
      
      public static var MetalEdgeBMP:Class = Embedded_MetalEdgeBMP;
      
      public static var CrosshairSWF:Class = Embedded_CrosshairSWF;
      
      private static var fireballSoundClass:Class = Embedded_fireballSoundClass;
      
      public static var fireballSound:Sound = new fireballSoundClass();
      
      private static var loseArmorSoundClass:Class = Embedded_loseArmorSoundClass;
      
      public static var loseArmorSound:Sound = new loseArmorSoundClass();
      
      private static var spiderdieSoundClass:Class = Embedded_spiderdieSoundClass;
      
      public static var spiderdieSound:Sound = new spiderdieSoundClass();
      
      private static var bombSoundClass:Class = Embedded_bombSoundClass;
      
      public static var bombSound:Sound = new bombSoundClass();
      
      private static var immuneSoundClass:Class = Embedded_immuneSoundClass;
      
      public static var immuneSound:Sound = new immuneSoundClass();
      
      private static var squishSoundClass:Class = Embedded_squishSoundClass;
      
      public static var squishSound:Sound = new squishSoundClass();
      
      private static var musicClass:Class = Embedded_musicClass;
      
      public static var musicSound:Sound = new musicClass();
      
      public static var MainMenuSWF:Class = Embedded_MainMenuSWF;
      
      public static var SpotlightSWF:Class = Embedded_SpotlightSWF;
      
      private static var ALevel1:Class = Embedded_ALevel1;
      
      public static var alevel1:ByteArray = new ALevel1();
      
      private static var ALevel2:Class = Embedded_ALevel2;
      
      public static var alevel2:ByteArray = new ALevel2();
      
      private static var ALevel3:Class = Embedded_ALevel3;
      
      public static var alevel3:ByteArray = new ALevel3();
      
      private static var ALevel4:Class = Embedded_ALevel4;
      
      public static var alevel4:ByteArray = new ALevel4();
      
      private static var ALevel5:Class = Embedded_ALevel5;
      
      public static var alevel5:ByteArray = new ALevel5();
      
      private static var ALevel6:Class = Embedded_ALevel6;
      
      public static var alevel6:ByteArray = new ALevel6();
      
      private static var ALevel7:Class = Embedded_ALevel7;
      
      public static var alevel7:ByteArray = new ALevel7();
      
      private static var ALevel8:Class = Embedded_ALevel8;
      
      public static var alevel8:ByteArray = new ALevel8();
      
      private static var ALevel9:Class = Embedded_ALevel9;
      
      public static var alevel9:ByteArray = new ALevel9();
      
      private static var ALevel10:Class = Embedded_ALevel10;
      
      public static var alevel10:ByteArray = new ALevel10();
      
      private static var ALevel12:Class = Embedded_ALevel12;
      
      public static var alevel12:ByteArray = new ALevel12();
      
      private static var ALevel13:Class = Embedded_ALevel13;
      
      public static var alevel13:ByteArray = new ALevel13();
      
      private static var WBatIntro:Class = Embedded_WBatIntro;
      
      public static var wBatIntro:ByteArray = new WBatIntro();
      
      private static var WBat0:Class = Embedded_WBat0;
      
      public static var wBat0:ByteArray = new WBat0();
      
      private static var WBat1:Class = Embedded_WBat1;
      
      public static var wBat1:ByteArray = new WBat1();
      
      private static var WBat2:Class = Embedded_WBat2;
      
      public static var wBat2:ByteArray = new WBat2();
      
      private static var WBat3:Class = Embedded_WBat3;
      
      public static var wBat3:ByteArray = new WBat3();
      
      private static var WBat5:Class = Embedded_WBat5;
      
      public static var wBat5:ByteArray = new WBat5();
      
      private static var WBat6:Class = Embedded_WBat6;
      
      public static var wBat6:ByteArray = new WBat6();
      
      private static var WBat7:Class = Embedded_WBat7;
      
      public static var wBat7:ByteArray = new WBat7();
      
      private static var WBat8:Class = Embedded_WBat8;
      
      public static var wBat8:ByteArray = new WBat8();
      
      private static var WBat9:Class = Embedded_WBat9;
      
      public static var wBat9:ByteArray = new WBat9();
      
      private static var NickDrop:Class = Embedded_NickDrop;
      
      public static var nickDrop:ByteArray = new NickDrop();
      
      private static var NickAnvil:Class = Embedded_NickAnvil;
      
      public static var nickAnvil:ByteArray = new NickAnvil();
      
      private static var IntroSpider:Class = Embedded_IntroSpider;
      
      public static var introSpider:ByteArray = new IntroSpider();
      
      private static var SpiderFun:Class = Embedded_SpiderFun;
      
      public static var spiderFun:ByteArray = new SpiderFun();
      
      {
         Embedded.levelObjToString[Embedded.firstIntroTown] = "Embedded.firstIntroTown";
         Embedded.levelObjToString[Embedded.mazeRunner] = "Embedded.mazeRunner";
         Embedded.levelObjToString[Embedded.newBlankLevel] = "Embedded.newBlankLevel";
         Embedded.levelObjToString[Embedded.secondIntroTown] = "Embedded.secondIntroTown";
         Embedded.levelObjToString[Embedded.thirdIntroTown] = "Embedded.thirdIntroTown";
         Embedded.levelObjToString[Embedded.fourthIntroTown] = "Embedded.fourthIntroTown";
         Embedded.levelObjToString[Embedded.introFallUnderground] = "Embedded.introFallUnderground";
         Embedded.levelObjToString[Embedded.levelLearnDirectionalShoot] = "Embedded.levelLearnDirectionalShoot";
         Embedded.levelObjToString[Embedded.levelLearnShootDown] = "Embedded.levelLearnShootDown";
         Embedded.levelObjToString[Embedded.level3] = "Embedded.level3";
         Embedded.levelObjToString[Embedded.learnToSmoosh] = "Embedded.learnToSmoosh";
         Embedded.levelObjToString[Embedded.runFast] = "Embedded.runFast";
         Embedded.levelObjToString[Embedded.shootInCorrectOrder] = "Embedded.shootInCorrectOrder";
         Embedded.levelObjToString[Embedded.level4] = "Embedded.level4";
         Embedded.levelObjToString[Embedded.level4New] = "Embedded.level4New";
         Embedded.levelObjToString[Embedded.level5] = "Embedded.level5";
         Embedded.levelObjToString[Embedded.level6] = "Embedded.level6";
         Embedded.levelObjToString[Embedded.level7] = "Embedded.level7";
         Embedded.levelObjToString[Embedded.level8] = "Embedded.level8";
         Embedded.levelObjToString[Embedded.level9] = "Embedded.level9";
         Embedded.levelObjToString[Embedded.level10] = "Embedded.level10";
         Embedded.levelObjToString[Embedded.level11] = "Embedded.level11";
         Embedded.levelObjToString[Embedded.level12] = "Embedded.level12";
         Embedded.levelObjToString[Embedded.level13] = "Embedded.level13";
         Embedded.levelObjToString[Embedded.level14] = "Embedded.level14";
         Embedded.levelObjToString[Embedded.clevel1] = "Embedded.clevel1";
         Embedded.levelObjToString[Embedded.clevel2] = "Embedded.clevel2";
         Embedded.levelObjToString[Embedded.alevel1] = "Embedded.alevel1";
         Embedded.levelObjToString[Embedded.alevel2] = "Embedded.alevel2";
         Embedded.levelObjToString[Embedded.alevel3] = "Embedded.alevel3";
         Embedded.levelObjToString[Embedded.alevel4] = "Embedded.alevel4";
         Embedded.levelObjToString[Embedded.alevel5] = "Embedded.alevel5";
         Embedded.levelObjToString[Embedded.alevel6] = "Embedded.alevel6";
         Embedded.levelObjToString[Embedded.alevel7] = "Embedded.alevel7";
         Embedded.levelObjToString[Embedded.alevel8] = "Embedded.alevel8";
         Embedded.levelObjToString[Embedded.alevel9] = "Embedded.alevel9";
         Embedded.levelObjToString[Embedded.alevel10] = "Embedded.alevel10";
         Embedded.levelObjToString[Embedded.alevel12] = "Embedded.alevel12";
         Embedded.levelObjToString[Embedded.alevel13] = "Embedded.alevel13";
         Embedded.levelObjToString[Embedded.wBatIntro] = "Embedded.wBatIntro";
         Embedded.levelObjToString[Embedded.wBat0] = "Embedded.wBat0";
         Embedded.levelObjToString[Embedded.wBat1] = "Embedded.wBat1";
         Embedded.levelObjToString[Embedded.wBat2] = "Embedded.wBat2";
         Embedded.levelObjToString[Embedded.wBat3] = "Embedded.wBat3";
         Embedded.levelObjToString[Embedded.wBat5] = "Embedded.wBat5";
         Embedded.levelObjToString[Embedded.wBat6] = "Embedded.wBat6";
         Embedded.levelObjToString[Embedded.wBat7] = "Embedded.wBat7";
         Embedded.levelObjToString[Embedded.wBat8] = "Embedded.wBat8";
         Embedded.levelObjToString[Embedded.wBat9] = "Embedded.wBat9";
         Embedded.levelObjToString[Embedded.nickDrop] = "Embedded.nickDrop";
         Embedded.levelObjToString[Embedded.nickAnvil] = "Embedded.nickAnvil";
         Embedded.levelObjToString[Embedded.introSpider] = "Embedded.introSpider";
         Embedded.levelObjToString[Embedded.spiderFun] = "Embedded.spiderFun";
      }
      
      public function Embedded()
      {
         super();
      }
   }
}

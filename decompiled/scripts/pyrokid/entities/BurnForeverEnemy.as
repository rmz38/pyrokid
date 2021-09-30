package pyrokid.entities
{
   import flash.display.MovieClip;
   import pyrokid.Embedded;
   import pyrokid.Level;
   import pyrokid.SoundManager;
   
   public class BurnForeverEnemy extends BackAndForthEnemy
   {
       
      
      public function BurnForeverEnemy(param1:Level)
      {
         var _loc2_:MovieClip = new Embedded.LizardSWF() as MovieClip;
         _loc2_.gotoAndStop(1);
         super(param1,_loc2_,1,48,40,12,8,32,29);
      }
      
      override public function ignite(param1:Level, param2:Vector2i = null, param3:int = -1) : Boolean
      {
         var _loc4_:MovieClip = swf as MovieClip;
         var _loc5_:Boolean;
         if(_loc5_ = super.ignite(param1,param2,param3))
         {
            SoundManager.playSound(Embedded.immuneSound);
            _loc4_.gotoAndStop(2);
         }
         return _loc5_;
      }
      
      public function douse(param1:Level) : void
      {
         var _loc2_:MovieClip = null;
         if(isOnFire())
         {
            _ignitionTime = -1;
            _loc2_ = swf as MovieClip;
            _loc2_.gotoAndStop(1);
            param1.addBriefClip(Embedded.DouseSWF,new Vector2(x,y));
         }
      }
   }
}

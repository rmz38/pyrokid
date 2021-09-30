package pyrokid.entities
{
   import flash.display.MovieClip;
   import pyrokid.BriefClip;
   import pyrokid.Constants;
   import pyrokid.Embedded;
   import pyrokid.Level;
   import pyrokid.SoundManager;
   
   public class Spider extends BackAndForthEnemy
   {
       
      
      public function Spider(param1:Level, param2:int = 1)
      {
         var _loc3_:MovieClip = null;
         health = param2;
         if(health == 2)
         {
            _loc3_ = new Embedded.SpiderArmorSWF();
         }
         else
         {
            _loc3_ = new Embedded.SpiderSWF();
         }
         super(param1,_loc3_,0.8,50,50,6,17,43,32);
      }
      
      override public function ignite(param1:Level, param2:Vector2i = null, param3:int = -1) : Boolean
      {
         var _loc6_:MovieClip = null;
         var _loc7_:BriefClip = null;
         var _loc8_:int = 0;
         var _loc9_:Number = NaN;
         var _loc10_:MovieClip = null;
         var _loc11_:BriefClip = null;
         var _loc4_:int = health;
         var _loc5_:Boolean = super.ignite(param1,param2,param3);
         if(_loc4_ != health && health == 1)
         {
            (_loc6_ = new Embedded.ArmorFlySWF() as MovieClip).scaleX = swf.scaleX;
            _loc6_.scaleY = swf.scaleY;
            _loc7_ = new BriefClip(new Vector2(swf.x + x,swf.y + y),_loc6_);
            param1.briefClips.push(_loc7_);
            param1.addChild(_loc7_);
            _loc8_ = direction;
            direction = Constants.DIR_RIGHT;
            _loc9_ = swf.scaleX;
            removeChild(swf);
            swf = new Embedded.SpiderSWF();
            swf.scaleX = swf.scaleY = _loc9_;
            addChild(swf);
            direction = _loc8_;
            SoundManager.playSound(Embedded.loseArmorSound);
         }
         if(_loc5_)
         {
            (_loc10_ = new Embedded.SpiderDieSWF() as MovieClip).scaleX = swf.scaleX;
            _loc10_.scaleY = swf.scaleY;
            _loc11_ = new BriefClip(new Vector2(swf.x + x,swf.y + y),_loc10_);
            SoundManager.playSound(Embedded.spiderdieSound);
            kill(param1,_loc11_);
         }
         return _loc5_;
      }
   }
}

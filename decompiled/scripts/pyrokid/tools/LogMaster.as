package pyrokid.tools
{
   import pyrokid.Constants;
   
   public class LogMaster
   {
       
      
      private var logging:Logging;
      
      private var currLevel:int;
      
      public function LogMaster()
      {
         var _loc1_:int = 0;
         super();
         this.logging = new Logging(Constants.TEAM_ID,Constants.VERSION_ID,!Constants.DO_LOGGING);
         this.logging.recordPageLoad();
         if(Constants.DO_LOGGING)
         {
            _loc1_ = Math.floor(Math.random() * 2);
            Constants.IS_VERSION_A = this.logging.recordABTestValue(_loc1_) == 0;
         }
         else
         {
            Constants.IS_VERSION_A = false;
         }
         this.currLevel = -1;
      }
      
      public function logBeginLevel(param1:int) : void
      {
         if(this.currLevel == -1)
         {
            this.currLevel = param1;
            this.logging.recordLevelStart(param1);
         }
         else if(Constants.LEVEL_EDITOR_ENABLED)
         {
         }
      }
      
      public function logEndLevel() : void
      {
         if(this.currLevel != -1)
         {
            this.currLevel = -1;
            this.logging.recordLevelEnd();
         }
         else if(Constants.LEVEL_EDITOR_ENABLED)
         {
         }
      }
      
      public function logDeath(param1:int, param2:int, param3:String, param4:int) : void
      {
         this.logEvent(1,"death: " + param1 + "," + param2 + "," + param3 + "," + param4);
      }
      
      public function logFireballIgnite(param1:int, param2:int, param3:String = "") : void
      {
         this.logEvent(2,"fball: " + param1 + "," + param2 + "," + param3);
      }
      
      public function logEvent(param1:int, param2:String) : void
      {
         if(this.currLevel != -1)
         {
            this.logging.recordEvent(this.currLevel,param1,param2);
         }
         else if(Constants.LEVEL_EDITOR_ENABLED)
         {
         }
      }
   }
}

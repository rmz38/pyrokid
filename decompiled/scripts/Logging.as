package
{
   import flash.display.Sprite;
   import flash.events.Event;
   import flash.events.TimerEvent;
   import flash.net.SharedObject;
   import flash.net.URLLoader;
   import flash.net.URLRequest;
   import flash.utils.Timer;
   
   public class Logging extends Sprite
   {
       
      
      const BASE_URL:String = "http://gdiac.cs.cornell.edu/cs4154/fall2014/";
      
      const PAGE_LOAD:String = "page_load.php";
      
      const PLAYER_ACTION:String = "player_action.php";
      
      const PLAYER_QUEST:String = "player_quest.php";
      
      const PLAYER_QUEST_END:String = "player_quest_end.php";
      
      const PLAYER_AB_TEST:String = "record_abtest.php";
      
      private var GAME_ID:Number;
      
      private var VERSION_ID:Number;
      
      private var DEBUG_MODE:Boolean;
      
      private var sessionSeqId:Number = 1;
      
      private var questSeqId:Number = 1;
      
      private var userId:String = "";
      
      private var userInfo:String = "";
      
      private var sessionId:String = "";
      
      private var abStoredValue:Number = NaN;
      
      private var abBroadcastTimer:Timer;
      
      public function Logging(param1:Number, param2:Number, param3:Boolean)
      {
         super();
         this.GAME_ID = param1;
         this.VERSION_ID = param2;
         this.DEBUG_MODE = param3;
         var _loc4_:SharedObject = SharedObject.getLocal("cs4152");
         this.userId = _loc4_.data.user_id;
         this.userInfo = _loc4_.data.user_info;
         this.abStoredValue = _loc4_.data.abtestvalue;
         this.sessionId = _loc4_.data.session_id;
      }
      
      private function possiblyRecordABTestValue(param1:TimerEvent) : void
      {
         var _loc2_:URLRequest = null;
         var _loc3_:URLLoader = null;
         if(this.userId != null)
         {
            _loc2_ = new URLRequest(this.BASE_URL + this.PLAYER_AB_TEST + "?game_id=" + this.GAME_ID + "&user_id=" + this.userId + "&abvalue=" + this.abStoredValue);
            _loc3_ = new URLLoader();
            _loc3_.addEventListener(Event.COMPLETE,this.onComplete);
            _loc3_.load(_loc2_);
            this.abBroadcastTimer.stop();
            this.abBroadcastTimer.removeEventListener(TimerEvent.TIMER,this.possiblyRecordABTestValue);
         }
      }
      
      private function startABTestValueBroadcastProcess(param1:Number) : void
      {
         this.abBroadcastTimer = new Timer(5000,0);
         this.abBroadcastTimer.start();
         this.abBroadcastTimer.addEventListener(TimerEvent.TIMER,this.possiblyRecordABTestValue);
      }
      
      public function recordABTestValue(param1:Number) : Number
      {
         var _loc2_:SharedObject = null;
         if(!this.DEBUG_MODE)
         {
            if(isNaN(this.abStoredValue))
            {
               _loc2_ = SharedObject.getLocal("cs4152");
               this.abStoredValue = param1;
               _loc2_.data.abtestvalue = this.abStoredValue;
               _loc2_.flush();
            }
            this.startABTestValueBroadcastProcess(this.abStoredValue);
            return this.abStoredValue;
         }
         return 0;
      }
      
      public function recordPageLoad(param1:String = "") : void
      {
         var _loc2_:Date = null;
         var _loc3_:Number = NaN;
         var _loc4_:URLRequest = null;
         var _loc5_:SharedObject = null;
         var _loc6_:URLLoader = null;
         if(!this.DEBUG_MODE)
         {
            _loc2_ = new Date();
            _loc3_ = _loc2_.time;
            if(this.userId == null)
            {
               _loc4_ = new URLRequest(this.BASE_URL + this.PAGE_LOAD + "?game_id=" + this.GAME_ID + "&client_timestamp=" + _loc3_ + "&user_info=" + param1 + "&version_id=" + this.VERSION_ID);
            }
            else
            {
               _loc4_ = new URLRequest(this.BASE_URL + this.PAGE_LOAD + "?game_id=" + this.GAME_ID + "&client_timestamp=" + _loc3_ + "&user_info=" + param1 + "&version_id=" + this.VERSION_ID + "&user_id=" + this.userId);
            }
            (_loc5_ = SharedObject.getLocal("cs4152")).data.user_info = param1;
            _loc5_.flush();
            (_loc6_ = new URLLoader()).addEventListener(Event.COMPLETE,this.onCompleteLoad);
            _loc6_.load(_loc4_);
         }
      }
      
      public function recordLevelStart(param1:Number, param2:String = "") : void
      {
         var _loc3_:Date = null;
         var _loc4_:Number = NaN;
         var _loc5_:URLRequest = null;
         var _loc6_:URLLoader = null;
         if(!this.DEBUG_MODE)
         {
            _loc3_ = new Date();
            _loc4_ = _loc3_.time;
            _loc5_ = new URLRequest(this.BASE_URL + this.PLAYER_QUEST + "?game_id=" + this.GAME_ID + "&client_timestamp=" + _loc4_ + "&quest_id=" + param1 + "&user_id=" + this.userId + "&session_id=" + this.sessionId + "&session_seq_id=" + this.sessionSeqId + "&version_id=" + this.VERSION_ID + "&quest_detail=" + param2);
            (_loc6_ = new URLLoader()).addEventListener(Event.COMPLETE,this.onCompleteLevelLoad);
            _loc6_.load(_loc5_);
            ++this.sessionSeqId;
            this.questSeqId = 1;
         }
      }
      
      public function recordLevelEnd() : void
      {
         var _loc1_:Date = null;
         var _loc2_:Number = NaN;
         var _loc3_:SharedObject = null;
         var _loc4_:String = null;
         var _loc5_:URLRequest = null;
         var _loc6_:URLLoader = null;
         if(!this.DEBUG_MODE)
         {
            _loc1_ = new Date();
            _loc2_ = _loc1_.time;
            _loc3_ = SharedObject.getLocal("cs4152");
            if(_loc3_.data.dynamic_quest_id == undefined)
            {
               trace("You must record level start before ending a level");
               return;
            }
            _loc4_ = _loc3_.data.dynamic_quest_id;
            _loc5_ = new URLRequest(this.BASE_URL + this.PLAYER_QUEST_END + "?dynamic_quest_id=" + _loc4_);
            (_loc6_ = new URLLoader()).addEventListener(Event.COMPLETE,this.onComplete);
            _loc6_.load(_loc5_);
            ++this.sessionSeqId;
            this.questSeqId = 1;
            _loc3_.data.dynamic_quest_id = undefined;
            _loc3_.flush();
         }
      }
      
      public function recordEvent(param1:Number, param2:Number, param3:String = "") : void
      {
         var _loc4_:SharedObject = null;
         var _loc5_:String = null;
         var _loc6_:Date = null;
         var _loc7_:Number = NaN;
         var _loc8_:URLRequest = null;
         var _loc9_:URLLoader = null;
         if(!this.DEBUG_MODE)
         {
            if((_loc4_ = SharedObject.getLocal("cs4152")).data.dynamic_quest_id == undefined)
            {
               trace("You must record level start before recording an event");
               return;
            }
            _loc5_ = _loc4_.data.dynamic_quest_id;
            _loc7_ = (_loc6_ = new Date()).time;
            _loc8_ = new URLRequest(this.BASE_URL + this.PLAYER_ACTION + "?game_id=" + this.GAME_ID + "&client_timestamp=" + _loc7_ + "&quest_id=" + param1 + "&user_id=" + this.userId + "&action_id=" + param2 + "&session_seq_id=" + this.sessionSeqId + "&quest_seq_id=" + this.questSeqId + "&action_detail=" + param3 + "&dynamic_quest_id=" + _loc5_);
            (_loc9_ = new URLLoader()).addEventListener(Event.COMPLETE,this.onComplete);
            _loc9_.load(_loc8_);
            ++this.sessionSeqId;
            ++this.questSeqId;
         }
      }
      
      private function onComplete(param1:Event) : void
      {
         trace(param1.currentTarget.data);
      }
      
      private function onCompleteLevelLoad(param1:Event) : void
      {
         trace(param1.currentTarget.data);
         var _loc2_:Object = JSON.parse(param1.currentTarget.data);
         var _loc3_:SharedObject = SharedObject.getLocal("cs4152");
         _loc3_.data.dynamic_quest_id = _loc2_.dynamic_quest_id;
         _loc3_.flush();
      }
      
      private function onCompleteLoad(param1:Event) : void
      {
         trace(param1.currentTarget.data);
         var _loc2_:Object = JSON.parse(param1.currentTarget.data);
         var _loc3_:SharedObject = SharedObject.getLocal("cs4152");
         _loc3_.data.user_id = _loc2_.user_id;
         this.userId = _loc2_.user_id;
         _loc3_.data.session_id = _loc2_.session_id;
         this.sessionId = _loc2_.session_id;
         _loc3_.flush();
      }
   }
}

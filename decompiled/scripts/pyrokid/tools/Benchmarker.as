package pyrokid.tools
{
   import flash.utils.Dictionary;
   import flash.utils.getTimer;
   
   public class Benchmarker
   {
       
      
      private var curFrame:int;
      
      private var beginFrameTime:int;
      
      private var beginPhaseTime:int;
      
      private var curPhase:String;
      
      private var numExecutionsByPhase:Dictionary;
      
      private var averageTimeByPhase:Dictionary;
      
      private var timeBetweenPrint:int;
      
      private var phaseList:Array;
      
      public function Benchmarker(param1:Array, param2:int = -1)
      {
         super();
         this.timeBetweenPrint = param2;
         this.phaseList = param1;
         this.initializeDictionaries();
         this.curFrame = 0;
      }
      
      private function initializeDictionaries() : void
      {
         var _loc1_:String = null;
         this.numExecutionsByPhase = new Dictionary();
         this.averageTimeByPhase = new Dictionary();
         for each(_loc1_ in this.phaseList)
         {
            this.numExecutionsByPhase[_loc1_] = 0;
            this.averageTimeByPhase[_loc1_] = 0;
         }
         this.numExecutionsByPhase["ENTIRE_FRAME"] = 0;
         this.averageTimeByPhase["ENTIRE_FRAME"] = 0;
      }
      
      public function beginFrame() : void
      {
         this.curFrame += 1;
         this.beginFrameTime = getTimer();
      }
      
      public function beginPhase(param1:String) : void
      {
         this.curPhase = param1;
         this.beginPhaseTime = getTimer();
      }
      
      public function endPhase() : void
      {
         this.updateAverage(this.curPhase,getTimer() - this.beginPhaseTime);
         this.curPhase = null;
      }
      
      private function updateAverage(param1:String, param2:int) : void
      {
         var _loc3_:* = this.numExecutionsByPhase[param1];
         this.averageTimeByPhase[param1] = (this.averageTimeByPhase[param1] * _loc3_ + param2) / (_loc3_ + 1);
         this.numExecutionsByPhase[param1] = _loc3_ + 1;
      }
      
      public function endFrame() : void
      {
         var _loc1_:* = null;
         this.updateAverage("ENTIRE_FRAME",getTimer() - this.beginFrameTime);
         if(this.timeBetweenPrint != -1 && this.curFrame % this.timeBetweenPrint == 0)
         {
            for(_loc1_ in this.averageTimeByPhase)
            {
            }
            this.initializeDictionaries();
         }
      }
   }
}

package pyrokid.entities
{
   import flash.display.DisplayObject;
   import flash.display.MovieClip;
   import pyrokid.BriefClip;
   import pyrokid.Constants;
   import pyrokid.Embedded;
   import pyrokid.Level;
   
   public class BurnForever extends TileEntity
   {
       
      
      public function BurnForever(param1:int, param2:int, param3:int)
      {
         super(param1,param2,param3);
      }
      
      override protected function getSpriteForCell(param1:Vector2i) : DisplayObject
      {
         var _loc2_:MovieClip = new Embedded.OilSWF();
         _loc2_.gotoAndStop(1);
         return _loc2_;
      }
      
      override public function ignite(param1:Level, param2:Vector2i = null, param3:int = -1) : Boolean
      {
         var _loc5_:DisplayObject = null;
         var _loc4_:Boolean;
         if(_loc4_ = super.ignite(param1,param2,param3))
         {
            for each(_loc5_ in fireSprites)
            {
               addChild(_loc5_);
            }
         }
         return _loc4_;
      }
      
      public function douse(param1:Level) : void
      {
         var self:* = undefined;
         var cellSprite:DisplayObject = null;
         var cell:Vector2i = null;
         var steam:MovieClip = null;
         var pos:Vector2 = null;
         var bc:BriefClip = null;
         var level:Level = param1;
         if(!isOnFire())
         {
            return;
         }
         _ignitionTime = -1;
         self = this;
         level.onFire.filter(function(param1:TileEntity, param2:int, param3:Array):Boolean
         {
            return param1 != self;
         });
         for each(cellSprite in fireSprites)
         {
            removeChild(cellSprite);
         }
         for each(cell in cells)
         {
            steam = new Embedded.DouseSWF() as MovieClip;
            pos = new Vector2(cell.x,cell.y);
            pos.AddV(getGlobalAnchor());
            pos.MulD(Constants.CELL);
            bc = new BriefClip(pos,steam);
            level.briefClips.push(bc);
            level.addChild(bc);
         }
      }
   }
}

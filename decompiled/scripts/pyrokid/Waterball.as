package pyrokid
{
   public class Waterball extends ProjectileBall
   {
       
      
      public function Waterball()
      {
         super();
         graphics.beginFill(7829503);
         graphics.drawCircle(0,0,5);
         graphics.beginFill(12303359);
         graphics.drawCircle(0,0,3);
         graphics.endFill();
         speed = Constants.WATERBALL_SPEED;
         setRange(Constants.WATERBALL_RANGE);
      }
   }
}

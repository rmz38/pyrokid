package pyrokid
{
   import flash.display.MovieClip;
   
   public class Fireball extends ProjectileBall
   {
       
      
      public var fizzOut:Boolean = false;
      
      public function Fireball()
      {
         super();
         fball = new Embedded.FireballSWF() as MovieClip;
         addChild(fball);
         speed = Constants.FBALL_SPEED;
      }
   }
}

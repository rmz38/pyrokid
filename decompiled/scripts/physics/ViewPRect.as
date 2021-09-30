package physics
{
   import pyrokid.Constants;
   import pyrokid.entities.FreeEntity;
   
   public class ViewPRect
   {
       
      
      public var sprite:FreeEntity;
      
      public var phys:PhysRectangle;
      
      public var isFreeEntity:Boolean;
      
      public function ViewPRect(param1:FreeEntity, param2:PhysRectangle)
      {
         super();
         this.sprite = param1;
         this.phys = param2;
         this.isFreeEntity = this.sprite is FreeEntity;
      }
      
      public function onUpdate(param1:Array, param2:Function = null, param3:Function = null) : void
      {
         this.phys.center.Set(this.sprite.x,this.sprite.y).DivD(Constants.CELL).AddV(this.phys.halfSize);
         this.phys.velocity.x = this.sprite.velocity.x / Constants.CELL;
         this.phys.velocity.y = this.sprite.velocity.y / Constants.CELL;
         this.sprite.isGrounded = false;
         this.sprite.touchLeft = false;
         this.sprite.touchRight = false;
         this.sprite.touchTop = false;
         this.phys.Update();
         CollisionResolver.Resolve(this.phys,param1,param2,param3);
         this.sprite.x = (this.phys.center.x - this.phys.halfSize.x) * Constants.CELL;
         this.sprite.y = (this.phys.center.y - this.phys.halfSize.y) * Constants.CELL;
         this.sprite.velocity.x = this.phys.velocity.x * Constants.CELL;
         this.sprite.velocity.y = this.phys.velocity.y * Constants.CELL;
      }
   }
}

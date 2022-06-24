class Enemy {
  sprite: Phaser.Physics.Matter.Sprite;
  velocity = 0.8;
  collisionSensor: Phaser.Physics.Matter.Sprite;
  rightEdge: boolean;
  leftEdge: boolean;
  public flip() {
    this.sprite.flipX = !this.sprite.flipX;
    this.velocity = -this.velocity;
  }
  public faceLeft() {
    this.sprite.flipX = true;
    this.velocity = -Math.abs(this.velocity);
  }
  public faceRight() {
    this.sprite.flipX = false;
    this.velocity = Math.abs(this.velocity);
  }
  public syncSensor() {
    if (this.sprite.active) {
      this.collisionSensor.setPosition(this.sprite.x, this.sprite.y);
    }
  }
  public destroy() {
    this.sprite.destroy();
    this.collisionSensor.destroy();
  }
  public update() {
    if (this.sprite.active) {
      this.syncSensor();
      this.sprite.setVelocityX(this.velocity);
    }
  }
}
export default Enemy;

import { Input } from 'phaser';
import { getGameWidth, getGameHeight } from '../helpers';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};
let player;
let stars;
let platforms;
let cursors;
let ground;
let movingPlatform;
let crate;
let crates;
let test = [];
function collectStar (player, star)
{
    star.disableBody(true, true);
}
function crateCollide (crate1, crate2)
{
    crate1.body.setVelocity(0,0)
    crate2.body.setVelocity(0,0)
}
function createBox(posX, posY, width, height, isDynamic){
 
    // this is how we create a generic Box2D body
    let box = this.planck.world.createBody();
    if(isDynamic){

        // Box2D bodies born as static bodies, but we can make them dynamic
        box.setDynamic();
    }

    // a body can have one or more fixtures. This is how we create a box fixture inside a body
    box.createFixture(this.planck.Box(width / 2 / this.worldScale, height / 2 / this.worldScale));

    // now we place the body in the world
    box.setPosition(this.planck.Vec2(posX / this.worldScale, posY / this.worldScale));

    // time to set mass information
    box.setMassData({
        mass: 1,
        center: this.planck.Vec2(),

        // I have to say I do not know the meaning of this "I", but if you set it to zero, bodies won't rotate
        I: 1
    });

    // now we create a graphics object representing the body
    var color = new Phaser.Display.Color();
    color.random();
    color.brighten(50).saturate(100);
    let userData = this.add.graphics();
    userData.fillStyle(color.color, 1);
    userData.fillRect(- width / 2, - height / 2, width, height);

    // a body can have anything in its user data, normally it's used to store its sprite
    box.setUserData(userData);
}
export class GameScene extends Phaser.Scene {
  [x: string]: any;
  public speed = 200;

  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  private image: Phaser.Physics.Arcade.Sprite;
//   private player;
//   private stars;
//   private platforms;
//   private cursors;
//   private movingPlatform;
  constructor() {
    super(sceneConfig);
  }
  public preload ()
  {
      this.load.image('sky', 'assets/sky.png');
      this.load.image('ground', 'assets/platform.png');
      this.load.image('star', 'assets/star.png');
      this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
      this.load.spritesheet('crate', 'assets/crate.png', { frameWidth: 79, frameHeight: 80 });
  }
  public create(): void {
    this.add.image(400, 300, 'sky');
    // this.physics.world.setFPS(120);
    console.log(this)

    // platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    // platforms.create(600, 400, 'ground');
    // platforms.create(50, 250, 'ground');
    // platforms.create(750, 220, 'ground');
    const groundTexture = this.add.graphics()
    // groundTexture.fillStyle(0x666666)
    // groundTexture.fillRect(0, 0, 640, 40)
    groundTexture.fillStyle(0x666666)
    groundTexture.fillRect(0, 0, 640, 40)
    groundTexture.generateTexture('demo_basic_ground', 640, 40)
    // groundTexture.destroy()

    // Ground Sprite
    //@ts-ignore
    // const groundSprite = createBox(10,10,10,10)
    // groundSprite.setBody('box')
    // groundSprite.setStatic()
    movingPlatform = this.planck.add.sprite(0, 0, groundTexture);
    // movingPlatform.setBody('ground')
    // movingPlatform.setPosition(400, 400)

    // movingPlatform.setImmovable(true);
    // movingPlatform.body.allowGravity = false;
    // movingPlatform.setVelocityX(50);

    // player = this.physics.add.sprite(100, 450, 'dude');

    // player.setBounce(0.2);
    // player.setCollideWorldBounds(true);

    // this.anims.create({
    //     key: 'left',
    //     frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    //     frameRate: 10,
    //     repeat: -1
    // });

    // this.anims.create({
    //     key: 'turn',
    //     frames: [ { key: 'dude', frame: 4 } ],
    //     frameRate: 20
    // });

    // this.anims.create({
    //     key: 'right',
    //     frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    //     frameRate: 10,
    //     repeat: -1
    // });


    // this.anims.create({
    //     key: 'cratepic',
    //     frames: this.anims.generateFrameNumbers('crate', { start: 0, end: 0 }),
    //     frameRate: 10,
    //     repeat: -1
    // });

    // cursors = this.input.keyboard.createCursorKeys();

    // stars = this.physics.add.group({
    //     key: 'star',
    //     repeat: 11,
    //     setXY: { x: 12, y: 0, stepX: 70 }
    // });

    // stars.children.iterate(function (child) {

    //     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    // });

    // crates = this.physics.add.group({
    //     key: 'crate',
    //     frame: 0,
    //     repeat: 7,
    //     setXY: { x: 200, y: 500, stepX: 0, stepY: -48 }
    // });
    // let i = 0
    // crates.children.iterate(function (child) {
    //     child.body.setSize(48,48);
    //     child.setOffset(15, 30);
    //     child.setBounce(1);
    //     test[i] = child
    //     i += 1
    // });
    // // for(let i = 0; i < 10; i+= 1) {
    // //     crates[i] = this.physics.add.sprite(400 + i * 50, 300, 'crate')
    // //     crates[i].body.allowGravity = true;
    // //     crates[i].body.setSize(48,48);
    // //     crates[i].setOffset(15,30)
    // //     this.physics.add.collider(player, crates[i]);
    // //     this.physics.add.collider(crates[i], platforms);
    // // }

    // this.physics.add.collider(player, platforms);
    // this.physics.add.collider(player, movingPlatform);
    // this.physics.add.collider(stars, platforms);
    // this.physics.add.collider(stars, movingPlatform);
    // this.physics.add.collider(crates, test);
    // this.physics.add.collider(crates, platforms);
    // this.physics.add.collider(crates, player);
    // // this.physics.add.overlap(crates, crates, crateCollide, null, this)
    // this.physics.add.overlap(player, stars, collectStar, null, this);
  }

  public update(): void {
    // if (cursors.left.isDown)
    // {
    //     player.setVelocity(-160);

    //     player.anims.play('left', true);
    // }
    // else if (cursors.right.isDown)
    // {
    //     player.setVelocityX(160);

    //     player.anims.play('right', true);
    // }
    // else
    // {
    //     player.setVelocityX(0);

    //     player.anims.play('turn');
    // }

    // if (cursors.up.isDown && player.body.touching.down)
    // {
    //     player.setVelocityY(-330);
    // }

    // if (movingPlatform.x >= 500)
    // {
    //     movingPlatform.setVelocityX(-50);
    // }
    // else if (movingPlatform.x <= 300)
    // {
    //     movingPlatform.setVelocityX(50);
    // }
  }
}

import Phaser from 'phaser';

/**
 * Player sprite class for Phaser 3
 */
export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    // Add to scene and enable physics
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Physics properties
    this.body.setBounce(0, 0);
    // Collide with world bounds so left/right edges block movement
    this.body.setCollideWorldBounds(true);
    this.body.setGravityY(1000);
    this.body.setMaxVelocity(500, 500);
    this.body.setSize(60, 70);
    this.body.setOffset(34, 20);

    // Scale
    this.setScale(2, 2);

    // Jump variables
    this.jumpCount = 0;
    this.maxJump = 2;
    this.isGrounded = false;
    this.wasGrounded = false;
    this.hitPlatform = false;

    // Direction tracking
    this.facing = 'idle';

    // Setup input
    this.setupInput();

    // Create animations
    this.createAnimations();
  }

  setupInput() {
    this.upKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.leftKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.rightKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.jumpKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  createAnimations() {
    if (!this.scene.anims.exists('walk')) {
      this.scene.anims.create({
        key: 'walk',
        frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 5,
        repeat: -1
      });
    }
  }

  update() {
    // Check if on floor - use both touching and blocked for reliability
    this.isGrounded = this.body.touching.down || this.body.blocked.down;

    // Reset jumpCount only when transitioning from air to ground
    if (this.isGrounded && !this.wasGrounded) {
      this.jumpCount = 0;
    }
    this.wasGrounded = this.isGrounded;

    // Reset velocity x
    this.body.setVelocityX(0);

    // Handle horizontal movement
    if (this.leftKey.isDown) {
      this.body.setVelocityX(-150);
      if (this.facing !== 'left') {
        this.play('walk');
        this.facing = 'left';
        this.setFlipX(true);
      }
    } else if (this.rightKey.isDown) {
      this.body.setVelocityX(150);
      if (this.facing !== 'right') {
        this.play('walk');
        this.facing = 'right';
        this.setFlipX(false);
      }
    } else {
      if (this.facing !== 'idle') {
        this.stop();
        this.setFrame(0);
        this.facing = 'idle';
      }
    }

    // Handle jumping
    if (Phaser.Input.Keyboard.JustDown(this.upKey) || Phaser.Input.Keyboard.JustDown(this.jumpKey)) {
      if (this.jumpCount < this.maxJump) {
        this.body.setVelocityY(-500);
        this.jumpCount++;
      }
    }
  }
}

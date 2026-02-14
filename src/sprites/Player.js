import Phaser from 'phaser';

/**
 * Class representing the player.
 */
class Player extends Phaser.Sprite {

  /**
   * Create a player.
   * @param {game} game - The game object.
   * @param {number} x - Initial x value.
   * @param {number} y - Initial y value.
   * @param {string} asset - The sprite to use.
   */
  constructor(game, x, y, asset) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5, 0.5);

    // We need to enable physics on the player
    game.physics.arcade.enable(this);

    // Player physics properties
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 1000;
    this.body.maxVelocity.y = 500;
    this.body.setSize(24, 24, 6, -1);

    // Scale up to 2x
    this.scale.x = 2;
    this.scale.y = 2;

    // Player animations
    // this.animations.add('left', [0, 1, 2, 3], 10, true);
    // this.animations.add('turn', [4], 20, true);
    // this.animations.add('right', [5, 6, 7, 8], 10, true);
    

    // jump variables
    this.jumpCount = 0;
    this.maxJump = 2; // Allow double jump (ground + 1 in air)

    // Player controls
    this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.facing = 'left';
    this.hitPlatform = false;

    // Saving the variable for use in update()
    this.game = game;
  }

  /**
   * Update (runs every frame)
   */
  update() {
    // Reset the players velocity (movement)
    this.body.velocity.x = 0;

    if (this.leftKey.isDown) {
      this.body.velocity.x = -150;

      if (this.facing !== 'left') {
        // this.animations.play('left');
        this.facing = 'left';
        this.scale.x = -2;
      }
    } else if (this.rightKey.isDown) {
      this.body.velocity.x = 150;

      if (this.facing !== 'right') {
        // this.animations.play('right');
        this.facing = 'right';
        this.scale.x = 2;
      }
    } else {
      if (this.facing !== 'idle') {
        // this.animations.stop();

        if (this.facing === 'left') {
          this.frame = 0;
        } else {
          this.frame = 5;
        }
        this.facing = 'idle';
      }
    }

    // Reset jumpCount when landing
    if (this.body.onFloor()) {
      this.jumpCount = 0;
    }

    // Only trigger jump on initial key press (not held)
    if (this.upKey.justDown || this.jumpKey.justDown) {
      // Allow jump if we haven't exceeded maxJump
      if (this.jumpCount < this.maxJump) {
        this.body.velocity.y = -500;
        this.jumpCount++;
      }
    }

  }
}

export default Player;

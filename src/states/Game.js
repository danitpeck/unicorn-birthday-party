import Phaser from 'phaser';
import Player from '../sprites/Player';

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }

  create() {
    // Background color
    this.cameras.main.setBackgroundColor(0x000000);

    // Load tilemap
    const map = this.make.tilemap({ key: 'forest-level' });
    const tileset = map.addTilesetImage('forest-tiles');
    this.layer = map.createLayer('Tile Layer 1', tileset);

    // Background - simple colored rectangle covering the entire world
    const worldWidth = map.widthInPixels;
    const worldHeight = map.heightInPixels;
    const bgGraphics = this.make.graphics({ x: 0, y: 0, add: true });
    bgGraphics.fillStyle(0x87CEEB, 1); // Sky blue
    bgGraphics.fillRect(0, 0, worldWidth, worldHeight);
    bgGraphics.setScrollFactor(0);
    bgGraphics.setDepth(-1);
    // Enable collision only on top surface tiles (walkable surfaces)
    // Tiles 1,2,3 = top of platform; tile 5 = solid block
    this.layer.setCollision([1, 2, 3, 5]);
    this.layer.setDepth(0);

    // Create player
    this.player = new Player(this, 32, 32, 'player');

    // Create stars
    this.stars = this.physics.add.group();
    for (let i = 0; i < 12; i++) {
      let star = this.stars.create(i * (Math.random() * 5 + 70), Math.random() * 70, 'star');
      star.setScale(2, 2);
      star.setBounce(0.7 + Math.random() * 0.2, 0.7 + Math.random() * 0.2);
      star.setGravityY(300);
    }

    // Physics collisions
    this.physics.add.collider(this.player, this.layer);
    this.physics.add.collider(this.stars, this.layer);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

    // Score
    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      font: '40px Bangers',
      fill: '#000'
    });
    this.scoreText.setPadding(8, 4, 16, 4);
    this.scoreText.setScrollFactor(0);

    // Camera follow
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    // World bounds and fall limit
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
    this.worldHeight = worldHeight;
    this.fallY = worldHeight + 200;
  }

  update() {
    this.player.update();
    this.scoreText.setText('Score: ' + this.score);

    if (this.player.y > this.fallY) {
      this.player.setPosition(32, 32);
      this.player.setVelocity(0, 0);
    }
  }

  collectStar(player, star) {
    star.destroy();
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
  }
}

export default GameScene;

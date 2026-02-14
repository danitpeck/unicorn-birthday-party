import Phaser from 'phaser';

class SplashScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Splash' });
  }

  preload() {
    // Draw progress bar
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(centerX - 160, centerY - 30, 320, 60);

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(centerX - 150, centerY - 20, 300 * value, 40);
    });

    // Load assets
    this.load.image('sky', 'assets/images/sky.png');
    this.load.image('background', 'assets/images/background2.png');
    this.load.image('ground', 'assets/images/platform.png');
    this.load.image('star', 'assets/images/star.png');
    this.load.image('star2', 'assets/images/star2.png');
    this.load.image('forest-tiles', 'assets/images/forest-tiles.png');

    this.load.spritesheet('player', 'assets/sprites/unicorn_2.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('droid', 'assets/images/droid.png', { frameWidth: 32, frameHeight: 32 });

    this.load.tilemapTiledJSON('forest-level', 'assets/tiled/forest-level.json');
  }

  create() {
    this.scene.start('Game');
  }
}

export default SplashScene;

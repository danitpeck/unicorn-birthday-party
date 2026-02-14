import Phaser from 'phaser';
import WebFont from 'webfontloader';

class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  preload() {
    this.cameras.main.setBackgroundColor(0xEDEEC9);
    
    this.fontsReady = false;
    this.fontsLoaded = this.fontsLoaded.bind(this);
    
    WebFont.load({
      google: {
        families: ['Bangers']
      },
      active: this.fontsLoaded
    });

    let text = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2,
      'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' });
    text.setOrigin(0.5, 0.5);

    this.load.image('loaderBg', './assets/images/loader-bg.png');
    this.load.image('loaderBar', './assets/images/loader-bar.png');
  }

  create() {
    if (this.fontsReady) {
      this.scene.start('Splash');
    } else {
      this.time.delayedCall(100, () => {
        if (this.fontsReady) {
          this.scene.start('Splash');
        }
      });
    }
  }

  fontsLoaded() {
    this.fontsReady = true;
    this.scene.start('Splash');
  }
}

export default BootScene;

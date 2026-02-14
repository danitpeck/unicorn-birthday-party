/* globals document, window */
import Phaser from 'phaser';

import BootScene from './states/Boot';
import SplashScene from './states/Splash';
import GameScene from './states/Game';

import config from './config';

const docElement = document.documentElement;
const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth;
const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight;

const gameConfig = {
  type: Phaser.AUTO,
  width: width,
  height: height,
  parent: 'content',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: width,
    height: height
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [BootScene, SplashScene, GameScene]
};

window.game = new Phaser.Game(gameConfig);

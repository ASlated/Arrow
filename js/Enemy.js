class Enemy extends Phaser.Sprite {
  constructor(game, x, y, key, health = 100) {
    super(game, x, y, key);
    this.game = game;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.startX = x;
    this.startY = y;
    this.enabled = true;
    this.maxHealth = health;
    this.health = this.maxHealth;
    this.scale.setTo(2, 2);
    this.anchor.setTo(0.5, 0.5);
    this.invincible = false;
    this.body.collideWorldBounds = true;

    this.game.add.existing(this);

    this.die = this.die.bind(this);
  }

  vulnerable() {
    this.tint = 0xFFFFFF;
    this.invincible = false;
  }

  die(group) {
    this.enabled = false;
    this.tint = 0xFFFFFF;
    let colorTween = this.game.add.tween(this).to({tint: 0xFF0000}, 250);
    let alphaTween = this.game.add.tween(this).to({alpha: 0}, 250);
    colorTween.chain(alphaTween);
    colorTween.start();
    this.game.time.events.add(5000, function(){group.add(this, this.startX, this.startY)}, this);
  }
}

export default Enemy;

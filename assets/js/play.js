/* global game, Phaser, playState, menuState, mainMenuState */

var playState = {

    preload: function () {
        //scale game if on phone
        if (!game.device.desktop) {
            game.scale.scaleMode = Phaser.ScaleManager.SHOWALL;
            game.scale.setMinMax(game.width/2, game.height/2, game.width, game.height);
        }
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        
        game.stage.backgroundColor='#8185d5';
        
        //pipes, banana
        game.load.image('bird', 'assets/images/banana.png');
        game.load.image('pipe', 'assets/images/pipe.png');
        
        //sound
        game.load.audio('jump','assets/audio/jump.m4a');
    },

    create: function() { 
        //physics function/options
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //pipes group
        this.pipes = game.add.group();
        
        //timer
        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
        
        //add bird to stage
        this.bird = game.add.sprite(100, 245, 'bird');
        
        //enable physics on bird
        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y= 1000;
        
        //anchor position
        this.bird.anchor.setTo(-0.2, 0.5);
        
        //jump key
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
        game.input.onDown.add(this.jump, this);
        
        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0");
        
        //Jump sound
        this.jumpSound = game.add.audio('jump');
        this.jumpSound.volume=0.2;
        
    },

    update: function() {
        //restart the game
        if (this.bird.y < 0 || this.bird.y > game.world.height) {
            this.restartGame();
            }
        
        //call the hitpipe method if player and pipes overlap
        game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);
        
        //rotate player to a certain point
        if (this.bird.angle < 20){
            this.bird.angle += 1;
        }
    }
};

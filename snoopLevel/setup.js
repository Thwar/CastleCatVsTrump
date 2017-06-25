function SetupWorld()
{    
          // Floor 3
        for (var i = 0; i < window.innerWidth  ; i += 50) 
            {                                             
                 var pipe = game.add.sprite(i, innerHeight/2 + 200, 'pipe');
                pipe.body.immovable = true;
                floor3.add(pipe);              
            }
    
              // Floor 2
        for (var i = 0; i < window.innerWidth  ; i += 50) 
            {                                             
                 var pipe = game.add.sprite(i, innerHeight/2 + 50 , 'pipe');
                 pipe.body.immovable = true;
                floor2.add(pipe);                   
            }
    
              // Floor 1
        for (var i = 0; i < window.innerWidth  ; i += 50) 
            {                                             
                 var pipe = game.add.sprite(i, innerHeight/2 - 100, 'pipe');
                 pipe.body.immovable = true;
                floor1.add(pipe);             
            }
    
        //Castle Sprite Create
            castle = game.add.sprite(innerWidth/2 - 194/2, innerHeight/2  - 255, 'castle');                 
}


function SetupPlayer()
{
       player = game.add.sprite(innerWidth/2 , 185, 'cat');
        
        // Add gravity to the bird to make it fall
        player.body.gravity.y = 5000;
    
      //  game.bird.anchor.setTo(-0.2, 0.5); 
       player.anchor.setTo(0.5, 0.5); 
}


function SetupControls()
{  
     // Variable to store the arrow key pressed
      cursor = game.input.keyboard.createCursorKeys();      
     spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);         
}


function SetupBullets() {
    bullets.enableBody = true;
    bullets.createMultiple(10, 'taco');
    bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetBullet, this);
    bullets.setAll('checkWorldBounds', true);
}

function SetupEnemies() {
    switch (game.rnd.integerInRange(0, 5)) {
    case 0:
        CreateTrump(50, innerHeight / 2 - 170, 'left', this.enemy, this.speed);
        break;
    case 1:
        CreateTrump(50, innerHeight / 2 - 20, 'left', this.enemy, this.speed);
        break;
    case 2:
        CreateTrump(50, innerHeight / 2 + 130, 'left', this.enemy, this.speed);
        break;
    case 3:
        CreateTrump(innerWidth - 50, innerHeight / 2 - 170, 'right', this.enemy, this.speed);
        break;
    case 4:
        CreateTrump(innerWidth - 50, innerHeight / 2 - 20, 'right', this.enemy, this.speed);
        break;
    case 5:
        CreateTrump(innerWidth - 50, innerHeight / 2 + 130, 'right', this.enemy, this.speed);
        break;
    }
}


function CreateTrump(x, y, direction, enemy, speed)
{  
    if (direction == "left") {
        trump = game.add.sprite(x, y, enemy);
        trump.anchor.setTo(0.5, 0.5);
        trump.body.velocity.x = speed;
        trump.body.gravity.y = 100;
        trumps.add(trump);
    }
    if (direction == "right") {
        trump = game.add.sprite(x, y, enemy);
        trump.anchor.setTo(0.5, 0.5);
        trump.body.velocity.x = -speed;
        trump.body.gravity.y = 100;
        trump.scale.x = -1;
        trumps.add(trump);
    }
        if (enemy == 'mlg') {
            trump.animations.add('run');
            trump.animations.play('run', 15, true);
        }
        if (enemy == 'mlg2') {
            trump.animations.add('run');
            trump.animations.play('run', 30, true);
        }
    
            if (enemy == 'mlg3') {
            trump.animations.add('run');
            trump.animations.play('run', 15, true);
        }
}
//GLOBAL VARIABLES
PlayerLook = "right";
Floor1Collide = false;
Floor2Collide = true;
Floor3Collide = false;
var bulletTime = 0;
var score = 0;
var enemySpeed = 350;

var swipeCoordX,   swipeCoordY,   swipeCoordX2,     swipeCoordY2,   swipeMinDistance = 100;  


//  Called if the bullet goes out of the screen
function resetBullet(bullet) {
    bullet.kill();
}

//Collition between trump and castle
function BaseHit(castle , trump)
{
    this.thwompSound.play();
     setTimeout(function () {
         trump.kill();
         
          castle.y = castle.y - 5;
         
            setTimeout(function () {
          castle.y = castle.y + 5;
                    }, 15);
     }, 100);
}

//Collition between bullet and trump
function KillEnemy(bullet, trump) {
    this.punchSound.play();
    setTimeout(function () {
        if (trump.body.velocity.x > 0)
        {
            bullet.body.velocity.x = -500;
            trump.body.velocity.x = -500;
        }
        else 
        {
            bullet.body.velocity.x = 500;
            trump.body.velocity.x = 500;
        }
    }, 40);
    
   // bullets.remove(bullet); 
   // trumps.remove(trump);
   
    destroyGroup.add(trump);
    destroyGroup.add(bullet);
    trump.body.gravity.y = 0;
    
    bullet.tween.pause(); 
        
    score++;
    this.scoreText.text = "Score: " + score ;
}
// Create our 'main' state that will contain the game
var mainState = {
    preload: function () {
        // Load sprites
        game.load.image('bird', 'assets/bird.png');
        game.load.image('pipe', 'assets/pipe.png');
        game.load.image('taco', 'assets/taco.png');
        game.load.image('cat', 'assets/cat.png');
        game.load.image('trump', 'assets/trump.png');
        game.load.image('castle', 'assets/castle.png');
        
        
        //Load Sound
        game.load.audio('jump', 'assets/sound/jump.wav');
        game.load.audio('thwomp', 'assets/sound/thwomp.wav');
        game.load.audio('throw', 'assets/sound/throw.wav');
        game.load.audio('punch', 'assets/sound/punch.mp3');
           
    }, create: function () {
        
        // Create  groups
        floor1 = game.add.group();
        floor2 = game.add.group();
        floor3 = game.add.group();
        trumps = game.add.group();
        bullets = game.add.group();
        destroyGroup = game.add.group();
        
        // Change the background color of the game to blue
        game.stage.backgroundColor = 'black';
        
        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Add the physics engine to all game objects
        game.world.enableBody = true;
        
        //Add sound to game 
        jumpSound = game.add.audio('jump'); 
        this.thwompSound = game.add.audio('thwomp'); 
        this.throwSound = game.add.audio('throw'); 
        this.punchSound = game.add.audio('punch'); 
       
        SetupWorld();    
        SetupPlayer();
        SetupControls();
        SetupBullets();
        
        game.world.sendToBack(trumps);
        game.world.bringToTop(bullets);  
        
        this.timer = game.time.events.loop(1000, SetupEnemies, this);
        game.time.events.loop(4123, SetupEnemies, this);
        
        //DEBUG
        this.scoreText = game.add.text(innerWidth - 350, 20, "Score: 0", { font: "64px Arial", fill: "#ffffff", align: "center" });
        this.debugText2 = game.add.text(600, 60, "", { font: "16px Arial", fill: "#ffffff", align: "center" });
        this.debugText3 = game.add.text(600, 100, "", { font: "16px Arial", fill: "#ffffff", align: "center" });
        
        
        //MOBILE CONTROLS SETUP
        game.input.onDown.add(function(pointer) {        
            swipeCoordX = pointer.clientX;       
            swipeCoordY = pointer.clientY;             
        }, this);   
        
        game.input.onUp.add(function(pointer) {      
            swipeCoordX2 = pointer.clientX;       
            swipeCoordY2 = pointer.clientY;  
            
            this.debugText2.text = swipeCoordX - swipeCoordX2;
            this.debugText3.text = swipeCoordY - swipeCoordY2;
            
            if(((swipeCoordX - swipeCoordX2) && (swipeCoordY - swipeCoordY2)) == 0)
                this.ShootWeapon();
            
            
        if(swipeCoordX2 < swipeCoordX - swipeMinDistance){      
            console.log("left");       }else if(swipeCoordX2 > swipeCoordX + swipeMinDistance){            console.log("right");     }else if(swipeCoordY2 < swipeCoordY - swipeMinDistance){            console.log("up"); JumpUp();        }else if(swipeCoordY2 > swipeCoordY + swipeMinDistance){            console.log("down"); JumpDown();  }}, this); 
                
        
     }
    , update: function () {
        // This function is called 60 times per second    
        // It contains the game's logic   
          game.physics.arcade.collide( player, floor1, this.hitGround, function() { 
             if (Floor1Collide) {  return true;  }  return false; }, this);  
        
         game.physics.arcade.collide( player, floor2, this.hitGround, function() { 
             if (Floor2Collide) {  return true;  }  return false; }, this);  
        
         game.physics.arcade.collide( player, floor3, this.hitGround, function() { 
             if (Floor3Collide) {  return true;  }  return false; }, this); 
        
        
        //On collide
        game.physics.arcade.overlap(bullets, trumps, KillEnemy, null, this);
        game.physics.arcade.overlap(castle, trumps, BaseHit, null, this);
        game.physics.arcade.collide(floor1, trumps);
        game.physics.arcade.collide(floor2, trumps);
        game.physics.arcade.collide(floor3, trumps);
        
        if(cursor.left.isDown )
            {
                player.scale.x = -1;
                PlayerLook = "left";
            }
        
         if (cursor.right.isDown )
            {  
                player.scale.x = 1;
                PlayerLook = "right";
            }
        
          if (cursor.down.isDown && player.body.touching.down)
                JumpDown();
              
           if (spaceKey.isDown)
                this.ShootWeapon();
      

        if (cursor.up.isDown && player.body.touching.down)     
                JumpUp();
   
    }
    , hitGround: function () {
        if(PlayerLook == "right")
            game.add.tween(player).to({angle: 0}, 20).start(); 
        
         if(PlayerLook == "left")
             game.add.tween(player).to({angle: 0}, 20).start(); 
    },
    

ShootWeapon: function () {

        if (game.time.now > bulletTime) {
            
            // bullet = bullets.getFirstExists(false);
            bullet = game.add.sprite(0, 0, 'taco', false);
            
            bullets.add(bullet);
            
            if (bullet) {
            
             this.throwSound.play();  
            
           game.add.tween(player).to({ y: player.y + 5 }, 5).start();
           game.add.tween(player).to({ y: player.y - 5 }, 5).start();
                        
             bullet.anchor.setTo(0.5, 0.5); 
            bullet.angle = 100;
            if (PlayerLook == "right") 
            {
                bullet.reset(player.x + 6, player.y - 8);
                bullet.body.velocity.x = 1000;
                bulletTime = game.time.now + 350;
                 game.add.tween(player).to({ x: player.x + 5 }, 25).start();    
                setTimeout(function () {
                  game.add.tween(player).to({ x: player.x - 5  }, 25).start();
                }, 45);
            }
            if (PlayerLook == "left") 
            {
                bullet.reset(player.x - 55, player.y - 8);
                bullet.body.velocity.x = -1000;
                bulletTime = game.time.now + 350;
                game.add.tween(player).to({ x: player.x - 5 }, 25).start();    
                setTimeout(function () {
                  game.add.tween(player).to({ x: player.x + 5  }, 25).start();
                }, 45);
            }
          bullet.tween =   game.add.tween(bullet).to({ angle: -100 }, 1000).start();
        }
    }
          
    },
            
};



function JumpUp()
{
                 player.body.velocity.y = -1350;
                                
                if(PlayerLook == "right")
                    game.add.tween(player).to({angle: -20}, 100).start(); 
        
                if(PlayerLook == "left")
                    game.add.tween(player).to({angle: 20}, 100).start();   
            
                jumpSound.play();   
                
                if(Floor2Collide)
                    {
                        setTimeout(function(){
                            Floor1Collide = true; Floor2Collide = false;
                        }, 300);                         
                    }      
                
                if(Floor3Collide)
                    {
                        setTimeout(function(){
                            Floor2Collide = true; Floor3Collide = false;
                        }, 300);                         
                    } 
}

function JumpDown()
{
                   if(Floor1Collide){ Floor1Collide = false; Floor2Collide = true;}
               else if(Floor2Collide){Floor2Collide = false; Floor3Collide = true};
}



// Initialize Phaser, and create a 400px by 490px game 
var game = new Phaser.Game("100", "100");
// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);
// Start the state to actually start the game
game.state.start('main');
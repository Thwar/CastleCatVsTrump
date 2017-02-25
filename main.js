//GLOBAL VARIABLES
PlayerLook = "right";
Floor1Collide = false;
Floor2Collide = true;
Floor3Collide = false;
var bulletTime = 0;


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
}


function SetupPlayer()
{
       player = game.add.sprite(innerWidth/2 , 185, 'cat');
        

        // Add gravity to the bird to make it fall
        player.body.gravity.y = 5000;
    
    
        // Move the anchor to the left and rd
      //  game.bird.anchor.setTo(-0.2, 0.5); 
       player.anchor.setTo(0.5, 0.5); 
}


function SetupControls()
{  
     // Variable to store the arrow key pressed
      cursor = game.input.keyboard.createCursorKeys();      
     spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);         
}


function SetupBullets()
{
     bullets.enableBody = true;
    bullets.createMultiple(10, 'pipe');
    bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetBullet, this);
    bullets.setAll('checkWorldBounds', true);
    
}


//  Called if the bullet goes out of the screen
function resetBullet (bullet) {
    bullet.kill();
}

// Create our 'main' state that will contain the game
var mainState = {
    preload: function () {
        // This function will be executed at the beginning     
        // That's where we load the images and sounds 
        
        // Load the bird sprite
        game.load.image('bird', 'assets/bird.png');
        game.load.image('pipe', 'assets/pipe.png');
        game.load.image('cat', 'assets/cat.png');
        
        //Load Sound
        game.load.audio('jump', 'assets/jump.wav'); 
        

        
    }, create: function () {
        
        // Create  groups
        floor1 = game.add.group();
        floor2 = game.add.group();
        floor3 = game.add.group();
        bullets = game.add.group();
        
        
        // Change the background color of the game to blue
        game.stage.backgroundColor = 'black';
        
        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Add the physics engine to all game objects
        game.world.enableBody = true;
        
        //Add sound to game 
        this.jumpSound = game.add.audio('jump'); 
       

        SetupWorld();    
        SetupPlayer();
        SetupControls();
        SetupBullets();
        
        
        //DEBUG
        this.debugText1 = game.add.text(600, 20, "Test", { font: "16px Arial", fill: "#ffffff", align: "center" });
                
        
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
        
        if(cursor.left.isDown && player.body.touching.down)
            {
                player.angle = -180;    
                PlayerLook = "left";
            }
        
         if (cursor.right.isDown && player.body.touching.down)
            {
                 player.angle = 0;                
                PlayerLook = "right";
            }
        
          if (cursor.down.isDown && player.body.touching.down)
            {
               if(Floor1Collide){ Floor1Collide = false; Floor2Collide = true;}
               else if(Floor2Collide){Floor2Collide = false; Floor3Collide = true};
            }
        
        
           if (spaceKey.isDown)
                this.ShootWeapon();
      
        
        
        
        if (cursor.up.isDown && player.body.touching.down)     
            {
                player.body.velocity.y = -1350;
                                
                if(PlayerLook == "right")
                    game.add.tween(player).to({angle: -20}, 100).start(); 
        

                if(PlayerLook == "left")
                    game.add.tween(player).to({angle: -160}, 100).start();   
                
                
               // this.jumpSound.play();   
                
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
    }
    , 
        hitGround: function()
    {
         if(PlayerLook == "right")
             game.add.tween(player).to({angle: 0}, 20).start(); 
        
                 if(PlayerLook == "left")
             game.add.tween(player).to({angle: -180}, 20).start(); 
    },
    
ShootWeapon: function()
    {
        
                   this.debugText1.text = "Space bar pressed";
            if (game.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            if (PlayerLook == "right")
                {
                    bullet.reset(player.x + 6, player.y - 8);
                    bullet.body.velocity.x = 600;
                    bulletTime = game.time.now + 350;
                }
            
                        if (PlayerLook == "left")
                {
                    bullet.reset(player.x - 6 , player.y - 8);
                    bullet.body.velocity.x = -600;
                    bulletTime = game.time.now + 350;
                }
        }
    }
          
    },
            


    

};
// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game("100", "100");
// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);
// Start the state to actually start the game
game.state.start('main');
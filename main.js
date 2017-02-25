//GLOBAL VARIABLES
PlayerLook = "right";
Floor1Collide = false;
Floor2Collide = true;
Floor3Collide = false;
var bulletTime = 0;

var swipeCoordX,   swipeCoordY,   swipeCoordX2,     swipeCoordY2,   swipeMinDistance = 100;  

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

function SetupEnemies()
{
    CreateTrump(50,innerHeight/2  - 170, 'left' );
    CreateTrump(50,innerHeight/2  - 20, 'left' );
    CreateTrump(50,innerHeight/2 + 130, 'left' );
    
     CreateTrump(innerWidth - 50,innerHeight/2 - 170, 'right' );
     CreateTrump(innerWidth - 50,innerHeight/2 - 20, 'right' );
     CreateTrump(innerWidth - 50,innerHeight/2 + 130, 'right' );
}


function CreateTrump(x, y, direction)
{
    if(direction == "left")
        {
    trump = game.add.sprite( x , y , 'trump');  
    trump.anchor.setTo(0.5, 0.5); 
    trump.body.gravity.x = 50;
    trump.body.gravity.y = 100;
    
    trumps.add(trump);  
        }
    
       if(direction == "right")
           {
                trump = game.add.sprite( x , y , 'trump');  
                trump.anchor.setTo(0.5, 0.5); 
                trump.body.gravity.x = -50;
                trump.body.gravity.y = 100;
                trump.scale.x = -1;
                trumps.add(trump);     
           }
}

//  Called if the bullet goes out of the screen
function resetBullet (bullet) {
    bullet.kill();
}

    function KillEnemy()
    {
            trump.kill();
    
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
        game.load.image('trump', 'assets/trump.png');
        
        
        //Load Sound
        game.load.audio('jump', 'assets/jump.wav'); 
        

        
    }, create: function () {
        
        // Create  groups
        floor1 = game.add.group();
        floor2 = game.add.group();
        floor3 = game.add.group();
        bullets = game.add.group();
        trumps = game.add.group();
        
        
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
        SetupEnemies();
        
        
        //DEBUG
        this.debugText1 = game.add.text(600, 20, "Test", { font: "16px Arial", fill: "#ffffff", align: "center" });
        this.debugText2 = game.add.text(600, 60, "Test", { font: "16px Arial", fill: "#ffffff", align: "center" });
        this.debugText3 = game.add.text(600, 100, "Test", { font: "16px Arial", fill: "#ffffff", align: "center" });
        
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
        game.physics.arcade.overlap( bullets, trumps, this.dieTrump, null, this);  
        
        
        game.physics.arcade.collide( floor1, trumps);
        game.physics.arcade.collide( floor2, trumps);
        game.physics.arcade.collide( floor3, trumps);
        
        if(cursor.left.isDown && player.body.touching.down)
            {
               // player.angle = 250;  
                player.scale.x = -1;
                PlayerLook = "left";
            }
        
         if (cursor.right.isDown && player.body.touching.down)
            {
                // player.angle = 0;  
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
    , 
        hitGround: function()
    {
        if(PlayerLook == "right")
            game.add.tween(player).to({angle: 0}, 20).start(); 
        
         if(PlayerLook == "left")
             game.add.tween(player).to({angle: 0}, 20).start(); 
    },
    
            dieTrump: function(player, trump)
    {
            trump.kill();
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
                    bullet.body.velocity.x = 1000;
                    bulletTime = game.time.now + 350;
                }
            
            
            if (PlayerLook == "left")
                {
                    bullet.reset(player.x - 55 , player.y - 8);
                    bullet.body.velocity.x = -1000;
                    bulletTime = game.time.now + 350;
                }
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
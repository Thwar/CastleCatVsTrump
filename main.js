//GLOBAL VARIABLES
PlayerLook = "right";


function SetupWorld()
{
    
          // Floor 3
        for (var i = 0; i < window.innerWidth  ; i += 50) 
            {                                             
                 var pipe = game.add.sprite(i, innerHeight/2 + 200, 'pipe');
                pipe.body.immovable = true;
                pipes.add(pipe);             
                
            }
    
              // Floor 2
        for (var i = 0; i < window.innerWidth  ; i += 50) 
            {                                             
                 var pipe = game.add.sprite(i, innerHeight/2 + 50 , 'pipe');
                 pipe.body.immovable = true;
                pipes.add(pipe);             
                
            }
    
              // Floor 1
        for (var i = 0; i < window.innerWidth  ; i += 50) 
            {                                             
                 var pipe = game.add.sprite(i, innerHeight/2 - 100, 'pipe');
                 pipe.body.immovable = true;
                pipes.add(pipe);             
                
            }
}


function SetupPlayer()
{
       player = game.add.sprite(innerWidth/2, 185, 'bird');
        

        // Add gravity to the bird to make it fall
        player.body.gravity.y = 1000;
    
    
        // Move the anchor to the left and downward
      //  game.bird.anchor.setTo(-0.2, 0.5); 
       player.anchor.setTo(0.5, 0.5); 
}

// Create our 'main' state that will contain the game
var mainState = {
    preload: function () {
        // This function will be executed at the beginning     
        // That's where we load the images and sounds 
        
        // Load the bird sprite
        game.load.image('bird', 'assets/bird.png');
        game.load.image('pipe', 'assets/pipe.png');
        
        //Load Sound
        game.load.audio('jump', 'assets/jump.wav'); 
        

        
    }, create: function () {
        
        // Create an empty group
        pipes = game.add.group();
        
        // Variable to store the arrow key pressed
        this.cursor = game.input.keyboard.createCursorKeys();
        
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
                

        
        
     }
    , update: function () {
        // This function is called 60 times per second    
        // It contains the game's logic   
         game.physics.arcade.collide( player, pipes, this.hitGround, null, this);  
        
        if(this.cursor.left.isDown)
            {
                player.angle = -180;    
                PlayerLook = "left";
            }
        
         if (this.cursor.right.isDown)
            {
                 player.angle = 0; 
                
                PlayerLook = "right";
            }
        
        if (this.cursor.up.isDown && player.body.touching.down) 
            {
                player.body.velocity.y = -450;
                
                if(PlayerLook == "right")
                    game.add.tween(player).to({angle: -20}, 100).start(); 
        

                if(PlayerLook == "left")
                    game.add.tween(player).to({angle: -160}, 100).start();   
                
                
                this.jumpSound.play();                 
            }
    
    }
    , 
        hitGround: function()
    {
         if(PlayerLook == "right")
             game.add.tween(player).to({angle: 0}, 25).start(); 
        
                 if(PlayerLook == "left")
             game.add.tween(player).to({angle: -180}, 25).start(); 
    },
    




    

};
// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game("100", "100");
// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);
// Start the state to actually start the game
game.state.start('main');
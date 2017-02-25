


//GLOBAL VARIABLES



function SetupWorld()
{
    
          // Floor 3
        for (var i = 0; i < window.innerWidth  ; i += 50) 
            {                                             
                 var pipe = game.add.sprite(i, innerHeight/2 + 200, 'pipe');
                pipes.add(pipe);             
                
            }
    
              // Floor 2
        for (var i = 0; i < window.innerWidth  ; i += 50) 
            {                                             
                 var pipe = game.add.sprite(i, innerHeight/2 + 50 , 'pipe');
                pipes.add(pipe);             
                
            }
    
              // Floor 1
        for (var i = 0; i < window.innerWidth  ; i += 50) 
            {                                             
                 var pipe = game.add.sprite(i, innerHeight/2 - 100, 'pipe');
                pipes.add(pipe);             
                
            }
}


function SetupPlayer()
{
    
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
        
        // Change the background color of the game to blue
        game.stage.backgroundColor = 'black';
        
        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Add the physics engine to all game objects
        game.world.enableBody = true;
        
       

        SetupWorld();    
        SetupPlayer();
                

        
        
     }
    , update: function () {
        // This function is called 60 times per second    
        // It contains the game's logic   
        
    }
             , 
    
    




    

};
// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game("100", "100");
// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);
// Start the state to actually start the game
game.state.start('main');
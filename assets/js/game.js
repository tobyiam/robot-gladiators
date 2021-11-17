
var randomNumber = function(min,max) {
    var value = Math.floor(Math.random() * (max-min +1) + min);

    return value;
};

var fightOrSkip = function() {
    // ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // Conditional Recursive Function Call 
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    // if player picks "skip" confirm and then stop the loop 
    promptFight = promptFight.toLowerCase();
    
    if (promptFight === "skip") {
        // confirm player wants to skip 
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight 
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            //subtract money from playerMoney for skipping 
            playerInfo.playerMoney = playerInfo.money - 10;
            return true;
        }
    }
return false;
}

var fight = function(enemy) {
    while(playerInfo.health > 0 && enemy.health > 0) {
      if (fightOrSkip()){
          break;
      } 
        var damage = randomNumber (playerInfo.attack - 3, playerInfo.attack);

            // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
            // generate random damage value based on player's attack power 
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            enemy.Health = Math.max(0, enemy.Health - damage);
            console.log(
                playerInfo.name + " attacked " + enemy.Name + ". " + enemy.Name + " now has " + enemy.Health + " health remaining."
            );

            // check enemy's health 
            if (enemy.Health <= 0) {
                window.alert(enemy.Name + " has died!");

                // award player money for winning 
                playerInfo.money = playerInfo.money + 20;

                //leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemy.Name + " still has " + enemy.Health + " health left.");
            }

            // remove player's health by subtracting the amount set in the enemyAttack variable
            var damage = randomNumber(enemy.Attack - 3, enemy.Attack);

            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(
                enemy.Name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );

            // check player's health 
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " had died!");
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
};    

// function to start a new game
var startGame = function() {
    // reset player stats 
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
        console.log(playerInfo);

    if (playerInfo.health >0) {
        // let player know what round they are in, remeber that arrays start at 0 so it needs to have 1 added to it.
        window.alert ("Welcome to Robot Gladiators! Round " + ( i + 1 ) );
        // pick new enemy to fight based on the index of the enemyNames array
        var pickedEnemyObj = enemyInfo[i];

        // reset enemyHealth before starting new fight 
        pickedEnemyObj.health = randomNumber(40,60);
        console.log(pickedEnemyObj);

        // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
        fight(pickedEnemyObj);

        // if we're not at the last enemy in the array 
        if(playerInfo.health > 0 && i < enemyInfo.length -1) {
            // ask if player wants to use the store before next round 
            var storeConfirm = window.confirm("The fight is over, visit the store before the next round? "); 
            
            // if yes, take them to the store() function
            if(storeConfirm) {
            shop();
            }
        }
    }

        }
        else {
            window.alert('You have lost your robot in battle! Game Over!');
            break;
          }
    }
    // after the loop ends, player is either out of health of enemies to fight, so run the endGame function
    endGame();
};

// function to end the entire game 
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");
   // if player is still alive, player wins! 
   if (playerInfo.health > 0) {
       window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
   }
   else{
       window.alert("You've lost your robot in battle.");
   }

   // ask player if they'd like to play again 
   var playerAgainConfirm = window.confirm("Would you like to play again?");

   if (playerAgainConfirm) {
       // restart the game
       startGame();
   }
   else{
       window.alert("Thank you for playing Robot Gladiators! Come back soon!");
   }
};

var shop = function() {
    // ask player what they'd like to do 
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
    );

    shopOptionPrompt = parseInt(shopOptionPrompt);

    // use switch to carry out action 
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;

        case 3:
            window.alert("Leaving the store.");

            // do nothing, so function will end 
            break;
        default:
            window.alert("You did not pick a valid option. Try again");

            // call stop() again to force player to pick a valid option
            shop();
            break;
    }
};

// function to set name 
var getPlayerName = function() {
    var name = "";

while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
}

console.log("Your robot's name is " + name);
return name;
}


var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    }, // comma! 
    refillHealth: function() {
      if (this.money >= 7) {
        window.alert("Refilling player's health by 20 for 7 dollars.");
        this.health += 20;
        this.money -= 7;
    }
    else {
        window.alert("You don't have enough money!");
    }
    }, // comma! 
    upgradeAttack: function() {
      if (this.money >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");
        this.attack += 6;
        this.money -= 7;
    }
    else {
        window.alert("You don't have enough money!");
    }
}
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10,14)
    },
    { 
        name: "Amy Android",
        attack: randomNumber(10,14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10,14)
    }
];

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
console.log(enemyInfo[0]['attack']);

// start the game when the page loads
startGame();

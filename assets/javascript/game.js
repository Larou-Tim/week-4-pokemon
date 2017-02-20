$(document).ready(function() {

	// stat increase moves
	// accuracy

	// 1. speed determines order unless quick attack - note pikachu is fastest so will always go first
	// 2. player picks attack / computer picks attack
		// computer will pick random 1/4 will not do ai logic trees
	// 3. check if attack hits, random number from 1-100 if rnd is greater attack misses
	// 4. calculate attack damage
		// will find formula
		//stat stage
		// need to use attack/special 
		// move type vs pokemon type
	// 5. remove damage from HP
		// if hp <= 0 pokeman is defeated
	// 6. next player 
	// if player wins he gets +1 level - will figure out stat  boost



	/* todolist
		speed turn order
		accuracy
		critical
		winnerHandler
		next enemy
		re

	*/

	var gameStart = true;
	var battleStart = false;
	var profOak = '<img src="assets/images/oak.png" alt="Professor Oak" id="prof-oak">'; 
	var playerAttackStage = 0;
	var playerDefenseStage = 0;
	var enemyAttackStage = 0;
	var enemyDefenseStage = 0;
	var playerPokemon ;
	var enemyPokemon;
	var playerLevel = 20;
	
	var playerMaxHP;
	var playerCurHP;
	var enemyCurHP ;
	var enemyMaxHP ;
	var levelUp = false;
	var playerSeeded = false;
	var enemySeeded = false;

	// pokemon choices and all relevant info 
	var pokemon = {
		pikachu: {
			name:"Pikachu",
			picture: "assets/images/pikachu.gif",
			pictureBack: "assets/images/pikachu-back.gif",
			defeated: false,
			type: 'electric',
			hp: 35,
			attack: 55,
			defense: 30,
			special: 50,
			specDef: 40,
			speed: 90,
			moveSet: [
				{
					name: "Thunder Shock",
					power: 40,
					accuracy: 1,
					stab: 1.5,
					attack: true,
					type: 'electric'
				},
				{
						//lowers def
					name: "Tail Whip",
					// power: 35,
					accuracy: 1,
					attack: false,
					stat: 'defense'
					// type: 1.5,
				},
				{
						// decreases attack
					name: "Growl",
					// power: 20,
					// type: 1.5,
					accuracy: 1,
					stat: 'attack',
					attack: false

				},
				{
					name:"Quick Attack",
					power: 40,
					accuracy: 1,
					stab: 1,
					attack: true,
					type: 'noraml'
				}

			],
		},

		squirtle: {
			name: "Squirtle",
			picture: "assets/images/squirtle.gif",
			pictureBack: "assets/images/squirtle-back.gif",
			defeated: false,
			type: 'water',
			hp: 44,
			attack: 48,
			defense: 65,
			special: 50,
			specDef: 64,
			speed: 43,
			moveSet: [
				{
					name: "Tackle",
					power: 35,
					accuracy: .95,
					stab: 1,
					special: false,
					attack: true,
					type: 'normal'
				},
				{
					//lowers def
					name: "Tail Whip",
					accuracy: 1,
					attack: false,
					stat: "defense"
				},
				{
					name: "Bubble",
					power: 20,
					stab: 1.5,
					accuracy: 1,
					special: true,
					attack: true,
					type: 'water'


				},
				{
					name:"Water Gun",
					power: 40,
					accuracy: 1,
					stab: 1.5,
					special: true,
					attack: true,
					type: 'water'

				}
			]
		},

		charmander : {
		 	name: "Charmander",
			picture: "assets/images/charmander.gif",
			pictureBack: "assets/images/charmander-back.gif",
			defeated: false,
			type: 'fire',
			hp: 39,
			attack: 52,
			defense: 43,
			special: 60,
			specDef: 50,
			speed: 65,
			moveSet: [
				{
					name: "Scratch",
					power: 40,
					accuracy: 1,
					stab: 1,
					attack: true,
					type:'normal'
				},
				{
					name: "Ember",
					power: 45,
					accuracy: 1,
					stab: 1.5,
					attack: true,
					type: 'fire'
				},
				{
					//decreases attack
					name: "Growl",
					attack: false,
					accuracy: 1 ,
					stat: 'attack'

				},
				{
					//lowers def 1 stage
					name:"Leer",
					stat: 'defense',
					accuracy: .9,
					attack: true
				}

			],
		},

		bulbasaur : {
			name: "Bulbasaur",
			picture: "assets/images/bulbasaur.gif",
			pictureBack: "assets/images/bulbasaur-back.gif",
			defeated: false,
			type: 'grass',
			hp: 45,
			attack: 49,
			defense: 49,
			special: 65,
			specDef: 65,
			speed: 45,
			
			moveSet: [
				{
					name: "Tackle",
					power: 35,
					accuracy: .95,
					stab: 1,
					attack: true,
					type: 'normal'
				},
				{
					name: "Vine Whip",
					power: 35,
					accuracy: 1,
					stab: 1.5,
					attack: true,
					type: 'grass'
				},
				{
					//decreases attack
					name: "Growl",
					attack: false,
					stat: 'attack',
					accuracy: 1

				},
				{
					//this has special effects, of stealing health
					name:"Leech Seed",
					accuracy: .9,
					stab: 1.5,
					attack: false,
					type: 'grass',
					stat: 'seed'
				}
			],
		}
	}
	
	//start of the game
	$("#image-box").html(profOak);
	typeWords("Welcome to a quick Pokemon battle. First you will need to choose your pokemon.")


	//handles when there is no buttons on the screen (first screen and after an enemy is selected)
	$("body").on("click", function(){
		console.log(battleStart);
		if (gameStart) {
			$("#image-box").empty();
			$("#text-display").stop();
			$("#text-display").empty();
			$("#selection-box").append('<img src="assets/images/squirtle.gif" alt="squirtle" id="squirtle" class="char-select">'); 
			$("#selection-box").append('<img src="assets/images/bulbasaur.gif" alt="bulbasaur" id="bulbasaur" class="char-select">'); 
			$("#selection-box").append('<img src="assets/images/charmander.gif" alt="charmander" id="charmander" class="char-select">' );
			$("#selection-box").append('<img src="assets/images/pikachu.gif" alt="pikachu" id="pikachu" class="char-select">' 		);
			typeWords("Here are your choices: Squitle, Bulbasaur, Charmander, or Pikachu");
			gameStart = false;
		}
		else if (battleStart) {
			playerAttackSelect();
			 // typeWords(" ");
			// console.log("moves");
		}


	});

	//handler for when chacter picks a pokemon
	$("body").on("click", ".char-select", function(){

  		var selectedChar = $(this).attr('id');
  		// console.log('xxx');

  		// pokemon[selectedChar].addPlayer();
  		playerAdd(selectedChar);
	});

	//handler when enemy is selected
	$("body").on("click", ".enemey-select", function(){

  		var selectedChar = $(this).attr('id');
  		// console.log(selectedChar);
  		$("#selection-box").empty();
  		$("#selection-box").append( '<img src="' + pokemon[selectedChar].picture +'" alt="" class="battle-target" id="' + selectedChar + '">');
  		typeWords("You chose to battle " + pokemon[selectedChar].name + ". Good luck!")
  		enemyPokemon = selectedChar;
  		battleStart = true;

  		addStats();
  		// startBattle(selectedChar);
	});

	function addStats() {
		playerMaxHP = pokemon[playerPokemon].hp;
		playerCurHP = playerMaxHP;
		enemyMaxHP = pokemon[enemyPokemon].hp;
		enemyCurHP = enemyMaxHP;
		enemySeeded = false;
		playerSeeded = false;

	}

	//handles the display of non defeated enemy pokemon and asks who to battle
	function playerAdd(playerChacter) {
		$("#selection-box").empty();

		$("#image-box").append( '<img src="' + pokemon[playerChacter].pictureBack  +'" alt="" id="player">');
		playerPokemon = playerChacter;
		if (levelUp) {
			playerLevel += 5;
			// playerMaxHP += 15;
			pokemon[playerPokemon].hp += 15;
		}

		console.log("was squrittle beat " + pokemon.squirtle.defeated);

		if (!pokemon.pikachu.defeated && playerChacter != "pikachu" ) {
			$("#selection-box").append( '<img src="' + pokemon.pikachu.picture +'" alt="" class="enemey-select" id="pikachu">');
		}
		if (!pokemon.bulbasaur.defeated && playerChacter != "bulbasaur") {
			$("#selection-box").append( '<img src="' + pokemon.bulbasaur.picture +'" alt="" class="enemey-select" id="bulbasaur">');
		}
		if (!pokemon.charmander.defeated && playerChacter != "charmander") {
			$("#selection-box").append( '<img src="' + pokemon.charmander.picture +'" alt="" class="enemey-select" id="charmander">');
		}

		if (!pokemon.squirtle.defeated && playerChacter != "squirtle") {
			$("#selection-box").append( '<img src="' + pokemon.squirtle.picture +'" alt="" class="enemey-select" id="squirtle">');
		}


			typeWords("Who would you like to battle?");
	}

	// handles damage dealing attacks

	function attackCalc(user, move) {
		var stabLevel;
		var base;
		var level;
		var typeBonus;
		var critical;
		var attackLevel;
		var defenseLevel;
		//want to be between .85 and 1.15
		var rand = Math.floor((Math.random()*(115-85))+85)/100;
		var damageOutput;
		var curPokemon;
		var atkCurStage;
		var defCurStage;

		if (user == 'player') {
			curPokemon = playerPokemon;
			targetPokemon = enemyPokemon;
			level = playerLevel;
			atkCurStage = statStageCalc(playerAttackStage);
			defCurStage = statStageCalc(enemyDefenseStage);
		}

		else {
			curPokemon = enemyPokemon;
			targetPokemon = playerPokemon;
			level = 20;
			atkCurStage = statStageCalc(enemyAttackStage);
			defCurStage = statStageCalc(playerDefenseStage);
		}

		base = pokemon[curPokemon].moveSet[move].power;
		stabLevel = pokemon[curPokemon].moveSet[move].stab;
		critical = 1; //implement later
		typeBonus = determineTypeBonus ( pokemon[curPokemon].moveSet[move].type ,  pokemon[targetPokemon].type);

		if (pokemon[curPokemon].moveSet[move].special) {
			attackLevel = pokemon[curPokemon].special;
			defenseLevel = pokemon[targetPokemon].specDef;

		}

		else {
			attackLevel = pokemon[curPokemon].attack;
			defenseLevel = pokemon[targetPokemon].defense;
		}

		damageOutput = Math.floor(((2  *level + 10) / 250) * ((attackLevel * atkCurStage) / (defenseLevel * defCurStage)) * (base*stabLevel*typeBonus*critical*rand));
			
		if (user == 'player') {
			enemyCurHP -= damageOutput;
		}

		else {
			playerCurHP -= damageOutput;
		}

		hpBar();
		// console.log( '( (2 * ' + level + '+ 10)/250)* (' + attackLevel +' /' + defenseLevel + ' ) * ( ' + base + '*' + stabLevel + '*' + typeBonus +'*' + critical + '* ' +rand +'));');
		// damageOutput = Math.floor(((2*level + 10)/250)* (attackLevel / defenseLevel) * (base*stabLevel*typeBonus*critical*rand));
		// console.log(curPokemon + ' hit you with ' + pokemon[curPokemon].moveSet[move].name + ' for ' + damageOutput);
	}

	function statStageCalc(stage) {
		// only can lower with skills chosen, and below 6 is default to capture all cases quickly
          switch (stage) {
            case 0:
            	return 1;
            	break;
            case -1:
            	return .66;
            	break;
            case -2:
            	return .5;
            	break;
            case -3:
            	return .4;
            	break;
            case -4:
            	return .33;
            	break;
            case -5:
            	return .28;
            	break;
            default:
            	return .25;
            	break;
            }

         		/* only have lowering effects
				-6 .25
				-5 = .28
				-4 = .33
				-3 = .4
				-2 = .5
				-1 = .66
				0 = 1

			*/
	}

	//handles the debuff attacks
	function debuffCalc(user,move) {

		// var curPokemon;
		var statHit;

		if (user =='player') {
			statHit = pokemon[playerPokemon].moveSet[move].stat
		}
		else {
			statHit = pokemon[enemyPokemon].moveSet[move].stat

		}

		console.log("move:" +  move +" stat:" +statHit  );
		// var stat = pokemon[curPokemon]

		// console.log('debuffed you');

		if (user == 'player') {
			if (statHit == 'attack'){
				enemyAttackStage--;
			}
			else if (statHit == 'defense') {
				enemyDefenseStage--;
			}
			else if (statHit == 'seed') {
				enemySeeded = true;
				leechSeed();
			}
		}

		else {
			if (statHit == 'attack') {
				playerAttackStage--;
			}
			else  if (statHit == 'defense') {
				playerDefenseStage--;
			}
			else if (statHit == 'seed') {
				playerSeeded = true;
				leechSeed();
			}
		
		}
		console.log(enemyAttackStage + ' ' + enemyDefenseStage);
	}

	function leechSeed () {
		var seedAmount ;

		if (playerSeeded) {
			seedAmount = Math.ceil(playerCurHP/16);
			playerCurHP -= seedAmount;
			enemyCurHP += seedAmount;
		}

		if (enemySeeded) {
			seedAmount = Math.ceil(enemyCurHP/16);
			enemyCurHP -= seedAmount;
			playerCurHP += seedAmount;

		}
		console.log("seeded " + seedAmount);
	}

	function determineTypeBonus(target, defender ) {
		if(target == 'electric' && defender == 'water') {
			console.log('super effective');
			return 2;

		}
		else if (target == 'water' && defender == 'fire') {
			console.log('super effective');
			return 2;
		}
		else if (target == 'fire' && defender == 'grass') {
			console.log('super effective');
			return 2;
		}
		else if (target == 'grass' && defender == 'electric') {
			console.log('super effective');
			return 2;
		}



		else {
			return 1;
		}

	}

	function turnHandler(movePicked) {

		var move = pokemon[playerPokemon].moveSet[movePicked];

		var playerSpeed = pokemon[playerPokemon].speed;
		var enemySpeed = pokemon[enemyPokemon].speed;

		if (playerSpeed >= enemySpeed) {
			console.log(pokemon[playerPokemon].name + ' strikes first');
			leechSeed();
			if(move.attack) {
				attackCalc('player', movePicked);
				}
			else {
				debuffCalc('player', movePicked);
			}
			
			hpCheck('enemy');

			enemyMove();
			hpCheck('player');
		} 

		else {
			console.log(pokemon[enemyPokemon].name + ' strikes first');
			leechSeed();
			enemyMove();
			hpCheck('player');


			if(move.attack) {
				attackCalc('player', movePicked);
				}
			else {
				debuffCalc('player', movePicked);
			}
			hpCheck('enemy');
		}
	}


	function hpCheck(user) {
		if (user == 'player') {
			if (playerCurHP <= 0 ) {
				console.log('You ded');
				playerAdd(playerPokemon); /// if you ded this is gamer 
			}
		}
		else {
			if (enemyCurHP <= 0 ) {
				console.log('He ded');
				pokemon[enemyPokemon].defeated = true;
				levelUp = true;
				playerAdd(playerPokemon); // you win
				
				return;
			}
		}
	}
	//each button handles attack click, couldn't use class and onclick, as it would only register first button
	
	$("body").on("click","#attack1",function(){
		// console.log(this.id);

		// var movePicked = pokemon[playerPokemon].moveSet[0];
		turnHandler(0);
	
	});

	$("body").on("click","#attack2",function(){
		turnHandler(1);
	});

	$("body").on("click","#attack3",function(){
		turnHandler(2);
	});

	$("body").on("click","#attack4",function(){
		// console.log(this.id);		
		turnHandler(3);

	});

	function enemyMove(){
		var enemyAttackNum = Math.floor(Math.random()*4);
		var enemyAttack = pokemon[enemyPokemon].moveSet[enemyAttackNum];
		console.log('The enemy used ' + enemyAttack.name)
		if(enemyAttack.attack) {
			attackCalc('enemy', enemyAttackNum);
		}
		else {
			debuffCalc('enemy', enemyAttackNum);
		}
	}

	//displays moves available to user
	function playerAttackSelect() {
		// typeWords(" ");
		// $("#icon-spot").html("");
		var image = $("<img>");
		var image2 = $("<img>");
		image.attr("src","assets/images/enemyHP.png");
		image.attr("id", "enemy-hp-box");
		image2.attr("src","assets/images/playerHP.png");
		image2.attr("id", "player-hp-box");
		$("#selection-box").append(image);
		$("#selection-box").append(image2);

		hpBar();


		var attack1 = '<div class="row"><button type="button" class="btn btn-default attack-but" id="attack1">' + pokemon[playerPokemon].moveSet[0].name +'</button> </div>';
		var attack2 = '<div class="row"><button type="button" class="btn btn-default attack-but" id="attack2">' + pokemon[playerPokemon].moveSet[1].name +'</button> </div>';
		var attack3 = '<div class="row"><button type="button" class="btn btn-default attack-but" id="attack3">' + pokemon[playerPokemon].moveSet[2].name +'</button> </div>';
		var attack4 = '<div class="row"><button type="button" class="btn btn-default attack-but" id="attack4">' + pokemon[playerPokemon].moveSet[3].name +'</button> </div>';

		$("#text-display").empty();
		$("#text-display").append(attack1);
		$("#text-display").append(attack2);
		$("#text-display").append(attack3);
		$("#text-display").append(attack4);

		var attack1 = '<div class="row"><button type="button" class="btn btn-default attack-but" id="attack1">' + pokemon[playerPokemon].moveSet[0].name +'</button> </div>';
		var attack2 = '<div class="row"><button type="button" class="btn btn-default attack-but" id="attack2">' + pokemon[playerPokemon].moveSet[1].name +'</button> </div>';
		var attack3 = '<div class="row"><button type="button" class="btn btn-default attack-but" id="attack3">' + pokemon[playerPokemon].moveSet[2].name +'</button> </div>';
		var attack4 = '<div class="row"><button type="button" class="btn btn-default attack-but" id="attack4">' + pokemon[playerPokemon].moveSet[3].name +'</button> </div>';

		$("#text-display").empty();
		$("#text-display").append(attack1);
		$("#text-display").append(attack2);
		$("#text-display").append(attack3);
		$("#text-display").append(attack4);
	}
	//curentHP, maxHP, user	
	function hpBar () {
	  	var progDiv1 = $('<div>');
	    progDiv1.attr("class","progress");
	    var progDiv2 = $('<div>');
	    progDiv2.attr("class","progress");
	    // var hpDisplay = $('<span>');
	    // hpDisplay.html()
	    $("#hp-display").html('<span">' + playerCurHP + '/' + playerMaxHP + "</span>");

	    // var currentHP = playerCurHP;
	    // var maxHP = playerMaxHP;
	    // var progInterior = $("<div>");
	    // var progInterior.attr("class", "progress-bar")
	 
	    var playerHpPercent = Math.floor( playerCurHP/playerMaxHP * 100 );
	    var enemyHpPercent = Math.floor( enemyCurHP/enemyMaxHP * 100 );



	    if (enemyHpPercent > 50) {
	      progDiv1.html('<div class="progress-bar progress-bar-success" style="width:' + enemyHpPercent +'%"><span class="sr-only"></span></div>');

	    }
	    else if(enemyHpPercent > 20) {
	       progDiv1.html('<div class="progress-bar progress-bar-warning" style="width:' + enemyHpPercent +'%"><span class="sr-only"></span></div>');
	    }

	    else if(enemyHpPercent > 0) {
	      progDiv1.html('<div class="progress-bar progress-bar-danger" style="width:' + enemyHpPercent +'%"><span class="sr-only"></span></div>');     
	    }
	    $("#enemy-hp-bar").html(progDiv1);


	    if (playerHpPercent > 50) {
	      progDiv2.html('<div class="progress-bar progress-bar-success" style="width:' + playerHpPercent +'%"><span class="sr-only"></span></div>');

	    }
	    else if(playerHpPercent > 20) {
	       progDiv2.html('<div class="progress-bar progress-bar-warning" style="width:' + playerHpPercent +'%"><span class="sr-only"></span></div>');
	    }

	    else if(playerHpPercent > 0) {
	      progDiv2.html('<div class="progress-bar progress-bar-danger" style="width:' + playerHpPercent +'%"><span class="sr-only"></span></div>');     
	    }

	 	$("#player-hp-bar").html(progDiv2);
	  }
	//typewriter effect code
	function typeWords(words) {

	        $(function(){
	          $("#text-display").typed({
	            strings: [words],
	            typeSpeed: 1
	          });
	        });
	      
	        $("#icon-spot").html(
	          '<i class="glyphicon glyphicon-triangle-bottom" aria-hidden="true" id="blink-icon"></i>'
	        );
	          blink();
	      
  	}

  	//blinking for text icon
    function blink (){
    	$('#blink-icon').delay(200).fadeTo(200,0.0).delay(200).fadeTo(200,1, blink);
     }

	});









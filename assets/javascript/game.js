$(document).ready(function() {

	var gameStart = true;
	var profOak = '<img src="assets/images/oak.png" alt="Professor Oak" id="prof-oak">' 

	var pokemon = {
			pikachu: {
				name:"Pikachu",
				picture: "assets/images/pikachu.gif",
				pictureBack: "assets/images/pikachu-back.gif",
				defeated: false,
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
						type: 1.5,
					},
					{
						name: "Tail Whip",
						// power: 35,
						accuracy: 1,
						// type: 1.5,
					},
					{
						name: "Growl",
						// power: 20,
						// type: 1.5,
						accuracy: 1

					},
					{
						name:"Quick Attack",
						power: 40,
						accuracy: 1,
						type: 1,
					}

				],

			
				
			},

			squirtle: {
				name: "Squitle",
				picture: "assets/images/squirtle.gif",
				pictureBack: "assets/images/squirtle-back.gif",
				defeated: false,
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
						type: 1,
						special: false
					},
					{
						name: "Tail Whip",
						// power: 35,
						accuracy: 1,
						// type: 1.5,
					},
					{
						name: "Bubble",
						power: 20,
						type: 1.5,
						accuracy: 1,
						special: true,

					},
					{
						name:"Water Gun",
						power: 40,
						accuracy: 1,
						type: 1.5,
						special: true
					}
					]
		
			},

			 charmander : {
			 	name: "Charmander",
				picture: "assets/images/charmander.gif",
				pictureBack: "assets/images/charmander-back.gif",
				defeated: false,
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
						type: 1,
					},
					{
						name: "Ember",
						power: 45,
						accuracy: 1,
						type: 1.5,
					},
					{
						name: "Growl",

					},
					{
						name:"Leer",
						accuracy: .9
					}

				],

				
					
				
			},

			

			bulbasaur : {
				name: "Bulbasaur",
				picture: "assets/images/bulbasaur.gif",
				pictureBack: "assets/images/bulbasaur-back.gif",
				defeated: false,
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
						type: 1,
					},
					{
						name: "Vine Whip",
						power: 35,
						accuracy: 1,
						type: 1.5,
					},
					{
						name: "Growl",

					},
					{
						name:"Leach Seed",
						accuracy: .9,
						type: 1.5,
					}

				],

			
			
		}
	}
	
	$("#image-box").html(profOak);

	typeWords("Welcome to a quick Pokemon battle. First you will need to choose your pokemon.")



	$("body").on("click", function(){
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


	});


	$("body").on("click", ".char-select", function(){

  		var selectedChar = $(this).attr('id');
  		// console.log('xxx');

  		// pokemon[selectedChar].addPlayer();
  		playerAdd(selectedChar);
	});

	$("body").on("click", ".enemey-select", function(){

  		var selectedChar = $(this).attr('id');
  		// console.log(selectedChar);
  		$("#selection-box").empty();
  		$("#selection-box").append( '<img src="' + pokemon[selectedChar].picture +'" alt="" class="battle-target" id="' + selectedChar + '">');
  		typeWords("You chose to battle " + pokemon[selectedChar].name + ". Good luck!")
  		// startBattle(selectedChar);
	});

	// $(".char-select").on("click", function() {
	// 	// characterSelect("squirtle");
	// 	console.log($(this).attr('id'));
	// 	console.log('xxx');
	// });

	function startBattle (selectedEnemy) {
		$("#image-box").append( '<img src="' + pokemon[selectedEnemy].picture +'" alt="" id="enemy">');

	}


	function characterSelect(selected) {
		$("#image-box").empty();
		$("#text-display").stop();
		$("#text-display").empty();

		typeWords("You have selected " + selected + ", good choice! Who would you like to battle first?");
	}

	function playerAdd(playerChacter) {
		$("#selection-box").empty();

		$("#image-box").append( '<img src="' + pokemon[playerChacter].pictureBack  +'" alt="" id="player">');

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

	function attackCalc() {
		
	}

	function typeWords(words) {

	    // canRun = false;
	    // wordsOut = true;

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

    function blink (){
    $('#blink-icon').delay(200).fadeTo(200,0.0).delay(200).fadeTo(200,1, blink);
     }

});
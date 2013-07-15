var engelbart = (function(){
	
	var socket = io.connect('http://localhost:8080');

	var options = document.getElementsByClassName('options');

	var keys = [],
		stage = 0,
		sequence = [],
		last = [0,0,0,0,0],
		slots = [0,0,0,0,0],
		fingers = [],
		selection,
		canAddLetter = true;

	var sets = [['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'], ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'], ['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'], ["SPACE", "BACKSPACE"], ["ENTER"]];

	var output = document.getElementById('output'),
		currentResult = document.getElementById('currentResult'),
		text = document.getElementById('message');

	var previousSubSet,
		newOrder = [];

	function addLetter(thisSelection){
		if(canAddLetter){
			console.log(thisSelection);

			if(thisSelection === "SPACE"){
				thisSelection = ' ';

			}

			if(thisSelection === "BACKSPACE"){
				text.value = text.value.substr(0, text.value.length - 1);
				return;
			}

			text.value = text.value + thisSelection;
			canAddLetter = false;
		}
	}

	function checkKeys(){

		var current = [0,0,0,0,0];

		var ac = 0;
		var offCount = 0;

		while(ac < keys.length){

			if(keys[ac] === 1){
				current[ac] = 1;
			} else {
				offCount += 1;
			}

			ac += 1;

		}

		var ab = 0;

		while(ab < current.length){

			if(current[ab] === last[ab] && current[ab] === 1){
				//sequence[ab] = ab;
			} else if(current[ab] !== last[ab] && current[ab] === 1){
				sequence.push(ab);
			} else if(current[ab] !== last[ab] && current[ab] === 0){

				var xx = 0;

				while(xx < keys.length){

					if(sequence[xx] === ab){
						sequence.splice(xx, 1);
					}

					// console.log(xx);

					xx += 1;
				}

			}

			ab += 1;
		}

		last = current;

		if(offCount === keys.length){
			sequence = [];
			
			if(stage > 0 && canAddLetter && selection !== undefined){
				// console.log("We're here");
				engelbart.addLetter(selection);
				stage = 0;
				selection = undefined;
				canAddLetter = true;
			}
			var af = 0;

			while(af < options.length){

				options[af].innerHTML = "";

				af += 1;
			}

		}	

		if(sequence.length < 1){

			var zf = 0;

			while(zf < sets.length){

				options[zf].innerHTML = sets[zf].join(", ");

				zf += 1;

			}

		}

		var xy = 0;

		var thisSet = sets[sequence[0]],
			currentSubSet = [],
			fingerArr = ["", "", "", "", ""];

		while(xy < sequence.length){

			slots = [0,0,0,0,0];

			if(xy === 0 && sequence.length < 2){

				var thisLength = Math.ceil((thisSet.length) / ((keys.length - 1) - 1)),
					numberOfSets = Math.floor(thisSet.length / thisLength);

				var zx = 0,
					keysOffset = 0;

				while(zx < keys.length){
					//options[zx].innerHTML = thisSet.slice((zx * 1), zx * 1 + thisLength);

					// console.log(sequence[xy]);

					var thisSlice = thisSet.slice(zx * thisLength, (zx * thisLength) + thisLength)

					//options[zx + keysOffset].innerHTML = thisSlice.join(', ');

					if(thisSlice.length > 0){
						currentSubSet.push(thisSlice);
					}

					zx += 1;
				}


				options[sequence[0]].innerHTML = currentSubSet[0][0];
					
				if(stage < 2){
					stage = 1;
					selection = currentSubSet[0][0];
					// console.log("sgs");
				}

				currentSubSet[0].shift();
				slots[sequence[0]] = 1;

				//console.log(currentSubSet[0]);

				for(var i = 0; i < options.length; i += 1){

					if(i < currentSubSet.length){

						for(var x = 0; x < options.length; x += 1){

							var potentialOption = options[x];

							if(keys[x] !== 1 && x !== sequence[0] && slots[x] !== 1 && sequence.length < 2){
								potentialOption.innerHTML = currentSubSet[i];
								slots[x] = 1;
								break;
							}

						}

					} else if (slots[i] === 0){
						options[i].innerHTML = '';
					}

				}

				previousSubSet = currentSubSet;

				currentSubSet.splice(sequence[0], 0, selection);

				currentResult.innerHTML = selection;

				// console.log(currentSubSet);

			} else if(xy === 1 && sequence.length < 3){

				slots = [0,0,0,0,0];

				currentResult.innerHTML = currentSubSet.join("  -  ");

				var lastSubSet = currentSubSet;

				currentSubSet = currentSubSet[sequence[1]] || previousSubSet[sequence[1]];

				currentResult.innerHTML = currentSubSet;

				// console.log(currentSubSet);

				options[sequence[1]].innerHTML = currentSubSet[0];

				for(var i = xy; i < currentSubSet.length; i += 1){

					for(var f = 0; f < options.length; f += 1){

						if(keys[f] !== 1 && slots[f] !== 1){
							options[f].innerHTML = currentSubSet[i];
							newOrder[f] = currentSubSet[i];
							slots[f] = 1;
							break;
						}

					}

				}

				options[sequence[0]].innerHTML = '';

				//console.log(currentSubSet[0])


				// console.log(currentSubSet);

				if(stage < 3){
					stage = 2;
					selection = currentSubSet[0];
					// console.log("jlj");
				}

				currentResult.innerHTML = selection;

				//currentSubSet.splice(sequence[0], 0, lastSubSet[sequence[0]]);

				// 	console.log(currentSubSet);

			} else if(xy === 2){

				// console.log(newOrder);

				var finalSelection = newOrder[sequence[2]];

				currentResult.innerHTML = finalSelection;

				for(var nx = 0; nx < options.length; nx += 1){
					if(finalSelection !== undefined){
						options[nx].innerHTML = finalSelection;
					}
				}

				selection = finalSelection;

				stage = 3;
				// console.log(currentSubSet[2])

				// console.log(currentSubSet[sequence[2]])

				//currentSubSet = currentSubSet[sequence[xy]];
				
				//console.log(currentSubSet);
				//currentResult.innerHTML = selection;	

				// console.log("2!!!");

			}

			xy += 1;

		}

		//currentResult.innerHTML = selection;

		//console.log(selection);

		output.innerHTML = output.innerHTML + ' stage: ' + stage + ' sequence: ' + sequence;

	}

	function init(){
		
		socket.on('message', function (data) {

			var split = data.buttons.split('');

			keys[0] = parseInt(split[0]);
			keys[1] = parseInt(split[1]);
			keys[2] = parseInt(split[2]);
			keys[3] = parseInt(split[3]);
			keys[4] = parseInt(split[4]);

			output.innerHTML = JSON.stringify(keys);

			checkKeys();

		});

	}

	return{
		init : init,
		addLetter : addLetter
	};

})();

(function(){
		
		engelbart.init();

})()
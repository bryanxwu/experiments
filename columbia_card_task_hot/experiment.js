/* ************************************ */
/* Helper Functions                     */
/* ************************************ */
var getInstructFeedback = function() {
	return '<div class = centerbox><p class = center-block-text>' + feedback_instruct_text + '</p></div>'
}

var getReward = function(){
	temp=jsPsych.randomization.repeat(points,1)
	reward1= temp.pop()
	reward2= temp.pop()
	reward3= temp.pop()
return '<div class = centerbox><p class = center-block-text>The round points selected are: '+reward1+', '+reward2+', '+reward3+'</p></div>'

}


var instructButton = function(clicked_id){
	currID = parseInt(clicked_id)
	document.getElementById(clicked_id).src='/static/experiments/columbia_card_task_hot/images/chosen.png';
}



var getPractice1 = function(){
	unclickedCards=cardArray
	cardArray=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]
	clickedGainCards = [] //num
	clickedLossCards = [] //num
	lossProb=1
	gainAmt=30
	lossAmt=250

	shuffledCardArray=jsPsych.randomization.repeat(cardArray,1)
		whichLossCards=[]  //this determines which are loss cards at the beginning of each round
		for(i=0; i<lossProb; i++){
		whichLossCards.push(shuffledCardArray.pop())
		} 
		whichGainCards=shuffledCardArray
		gameState=practiceSetup
		return gameState	
}



var getPractice2 = function(){
	unclickedCards=cardArray
	cardArray=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]
	clickedGainCards = [] //num
	clickedLossCards = [] //num
	lossProb=3
	gainAmt=10
	lossAmt=750
	
	shuffledCardArray=jsPsych.randomization.repeat(cardArray,1)
		whichLossCards=[]  //this determines which are loss cards at the beginning of each round
		for(i=0; i<lossProb; i++){
		whichLossCards.push(shuffledCardArray.pop())
		} 
		whichGainCards=shuffledCardArray
		gameState=practiceSetup2
		return gameState
}


var instructCard = function(clicked_id){
	currID=parseInt(clicked_id)
	console.log(clicked_id)
	if(whichLossCards.indexOf(currID)==-1){
		instructPoints = instructPoints+gainAmt
		document.getElementById('current_round').innerHTML='Current Round: '+instructPoints;
		document.getElementById(clicked_id).disabled = true;

		document.getElementById(clicked_id).src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	} else if(whichLossCards.indexOf(currID)!=-1){
		instructPoints = instructPoints-lossAmt
		document.getElementById(clicked_id).disabled = true;
		document.getElementById('current_round').innerHTML='Current Round: '+instructPoints;
		document.getElementById(clicked_id).src='/static/experiments/columbia_card_task_hot/images/loss.png';
		setTimeout(pressKey, 2000)

	
	}

}


var appendTestData = function(){
	jsPsych.data.addDataToLastTrial({which_round: whichRound, whichButtonWasClicked: currID, num_click_in_round: whichClickInRound, num_loss_cards: lossProb, gain_amount: gainAmt, loss_amount: lossAmt, round_points: roundPoints, clicked_on_loss_card: lossClicked})

}

function appendTextAfter(input,search_term, new_text) {
	var index = input.indexOf(search_term)+search_term.length
	return input.slice(0,index) + new_text + input.slice(index)
}

function appendTextAfter2(input,search_term, new_text) {
	var index = input.indexOf(search_term)+search_term.length
	return input.slice(0,index) + new_text + input.slice(index+'/static/experiments/columbia_card_task_hot/images/beforeChosen.png'.length+6+31)
}

var pressKey = function(){
	    e = jQuery.Event("keydown");
		e.which = 37; // # Some key code value
		e.keyCode = 37
		$(document).trigger(e);
		e = jQuery.Event("keyup");
		e.which = 37; // # Some key code value
		e.keyCode = 37
		$(document).trigger(e)
}


function deleteText(input, search_term){
 	index = input.indexOf(search_term)
    indexAfter = input.indexOf(search_term)+search_term.length
return input.slice(0,index)+input.slice(indexAfter)
}


var chooseCard = function (clicked_id){
console.log(clicked_id)
	currID = parseInt(clicked_id)
	whichClickInRound = whichClickInRound +1
	temp = whichLossCards.indexOf(currID,0)
	if(clickedGainCards.indexOf(currID,0) == -1 && clickedLossCards.indexOf(currID, 0) == -1){
	if (temp != -1){ // if you click on a loss card
		clickedLossCards.push(clicked_id)
		index=unclickedCards.indexOf(currID,0)
		unclickedCards.splice(index,1)
		roundPoints=roundPoints-lossAmt
		lossClicked= true
		roundOver=0
		document.getElementById('current_round').innerHTML='Current Round: '+roundPoints;
		document.getElementById(clicked_id).src='/static/experiments/columbia_card_task_hot/images/loss.png';
		
		document.getElementById("button1").disabled = true;
		document.getElementById("button2").disabled = true;
		for(i=1;i<33;i++){
			document.getElementById(''+i+'').disabled = true;
			}
		setTimeout(endRound, 2000)
		
		
 	} else if (temp == -1){ // if you click on a gain card

		clickedGainCards.push(clicked_id)  //as a string
		index=unclickedCards.indexOf(currID,0)
		unclickedCards.splice(index,1)
		roundPoints=roundPoints+gainAmt	
		
		e = jQuery.Event("keydown");
		e.which = 37; // # Some key code value
		e.keyCode = 37
		$(document).trigger(e);
		e = jQuery.Event("keyup");
		e.which = 37; // # Some key code value
		e.keyCode = 37
		$(document).trigger(e)
	}
  }
}
<<<<<<< HEAD

=======
>>>>>>> master

var getRound = function(){
	if(roundOver === 0){  //this is for the start of a round
	whichClickInRound = 0
	unclickedCards=cardArray
	cardArray=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]
	clickedGainCards = [] //num
	clickedLossCards = [] //num
	roundParams = shuffledParamsArray.pop()
	lossProb=roundParams[0]
	gainAmt=roundParams[1]
	lossAmt=roundParams[2]
	shuffledCardArray=jsPsych.randomization.repeat(cardArray,1)

		whichLossCards=[]  //this determines which are loss cards at the beginning of each round
		for(i=0; i<lossProb; i++){
		whichLossCards.push(shuffledCardArray.pop())
		} 
		whichGainCards=shuffledCardArray
	gameState=gameSetup
		gameState = appendTextAfter(gameState, 'Game Round: ', whichRound)
		gameState = appendTextAfter(gameState, 'Loss Amount: ', lossAmt)
		gameState = appendTextAfter(gameState, 'Current Round: ', roundPoints)
		gameState = appendTextAfter(gameState, '# of Loss Cards: ', lossProb)
		gameState = appendTextAfter(gameState, 'Gain Amount: ', gainAmt)

	roundOver=1
	return gameState
	} else if(roundOver == 1){  //this is for during the round
	gameState=gameSetup
		gameState = appendTextAfter(gameState, 'Game Round: ', whichRound)
		gameState = appendTextAfter(gameState, 'Loss Amount: ', lossAmt)
		gameState = appendTextAfter(gameState, 'Current Round: ', roundPoints)
		gameState = appendTextAfter(gameState, '# of Loss Cards: ', lossProb)
		gameState = appendTextAfter(gameState, 'Gain Amount: ', gainAmt)
		gameState = deleteText(gameState,'onclick = noCard()')

		clickedGainCards.sort(function(a, b){return a-b})
		for(i=0;i<clickedGainCards.length; i++){
		gameState=appendTextAfter2(gameState, "id = '"+""+clickedGainCards[i]+"'", " src='/static/experiments/columbia_card_task_hot/images/chosen.png'")		
		}
	return gameState
	}
}




var noCard = function(){	
currID='noCardButton'
whichClickInRound=whichClickInRound+1
		for(i=0;i<33;i++){
			if(whichGainCards.indexOf(i)!= -1){
			document.getElementById(''+i+'').src='/static/experiments/columbia_card_task_hot/images/chosen.png';
			} else if(whichLossCards.indexOf(i)!= -1){
			document.getElementById(''+i+'').src='/static/experiments/columbia_card_task_hot/images/loss.png';
			}
		}			
gameState = appendTextAfter(gameState, 'button3 ', 'onclick = collect()')

}


points= []
var endRound = function(){
currID='endRoundButton'
points.push(roundPoints)
whichClickInRound=whichClickInRound+1
	for(i=0;i<33;i++){
			if(whichGainCards.indexOf(i)!= -1){
			document.getElementById(''+i+'').src='/static/experiments/columbia_card_task_hot/images/chosen.png';
			} else if(whichLossCards.indexOf(i)!= -1){
			document.getElementById(''+i+'').src='/static/experiments/columbia_card_task_hot/images/loss.png';
			}
		}	
gameState = appendTextAfter(gameState, 'button3 ', 'onclick = collect()')

}


var collect = function(){
currID='collectButton'
whichClickInRound=whichClickInRound+1
	for(i=0;i<33;i++){
			if(whichGainCards.indexOf(i)!= -1){
			document.getElementById(''+i+'').src='/static/experiments/columbia_card_task_hot/images/chosen.png';
			} else if(whichLossCards.indexOf(i)!= -1){
			document.getElementById(''+i+'').src='/static/experiments/columbia_card_task_hot/images/loss.png';
			}
		}
		
	roundOver =0
	setTimeout(pressKey, 2000)
	}


var instructFunction = function(){
	document.getElementById("c1").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c17").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c18").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c15").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c27").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c31").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c8").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("instruct1").innerHTML = '<strong>Example 1: </strong>In the example below, you see 32 unknown cards. The display shows you that 1 of these cards is a loss card. It also tells you that turning over each gain card is worth 10 points to you, and that turning over the loss card will cost you 750 points. Let us suppose you decided to turn over 7 cards and then decided to stop. Please click the "See Result" button to see what happens: <font color = "red">Luckily, none of the seven cards you turned over happened to be the loss card, so your score for this round was 70. Please click the next button.</font>'

}

var instructFunction2 = function(){
	document.getElementById("c1").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c4").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c30").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c13").src='/static/experiments/columbia_card_task_hot/images/loss.png';
	document.getElementById("instruct2").innerHTML = '<strong>Example 1: </strong>In the example below, you see 32 unknown cards. The display shows you that 3 of these cards is a loss card. It also tells you that turning over each gain card is worth 30 points to you, and that turning over the loss card will cost you 250 points. Let us suppose you decided to turn over 10 cards and then decided to stop. Please click the "See Result" button to see what happens: <font color = "red">This time, the fourth card you turned over was a loss card. As you saw, the round will immediately end when you turn over the loss card. You had earned 90 points for the 3 gain cards, and then 250 points were subtracted for the loss card, so your score for this round was -160. After the loss points were subtracted from your Round Total, the computer also showed you the cards that you had not yet turned over. Please click the next button.</font>'
	setTimeout(instructTurnCards,1500)
	

}






var instructTurnCards = function (){
	document.getElementById("c8").src='/static/experiments/columbia_card_task_hot/images/loss.png';
	document.getElementById("c2").src='/static/experiments/columbia_card_task_hot/images/loss.png';
	document.getElementById("c3").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c5").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c6").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c7").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c9").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c10").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c11").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c12").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c19").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c14").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c15").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c16").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c17").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c18").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c20").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c21").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c22").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c23").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c24").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c25").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c26").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c27").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c28").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c29").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c31").src='/static/experiments/columbia_card_task_hot/images/chosen.png';
	document.getElementById("c32").src='/static/experiments/columbia_card_task_hot/images/chosen.png';

}


/* ************************************ */
/* Experimental Variables               */
/* ************************************ */
// generic task variables
var sumInstructTime = 0    //ms
var instructTimeThresh = 5   ///in seconds

// task specific variables
var e = ""
var numRounds=27
var lossClicked = false
var whichClickInRound = 0
var whichRound = 1
var roundPoints=0
var totPoints=0
var roundOver=0
var currTrial = 0
var instructPoints = 0
var clickedGainCards = []
var clickedLossCards = []
// this params array is organized such that the 0 index = the number of loss cards in round, the 1 index = the gain amount of each happy card, and the 2nd index = the loss amount when you turn over a sad face
var paramsArray = [[1,10,250],[1,10,500],[1,10,750],[1,20,250],[1,20,500],[1,20,750],[1,30,250],[1,30,500],[1,30,750],[2,10,250],[2,10,500],[2,10,750],[2,20,250],[2,20,500],[2,20,750],[2,30,250],[2,30,500],[2,30,750],[3,10,250],[3,10,500],[3,10,750],[3,20,250],[3,20,500],[3,20,750],[3,30,250],[3,30,500],[3,30,750]]
var cardArray=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]
var shuffledCardArray=jsPsych.randomization.repeat(cardArray,1)
var shuffledParamsArray = jsPsych.randomization.repeat(paramsArray,1)
var roundOver =0

var gameSetup =  "<div class = titlebox><div class = center-text><strong>How many cards do you want to take?</strong></div></div>" + 
  "<div class = titleboxRight><div id = current_round class = center-text>Current Round:  </div></div>" +
  "<div class = titleboxLeft><div id = game_round class = center-text>Game Round: </div></div>" +
  "<div class = titleboxLeft1><div id= loss_amount class = center-text>Loss Amount: </div></div>" +
  "<div class = titleboxRight1><div id = num_loss_cards class = center-text># of Loss Cards: </div></div>" +
  "<div class = titleboxMiddle1><div id = gain_amount class = center-text>Gain Amount: </div></div>" +
  "<div class = buttonbox><button type='button' class = select-button id = button1 onclick = noCard()>No Card</button><button type='button' class = select-button id = button2 onclick = endRound()>STOP/Turn Over</button><button type='button' class = select-button id = button3  onclick = collect()>Next Round</button></div>"+
  
  
  "<div class = numbox><div class = square><input type='image' id = '1' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  "<div class = square><input type='image' id = '2' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  "<div class = square><input type='image' id = '3' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  "<div class = square><input type='image' id = '4' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  "<div class = square><input type='image' id = '5' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  "<div class = square><input type='image' id = '6' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  "<div class = square><input type='image' id = '7' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  "<div class = square><input type='image' id = '8' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  
  "<div class = square><input type='image' id = '9' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  "<div class = square><input type='image' id = '10' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  "<div class = square><input type='image' id = '11' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  "<div class = square><input type='image' id = '12' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  "<div class = square><input type='image' id = '13' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  "<div class = square><input type='image' id = '14' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  "<div class = square><input type='image' id = '15' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  "<div class = square><input type='image' id = '16' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  
  "<div class = square><input type='image' id = '17' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  "<div class = square><input type='image' id = '18' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  "<div class = square><input type='image' id = '19' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  "<div class = square><input type='image' id = '20' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  "<div class = square><input type='image' id = '21' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  "<div class = square><input type='image' id = '22' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  "<div class = square><input type='image' id = '23' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  "<div class = square><input type='image' id = '24' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  
  "<div class = square><input type='image' id = '25' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  "<div class = square><input type='image' id = '26' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  "<div class = square><input type='image' id = '27' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  "<div class = square><input type='image' id = '28' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  "<div class = square><input type='image' id = '29' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  "<div class = square><input type='image' id = '30' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  "<div class = square><input type='image' id = '31' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div>"+
  "<div class = square><input type='image' id = '32' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = chooseCard(this.id)></div></div>"

var practiceSetup = "<div class = instruct1><strong>Practice 1: </strong> As you click on cards, you can see your Round Total change in the box in the upper right.  If you turn over a few cards and then want to stop and go to the next round, click the <strong>Stop/Turn Over</strong> button and then <strong>Next Round</strong>.  If turning over cards seems too risky, you can clicked the <strong>No Card</strong> button, in which case your score for the round will automatically be zero.  This is a practice round, that looks just like the game you will play.  Please select the number of cards you would turn over, given the number of loss cards and the amounts of the gain and loss cards shown below.</div> "+ 
  "<div class = titlebox><div class = center-text><strong>How many cards do you want to take?</strong></div></div>" + 
  "<div class = titleboxRight><div id = current_round class = center-text>Current Round:  </div></div>" +
  "<div class = titleboxLeft><div id = game_round class = center-text>Game Round: 1</div></div>" +
  "<div class = titleboxLeft1><div id= loss_amount class = center-text>Loss Amount: 250</div></div>" +
  "<div class = titleboxRight1><div id = num_loss_cards class = center-text># of Loss Cards: 1</div></div>" +
  "<div class = titleboxMiddle1><div id = gain_amount class = center-text>Gain Amount: 30</div></div>" +
  "<div class = buttonbox><button type='button' class = select-button id = button1 onclick = noCard()>No Card</button><button type='button' class = select-button id = button2 onclick = endRound()>STOP/Turn Over</button><button type='button' class = select-button id = button3  onclick = collect()>Next Round</button></div>"+
  
  
  "<div class = numbox><div class = square><input type='image' id = '1' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '2' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '3' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '4' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '5' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '6' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '7' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '8' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  
  "<div class = square><input type='image' id = '9' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '10' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '11' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '12' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '13' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '14' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '15' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '16' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  
  "<div class = square><input type='image' id = '17' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '18' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '19' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '20' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '21' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '22' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '23' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '24' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  
  "<div class = square><input type='image' id = '25' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '26' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '27' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '28' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '29' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '30' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '31' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '32' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div></div>"
  	
var practiceSetup2 = "<div class = instruct1><strong>Practice 2: </strong> The computer will record your Point Total for each round and will show you those totals after you finish all 27 rounds of the game.  This is the second practice round. Please again turn over as many cards as you would like to, give the number of loss cards and the amounts that you can win or lose if you turn over a gain or loss card, as shown below.</div> "+ 
  "<div class = titlebox><div class = center-text><strong>How many cards do you want to take?</strong></div></div>" + 
  "<div class = titleboxRight><div id = current_round class = center-text>Current Round:  </div></div>" +
  "<div class = titleboxLeft><div id = game_round class = center-text>Game Round: 2</div></div>" +
  "<div class = titleboxLeft1><div id= loss_amount class = center-text>Loss Amount: 750</div></div>" +
  "<div class = titleboxRight1><div id = num_loss_cards class = center-text># of Loss Cards: 3</div></div>" +
  "<div class = titleboxMiddle1><div id = gain_amount class = center-text>Gain Amount: 10</div></div>" +
  "<div class = buttonbox><button type='button' class = select-button id = button1 onclick = noCard()>No Card</button><button type='button' class = select-button id = button2 onclick = endRound()>STOP/Turn Over</button><button type='button' class = select-button id = button3  onclick = collect()>Next Round</button></div>"+
  
  
  "<div class = numbox><div class = square><input type='image' id = '1' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '2' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '3' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '4' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '5' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '6' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '7' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '8' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  
  "<div class = square><input type='image' id = '9' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '10' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '11' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '12' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '13' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '14' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '15' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '16' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  
  "<div class = square><input type='image' id = '17' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '18' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '19' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '20' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '21' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '22' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '23' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '24' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  
  "<div class = square><input type='image' id = '25' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '26' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '27' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '28' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '29' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '30' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '31' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div>"+
  "<div class = square><input type='image' id = '32' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructCard(this.id)></div></div>"



/* ************************************ */
/* Set up jsPsych blocks */
/* ************************************ */
/* define static blocks */
var welcome_block = {
  type: 'text',
  text:  "<div class = titlebox><div class = center-text><strong>Welcome to the Columbia Card Task</strong></div></div>",
  cont_key: 13,
  data: {exp_id: "columbia_card_task_hot", trial: 'welcome'},
  timing_post_trial: 0
};

var feedback_instruct_text = 'Starting with instructions.  Press <strong> Enter </strong> to continue.'
var feedback_instruct_block = {
  type: 'poldrack-text',
  cont_key: [13],
  data: {exp_id: "columbia_card_task_hot", trial: 'instructions'},
  text: getInstructFeedback,
  timing_post_trial: 0,
  timing_response: 6000
};
/// This ensures that the subject does not read through the instructions too quickly.  If they do it too quickly, then we will go over the loop again.
var instruction_trials = []	  
var instructions_block = {
  type: 'poldrack-instructions',
  data: {exp_id: "columbia_card_task_hot", trial: 'instructions'},
  pages: [
	'<div class = centerbox><p class = block-text><strong>Introduction and Explanation</strong>'+
	'<p>-You are now going to participate in a card game.  In this game, you will turn over cards to win or lose points which are worth money.</p>'+
	'<p>-In each game round, you will see 32 cards on the computer screen, face down. You will decide how many of these cards to turn over. Each card is either a gain card or a loss card (there are no neutral cards). You will know how many gain cards and loss cards are in the deck of 32, and how many points you will gain or lose if you turn over a gain or loss card. What you do not know is which of the 32 cards that you see face-down are gain cards and which are loss cards. </p>'+
	'<p>-You indicate the number of cards (from 0 to 32) you want to turn over by clicking on a small button. Then, cards are randomly chosen to be turned over, one at a time. For each gain card turned over, points are added to your round total and another card is turned over. This continues until a loss card is uncovered or until the number of cards you chose to turn over is reached. The first time a loss card is turned over, the loss points will be subtracted from your current point total and the round is over – even if you indicated that more cards should be turned over. The accumulated total will be your number of points for that round, and you go on to the next round. Each new round starts with a score of 0 points; that means you play each round independently of the other rounds.</p>'+
	'<p>-You will play a total of 27 rounds, three of which will be randomly selected at the end of the session, and you will be paid out for those in real money. Each point is worth 1 cent.</p>'+
	'<p>-This game is for real money and requires some concentration. Please minimize distractions in your environment and close any other programs running in the background. </p></p></div>',
    
    '<div class = centerbox><p class = block-text><strong>Unknown Cards:</strong>'+
    '<p> This is what unknown cards looks like.  Turn it over by clicking on it.</p>'+
    "<p><input type='image' id = '133' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png' onclick = instructButton(this.id)>"+
	'<p> An unknown card.  Click on it to turn it over!</p>'+
	'</p></div>',
	
	'<div class = centerbox><p class = block-text>'+
	'<p><strong>The Gain Card:</strong></p>'+
	'<p>For every gain card you turn over, your score increases by either 10, 20, or 30 points in different rounds.</p>'+
	"<p><input type='image' src='/static/experiments/columbia_card_task_hot/images/chosen.png'>"+
	'<p><strong>The Loss Card:</strong></p>'+
	"<p><input type='image' src='/static/experiments/columbia_card_task_hot/images/loss.png'></p>"+
	'<p>For every loss card you turn over, your score decreases by either 250,500, or 750 points in different rounds. Furthermore, the round immediately ends (you cannot turn over any more cards). There will be either 1,2, or 3 loss cards in any given round.</p>'+
	'<p>The number of loss cards and the value of points that can be won or lost by turning over a gain or loss card are fixed in each round. This information will always be on display so you know what kind of round you are in.</p>'+
	'</p></div>',
	
	"<button type='button' class = instructButton onclick= instructFunction()>See Result</button>"+
	'<div class = centerbox-CCT><p class = block-text><div id = instruct1><strong>Example 1: </strong>In the example below, you see 32 unknown cards. The display shows you that 1 of these cards is a loss card. It also tells you that turning over each gain card is worth 10 points to you, and that turning over the loss card will cost you 750 points. Let us suppose you decided to turn over 7 cards and then decided to stop. Please click the "See Result" button to see what happens: </div>'+
	"<div class = instructBox><div><strong>How many cards do you want to take?</strong></div></div>" + 
  	"<div class = instructBoxRight><div>Current Round:  0</div></div>" +
  	"<div class = instructBoxLeft><div>Game Round: 1</div></div>" +
  	"<div class = instructBoxLeft1><div>Loss Amount: 750</div></div>" +
  	"<div class = instructBoxRight1><div># of Loss Cards: 1</div></div>" +
  	"<div class = instructBoxMiddle1><div>Gain Amount: 10</div></div>" +

  
    "<div class = numbox2><div class = square2><input type='image' id = 'c1' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c5' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c9' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c13' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c17' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c21' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c25' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c29' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
  
    "<div class = square2><input type='image' id = 'c2' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c6' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c10' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c14' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c18' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c22' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c26' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c30' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
  
    "<div class = square2><input type='image' id = 'c3' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c7' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c11' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c15' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c19' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c23' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c27' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c31' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
  
    "<div class = square2><input type='image' id = 'c4' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c8' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c12' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c16' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c20' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c24' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c28' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c32' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div></div>"+
    '</p></div>',
  
  	"<button type='button' class = instructButton onclick= instructFunction2()>See Result</button>"+
	'<div class = centerbox-CCT><p class = block-text><div id = instruct2><strong>Example 2: </strong>In the example below, you see 32 unknown cards. The display shows you that 3 of these cards is a loss card. It also tells you that turning over each gain card is worth 30 points to you, and that turning over the loss card will cost you 250 points. Let us suppose you decided to turn over 10 cards and then decided to stop. Please click the "See Result" button to see what happens: </div>'+
	"<div class = instructBox><div><strong>How many cards do you want to take?</strong></div></div>" + 
  	"<div class = instructBoxRight><div>Current Round:  0</div></div>" +
  	"<div class = instructBoxLeft><div>Game Round: 1</div></div>" +
  	"<div class = instructBoxLeft1><div>Loss Amount: 250</div></div>" +
  	"<div class = instructBoxRight1><div># of Loss Cards: 3</div></div>" +
  	"<div class = instructBoxMiddle1><div>Gain Amount: 30</div></div>" +

  
    "<div class = numbox2><div class = square2><input type='image' id = 'c1' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c5' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c9' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c13' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c17' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c21' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c25' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c29' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
  
    "<div class = square2><input type='image' id = 'c2' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c6' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c10' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c14' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c18' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c22' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c26' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c30' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
  
    "<div class = square2><input type='image' id = 'c3' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c7' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c11' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c15' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c19' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c23' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c27' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c31' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
  
    "<div class = square2><input type='image' id = 'c4' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c8' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c12' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c16' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c20' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c24' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c28' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div>"+
    "<div class = square2><input type='image' id = 'c32' src='/static/experiments/columbia_card_task_hot/images/beforeChosen.png'></div></div>"+
    '</p></div>',
  
  ],
  allow_keys: false,
  show_clickable_nav: true,
  timing_post_trial: 1000
};
instruction_trials.push(feedback_instruct_block)
instruction_trials.push(instructions_block)

var instruction_node = {
    timeline: instruction_trials,
	/* This function defines stopping criteria */
    loop_function: function(data){
		for(i=0;i<data.length;i++){
			if((data[i].trial_type=='poldrack-instructions') && (data[i].rt!=-1)){
				rt=data[i].rt
				sumInstructTime=sumInstructTime+rt
			}
		}
		if(sumInstructTime<=instructTimeThresh*1000){
			feedback_instruct_text = 'Read through instructions too quickly.  Please take your time and make sure you understand the instructions.  Press <strong>enter</strong> to continue.'
			return true
		} else if(sumInstructTime>instructTimeThresh*1000){
			feedback_instruct_text = 'Done with instructions. Press <strong>enter</strong> to continue.'
			return false
		}
    }
}



var practice_block = {
  type: 'poldrack-single-stim',
  stimulus: getRound,
  is_html: true,
  data: {exp_id: "columbia_card_task_hot", trial_id: 'stim', exp_stage: 'test'},
  choices: [37],
  timing_post_trial: 0,
  on_finish: appendTestData,
};



var practice_chunk = {
    chunk_type: 'while',
    timeline: [practice_block],
    continue_function: function(data){ 
       if (roundOver === 0) {
       		roundOver =0
			roundPoints = 0
			whichClickInRound= 0
			currTrial = 0
			whichRound = whichRound+1
			lossClicked = false
			return false
		} else if(roundOver ==1){
			return true
		}
    }
}
var practice_instruct_block = {
  type: 'poldrack-single-stim',
  stimulus: getPractice1,
  is_html: true,
  data: {exp_id: "columbia_card_task_hot", trial_id: 'stim', exp_stage: 'practice'},
  choices: [37],
  timing_post_trial: 0,
  on_finish: appendTestData,
};

var practice_chunk1 = {
    chunk_type: 'while',
    timeline: [practice_instruct_block],
    continue_function: function(data){ 
       if (roundOver === 0) {
       		instructPoints=0
       		roundOver =0
			roundPoints = 0
			whichClickInRound= 0
			currTrial = 0
			whichRound = whichRound+1
			lossClicked = false
			return false
		} else if(roundOver ==1){
			return true
		}
    }
}

var practice_instruct_block2 = {
  type: 'poldrack-single-stim',
  stimulus: getPractice2,
  is_html: true,
  data: {exp_id: "columbia_card_task_hot", trial_id: 'stim', exp_stage: 'practice'},
  choices: [37],
  timing_post_trial: 0,
  on_finish: appendTestData,
};

var practice_chunk2 = {
    chunk_type: 'while',
    timeline: [practice_instruct_block2],
    continue_function: function(data){ 
       if (roundOver === 0) {
       		roundOver =0
			roundPoints = 0
			whichClickInRound= 0
			currTrial = 0
			whichRound = 0
			lossClicked = false
			return false
		} else if(roundOver ==1){
			return true
		}
    }
}

var end_block = {
  type: 'text',
  data: {exp_id: "columbia_card_task_hot", trial_id: 'end'},
  text: '<div class = centerbox><p class = center-block-text>Finished with this task.</p><p class = center-block-text>Press <strong>enter</strong> to continue.</p></div>',
  cont_key: [13],
  timing_post_trial: 0
};
var give_total = {
  type: 'text',
  text: getReward,
  data: {exp_id: "columbia_card_task_hot", trial_id: 'reward'},
  cont_key: [13],
  timing_post_trial: 0
};


var start_practice_block = {
  type: 'text',
  data: {exp_id: "columbia_card_task_hot", trial_id: 'practice_intro'},
  text: "<div class = centerbox><p class = center-block-text>Hello <strong>enter</strong> to begin.</p></div>",
  cont_key: [13],
  timing_post_trial: 1000
};

var start_test_block = {
  type: 'text',
  data: {exp_id: "columbia_card_task_hot", trial_id: 'test_intro'},
  text: '<div class = centerbox><p class = block-text>We will now start the test. Press <strong>enter</strong> to begin.</p></div>',
  cont_key: [13],
  timing_post_trial: 1000
};




/* create experiment definition array */
var columbia_card_task_hot_experiment = [];
columbia_card_task_hot_experiment.push(instruction_node);
columbia_card_task_hot_experiment.push(practice_chunk1);
columbia_card_task_hot_experiment.push(practice_chunk2);

columbia_card_task_hot_experiment.push(start_test_block);
for(i=0; i<numRounds; i++){
columbia_card_task_hot_experiment.push(practice_chunk);
}
columbia_card_task_hot_experiment.push(give_total);
columbia_card_task_hot_experiment.push(end_block);



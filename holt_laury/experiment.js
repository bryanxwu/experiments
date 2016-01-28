/*
reference: http://users.nber.org/~rosenbla/econ311-04/syllabus/holtlaury.pdf
Holt, C. A., & Laury, S. K. (2002). Risk aversion and incentive effects. American economic review, 92(5), 1644-1655.
*/

/* ************************************ */
/* Define helper functions */
/* ************************************ */
function getDisplayElement () {
    $('<div class = display_stage_background></div>').appendTo('body')
    return $('<div class = display_stage></div>').appendTo('body')
}

function evalAttentionChecks() {
  var check_percent = 1
  if (run_attention_checks) {
    var attention_check_trials = jsPsych.data.getTrialsOfType('attention-check')
    var checks_passed = 0
    for (var i = 0; i < attention_check_trials.length; i++) {
      if (attention_check_trials[i].correct === true) {
        checks_passed += 1
      }
    }
    check_percent = checks_passed/attention_check_trials.length
  } 
  return check_percent
}

/* ************************************ */
/* Define experimental variables */
/* ************************************ */
// generic task variables
var run_attention_checks = true
var attention_check_thresh = 0.65

// task specific variables
var lowriskhigh = '100';
var lowrisklow = '80';
var highriskhigh = '190';
var highrisklow = '5';
var highprobs = ['10', '20', '30', '40', '50', '60', '70', '80', '90' , '100'];
var lowprobs = ['90', '80', '70', '60', '50', '40', '30', '20', '10' , '0'];

//create array of html text that will be displayed
var buttonlist = []
//populate the array with the options
for (var i = 0; i < highprobs.length; i++){
  buttonlist += '<center>' + highprobs[i] +'% chance of $' + lowriskhigh + ', '+ lowprobs[i]+'% chance of $'+lowrisklow+'<input type="radio" name="response_'+i+'" value="A"><input type="radio" name="response_'+i+'" value="B">'+highprobs[i]+'% chance of $'+highriskhigh+', '+lowprobs[i]+'% chance of $'+highrisklow+'<br></center>'
}

/* ************************************ */
/* Set up jsPsych blocks */
/* ************************************ */
// Set up attention check node
var attention_check_block = {
  type: 'attention-check',
  timing_response: 30000,
  response_ends_trial: true,
  timing_post_trial: 200
}

var attention_node = {
  timeline: [attention_check_block],
  conditional_function: function() {
    return run_attention_checks
  }
}

/* define static blocks */
var welcome_block = {
  type: 'poldrack-text',
  timing_response: 60000,
  text: '<div class = centerbox><p class = center-block-text>Welcome to the experiment. Press <strong>enter</strong> to begin.</p></div>',
  cont_key: [13],
  timing_post_trial: 0
};

var instructions_block = {
  type: 'instructions',
  pages: [
    '<div class = centerbox><p class = block-text>In this experiment you will be presented with a series of lottery choices. Your job is to indicate which option you would prefer for each of the ten paired lottery choices. </p><p class = block-text>You should indicate your <strong>true</strong> preference because at the end of the experiment a random trial will be chosen and you will receive a bonus payment proportional to the option you selected.</p><p class = block-text>Press <strong>enter</strong> to continue.</p></div>',
  ],
  key_forward: 13,
  allow_backwards: false
};

var test_block = {
    type: 'poldrack-radio-buttonlist',
    //if you're going to add more pages make sure to add same number of elements to preamble array
    preamble: ['<p><center>Please indicate your preference between the two options for each of the ten paired lottery choices below.</center></p>'],
    // placed in array so plug in can parse correctly. 
    // each element of array should be the buttonlist for a page.
    buttonlist: [buttonlist],
    checkAll: [true],
    numq: [10]
};

var end_block = {
  type: 'poldrack-text',
  timing_response: 60000,
  text: '<div class = centerbox><p class = center-block-text>Thanks for completing this task!</p><p class = center-block-text>Press <strong>enter</strong> to continue.</p></div>',
  cont_key: [13]
};


//Set up experiment
var holt_laury_experiment = []
holt_laury_experiment.push(welcome_block);
holt_laury_experiment.push(instructions_block);
holt_laury_experiment.push(test_block);
holt_laury_experiment.push(end_block)

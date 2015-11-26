/**
 * jspsych plugin for categorization trials with feedback (as well as rt feedback)
 * Ian Eisenberg
 *
 * documentation: docs.jspsych.org
 **/
 
(function($) {
	jsPsych["ant-practice"] = (function() {

		var plugin = {};

		plugin.create = function(params) {

			params = jsPsych.pluginAPI.enforceArray(params, ['choices', 'stimuli', 'key_answer', 'text_answer']);

			var trials = [];
			for (var i = 0; i < params.stimuli.length; i++) {
				trials.push({});
				trials[i].a_path = params.stimuli[i];
				trials[i].key_answer = params.key_answer[i];
				trials[i].text_answer = (typeof params.text_answer === 'undefined') ? "" : params.text_answer[i];
				trials[i].choices = params.choices;
				trials[i].correct_text = (typeof params.correct_text === 'undefined') ? "<p class='feedback'>Correct</p>" : params.correct_text;
				trials[i].incorrect_text = (typeof params.incorrect_text === 'undefined') ? "<p class='feedback'>Incorrect</p>" : params.incorrect_text;
				trials[i].show_stim_with_feedback = (typeof params.show_stim_with_feedback === 'undefined') ? true : params.show_stim_with_feedback;
				trials[i].is_html = (typeof params.is_html === 'undefined') ? false : params.is_html;
				trials[i].force_correct_button_press = (typeof params.force_correct_button_press === 'undefined') ? false : params.force_correct_button_press;
				trials[i].prompt = (typeof params.prompt === 'undefined') ? '' : params.prompt;
				trials[i].show_feedback_on_timeout = (typeof params.show_feedback_on_timeout === 'undefined') ? false : params.show_feedback_on_timeout;
				trials[i].timeout_message = params.timeout_message || "<p>Please respond faster.</p>";
				// timing params
				trials[i].timing_stim = params.timing_stim || -1; // default is to show image until response
				trials[i].timing_response = params.timing_response || -1; // default is no max response time
				trials[i].timing_feedback_duration = params.timing_feedback_duration || 2000;
			}
			return trials;
		};

		plugin.trial = function(display_element, trial) {

			// if any trial variables are functions
			// this evaluates the function and replaces
			// it with the output of the function
			trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);

			// this array holds handlers from setTimeout calls
			// that need to be cleared if the trial ends early
			var setTimeoutHandlers = [];

			if (!trial.is_html) {
				// add image to display
				display_element.append($('<img>', {
					"src": trial.a_path,
					"class": 'jspsych-categorize-stimulus',
					"id": 'jspsych-categorize-stimulus'
				}));
			} else {
				display_element.append($('<div>', {
					"id": 'jspsych-categorize-stimulus',
					"class": 'jspsych-categorize-stimulus',
					"html": trial.a_path
				}));
			}

			// hide image after time if the timing parameter is set
			if (trial.timing_stim > 0) {
				setTimeoutHandlers.push(setTimeout(function() {
					$('#jspsych-categorize-stimulus').css('visibility', 'hidden');
				}, trial.timing_stim));
			}

			// if prompt is set, show prompt
			if (trial.prompt !== "") {
				display_element.append(trial.prompt);
			}

			// create response function
			var after_response = function(info) {

				// kill any remaining setTimeout handlers
				for (var i = 0; i < setTimeoutHandlers.length; i++) {
					clearTimeout(setTimeoutHandlers[i]);
				}

				// clear keyboard listener
				jsPsych.pluginAPI.cancelAllKeyboardResponses();

				var correct = false;
				if (trial.key_answer == info.key) {
					correct = true;
				}

				// save data
				var trial_data = {
					"rt": info.rt,
					"correct": correct,
					"stimulus": trial.a_path,
					"key_press": info.key
				};

				jsPsych.data.write(trial_data);

				display_element.html('');

				var timeout = info.rt == -1;
				doFeedback(correct, trial_data.rt, timeout);
			}

			jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'date',
        persist: false,
				allow_held_key: false
      });

			if(trial.timing_response > 0) {
				setTimeoutHandlers.push(setTimeout(function(){
					after_response({key: -1, rt: -1});
				}, trial.timing_response));
			}

			function doFeedback(correct, rt, timeout) {

				if(timeout && !trial.show_feedback_on_timeout){
					display_element.append(trial.timeout_message);
				} else {
					// show image during feedback if flag is set
					if (trial.show_stim_with_feedback) {
						if (!trial.is_html) {
							// add image to display
							display_element.append($('<img>', {
								"src": trial.a_path,
								"class": 'jspsych-categorize-stimulus',
								"id": 'jspsych-categorize-stimulus'
							}));
						} else {
							display_element.append($('<div>', {
								"id": 'jspsych-categorize-stimulus',
								"class": 'jspsych-categorize-stimulus',
								"html": trial.a_path
							}));
						}
					}

					// substitute answer in feedback string.
					var atext = "";
					if (correct) {
						atext = trial.correct_text.replace("RT", rt);
					} else {
						atext = trial.incorrect_text.replace("RT", rt);
					}

					// show the feedback
					display_element.append(atext);
				}
				// check if force correct button press is set
				if (trial.force_correct_button_press && correct === false && ((timeout && trial.show_feedback_on_timeout) || !timeout)) {

					var after_forced_response = function(info) {
						endTrial();
					}

					jsPsych.pluginAPI.getKeyboardResponse({
		        callback_function: after_forced_response,
		        valid_responses: [trial.key_answer],
		        rt_method: 'date',
		        persist: false,
	          allow_held_key: false
		      });

				} else {
					setTimeout(function() {
						endTrial();
					}, trial.timing_feedback_duration);
				}

			}

			function endTrial() {
				display_element.html("");
				jsPsych.finishTrial();
			}

		};

		return plugin;
	})();
})(jQuery);
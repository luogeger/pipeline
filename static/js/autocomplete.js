/**
A jQuery plugin for search hints

Author: Lorenzo Cioni - https://github.com/lorecioni
*/

(function($) {
	$.fn.autocomplete = function(params) {
		//Selections
		var currentSelection = -1;
		var currentProposals = [];

		//Default parameters
		params = $.extend({
			hints: [],
            codeval: [],
			placeholder: '搜索...',
			width: 200,
			height: 16,
			showButton: true,
			buttonText: 'Search',
			onSubmit: function(text){
			},
			onBlur: function(){
			}
		}, params);

		//Build messagess
		this.each(function() {
			//Container
			var searchContainer = $('<div></div>')
				.addClass('autocomplete-container');
				// .css('height', params.height * 2);   ---kelly

			//Text input
			var input = $('<input type="text" autocomplete="off" name="query">')
				.attr('placeholder', params.placeholder)
				.addClass('input-group-form')
				.css({
					'width' : params.width,
					'height' : params.height
				});

			// if(params.showButton){
			// 	input.css('border-radius', '3px 0 0 3px');
			// }   ---kelly

			//Proposals
			var proposals = $('<div></div>')
				.addClass('proposal-box')
				.css('width', params.width + 18)
				.css('top', input.height());
			var proposalList = $('<ul></ul>')
				.addClass('proposal-list');

			proposals.append(proposalList);

			input.keydown(function(e) {
				console.log(e.which)
				switch(e.which) {
					case 38: // Up arrow
					e.preventDefault();
					$('ul.proposal-list li').removeClass('selected');
					if((currentSelection - 1) >= 0){
						currentSelection--;
						$( "ul.proposal-list li:eq(" + currentSelection + ")" )
							.addClass('selected');
					} else {
						currentSelection = -1;
					}
					break;
					case 40: // Down arrow
					e.preventDefault();
					if((currentSelection + 1) < currentProposals.length){
						$('ul.proposal-list li').removeClass('selected');
						currentSelection++;
						$( "ul.proposal-list li:eq(" + currentSelection + ")" )
							.addClass('selected');
					}
					break;
					case 13: // Enter
						var code;
						if(currentSelection > -1){
							var text = $( "ul.proposal-list li:eq(" + currentSelection + ")" ).html();
                            code = $( "ul.proposal-list li:eq(" + currentSelection + ")" ).attr('code');
							console.log(text);
                            console.log(code);
							input.val(text);
						}
						currentSelection = -1;
						proposalList.empty();
						params.onSubmit(code);
						break;
					case 27: // Esc button
						currentSelection = -1;
						proposalList.empty();
						input.val('');
						break;
				}
			});

			input.bind("change paste keyup", function(e){
				if(e.which != 13 && e.which != 27
						&& e.which != 38 && e.which != 40){
					currentProposals = [];
					currentSelection = -1;
					proposalList.empty();
					if(input.val() != ''){
						var word = "^" + input.val() + ".*";
						proposalList.empty();
						for(var test in params.hints){
							if(params.hints[test].match(word)){
								currentProposals.push(params.hints[test]);
								var element = $('<li></li>')
									.html(params.hints[test])
                                    .attr('title', params.hints[test])
									.attr('code', params.codeval[test])
									.addClass('proposal')
									.click(function(){
										input.val($(this).html());
										proposalList.empty();
										params.onSubmit($(this).attr('code'));
                                        params.onSubmit($(this).attr('html'));
									})
									.mouseenter(function() {
										$(this).addClass('selected');
									})
									.mouseleave(function() {
										$(this).removeClass('selected');
									});
								proposalList.append(element);
							}
						}
					}
				}
			});

			input.blur(function(e){
				currentSelection = -1;
				//proposalList.empty();
				params.onBlur();
			});

			searchContainer.append(input);
			searchContainer.append(proposals);

			if(params.showButton){
				//Search button
				var button = $('<div></div>')
					.addClass('autocomplete-button')
					.html(params.buttonText)
					.css({
						'height': params.height + 2,
						'line-height': params.height + 2 + 'px'
					})
					.click(function(){
						proposalList.empty();
						params.onSubmit(input.val());
					});
				searchContainer.append(button);
			}

			$(this).append(searchContainer);

			if(params.showButton){
				//Width fix
				searchContainer.css('width', params.width + button.width() + 50);
			}
		});

		return this;
	};

})(jQuery);
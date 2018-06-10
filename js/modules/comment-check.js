$(document).ready(function() {

	(function() {

		var commentValidation = {

			isValid: true,

			init: function() {
				this._setUpListenters();
			},

			_setUpListenters: function() {
				$('#comment-form').on('submit', this._validateComment).on('submit', this._sendForm);
			},

			_validateComment: function(e) {
				e.preventDefault();
				console.log('Comment validation...');

				var _form = $(this),
				_inputs = _form.find('.textarea'),
				_label = _form.find('.label-title'),
				_valid = true;

				$.each(_inputs, function(index, val) {
			
					var input = $(val),
						value = input.val().trim(),
						commentForm = input.parents('#comment-form');
						textError = $('<div class="error">Комментарий не может быть пустым.</div>');

					if (value.length === 0) {
						commentForm.find('.error').remove();
						textError.insertBefore(_label);
						_valid = false;

					}

					input.on('focus', function() {
						commentForm.find('.error').remove();
					});

					input.on('change', function() {
						commentForm.removeClass('error');
					});
				});

				commentValidation.isValid = _valid;
			},

			_sendForm: function() {
				// $('#comment-form').submit();
				console.log('Validating...');
				if (commentValidation.isValid === true) {
					console.log('Form is valid!');
					$('#comment-form')[0].submit();
				}
				else {
					console.log('Error');
				}
			}

		};

		commentValidation.init();

	}());

})
$(document).ready(function() {

		(function() {

			var loginBtn = $('.button--login'),
				mainForm = $('.plate'),
				email = 'mail@mail.com',
				password = '123';

			var loginValidation = {

				isValid: true,

				init: function() {
					this._setUpListeners();
				},

				_setUpListeners: function() {
					loginBtn.on('click', this._loginValidate).on('click', this._sendForm);
				},

				_loginValidate: function(e) {
					e.preventDefault();
					console.log('Login validation begins!');

					var _form = mainForm,
						_inputs = _form.find('input'),
						_valid = false;

					$.each(_inputs, function(index, val) {
						var input = $(val),
							value = input.val().trim(),
							passField = _form.find('input:password');
							emailError = $('.error--email'),
							emailInvalid = $('.error--email-wrong');
							passError = $('.error--pass');
							errorWithDesc = $('.error--with-desc');

						if (value.length === 0) {
							if (input.attr('type').toLowerCase() === 'email') {
								emailError.removeClass('hidden');
								emailInvalid.addClass('hidden');
								errorWithDesc.addClass('hidden');
							}
							if (input.attr('type').toLowerCase() === 'password') {
								passError.removeClass('hidden');
							}
							_valid = false;
						}

						if (input.attr('type').toLowerCase() === 'email') {
							if (value != '') {
								var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2-4}\.)?[a-z]{2,4}$/i;
								if (pattern.test(value)) {
									if (value === email) {
										errorWithDesc.addClass('hidden');
										emailError.addClass('hidden');
										emailInvalid.addClass('hidden');

										console.log('Passfield' + passField.val());

										console.log('Email is correct!');
										if (passField.val() === password) {
											_valid = true;
										}
										else {
											errorWithDesc.removeClass('hidden');
											_valid = false;
										}
									}
									else {
										emailError.addClass('hidden');
										emailInvalid.addClass('hidden');
										errorWithDesc.removeClass('hidden');
									}
								}
								else {
									emailInvalid.removeClass('hidden');
									_valid = false;
								}
							}
						}

						input.on('focus', function() {
							if (input.attr('type').toLowerCase() === 'email') {
								emailInvalid.addClass('hidden');
								emailError.addClass('hidden');
								errorWithDesc.addClass('hidden');
							}
							if (input.attr('type').toLowerCase() === 'password') {
								passError.addClass('hidden');
								errorWithDesc.addClass('hidden');
							}
						});

						input.on('keydown', function() {
							if (input.attr('type').toLowerCase() === 'email') {
								emailInvalid.addClass('hidden');
								emailError.addClass('hidden');
								errorWithDesc.addClass('hidden');
							}
							if (input.attr('type').toLowerCase() === 'password') {
								passError.addClass('hidden');
								errorWithDesc.addClass('hidden');
							}
						});

						input.on('change', function() {
							if (input.attr('type').toLowerCase() === 'email') {
								emailInvalid.addClass('hidden');
								emailError.addClass('hidden');
								errorWithDesc.addClass('hidden');
							}
							if (input.attr('type').toLowerCase() === 'password') {
								passError.addClass('hidden');
								errorWithDesc.addClass('hidden');
							}
						});

						loginValidation.isValid = _valid;
						console.log(loginValidation.isValid);

					});

				},

				_sendForm: function() {
					if (loginValidation.isValid === true) {
						emailInvalid.addClass('hidden');
						emailError.addClass('hidden');
						errorWithDesc.addClass('hidden');
						passError.addClass('hidden');
						mainForm.submit();
					}
				}

			}

			loginValidation.init();

		}());


});
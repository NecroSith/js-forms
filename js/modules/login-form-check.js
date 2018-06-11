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

							passField = _form.find('input:password'),
							textPassError = passField.attr('data-error-empty'),

							passTooltip = $('<div class="error error--pass">' + textPassError + '</div>'),

							emailField = _form.find('.input--email'),
							textEmailError = emailField.attr('data-error-empty'),
							textEmailInvalid = emailField.attr('data-error-invalid'),

							emailErrorTooltip = $('<div class="error error--email">' + textEmailError + '</div>'),
							emailInvalidTooltip = $('<div class="error error--email-wrong">' + textEmailInvalid + '</div>'),

							errorWithDesc = $('.error--with-desc'),
							errorWithDescTooltip = $('<div class="error error--with-desc">Неверный email или пароль</div>'),

							loginMsg = $('<div class="error-description"><p>Введите верные данные для входа или воспользуйтесь <a href="#">восстановлением пароля, </a>чтобы войти на сайт.</p></div>');

						inputOuter = input;

						if (value.length === 0) {
							if (input.attr('type').toLowerCase() === 'email') {
								loginValidation._deleteTooltips('email');
								emailErrorTooltip.insertBefore(emailField);
							}
							if (input.attr('type').toLowerCase() === 'password') {
								loginValidation._deleteTooltips('description');
								loginValidation._deleteTooltips('password');
								passTooltip.insertBefore(passField);
							}
							_valid = false;
						}

						if (input.attr('type').toLowerCase() === 'email') {
							if (value != '') {
								var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2-4}\.)?[a-z]{2,4}$/i;
								if (pattern.test(value)) {
									if (value === email) {
										loginValidation._deleteTooltips('email');
										loginValidation._deleteTooltips('description');

										console.log('Email is correct!');
										if (passField.val() === password) {
											loginValidation._deleteTooltips('description');
											_valid = true;
										}
										else {
											errorWithDescTooltip.insertBefore(emailField);
											loginMsg.insertBefore(emailField);
											_valid = false;
										}
									}
									else {
										loginValidation._deleteTooltips('email');
										loginValidation._deleteTooltips('description');
										errorWithDescTooltip.insertBefore(emailField);
										loginMsg.insertBefore(emailField);
									}
								}
								else {
									loginValidation._deleteTooltips('email');
									loginValidation._deleteTooltips('description');
									emailInvalidTooltip.insertBefore(emailField);
									_valid = false;
								}
							}
						}

						input.on('focus', function() {
							loginValidation._deleteTooltips('description');
							if (input.attr('type').toLowerCase() === 'email') {
								loginValidation._deleteTooltips('email');
							}
							if (input.attr('type').toLowerCase() === 'password') {
								loginValidation._deleteTooltips('password');
							}
						});

						input.on('keydown', function() {
							loginValidation._deleteTooltips('description');
							if (input.attr('type').toLowerCase() === 'email') {
								loginValidation._deleteTooltips('email');
							}
							if (input.attr('type').toLowerCase() === 'password') {
								loginValidation._deleteTooltips('password');
							}
						});

						input.on('change', function() {
							mainForm.find('.error--with-desc').remove();
							mainForm.find('.error-description').remove();
							if (input.attr('type').toLowerCase() === 'email') {
								mainForm.find('.error--email').remove();
								mainForm.find('.error--email-wrong').remove();
							}
							if (input.attr('type').toLowerCase() === 'password') {
								mainForm.find('.error--pass').remove();
							}
						});

						loginValidation.isValid = _valid;

					});

				},

				_sendForm: function() {
					if (loginValidation.isValid === true) {
						mainForm.find('.error--email').remove();
						mainForm.find('.error--email-wrong').remove();
						mainForm.find('.error--pass').remove();
						mainForm.find('.error--with-desc').remove();
						mainForm.find('.error-description').remove();
						mainForm.submit();
					}
				},

				_deleteTooltips: function(type) {
					switch (type) {
						case 'email':
							mainForm.find('.error--email').remove();
							mainForm.find('.error--email-wrong').remove();
							break;
						case 'password':
							mainForm.find('.error--pass').remove();
							break;
						case 'description':
							mainForm.find('.error--with-desc').remove();
							mainForm.find('.error-description').remove();
							break;
					}
				},

			}

			loginValidation.init();

		}());


});
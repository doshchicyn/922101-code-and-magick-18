'use strict';
// находим окно с настройками персонажа
var userMainDialog = document.querySelector('.setup');
// находим блок с аватаркой персонажа
var setupOpen = document.querySelector('.setup-open');
// находим иконку аватарки персонажа
// var userLogo = setupOpen.querySelector('.setup-open-icon');
// находим кнопку закрытия окна настроек персонажа
var setupClose = userMainDialog.querySelector('.setup-close');
// наъодим блок с аналогичными персонажами
var userSimilarDialog = document.querySelector('.setup-similar');
// находим объект(список), куда будем вставлять блоки с данными
var similarListElement = document.querySelector('.setup-similar-list');
// находим объект в шаблоне, который будем вставлять в список
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
// находит поле для ввода логина
var userNameInput = userMainDialog.querySelector('.setup-user-name');
// находит форму в окне настроек персонажа
var userProfileForm = userMainDialog.querySelector('.setup-wizard-form');
// находит кнопку отправки формы в окне настроек персонажа
// var userProfileSubmitBtn = userProfileForm.querySelector('.setup-submit');
// находит поле формы - цвет одежды
var coatColorValue = userProfileForm.querySelector('input[name="coat-color"]');
// находит поле формы - цвет глаз
var eyesColorValue = userProfileForm.querySelector('input[name="eyes-color"]');
// находит поле формы - цвет фаерболла
var fireballColorValue = userProfileForm.querySelector('input[name="fireball-color"]');

// массив имен
var FIRST_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
// массив фамилий
var LAST_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
// массив цветов одежды
var CLOTHES_COLOR = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
// массив цветов
var COLOR = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
// количество блоков для магов
var TOTAL_WIZARDS = 4;
// минимальная длина поля - имя пользователя
var MIN_LENGTH_USERNAME = 2;

// СЦЕНАРИИ
// кнопка ESC
var ESC_KEYCODE = 27;
// кнопка ENTER
var ENTER_KEYCODE = 13;

// фуекция - закрытие окна с проверкой фокуса в поле ввода имени
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== userNameInput) {
    closePopup();
  }
};
// функция - открыть окно настроек + доб события закрытия окна
var openPopup = function () {
  userMainDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};
// функция - закрыть окно настроек + удаление события закрытия окна
var closePopup = function () {
  userMainDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};
// событие по клику на аватар
setupOpen.addEventListener('click', function () {
  openPopup();
});
// событие по ENTER при фокусе на аватарке
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});
// событие по клику на крестик закрытия окна
setupClose.addEventListener('click', function () {
  closePopup();
});
// событие по ENTER при фокусе на крестике
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});
// ВАЛИДАЦИЯ
// валидация поля - ввод логина с проверкой длинны
userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя должно состоять максимум из 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});
// валидация поля - при заполнении
userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < MIN_LENGTH_USERNAME) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});
// АВТОМАТИЗАЦИЯ
// функция - показать блок с настройками мага
var showSetup = function () {
  userMainDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};
// функция - показать блок с другими магами
var showSimilarSetup = function () {
  userSimilarDialog.classList.remove('hidden');
};
// функция - получить случайный элемент массива
var getRandomElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};
// функция - получить данные мага
var getSimilarWizardInfo = function () {
  var wizardFirstName = getRandomElement(FIRST_NAMES);
  var wizardLastName = getRandomElement(LAST_NAMES);
  return {
    'name': wizardFirstName + ' ' + wizardLastName,
    'coatColor': getRandomElement(CLOTHES_COLOR),
    'eyesColor': getRandomElement(COLOR)
  };
};
// функция - создать массив с данными магов
var getSimilarWizardCounts = function (count) {
  var similarWizards = [];
  for (var i = 0; i < count; i++) {
    similarWizards.push(getSimilarWizardInfo());
  }
  return similarWizards;
};
// функция клонирования объекта setup-similar-item с вложенными элементами
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};
// функция - смены цвета плаща, глаз и фаерболла
(function () {
  var COAT_COLOR = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var EYES_COLOR = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  var FIREBALL_COLOR = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];
  var wizard = userMainDialog.querySelector('.wizard');
  var wizardCoat = wizard.querySelector('.wizard-coat');
  var wizardEyes = wizard.querySelector('.wizard-eyes');
  var fireball = userMainDialog.querySelector('.setup-fireball-wrap');
  wizardCoat.addEventListener('click', function () {
    wizardCoat.style.fill = getRandomElement(COAT_COLOR);
    coatColorValue.value = wizardCoat.style.fill;
  });
  wizardEyes.addEventListener('click', function () {
    wizardEyes.style.fill = getRandomElement(EYES_COLOR);
    eyesColorValue.value = wizardEyes.style.fill;
  });
  fireball.addEventListener('click', function () {
    var fireBallColor = getRandomElement(FIREBALL_COLOR);
    fireball.style.backgroundColor = fireBallColor;
    fireballColorValue.value = fireBallColor;
  });
})();

var renderWizards = function (wizards) {
  // объявляем вспомогательный контейнер - фрагмент
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);
};

// функция инициализации
var playGame = function () {
  showSetup();
  showSimilarSetup();
  var wizards = getSimilarWizardCounts(TOTAL_WIZARDS);
  renderWizards(wizards);
};
// запуск инициализации
playGame();

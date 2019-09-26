'use strict';
// находим окно с настройками персонажа
var userMainDialog = document.querySelector('.setup');
// находим блок с аватаркой персонажа
var setupOpen = document.querySelector('.setup-open');
// находим иконку аватарки персонажа
var userLogo = setupOpen.querySelector('.setup-open-icon');
// находим кнопку закрытия окна настроек персонажа
var setupClose = userMainDialog.querySelector('.setup-close');
// наъодим блок с аналогичными персонажами
var userSimilarDialog = document.querySelector('.setup-similar');
// находим объект(список), куда будем вставлять блоки с данными
var similarListElement = document.querySelector('.setup-similar-list');
// находим объект в шаблоне, который будем вставлять в список
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
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
var COLOR = ['black',
  'red',
  'blue',
  'yellow',
  'green'
];
// количество блоков для магов
var totalWizards = 4;

// ОБРАБОТЧИКИ
// Показать окно настроек при клике на аватарку
setupOpen.addEventListener('click', function () {
  userMainDialog.classList.remove('hidden');
});
// если фокус - по нажатию на Enter
window.addEventListener('keydown', function (evt) {
  if (userLogo.focus && evt.keyCode === 13) {
    userMainDialog.classList.remove('hidden');
  }
});
// Закрыть окно настроек при клике на Х
setupClose.addEventListener('click', function () {
  userMainDialog.classList.add('hidden');
});
// при нажатии ESC
window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    userMainDialog.classList.add('hidden');
  }
});

// АВТОМАТИЗАЦИЯ
// функция - показать блок с настройками мага
var showSetup = function () {
  userMainDialog.classList.remove('hidden');
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
  var wizards = getSimilarWizardCounts(totalWizards);
  renderWizards(wizards);
};
// запуск инициализации
playGame();

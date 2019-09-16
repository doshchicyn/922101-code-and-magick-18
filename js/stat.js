'use strict';
// параметры окна
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_COLOR = '#fff';
var CLOUD_SHADOW = 'rgba(0, 0, 0, 0.7)';
var CLOUD_STROKE = 'black';

// параметры отступов
var GAP = 10;
var DOWN_GAP = 20;
var FONT_GAP = 16;

// параметры шкалы
var PLAYER_BAR_COLOR = 'rgba(255, 0, 0, 1)';
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_MAX_HEIGHT = -150 + GAP + FONT_GAP;

// параметры загаловка окна
var TITLE_BASELINE = 'hanging';
var TITLE_TEXT1 = 'Ура вы победили!';
var TITLE_TEXT2 = 'Список результатов:';
var TITLE_COLOR = '#000';

// параметры шрифта
var FONT_SIZE = 16;
var FONT_FAMILY = 'PT mono';
var DEFAULT_BASELINE = 'alphabetic';
var TEXT_COLOR = '#000';

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

// функция вывода окна
var renderCloud = function (ctx, x, y, color, strcolor) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.strokeStyle = strcolor;
  ctx.strokeRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}
// функция вывода загаловка окна
var renderTitle = function (ctx, x, y, tbaseline, color, fsize, title) {
  ctx.textBaseline = tbaseline;
  ctx.fillStyle = color;
  ctx.font = fsize + 'px ' + FONT_FAMILY;
  ctx.fillText(title, x, y);
};

// функция вывода текстовых полей
var renderText = function (ctx, x, y, baseline, color, text) {
  ctx.textBaseline = baseline;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}
// функция вывода шкалы
var renderStat = function (ctx, x, y, width, height) {
  ctx.fillRect(x, y, width, height);
}
// функция расчета насыщености цвета для шкал других игроков
var randomSaturation = function (int1, int2) {
  return (Math.ceil(Math.random() * (int2 - int1) * int2)) + '%';
}
window.renderStatistics = function (ctx, names, times) {
  // Тень окна
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_SHADOW, CLOUD_STROKE);
  // Основное окно
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR, CLOUD_STROKE);
  // Текст вверху окна
  // 1-я строка
  renderTitle(ctx, CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2, TITLE_BASELINE, TITLE_COLOR, FONT_SIZE, TITLE_TEXT1);
  // 2-я строка
  renderTitle(ctx, CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2 + FONT_GAP + GAP * 0.5, TITLE_BASELINE, TITLE_COLOR, FONT_SIZE, TITLE_TEXT2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    // Показатель времени игроков
    renderText(ctx, CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - DOWN_GAP - FONT_GAP - GAP + (BAR_MAX_HEIGHT * times[i]) / maxTime - GAP, DEFAULT_BASELINE, TEXT_COLOR, Math.round(times[i]));
    // Имя игроков
    renderText(ctx, CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - DOWN_GAP, DEFAULT_BASELINE, TEXT_COLOR, names[i]);
    if (names[i] === 'Вы') {
      // шкала игрока - красная
      ctx.fillStyle = PLAYER_BAR_COLOR;
    } else {
      // цвет шкалы других игроков рассчитывается с помощью функции
      ctx.fillStyle = 'hsl(230,' + randomSaturation(1, 10) + ', 50%)';
    }
    // Шкала времени игроков
    renderStat(ctx, CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - DOWN_GAP - FONT_GAP - GAP, BAR_WIDTH, (BAR_MAX_HEIGHT * times[i]) / maxTime);
  }
};

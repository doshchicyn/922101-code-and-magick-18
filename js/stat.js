'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;

var GAP = 10;
var DOWN_GAP = 20;
var FONT_GAP = 16;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_MAX_HEIGHT = -150 + GAP + FONT_GAP;
var TITLE_GAP = 20;
var TITLE_COLOR = '#000';
var PLAYER_BAR_COLOR = 'rgba(255, 0, 0, 1)';
var OPPONENT_BAR_COLOR = 'hsl(230, 50%, 50%)';
var TEXT_COLOR = '#000';


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

// var renderTitle = function (ctx, ) {
//   ctx.fillStyle

// };

var getMaxElement = function (arr) {
  var maxElement = -Infinity;
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  // Тень окна
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  // Основное окно
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  // Текст вверху окна
  ctx.textBaseline = 'hanging';
  ctx.font = '16px PT mono';
  ctx.fillStyle = TITLE_COLOR;
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2 + FONT_GAP + GAP * 0.5);

  ctx.textBaseline = 'alphabetic';

  var maxTime = Math.round(getMaxElement(times));

  for (var i = 0; i <= names.length; i++) {
    //ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(times[i], CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - DOWN_GAP - FONT_GAP - GAP + (BAR_MAX_HEIGHT * times[i]) / maxTime - GAP);
    //ctx.fillStyle = PLAYER_BAR_COLOR;
    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - DOWN_GAP - FONT_GAP - GAP, BAR_WIDTH, (BAR_MAX_HEIGHT * times[i]) / maxTime);
    //ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(names[i], CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - DOWN_GAP);
  }
};

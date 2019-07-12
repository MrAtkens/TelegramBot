'use strict';

var _nodeTelegramBotApi = require('node-telegram-bot-api');

var _nodeTelegramBotApi2 = _interopRequireDefault(_nodeTelegramBotApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var token = '802225174:AAH3C9WGfF35wl33W8ZwKhucyGeF7L4UvII';

var bot = new _nodeTelegramBotApi2.default(token, { polling: true });

var notes = [];

bot.onText(/напомни (.+) в (.+)/, function (msg, match) {
  var userId = msg.from.id;
  var text = match[1];
  var time = match[2];

  notes.push({ 'uid': userId, 'time': time, 'text': text });

  bot.sendMessage(userId, 'Отлично! Я обязательно напомню, если не сдохну :)');
});

setInterval(function () {
  for (var i = 0; i < notes.length; i++) {
    var curDate = new Date().getHours() + ':' + new Date().getMinutes();
    if (notes[i]['time'] == curDate) {
      bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: ' + notes[i]['text'] + ' сейчас.');
      notes.splice(i, 1);
    }
  }
}, 1000);
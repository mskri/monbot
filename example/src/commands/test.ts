import { createCommand, Message } from 'monbot';

export const test = createCommand({
  trigger: /^!test/,
  run: function (message: Message) {
    message.reply('It works!');
  },
});

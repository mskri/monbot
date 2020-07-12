import { createCommand, Message } from 'monbot';

export const test = createCommand({
  name: 'test',
  trigger: /^!test/,
  run: function (message: Message) {
    message.reply('It works!');
  },
});

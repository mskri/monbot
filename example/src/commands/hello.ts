import { createCommand, Message } from 'monbot';

export const hello = createCommand({
  name: 'hello',
  trigger: /hello/i,
  run: function (message: Message) {
    message.channel.send('hi 👋');
  },
});

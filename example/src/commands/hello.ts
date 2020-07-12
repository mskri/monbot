import { createCommand, Message } from 'monbot';

export const hello = createCommand({
  name: 'hello',
  trigger: /hello/i,
  requiredRoles: [
    '380065303440392203', // Officers
    '494171126038134795', // Mythic team
  ],
  channels: ['bot-test'],
  run: function (message: Message) {
    message.channel.send('hi 👋');
  },
});

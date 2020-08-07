import { createCommand } from 'monbot';

export const hello = createCommand({
  name: 'hello',
  trigger: /hello\s/i,
  requiredRoles: [
    '380065303440392203', // Officers
    '494171126038134795', // Mythic team
  ],
  channels: ['bot-test'],
  guilds: [
    '369588869794103297', // IronBot
  ],
  run: function ({ channel }) {
    channel.send('hi 👋');
  },
});

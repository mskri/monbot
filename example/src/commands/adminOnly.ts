import { createCommand, Message } from 'monbot';

export const adminOnly = createCommand({
  name: 'admin-only',
  trigger: /admin/i,
  requiredRoles: [
    '380065303440392203', // Officers
  ],
  adminOnly: true,
  run: function (message: Message) {
    message.channel.send('👋 admin only');
  },
});

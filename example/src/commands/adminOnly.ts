import { createCommand } from 'monbot';

export const adminOnly = createCommand({
  name: 'admin-only',
  trigger: /(^|\s+)admin(\s+|$)/i,
  requiredRoles: [
    '380065303440392203', // Officers
  ],
  adminOnly: true,
  run: function ({ channel }) {
    channel.send('👋 admin only');
  },
});

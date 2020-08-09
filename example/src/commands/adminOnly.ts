import { createCommand } from 'monbot';

export const adminOnly = createCommand({
  name: 'admin-only',
  trigger: /(^|\s+)admin(\s+|$)/i,
  adminOnly: true,
  run: function ({ channel }) {
    channel.send('👋 admin only');
  },
});

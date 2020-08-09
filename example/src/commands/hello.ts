import { createCommand } from 'monbot';

export const hello = createCommand({
  name: 'hello',
  trigger: /(^|\s+)hello(\s+|$)/i,
  run: ({ channel }) => {
    channel.send('hi 👋');
  },
});

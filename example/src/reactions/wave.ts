import { createReaction } from 'monbot';

export const wave = createReaction({
  name: 'wave',
  trigger: ['👋', '👍'],
  onAdd: ({ emoji, message: { channel } }, user) => {
    // if (emoji.name === '👍') {
    // if (emoji.name === 'customemoji') {
    if (emoji.identifier === '%F0%9F%91%8D') {
      channel.send(`${user.username} added :thumbsup:`);
      return;
    }
    channel.send('You added :wave:');
  },
  onRemove: function ({ emoji, message: { channel } }, user) {
    // if (emoji.name === '👍') {
    // if (emoji.name === 'customemoji') {
    if (emoji.identifier === '%F0%9F%91%8D') {
      channel.send(`${user.username} removed :thumbsup:`);
      return;
    }
    channel.send('You removed :wave:');
  },
});

import { createCommand, Message } from 'monbot';
import { stripTrigger } from './commandUtils';

export const emojiId = createCommand({
  name: 'emoji-id',
  trigger: /^!emoji-id/,
  run: function (message: Message, { content }) {
    const customEmojiRegExp = /<:\w+:[0-9]+>/;
    const customEmojiIdRegExp = /(?<=:)[0-9]+(?=>)/;
    const [customEmoji] = content.match(customEmojiRegExp) ?? [null];

    if (customEmoji) {
      const [customEmojiId] = customEmoji.match(customEmojiIdRegExp) ?? [''];
      const emoji = message.guild?.emojis.resolve(customEmojiId);
      message.channel.send(
        `ID for custom emoji "${emoji?.name}" is \`${emoji?.id}\``
      );

      return;
    }

    message.channel.send('No matching emoji found');
  },
});

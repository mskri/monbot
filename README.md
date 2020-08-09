# Monbot

A library with simple API for creating your own discord bots.

> :warning: Not recommended for use yet. Under development and api is still shaping up.

## Installation

Install using `npm install --save monbot discord.js` or `yarn add monbot discord.js`.

## Quickstart

Monbot makes it easier to create discord bots with custom commands. Here's quick example:

```ts
import { Monbot, createCommand } from 'monbot';

// Create a command that is triggered when word "hello" is found in the message, e.g. "Hello friend!"
const hello = createCommand({
  name: 'hello',
  trigger: /hello\s/i,
  run: function ({ channel }) {
    channel.send('hi 👋');
  },
});

// Initialise the bot
Monbot(BOT_AUTH_TOKEN, {
  commands: [hello],
});
```

You can find expanded example from [`example/`](./example/)

## Bot permissions in discord

For bot to work with adding or removing reactions to messages that are not in its cache, e.g. messages send before bot became online, it requires `Read Message History` permission.

Without the permission bot cannot fetch non-cached messages and the reactions will not trigger the action.

## API documentation

### `Monbot`

TBA

### `createCommand`

TBA

### `createReaction`

TBA

# Monbot

A library with simple API for creating your own discord bots.

> :warning: Not recommended for use yet. Under development and api is still shaping up.

## Installation

Install using `npm install --save monbot` or `yarn add monbot`.

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

## API documentation

### `Monbot`

TBA

### `createCommand`

TBA

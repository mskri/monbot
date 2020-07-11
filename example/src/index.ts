import { Monbot } from 'monbot';
import { BOT_AUTH_TOKEN } from './constants/env';
import { commands } from './commands';

Monbot(BOT_AUTH_TOKEN, { commands });

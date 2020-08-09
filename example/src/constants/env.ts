import dotenv from 'dotenv';

const { error, parsed } = dotenv.config();

if (error) {
  throw error;
}

export const BOT_AUTH_TOKEN: string = parsed?.BOT_AUTH_TOKEN ?? '';

export const ADMINS: string[] = parsed?.ADMINS?.split(',') ?? [];

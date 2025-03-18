import { configDotenv } from 'dotenv';

const _env = configDotenv();

export const env = _env.parsed;

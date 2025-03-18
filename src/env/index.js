import { configDotenv } from "dotenv";

const test = configDotenv()

export const env = test.parsed
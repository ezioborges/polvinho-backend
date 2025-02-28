/**
 * This file is responsible for loading the environment variables and validating them.
 */

import { InvalidEnvironmentVariablesError } from "../errors/InvalidEnvironmentVariablesError.js";
import "dotenv/config";

const env = process.env;

function validateEnv(env) {
    if (!env.DATABASE_PORT) {
        throw new InvalidEnvironmentVariablesError("❌ Check your .env file, DATABASE_PORT is required ❌");
    }
    if (!env.DATABASE_HOST) {
        throw new InvalidEnvironmentVariablesError("❌ Check your .env file, DATABASE_HOST is required ❌");
    }
    if (!env.DATABASE_NAME) {
        throw new InvalidEnvironmentVariablesError("❌ Check your .env file, DATABASE_NAME is required ❌");
    }
    if (!env.PORT) {
        throw new InvalidEnvironmentVariablesError("❌ Check your .env file, PORT is required ❌");
    }
    if (!env.JWT_SECRET) {
        throw new InvalidEnvironmentVariablesError("❌ Check your .env file, JWT_SECRET is required ❌");
    }
    if (!env.JWT_EXPIRATION_TIME) {
        throw new InvalidEnvironmentVariablesError("❌ Check your .env file, JWT_EXPIRATION_TIME is required ❌");
    }
    if (!env.BACKEND_URL) {
        throw new InvalidEnvironmentVariablesError("❌ Check your .env file, BACKEND_URL is required ❌");
    }
    if (!env.SMTP_HOST) {
        throw new InvalidEnvironmentVariablesError("❌ Check your .env file, SMTP_HOST is required ❌");
    }
    if (!env.SMTP_PORT) {
        throw new InvalidEnvironmentVariablesError("❌ Check your .env file, SMTP_PORT is required ❌");
    }
    if (!env.SMTP_USERNAME) {
        throw new InvalidEnvironmentVariablesError("❌ Check your .env file, SMTP_USERNAME is required ❌");
    }
    if (!env.SMTP_PASSWORD) {
        throw new InvalidEnvironmentVariablesError("❌ Check your .env file, SMTP_PASSWORD is required ❌");
    }
    if (!env.EMAIL_PASSWORD) {
        throw new InvalidEnvironmentVariablesError("❌ Check your .env file, EMAIL_PASSWORD is required ❌");
    }
}

validateEnv(env);
export default env;


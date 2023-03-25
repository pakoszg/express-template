import * as dotenv from "dotenv";

const dotenvConfig = dotenv.config().parsed;

export const postgrestUrl = dotenvConfig?.POSTGREST_URL || "";
export const postgrestJwtSecret = dotenvConfig?.POSTGREST_JWT_SECRET || "";

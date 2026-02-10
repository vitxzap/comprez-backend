import { ConnectionOptions } from "bullmq";


export const connection: ConnectionOptions = {
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD
}
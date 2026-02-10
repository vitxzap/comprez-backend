import { env } from "config/env";
import { Worker } from "bullmq"
import { queues } from "queues/config/names";
import { connection } from "queues/config/connection";
import { pathToFileURL } from "url";
const processorFile = pathToFileURL(__dirname + "/processor.ts");
const worker = new Worker(queues.compressor, processorFile, {
    connection,
    concurrency: 2
})
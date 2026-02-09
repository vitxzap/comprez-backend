import z from "zod";
import { jobReturnValuesSchema } from "./queue.types";

const progressEventData = z.object({
    jobId: z.uuidv7(),
    data: z.object({
        porcentage: z.number(),
        originalName: z.string()
    })
})

const completedEventData = jobReturnValuesSchema.extend({
    jobId: z.uuidv7(),
    returnvalue: jobReturnValuesSchema,
    prev: z.string(),
})

export type CompletedEventData = z.infer<typeof completedEventData>
export type ProgressEventData = z.infer<typeof progressEventData>
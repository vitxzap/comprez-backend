import z from "zod";
import { CompressionLevel } from "./video.dto";


const progressEventData = z.object({
    jobId: z.uuidv7(),
    data: z.object({
        porcentage: z.number(),
        originalName: z.string()
    })
})
export type ProgressEventData = z.infer<typeof progressEventData>

//Defines the SandboxedJob Data that will be returned
const jobDataObject = z.object({
    compressedSize: z.number(),
    destination: z.url(),
    preset: z.custom<CompressionLevel>()
})

const jobReturnValuesSchema = z.object({
    success: z.boolean(),
    data: jobDataObject
})
export type JobReturnValues = z.infer<typeof jobReturnValuesSchema>


const completedEventData = jobReturnValuesSchema.extend({
    jobId: z.uuidv7(),
    returnvalue: jobReturnValuesSchema,
    prev: z.string(),
})
export type CompletedEventData = z.infer<typeof completedEventData>

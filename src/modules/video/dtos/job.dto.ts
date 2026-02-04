import z from "zod";


const progressDataSchema = z.object({
    progress: z.number(),
    path: z.string(),
})
export type ProgressData = z.infer<typeof progressDataSchema>

const completedReturnTypeSchema = z.object({
    success: z.boolean()
})
export type CompletedReturnType = z.infer<typeof completedReturnTypeSchema> 
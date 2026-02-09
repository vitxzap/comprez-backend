import { Request } from "express";
import z from "zod";


//Defines the compressor request object 
const uploadRequestSchema = z.object({
    uploadId: z.uuidv7(),
});

export type UploadRequest = Request & z.infer<typeof uploadRequestSchema>
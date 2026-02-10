import { SandboxedJob } from "bullmq"
import { JobData, JobReturnValues } from "src/modules/compressor/types/queue.types"

export default async function (job: SandboxedJob<JobData>): Promise<JobReturnValues> {
    await job.updateProgress({ porcentage: 20, originalName: job.data.originalName })
    return {
        success: true,
        data: {
            //Simulating data
            originalName: job.data.originalName,
            userId: job.data.userId,
            destination: "url.com",
            ext: job.data.ext,
            preset: "low",
            originalSize: job.data.originalSize,
            compressedSize: job.data.originalSize / 2,
        }
    }
}
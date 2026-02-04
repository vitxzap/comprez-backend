import { SandboxedJob } from "bullmq"
import { FileJobData } from "src/common/types"
import { CompressionLevel, CompressionOptions } from "../dtos/video.dto";
import { spawn } from "child_process";

export default async function (job: SandboxedJob<FileJobData>): Promise<{ success: boolean }> {
    await job.updateProgress({ progress: 20, path: job.data.path })
    return {
        success: true
    }
}


function buildCompressionArgs(input: string, output: string, compressionLevel: CompressionLevel) {
    const presets = {
        low: ['-crf', '28', '-preset', 'faster'],
        medium: ['-crf', '23', '-preset', 'medium'],
        high: ['-crf', '18', '-preset', 'slow']
    }
    const args = [
        '-i', input,
        '-c:v', 'libx264',
        ...presets[compressionLevel],
        '-c:a', 'aac',
        '-b:a', '96k',
        '-movflags', '+faststart',
        '-y',
        output
    ]
    return args;
}
function compress(args: string[]) {
    return new Promise((resolve, reject) => {
        const ffmpeg = spawn("ffmpeg", args);
        resolve(undefined)
    })
}
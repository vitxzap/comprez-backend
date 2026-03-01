import { Compression } from "generated/prisma/client"

// Defines the shape of GetUserCompressionsById response
export type UserCompressions = Pick<Compression, "id" | "originalName" | "status">
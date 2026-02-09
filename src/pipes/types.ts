import z from "zod";

/**
 * This schema is used to parse the ext and mimetype of the file sent by the video controller upload endpoint.
 * To validate another file types, simple create another schema following this example:
 * { ext: string, mime: string }
 */
export const validateCompressorFile = z.xor([
    //mp4 video format
    z.object({
        ext: z.literal('mp4'),
        mime: z.literal('video/mp4')
    }),

    //ogg video format
    z.object({
        ext: z.literal('ogg'),
        mime: z.literal('video/ogg')
    }),

    //avi video format
    z.object({
        ext: z.literal('avi'),
        mime: z.literal('video/vnd.avi')
    }),

    //wmv video format
    z.object({
        ext: z.literal('asf'),
        mime: z.literal('video/x-ms-asf')
    }),

    //webm video format
    z.object({
        ext: z.literal('webm'),
        mime: z.literal('video/webm')
    }),
]);
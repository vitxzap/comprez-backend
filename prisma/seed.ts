import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { env } from "config/env";

//PrismaClient configurations
const prisma = new PrismaClient({
    adapter: new PrismaPg({
        connectionString: env.DATABASE_URL
    })
});

//Creates all default status
async function main() {
    const status = await prisma.status.createMany({
        data: [
            { name: "CREATED" },
            { name: "WAITING" },
            { name: "PENDING" },
            { name: "FINISHED" },
            { name: "FAILED" }]
    })
    console.log("Prisma seed return: ", status)
}

main()
    .then(async () => {
        //Disconnecting...
        await prisma.$disconnect();
    })
    .catch(async (e) => {

        //Logging errors
        console.error(e);

        //Disconnecting...
        await prisma.$disconnect();

        //Exiting process
        process.exit(1);
    });
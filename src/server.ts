import { error } from "node:console";
import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 5000

async function main() {
    try {
        await prisma.$connect();
        console.log("server is running and counect successfully database.!");
        app.listen(PORT, ()=>{
            console.log(`Server is running on http://localhost:${PORT}`);
        })
    } catch (error: any) {
        console.log("an error accures", error);
    }

}

main()
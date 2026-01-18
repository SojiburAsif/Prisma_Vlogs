import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { postRouter } from "./Modules/post/post.routes";
import cors from "cors";
import { CommentRouter } from "./Modules/comment/comment.route";
const app = express();
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(
    cors({
        origin: process.env.APP_URL || "http://localhost:4000",
        credentials: true,
    })
);

app.use(express.json())


app.use("/posts", postRouter)
app.use("/comment", CommentRouter)

app.get("/", (req, res) => {
    res.send("Server running!...")
})

export default app;

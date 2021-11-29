import { NextApiHandler } from "next";

import { Post } from "src/entity/Post";
import { getDatabaseConnection } from "lib/getDatabaseConnection";
import withSession from "lib/withSession";

const Posts: NextApiHandler = withSession(async (req, res) => {
    if (req.method === "POST") {
        const { title, content } = req.body
        const post = new Post()
        post.title = title
        post.content = content
        // @ts-ignore
        const user = req.session.get("currentUser")
        post.author = user.id
        const connection = await getDatabaseConnection()
        await connection.manager.save(post)
        res.json(post)
    }
    // const fileNames = await getPosts()
    // res.statusCode = 200
    // res.setHeader("Content-Type", "application/json")
    // res.write(JSON.stringify(fileNames))
    // res.end()
})

export default Posts;

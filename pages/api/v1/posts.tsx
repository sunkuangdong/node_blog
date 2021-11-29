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
        if (!user) {
            // 403 没权限，登陆也没权限
            // 401 没登录
            res.statusCode = 401
            res.end()
            return
        }
        post.author = user.id
        const connection = await getDatabaseConnection()
        await connection.manager.save(post)
        res.json(post)
    }
})

export default Posts;

import { getDatabaseConnection } from "lib/getDatabaseConnection"
import withSession from "lib/withSession"
import { NextApiHandler } from "next"
import { Post } from "src/entity/Post"

const Posts: NextApiHandler = withSession(async (req, res) => {
    if (req.method === "PATCH") {
        const connection = await getDatabaseConnection();
        const { title, content, id } = req.body;
        const post = await connection.manager.findOne<Post>('Post', id);
        post.title = title;
        post.content = content;
        const user = (req as any).session.get('currentUser');
        if (!user) {
            res.statusCode = 401;
            res.end();
            return;
        }
        await connection.manager.save(post);
        res.json(post);
    } else if (req.method === "DELETE") {
        const connection = await getDatabaseConnection()
        const id = req.query.id.toString()
        const result = await connection.manager.delete("Post", id)
        result.affected >= 0 ? res.statusCode = 200 : res.statusCode = 400
        res.end()
    }
})
export default Posts
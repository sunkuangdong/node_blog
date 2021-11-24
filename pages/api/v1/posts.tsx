import { NextApiHandler } from "next";

import { getPosts } from "lib/posts"

const Posts: NextApiHandler = async (req, res) => {
    const fileNames = await getPosts()
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.write(JSON.stringify(fileNames))
    res.end()
}

export default Posts;

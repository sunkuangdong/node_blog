import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { NextApiHandler } from "next";
import { User } from "src/entity/User";


const Posts: NextApiHandler = async (req, res) => {
    // 获取用户上传的参数 通过req.body
    const { username, password, passwordConfirmation } = req.body;
    const connection = await getDatabaseConnection()
    const user = new User()
    if (password !== passwordConfirmation) {
        const errors = { passwordConfirmation: ["密码不匹配"] }
        res.statusCode = 422
        res.setHeader("Content-Type", "application/json")
        res.write(JSON.stringify(errors))
        res.end()
    }
}

export default Posts;
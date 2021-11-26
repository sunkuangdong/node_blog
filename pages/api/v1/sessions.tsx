import { getDatabaseConnection } from "lib/getDatabaseConnection";
import md5 from "md5";
import { NextApiHandler } from "next";
import { User } from "src/entity/User";

const Sessions: NextApiHandler = async (req, res) => {
    // 获取用户传的参数
    const { username, password } = req.body;
    // 数据库连接
    const connection = await getDatabaseConnection();
    // 利用连接查询是否存在 username
    const isUser = await connection.manager.findOne(User, { where: { username } })
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    if (isUser) {
        const passwordDigest = md5(password) + md5('salt')

        if (isUser.passwordDigest === passwordDigest) {
            res.statusCode = 200
            res.end(JSON.stringify(isUser))
        } else {
            res.statusCode = 422
            res.end(JSON.stringify({ password: ["密码错误"] }))
        }
    } else {
        res.statusCode = 422
        res.end(JSON.stringify({ username: ["用户名不存在"] }))
    }
    res.end();
}

export default Sessions;
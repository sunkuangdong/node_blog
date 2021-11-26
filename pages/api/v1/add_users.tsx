import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { NextApiHandler } from "next";
import { User } from "src/entity/User";


const Users: NextApiHandler = async (req, res) => {
    // 获取用户上传的参数 通过req.body
    const { username, password, passwordConfirmation } = req.body;
    const connection = await getDatabaseConnection()
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    const user = new User()
    user.username = username.trim()
    user.password = password
    user.passwordConfirmation = passwordConfirmation
    await user.validate()
    if (await user.hasError()) {
        res.statusCode = 422
        res.write(JSON.stringify(user.errors))
    } else {
        // 将数据保存下来
        await connection.manager.save(user)
        // 保存到数据库之后将数据返回给前端
        res.statusCode = 200
        res.write(JSON.stringify(user))
    }
    res.end()
}

export default Users;
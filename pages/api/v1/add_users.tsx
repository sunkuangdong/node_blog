import { getDatabaseConnection } from "lib/getDatabaseConnection";
import md5 from "md5";
import { NextApiHandler } from "next";
import { User } from "src/entity/User";


const Posts: NextApiHandler = async (req, res) => {
    // 获取用户上传的参数 通过req.body
    const { username, password, passwordConfirmation } = req.body;
    let errors = {
        username: [],
        password: [],
        passwordConfirmation: [],
    }
    // 用户名错误不匹配
    if (username.trim() === '') {
        errors.username.push("用户名为空")
    }
    if (!/[a-zA-Z0-9]/.test(username.trim())) {
        errors.username.push("格式不合法")
    }
    if (username.trim().length > 8) {
        errors.username.push("长度不得超出8位")
    }
    if (username.trim().length <= 3) {
        errors.username.push("长度不得小于3位")
    }

    // 密码不匹配的错误处理
    if (password.trim().length === "") {
        errors.password.push("请输入密码")
    }
    if (password !== passwordConfirmation) {
        errors.passwordConfirmation.push("密码不匹配")
    }
    const fount = Object.values(errors).find(item => item.length > 0)
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    if (fount) {
        res.statusCode = 422
        res.write(JSON.stringify(errors))
    } else {
        const connection = await getDatabaseConnection()
        const user = new User()
        user.username = username.trim()
        user.passwordDigest = md5(password)
        try {
            // 将数据保存下来
            await connection.manager.save(user)
        } catch (err) {
            console.log(err)
        }
        // 保存到数据库之后将数据返回给前端
        res.statusCode = 200
        res.write(JSON.stringify(user))
    }
    res.end()
}

export default Posts;
import { getDatabaseConnection } from "lib/getDatabaseConnection";
import md5 from "md5";
import { User } from "src/entity/User";

export class SignIn {
    username: string
    password: string
    user: User
    errors = {
        username: [],
        password: [],
    }

    async validate() {
        if (this.username.trim() === "") {
            this.errors.username.push("用户名为空");
        }
        if (this.password.trim() === "") {
            this.errors.password.push("密码为空");
        }
        // 数据库连接
        const connection = await getDatabaseConnection();
        // 利用连接查询是否存在 username
        this.user = await connection.manager.findOne(User, { where: { username: this.username } })
        if (this.user) {
            const passwordDigest = md5(this.password) + md5('salt')
            if (this.user.passwordDigest !== passwordDigest) {
                this.errors.password.push("密码错误")
            }
        } else {
            this.errors.username.push("用户名不存在")
        }
    }

    hasError() {
        return !!Object.values(this.errors).find(item => item.length > 0)
    }
}
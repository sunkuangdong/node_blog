import { NextApiHandler } from "next";
import { withIronSession } from "next-iron-session"

export default function WithSession(handler: NextApiHandler) {
    return withIronSession(handler, {
        // 密码还得优化
        password: "bd569350-9d78-4ee1-bc62-4f4079093069",
        cookieName: "blog",
        // 控制https，取消
        cookieOptions: { secure: false },
    })
}
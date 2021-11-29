import { GetServerSideProps, NextApiHandler } from "next";
import { withIronSession } from "next-iron-session"

export default function WithSession(handler: NextApiHandler | GetServerSideProps) {
    return withIronSession(handler, {
        // 密码还得优化
        password: process.env.SECRET,
        cookieName: "blog",
        // 控制https，取消
        cookieOptions: { secure: false },
    })
}
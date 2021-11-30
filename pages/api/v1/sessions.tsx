import WithSession from "lib/withSession";
import { NextApiHandler } from "next";
import { SignIn } from "src/model/SignIn";

const Sessions: NextApiHandler = async (req, res) => {
    // 获取用户传的参数
    const { username, password } = req.body;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const signIn = new SignIn()
    signIn.username = username
    signIn.password = password
    await signIn.validate()
    if (!signIn.hasError()) {
        //@ts-ignore
        req.session.set("currentUser", signIn.user)
        //@ts-ignore
        await req.session.save()
        res.statusCode = 200
        res.write(JSON.stringify(signIn.user))
    } else {
        res.statusCode = 422
        res.write(JSON.stringify(signIn.errors))
    }
    res.end();
}

export default WithSession(Sessions);
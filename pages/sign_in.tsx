import axios from "axios";
import useForm from "hooks/useForm";
import WithSession from "lib/withSession";
import { GetServerSideProps, NextPage } from "next";
import { User } from "src/entity/User";
const qs = require("querystring")

const SignIn: NextPage<{ user: User }> = (props) => {
    const { form } = useForm({
        initFormData: { username: "", password: "" },
        fields: [
            { label: "用户名", type: "text", key: "username" },
            { label: "密码", type: "password", key: "password" }
        ],
        buttons: <div> <button>登陆</button> </div>,
        submit: {
            request: async formData => await axios.post("/api/v1/sessions", formData),
            success: () => {
                window.alert("登陆成功")
                const query = qs.parse(window.location.search.substring(1))
                window.location.href = query.return_to && query.return_to.toString() || '/posts'
            }
        },
    })

    return (
        <div>
            {props.user && <div>当前登陆用户为：{props.user.username}</div>}
            <h1>登陆页面</h1>
            {form}
        </div>
    )
}

export default SignIn;

// 通过 ssr 方式传递 props
// 传递我们的 session
export const getServerSideProps: GetServerSideProps = WithSession(async (context) => {
    const user = context.req.session.get('currentUser');
    return {
        props: {
            user: JSON.parse(JSON.stringify(user || ""))
        }
    }
})
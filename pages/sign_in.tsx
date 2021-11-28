import axios, { AxiosResponse } from "axios";
import useForm from "hooks/useForm";
import WithSession from "lib/withSession";
import { GetServerSideProps, NextPage } from "next";
import { User } from "src/entity/User";

const SignIn: NextPage<{ user: User }> = (props) => {
    const initFormData = {
        username: "",
        password: ""
    }
    const buttons = <div> <button>提交</button> </div>
    const onSubmit = (formData: typeof initFormData) => {
        axios.post("/api/v1/sessions", formData)
            .then((res) => {
                window.alert("登陆成功")
                window.location.href = "/posts/new"
            }, (err) => {
                if (err.response) {
                    const response: AxiosResponse = err.response
                    setErrors(response.data)
                }
            })
    }
    const { form, setErrors } = useForm({
        initFormData,
        fields: [
            { label: "用户名", type: "text", key: "username" },
            { label: "密码", type: "password", key: "password" }
        ],
        buttons, onSubmit
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
            user: user ? JSON.parse(JSON.stringify(user)) : null
        }
    }
})
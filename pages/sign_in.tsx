import axios, { AxiosResponse } from "axios";
import Form from "components/Form";
import WithSession from "lib/withSession";
import { GetServerSideProps, NextPage } from "next";
import { useCallback, useState } from "react";
import { User } from "src/entity/User";

const SignIn: NextPage<{ user: User }> = (props) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })

    const [errors, setErrors] = useState({
        username: [],
        password: [],
    })
    const onSubmit = useCallback((e) => {
        e.preventDefault();

        axios.post("/api/v1/sessions", formData)
            .then((res) => {
                setErrors({
                    username: [],
                    password: [],
                })
                window.alert("登陆成功")
                // window.location.href = "/sessions"
            }, (err) => {
                if (err.response) {
                    const response: AxiosResponse = err.response
                    setErrors(response.data)
                }
            })
    }, [formData])

    const onChange = useCallback((key, value) => {
        setFormData({
            ...formData,
            [key]: value,
        })
    }, [formData])
    return (
        <>
            {props.user && <div>当前登陆用户为：{props.user.username}</div>}
            <h1>登陆页面</h1>
            <Form fields={[
                {
                    label: "用户名",
                    type: "text",
                    value: formData.username,
                    onChange: e => onChange("username", e.target.value),
                    errors: errors.username
                },
                {
                    label: "密码",
                    type: "password",
                    value: formData.password,
                    onChange: e => onChange("password", e.target.value),
                    errors: errors.password
                }
            ]} onSubmit={onSubmit} buttons={<div><button>登陆</button></div>}>
                
            </Form>
        </>
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
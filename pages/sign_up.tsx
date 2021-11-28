import axios from "axios";
import Form from "components/Form";
import { NextPage } from "next";
import { useCallback, useState } from "react";

// 注册页面
const SignUp: NextPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConfirmation: ''
    })
    const [errors, setErrors] = useState({
        username: [],
        password: [],
        passwordConfirmation: []
    })
    // 提交表单事件
    // 使用 useCallback 会有一个缓存的优化
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        axios.post('/api/v1/add_users', formData)
            .then(res => {
                window.alert("注册成功")
                window.location.href = '/sign_in';
                setErrors({
                    username: [],
                    password: [],
                    passwordConfirmation: []
                })
            }, (err) => {
                if (err.response && err.response.status === 422) {
                    setErrors({
                        ...errors,
                        ...err.response.data
                    })
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
            <h1>注册</h1>
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
                },
                {
                    label: "确认密码",
                    type: "password",
                    value: formData.passwordConfirmation,
                    onChange: e => onChange("passwordConfirmation", e.target.value),
                    errors: errors.passwordConfirmation
                },
            ]} onSubmit={onSubmit} buttons={
                <div>
                    <button>注册</button>
                </div>
            }>
            </Form>
        </>
    )
}

export default SignUp
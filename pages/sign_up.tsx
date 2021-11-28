import axios from "axios";
import Form from "components/Form";
import useForm from "hooks/useForm";
import { NextPage } from "next";
import { useCallback, useState } from "react";

// 注册页面
const SignUp: NextPage = () => {
    const initFormData = { username: '', password: '', passwordConfirmation: '' }
    const buttons = <div> <button>提交</button> </div>
    const onSubmit = (formData: typeof initFormData) => {
        axios.post('/api/v1/add_users', formData)
            .then(() => {
                window.alert("注册成功")
                window.location.href = '/sign_in';
            }, (err) => {
                if (err.response && err.response.status === 422) {
                    setErrors({
                        ...err,
                        ...err.response.data
                    })
                }
            })
    }
    const { form, setErrors } = useForm({
        initFormData,
        fields: [
            { label: "用户名", type: "text", key: "username" },
            { label: "密码", type: "password", key: "password" },
            { label: "确认密码", type: "password", key: "passwordConfirmation" },
        ],
        buttons, onSubmit
    })

    return (
        <div>
            <h1>注册</h1>
            {form}
        </div>
    )
}

export default SignUp
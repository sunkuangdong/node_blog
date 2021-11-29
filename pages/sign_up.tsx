import axios from "axios";
import useForm from "hooks/useForm";
import { NextPage } from "next";

// 注册页面
const SignUp: NextPage = () => {
    const { form } = useForm({
        initFormData: { username: '', password: '', passwordConfirmation: '' },
        fields: [
            { label: "用户名", type: "text", key: "username" },
            { label: "密码", type: "password", key: "password" },
            { label: "确认密码", type: "password", key: "passwordConfirmation" },
        ],
        buttons: <div> <button>注册</button> </div>,
        submit: {
            request: formData => axios.post('/api/v1/add_users', formData),
            success: () => window.alert("注册成功")
        }
    })

    return (
        <div>
            <h1>注册</h1>
            {form}
        </div>
    )
}

export default SignUp
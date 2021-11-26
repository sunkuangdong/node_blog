import axios, { AxiosResponse } from "axios";
import { NextPage } from "next";
import { useCallback, useState } from "react";

const SignIn: NextPage = () => {
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
                window.alert("登陆成功")
                // window.location.href = "/sessions"
            }, (err) => {
                if (err.response) {
                    const response: AxiosResponse = err.response
                    setErrors({
                        ...response.data
                    })
                }
            })
    }, [formData])
    return (
        <>
            <h1>登陆页面</h1>
            <form onSubmit={e => onSubmit(e)}>
                <div>
                    <label>
                        用户名：<input type="text" value={formData.username}
                            onChange={e => setFormData({
                                ...formData,
                                username: e.target.value,
                            })} />
                    </label>
                    {errors.username?.length > 0 ? <div>{errors.username.join(",")}</div> : null}
                </div>
                <div>
                    <label>
                        密码：<input type="password" value={formData.password}
                            onChange={e => setFormData({
                                ...formData,
                                password: e.target.value
                            })} />
                    </label>
                    {errors.password?.length > 0 ? <div>{errors.password.join(",")}</div> : null}
                </div>
                <button>登陆</button>
            </form>
        </>
    )
}

export default SignIn;
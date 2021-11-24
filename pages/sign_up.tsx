import axios from "axios";
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
                console.log('====================================');
                console.log(res);
                console.log('====================================');
                // setErrors({
                //     ...errors,
                //     ...res.response.data
                // })
            }, (err) => {
                if (err.response && err.response.status === 422) {
                    setErrors({
                        ...errors,
                        ...err.response.data
                    })
                }
            })
    }, [formData])
    return (
        <>
            <h1>注册</h1>
            <form onSubmit={e => onSubmit(e)}>
                <div>
                    <label>
                        用户名：<input type="text" value={formData.username}
                            onChange={e => setFormData({
                                ...formData,
                                username: e.target.value,
                            })} />
                    </label>
                    {errors.username?.length > 0 && <div> {errors.username.join(",")} </div>}
                </div>
                <div>
                    <label>
                        密码：<input type="password" value={formData.password}
                            onChange={e => setFormData({
                                ...formData,
                                password: e.target.value
                            })} />
                    </label>
                    {errors.password?.length > 0 && <div> {errors.password.join(",")} </div>}
                </div>
                <div>
                    <label>
                        确认密码：<input type="password" value={formData.passwordConfirmation}
                            onChange={e => setFormData({
                                ...formData,
                                passwordConfirmation: e.target.value
                            })} />
                    </label>
                    {errors.passwordConfirmation?.length > 0 && <div> {errors.passwordConfirmation.join(",")} </div>}
                </div>
                <div>
                    <button>提交</button>
                </div>
            </form>
        </>
    )
}

export default SignUp
import { AxiosResponse } from "axios";
import React, { ReactChild, useCallback, useState } from "react";

type Field<T> = {
    label: string;
    type: 'text' | 'password' | 'textarea';
    key: keyof T;
}

type useFormOptions<T> = {
    initFormData: T;
    fields: Field<T>[];
    buttons: ReactChild;
    submit: {
        request: (fromData: T) => Promise<AxiosResponse<T>>
        success: () => void
    };
    routers?: string
}

function useForm<T>(options: useFormOptions<T>) {
    const { initFormData, submit, fields, buttons, routers = null } = options;
    // 初始化
    const [formData, setFormData] = useState(initFormData)
    // e 是和传递进来的 initFormData 有关系的
    // e 的初始值就是 initFormData 里每一项的数组
    const [errors, setErrors] = useState(() => {
        const e: { [key in keyof T]?: string[] } = {}
        for (let key in initFormData) {
            if (initFormData.hasOwnProperty(key)) {
                e[key] = []
            }
        }
        return e
    })
    // 封装 onChange
    const onChange = useCallback((key: keyof T, value: any) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }, [formData])
    // 处理一下 onSubmit
    const _onSubmit = useCallback((e) => {
        e.preventDefault()
        submit.request(formData).then(() => {
            submit.success()
            routers ? window.location.href = routers : ""
        }, (err) => {
            if (err.response) {
                const response: AxiosResponse = err.response
                if (response.status === 422) {
                    setErrors(response.data)
                } else if (response.status === 401) {
                    window.alert("请先登陆")
                    window.location.href = `/sign_in?return_to=${encodeURIComponent(window.location.pathname)}`
                }
            }
        })
    }, [formData, submit]);
    const form = (
        <form onSubmit={_onSubmit}>
            {fields.map((field) =>
                <div key={field.key.toString()}>
                    <label>{field.label}</label>
                    {field.type === 'textarea' ?
                        <textarea value={formData[field.key].toString()}
                            onChange={e => onChange(field.key, e.target.value)} /> :
                        <input type={field.type}
                            value={formData[field.key].toString()}
                            onChange={e => onChange(field.key, e.target.value)} />}
                    {errors[field.key]?.length > 0 && <div>{errors[field.key].join(', ')}</div>}
                </div>
            )}
            {buttons}
        </form>
    )
    return {
        form, setErrors
    }
};

export default useForm
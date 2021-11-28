import { type } from "os";
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
    onSubmit: (fd: T) => void
}

function useForm<T>(options: useFormOptions<T>) {
    const { initFormData, onSubmit, fields, buttons } = options;
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
        onSubmit(formData)
    }, [formData, onSubmit])
    const form = (
        <form action="" onSubmit={_onSubmit}>
            {fields.map((field, index) =>
                <div key={index}>
                    <label>{field.label}</label>
                    {field.type === 'textarea' ?
                        <textarea value={formData[field.key].toString()}
                            onChange={e => onChange(field.key, e.target.value)}>
                            {formData[field.key]}
                        </textarea> :
                        <input type={field.type} value={formData[field.key].toString()} onChange={e => onChange(field.key, e.target.value)} />}
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
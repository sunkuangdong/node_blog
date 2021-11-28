import axios from "axios";
import Form from "components/Form";
import { NextPage } from "next";
import { useCallback, useState } from "react";

const PostsNew: NextPage = () => {
    const [formData, setFormData] = useState({
        title: "", // 标题
        content: "", // 文章
    })
    const [errors, setErrors] = useState({
        title: [],
        content: []
    })
    const onChange = useCallback((key, value) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }, [formData])
    // 提交表单事件
    // 使用 useCallback 会有一个缓存的优化
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        console.log("onSubmit");
        axios.post('/api/v1/posts', formData)
            .then((res) => {
                window.alert('提交成功')
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
        <div>
            <Form fields={[
                {
                    label: "标题", type: "text", value: formData.title,
                    onChange: e => onChange("title", e.target.value),
                    errors: errors.title
                },
                {
                    label: "内容", type: "textarea", value: formData.content,
                    onChange: e => onChange("content", e.target.value),
                    errors: errors.content
                },
            ]} onSubmit={onSubmit} buttons={
                <div>
                    <button>提交</button>
                </div>
            }></Form>
        </div>
    )
}

export default PostsNew
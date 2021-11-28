import axios from "axios";
import useForm from "hooks/useForm";
import { NextPage } from "next";

const PostsNew: NextPage = () => {
    const initFormData = { title: '', content: '' }
    const buttons = <div> <button>提交</button> </div>
    const onSubmit = (formData: typeof initFormData) => {
        axios.post('/api/v1/posts', formData)
            .then((res) => {
                window.alert('提交成功')
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
            { label: "标题", type: "text", key: "title" },
            { label: "内容", type: "textarea", key: "content" }
        ],
        buttons, onSubmit
    })

    return (
        <div>
            {form}
        </div>
    )
}

export default PostsNew
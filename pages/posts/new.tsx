import axios from "axios";
import useForm from "hooks/useForm";
import WithSession from "lib/withSession";
import { GetServerSideProps, NextPage } from "next";
import { User } from "src/entity/User";

const PostsNew: NextPage<{ user: User }> = (props) => {
    const { form } = useForm({
        initFormData: { title: '', content: '' },
        fields: [
            { label: "标题", type: "text", key: "title" },
            { label: "内容", type: "textarea", key: "content" }
        ],
        buttons: <div> <button>提交</button> </div>,
        submit: {
            request: async formData => await axios.post('/api/v1/posts', formData),
            success: () => {
                window.alert("提交成功")
                window.location.href = '/posts'
            }
        }
    })

    return (
        <>
            <div className="postsNew">
                <h1>新增文章</h1>
                <div className="form-wrapper">{form}</div>
            </div>
            <style jsx global>{`
                .form-wrapper {
                    padding: 16px;
                }
                .postsNew .field-content textarea {
                    height: 20em; 
                    resize: none;
                }
                .postsNew .label-text {
                    width: 4em;
                    text-align:right;
                }
                .postsNew .actions {
                    text-align:center;
                    background: #ddd;
                    padding: 4px 0;
                }
            `}</style>
        </>
    )
}

export default PostsNew

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
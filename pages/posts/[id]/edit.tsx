import axios from "axios";
import useForm from "hooks/useForm";
import { getDatabaseConnection } from "lib/getDatabaseConnection";
import withSession from "lib/withSession";
import { GetServerSideProps, NextPage } from "next";
import { Post } from "src/entity/Post";

type Props = {
    id: number;
    post: Post;
}

const PostsEdit: NextPage<Props> = (props) => {
    const { post, id } = props;
    const { form } = useForm({
        initFormData: { title: post.title, content: post.content },
        fields: [
            { label: "标题", type: "text", key: "title" },
            { label: "内容", type: "textarea", key: "content" }
        ],
        buttons: <div className="actions"> <button>提交</button> </div>,
        submit: {
            request: async formData => await axios.patch(`/api/v1/posts/${id}`, formData),
            success: () => {
                window.alert("提交成功")
                window.location.href = '/posts'
            }
        }
    })

    return (
        <>
            <div className="postsNew">
                <h1>编辑文章</h1>
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
                    padding: 4px 0;
                }
            `}</style>
        </>
    )
}

export default PostsEdit;
export const getServerSideProps: GetServerSideProps<any, { id: string }> = withSession(async (context) => {
    const { id } = context.params
    const connection = await getDatabaseConnection()
    const post = await connection.manager.findOne("Post", id)
    return {
        props: {
            id: parseInt(id.toString()),
            post: JSON.parse(JSON.stringify(post))
        }
    }
})
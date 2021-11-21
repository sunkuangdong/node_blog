import { getDatabaseConnection } from 'lib/getDatabaseConnection';
// import { getPost, getPostIds } from 'lib/posts';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { Post } from 'src/entity/Post';
// import UAParser from 'ua-parser-js';


type Posts = {
    id: string;
    title: string;
    content: string;
    htmlContent: string;
}
type Props = {
    post: Posts
}
const postsShow: NextPage<Props> = (props) => {
    const { post } = props;
    return (
        <>
            <h1>{post.title}</h1>
            <article dangerouslySetInnerHTML={{ __html: post.content }}>
            </article>
        </>
    )
}

export default postsShow;
// SSR 方式
export const getServerSideProps: GetServerSideProps<any, { id: string }> = async (context) => {
    // 初次进入页面链接数据库
    const connection = await getDatabaseConnection()
    const post = await connection.manager.findOne(Post, context.params.id)
    return {
        props: {
            post: JSON.parse(JSON.stringify(post))
        }
    }
}


// // 不再使用静态的
// export const getStaticPaths = async () => {
//     // 需要拿到所有的id
//     const idList = await getPostIds()
//     return {
//         paths: idList.map(id => ({ params: { id } })),
//         fallback: false
//     }
// }

// export const getStaticProps = async (x: { params: { id: any; }; }) => {
//     const { id } = x.params
//     const post = await getPost(id);
//     return {
//         props: {
//             post
//         }
//     }
// }
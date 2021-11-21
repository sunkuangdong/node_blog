import { getPost, getPostIds } from 'lib/posts';
import { NextPage } from 'next';
import React from 'react';


type Post = {
    id: string;
    title: string;
    content: string;
    htmlContent: string;
}
type Props = {
    post: Post
}
const postsShow: NextPage<Props> = (props) => {
    const { post } = props;
    return (
        <>
            <h1>{post.title}</h1>
            <article dangerouslySetInnerHTML={{ __html: post.htmlContent }}>
            </article>
        </>
    )
}

export default postsShow;

export const getStaticPaths = async () => {
    // 需要拿到所有的id
    const idList = await getPostIds()
    return {
        paths: idList.map(id => ({ params: { id } })),
        fallback: false
    }
}

export const getStaticProps = async (x: { params: { id: any; }; }) => {
    const { id } = x.params
    const post = await getPost(id);
    return {
        props: {
            post
        }
    }
}
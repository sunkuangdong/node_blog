import { NextPage } from "next";
import React from "react";
import { getPosts } from "lib/posts";
import Link from "next/link";
type Posts = {
  id: string;
}
type Props = {
  posts: Posts[]
}

const PostsIndex: NextPage<Props> = (props) => {
  const { posts } = props
  // 控制台可以打印出 posts
  // 本来是后端的 为什么前端也可以拿到？
  // 同构
  // 前端拿到的方式是通过script标签，对里面内容进行反序列化
  // console.log(posts);
  return (
    <div>
      <h1>服务端渲染</h1>
      {posts.map(item => <div key={item.id}>
        <Link href={`/posts/${item.id}`}>
          <a>{item.id}</a>
        </Link>
      </div>)}
    </div>
  )
}
// 只要请求了 http://localhost:3000/posts 就运行了 PostsIndex 函数
export default PostsIndex;

// 在生产环境中，他只会运行一次
// 在构建的时候会利用return值进行预渲染
export const getStaticProps = async () => {
  const posts = await getPosts()
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    }
  }
}
import { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
    return (
        <>
            <div className="cover">
                <img src="/logo.png" alt="" className="cover-img" />
                <h1>ALAN 博客</h1>
                <p>你一定是一位很爱学习的人</p>
                <p><Link href="/posts"><a className="cover-list">文章列表</a></Link></p>
            </div>
            <style jsx>{`
            .cover{
                height: 100vh;
                display:flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
            }
            .cover > img{
                width: 350px; 
                height: 350px;
            }
            .cover-list {
                columns: revert;
                color: steelblue;
            }
            `}</style>
        </>
    )
}

export default Home;
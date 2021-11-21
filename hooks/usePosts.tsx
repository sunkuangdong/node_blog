import { useEffect, useState } from "react"
import axios from "axios"



type Posts = {
    id: string;
}
export const usePosts = () => {
    // 初始化数据
    const [posts, setPosts] = useState<Posts[]>([])
    const [isLoading, setIsLoading] = useState(false)
    // [] 意思是第一次渲染运行，以后不运行
    useEffect(() => {
        setIsLoading(true)
        axios.get('/api/v1/posts').then(res => {
            setPosts(res.data)
            setIsLoading(false)
        }, () => {
            setIsLoading(false)
        })
    }, [])
    return { isLoading, posts, setPosts, setIsLoading }
}
import fs, { promises as fsPromise } from "fs";
import path from "path";
import matter from 'gray-matter';
import { marked } from "marked";
// process.cwd 子进程的当前工作目录。
// path.join() 方法使用特定于平台的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径。
const markdownDir = path.join(process.cwd(), "markdown")
// 读取文件的假接口
export const getPosts = async () => {
    // fs.readdirSync 读取目录的内容。
    const fileNames = await fs.readdirSync(markdownDir)
    const posts = fileNames.map(fileName => {
        const fullPath = path.join(markdownDir, fileName)
        const id = fileName.replace(/\.md$/g, "")
        // fs.readFileSync 返回 path 的内容。
        const text = fs.readFileSync(fullPath, "utf-8")
        const { data: { title, date }, content } = matter(text)
        return {
            id, title, date, content
        }
    })
    return posts
}

export const getPost = async (id: string) => {
    const fullPath = path.join(markdownDir, id + ".md")
    const text = fs.readFileSync(fullPath, "utf-8")
    const { data: { title, date }, content } = matter(text)
    const htmlContent = marked(content)

    return JSON.parse(JSON.stringify({
        id, title, date, htmlContent
    }))
}

export const getPostIds = async () => {
    const fileNames = await fs.readdirSync(markdownDir)
    return fileNames.map(item => item.replace(/\.md$/g, ""))
}
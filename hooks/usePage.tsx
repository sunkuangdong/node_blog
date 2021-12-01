import Link from "next/link";
import React from "react";
import _ from "lodash";

type Options = {
    count: number;
    perPage: number;
    page: number;
    totalPage: number;
    urlMaker?: (n: number) => string;
}

const defaultUrlMaker = (n: number) => `?page=${n}`

const usePage = (options: Options) => {
    const { count, page, totalPage, urlMaker: _urlMaker } = options
    // 用户如果传递urlMaker就用用户的，不传就用默认的
    const urlMaker = _urlMaker || defaultUrlMaker

    // 准备一个数组进行遍历
    const numbers = []
    numbers.push(1)
    for (let i = page - 3; i < page + 3; i++) {
        numbers.push(i)
    }
    numbers.push(totalPage)

    // 去重 排序
    const pageNumber = _.uniq(numbers).sort((a, b) => a - b).filter(item => item >= 1 && item <= totalPage)
        .reduce((result, num) => num - (result[result.length - 1] || 0) === 1 ?
            result.concat(num) : result.concat(-1, num)
            , [])

    const pager = totalPage > 1 ? (
        <div className="wrapper">
            <Link href={urlMaker(page - 1)}>
                <button disabled={page <= 1}>上一页</button>
            </Link>
            <span>共{count}篇文章</span>
            {pageNumber.map((item, index) => item === -1 ?
                <span key={index}>...</span> :
                // 每次点击其他页面都会触发 usePage 组件的重新渲染
                // 这样就会让 pageNumber 重新计算出来
                <Link href={urlMaker(item)} key={index}>
                    <a>{item}</a>
                </Link>
            )}
            {/* <span>每页{perPage}篇文章</span> */}
            <span>第{page} / {totalPage} 页</span>
            <Link href={urlMaker(page + 1)}>
                <button disabled={page >= totalPage}>下一页</button>
            </Link>

            <style jsx>
                {`
                    .wrapper{
                        margin: 0 -8px;
                        padding: 8px 0;
                    }
                    .wrapper>a, .wrapper>span{
                        margin: 0 8px;
                    }
                `}
            </style>
        </div>
    ) : null
    return pager
}

export default usePage
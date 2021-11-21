import React from 'react'
import Link from 'next/link'

export default function FirstPost() {
    return (
        <>
            <div>
                First Post
                <hr />
                <Link href="/"><a >回到首页</a></Link>
            </div>
        </>
    )
}
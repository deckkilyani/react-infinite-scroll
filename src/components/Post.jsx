import React from "react";



const Post = React.forwardRef(({post}, ref) => {


    const postBody =(
        <>
        <h2 className="text-center text-lg font-semibold capitalize text-gray-700">{post.title}</h2>
        <p>{post.body}</p>
        <p>Post ID: {post.id}</p>
        </>
    );

    const content = ref ? <article ref={ref} className="bg-orange-500 my-2 py-2 px-4 mx-4 rounded-lg text-white">{postBody}</article > : <article className="bg-orange-500 my-2 py-2 px-4 mx-4 rounded-lg text-white">{postBody}</article>




  return content;
})

export default Post
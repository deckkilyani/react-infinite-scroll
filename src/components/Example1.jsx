import { useRef, useState, useCallback } from "react";
import usePosts from "../hooks/usePosts";
import Post from "./Post";

const Example1 = () => {

  const [pageNum, setPageNum] = useState(1);
  const intObserver = useRef(); 
  const {
    isLoading,
    isError,
    error,
    results,
    hasNextPage
  }=usePosts(pageNum);
  const lastPostRef = useCallback(post=>{
    if(isLoading) return;

    if(intObserver.current) intObserver.current.disconnect();

    intObserver.current = new IntersectionObserver(posts => {
      if(posts[0].isIntersecting && hasNextPage){
        console.log('We are near the last post!');
        setPageNum(pageNum => pageNum + 1);
      }
    });
   
    if(post) intObserver.current.observe(post)
    
  },[isLoading, hasNextPage]);

  if(isError) return <div className="mx-auto flex justify-center min-h-screen mt-20">
    <p>Error: {error.message}</p>
  </div>

  const content = results.map((post, i)=>{
    if(results.length=== i+1){
      return <Post ref={lastPostRef} key={post.id} post={post}/>
    }
    return <Post key={post.id} post={post}/>
  })

  return (
    <div className="mx-auto flex-col flex justify-center min-h-screen mt-4">
      <h1 id="top" className="font-bold text-xl text-center mt-8">&infin; Infinite Query &amp; Scroll &infin; <br /> Ex. 1 -React Only</h1>
      <div className="">
        {content}
      </div>
      {isLoading ? <p>Loading more posts...</p>: <p></p>}
        <p className="text-center mb-8"><a href="#top">Back to Top</a></p>
    </div>
  )
}

export default Example1
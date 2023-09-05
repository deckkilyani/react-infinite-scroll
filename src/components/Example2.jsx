import { useRef, useCallback } from "react";
import Post from "./Post";
import { useInfiniteQuery } from "react-query";
import { getPostsPage } from "../api/axios";



const Example2 = () => {


  const intObserver = useRef(); 

  const {
    fetchNextPage, //function
    hasNextPage, //boolean
    isFetchingNextPage, // boolean
    status,
    data,
    error,
  } = useInfiniteQuery('/posts', ({pageParam =1})=>getPostsPage(pageParam), {
    getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1: undefined
    },
  })


  const lastPostRef = useCallback(post=>{
    if(isFetchingNextPage) return;

    if(intObserver.current) intObserver.current.disconnect();

    intObserver.current = new IntersectionObserver(posts => {
      if(posts[0].isIntersecting && hasNextPage){
        console.log('We are near the last post!');
       fetchNextPage();
      }
    });
   
    if(post) intObserver.current.observe(post)
    
  },[isFetchingNextPage, fetchNextPage, hasNextPage]);

  if(status === 'error') return <div className="mx-auto flex justify-center min-h-screen mt-20">
    <p>Error: {error.message}</p>
  </div>

  const content = data?.pages?.map(pg=>{
    return   pg.map((post, i)=>{
        if(pg.length=== i+1){
          return <Post ref={lastPostRef} key={post.id} post={post}/>
        }
        return <Post key={post.id} post={post}/>
      })
  })
  
  


  return (
    <div className="mx-auto flex-col flex justify-center min-h-screen mt-4">
      <h1 id="top" className="font-bold text-xl text-center mt-8">&infin; Infinite Query &amp; Scroll &infin; <br /> Ex. 2 -React Query</h1>
      <div className="">
        {content}
      </div>
      {isFetchingNextPage ? <p>Loading more posts...</p>: <p></p>}
        <p className="text-center mb-8"><a href="#top">Back to Top</a></p>
    </div>
  )
}

export default Example2
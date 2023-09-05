import { useEffect, useState } from "react";
import { getPostsPage } from "../api/axios";

const usePosts = (pageNum = 1) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasNextPage, setHasNextpage] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});
    const controller = new AbortController();
    const signal = controller.signal;
    getPostsPage(pageNum,{signal}).then(data=>{
        setResults(prev => [...prev, ...data]);
        setHasNextpage(Boolean(data.length));
        setIsLoading(false);
    }).catch(e=>{
        setIsLoading(false);
        if(signal.aborted) return;
        setIsError(true);
        setError({message: e.message});
    })

    return ()=>controller.abort();
  },[pageNum])

console.log(results);

  return { isLoading, isError, error, results, hasNextPage };
};

export default usePosts;

import React, { useState, useEffect } from "react";
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPeding, setIsPeding] = useState(true);
  const [error, setErro] = useState(null);
  useEffect(() => {
    const abrotcont = new AbortController();
    setTimeout(() => {
      fetch(url, { signal: abrotcont.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("cant fetch from data");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsPeding(false);
        })
        .catch((error) => {
          if (error.name === `AbortError`) {
            console.log("fetch abort");
          } else {
            setIsPeding(false);
            setErro(error.message);
            setErro(null);
          }
        });
    }, 1000);
    return () => abrotcont.abort();
  }, [url]);
  return { data, isPeding, error };
};
export default useFetch;

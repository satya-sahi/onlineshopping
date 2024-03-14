import { useState, useEffect, useRef } from "react";

export default function useFetchAll(urls) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevUrls = useRef([]);

  useEffect(() => {
    if(areEqual(prevUrls.current,urls)) return;
    prevUrls.current = urls;
    const promises = urls.map((url) =>
      fetch('http://localhost:3000/items/' + url).then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
    );

    Promise.all(promises)
      .then((json) => setData(json))
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  return { data, loading, error };
}

function areEqual(array1, array2){
  return (
    array1.length === array2.length &&
    array1.every((value,index)=>value===array2[index])
  );
}
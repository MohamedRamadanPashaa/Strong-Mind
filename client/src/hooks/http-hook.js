import { useCallback, useEffect, useRef, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // معموله علشان لما ادخل على الفورم واملى البيانات وبدون ما اعمل لوج ان او ساين اب وارجع وادخل تاني هيطلع ايرور وهنا انا عاوز احل المشكلة دي
  const activeHttpRequest = useRef([]); // Abort #1

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);

      // Abort #2
      const httpAbortCtrl = new AbortController();
      activeHttpRequest.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal, // Abort #3
        });

        const responseData = await response.json();

        // Abort #4
        // clear reqHttp after getting response
        activeHttpRequest.current = activeHttpRequest.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
        throw error;
      }
    },
    []
  );

  const clearError = () => setError(null);

  // Abort #5
  useEffect(() => {
    // Clean up function
    return () => {
      activeHttpRequest.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};

export default useHttp;

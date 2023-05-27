import axios from "axios";
import { useState } from "react";

export function usePostReq(url) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  

  async function execute(payload) {
    setLoading(true);
    return await axios
      .post(process.env.REACT_APP_HOST_NAME + url, payload)
      .then((res) => res.data)
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  return { execute, error, loading, setError };
}

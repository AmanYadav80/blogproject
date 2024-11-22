import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../constants";

export const useBlogs = () => {
    const [data, setData] = useState("");
    const [error, setError] = useState("");
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            setError("No token found");
            return;
        }

        const fetchBlogs = async () => {
            try {
                const resp = await fetch(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: token,
                    },
                });

                if (!resp.ok) {
                    throw new Error(`HTTP error! Status: ${resp.status}`);
                }

                const json = await resp.json();
                setData(json.posts);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchBlogs();
    }, [token]); 

    return { data, error };
};

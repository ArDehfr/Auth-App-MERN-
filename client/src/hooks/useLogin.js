import { useState } from "react";
import { message } from "antd";
import { useAuth } from "../contexts/AuthContext.jsx";

const useLogin = () => {
    const {login} = useAuth();
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const loginUser = async (values) => {
        try {
            setError(null)
            setLoading(true)
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            console.log("Server response: ", data);
            if (res.status===200) {
                message.success(data.message);
                login(data.token, data.user)
            } else if (res.status === 404) {
                setError(data.message)
            } else {
                message.error('Registration Failed')
            }
        } catch (error) {
            message.error(error)
        } finally {
            setLoading(false)
        }
    }

  return {loading, error, loginUser};
}

export default useLogin
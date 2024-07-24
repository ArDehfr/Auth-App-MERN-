import { useState } from 'react';

const useAddUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addUser = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`Failed to add user: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('User added successfully:', data);
    } catch (error) {
      console.error('Error adding user:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, addUser };
};

export default useAddUser;

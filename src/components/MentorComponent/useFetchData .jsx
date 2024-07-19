import { useState, useEffect } from 'react';
import { message } from 'antd';

const useFetchData = (apiCall) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await apiCall();
        setData(res.events);
      } catch (error) {
        message.error('Error fetching data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiCall]);

  return { data, loading };
};

export default useFetchData;

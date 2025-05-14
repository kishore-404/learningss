import { useEffect, useState } from 'react';
import { getDummyData } from './Api';

const MyComponent = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getDummyData()
      setData(response)
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Dummy Data</h2>
      <ul>
       {data.length === 0 ? <p>Loading...</p> : (
  <ul>
    {data && <p>{data.email}</p>}
  </ul>
)}

      </ul>
    </div>
  );
};

export default MyComponent;

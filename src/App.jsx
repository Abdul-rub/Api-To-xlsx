
import { useState } from 'react'
import './App.css'
import ExportToExcel from './excelFile'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//Dynamic links for practice
// function App() {
//   const [productData, setProductData] = useState([]);
//   const [peopleData, setPeopleData] = useState([]);

//   const fetchData = async (url, setData, category) => {
//     let data = await fetch(url);
//     let res = await data.json();
    
//     const newData = [{
//       category: category,
//       data: res,
//     }];

//     setData((prevData) => [...prevData, ...newData]);
//   }

//   useEffect(() => {
//     fetchData('https://jsonplaceholder.typicode.com/albums', setProductData, 'product');
//     fetchData('https://jsonplaceholder.typicode.com/users', setPeopleData, 'people');
//   }, []);

//   return (
//     <>
//       <ExportToExcel finalData={[...productData, ...peopleData]} />
//     </>
//   );
// }

// export default App;



//Serach Bar code 

function App() {
  const [apiUrls, setApiUrls] = useState(['']);
  const [apiData, setApiData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);


  const fetchData = async (url, category) => {
    try {
      setIsFetching(true);
      let data = await fetch(url);
      let res = await data.json();
  
      const newData = {
        category: category,
        data: res,
      };
  
      const isDuplicate = apiData.some((item) => item.category === category);
      if (!isDuplicate) {
        setApiData((prevData) => [...prevData, newData]);
      } else {
        toast.error(`Duplicate data found for category: ${category}`);
      }
    } catch (error) {
      toast.error(`Error fetching data for category: ${category}`);
    } finally {
      setIsFetching(false);
    }
  };
  const handleExport = async () => {
    setIsFetching(true);

    const uniqueUrls = [...new Set(apiUrls)];
    for (const url of uniqueUrls) {
      if (url.trim() !== '') {
        const category = url.split('/').pop();
        await fetchData(url, category);
      }
    }

    setIsFetching(false);

  };

  const handleAddApi = () => {
    setApiUrls((prevUrls) => [...prevUrls, '']);
  };

  return (
    <>
      <div className="container">
        {apiUrls.map((url, index) => (
          <div key={index}>
            <label>{`API URL ${index + 1}: `}</label>
            <input
              type="text"
              value={url}
              onChange={(e) => {
                const updatedUrls = [...apiUrls];
                updatedUrls[index] = e.target.value;
                setApiUrls(updatedUrls);
              }}
            />
          </div>
        ))}
        <div className='btns'>

        <button onClick={handleAddApi}>Add API</button>
        <button onClick={handleExport} disabled={isFetching}>
          {isFetching ? 'Loading...' : 'Fetch Data'}
        </button>
      <ExportToExcel finalData={apiData} />
        </div>
      </div>

  

    </>
  );
}

export default App;
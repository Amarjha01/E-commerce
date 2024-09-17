import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import summaryApi from '../common/index.jsx';

const SearchedProduct = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const quary = useLocation();
    console.log("query: ", quary.search);

    const searchProduct = async () => {
        try {
            setLoading(true);
            const response = await fetch(summaryApi.searchProduct.url + quary.search);
            const responseData = await response.json();
            
            setLoading(false);
            setData(responseData.data);
        } catch (error) {
            console.log("error: ", error);
        }
    };

    useEffect(() => {
        searchProduct();
    }, [quary.search]); // Add quary.search to the dependency array

    return (
       <>
       <div className='container mx-auto p-4'>

        {
            loading && (
                <p className='text-center text-lg'>Loading.....</p>
            )
        }
        <p>search result : {data.length}</p>

        {
            data.length === 0 && !loading && (
                <p className='text-center text-lg bg-white'>No product found</p>
            )
        }

        {
            data.length !==0 && !loading && (
                data.map((product,index) => {
                    return(
                        <div></div>
                    )
                })
            )
        }
       </div>
       
       
       
       </>
    );
};

export default SearchedProduct;

import React, { useState, useEffect } from 'react';

const HorizontalProductCard = ({
    category,
    heading
}) => {
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);

const loadingData = new Array(13).fill(null);

  return (
    <div className='container bg-yellow-600 mx-auto px-4 py-2 my-6'>
        <h2 className='text-2xl font-semibold py-2'>{heading}</h2>
        <div className='w-full bg-lime-800 max-w-[300px]'>
product
        </div>
    </div>
  )
}

export default HorizontalProductCard;
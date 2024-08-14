import { useParams } from 'react-router-dom'

const CategoryProduct = () => {
  const params = useParams()
  return (
    <div>
     <p className='capitalize'>{params?.categoryName}</p>
      </div>
  )
}

export default CategoryProduct
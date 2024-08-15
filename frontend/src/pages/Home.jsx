import  summaryApi from '../common/index.jsx';
import CategoryList from '../components/CategoryList.jsx';
import BannerProduct from '../components/BannerProduct.jsx';
import HorizontalProductCard from '../components/HorizontalProductCard.jsx'

const Home = () => {
  return (
    <div className='bg-slate-100 h-100vh'>
      <CategoryList />
      <BannerProduct/>
      <HorizontalProductCard category={'airpodes'}  heading={'Top airpodes'}/>
    </div>
  )
}

export default Home
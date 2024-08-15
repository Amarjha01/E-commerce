import  summaryApi from '../common/index.jsx';
import CategoryList from '../components/CategoryList.jsx';
import BannerProduct from '../components/BannerProduct.jsx';
import HorizontalProductCard from '../components/HorizontalProductCard.jsx'
import VerticalProductCard from '../components/VerticalCardProduct.jsx'

const Home = () => {
  return (
    <div className='bg-slate-100 h-100vh'>
      <CategoryList />
      <BannerProduct/>
      <HorizontalProductCard category={'airpodes'}  heading={'Top airpodes'}/>
      <HorizontalProductCard category={'earphones'}  heading={'Popular Earphones'}/>
      <VerticalProductCard category={'mobile'}  heading={'Top mobile'}/>
      <VerticalProductCard category={'camera'}  heading={'Top camera'}/>
      <VerticalProductCard category={'mouse'}  heading={'Top mouse'}/>
      <VerticalProductCard category={'printer'}  heading={'Top printer'}/>
      <VerticalProductCard category={'processors'}  heading={'Top processors'}/>
      <VerticalProductCard category={'refrigerator'}  heading={'Top refrigerator'}/>
      <VerticalProductCard category={'speakers'}  heading={'Top speakers'}/>
      <VerticalProductCard category={'trimmers'}  heading={'Top trimmers'}/>
      <VerticalProductCard category={'televison'}  heading={'Top televison'}/>
      <VerticalProductCard category={'watches'}  heading={'Top watches'}/>

    </div>
  )
}

export default Home
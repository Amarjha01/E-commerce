import summaryApi from '../common/index.jsx';
const fetchCategoryWiseProduct = async (category) => {
    const response = await fetch(summaryApi.CategoryWiseProduct.url, {
        method: summaryApi.CategoryWiseProduct.method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            category: category
        })
    });
    const data = await response.json();
    return data;
}
export default fetchCategoryWiseProduct;
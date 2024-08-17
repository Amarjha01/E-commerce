import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import summaryApi from "../common/index";
import Currency from "../helpers/Currency";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import VerticalProductCard from "../components/VerticalCardProduct";
const ProductDetails = () => {
  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCordinates, setZoomImageCordinates] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingprice: "",
  });

  const productImageloading = new Array(4).fill(null);

  const params = useParams();

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(summaryApi.productDetails.url, {
      method: summaryApi.productDetails.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);
    const dataResponse = await response.json();
    setData(dataResponse?.data);
    setActiveImage(dataResponse?.data?.productImage[0]);
  };
 
  useEffect(() => {
    fetchProductDetails();
  }, []);

  const handleImageHover = (imageUrl) => {
    setActiveImage(imageUrl);
  };
  const handleImageZoom = (e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    // console.log("coordinates:", screenLeft, screenTop, clientWidth, clientHeight);
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    console.log();
    setZoomImageCordinates({ x, y });
  };

  const handleImageZoomOut = () => {
    setZoomImage(false);
  };

  useEffect(() => {
    handleImageZoom;
  }, [zoomImage]);

  const similarProduct = data?.category;

  return (
    <div className="conatainer mx-auto p-4">
      <div className="min-h-[200px] flex flex-row  ">
        {/* to display img */}

        <div className="h-96 flex flex-col lg:flex-row-reverse gap-3 ">
          <div className="h-[300px] w-[300px] relative lg:h-96 lg:w-96 bg-slate-200 mix-blend-multiply flex justify-center items-center">
            {data.productImage[0] && (
              <img
                src={activeImage}
                alt="product"
                className="h-[90%] w-[90%] object-scale-down mix-blend-multiply cursor-zoom-in"
                onMouseMove={handleImageZoom}
                onMouseLeave={handleImageZoomOut}
              />
            )}
          </div>
          {/* product zoom */}
          {zoomImage && (
            <div className="hidden lg:block absolute min-w-[384px] min-h-[384px] bg-slate-200 left-[545px] overflow-hidden ">
              <div
                className=" min-h-[384px] min-w-[384px] scale-125  "
                style={{
                  backgroundImage: `url(${activeImage})`,
                  backgroundPosition: `${zoomImageCordinates.x * 100}% ${
                    zoomImageCordinates.y * 100
                  }%`,
                  backgroundRepeat: "no-repeat",
                  overflow: "hidden",
                }}
              ></div>
            </div>
          )}

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll h-full animate-pulse">
                {productImageloading.map((el) => {
                  return (
                    <div className="h-36 w-36 bg-slate-200 rounded "></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll h-full">
                {data?.productImage?.map((imageUrl, index) => {
                  return (
                    <div
                      className="h-32 w-32 bg-slate-200 rounded flex justify-center items-center "
                      key={imageUrl}
                    >
                      <img
                        src={imageUrl}
                        onMouseEnter={() => {
                          setActiveImage(imageUrl);
                        }}
                        onClick={() => {
                          setActiveImage(imageUrl);
                        }}
                        alt="product"
                        className="h-28 w-28 object-scale-down mix-blend-multiply cursor-pointer"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* product detain */}
        {loading ? (
          <div className="px-2 w-full flex flex-col gap-1">
            <p className="bg-slate-300 animate-pulse inline w-fit  font-bold px-16 py-3 rounded-full"></p>
            <h2 className="text-2xl lg:text-4xl font-medium bg-slate-300 animate-pulse px24 py-4 rounded-full"></h2>
            <p className=" text-slate-400 capitalize bg-slate-300 animate-pulse px24 py-4 rounded-full"></p>
            <div className="text-slate-300 flex items-center gap-1 animate-pulse">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <div className="flex gap-2">
              <p className="text-slate-300 animate-pulse">{Currency()}</p>
              <p className="text-slate-300 line-through animate-pulse">
                {Currency()}
              </p>
            </div>
            <div className="flex gap-2 ">
              <button className="px-10 py-5 rounded-md bg-slate-300 text-red-500 font-medium min-w-[120px] animate-pulse  "></button>
              <button className="px-10 py-5 rounded-md bg-slate-300 text-red-500 font-medium min-w-[120px] animate-pulse "></button>
            </div>
            <div className="flex flex-col gap-2">
              <p className="bg-slate-300 py-5 px-16 rounded-full animate-pulse"></p>
              <p className="bg-slate-300 py-16 px-16 rounded-md animate-pulse"></p>
            </div>
          </div>
        ) : (
          <div className=" px-2 w-full flex flex-col gap-1">
            <p className="bg-green-200 text-red-600 inline w-fit  font-bold px-3 rounded-full">
              {data.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {data.productName}
            </h2>
            <p className=" text-slate-400 capitalize">{data?.category}</p>
            <div className="text-green-700 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex gap-2">
              <p>{Currency(data?.sellingprice)}</p>
              <p className="text-slate-400 line-through">
                {Currency(data?.price)}
              </p>
            </div>
            <div className="flex gap-2 ">
              <button className="border-2 border-red-600  px-3 py-1 rounded-md  text-xl text-red-500 font-medium min-w-[120px] hover:bg-red-500 hover:text-white transition-all ">
                Buy
              </button>
              <button className="border-2 border-red-600  px-3 py-1 rounded-md text-xl text-white font-medium min-w-[120px] bg-red-500 hover:bg-red-700 hover:text-white transition-all">
                Add to cart
              </button>
            </div>
            <div>
              <p className="text-slate-600">Discription:</p>
              <p className="">{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      <div>
        {data?.category && (
          <VerticalProductCard
            category={data.category}
            heading={"similar product"}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

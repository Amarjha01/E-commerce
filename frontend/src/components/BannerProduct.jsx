// Banner Images
import banner1 from "../asset/banner/img1.webp";
import banner2 from "../asset/banner/img2.webp";
import banner3 from "../asset/banner/img3.jpg";
import banner4 from "../asset/banner/img4.jpg";
import banner5 from "../asset/banner/img5.webp";
import banner1_mobile from "../asset/banner/img1_mobile.jpg";
import banner2_mobile from "../asset/banner/img2_mobile.webp";
import banner3_mobile from "../asset/banner/img3_mobile.jpg";
import banner4_mobile from "../asset/banner/img4_mobile.jpg";
import banner5_mobile from "../asset/banner/img5_mobile.png";

// Icons
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

import { useState, useEffect } from "react";

const BannerProduct = () => {
  const [currntImg, setCurrentImg] = useState(0);

  const DesktopBanner = [banner5, banner1, banner2, banner3, banner4];
  const MobileBanner = [
    banner5_mobile,
    banner1_mobile,
    banner2_mobile,
    banner3_mobile,
    banner4_mobile,
  ];

  const handleNextImg = () => {
    if (currntImg === 4) {
      setCurrentImg(0);
    } else {
      setCurrentImg(currntImg + 1);
    }
  };

  const handlePrevImg = () => {
    if (currntImg === 0) {
      setCurrentImg(4);
    } else {
      setCurrentImg(currntImg - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextImg();
    }, 4000);

return () => clearInterval(interval);// Clear the interval on component unmount
console.log(interval)
  }, [currntImg]); // Dependency array

  return (
    <div className="container  mx-auto px-5">
      <div className="h-60 md:h-72 w-full  bg-slate-200 rounded-sm text-white relative ">
        <div className="absolute z-10 w-full h-full md:flex items-center hidden">
          <div className=" flex justify-between w-full text-black text-2xl ">
            <button
              onClick={handlePrevImg}
              className="bg-white rounded-full p-1"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={handleNextImg}
              className="bg-white rounded-full p-1"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        {/* For desktop & tab */}
        <div className="hidden  md:flex w-full h-full overflow-hidden">
          {DesktopBanner.map((bannerUrl, index) => {
            return (
              <div
                className="h-full w-full min-w-full min-h-full transition-all"
                key={bannerUrl + index}
                style={{ transform: `translatex(-${currntImg * 100}%)` }}
              >
                <img src={bannerUrl} alt="" className="w-full h-full" />
              </div>
            );
          })}
        </div>

        {/* For mobile */}

        <div className="w-full h-full overflow-hidden flex md:hidden">
          {MobileBanner.map((el, index) => {
            return (
              <div
                className="h-full w-full min-h-full min-w-full transition-all"
                style={{ transform: `translatex(-${currntImg * 100}%)` }}
              >
                <img
                  src={el}
                  alt=""
                  key={el + index}
                  className="w-full h-full"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;

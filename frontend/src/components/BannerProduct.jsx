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

const DesktopBanner = [banner1, banner2, banner3, banner4, banner5];
const MobileBanner = [
  banner1_mobile,
  banner2_mobile,
  banner3_mobile,
  banner4_mobile,
  banner5_mobile,
];

const BannerProduct = () => {
  return (
    <div className="container  mx-auto px-5 ">
      <div className="h-72 w-full  bg-slate-200 rounded-sm text-white">
        <div className="flex">
          {DesktopBanner.map((bannerUrl, index) => {
            return (
              <div className="h-full w-full" key={bannerUrl}>
                <img src={bannerUrl} alt="" className="w-full h-full" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;

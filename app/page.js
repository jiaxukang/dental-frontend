
import Image from "next/image";
import CategoryList from "./_components/CategoryList";
import Footer from "./_components/Footer";
import ProductList from "./_components/ProductList";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";

export default async function Home() {
  const sliderList = await GlobalApi.getSlider();
  const categoryList = await GlobalApi.getCategory();
  const productList = await GlobalApi.getProduct();
  return (
    <div className='p-5 md:p-10 px-16'>
      <Slider sliderList={sliderList.data.data} />
      <CategoryList categoryList={categoryList.data.data} />
      <ProductList productList={productList.data.data} />
      <Image src="/thumbnail.png" alt="footer" width={1000} height={400} className="w-full h-[200px] md:h-[400px] object-cover rounded-2xl" />
      <Footer />
    </div>
  );
}

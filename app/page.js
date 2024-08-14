"use client"
import Image from "next/image";
import CategoryList from "./_components/CategoryList";
import Footer from "./_components/Footer";
import PopularProductList from "./_components/PopularProductList";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import { useEffect, useState } from "react";

export default function Home() {
  const [sliderList, setSliderList] = useState(null);
  const [categoryList, setCategoryList] = useState(null);
  const [productList, setProductList] = useState(null);

  useEffect(() => {
    fetchDatas();
    return () => {
      setProductList(null);
      setCategoryList(null);
      setSliderList(null);
    }
  }, []);

  async function fetchDatas() {
    const sliderList = await GlobalApi.getSlider();
    const categoryList = await GlobalApi.getCategory();
    const productList = await GlobalApi.getProduct();
    setSliderList(sliderList);
    setCategoryList(categoryList);
    setProductList(productList);
  
  }

  return (
    <div className='p-5 md:p-10 px-16'>
      <Slider sliderList={sliderList?.data.data} />
      <CategoryList categoryList={categoryList?.data?.data} />
      <PopularProductList productList={productList?.data?.data} />
      <Image src="/thumbnail.png" alt="footer" width={1000} height={400} className="w-full h-[200px] md:h-[400px] object-cover rounded-2xl" />
      <Footer />
    </div>
  );
}

"use client"
import Image from "next/image";
//import CategoryList from "./_components/CategoryList";
import Footer from "./_components/Footer";
import PopularProductList from "./_components/PopularProductList";
import ModuleList from "./_components/ModuleList";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import { useEffect, useState } from "react";

export default function Home() {
  const [sliderList, setSliderList] = useState(null);
  //const [categoryList, setCategoryList] = useState(null);
  const [productList, setProductList] = useState(null);
  const [moduleList, setModuleList] = useState(null);

  useEffect(() => {
    fetchDatas();
    return () => {
      setProductList(null);
      //setCategoryList(null);
      setSliderList(null);
      setModuleList(null);
    }
  }, []);

  async function fetchDatas() {
    const sliderList = await GlobalApi.getSlider();
    const categoryList = await GlobalApi.getCategory();
    const productList = await GlobalApi.getProduct();
    const moduleList = await GlobalApi.getModule();
    setSliderList(sliderList);
    //setCategoryList(categoryList);
    setProductList(productList);
    setModuleList(moduleList);
  
  }

  return (
    <div className='p-5 md:p-10 px-16'>
      <Slider sliderList={sliderList?.data.data} />
      <ModuleList moduleList={moduleList?.data?.data} />
      {/* <CategoryList categoryList={categoryList?.data?.data} /> */}
      <PopularProductList productList={productList?.data?.data} />
      <Image src="/thumbnail.png" alt="footer" width={1000} height={400} className="w-full h-[200px] md:h-[400px] object-cover rounded-2xl" />
      <Footer />
    </div>
  );
}

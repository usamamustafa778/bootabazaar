import React, { useEffect, useState, useCallback } from "react";
import useApi from "../../utils/useApi";
import Product from "../../components/container/Product";
import Shopcateogary from "../../components/container/Shopcateogary";
import { categories } from "../../localData";
import Navbar from "../../components/container/Navbar";
import Shoppopular from "../../components/container/Shoppopular";
import Shoplong from "../../components/container/Shoplong";
import ShopDeals from "../../components/container/Shopdeals";
import Shopform from "../../components/container/Shopform";
import ShopViewed from "../../components/container/Shopviewd";
import Footer from "../../components/container/Footer";
import FullContainer from "../../components/common/FullContainer";
import Container from "../../components/common/Container";
import { Play } from "lucide-react";

export default function Home() {
  const { request } = useApi();
  const [products, setProducts] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const data = await request({ method: "get", url: "products" });
      setProducts(data);
    } catch (err) {
      console.error(`Error fetching Products:`, err);
    }
  }, [request]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <FullContainer className="mt-12">
        <Container className="bg-banner1 rounded-xl overflow-hidden">
          <FullContainer className="py-20 text-white bg-black/40">
            <h3 className="elementHeading3">Welcome to BootaBazaar</h3>
            <h4 className="elementHeading4 py-2">
              Explore your favourite plants and gardening tools.
            </h4>
            <button className="btnSecondary  rounded-full flex items-center gap-3">
              <Play className="w-4" />
              How BootaBazaar Works
            </button>{" "}
          </FullContainer>
        </Container>
      </FullContainer>
      <Shopcateogary categories={categories} />
      {/* {products?.length > 0 &&
        products.map((product, index) => (
          <Product key={product.id || index} product={product} />
        ))} */}
      <Shoppopular />
      <Shoplong />
      <ShopDeals />
      <ShopViewed />
      <Shopform />
      <Footer />
    </div>
  );
}

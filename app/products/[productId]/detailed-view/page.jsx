import ProductDetailedView from "@/components/products/detailedview/detailedview";
const Page = ({ params }) => {
  return <ProductDetailedView params={params} viewMode={true} />;
};

export default Page;

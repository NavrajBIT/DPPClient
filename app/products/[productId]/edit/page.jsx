import ProductForm from "@/components/products/products/productsform";
const Page = ({ params }) => {
  return <ProductForm params={params} type={"Edit"} />;
};

export default Page;

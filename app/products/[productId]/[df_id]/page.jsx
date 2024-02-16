"use client";

import DataPointDetail from "@/components/products/details/subcomponents/datapointDetail";
import { useRouter } from "next/navigation";
const Page = ({ params }) => {
  return <DataPointDetail params={params} viewMode={true} />;
};

export default Page;

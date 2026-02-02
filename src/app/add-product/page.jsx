import AddProduct from "@/components/AddProduct";
import Preloader from "@/helper/Preloader";
import MasterLayout from "@/layout/MasterLayout";

export const metadata = {
  title: "הוספת מוצר - DP Market",
  description: "הוסף מוצר דיגיטלי חדש למכירה",
};

const page = () => {
  return (
    <>
      <MasterLayout>
        <Preloader />
        <AddProduct />
      </MasterLayout>
    </>
  );
};

export default page;

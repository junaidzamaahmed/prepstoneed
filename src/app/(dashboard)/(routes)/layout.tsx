import Footer from "../_components/footer";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className=" min-h-[62vh]">{children}</div>
      <Footer />
    </>
  );
};
export default DashboardLayout;

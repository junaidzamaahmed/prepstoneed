import Footer from "../_components/footer";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <>{children}</>
      <Footer />
    </>
  );
};
export default DashboardLayout;

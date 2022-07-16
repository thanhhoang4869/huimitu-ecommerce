import "./style.css";
import TotalSection from "./TotalSection";
import InformationSection from "./InformationSection";

const CheckoutPage = () => {
  return (
    <>
      <div className="checkout p-2 mb-5">
        <section>
          <div className="container px-md-2 px-lg-3">
            <div className="row">
              <TotalSection />
              <InformationSection />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CheckoutPage;

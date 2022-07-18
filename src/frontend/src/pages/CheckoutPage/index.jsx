import TotalSection from "./TotalSection";
import InformationSection from "./InformationSection";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";
import variantService from "services/variant";

const CheckoutPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [variantId, setVariantId] = useState(searchParams.get("variantId"));
  const [quantity, setQuantity] = useState(searchParams.get("quantity"));

  const [variants, setVariants] = useState([]);
  const { cart } = useContext(AuthContext);

  const fetchVariant = async () => {
    try {
      const response = await variantService.getByVariantId(variantId);
      const { variant } = response.data;
      setVariants([{ ...variant, quantity }]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!(variantId && quantity)) {
      return setVariants(cart.variants);
    }

    fetchVariant();
  }, []);

  return (
    <>
      <div className="checkout p-2 mb-5">
        <section>
          <div className="container px-md-2 px-lg-3">
            <div className="row">
              <TotalSection variants={variants} />
              <InformationSection />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CheckoutPage;

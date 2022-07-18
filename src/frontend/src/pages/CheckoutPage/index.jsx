import TotalSection from "./TotalSection";
import InformationSection from "./InformationSection";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { AccountContext } from "context/AccountContext";
import variantService from "services/variant";
import voucherService from "services/voucher";
import swal from "sweetalert2";

const CheckoutPage = () => {
  const { cart, fetchCart, account, fetchAccount } = useContext(AccountContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const [variantId, setVariantId] = useState(searchParams.get("variantId"));
  const [quantity, setQuantity] = useState(searchParams.get("quantity"));

  const [listVariant, setListVariant] = useState([]);

  const [receiverName, setReceiverName] = useState(account.fullname);
  const [receiverPhone, setReceiverPhone] = useState(account.phone);
  const [shippingAddressId, setShippingAddressId] = useState();
  const [paymentId, setPaymentId] = useState(1);
  const [voucherCode, setVoucherCode] = useState();

  const [shippingPrice, setShippingPrice] = useState(0);
  const [voucherPrice, setVoucherPrice] = useState(0);

  const fetchVariant = async () => {
    try {
      const response = await variantService.getByVariantId(variantId);
      const { variant } = response.data;
      setListVariant([{ ...variant, quantity }]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAccount();
    fetchCart();
    if (variantId && quantity) {
      fetchVariant();
    }
  }, []);

  useEffect(() => {
    if (!(variantId && quantity)) {
      setListVariant(cart.variants);
    }
  }, [cart]);

  const handleChangeShippingAddress = (value) => {
    setShippingAddressId(value);
    fetchPrice();
  };

  const handleApplyVoucherCode = async (value, event) => {
    if (value.length < 1) {
      return;
    }

    try {
      const response = await voucherService.getVoucherByCode(value);
      const { exitcode, voucher } = response.data;
      if (exitcode === 0) {
        swal.fire({
          text: "Áp dụng voucher thành công",
          icon: "success",
          confirmButtonText: "OK",
        });
        setVoucherCode(voucher.voucherCode);
      } else {
        swal.fire({
          text: "Áp dụng voucher thất bại",
          icon: "error",
          confirmButtonText: "OK",
        });
        setVoucherCode(null);
      }
    } catch (err) {}
  };

  const fetchPrice = async () => {};

  return (
    <div className="checkout p-2 mb-5">
      <section>
        <div className="container px-md-2 px-lg-3">
          <div className="row">
            <InformationSection
              receiverName={receiverName}
              setReceiverName={setReceiverName}
              receiverPhone={receiverPhone}
              setReceiverPhone={setReceiverPhone}
              paymentId={paymentId}
              setPaymentId={setPaymentId}
              shippingAddressId={shippingAddressId}
              handleChangeShippingAddress={handleChangeShippingAddress}
            />
            <TotalSection
              variants={listVariant}
              paymentId={paymentId}
              voucherCode={voucherCode}
              shippingPrice={shippingPrice}
              voucherPrice={voucherPrice}
              handleApplyVoucherCode={handleApplyVoucherCode}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;

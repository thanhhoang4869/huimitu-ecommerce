import TotalSection from "./TotalSection";
import InformationSection from "./InformationSection";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { AccountContext } from "context/AccountContext";
import variantService from "services/variant";
import swal from "sweetalert2";
import checkoutService from "services/checkout";

const CheckoutPage = () => {
  const { cart, account } = useContext(AccountContext);

  const [searchParams] = useSearchParams();
  const variantId = searchParams.get("variantId");
  const quantity = searchParams.get("quantity");

  const [listVariant, setListVariant] = useState([]);

  const [receiverName, setReceiverName] = useState();
  const [receiverPhone, setReceiverPhone] = useState();
  const [shippingAddressId, setShippingAddressId] = useState();
  const [paymentId, setPaymentId] = useState(1);
  const [voucherCode, setVoucherCode] = useState();

  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

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
    if (!account) return;
    setReceiverName(account.fullname);
    setReceiverPhone(account.phone);
  }, [account]);

  useEffect(() => {
    if (variantId && quantity) {
      fetchVariant();
    }
  }, []);

  useEffect(() => {
    if (!(variantId && quantity)) {
      setListVariant(cart.variants);
    }
  }, [cart]);

  useEffect(() => {
    fetchPrice();
    console.log(shippingAddressId);
  }, [listVariant, shippingAddressId, voucherCode]);

  const handleChangeShippingAddress = (value) => {
    console.log(value);
    setShippingAddressId(value);
  };

  const handleApplyVoucherCode = async (value) => {
    if (value.length < 1) {
      return;
    }
    setVoucherCode(value);
  };

  const handleCheckout = async () => {
    try {
      const response = await checkoutService.checkout({
        receiverName,
        receiverPhone,
        variantId,
        quantity,
        paymentId,
        shippingAddressId,
        voucherCode,
      });
      const { exitcode, orderId, redirectUrl } = response.data;
      if (exitcode === 0) {
        if (paymentId === 2) {
          window.location.assign(redirectUrl);
        }
        return orderId;
      }
      return null;
    } catch (err) {}
  };

  const fetchPrice = async () => {
    try {
      const response = await checkoutService.getPrice(
        shippingAddressId,
        voucherCode,
        variantId,
        quantity
      );
      const { exitcode, finalPrice, shippingPrice, totalPrice, discountPrice } =
        response.data;

      // eslint-disable-next-line default-case
      switch (exitcode) {
        case 0: {
          setFinalPrice(finalPrice);
          setShippingPrice(shippingPrice);
          setTotalPrice(totalPrice);
          setDiscountPrice(discountPrice);
          break;
        }
        case 101: {
          swal.fire({
            text: "Không tìm thấy voucher",
            icon: "error",
            confirmButtonText: "OK",
          });
          setVoucherCode(null);
          break;
        }
        case 102: {
          swal.fire({
            text: "Đơn của bạn chưa đủ điều kiện để áp dụng",
            icon: "error",
            confirmButtonText: "OK",
          });
          setVoucherCode(null);
          break;
        }
      }
    } catch (err) {}
  };

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
              receiverPhone={receiverPhone}
              variants={listVariant}
              receiverName={receiverName}
              paymentId={paymentId}
              voucherCode={voucherCode}
              totalPrice={totalPrice}
              shippingPrice={shippingPrice}
              shippingAddressId={shippingAddressId}
              discountPrice={discountPrice}
              finalPrice={finalPrice}
              handleApplyVoucherCode={handleApplyVoucherCode}
              handleCheckout={handleCheckout}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;

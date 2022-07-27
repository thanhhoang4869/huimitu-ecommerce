import TotalSection from "./TotalSection";
import InformationSection from "./InformationSection";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { AccountContext } from "context/AccountContext";
import variantService from "services/variant";
import swal from "sweetalert2";
import checkoutService from "services/checkout";
import { validatePhone } from "utils/validator";
import orderService from "services/order";

const CheckoutPage = () => {
  const { cart, account, fetchCart } = useContext(AccountContext);

  const [searchParams] = useSearchParams();
  const variantId = searchParams.get("variantId");
  const quantity = searchParams.get("quantity");
  const checkoutOrderId = searchParams.get("orderId");

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

  const [loading, setLoading] = useState(false);

  const navigator = useNavigate();

  const fetchVariant = async () => {
    try {
      const response = await variantService.getByVariantId(variantId);
      const { variant } = response.data;
      setListVariant([{ ...variant, quantity }]);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrder = async () => {
    try {
      const response = await orderService.getById(checkoutOrderId);
      const { exitcode, order } = response.data;
      if (exitcode === 0) {
        setListVariant(order.variants);
      }
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
    if (checkoutOrderId) {
      fetchOrder();
    }
  }, []);

  useEffect(() => {
    if (!((variantId && quantity) || checkoutOrderId)) {
      setListVariant(cart.variants);
    }
  }, [cart]);

  useEffect(() => {
    console.log(listVariant);
    fetchPrice();
  }, [listVariant, shippingAddressId, voucherCode]);

  const handleChangeShippingAddress = (value) => {
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
      if (!receiverName || !receiverPhone || !shippingAddressId) {
        swal.fire({
          text: "Vui Lòng điền đầy đủ các thông tin",
          icon: "info",
          confirmButtonText: "OK",
        });
        return;
      }
      if (!validatePhone(receiverPhone)) {
        swal.fire({
          text: "Số điện thoại không hợp lệ",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
      setLoading(true);
      const response = await checkoutService.checkout({
        receiverName,
        receiverPhone,
        variantId,
        quantity,
        orderId: checkoutOrderId,
        paymentId,
        shippingAddressId,
        voucherCode,
      });
      const { exitcode, orderId, redirectUrl } = response.data;

      // eslint-disable-next-line default-case
      switch (exitcode) {
        case 0: {
          fetchCart();
          // eslint-disable-next-line default-case
          switch (paymentId) {
            case 1: {
              return orderId;
            }
            case 2: {
              window.location.assign(redirectUrl);
              break;
            }
            case 3: {
              await swal.fire({
                title: "Đặt hàng thành công",
                text: `Đơn hàng của bạn là: ${orderId}`,
                icon: "info",
                confirmButtonText: "OK",
              });
              navigator("/account/order");
              break;
            }
          }
          break;
        }

        // eslint-disable-next-line no-fallthrough
        case 103: {
          swal.fire({
            text: "Không đủ hàng để thanh toán",
            icon: "error",
            confirmButtonText: "OK",
          });
          break;
        }
      }
      return null;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPrice = async () => {
    try {
      const response = await checkoutService.getPrice({
        shippingAddressId,
        voucherCode,
        orderId: checkoutOrderId,
        variantId,
        quantity,
      });
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
    } catch (err) {
      console.error(err)
    }
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
              loading={loading}
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

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import {
  clearCartItems,
  getCartProducts,
  selectTotalPrice,
} from "../../features/cartSlice";
import {
  PayPalButtons,
  SCRIPT_LOADING_STATE,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import {
  getClientId,
  makePayment,
  selectClientId,
} from "../../features/orderSlice";
import { StyledLoader } from "../products/products.style";

function Payment() {
  const { orderId } = useParams();
  const dispatch = useAppDispatch();
  const totalPrice = useAppSelector(selectTotalPrice);
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const clientId = useAppSelector(selectClientId);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadPayPalScript = async () => {
      dispatch(getClientId());
      paypalDispatch({
        type: "resetOptions",
        value: {
          clientId: clientId,
          currency: "SEK",
        },
      });
      paypalDispatch({
        type: "setLoadingStatus",
        value: { state: SCRIPT_LOADING_STATE.PENDING, message: "pending" },
      });
    };
    if (!window.paypal) {
      loadPayPalScript();
    }
  }, [orderId, paypalDispatch, clientId, dispatch]);

  const createOrder = (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: totalPrice,
            },
          },
        ],
        intent: "CAPTURE",
      })
      .then((orderId: string) => orderId);
  };

  const onError = (error: any) => {
    console.log(error);
    setMessage(error.message);
  };

  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(async function (details: any) {
      try {
        dispatch(makePayment({ id: orderId, details: {} }));
        setMessage("Payment successful!");
        dispatch(clearCartItems());
        navigate(`/order/${orderId}`, { replace: true });
      } catch (error) {
        console.log(error);
        setMessage("Payment failed!");
      }
    });
  };

  return (
    <div>
      {isPending && <StyledLoader />}
      <h2>To pay: SEK {totalPrice}</h2>
      <div style={{ display: "grid", placeItems: "center" }}>
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        ></PayPalButtons>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Payment;

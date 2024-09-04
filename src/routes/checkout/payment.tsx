import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import {
  clearCartFromStorage,
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
  selectError,
} from "../../features/orderSlice";
import { StyledLoader } from "../products/products.style";
import { getUser } from "../../features/userSlice";
import { ErrorText } from "../auth/auth.style";
import { PayPalButtonsContainer } from "./checkout.style";

function Payment() {
  const { orderId } = useParams();
  const dispatch = useAppDispatch();
  const totalPrice = useAppSelector(selectTotalPrice);
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const clientId = useAppSelector(selectClientId);
  const error = useAppSelector(selectError);
  const user = useAppSelector(getUser);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!clientId) setMessage("Something went wrong");
  }, [clientId]);

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
        user ? dispatch(clearCartItems()) : dispatch(clearCartFromStorage());
        navigate(`/order/${orderId}`);
      } catch (error) {
        console.log(error);
        setMessage("Payment failed!");
      }
    });
  };

  return (
    <div>
      {isPending && <StyledLoader />}
      {!error || (!clientId && message) ? (
        <ErrorText>{error ? error : message}</ErrorText>
      ) : (
        <>
          <h2>To pay: SEK {totalPrice}</h2>
          <PayPalButtonsContainer>
            <PayPalButtons
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
            ></PayPalButtons>
          </PayPalButtonsContainer>
        </>
      )}
      {clientId && message && <p>{message}</p>}
    </div>
  );
}

export default Payment;

import React, { useEffect, useState } from "react";
import { FormContainer, FormPage, Input } from "../auth/auth.style";
import { FormLabel } from "./checkout.style";
import { Button } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { selectCartItems, selectTotalPrice } from "../../features/cartSlice";
import {
  createItemsOrder,
  createItemsOrderUnlogged,
  orderLoading,
  selectOrderId,
} from "../../features/orderSlice";

import { StyledLoader } from "../products/products.style";
import {
  getUser,
  getUserAddress,
  saveInfo,
  selectUserAddress,
} from "../../features/userSlice";
import { useNavigate } from "react-router-dom";

function ShippingInfo() {
  const userAddress = useAppSelector(selectUserAddress);
  const user = useAppSelector(getUser);

  const [shippingInformation, setShippingInformation] = useState(
    userAddress
      ? { ...userAddress }
      : {
          email: "",
          address: "",
          city: "",
          postalCode: "",
          country: "",
        }
  );

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const orderId = useAppSelector(selectOrderId);
  const [toSave, setToSave] = useState(true);
  const isLoading = useAppSelector(orderLoading);
  const navigate = useNavigate();

  const { email, address, city, postalCode, country } = shippingInformation;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setToSave(checked);
    }
    setShippingInformation((prevInfo) => ({ ...prevInfo, [name]: value }));
  }

  useEffect(() => {
    if (user) {
      dispatch(getUserAddress());
    }
  }, [user, dispatch]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (toSave && user) {
      saveShippingInformation();
    }
    user
      ? dispatch(
          createItemsOrder({
            orderItems: cartItems,
            shippingAddress: userAddress ? userAddress : shippingInformation,
            totalPrice,
            paymentMethod: "PayPal",
          })
        )
      : dispatch(
          createItemsOrderUnlogged({
            orderItems: cartItems,
            shippingAddress: shippingInformation,
            totalPrice,
            paymentMethod: "PayPal",
          })
        );

  }

  useEffect(() => {
    if (orderId) {
      // navigate(`/checkout/${orderId}`, { replace: true });
      navigate(`/checkout/${orderId}`);
    }
  }, [orderId, navigate]);

  const saveShippingInformation = () => {
    try {
      dispatch(saveInfo({ shippingAddress: shippingInformation }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FormPage>
      <h2>Shipping Information</h2>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          {!user && (
            <>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="text"
                name="email"
                value={email}
                placeholder="Email Address"
                required
                onChange={handleChange}
              />
            </>
          )}
          <FormLabel>Shipping Address</FormLabel>
          <Input
            type="text"
            name="address"
            value={address}
            placeholder="Address"
            required
            onChange={handleChange}
          />
          <FormLabel>City</FormLabel>
          <Input
            type="text"
            name="city"
            value={city}
            placeholder="City"
            required
            onChange={handleChange}
          />
          <FormLabel>Postal Code</FormLabel>
          <Input
            type="text"
            name="postalCode"
            value={postalCode}
            placeholder="Postal Code"
            required
            onChange={handleChange}
          />
          <FormLabel>Country</FormLabel>
          <Input
            type="text"
            name="country"
            value={country}
            placeholder="Country"
            required
            onChange={handleChange}
          />
          {user && (
            <>
              <input
                id="addressCheckbox"
                type="checkbox"
                name="toSave"
                checked={toSave}
                onChange={handleChange}
              />
              <label htmlFor="addressCheckbox">
                Save address for future use
              </label>
            </>
          )}

          <Button
            type="submit"
            style={{ marginTop: "1em", display: "block", width: "100%" }}
          >
            Proceed to Payment
          </Button>
          {isLoading && <StyledLoader />}
        </form>
      </FormContainer>
    </FormPage>
  );
}

export default ShippingInfo;

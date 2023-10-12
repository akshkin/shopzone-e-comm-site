import React, { useEffect, useState } from "react";
import { FormContainer, FormPage, Input } from "../auth/auth.style";
import { FormLabel } from "./checkout.style";
import { Button } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { selectCartItems, selectTotalPrice } from "../../features/cartSlice";
import {
  createItemsOrder,
  orderLoading,
  selectOrderId,
} from "../../features/orderSlice";

import { StyledLoader } from "../products/products.style";
import {
  getUserAddress,
  saveInfo,
  selectUserAddress,
} from "../../features/userSlice";
import { useNavigate } from "react-router-dom";

function ShippingInfo() {
  const userAddress = useAppSelector(selectUserAddress);

  const [shippingInformation, setShippingInformation] = useState(
    userAddress
      ? { ...userAddress }
      : {
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

  const { address, city, postalCode, country } = shippingInformation;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setToSave(checked);
    }
    setShippingInformation((prevInfo) => ({ ...prevInfo, [name]: value }));
  }
  useEffect(() => {
    dispatch(getUserAddress());
  }, [dispatch]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (toSave) {
      saveShippingInformation();
    }
    dispatch(
      createItemsOrder({
        orderItems: cartItems,
        shippingAddress: userAddress ? userAddress : shippingInformation,
        totalPrice,
        paymentMethod: "PayPal",
      })
    );
    setTimeout(() => {
      orderId && navigate(`/checkout/${orderId}`);
    }, 1500);
  }

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
          <input
            id="addressCheckbox"
            type="checkbox"
            name="toSave"
            checked={toSave}
            onChange={handleChange}
          />
          <label htmlFor="addressCheckbox">Save address for future use</label>

          <Button type="submit">"Proceed to Payment"</Button>
          {isLoading && <StyledLoader />}
        </form>
      </FormContainer>
    </FormPage>
  );
}

export default ShippingInfo;

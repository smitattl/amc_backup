import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  setShowTableForAdminOne,
  setShowTableForAdminTwo,
} from "./store/Slices/arnSlice";
import {
  setShowTableForCustomerOne,
  setShowTableForCustomerTwo,
} from "./store/Slices/customerSlice";
import CryptoJS from "crypto-js";

export const LogoutSession = () => {
  const navigate = useLocation();
  localStorage.clear();
  navigate("/thank-you");
  window.location.href = "https://buytrucknbus-osp3dev.home.tatamotors/";
};

export const useHandleClickActive = () => {
  const dispatch = useDispatch();
  const handleClickActive = (element) => {
    if (element === "section1") {
      dispatch(setShowTableForCustomerOne(true));
    } else if (element === "section2") {
      dispatch(setShowTableForCustomerTwo(true));
    }
  };

  return handleClickActive;
};
export const useHandleClickActiveForAdmin = () => {
  const dispatch = useDispatch();
  const handleClickActiveForAdmin = (element) => {
    if (element === "section1") {
      dispatch(setShowTableForAdminOne(true));
      dispatch(setShowTableForAdminTwo(false));
    } else if (element === "section2") {
      dispatch(setShowTableForAdminTwo(true));
      dispatch(setShowTableForAdminOne(false));
    }
  };

  return handleClickActiveForAdmin;
};
export const maskEmail = (email) => {
  if (email === null) return "No Email Registered";
  else {
    const atIndex = email?.indexOf("@");
    if (atIndex === -1) return email;
    const maskedPart = email?.slice(0, atIndex)?.replace(/./g, "*");
    const domainPart = email?.slice(atIndex);
    return email?.slice(0, 2) + maskedPart + domainPart;
  }
};

export const NameInitials = ({ names }) => {
  const words = names?.split(" ");
  const firstTwoWords = words.slice(0, 2);
  const initials = firstTwoWords
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
  return <div>{initials}</div>;
};

const key = "1234958500595005500i40";
export const encryptData = (data) => {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    key
  ).toString();
  return encryptedData;
};

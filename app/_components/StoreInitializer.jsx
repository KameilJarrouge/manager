"use client";

import { useRef } from "react";
import { useStore } from "../store";

function StoreInitializer({ isLoggedIn }) {
  let state = useStore();
  const initialized = useRef(false);
  if (!initialized.current) {
    useStore.setState({
      isLoggedIn,
    });
    initialized.current = true;
  }
  return <></>;
}

export default StoreInitializer;

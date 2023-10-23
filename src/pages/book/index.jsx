import { useLocation } from "react-router-dom";
import { useState } from "react";
import ViewDetail from "../../components/Book/ViewDetail";

const BookPage = () => {
  const location = useLocation();
  let param = new URLSearchParams(location.search);
  const id = param?.get("id");

  return (
    <>
      <ViewDetail/>
    </>
  );
};

export default BookPage;

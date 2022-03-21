import React from "react";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Authentication = (props) => {
  const [page, setPage] = useState("login");
  const pageChangeHandler = (page) => {
    setPage(page);
  };

  return (
    <div>
      {page === "login" && <Login onPageChange={pageChangeHandler} />}
      {page === "register" && <Register onPageChange={pageChangeHandler} />}
    </div>
  );
};
export default Authentication;

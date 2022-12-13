import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import Navbar from "../components/Navigation/Navbar";
import Loading from "../components/UIElements/Loading";
import useHttp from "../hooks/http-hook";
import { isLoggedIn, isNotLoggedIn } from "../store/authSlice";

const RootLayout = () => {
  const { userLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const { isLoading, sendRequest, error, clearError } = useHttp();

  useEffect(() => {
    const request = async () => {
      try {
        const data = await sendRequest("api/v1/users/current-user");

        dispatch(isLoggedIn(data));
      } catch (error) {
        dispatch(isNotLoggedIn());
      }
    };

    request();
  }, [sendRequest, dispatch]);

  if (userLoading) return <Loading center />;

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;

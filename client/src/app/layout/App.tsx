import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCallback, useEffect, useState } from "react";
import LoadingComponent from "./LoadingComponent.js";
import { useAppDispatch } from "../store/configureStore.js";
import { fetchBasketAsync } from "../../features/basket/basketSlice.js";
import { fetchCurrentUser } from "../../features/account/accountSlice.js";

const App = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  // Am folosit useCallback pt ca aplicatia sa nu-si dea re render de fiecare data cand schimb user-ul sau cosul
  // useCallback memoreaza functia pt a nu se schimba dupa fiecare re render
  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  if (loading) return <LoadingComponent name="App" />;

  return (
    <div className=" h-[110vh]">
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <Navbar />
      <div className="m-auto mt-6 w-[95%] lg:mt-12 lg:w-[80%]">
        <Outlet />
      </div>
    </div>
  );
};

export default App;

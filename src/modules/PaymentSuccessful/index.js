import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const PaymentSuccessful = () => {
  const statusPayment = sessionStorage.getItem("r_Finalstatus");
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (statusPayment === "success") {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, []);

  const handleClick = () => {
    sessionStorage.removeItem("r_Finalstatus");
    navigate("/payment-gateway");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#F9F6FF]">
      {status ? (
        <div className="flex w-11/12 flex-col items-center justify-center space-y-9 md:w-1/4">
          <div className="shadow-custom flex items-center justify-center rounded-full border-4 border-[#C4E1E2] border-opacity-60 bg-white p-6">
            <div className="check-container">
              <div className="check-background">
                <svg
                  viewBox="0 0 65 51"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 25L27.3077 44L58.5 7"
                    stroke="white"
                    stroke-width="13"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div className="check-shadow"></div>
            </div>
          </div>
          <div className="space-y-5 text-center">
            <h1 className="text-2xl font-semibold text-[#3F3D56]">
              Payment Successful
            </h1>
            <p className="text-[#4E4B6680]">
              We have received your request and will contact you soon with more
              details. Watch your inbox!
            </p>
            <p className="text-[#4E4B6680]">
              For any queries and support please write to: rie@eobangalore.com
            </p>
          </div>
          <button
            className="w-10/12 rounded-3xl bg-[#0E9D58] py-2 font-semibold text-white"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
        </div>
      ) : (
        <div className="g-red-500 flex w-11/12 flex-col items-center justify-center space-y-9 md:w-1/4">
          <div className="shadow-custom flex items-center justify-center rounded-full border-4 border-red-500 border-opacity-60 bg-white p-6">
            <div className="check-container">
              <div className="close-background">
                <svg
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 8L56 56"
                    stroke="white"
                    stroke-width="13"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 56L56 8"
                    stroke="white"
                    stroke-width="13"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              {/* <div className="check-shadow"></div> */}
            </div>
          </div>

          <div className="space-y-5 text-center">
            <h1 className="text-2xl font-semibold text-[#3F3D56]">
              Payment Failed
            </h1>
            <p className="text-[#4E4B6680]">
              Don't worry your money is safe! if money was debited from your
              account.it will be refunded automatically in 5-7 working days.
            </p>
            <p className="text-[#4E4B6680]">
              For any queries and support please write to: rie@eobangalore.com
            </p>
          </div>
          <button
            className="w-10/12 rounded-3xl bg-red-600 py-2 font-semibold text-white"
            onClick={handleClick}
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccessful;

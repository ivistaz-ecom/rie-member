import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Button, Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import Loader from "../../components/Loader";
import Banner from "../../components/Banner";
import { useNavigate } from "react-router-dom";

function Index() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState({ message: "", type: "", loading: false });
  const sentOtp = sessionStorage.getItem("verification");
  const navigate = useNavigate();
  const regStatus = sessionStorage.getItem("r_TokenMember_Session");
  const memStatus = JSON.parse(regStatus);
  const isRegistered = memStatus[0].regstatus;

  const verifyOtp = (value) => {
    value.preventDefault();
    setError({ loading: true });
    if (otp === sentOtp) {
      console.log("The OTP has been successfully verified");
      setError({
        message: "The OTP has been successfully verified",
        type: "success",
        loading: false,
      });
      //sessionStorage.removeItem("verification");
      if (isRegistered === "true") {
        navigate("/dashboard");
      } else {
        navigate("/welcome");
      }
    } else if (otp === "") {
      console.log("The OTP entered is invalid");
      setError({
        message: "The OTP entered is invalid",
        type: "failure",
        loading: false,
      });
    } else {
      console.log("The OTP does not match.");
      setError({
        message: "The OTP does not match.",
        type: "failure",
        loading: false,
      });
    }
  };

  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-center bg-[#210657]">
        {error.loading && <Loader />}

        <div className="w-full lg:w-1/3">
          <div className="relative text-center">
            <p className="text-[18px] text-white/80">
              Please enter the code below.
            </p>
          </div>
          <div className="z-0 p-4">
            <form className="flex flex-col gap-4">
              <div className="flex  items-center justify-center p-4">
                <OtpInput
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  numInputs={6}
                  isInputNum
                  inputStyle={{
                    width: "2em",
                    height: "2em",
                    margin: "0 0.2rem",
                    fontSize: "1.4rem",
                    borderRadius: "4px",
                    border: "1px solid #ced4da",
                  }}
                  shouldAutoFocus={false}
                  renderInput={(inputProps, index) => (
                    <input {...inputProps} key={index} />
                  )}
                />
              </div>
              <div className="flex  items-center justify-center">
                <Button type="submit" size="lg" onClick={verifyOtp}>
                  Verify OTP
                </Button>
              </div>
              <div className="flex  items-center justify-center">
                {error.message && (
                  <Alert
                    color={error.type}
                    icon={HiInformationCircle}
                    className="opacity-100 transition-opacity duration-1000"
                  >
                    <span className="font-medium">{error.message}</span>
                  </Alert>
                )}
              </div>
            </form>
          </div>
        </div>

        <Banner />
      </div>
    </div>
  );
}

export default Index;

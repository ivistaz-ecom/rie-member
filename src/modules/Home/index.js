import React, { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Label,
  TextInput,
  Alert,
} from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import Loader from "../../components/Loader";
import SERVERCONFIG from "../../server.json";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

function Index() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    alertMessage: "",
    loading: false,
  });
  const [error, setError] = useState();
  const [otp, setOtp] = useState("");

  const authenticateUser = async () => {
    try {
      const authResponse = await fetch(`${SERVERCONFIG.LOGIN_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "kallol@ivistasolutions.com",
          password: "ivista@2023",
        }),
      });

      if (!authResponse.ok) {
        throw new Error("Failed to authenticate");
      }

      const authData = await authResponse.json();
      //setToken(authData.token);
      Cookies.set("token", authData.token, { expires: 1, path: "" }); // expires in 1 day
      return authData.token;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, loading: true });
    if (!formData.email || !validateEmail(formData.email)) {
      setFormData({
        ...formData,
        alertMessage: "Invalid email address. Please enter a valid email.",
        type: "failure",
        loading: false,
      });
      setTimeout(() => {
        setFormData({ ...formData, alertMessage: "" });
      }, 3000);
      return;
    }
    await authenticateUser();
    await fetchedData();
    setFormData({ ...formData, loading: false });
  };

  const fetchedData = async () => {
    const email = formData.email;
    const token = Cookies.get("token");

    try {
      const response = await fetch(
        "https://eoapi.ivistaz.co/api/eoglobal/email/check-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email }), // Include email in the request body
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const jsonData = await response.json();
      //console.log(jsonData);

      if (jsonData.data === "true") {
        const filterData = jsonData.eomembers.filter(
          (item) => item.email === email,
        );
        if (filterData.length > 0) {
          console.log("Email exists in the current array and current offer");
          sessionStorage.setItem(
            "r_TokenMember_Session",
            JSON.stringify(filterData),
          );
          setError("");
          console.log("data fetched");
          sendOtp();
          navigate("/otp-verify");
        } else {
          console.log("Email doesn't exist in the current array");
          setError(
            <Alert
              color="failure"
              icon={HiInformationCircle}
              className="opacity-100 transition-opacity duration-1000"
            >
              <span className="font-medium">
                Registration only open for {jsonData.event[0].chapters}.
              </span>
            </Alert>,
          );
        }
      } else {
        console.log("Email doesn't exist in the database.");
        setError(
          <div
            className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            We couldn't find your email, let's address this right away.
            <p className="pt-4">
              <button
                type="button"
                className="mb-2 rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                Register Here
              </button>
            </p>
          </div>,
        );
      }
    } catch (error) {
      console.error(error.message);
      setFormData({
        ...formData,
        alertMessage: "Error while fetching data",
        type: "failure",
      });
    }
  };
  const sendOtp = async () => {
    const memberName = sessionStorage.getItem("r_TokenMember_Session");
    const fullName = JSON.parse(memberName);
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(generatedOtp);
    //console.log(generatedOtp);
    //console.log(generatedOtp);
    sessionStorage.setItem("verification", generatedOtp);
    const templateParams = {
      to_email: formData.email,
      subject: "RIE 2025 Event Ticket",
      code: generatedOtp,
      name: fullName[0].firstname + " " + fullName[0].lastname,
    };

    emailjs
      .send(
        "default_service",
        "template_81ng8dr",
        templateParams,
        "hsxWBIOu96PDlE41t",
      )
      .then(
        () => {
          console.log("OTP sent successfully!");
        },
        (error) => {
          console.error(error.text);
          alert("Failed to send email.");
        },
      );
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#210657]">
      <div className="w-full lg:w-1/3">
        {formData.loading && <Loader />}
        <div className="flex justify-center mb-7">
        <img src="/logo.svg" className="w-1/2" />
        </div>
        <div className="relative text-center">
          
          
          <h2 className="text-3xl text-white">WELCOME TO</h2>
          <h1 className="hue-animation bg-gradient-to-r from-[#f35626] to-[#feab3a] bg-clip-text text-center text-7xl font-black text-transparent">
            RIE 2025
            </h1>
            
          <p className="font-alexa absolute right-12 top-[80px] text-5xl font-light text-white">
            South Asia
          </p>
        </div>
        <div className="z-0 p-4">
          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                {/* <Label htmlFor="email1" value="Your email" /> */}
              </div>
              <TextInput
                id="email1"
                type="text"
                placeholder="name@example.com"
                sizing="lg"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={formData.alertMessage && "border-red-500"}
              />
            </div>

            <Button type="submit" size="lg" onClick={handleSubmit}>
              Member Login
            </Button>
          </form>
        </div>
        <div className="w-[430px] p-4">
          {formData.alertMessage ? (
            <Alert
              color={formData.type}
              icon={HiInformationCircle}
              className="opacity-100 transition-opacity duration-1000"
            >
              <span className="font-medium">{formData.alertMessage}</span>
            </Alert>
          ) : (
            error && error
          )}
        </div>
      </div>
    </div>
  );
}

export default Index;

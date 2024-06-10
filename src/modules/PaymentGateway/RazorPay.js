import React, { useState, useEffect, useContext } from "react";
import Terms from "./Terms";
// import { AppContext } from "../../context/AppContext";
import Cookies from "js-cookie";
import SERVERCONFIG from "../../server.json";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

function RazorPay({
  amount,
  name,
  phone,
  email,
  address,
  currency,
  fname,
  lname,
  region,
  company,
  symbol,
  voucher,
  expdate,
  spouseid,
  spousestatus,
  eoid,
  // pauseTimer,
  // resumeTimer,
  memcount,
}) {
  const paymentId = sessionStorage.getItem("paymentId");
  const navigate = useNavigate();

  const status = sessionStorage.getItem("r_go");

  useEffect(() => {
    if (status === "false") {
      sessionStorage.setItem("r_go", "true");
    }
  }, []);

  // const { paymentButtonDisable, isClicked, paymentStatus, setPaymentStatus } =
  //   useContext(AppContext);
  const [paymentStatus, setPaymentStatus] = useState();
  const [isClicked, setIsClicked] = useState();
  const [state, setState] = useState({
    paymentRedirect: false,
    paymentId: 0,
    memberRegStatus: "no",
    showModal: false,
  });

  useEffect(() => {
    //console.log(state.paymentId);
  }, [state.paymentId, currency]);

  function updateSpouseStatus() {
    // Retrieve the data from localStorage
    const storedData = sessionStorage.getItem("r_TokenMember_Session");
    if (storedData) {
      // Parse the data
      const userData = JSON.parse(storedData);

      // Update the spouse_status key
      userData.forEach((user) => {
        if (user.id === eoid) {
          // Assuming you want to update the user with id 9
          user.regstatus = "true";
          user.spouse_id = spouseid;
        }
      });
      // Convert the updated data back to a JSON string
      const updatedData = JSON.stringify(userData);
      // Save the updated JSON string back to localStorage
      sessionStorage.setItem("r_TokenMember_Session", updatedData);
      //console.log(userData[0].spouse_status)
    } else {
      console.error("No user data found in localStorage.");
    }
  }

  const getFormatedData = () => ({
    firstname: fname,
    lastname: lname,
    region: region,
    amount: amount,
    email: email,
    phone: phone,
    company: company,
    companyaddr: address,
    symbol: symbol,
    currency: currency,
    voucher: voucher,
    exprdt: expdate,
    spouseid: spouseid ? spouseid : "0",
    spousestatus: spousestatus,
    txnid: paymentId ? paymentId : state.paymentId,
    paymentstatus: paymentStatus ? "success" : "failed",
    memregstatus: state.memberRegStatus ? "yes" : "no",
    eoid: eoid,
    memcount: memcount,
  });

  // const getFormatedData = () => ({
  //   firstname: 'jalal',
  //   lastname: 'hussain',
  //   region: 'SA',
  //   amount: '200',
  //   email: 'jalal1985khan@gmail.com',
  //   phone: '9731415095',
  //   company: 'Intend Innovation',
  //   companyaddr: 'Silchar Assam',
  //   symbol: '$',
  //   currency: 'INR',
  //   voucher: '0',
  //   exprdt: '2026-05-03',
  //   spouseid: 0,
  //   spousestatus: 'false',
  //   txnid: 'pay_OJZhoIDXNWohDh',
  //   // paymentstatus: 'success',
  //   memregstatus: 'yes',
  //   eoid: '9',
  //   memcount:'1'
  // });

  const sendEmail = () => {
    const storedData = sessionStorage.getItem("r_TokenMember_Session");
    const dataInfo = JSON.parse(storedData);
    const sessionFullName = dataInfo[0].firstname + " " + dataInfo[0].lastname;

    //console.log(stateFullName)
    //console.log(sessionFullName)
    // console.log('Member Data:'+storedData.parseJson())

    const templateParams = {
      to_email: email,
      subject: "Thank you for registering with RIE2025",
      name: sessionFullName,
    };

    emailjs
      .send(
        "default_service",
        "template_ah6kbqn",
        templateParams,
        "hsxWBIOu96PDlE41t",
      )
      .then(
        () => {
          console.log("Emailer sent successfully!");
        },
        (error) => {
          console.error(error.text);
          alert("Failed to send email.");
        },
      );
  };

  const handlePayment = async () => {
    const formattedData = getFormatedData();
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${SERVERCONFIG.SUBMIT_URL}payment-info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Log the status and data for debugging
        console.error("Response status:", response.status);
        console.error("Response data:", data);
        throw new Error(data.message || "Failed to send preferences");
      }

      console.log("Form submitted successfully:", data);
      sessionStorage.setItem("Form_submitted", JSON.stringify(data));
      updateSpouseStatus();
      //sessionStorage.removeItem('Form_error');
    } catch (error) {
      console.error("Error sending preferences:", error.message);
      sessionStorage.setItem("Form_error", JSON.stringify(formattedData));
      //sessionStorage.removeItem('Form_submitted');
      updateSpouseStatus();
    }
  };

  const options = {
    key: SERVERCONFIG.RAZORPAY_KEYID,
    amount: amount * 100,
    currency: currency,
    name: "RIE 2025",
    description: "RIE 2025 Event Ticket",
    image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
    handler: function (response) {
      if (response && response.razorpay_payment_id) {
        sessionStorage.setItem("paymentId", response.razorpay_payment_id);
        const paymentId = response.razorpay_payment_id;
        setState((prevState) => ({
          ...prevState,
          paymentId: paymentId,
          memberRegStatus: "yes",
          paymentRedirect: "yes",
        }));

        setPaymentStatus(true);
      } else {
        setPaymentStatus(false);
        setState((prevState) => ({
          ...prevState,
          memberRegStatus: "no",
          paymentRedirect: "yes",
        }));
      }
    },
    prefill: {
      name: name,
      contact: phone,
      email: email,
    },
    notes: {
      address: address,
    },
    theme: {
      color: "#653BC0",
      hide_topbar: false,
    },
    modal: {
      ondismiss: function () {
        // Resume the timer if the modal is dismissed
        //resumeTimer();
      },
    },
  };

  const openPayModal = () => {
    //pauseTimer();
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (state.paymentId) {
      handlePayment();
      sendEmail();
    }
  }, [state.paymentId]); // Call handlePayment only when paymentId changes

  useEffect(() => {
    if (state.paymentRedirect) {
      navigate("/payment-status");
    }
  }, [state.paymentRedirect, navigate]);

  const handleTermsModal = () => {
    setState((prevState) => ({
      ...prevState,
      showModal: !prevState.showModal,
    }));
  };

  return (
    <>
      <div className="flex w-full flex-col items-center lg:w-[50%]">
        {state.showModal && <Terms />}
        <div className="mb-6 flex w-11/12 items-center justify-between rounded-lg bg-white p-4 drop-shadow">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="payment"
              id="paymentMethod2"
              checked={true}
              readOnly
            />
            <label htmlFor="paymentMethod2" className="text-xl font-semibold">
              Razorpay
            </label>
          </div>
          <img src="/RazorpayLogo.png" className="h-4" alt="" />
        </div>
      </div>
      <div className="w-full rounded-t-2xl bg-white p-6 text-center drop-shadow-md md:rounded-2xl lg:w-[50%]">
        <div className="flex w-full items-center py-4 lg:w-[90%]">
          <label
            htmlFor="link-checkbox"
            className="text-1xl ms-2 font-medium text-blue-600 hover:underline dark:text-blue-500"
            onClick={handleTermsModal}
          >
            Read the Terms and Conditions.
          </label>
        </div>
        {console.log(status)}
        <button
          className={`w-full rounded-3xl py-2 text-lg text-white  ${status === "false" ? "cursor-not-allowed bg-gray-400 hover:bg-gray-400" : "bg-[#653BC0] "}`}
          onClick={openPayModal}
          disabled={status === "false"}
        >
          {state.paymentRedirect ? (
            <>
              <svg
                aria-hidden="true"
                role="status"
                className="me-3 inline size-4 animate-spin text-gray-200 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                />
              </svg>{" "}
              Please wait....
            </>
          ) : (
            <>Proceed to Pay</>
          )}
        </button>
        Amount:{amount}
        Fullname:{name}
        Phone:{phone}
        Email:{email}
        Address:{address}
        Currency:{currency}
        First:{fname}
        Last:{lname}
        Region:{region}
        Company:{company}
        Symbol:{symbol}
        Voucher:{voucher}
        Expiry:{expdate}
        SpouseID:{spouseid}
        SpouseStatus:{spousestatus}
        eoid:{eoid}
      </div>
    </>
  );
}

export default RazorPay;

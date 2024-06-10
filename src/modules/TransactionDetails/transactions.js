import React, { useState, useContext } from "react";

const TransactionDetails = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  //   const { memberData, token, setTransactionDetails, transactionDetails } =
  //     useContext(AppContext)
  const sessionPaymentInfo = sessionStorage.getItem("r_transactions");
  const memberPaymentData = JSON.parse(sessionPaymentInfo);

  const sessionMemberPref = sessionStorage.getItem("member_preference");
  const memberPrefData = JSON.parse(sessionMemberPref);

  const sessionDataInfo = sessionStorage.getItem("r_TokenMember_Session");
  const memberDataInfo = JSON.parse(sessionDataInfo);

  const sessionMemberInfo = sessionStorage.getItem("r_TokenMember_Info");
  const memberInfo = JSON.parse(sessionMemberInfo);

  // console.log(memberPaymentData)

  const handleToggle = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based in JavaScript
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  };
  const formattedDate = formatDate(memberPaymentData[0].updated_at);

  const formatTime = (dateString) => {
    const date = new Date(dateString);

    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };
  const formattedTime = formatTime(memberPaymentData[0].updated_at);

  return (
    <div className="flex min-h-screen flex-col p-6 lg:bg-[#F9F6FF] ">
      <div className="m-auto flex w-11/12 flex-col rounded-xl bg-[#FDFDFD] lg:w-1/3 lg:p-4">
        <div className="mb-5 flex flex-col items-center space-y-3">
          <img src="/payment.png" alt="transaction" className="size-24" />
          <h2 className="text-3xl font-semibold ">
            {memberPaymentData[0].symbol}
            {memberPaymentData[0].amount}
          </h2>
          <p className="text-sm text-[#646464]">
            {memberPaymentData[0].paymentstatus === "success"
              ? "Completed!"
              : "Failed!"}
          </p>
        </div>
        <div className="mb-5 flex justify-between rounded-xl border border-gray-300 p-4">
          <ul className="space-y-3 text-gray-400">
            <li>Transaction Status</li>
            <li>Transaction Type</li>
            <li>Date</li>
            <li>Time</li>
            <li>Transaction ID</li>
            <li>Member Registration</li>
            <li>SLP Registration</li>
          </ul>

          <ul className="space-y-3">
            {memberPaymentData[0].paymentstatus === "success" ? (
              <li className="text-green-500">Successful</li>
            ) : (
              <li className="text-red-500">Failed</li>
            )}

            <li>Online</li>
            <li>{formattedDate}</li>
            <li>{formattedTime}</li>
            <li>{memberPaymentData[0].txnid}</li>
            <li>
              {memberPaymentData[0].txnid != ""
                ? "Completed"
                : "Not registered"}
            </li>
            <li>
              {memberPaymentData[0].spouseid != 0
                ? "Completed"
                : "Not registered"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;

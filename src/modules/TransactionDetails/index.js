import React, { useState, useEffect } from "react";
import {
  angleDown,
  angleUp,
  question,
  refund,
  signOut,
  transaction,
} from "../../utils/icons";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SERVERCONFIG from "../../server.json";
import Loader from "../../components/Loader";

const DataList = () => {
  const data = sessionStorage.getItem("Form_submitted_t");
  const parseData = JSON.parse(data);
  const memberData = sessionStorage.getItem("r_TokenMember_Info");
  const parseMemberData = JSON.parse(memberData);
  const navigate = useNavigate();

  const handleDetails = (id) => {
    //alert(id);
    const filterData = parseData.filter((item) => item.id === id);
    sessionStorage.setItem("r_transactions", JSON.stringify(filterData));
    //console.log(filterData)
    navigate("/transactions/");
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-2 lg:bg-[#F9F6FF]">
      <div className="flex w-11/12 flex-col rounded-xl bg-[#FDFDFD] lg:w-1/2 lg:p-4">
        <div className="mb-1 flex flex-col items-center space-y-3">
          {/* <img src="/payment.png" alt="transaction" className="w-24 h-24" />
        <h2 className="text-3xl font-medium ">
         No transaction found
          </h2> */}

          <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700">
            {parseData.map((item) => (
              <li
                className="py-3 hover:cursor-pointer hover:bg-slate-100 sm:py-4"
                key={item.id}
                onClick={() => handleDetails(item.id)}
              >
                <div className="flex items-center space-x-4 p-3 rtl:space-x-reverse">
                  <div className="shrink-0">
                    <img
                      className="size-8 rounded-full"
                      src="/profile.png"
                      alt="Neil image"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      {item.firstname} {item.lastname}
                    </p>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                      {item.email}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {item.symbol}
                    {item.amount}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DataList;

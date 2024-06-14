import React, { useState, useEffect } from "react";
import { Card, Button } from "flowbite-react";
import NoTransaction from "../../components/NoTransactions";

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

const Dashboard = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const storedData = sessionStorage.getItem("r_TokenMember_Session");
  const storedParsedData = JSON.parse(storedData);
  const storedDataInfo = sessionStorage.getItem("r_TokenMember_Info");
  const sessionMemberInfo = JSON.parse(storedDataInfo);
  const [state, setState] = useState({
    profileMenu: false,
    memberId: "",
    memberEmail: "",
    memberFirstName: "",
    memberLastName: "",
    memberRegistrationStat: false,
    memberRegStatus: false,
  });
  const isRegistered = storedParsedData[0].regstatus;
  const isMemberId = storedParsedData[0].id;
  const gender = storedParsedData[0].gender;

  // const storedSessionData = sessionStorage.getItem('r_TokenMember_Session');
  // const storedSessionDataInfo = sessionStorage.getItem('r_TokenMember_Info');
  // const storedDataSessionId = sessionStorage.getItem('r_TokenId_Session');
  //console.log(storedDataInfo)
  const [noTrans, setNoTrans] = useState(false);

  const getTransactionDetails = async () => {
    //console.log(state.memberId)
    setLoader(true);
    const token = Cookies.get("token");
    const url = `${SERVERCONFIG.SUBMIT_URL}payment-info/${isMemberId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      //console.log(data);

      const paymentInfo = data.paymentinfo.filter(
        (item) => item.eoid === isMemberId,
      );
      sessionStorage.setItem("Form_submitted_t", JSON.stringify(paymentInfo));

      const rieMember = data.riemember.filter(
        (item) => item.eoid === isMemberId,
      );
      sessionStorage.setItem("r_TokenMember_Info_t", JSON.stringify(rieMember));

      const rieMemberPref = data.riememberpref.filter(
        (item) => item.eoid === isMemberId,
      );
      sessionStorage.setItem(
        "r_TokenMember_Pref_t",
        JSON.stringify(rieMemberPref),
      );

      const slpRegistration = data.slpregistration.filter(
        (item) => item.eoid === isMemberId,
      );
      sessionStorage.setItem(
        "r_TokenMember_Slp_t",
        JSON.stringify(slpRegistration),
      );

      const slpPref = data.slppref.filter((item) => item.eoid === isMemberId);
      sessionStorage.setItem(
        "r_TokenMember_SlpPref_t",
        JSON.stringify({ slppref: slpPref }),
      );
      if (
        paymentInfo.length > 0 &&
        rieMember.length > 0 &&
        rieMemberPref.length > 0 &&
        slpRegistration.length > 0 &&
        slpPref.length > 0
      ) {
        setLoader(false);
        navigate("/transaction-details/");
        //return data
      } else {
        setLoader(false);
        console.log("no payment history");
        setNoTrans(true);
      }
    } catch (error) {
      console.error("Failed to fetch transaction details:", error);
      setLoader(false);
    }
  };

  const toggleProfileMenu = () => {
    setState((prevState) => ({
      ...prevState,
      profileMenu: !prevState.profileMenu,
    }));
  };

  useEffect(() => {
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setState((prevState) => ({
          ...prevState,
          memberId: parsedData[0].id,
          memberEmail: parsedData[0].email,
          memberFirstName: parsedData[0].firstname,
          memberLastName: parsedData[0].lastname,
          memberRegStatus: parsedData[0].regstatus,
        }));
      } catch (error) {
        console.error("Error parsing sessionStorage data", error);
      }
    }
  }, [storedData]);

  const addSlp = () => {
    sessionStorage.setItem("r_MemberCount", 1);
    sessionStorage.setItem("r_SlpOnly", true);
    const memberInfo = sessionStorage.getItem("r_TokenMember_Session");
    const parseMemberInfo = JSON.parse(memberInfo);
    // const gst = 18;
    // const memberFee = parseMemberInfo[0].region === "SA" ? 49000 : 2500;
    const slpFee =
      parseMemberInfo[0].region === "SA"
        ? SERVERCONFIG.SLP_FEE
        : SERVERCONFIG.SLP_FEE_USD;
    const memberSlpPayable = (slpFee * 18) / 100;
    const newMemberInfo = {
      fee: slpFee,
      gst: 18,
      payableAmount: memberSlpPayable,
      memberCount: 1,
    };
    sessionStorage.setItem(
      "memberInfo",
      JSON.stringify({
        memberFee: newMemberInfo.fee,
        memberCount: newMemberInfo.memberCount,
        gst: newMemberInfo.gst,
        payableAmount: newMemberInfo.payableAmount,
      }),
    );

    sessionStorage.setItem(
      "stepping",
      JSON.stringify({
        step1: 1,
        step2: 2,
        step3: 3,
        step4: 4,
        step5: 5,
        step6: 6,
        endCount1: 4,
        endCount2: 6,
      }),
    );

    navigate("/slp-info");
  };

  const handleSignOut = () => {
    setLoader(true);
    Cookies.remove("token");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("r_TokenMember_Slp");
    sessionStorage.removeItem("r_TokenMember_Session");
    sessionStorage.removeItem("runningPackages");
    sessionStorage.removeItem("verification");
    sessionStorage.removeItem("r_currEBird");
    sessionStorage.removeItem("r_TokenMember_Pref");
    sessionStorage.removeItem("r_Finalstatus");
    sessionStorage.removeItem("paymentId");
    sessionStorage.removeItem("r_TokenMember_SlpPref");
    sessionStorage.removeItem("Form_submitted");
    sessionStorage.removeItem("Form_error");
    sessionStorage.removeItem("r_TokenMember_Contact");
    sessionStorage.removeItem("r_TokenMember_Info");
    sessionStorage.removeItem("memberInfo");

    sessionStorage.removeItem("r_TokenId_Session");
    sessionStorage.removeItem("r_TokenMember_Info");
    sessionStorage.removeItem("r_currPayable");
    sessionStorage.removeItem("r_voucher");
    sessionStorage.removeItem("r_MemberCount");
    sessionStorage.removeItem("r_currMember");
    sessionStorage.removeItem("claimed_voucher");
    sessionStorage.removeItem("r_voucherStatus");
    sessionStorage.removeItem("runningPackages");
    sessionStorage.removeItem("r_TokenMember_Pref");
    sessionStorage.removeItem("r_TokenMember_Info");
    sessionStorage.removeItem("r_TokenMember_Slp");
    sessionStorage.removeItem("r_TokenMember_SlpPref");

    sessionStorage.removeItem("r_transactions");
    sessionStorage.removeItem("r_TokenMember_Pref_t");
    sessionStorage.removeItem("r_TokenMember_SlpPref_t");

    sessionStorage.removeItem("Form_submitted_t");
    sessionStorage.removeItem("r_TokenMember_Slp_t");
    sessionStorage.removeItem("r_TokenMember_Info_t");

    navigate("/");
  };

  const closeStatus = () => {
    setNoTrans(!noTrans);
  };

  return (
    <div className="flex  min-h-screen flex-col p-0 pt-6 lg:bg-slate-200">
      <div className="sm:w-1/1 m-auto flex w-11/12 flex-col rounded-xl bg-[#FDFDFD] md:w-1/2 lg:p-4">
        <div
          className="flex w-full items-center  justify-between rounded-xl border border-[#C5C5C5] bg-[#F7F7F9] px-3 py-4"
          onClick={toggleProfileMenu}
        >
          <div className="flex items-center gap-2">
            <div className="bg-custom-gradient flex items-center justify-center rounded-full">
              {gender === "m" ? (
                <img
                  src="/male.png"
                  alt={
                    storedParsedData[0].firstname +
                    "" +
                    storedParsedData[0].lastname
                  }
                  className="size-8"
                />
              ) : (
                <img
                  src="/female.png"
                  alt={
                    storedParsedData[0].firstname +
                    "" +
                    storedParsedData[0].lastname
                  }
                  className="size-8"
                />
              )}
            </div>
            <h1 className="text-lg">
              {storedParsedData[0].firstname} {storedParsedData[0].lastname}
            </h1>
          </div>
          <div>
            {state.profileMenu ? (
              <span>{angleUp}</span>
            ) : (
              <span>{angleDown}</span>
            )}
          </div>
        </div>

        <Card className="my-4 flex w-full text-center">
          {isRegistered ? (
            <>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                We are so excited!
              </h5>
              <p>
                Thank you once again for your enthusiasm and commitment. We look
                forward to welcoming you to RIE 2025 and embarking on this
                incredible journey together.
              </p>
              <Button className="w-full">More Information Coming Soon!</Button>
            </>
          ) : (
            <>
              <h5 className="text-xl text-black">You are not registered</h5>
              <p className="text-black">Did you encounter any issues?</p>
              <p className="text-black">Contact Support?</p>
            </>
          )}
        </Card>

        <div className="relative my-0 flex items-end justify-center rounded-xl">
          <div
            className={`${
              state.profileMenu ? "block" : "hidden"
            } absolute rounded-2xl bg-white p-3 
            ${storedParsedData[0].spouse_id > 0 ? "-bottom-[10px]" : "-bottom-[40px]"}
               w-full space-y-4 drop-shadow-2xl`}
          >
            <div className="flex items-center gap-2">
              <div className="bg-custom-gradient flex items-center justify-center rounded-full">
                {gender === "m" ? (
                  <img src="/male.png" alt="profile" className="size-8" />
                ) : (
                  <img src="/female.png" alt="profile" className="size-8" />
                )}
              </div>
              <div>
                <h1 className="text-lg">
                  {storedParsedData[0].firstname} {storedParsedData[0].lastname}
                </h1>
                <p className="text-[#999]">{storedParsedData[0].email}</p>
              </div>
            </div>
            <hr className="w-full" />
            {/* <div className="flex items-center gap-2">
              <span className="text-lg">{refund}</span>
              <button className="text-lg">Refund / Transfer</button>
            </div> */}
            <div className="flex items-center gap-2">
              <span className="text-lg">{transaction}</span>

              <button className="text-lg" onClick={getTransactionDetails}>
                Transaction
              </button>
            </div>
            {storedParsedData[0].spouse_id > 0 ? (
              ""
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-lg">{question}</span>
                <button className="text-lg" onClick={addSlp}>
                  Add SLP
                </button>
              </div>
            )}

            <hr className="w-full" />
            <div className="flex items-center gap-2">
              <span className="text-lg">{signOut}</span>
              <button className="text-lg" onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          </div>
        </div>

        <h1 className="py-4 text-xl font-semibold">About RIE 2025</h1>
        <Card className="w-full" imgAlt="RIE Events 2025" imgSrc="/event.jpeg">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Once in a lifetime experience
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            A regional event that provides an opportunity for South Asian
            entrepreneurs to meet and connect. All this around intense learning
            and phenomenal parties. Just Turn Up and Tune In.
          </p>
        </Card>
      </div>
      {loader && <Loader />}
      <NoTransaction status={noTrans} onClick={closeStatus} />
    </div>
  );
};

export default Dashboard;

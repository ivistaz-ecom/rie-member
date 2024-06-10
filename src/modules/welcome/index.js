import React, { useState, useEffect } from "react";
import { Card } from "flowbite-react";
import { GoPerson } from "react-icons/go";
import { GoPersonAdd } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import SERVERCONFIG from "../../server.json";

function Index() {
  const navigate = useNavigate();
  const memberInfo = sessionStorage.getItem("r_TokenMember_Session");
  const parseMemberInfo = JSON.parse(memberInfo);
  const gst = 18;
  const memberFee =
    parseMemberInfo[0].region === "SA"
      ? SERVERCONFIG.MEMBER_FEE
      : SERVERCONFIG.MEMBER_FEE_USD;
  const slpFee =
    parseMemberInfo[0].region === "SA"
      ? SERVERCONFIG.SLP_FEE
      : SERVERCONFIG.SLP_FEE_USD;
  const totalFee = parseInt(memberFee) + parseInt(slpFee);
  const memberPayable = (memberFee * SERVERCONFIG.GST) / 100;
  const memberSlpPayable = (totalFee * SERVERCONFIG.GST) / 100;
  //console.log(memberPayable);
  const memberOnly = () => {
    const newMemberInfo = {
      fee: parseInt(memberFee),
      gst: SERVERCONFIG.GST,
      payableAmount: memberPayable,
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
    navigate("/member-registration");
  };

  const memberSlp = () => {
    const newMemberInfo = {
      fee: parseInt(memberFee),
      slp: parseInt(slpFee),
      memberCount: 2,
      gst: SERVERCONFIG.GST,
      payableAmount: memberSlpPayable,
    };
    sessionStorage.setItem(
      "memberInfo",
      JSON.stringify({
        memberFee: newMemberInfo.fee,
        memberCount: newMemberInfo.memberCount,
        slpFee: newMemberInfo.slp,
        gst: newMemberInfo.gst,
        payableAmount: newMemberInfo.payableAmount,
      }),
    );
    navigate("/member-registration");
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#210657]">
      <div className="text-center">
        <h2 className="text-1xl font-semibold text-white lg:text-2xl">
          Please choose the type of registration.
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 place-self-center p-4 lg:grid-cols-2">
        <Card
          className="hover: mx-auto w-[300px] cursor-pointer border-0 text-center hover:bg-[#155E75] hover:text-white"
          onClick={memberOnly}
        >
          <GoPerson size={50} className="mx-auto" />
          <h5 className="text-center text-2xl font-bold tracking-tight dark:text-white">
            Member
          </h5>
          <p>Registraion</p>
        </Card>
        <Card
          href="#"
          className="mx-auto w-[300px] border-0 text-center hover:bg-[#155E75] hover:text-white"
          onClick={memberSlp}
        >
          <GoPersonAdd size={50} className="mx-auto" />
          <h5 className="text-center text-2xl font-bold tracking-tight  dark:text-white">
            Member + SLP
          </h5>
          <p className="">Registraions</p>
        </Card>
      </div>
    </div>
  );
}

export default Index;

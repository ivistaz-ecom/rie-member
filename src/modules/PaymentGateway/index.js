import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import confetti from "canvas-confetti";
import RazorPay from "./RazorPay";
import SERVERCONFIG from "../../server.json";
import Loader from "../../components/Loader";
import Cookies from "js-cookie";
import Stepper from "../../components/Stepper";
// const currDate = newDate();

// const paymentDetails = [
//   {
//     gstPercentage: '18',
//   }
// ];

const GST_PERCENTAGE = 18;
const INITIAL_TIME = 30; // 1 minute in seconds

// Store data in state
const PaymentGateway = () => {
  const memberInfo = sessionStorage.getItem("r_TokenMember_Session");
  const parseMemberInfo = JSON.parse(memberInfo);

  const memberDataInfo = sessionStorage.getItem("r_TokenMember_Info");
  const parseMemberDataInfo = JSON.parse(memberDataInfo);

  const memberData = sessionStorage.getItem("memberInfo");
  const parseMemberData = JSON.parse(memberData);
  const memberSLPData = sessionStorage.getItem("r_TokenMember_Slp");
  const parseMemberSLPData = JSON.parse(memberSLPData);

  const memberTotal = sessionStorage.getItem("memberInfo");
  const parseMemberTotal = JSON.parse(memberTotal);
  const memberCount = parseMemberTotal.memberCount;

  const stepping = sessionStorage.getItem("stepping");
  const steps = JSON.parse(stepping);

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const isExpired = parseMemberInfo[0].exprdt < formattedDate ? true : false;
  const [isVoucherClaimed, setIsVoucherClaimed] = useState(false);

  const phone = memberDataInfo
    ? parseMemberDataInfo.riemembers.mobile
    : parseMemberSLPData.slp.mobile;
  const company = memberDataInfo
    ? parseMemberDataInfo.riemembers.company
    : parseMemberSLPData.slp.company;
  const address = memberDataInfo
    ? parseMemberDataInfo.riemembers.addr1
    : parseMemberSLPData.slp.addr1;

  const memberFee = parseInt(parseMemberData.memberFee);
  const slpFee = parseMemberData.slpFee ? parseInt(parseMemberData.slpFee) : 0;
  const totalAmount = memberFee + slpFee;
  const payableGST = parseInt(parseMemberData.gst);
  const includingGST = (totalAmount * payableGST) / 100;
  const chargeableAmount = totalAmount + includingGST;

  const fullName =
    parseMemberInfo[0].firstname + " " + parseMemberInfo[0].lastname;

  const email = parseMemberInfo[0].email;

  const currency = parseMemberInfo[0].region === "SA" ? "INR" : "USD";
  const firstName = parseMemberInfo[0].firstname;
  const lastName = parseMemberInfo[0].lastname;
  const region = parseMemberInfo[0].region;

  const symbol = parseMemberInfo[0].region === "SA" ? "₹" : "$";
  const voucher = parseInt(parseMemberInfo[0].voucher_amt);
  const expdate = parseMemberInfo[0].exprdt;
  const spouseid = parseMemberSLPData ? parseMemberSLPData.slp.id : "0";
  const status = "false";
  const id = parseMemberInfo[0].id;
  const totalMember = parseMemberData.memberCount;

  const [voucherAmt, setVoucherAmt] = useState("0.00");

  useEffect(() => {
    // Retrieve voucher amount from session storage
    const storedData = JSON.parse(
      sessionStorage.getItem("r_TokenMember_Session"),
    );
    if (storedData) {
      setVoucherAmt(storedData[0].voucher_amt); // Assuming only one object is stored
    }
  }, []);

  const updateVoucherAmount = (newAmount) => {
    setVoucherAmt(newAmount);
    // Update voucher amount in session storage
    sessionStorage.setItem(
      "r_TokenMember_Session",
      JSON.stringify([
        {
          ...JSON.parse(sessionStorage.getItem("r_TokenMember_Session"))[0],
          voucher_amt: newAmount,
        },
      ]),
    );
  };

  const renderVoucher = () => (
    <>
      <div className="card relative h-[150px] w-full overflow-hidden rounded-lg bg-white p-8 px-12 py-5  drop-shadow-sm lg:w-[70%]">
        <div className="main flex items-center justify-between px-2.5 py-2">
          <div className="co-img">
            <img
              src="/gift.png"
              alt=""
              className="size-[50px] animate-bounce"
            />
            <p className="text-[14px]">Expiry date</p>
            <p className="text-[13px]">
              {memberInfo && parseMemberInfo[0].exprdt}
            </p>

            <p className="text-center text-[13px] text-red-600">(Expired)</p>
          </div>
          <div className="vertical absolute left-[50%] h-full border-l-2 border-dotted border-black"></div>
          <div className="text-center">
            <h2
              className={`text-2xl font-semibold transition duration-150 ease-out hover:ease-in`}
            >
              {memberInfo && parseMemberInfo[0].voucher_amt}
            </h2>

            <button
              type="button"
              className={`mb-2 me-2 mt-4 rounded-full bg-[#612ADB] px-8 py-2.5 text-sm text-white hover:bg-[#612ADB] ${isExpired ? "cursor-not-allowed bg-gray-400 hover:bg-gray-400" : ""}`}
              //   onClick={handleVoucher}
              disabled={isExpired}
            >
              {isExpired ? (
                "Expired"
              ) : (
                <>{isVoucherClaimed ? "Redeemed" : "Redeem"}</>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* <small className='mb-14'>The voucher will be converted to INR upon redemption.</small> */}
    </>
  );

  const renderPaymentDetails = () => (
    <div
      className={`mt-12 flex w-full flex-col space-y-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 p-3`}
    >
      <h2 className="text-xl font-semibold text-white">Payment Details</h2>
      <div>
        <div className="flex w-full items-center justify-between">
          <p className="text-gray-200">Member Fee</p>
          <p className="text-gray-200">
            {symbol}
            {parseMemberData.memberFee}
          </p>
        </div>
        {parseMemberData.memberCount > 1 && (
          <div className="flex w-full items-center justify-between">
            <p className="text-gray-200">SLP Fee</p>
            <p className="text-gray-200">
              {symbol}
              {parseMemberData.slpFee}
            </p>
          </div>
        )}
        {/* <div className="flex w-full items-center justify-between">
          <p className="text-gray-200">Early Bird</p>
          <p className="text-gray-200">200</p>
        </div> */}
        {parseMemberInfo[0].voucher_amt > 0 && (
          <div className="flex w-full items-center justify-between">
            <p className="text-gray-200">Voucher:</p>
            <p className="text-gray-200">{parseMemberInfo[0].voucher_amt}</p>
          </div>
        )}
        <div className="flex w-full items-center justify-between">
          <p className="text-gray-200">Payable Amount:</p>
          <p className="text-gray-200">
            {symbol}
            {totalAmount}
          </p>
        </div>
        <div className="flex w-full items-center justify-between">
          <p className="text-gray-200">GST({GST_PERCENTAGE}%):</p>
          <p className="text-gray-200">
            {symbol}
            {includingGST}
          </p>
        </div>
        <div className="flex w-full items-center justify-between">
          <p className="text-xl font-semibold text-white">Total Amount</p>
          {/* <p className="text-2xl text-white font-semibold">{state.currencySymbol} {state.earlyBirdEnable ? (parseInt(tAmount) - parseInt(tEarlyAmount) - parseInt(tVoucher) + parseInt(tGst)) : parseInt(tAmount) - parseInt(tVoucher) + parseInt(tGst)}</p> */}
          <p className="text-2xl font-semibold text-white">
            {symbol}
            {chargeableAmount}
          </p>
        </div>
        {/* <p className='text-gray-200 text-[11px] text-right' data-modal-target="default-modal" data-modal-toggle="default-modal">(T&C apply)</p> */}
      </div>
    </div>
  );

  return (
    <div className="poppins-light flex min-h-screen flex-col items-center justify-center bg-[#F9F6FF] pt-6 ">
      {/* <Stepper
        steps={memberCount > 1 ? steps.endCount2 : steps.endCount1}
        total={memberCount > 1 ? steps.endCount2 : steps.endCount1}
      /> */}
      {parseMemberInfo[0].voucher_amt > 0 && isExpired === false && (
        <h1 className="mb-5 text-2xl font-bold text-[#3F3D56]">Voucher</h1>
      )}

      <div className="flex w-full flex-col items-center p-4 lg:w-[50%]">
        {parseMemberInfo[0].voucher_amt > 0 &&
          isExpired === false &&
          renderVoucher()}

        {renderPaymentDetails()}

        <hr className="mt-3 w-full bg-indigo-700 bg-opacity-20" />
      </div>
      <button
        className="mb-2 me-2 mt-4 rounded-full bg-[#612ADB] px-8 py-2.5 text-sm text-white hover:bg-[#612ADB]"
        onClick={() => updateVoucherAmount("10.00")}
      >
        Memeber Voucher {parseMemberInfo[0].voucher_amt}
      </button>
      {/* <small>Only for developer use</small>
      <button
        className="mb-2 me-2 mt-4 rounded-full bg-[#612ADB] px-8 py-2.5 text-sm text-white hover:bg-[#612ADB]"
        onClick={handleMember}
      >
        Test Case (Member Voucher)
      </button> */}
      <h1 className="my-5 text-2xl font-bold text-[#3F3D56]">Payment Method</h1>
      {/* {state.memberPhone} */}
      <br />
      <RazorPay
        amount={chargeableAmount}
        name={fullName}
        phone={phone}
        email={email}
        address={address}
        currency={currency}
        fname={firstName}
        lname={lastName}
        region={region}
        company={company}
        symbol={symbol}
        voucher={voucher}
        expdate={expdate}
        spouseid={spouseid}
        spousestatus={status}
        eoid={id}
        // pauseTimer={pauseTimer}
        // resumeTimer={resumeTimer}
        memcount={totalMember}
      />
      {/* {loader && <Loader />} */}
    </div>
  );
};

export default PaymentGateway;

import React, { useState,useContext } from 'react'
import BackButton from '../../components/BackButton'
import { AppContext } from '../../context/AppContext'


const TransactionDetails = () => {
  const [expandedSection, setExpandedSection] = useState(null)
  const { memberData, token, setTransactionDetails, transactionDetails } = useContext(AppContext)
  const sessionPaymentInfo = sessionStorage.getItem('Form_submitted');
  const memberPaymentData = JSON.parse(sessionPaymentInfo)
  const sessionDataInfo = sessionStorage.getItem('r_TokenMember_Session');
  const memberDataInfo = JSON.parse(sessionDataInfo)
  //const sessionMemberInfo = sessionStorage.getItem('r_TokenMember_Info');
  //const memberInfo = JSON.parse(sessionMemberInfo)

  //console.log(memberPaymentData)

  const handleToggle = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based in JavaScript
    const year = date.getUTCFullYear(); 
    return `${day}-${month}-${year}`;
  };
  const formattedDate = formatDate(memberPaymentData[0].updated_at);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds}`;
  };
  const formattedTime = formatTime(memberPaymentData[0].updated_at);

  return (
    <div className="lg:bg-[#F9F6FF] min-h-screen flex flex-col p-1 pt-8">
      <div className="mb-4">
        <BackButton title="Transaction Details" textColor="text-black" />
      </div>
      <div className="w-11/12 lg:w-1/3 flex flex-col m-auto bg-[#FDFDFD] lg:p-4 rounded-xl">
        <div className="flex flex-col items-center space-y-3 mb-5">
          <img src="/payment.png" alt="transaction" className="w-24 h-24" />
          <h2 className="text-3xl font-semibold ">{memberPaymentData[0].symbol}
          {memberPaymentData[0].amount}</h2>
          <p className="text-sm text-[#646464]">
          {memberPaymentData[0].paymentstatus ==='success' ?'Completed!':'Failed!'}</p>
        </div>
        <div className="border border-gray-300 rounded-xl p-4 flex justify-between mb-5">
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
          {memberPaymentData[0].paymentstatus ==='success' ?<li className="text-green-500">Successful</li>:<li className="text-red-500">Failed</li>}
            
            <li>Online</li>
            <li>{formattedDate}</li>
            <li>{formattedTime}</li>
            <li>{memberPaymentData[0].txnid}</li>
            <li>{memberPaymentData[0].txnid !=''?'Completed':'Not registered'}</li>
            <li>{memberPaymentData[0].spouseid != 0 ? 'Completed': 'Not registered'}</li>
          </ul>
        </div>

        <div id="accordion-open" data-accordion="open">
          <h2 id="accordion-open-heading-1">
            <button
              type="button"
              className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
              data-accordion-target="#accordion-open-body-1"
              aria-expanded={expandedSection === 'section1'}
              aria-controls="accordion-open-body-1"
              onClick={() => handleToggle('section1')}
            >
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 me-2 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>{' '}
                Member Details
              </span>
              <svg
                data-accordion-icon
                className={`w-3 h-3 shrink-0 transition-transform ${
                  expandedSection === 'section1' ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-open-body-1"
            className={`${
              expandedSection === 'section1' ? 'block' : 'hidden'
            } transition-all duration-300`}
            aria-labelledby="accordion-open-heading-1"
          >
            <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
              <div className='pb-4'>
              <h2 className='space-y-3 text-gray-400'>Member Details</h2>
                <hr />
                </div>
              <div className="flex justify-between">
                <ul className="space-y-3 text-gray-400">
                  <li>Full Name</li>
                  <li>Email</li>
                  <li>Phone</li>
                  <li>Gender</li>
                  <li>Region</li>
                  <li>Chapter</li>
                  <li>Joined Date</li>
                  <li>Industry</li>
                  <li>Company Name</li>
                  <li>Invoice Address</li>
                  <li>Voucher(USD)</li>
                  <li>Claimed Voucher(INR)</li>
                </ul>
                <ul className="space-y-3">
                  <li>{memberPaymentData[0].firstname} {memberPaymentData[0].lastname}</li>
                  <li>{memberPaymentData[0].email}</li>
                  <li>{memberPaymentData[0].phone}</li>
                  <li>{memberDataInfo[0].gender === 'm' ? 'Male' : 'Female'}</li>
                  <li>{memberPaymentData[0].region}</li>
                  <li>{memberDataInfo[0].chapters}</li>
                  <li>{memberDataInfo[0].joindt}</li>
                  <li>{memberDataInfo[0].industry}</li>
                  <li>{memberPaymentData[0].company}</li>
                  <li>{memberPaymentData[0].companyaddr}</li>
                  <li>${memberDataInfo[0].voucher_amt}</li>
                  <li>{memberPaymentData[0].symbol}{memberPaymentData[0].voucher}</li>
                </ul>
              </div>

              <div className='py-4'>
              <h2 className='space-y-3 text-gray-400'>Member Preferences</h2>
                <hr className='mt-4' />
              </div>
              
              <div className="flex justify-between">
                <ul className="space-y-3 text-gray-400">
                  <li>Full Name</li>
                  <li>Email</li>
                  <li>Phone</li>
                  <li>Gender</li>
                  <li>Region</li>
                  <li>Chapter</li>
                  <li>Joined Date</li>
                  <li>Industry</li>
                  <li>Company Name</li>
                  <li>Invoice Address</li>
                  <li>Voucher(USD)</li>
                  <li>Claimed Voucher(INR)</li>
                </ul>
                <ul className="space-y-3">
                  <li>{memberPaymentData[0].firstname} {memberPaymentData[0].lastname}</li>
                  <li>{memberPaymentData[0].email}</li>
                  <li>{memberPaymentData[0].phone}</li>
                  <li>{memberDataInfo[0].gender === 'm' ? 'Male' : 'Female'}</li>
                  <li>{memberPaymentData[0].region}</li>
                  <li>{memberDataInfo[0].chapters}</li>
                  <li>{memberDataInfo[0].joindt}</li>
                  <li>{memberDataInfo[0].industry}</li>
                  <li>{memberPaymentData[0].company}</li>
                  <li>{memberPaymentData[0].companyaddr}</li>
                  <li>${memberDataInfo[0].voucher_amt}</li>
                  <li>{memberPaymentData[0].symbol}{memberPaymentData[0].voucher}</li>
                </ul>
              </div>
            </div>
          </div>

          <h2 id="accordion-open-heading-2">
            <button
              type="button"
              className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
              data-accordion-target="#accordion-open-body-2"
              aria-expanded={expandedSection === 'section2'}
              aria-controls="accordion-open-body-2"
              onClick={() => handleToggle('section2')}
            >
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 me-2 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                SLP Details
              </span>
              <svg
                data-accordion-icon
                className={`w-3 h-3 shrink-0 transition-transform ${
                  expandedSection === 'section2' ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-open-body-2"
            className={`${
              expandedSection === 'section2' ? 'block' : 'hidden'
            } transition-all duration-300`}
            aria-labelledby="accordion-open-heading-2"
          >
            <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
              <div className='pb-4'>
              <h2 className='space-y-3 text-gray-400'>Member Details</h2>
                <hr />
                </div>
              <div className="flex justify-between">
                <ul className="space-y-3 text-gray-400">
                  <li>Full Name</li>
                  <li>Email</li>
                  <li>Phone</li>
                  <li>Gender</li>
                  <li>Region</li>
                  <li>Chapter</li>
                  <li>Joined Date</li>
                  <li>Industry</li>
                  <li>Company Name</li>
                  <li>Invoice Address</li>
                  <li>Voucher(USD)</li>
                  <li>Claimed Voucher(INR)</li>
                </ul>
                <ul className="space-y-3">
                  <li>{memberPaymentData[0].firstname} {memberPaymentData[0].lastname}</li>
                  <li>{memberPaymentData[0].email}</li>
                  <li>{memberPaymentData[0].phone}</li>
                  <li>{memberDataInfo[0].gender === 'm' ? 'Male' : 'Female'}</li>
                  <li>{memberPaymentData[0].region}</li>
                  <li>{memberDataInfo[0].chapters}</li>
                  <li>{memberDataInfo[0].joindt}</li>
                  <li>{memberDataInfo[0].industry}</li>
                  <li>{memberPaymentData[0].company}</li>
                  <li>{memberPaymentData[0].companyaddr}</li>
                  <li>${memberDataInfo[0].voucher_amt}</li>
                  <li>{memberPaymentData[0].symbol}{memberPaymentData[0].voucher}</li>
                </ul>
              </div>

              <div className='py-4'>
              <h2 className='space-y-3 text-gray-400'>Member Preferences</h2>
                <hr />
              </div>
              
              <div className="flex justify-between">
                <ul className="space-y-3 text-gray-400">
                  <li>Full Name</li>
                  <li>Email</li>
                  <li>Phone</li>
                  <li>Gender</li>
                  <li>Region</li>
                  <li>Chapter</li>
                  <li>Joined Date</li>
                  <li>Industry</li>
                  <li>Company Name</li>
                  <li>Invoice Address</li>
                  <li>Voucher(USD)</li>
                  <li>Claimed Voucher(INR)</li>
                </ul>
                <ul className="space-y-3">
                  <li>{memberPaymentData[0].firstname} {memberPaymentData[0].lastname}</li>
                  <li>{memberPaymentData[0].email}</li>
                  <li>{memberPaymentData[0].phone}</li>
                  <li>{memberDataInfo[0].gender === 'm' ? 'Male' : 'Female'}</li>
                  <li>{memberPaymentData[0].region}</li>
                  <li>{memberDataInfo[0].chapters}</li>
                  <li>{memberDataInfo[0].joindt}</li>
                  <li>{memberDataInfo[0].industry}</li>
                  <li>{memberPaymentData[0].company}</li>
                  <li>{memberPaymentData[0].companyaddr}</li>
                  <li>${memberDataInfo[0].voucher_amt}</li>
                  <li>{memberPaymentData[0].symbol}{memberPaymentData[0].voucher}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionDetails
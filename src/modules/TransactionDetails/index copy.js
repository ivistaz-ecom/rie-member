import React, { useState, useContext } from 'react'
import BackButton from '../../components/BackButton'
import { AppContext } from '../../context/AppContext'
import Transactions from './ms'

const TransactionDetails = () => {
  const [redirect, setRedirect] = useState(false)
  const { memberData, token, setTransactionDetails, transactionDetails } =
    useContext(AppContext)
    const sessionPaymentInfo = sessionStorage.getItem('Form_submitted')
    const memberPaymentData = JSON.parse(sessionPaymentInfo)


    const renderNoTransaction=(
        <div className="lg:bg-[#F9F6FF] min-h-screen flex flex-col p-6 ">
        <div className="mb-4">
          <BackButton title="Transaction Details" textColor="text-black" />
        </div>
        <div className="w-11/12 lg:w-1/3 flex flex-col m-auto bg-[#FDFDFD] lg:p-4 rounded-xl">
          <div className="flex flex-col items-center space-y-3 mb-5">
            <img src="/payment.png" alt="transaction" className="w-24 h-24" />
            <h2 className="text-3xl font-medium ">
             No transaction found
            </h2>

          </div>
        </div>
      </div>   )

console.log(transactionDetails)
  return (
      <>
      {transactionDetails ? <Transactions /> : renderNoTransaction}
      

        
      </>
  )
}

export default TransactionDetails

import React, { useState, useEffect, useRef, useContext } from "react";
// import { AppContext } from "../../context/AppContext";

function Terms({ handleTermAccepted }) {
  const [modalClose, setModalClose] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const textContainerRef = useRef(null);
  // const { isClicked, setIsClicked } = useContext(AppContext);
  const [isClicked, setIsClicked] = useState();

  const handleScroll = () => {
    const container = textContainerRef.current;
    if (container) {
      // Add a buffer to account for minor discrepancies in scroll detection
      const buffer = 10;
      const isBottom =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + buffer;
      setIsScrolledToBottom(isBottom);
    }
  };

  useEffect(() => {
    const container = textContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleClose = () => {
    setModalClose(true);
  };

  const handleAccept = () => {
    console.log("clicked yes");
    setIsClicked(false);
    setModalClose(true);
    handleTermAccepted(true);

    //sessionStorage.setItem("r_go", "false")
  };

  const handleDecline = () => {
    setModalClose(true);
    setIsClicked(true);
    handleTermAccepted(false);
  };

  return (
    <>
      <div
        className={`${modalClose ? "hidden" : ""} fixed inset-y-0 z-50 max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-[#000000c9]`}
      >
        <div className="relative h-[calc(100vh-1rem)] w-full p-4 lg:top-[1%]">
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
            <div className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5">
              <h3 className="text-1xl font-semibold text-gray-900 dark:text-white">
                RELEASE AND WAIVER OF LIABILITY AND INDEMNITY AGREEMENT
              </h3>
            </div>

            <div
              className="h-[480px] space-y-4 overflow-y-auto p-4 md:p-5"
              ref={textContainerRef}
            >
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                IN CONSIDERATION for being permitted to participate in the 2025
                EO South Asia RIE, hosted by the Entrepreneurs’ Organization
                Bangalore, the undersigned (the “Undersigned”) agrees as
                follows:
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                1. Released Parties. This Release and Waiver of Liability and
                Indemnity Agreement (this “Release”) is executed by the
                Undersigned freely, voluntarily and without duress, in favor of
                EO and its affiliates, subsidiaries, chapters, officers,
                directors, employees, agents, representatives (collectively, the
                “Released Parties”).
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                2. Release. The Undersigned releases and forever discharges and
                holds harmless and agrees not to sue each of the Released
                Parties and their successors and assigns from any and all
                losses, damages, liability, claims, demands, and costs
                (including attorney fees) (collectively, “Losses”) of whatever
                kind or nature, either in law or in equity, including Losses
                related to illness, injury, detainment, death, property damage,
                or property loss (collectively, “Injury”), which arise or may
                hereafter arise from or in connection with the Event. The
                Undersigned’s release includes Losses caused by the negligence
                of the Released Parties.
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                3. Assumption of Risk. The Undersigned is aware and understands
                that in participating in the Event, the Undersigned may be
                exposed to Injury and many other risks. With knowledge of these
                risks, the Undersigned accepts any and all of such risks, and
                agrees to participate in the Event with full knowledge of the
                dangers and potential injuries involved. The Undersigned
                recognizes that his/her participation will be largely, if not
                wholly, unsupervised. The Undersigned hereby expressly and
                specifically assumes all the risks described in this paragraph
                and any other risk whether known or unknown.
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                4. Agreement to Indemnify. The Undersigned will indemnify the
                Released Parties (i) for any Injury that the Undersigned causes;
                (ii) for claims made by the Undersigned, the Undersigned’s
                spouse, relatives, or other third-parties arising out of any
                Injury to the Undersigned; and (iii) for the cost of any first
                aid or medical care, and the claims of rescuers and others
                arising from the participation by the Undersigned in the Event.
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                5. Photo and Video Release. The Undersigned understands and
                accepts that in the course of his/her attendance at and
                participation in the Event, videos, photographs, or recordings
                including the Undersigned’s name, image, or other reproduction
                of the Undersigned’s likeness and voice (collectively,
                “Recordings”) may be taken by EO or third-parties. The
                Undersigned irrevocably agrees that such Recordings may be used
                by the Released Parties for any advertising and promotional
                purposes, in or through any medium, without compensation to the
                Undersigned.
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                6. Governing Law. The Undersigned expressly acknowledges and
                agrees that this Release will be governed by and interpreted in
                accordance with the laws of the Commonwealth of Virginia and is
                intended to be as broad and inclusive as is permitted by the
                laws of the Commonwealth of Virginia. If any portion of this
                Release is held invalid, it is agreed that it will not affect
                the validity or enforceability of the other portions of this
                Release, which shall continue in full legal force and effect.
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                7. Event Modification. The Undersigned understands that all
                Event activities are subject to change, as EO deems necessary,
                in its sole discretion.
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                8. Voucher for EO Bangalore members will be used by default by
                agreeing to these terms and conditions.
              </p>
            </div>

            <div className="flex items-center rounded-b border-t border-gray-200 p-4 dark:border-gray-600 md:p-5">
              <button
                className={`ms-3 rounded-lg border px-5 py-2.5 text-sm font-medium text-white focus:outline-none ${isScrolledToBottom ? "bg-[#653BC0]" : "cursor-not-allowed bg-gray-400"}`}
                onClick={handleAccept}
                disabled={!isScrolledToBottom}
              >
                Accept
              </button>
              <button
                type="button"
                className="ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                onClick={handleDecline}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Terms;

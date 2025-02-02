import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Select,
  TextInput,
  Label,
  Textarea,
  Modal,
  ListGroup,
} from "flowbite-react";
import Loader from "../../components/Loader";
import { interesting } from "../../utils/data";
import SERVERCONFIG from "../../server.json";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Stepper from "../../components/Stepper";

function Index() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState([]);

  const memberInfo = sessionStorage.getItem("r_TokenMember_Session");
  const parseMemInfo = JSON.parse(memberInfo);
  const showBanner = sessionStorage.getItem("r_TokenMember_Info");
  const isShowBanner = JSON.parse(showBanner);
  const gender = showBanner ? isShowBanner.riemembers.gender : "";
  const memberPrefInfo = sessionStorage.getItem("r_TokenMember_Pref");
  const parseMemPref = JSON.parse(memberPrefInfo);
  const prefMember = memberPrefInfo ? parseMemPref.memberpref : "";

  const memberTotal = sessionStorage.getItem("memberInfo");
  const parseMemberTotal = JSON.parse(memberTotal);
  const memberCount = parseMemberTotal.memberCount;

  const stepping = sessionStorage.getItem("stepping");
  const steps = JSON.parse(stepping);

  const [interestValue, setInterestValue] = useState({
    search: "",
    showInterest: false,
  });

  const [memberPref, setMemberPref] = useState({
    loading: false,
    flyingfrom: memberPrefInfo ? prefMember.flyingfrom : "",
    dietpref: memberPrefInfo ? prefMember.dietpref : "",
    allergies: memberPrefInfo ? prefMember.allergies : "",
    shirtsize: memberPrefInfo ? prefMember.shirtsize : "",
    interests: [],
    specialrequest: memberPrefInfo ? prefMember.specialrequest : "",
  });
  useEffect(() => {
    setSelectedInterest(memberPrefInfo ? prefMember.interests : "");
  }, []);
  const [errors, setErrors] = useState({
    flyingfrom: "",
    dietpref: "",
    shirtsize: "",
    specialrequest: "",
    interests: "",
  });
  const flyingfromRef = useRef(null);
  const dietprefRef = useRef(null);
  const allergiesRef = useRef(null);
  const shirtsizeRef = useRef(null);
  const specialrequestRef = useRef(null);

  const filteredInterests = interesting.filter((interest) =>
    interest.value.toLowerCase().includes(interestValue.search.toLowerCase()),
  );

  const validate = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!memberPref.flyingfrom) {
      newErrors.flyingfrom = "Please enter your location";
      valid = false;
    } else {
      newErrors.flyingfrom = "";
    }

    if (!memberPref.dietpref) {
      newErrors.dietpref = "Please select diet preferences";
      valid = false;
    } else {
      newErrors.dietpref = "";
    }

    if (!memberPref.shirtsize) {
      newErrors.shirtsize = "Please select shirt size";
      valid = false;
    } else {
      newErrors.shirtsize = "";
    }
    if (selectedInterest.length === 0) {
      newErrors.interests = "At least one interest is required";
      valid = false;
    } else {
      newErrors.interests = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const dataApi = async () => {
    const token = Cookies.get("token");
    const myData = await fetch(`${SERVERCONFIG.SUBMIT_URL}offer-packages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await myData.json();
    console.log(res.packages);
    if (res.packages.length > 0) {
      const memberInfo = sessionStorage.getItem("memberInfo");
      const parseMemberInfo = JSON.parse(memberInfo);
      const payableAMount = parseMemberInfo.memberFee;
      const payableGst = parseMemberInfo.gst;
      sessionStorage.setItem("runningPackages", JSON.stringify(res.packages));
      console.log("here iam storing the package in session");
      const discountValid = res.packages[0].discountpercent;
      const earlyDiscount = (payableAMount * discountValid) / 100;
      sessionStorage.setItem("r_currEBird", earlyDiscount);
    } else {
      console.log("offer is not running");
      const memberInfo = sessionStorage.getItem("memberInfo");
      const parseMemberInfo = JSON.parse(memberInfo);
      const payableAMount = parseMemberInfo.memberFee;
      const payableGst = parseMemberInfo.gst;
      const discountValid = 0;
      const earlyDiscount = 0;
      const noOffers = null;
      sessionStorage.setItem("r_currEBird", earlyDiscount);
      console.log("offer is not running");
      sessionStorage.setItem("runningPackages", JSON.stringify(noOffers));
      return;
    }
  };

  const submitMemberData = async (e) => {
    e.preventDefault();
    setMemberPref((prevMemberPref) => ({ ...prevMemberPref, loading: true }));
    await dataApi();
    if (validate()) {
      const formatedData = {
        eoid: parseMemInfo[0].id,
        flyingfrom: memberPref.flyingfrom,
        dietpref: memberPref.dietpref,
        allergies: memberPref.allergies,
        shirtsize: memberPref.shirtsize,
        interests: selectedInterest,
        specialrequest: memberPref.specialrequest,
      };
      //console.log(formatedData);
      try {
        const token = Cookies.get("token"); // Get the token from cookies or wherever it's stored
        const response = await fetch(
          `${SERVERCONFIG.SUBMIT_URL}member-preference`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
            body: JSON.stringify(formatedData),
          },
        );

        if (!response.ok) {
          throw new Error("Failed to send preferences");
        }
        const data = await response.json();
        //console.log(data);
        sessionStorage.setItem("r_TokenMember_Pref", JSON.stringify(data));
        // If successful, navigate to dashboard
        if (memberCount === 1) {
          navigate("/payment-gateway");
        } else {
          navigate("/slp-info");
        }

        //navigate('/payment-gateway')
        // navigate(memberSpouse ? "/slp-info" : "/payment-gateway");
      } catch (error) {
        console.error("Error sending preferences:", error.message);
      }
      setMemberPref((prevMemberPref) => ({
        ...prevMemberPref,
        loading: false,
      }));
    } else {
      const firstErrorField = Object.keys(errors).find(
        (field) => errors[field],
      );
      document.getElementById(firstErrorField)?.focus();
      setMemberPref((prevMemberPref) => ({
        ...prevMemberPref,
        loading: false,
      }));
    }
  };

  const interestsRef = React.useRef(null);

  const renderModal = () => (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)} size="md">
        <Modal.Header className="bg-transparent p-0"></Modal.Header>
        <Modal.Body className="w-auto p-0">
          <div className="p-0">
            {gender === "female" ? (
              <img
                src="/women.jpeg"
                alt="Bangalore"
                className="h-auto w-full"
              />
            ) : (
              <img src="/men.jpeg" alt="Bangalore" className="h-auto w-full" />
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );

  useEffect(() => {
    // Retrieve previously selected interests from sessionStorage
    const storedInterests = sessionStorage.getItem("selectedInterestsMem");
    if (storedInterests) {
      setSelectedInterest(JSON.parse(storedInterests));
    }
  }, []);

  const handleInterestSelect = (selected) => {
    let updatedSelectedInterest;
    if (selectedInterest.includes(selected)) {
      // Remove the selected interest
      updatedSelectedInterest = selectedInterest.filter(
        (interest) => interest !== selected,
      );
    } else {
      // Add the selected interest
      updatedSelectedInterest = [...selectedInterest, selected];
    }
    setSelectedInterest(updatedSelectedInterest);
    setMemberPref((prevPreferences) => ({
      ...prevPreferences,
      interests: updatedSelectedInterest,
    }));
    // Store selected interests in sessionStorage
    sessionStorage.setItem(
      "selectedInterestsMem",
      JSON.stringify(updatedSelectedInterest),
    );
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#210657]">
      <Stepper
        steps={steps.step2}
        total={memberCount > 1 ? steps.endCount2 : steps.endCount1}
      />
      <div className="w-full p-4 text-center lg:w-1/3">
        <h2 className="pb-10 text-xl font-semibold text-white lg:text-2xl">
          Member Preferences
        </h2>
        <div className="flex flex-col gap-4">
          <div className="text-start">
            <Label
              htmlFor="small"
              className="text-1xl  text-start text-white"
              value="Flying From"
            />

            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="Location"
              color={errors.flyingfrom && "failure"}
              ref={flyingfromRef}
              value={memberPref.flyingfrom}
              onChange={(e) =>
                setMemberPref((prevMemberPref) => ({
                  ...prevMemberPref,
                  flyingfrom: e.target.value,
                }))
              }
            />
            {errors.flyingfrom && (
              <div className="text-red-500">{errors.flyingfrom}</div>
            )}
          </div>
          <div className="text-start">
            <Label
              htmlFor="diet"
              className="text-1xl  text-start text-white"
              value="Diet Preferences"
            />
            <Select
              id="diet"
              required
              sizing="lg"
              ref={dietprefRef}
              color={errors.dietpref && "failure"}
              onChange={(e) =>
                setMemberPref((prevMemberPref) => ({
                  ...prevMemberPref,
                  dietpref: e.target.value,
                }))
              }
            >
              <option value="">Select Diet Preferences</option>
              <option
                value="Veg"
                selected={
                  memberPrefInfo && prefMember.dietpref === "Veg" ? true : false
                }
              >
                Veg
              </option>
              <option
                value="Non-Veg"
                selected={
                  memberPrefInfo && prefMember.dietpref === "Non-Veg"
                    ? true
                    : false
                }
              >
                Non-Veg
              </option>
              <option
                value="Jain"
                selected={
                  memberPrefInfo && prefMember.dietpref === "Jain"
                    ? true
                    : false
                }
              >
                Jain
              </option>
              <option
                value="Vegan"
                selected={
                  memberPrefInfo && prefMember.dietpref === "Vegan"
                    ? true
                    : false
                }
              >
                Vegan
              </option>
            </Select>
            {errors.dietpref && (
              <div className="text-red-500">{errors.dietpref}</div>
            )}
          </div>
          <div className="text-start">
            <Label
              htmlFor="small"
              className="text-1xl  text-start text-white"
              value="Allergies"
            />

            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="Allergies(if any)"
              ref={allergiesRef}
              value={memberPref.allergies}
              onChange={(e) =>
                setMemberPref((prevMemberPref) => ({
                  ...prevMemberPref,
                  allergies: e.target.value,
                }))
              }
            />
          </div>
          <div className="text-start">
            <Label
              htmlFor="size"
              className="text-1xl  text-start text-white"
              value="Shirt Size"
            />
            <Select
              id="size"
              required
              sizing="lg"
              ref={shirtsizeRef}
              color={errors.shirtsize && "failure"}
              onChange={(e) =>
                setMemberPref((prevMemberPref) => ({
                  ...prevMemberPref,
                  shirtsize: e.target.value,
                }))
              }
            >
              <option value="">Select Shirt Size</option>
              <option
                value="2XS"
                selected={
                  memberPrefInfo && prefMember.shirtsize === "2XS"
                    ? true
                    : false
                }
              >
                2XS
              </option>
              <option
                value="XS"
                selected={
                  memberPrefInfo && prefMember.shirtsize === "XS" ? true : false
                }
              >
                XS
              </option>
              <option
                value="S"
                selected={
                  memberPrefInfo && prefMember.shirtsize === "S" ? true : false
                }
              >
                S
              </option>
              <option
                value="M"
                selected={
                  memberPrefInfo && prefMember.shirtsize === "M" ? true : false
                }
              >
                M
              </option>

              <option
                value="L"
                selected={
                  memberPrefInfo && prefMember.shirtsize === "L" ? true : false
                }
              >
                L
              </option>
              <option
                value="XL"
                selected={
                  memberPrefInfo && prefMember.shirtsize === "XL" ? true : false
                }
              >
                XL
              </option>
              <option
                value="2XL"
                selected={
                  memberPrefInfo && prefMember.shirtsize === "2XL"
                    ? true
                    : false
                }
              >
                2XL
              </option>
              <option
                value="3XL"
                selected={
                  memberPrefInfo && prefMember.shirtsize === "3XL"
                    ? true
                    : false
                }
              >
                3XL
              </option>
              <option
                value="4XL"
                selected={
                  memberPrefInfo && prefMember.shirtsize === "4XL"
                    ? true
                    : false
                }
              >
                4XL
              </option>
              <option
                value="5XL"
                selected={
                  memberPrefInfo && prefMember.shirtsize === "5XL"
                    ? true
                    : false
                }
              >
                5XL
              </option>
            </Select>
            {errors.shirtsize && (
              <div className="text-red-500">{errors.shirtsize}</div>
            )}
            <div className="my-4">
              <Button size="xs" onClick={() => setOpenModal(true)}>
                Refer Size Chart
              </Button>
            </div>
          </div>
          <div></div>
          <div className="space-y-1 text-start">
            <label
              htmlFor="interest"
              className="text-1xl  text-start text-white"
            >
              Interests (Please select a maximum of 5)
            </label>
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="Choose Selections"
              color={errors.interests && "failure"}
              ref={interestsRef}
              value={interestValue.search}
              onChange={(e) => setInterestValue({ search: e.target.value })}
            />
            {/* <Interests /> */}
            {/* <ul
              className="flex w-full flex-wrap gap-3 md:w-11/12"
              
            > */}
            <ul
              className="flex h-40 w-full flex-wrap gap-3 overflow-auto pt-4 md:w-11/12"
              ref={interestsRef}
            >
              {filteredInterests.map((item) => {
                const isSelected = selectedInterest.includes(item.value);
                return (
                  <li key={item.id} className="">
                    <button
                      type="button"
                      className={`flex items-center gap-1 rounded-3xl border border-gray-300 px-2 py-1 text-sm font-thin ${
                        isSelected
                          ? "bg-[#380C72] text-white"
                          : "bg-white text-black"
                      }`}
                      onClick={() => handleInterestSelect(item.value)}
                    >
                      {item.icon}
                      {item.value}
                    </button>
                  </li>
                );
              })}
            </ul>
            {/* </ul> */}
            {errors.interests && (
              <div className="text-red-500">{errors.interests}</div>
            )}
          </div>
          <div className="w-full">
            <div className="mb-2 block text-start">
              <Label
                htmlFor="comment"
                value="Special request"
                className="text-1xl  text-start text-white"
              />
            </div>
            <Textarea
              id="comment"
              placeholder="Leave a comment..."
              required
              rows={4}
              ref={specialrequestRef}
              value={memberPref.specialrequest}
              onChange={(e) =>
                setMemberPref((prevMemberPref) => ({
                  ...prevMemberPref,
                  specialrequest: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className="w-full py-4">
          <Button
            type="submit"
            size="lg"
            className="w-full"
            onClick={submitMemberData}
          >
            Next
          </Button>
        </div>
      </div>

      {renderModal()}
      {memberPref.loading && <Loader />}
    </div>
  );
}

export default Index;

import React, { useState, useEffect, useRef } from "react";
import {
  Label,
  TextInput,
  Select,
  ToggleSwitch,
  Button,
  ListGroup,
} from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import { memberIndustries, countryList } from "../../utils/data";
import Loader from "../../components/Loader";
import SERVERCONFIG from "../../server.json";
import Cookies from "js-cookie";
import Stepper from "../../components/Stepper";
import Autocomplete from "../../components/AutoComplete";
import Interest from "../../components/AutoComplete/Interests";
import Code from "../../components/AutoComplete/Code";

function Index() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState(memberIndustries[1]);
  const [selectedList, setSelectedList] = useState(countryList[0]);
  //const slpCount = sessionStorage.getItem("r_MemberCount");
  const memberSavedInfo = sessionStorage.getItem("r_TokenMember_Info");
  const parseMemSavedInfo = JSON.parse(memberSavedInfo);
  const memberContact = sessionStorage.getItem("r_TokenMember_Contact");
  const parserMemberContact = JSON.parse(memberContact);
  const memberInfo = sessionStorage.getItem("r_TokenMember_Session");
  const parseMemInfo = JSON.parse(memberInfo);

  const memberWelcomeInfo = sessionStorage.getItem("memberInfo");
  const parserMemberInfo = JSON.parse(memberWelcomeInfo);
  const memberCount = parserMemberInfo.memberCount;

  const stepping = sessionStorage.getItem("stepping");
  const steps = JSON.parse(stepping);

  const [copyAddress, setCopyAddress] = useState(false);
  const [copyCompany, setCompany] = useState(false);
  const [gstNumber, setGstNumber] = useState("");
  const [isValidGst, setIsValidGst] = useState(false);
  const [hideGst, setIsHideGst] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const [emailAddress, setEmailAddress] = useState();
  const [gender, setGender] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  useEffect(() => {
    const slpSavedInfo = sessionStorage.getItem("r_TokenMember_Slp");
    if (slpSavedInfo) {
      const parseSlpSavedInfo = JSON.parse(slpSavedInfo);
      setGender(parseSlpSavedInfo.slp.gender);
      setFirstName(parseSlpSavedInfo.slp.firstname);
      setLastName(parseSlpSavedInfo.slp.lastname);
      setEmailAddress(parseSlpSavedInfo.slp.email);
      setCommunicationAddress({
        addressLine1: parseSlpSavedInfo.slp.addr1,
        addressLine2: parseSlpSavedInfo.slp.addr2,
        country: parseSlpSavedInfo.slp.country,
        state: parseSlpSavedInfo.slp.state,
        city: parseSlpSavedInfo.slp.city,
        postalCode: parseSlpSavedInfo.slp.pin,
      });

      setCompanyName(parseSlpSavedInfo.slp.company);

      setGstNumber(parseSlpSavedInfo.slp.gstno);
      setGender(parseSlpSavedInfo.slp.gender);
    }
    const slpContact = sessionStorage.getItem("r_TokenSLP_Contact");
    if (slpContact) {
      const parseSlpContact = JSON.parse(slpContact);
      setPhoneNumber(parseSlpContact.mobile);
    }
  }, []);

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [companyName, setCompanyName] = useState("");
  const [loader, setLoader] = useState(false);

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    // Ensure only digits are entered and limit to 10 digits
    const sanitizedValue = value.replace(/\D/g, "").slice(0, 10);
    setPhoneNumber(sanitizedValue);
  };

  const handleEmailAddressChange = (e) => {
    const value = e.target.value;
    setEmailAddress(value);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailPattern.test(value));
    //console.log(value);
  };

  const validateGstNumber = (input) => {
    // Regular expression to validate GST number format
    const gstRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[0-9A-Z]{1}[0-9A-Z]{1}$/;

    if (gstRegex.test(input)) {
      // GST number is in valid format
      setIsValidGst(true);
    } else {
      // GST number is not in valid format
      setIsValidGst(false);
    }
  };
  const handleGstNumberChange = (e) => {
    const value = e.target.value;
    setGstNumber(value);
    // Validate GST number as the user types
    validateGstNumber(value);
    setIsHideGst(true);
  };

  const [companyNameError, setCompanyNameError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [stateError, setStateError] = useState("");
  const [cityError, setCityError] = useState("");
  const [industryError, setIndustryError] = useState("");

  const [communicationAddress1Error, setCommunicationAddress1Error] =
    useState("");
  // const [communicationAddress2Error, setCommunicationAddress2Error] =
  //   useState("");

  const [communicationPostalCodeError, setCommunicationPostalCodeError] =
    useState("");

  const [communicationAddress, setCommunicationAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
  });

  const [billingAddress, setBillingAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
  });

  const genderRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const communicationCountryRef = useRef(null);
  const communicationStateRef = useRef(null);
  const communicationCityRef = useRef(null);
  const industryRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const companyNameRef = useRef(null);
  const communication1Ref = useRef(null);
  // const communication2Ref = useRef(null);
  const communicationPostalCodeRef = useRef(null);

  const handleToggleSwitch = () => {
    setCopyAddress(!copyAddress);
    if (!copyAddress) {
      // setSelected();
      // // If toggle switch is turned on, copy communication address to billing address
      // setSearchCountry({
      //   country: memberSavedInfo ? parseMemSavedInfo.riemembers.comcountry : "",
      // });
      // setSearchCity({
      //   city: memberSavedInfo ? parseMemSavedInfo.riemembers.comcity : "",
      // });
      // setSearchState({
      //   state: memberSavedInfo ? parseMemSavedInfo.riemembers.comstate : "",
      // });
      setCountry(JSON.parse(sessionStorage.getItem("commCountry")));
      setState(JSON.parse(sessionStorage.getItem("commState")));
      setCity(JSON.parse(sessionStorage.getItem("commCity")));
      setCommunicationAddress({
        addressLine1: memberSavedInfo
          ? parseMemSavedInfo.riemembers.comaddr1
          : "",
        addressLine2: memberSavedInfo
          ? parseMemSavedInfo.riemembers.comaddr2
          : "",
        // country: "",
        // state: memberSavedInfo ? parseMemSavedInfo.riemembers.comstate : "",
        // city: memberSavedInfo ? parseMemSavedInfo.riemembers.comcity : "",
        postalCode: memberSavedInfo ? parseMemSavedInfo.riemembers.compin : "",
      });
    } else {
      // If toggle switch is turned off, clear billing address fields
      // setSearchCountry({
      //   country: "",
      // });
      // setSearchCity({
      //   city: "",
      // });
      // setSearchState({
      //   state: "",
      // });
      setCommunicationAddress({
        addressLine1: "",
        addressLine2: "",
        country: "",
        state: "",
        city: "",
        postalCode: "",
      });
    }
  };

  const handleToggleBusinessSwitch = () => {
    const newCopyCompany = !copyCompany;
    setCompany(newCopyCompany);
    //console.log(newCopyCompany);

    if (newCopyCompany) {
      console.log("checked");
      console.log(memberSavedInfo ? parseMemSavedInfo.riemembers.industry : "");
      setCompanyName(
        memberSavedInfo ? parseMemSavedInfo.riemembers.company : "",
      );

      setGstNumber(memberSavedInfo ? parseMemSavedInfo.riemembers.gstno : "");
      setSelected(JSON.parse(sessionStorage.getItem("industry")));
    } else {
      console.log("not checked");
      setCompanyName("");
      setGstNumber("");
    }
  };

  const handleCommunicationAddressChange = (field, value) => {
    setCommunicationAddress({
      ...communicationAddress,
      [field]: value,
    });
    // If copy address is enabled, update billing address as well
    if (copyAddress) {
      setBillingAddress({
        ...billingAddress,
        [field]: value,
      });
    }
  };

  const submitMemberData = async (e) => {
    e.preventDefault();
    setLoader(true);
    let hasError = false;
    // setGenderError("");
    // setLoader(true);
    setGenderError("Gender is required.");

    if (gender === undefined) {
      setGenderError("Gender is required.");
      hasError = true;
      genderRef.current.focus();
    } else {
      setGenderError();
    }

    if (firstName === undefined) {
      setFirstNameError("FirstName is required.");
      hasError = true;
      firstNameRef.current.focus();
    } else {
      setFirstNameError();
    }
    if (lastName === undefined) {
      setLastNameError("LastName is required.");
      hasError = true;
      lastNameRef.current.focus();
    } else {
      setLastNameError();
    }
    if (emailAddress === undefined) {
      setEmailError("Email is required.");
      hasError = true;
      emailRef.current.focus();
    } else {
      setEmailError();
    }
    if (phoneNumber === undefined) {
      setPhoneNumberError("Phone Number is required.");
      hasError = true;
      phoneNumberRef.current.focus();
    } else if (phoneNumber.length < 10) {
      setPhoneNumberError("Phone Number must be at least 10 digits.");
      hasError = true;
      phoneNumberRef.current.focus();
    }

    // if (companyName === "") {
    //   setCompanyNameError("Company Name is required.");
    //   hasError = true;
    //   companyNameRef.current.focus();
    // } else {
    //   setCompanyNameError();
    // }

    if (selected === null) {
      setIndustryError("Industry is required.");
      hasError = true;
      //industryRef.current.focus();
    } else {
      setIndustryError();
    }

    if (country === null) {
      setCountryError("Country is required.");
      hasError = true;
      //industryRef.current.focus();
    } else {
      setCountryError();
    }
    if (state === null) {
      setStateError("State is required.");
      hasError = true;
      //industryRef.current.focus();
    } else {
      setStateError();
    }

    if (city === null) {
      setCityError("City is required.");
      hasError = true;
      //industryRef.current.focus();
    } else {
      setCityError();
    }
    console.log("industry" + selected);

    if (communicationAddress.addressLine1 === "") {
      setCommunicationAddress1Error("Address Line 1 is required.");
      hasError = true;
      communication1Ref.current.focus();
    } else {
      setCommunicationAddress1Error();
    }
    // if (communicationAddress.addressLine2 === "") {
    //   setCommunicationAddress2Error("Address Line 2 is required.");
    //   hasError = true;
    //   communication2Ref.current.focus();
    // } else {
    //   setCommunicationAddress2Error();
    // }
    // if (searchCountry.country === "") {
    //   setCommunicationCountryError("Country is required.");
    //   hasError = true;
    //   communicationCountryRef.current.focus();
    // } else {
    //   setCommunicationCountryError();
    // }
    // if (searchState.state === "") {
    //   setCommunicationStateError("State is required.");
    //   hasError = true;
    //   communicationStateRef.current.focus();
    // } else {
    //   setCommunicationStateError();
    // }
    // if (searchCity.city === "") {
    //   setCommunicationCityError("City is required.");
    //   hasError = true;
    //   communicationCityRef.current.focus();
    // } else {
    //   setCommunicationCityError();
    // }
    // if (communicationAddress.postalCode === "") {
    //   setCommunicationPostalCodeError("Postal Code is required.");
    //   hasError = true;
    //   communicationPostalCodeRef.current.focus();
    // } else {
    //   setCommunicationPostalCodeError();
    // }
    if (hasError) {
      setLoader(false);
      return;
    }
    const formatedData = {
      firstname: firstName,
      lastname: lastName,
      gender: gender,
      email: emailAddress,
      mobile: selectedList.dial_code + phoneNumber,
      industry: "",
      company: companyName,
      gstno: gstNumber,
      regstatus: "false",
      eoid: parseMemInfo[0].id,
      addr1: communicationAddress.addressLine1,
      addr2: communicationAddress.addressLine2,
      city: "",
      state: "",
      pin: communicationAddress.postalCode,
      country: "",
    };
    const MemberPhoneNumber = {
      mobile: phoneNumber,
      code: selectedList.dial_code,
    };
    console.log(formatedData);

    try {
      const token = Cookies.get("token"); // Ensure Cookies is imported and token exists
      const response = await fetch(
        `${SERVERCONFIG.SUBMIT_URL}slp-registration`,
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
        throw new Error("Failed to submit SLP info");
      }

      const data = await response.json();
      console.log(data);
      sessionStorage.setItem("r_TokenMember_Slp", JSON.stringify(data));
      sessionStorage.setItem(
        "r_TokenSLP_Contact",
        JSON.stringify(MemberPhoneNumber),
      );
      navigate("/slp-preferences");
      setLoader(false);
    } catch (error) {
      console.error("Error submitting SLP info:", error.message);
    } finally {
      setLoader(false);
    }
  };

  const countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState();
  const [cityData, setCityData] = useState();
  const [country, setCountry] = useState(countryData[100]);
  //console.log(country);
  const [state, setState] = useState();
  const [city, setCity] = useState();

  useEffect(() => {
    setStateData(State.getStatesOfCountry(country ? country.isoCode : ""));
  }, [country]);

  useEffect(() => {
    if (state) {
      setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
    }
  }, [state]);

  useEffect(() => {
    if (copyAddress) {
      // console.log("hello");
      // console.log(state);
      setCountry(country || countryData[100]);
      if (stateData) {
        setState(state || stateData[0]);
      }
      if (cityData) {
        setCity(city || cityData[1]);
      }
    } else {
      if (country) {
        setCountry(country);
      } else {
        setCountry(countryData[100]);
      }
      if (state) {
        setState(state);
      } else {
        if (stateData) {
          setState(stateData[0]);
        }
      }
      if (city) {
        setCity(city);
      } else {
        if (cityData) {
          setCity(
            JSON.parse(sessionStorage.getItem("billingCity")) || cityData[0],
          );
        }
      }
    }
  }, [copyAddress, stateData, cityData, countryData]);

  return (
    <div className="flex flex-col items-center justify-center bg-[#210657]">
      <Stepper
        steps={memberCount > 1 ? steps.step4 : steps.step1}
        total={memberCount > 1 ? steps.endCount2 : steps.endCount1}
      />
      <div className="w-full p-4 text-center lg:w-1/3">
        <h2 className="pb-10 text-xl font-semibold text-white lg:text-2xl">
          SLP Information
        </h2>
        <div className="flex flex-col gap-4">
          <div className="-pt-12  grid grid-cols-2 gap-1 p-0">
            <div className="w-full">
              <p className="-mb-4 text-start text-white">First Name</p>
            </div>
            <div className="w-full">
              <p className="-mb-4 text-start text-white">Last Name</p>
            </div>
          </div>
          <div className="grid  grid-cols-2 gap-2 ">
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="First Name"
              className="w-full"
              value={firstName}
              color={firstNameError && "failure"}
              ref={firstNameRef}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="Last Name"
              className="w-full"
              color={lastNameError && "failure"}
              value={lastName}
              ref={lastNameRef}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="-pt-12  grid grid-cols-2 gap-1 p-0">
            <div className="w-full">
              {firstNameError && (
                <p className="-mt-4 p-2 text-start text-red-500">
                  {firstNameError}
                </p>
              )}
            </div>
            <div className="w-full">
              {lastNameError && (
                <p className="-mt-4 p-2 text-start text-red-500">
                  {lastNameError}
                </p>
              )}
            </div>
          </div>
          <p className="-mb-4 text-start text-white">Choose Gender</p>
          <div>
            <Select
              id="countries"
              required
              sizing="lg"
              ref={genderRef}
              color={genderError && "failure"}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Gender</option>
              <option value="male" selected={gender === "male" ? true : false}>
                Male
              </option>
              <option
                value="female"
                selected={gender === "female" ? true : false}
              >
                Female
              </option>
            </Select>
            {genderError && (
              <p className="p-2 text-start text-red-500">{genderError}</p>
            )}
          </div>

          <p className="-mb-4 text-start text-white">Email Address *</p>
          <div>
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="Enter SLP Email"
              ref={emailRef}
              value={emailAddress}
              color={emailError && "failure"}
              onChange={handleEmailAddressChange}
            />

            {emailError ? (
              <p className="p-2 text-start text-red-500">{emailError}</p>
            ) : (
              !isValidEmail &&
              emailAddress !== "" && (
                <div className="text-start text-red-500">
                  Invalid email address
                </div>
              )
            )}
          </div>
          <p className="-mb-4 text-start text-white">Phone Number</p>
          <div className="relative flex gap-2">
            <Code
              countryList={countryList}
              selectedList={selectedList}
              setSelectedList={setSelectedList}
            />

            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="Mobile Number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              color={phoneNumberError && "failure"}
              //onBlur={() => setPhoneNumberError("")}
              ref={phoneNumberRef}
              className="w-full rounded"
            />
          </div>
          <div>
            {" "}
            {phoneNumberError && (
              <p className="-mt-4 p-2 text-start text-red-500">
                {phoneNumberError}
              </p>
            )}
          </div>
        </div>

        <h2 className="py-4 text-start text-xl font-semibold text-white">
          Communication Address
        </h2>
        {memberCount > 1 && (
          <div className="-pt-4 flex max-w-md flex-col gap-4 pb-6">
            <label class="inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                value=""
                class="peer sr-only"
                checked={copyAddress}
                onChange={handleToggleSwitch}
              />
              <div class="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
              <span class="ms-3 text-sm font-medium text-white dark:text-gray-300">
                Same as Member
              </span>
            </label>
          </div>
        )}
        <div className="flex flex-col gap-4">
          <p className="-mb-4 text-start text-white">Address Line 1</p>
          <div>
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="Address Line 1"
              color={communicationAddress1Error && "failure"}
              ref={communication1Ref}
              value={communicationAddress.addressLine1}
              onChange={(e) =>
                handleCommunicationAddressChange("addressLine1", e.target.value)
              }
            />
            {communicationAddress1Error && (
              <p className="p-2 text-start text-red-500">
                {communicationAddress1Error}
              </p>
            )}
          </div>
          <p className="-mb-4 text-start text-white">Address Line 2</p>
          <div>
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="Address Line 2"
              // ref={communication2Ref}
              value={communicationAddress.addressLine2}
              onChange={(e) =>
                handleCommunicationAddressChange("addressLine2", e.target.value)
              }
            />
            {/* {communicationAddress2Error && (
              <p className="p-2 text-start text-red-500">
                {communicationAddress2Error}
              </p>
            )} */}
          </div>
          <div>
            <div>
              <p className="-mb-4 text-start text-white">Choose Country</p>
              <div>
                <Autocomplete
                  data={countryData}
                  selected={country}
                  setSelected={setCountry}
                  error={countryError}
                />
                {countryError && (
                  <p className="-mt-6 p-2 text-start text-red-500">
                    {countryError}
                  </p>
                )}
              </div>
              {stateData && stateData.length > 0 && (
                <>
                  <p className="-mb-4 text-start text-white">Choose State</p>
                  <div>
                    <Autocomplete
                      data={stateData}
                      selected={state}
                      setSelected={setState}
                      error={stateError}
                    />
                    {stateError && (
                      <p className="-mt-6 p-2 text-start text-red-500">
                        {stateError}
                      </p>
                    )}
                  </div>
                </>
              )}
              {cityData && cityData.length > 0 && (
                <>
                  <p className="-mb-4 text-start text-white">Choose City</p>
                  <div>
                    <Autocomplete
                      data={cityData}
                      selected={city}
                      setSelected={setCity}
                      error={cityError}
                    />
                    {cityError && (
                      <p className="-mt-6 p-2 text-start text-red-500">
                        {cityError}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          <p className="-mb-4 text-start text-white">Postal Code</p>
          <div>
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="Postal Code"
              color={communicationPostalCodeError && "failure"}
              value={communicationAddress.postalCode}
              onChange={(e) =>
                handleCommunicationAddressChange("postalCode", e.target.value)
              }
              ref={communicationPostalCodeRef}
            />
            {communicationPostalCodeError && (
              <p className="p-2 text-start text-red-500">
                {communicationPostalCodeError}
              </p>
            )}
          </div>
        </div>

        <h2 className="py-4 text-start text-xl font-semibold text-white">
          Business Details
        </h2>
        {memberCount > 1 && (
          <div className="-pt-4 flex max-w-md flex-col gap-4 pb-6">
            <label class="inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                value=""
                class="peer sr-only"
                checked={copyCompany}
                onChange={handleToggleBusinessSwitch}
              />
              <div class="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
              <span class="ms-3 text-sm font-medium text-white dark:text-gray-300">
                Same as Member
              </span>
            </label>
          </div>
        )}
        <div className="flex flex-col gap-4">
          <p className="-mb-4 text-start text-white">Company Name</p>
          <div>
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="Company Name"
              ref={companyNameRef}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            {companyNameError && (
              <p className="p-2 text-start text-red-500">{companyNameError}</p>
            )}
          </div>
          <div>
            <p className="-mb-4 text-start text-white">Select Industry</p>
            <Interest
              data={memberIndustries}
              selected={selected} // Pass the selected state variable here
              setSelected={setSelected} // Pass the setSelected function
              error={industryError}
            />
          </div>
          {industryError && (
            <p className="-mt-6 p-2 text-start text-red-500">{industryError}</p>
          )}
          <p className="-mb-4 text-start text-white">GST # if applicable</p>
          <div>
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="GST # if applicable"
              value={gstNumber}
              onChange={handleGstNumberChange}
            />
          </div>
          {hideGst && (
            <div className="text-start">
              {isValidGst ? (
                <p className="text-green-500">Valid GST number</p>
              ) : (
                <p className="text-red-500">Invalid GST number</p>
              )}
            </div>
          )}
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
      {loader && <Loader />}
    </div>
  );
}

export default Index;

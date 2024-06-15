import React, { useState, useRef, useEffect } from "react";
import {
  Label,
  TextInput,
  Select,
  ToggleSwitch,
  Button,
  ListGroup,
} from "flowbite-react";
import { countryList, memberIndustries } from "../../utils/data";
import SERVERCONFIG from "../../server.json";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { Country, State, City } from "country-state-city";
import Stepper from "../../components/Stepper";
import Autocomplete from "../../components/AutoComplete";
import Interest from "../../components/AutoComplete/Interests";
import Code from "../../components/AutoComplete/Code";

function Index() {
  const navigate = useNavigate();

  const memberInfo = sessionStorage.getItem("r_TokenMember_Session");
  const parseMemInfo = JSON.parse(memberInfo);
  const memberSavedInfo = sessionStorage.getItem("r_TokenMember_Info");
  const parseMemSavedInfo = JSON.parse(memberSavedInfo);
  const memberWelcomeInfo = sessionStorage.getItem("memberInfo");
  const parserMemberInfo = JSON.parse(memberWelcomeInfo);
  const memberCount = parserMemberInfo.memberCount;
  const memberContact = sessionStorage.getItem("r_TokenMember_Contact");
  const parserMemberContact = JSON.parse(memberContact);

  const stepping = sessionStorage.getItem("stepping");
  const steps = JSON.parse(stepping);

  const [loader, setLoader] = useState(false);
  const [copyAddress, setCopyAddress] = useState(false);
  const [gstNumber, setGstNumber] = useState(
    parseMemSavedInfo ? parseMemSavedInfo.riemembers.gstno : "",
  );
  const [isValidGst, setIsValidGst] = useState(false);
  const [hideGst, setIsHideGst] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(
    parserMemberContact ? parserMemberContact.mobile : "",
  );

  const [gender, setGender] = useState(
    parseMemSavedInfo ? parseMemSavedInfo.riemembers.gender : "",
  );
  const [companyName, setCompanyName] = useState(
    parseMemSavedInfo ? parseMemSavedInfo.riemembers.company : "",
  );

  // const filteredState = states.filter((state) =>
  //   state.name.toLowerCase().includes(searchState.toLowerCase()),
  // );
  // const filteredCity = cities.filter((city) =>
  //   city.name.toLowerCase().includes(searchCity.toLowerCase()),
  // );

  // State variables for field validation
  const genderRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const companyNameRef = useRef(null);
  const industryRef = useRef(null);
  const codeRef = useRef(null);
  const communication1Ref = useRef(null);
  // const communication2Ref = useRef(null);
  const communicationCountryRef = useRef(null);
  const communicationStateRef = useRef(null);
  const communicationCityRef = useRef(null);
  const communicationPostalCodeRef = useRef(null);
  const billing1Ref = useRef(null);
  // const billing2Ref = useRef(null);
  const billingCountryRef = useRef(null);
  const billingStateRef = useRef(null);
  const billingCityRef = useRef(null);
  const billingPostalCodeRef = useRef(null);

  //const billingRef = useRef(null);

  const [genderError, setGenderError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [industryError, setIndustryError] = useState("");

  //const [industryError, setIndustryError] = useState("");

  const [countryError, setCountryError] = useState("");
  const [stateError, setStateError] = useState("");
  const [cityError, setCityError] = useState("");

  const [comCountryError, setComCountryError] = useState("");
  const [comStateError, setComStateError] = useState("");
  const [comCityError, setComCityError] = useState("");

  const [communicationAddress1Error, setCommunicationAddress1Error] =
    useState("");
  // const [communicationAddress2Error, setCommunicationAddress2Error] =
  //   useState("");
  // const [communicationCountryError, setCommunicationCountryError] =
  //   useState("");
  // const [communicationStateError, setCommunicationStateError] = useState("");
  // const [communicationCityError, setCommunicationCityError] = useState("");
  const [communicationPostalCodeError, setCommunicationPostalCodeError] =
    useState("");
  const [billingAddress1Error, setBillingAddress1Error] = useState("");
  // const [billingAddress2Error, setBillingAddress2Error] = useState("");
  // const [billingCountryError, setBillingCountryError] = useState("");
  // const [billingStateError, setBillingStateError] = useState("");
  // const [billingCityError, setBillingCityError] = useState("");
  const [billingPostalCodeError, setBillingPostalCodeError] = useState("");

  const [isexistsPostalCode, setIsexistsPostalCode] = useState(true);

  useEffect(() => {
    if (!memberWelcomeInfo) {
      navigate("/welcome");
    }
  }, [memberWelcomeInfo, navigate]);
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    // Ensure only digits are entered and limit to 10 digits
    const sanitizedValue = value.replace(/\D/g, "").slice(0, 10);
    setPhoneNumber(sanitizedValue);
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
    if (value === "") {
      setIsHideGst(false);
      setGstNumber("");
    } else {
      setGstNumber(value);
      // Validate GST number as the user types
      validateGstNumber(value);
      setIsHideGst(true);
    }
  };

  const [communicationAddress, setCommunicationAddress] = useState({
    addressLine1: parseMemSavedInfo ? parseMemSavedInfo.riemembers.addr1 : "",
    addressLine2: parseMemSavedInfo ? parseMemSavedInfo.riemembers.addr2 : "",
    country: parseMemSavedInfo ? parseMemSavedInfo.riemembers.country : "",
    state: parseMemSavedInfo ? parseMemSavedInfo.riemembers.state : "",
    city: parseMemSavedInfo ? parseMemSavedInfo.riemembers.city : "",
    postalCode: parseMemSavedInfo ? parseMemSavedInfo.riemembers.pin : "",
  });

  const [billingAddress, setBillingAddress] = useState({
    addressLine1: parseMemSavedInfo
      ? parseMemSavedInfo.riemembers.comaddr1
      : "",
    addressLine2: parseMemSavedInfo
      ? parseMemSavedInfo.riemembers.comaddr2
      : "",
    country: parseMemSavedInfo ? parseMemSavedInfo.riemembers.comcountry : "",
    state: parseMemSavedInfo ? parseMemSavedInfo.riemembers.comstate : "",
    city: parseMemSavedInfo ? parseMemSavedInfo.riemembers.comcity : "",
    postalCode: parseMemSavedInfo ? parseMemSavedInfo.riemembers.compin : "",
  });

  const handleToggleSwitch = () => {
    setCopyAddress(!copyAddress);
    if (!copyAddress) {
      //console.log(searchCountry.country);
      // If toggle switch is turned on, copy communication address to billing address
      //updateCopiedData();
      setBillingAddress({
        addressLine1: communicationAddress.addressLine1,
        addressLine2: communicationAddress.addressLine2,
        postalCode: communicationAddress.postalCode,
      });
      //console.log(JSON.parse(sessionStorage.getItem("billingState")));
      setComCountry(JSON.parse(sessionStorage.getItem("billingCountry")));
      setComState(JSON.parse(sessionStorage.getItem("billingState")));
      setComCity(JSON.parse(sessionStorage.getItem("billingCity")));
    } else {
      // If toggle switch is turned off, clear billing address fields
      // setComCountry(JSON.parse(sessionStorage.getItem("commCountry")));
      // setComState(JSON.parse(sessionStorage.getItem("commState")));
      // //console.log(JSON.parse(sessionStorage.getItem("commState")));
      // setComCity(JSON.parse(sessionStorage.getItem("commCity")));
      setBillingAddress({
        addressLine1: parseMemSavedInfo
          ? parseMemSavedInfo.riemembers.comaddr1
          : "",
        addressLine2: parseMemSavedInfo
          ? parseMemSavedInfo.riemembers.comaddr2
          : "",
        postalCode: parseMemSavedInfo
          ? parseMemSavedInfo.riemembers.compin
          : "",
      });
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
    setGenderError("");
    // // setCodeError("");
    // setPhoneNumberError("");
    // setCompanyNameError("");
    // // setIndustryError("");
    // setCommunicationAddress1Error("");
    // setCommunicationPostalCodeError("");
    // setBillingAddress1Error("");
    // setBillingPostalCodeError("");

    let hasError = false;

    if (gender === "") {
      setGenderError("Gender is required.");
      if (!hasError) hasError = true;
      genderRef.current.focus();
    }

    if (phoneNumber === "") {
      setPhoneNumberError("Phone Number is required.");
      if (!hasError) hasError = true;
      phoneNumberRef.current.focus();
    } else if (phoneNumber.length < 10) {
      setPhoneNumberError("Phone Number must be at least 10 digits.");
      if (!hasError) hasError = true;
      phoneNumberRef.current.focus();
    } else {
      setPhoneNumberError("");
    }

    if (companyName === "") {
      setCompanyNameError("Company Name is required.");
      if (!hasError) hasError = true;
      companyNameRef.current.focus();
    } else {
      setCompanyNameError("");
    }

    if (selected === null) {
      setIndustryError("Industry is required.");
      if (!hasError) hasError = true;
    } else {
      setIndustryError("");
    }

    if (city === null) {
      setCityError("City is required.");
      if (!hasError) hasError = true;
    } else {
      setCityError("");
    }

    console.log(comCountry);
    if (comCountry === null) {
      setComCountryError("Country is required.");
      if (!hasError) hasError = true;
    } else {
      setComCountryError("");
    }

    if (comState === null) {
      setComStateError("State is required.");
      if (!hasError) hasError = true;
    } else {
      setComStateError("");
    }

    if (comCity === null) {
      setComCityError("City is required.");
      if (!hasError) hasError = true;
    } else {
      setComCityError("");
    }

    if (communicationAddress.addressLine1 === "") {
      setCommunicationAddress1Error("Address Line 1 is required.");
      if (!hasError) hasError = true;
      communication1Ref.current.focus();
    } else {
      setCommunicationAddress1Error("");
    }

    if (billingAddress.addressLine1 === "") {
      setBillingAddress1Error("Address Line 1 is required.");
      if (!hasError) hasError = true;
      billing1Ref.current.focus();
    } else {
      setBillingAddress1Error("");
    }

    if (country === null) {
      setCountryError("Country is required.");
      if (!hasError) hasError = true;
    } else {
      setCountryError("");
    }

    if (hasError) {
      setLoader(false);
      return;
    }

    const currentLocations = {
      selectedCountry: country.name,
      selectedCountryIso: country.isoCode,
      selectedState: state.name,
      selectedStateIso: state.isoCode,
      selectedCity: city.name,
      selectedCityIso: city.id,
      selectedComCountry: comCountry.name,
      selectedComCountryIso: comCountry.isoCode,
      selectedComState: comState.name,
      selectedComStateIso: comState.isoCode,
      selectedComCity: comCity.name,
      selectedComCityIso: comCity.id,
    };

    sessionStorage.setItem("selectedCountry", JSON.stringify(currentLocations));
    sessionStorage.setItem("billingCountry", JSON.stringify(country));
    sessionStorage.setItem("billingState", JSON.stringify(state));
    sessionStorage.setItem("billingCity", JSON.stringify(city));
    sessionStorage.setItem("industry", JSON.stringify(selected));

    sessionStorage.setItem("commCountry", JSON.stringify(comCountry));
    sessionStorage.setItem("commState", JSON.stringify(comState));
    sessionStorage.setItem("commCity", JSON.stringify(comCity));

    const updatedMemberInfo = {
      eoid: parseMemInfo[0].id,
      gender: gender,
      mobile: selectedList.dial_code + phoneNumber,
      industry: selected.type,
      company: companyName,
      addr1: communicationAddress.addressLine1,
      addr2: communicationAddress.addressLine2,
      country: country.name,
      state: state.name,
      city: city.name,
      pin: communicationAddress.postalCode,
      comaddr1: billingAddress.addressLine1,
      comaddr2: billingAddress.addressLine2,
      comcountry: comCountry.name,
      comstate: comState.name,
      comcity: comCity.name,
      compin: billingAddress.postalCode,
      gstno: gstNumber,
      spouseid: parseMemInfo[0].spouse_id,
      regstatus: "no",
    };
    const MemberPhoneNumber = {
      mobile: phoneNumber,
      code: selectedList.dial_code,
    };
    console.log(updatedMemberInfo);
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${SERVERCONFIG.SUBMIT_URL}rie-member`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedMemberInfo),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log("Form submitted successfully:", data);
        sessionStorage.setItem("r_TokenMember_Info", JSON.stringify(data));
        sessionStorage.setItem(
          "r_TokenMember_Contact",
          JSON.stringify(MemberPhoneNumber),
        );

        //navigate(isSLP ? '/slp-info' : '/member-preferences')
        navigate("/member-preferences");
        setLoader(false);
      } else {
        console.error("Error submitting form:", response.statusText);
        setLoader(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoader(false);
    }
  };

  const countryData = Country.getAllCountries();
  const countryComData = Country.getAllCountries();

  const [stateData, setStateData] = useState();
  const [cityData, setCityData] = useState();
  const [country, setCountry] = useState(
    JSON.parse(sessionStorage.getItem("billingCountry")) || countryData[100],
  );
  //console.log(country);
  const [state, setState] = useState();
  const [city, setCity] = useState();

  const [stateComData, setStateComData] = useState();
  const [cityComData, setCityComData] = useState();
  const [comCountry, setComCountry] = useState(countryComData[100]);
  const [comState, setComState] = useState();
  const [comCity, setComCity] = useState();

  useEffect(() => {
    setStateComData(
      State.getStatesOfCountry(comCountry ? comCountry.isoCode : ""),
    );
  }, [comCountry]);

  useEffect(() => {
    if (comState) {
      setCityComData(
        City.getCitiesOfState(comCountry?.isoCode, comState?.isoCode),
      );
    }
  }, [comState]);
  useEffect(() => {
    setStateData(State.getStatesOfCountry(country ? country.isoCode : ""));
    if (state) {
      setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
    }
  }, [country, state]);

  // copy stared here

  useEffect(() => {
    if (copyAddress) {
      // console.log("hello");
      // console.log(state);
      setComCountry(country || countryComData[100]);
      if (stateComData) {
        setComState(state || stateData[0]);
      }
      if (cityComData) {
        setComCity(city || cityComData[0]);
      }
    } else {
      if (comCountry) {
        setComCountry(comCountry);
      } else {
        if (countryData) {
          setCountry(country);
        } else {
          setComCountry(JSON.parse(sessionStorage.getItem("commCountry")));
        }
      }
      if (comState) {
        setComState(comState);
      } else {
        if (stateComData) {
          setComState(stateComData[0]);
        } else {
          setComState(JSON.parse(sessionStorage.getItem("commState")));
        }
      }
      if (comCity) {
        setComCity(comCity);
      } else {
        if (cityComData) {
          setComCity(cityComData[0]);
        } else {
          setComCity(JSON.parse(sessionStorage.getItem("commCity")));
        }
      }

      if (country) {
        setCountry(country);
      } else {
        setCountry(JSON.parse(sessionStorage.getItem("billingCountry")));
      }
      if (state) {
        setState(state);
      } else {
        if (stateData) {
          setState(stateData[0]);
        } else {
          setState(JSON.parse(sessionStorage.getItem("billingState")));
        }
      }
      if (city) {
        setCity(city);
      } else {
        if (cityData) {
          setCity(cityData[1]);
        } else {
          setCity(JSON.parse(sessionStorage.getItem("billingCity")));
        }
      }
    }
  }, [
    copyAddress,
    stateComData,
    cityComData,
    countryComData,
    cityData,
    stateData,
    countryData,
  ]);

  // useEffect(() => {
  //   if (copyAddress) {
  //     if (cityComData && cityComData.length > 0) {
  //       setComCity(
  //         JSON.parse(sessionStorage.getItem("billingCity")) || cityComData[0],
  //       );
  //     }
  //   } else {
  //     setComCity(cityComData[0]);
  //     // Similar to the previous useEffect, handle setting comCity when copyAddress is false
  //   }
  // }, [copyAddress, cityComData]);

  // Update sessionStorage when country changes

  const [selected, setSelected] = useState(memberIndustries[1]);

  //console.log(selected);
  const [selectedList, setSelectedList] = useState(countryList[0]);

  return (
    <div className="flex flex-col items-center justify-center bg-[#210657]">
      <Stepper
        steps={steps.step1}
        total={memberCount > 1 ? steps.endCount2 : steps.endCount1}
      />

      <div className="w-full p-4 text-center lg:w-1/3">
        <h2 className="pb-10 text-xl font-semibold text-white lg:text-2xl">
          Member Information
        </h2>
        <div className="flex flex-col gap-4">
          <p className="-mb-4 text-start text-white">Choose Gender</p>
          <div>
            <Select
              id="countries"
              required
              sizing="lg"
              //onBlur={() => setGenderError("")}
              color={genderError && "failure"}
              ref={genderRef}
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
              color={phoneNumberError && "failure"}
              onChange={handlePhoneNumberChange}
              //onBlur={() => setPhoneNumberError("")}
              ref={phoneNumberRef}
              className="w-full rounded"
            />
          </div>
          <div className="relative flex gap-2">
            <div>
              {codeError && (
                <p className="p-2 text-start text-red-500">{codeError}</p>
              )}
            </div>
            <div>
              {phoneNumberError && (
                <p className="p-2 text-start text-red-500">
                  {phoneNumberError}
                </p>
              )}
            </div>
          </div>
        </div>

        <h2 className="py-4 text-start text-xl font-semibold text-white">
          Business Details
        </h2>
        <div className="flex flex-col gap-4">
          <p className="-mb-4 text-start text-white">Company Name</p>
          <div>
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="Company Name"
              color={companyNameError && "failure"}
              ref={companyNameRef}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            {companyNameError && (
              <p className="p-2 text-start text-red-500">{companyNameError}</p>
            )}
          </div>
          <div>
            <p className="-mb-4 text-start text-white">Choose Industry</p>
            <Interest
              data={memberIndustries}
              selected={selected} // Pass the selected state variable here
              setSelected={setSelected} // Pass the setSelected function
              error={industryError}
              placeholder="Choose Industry"
            />
            {industryError && (
              <p className="p-2 text-start text-red-500">{industryError}</p>
            )}
          </div>
          <p className="-mb-4 text-start text-white">GST # if Applicable</p>
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
        <h2 className="py-4 text-start text-xl font-semibold text-white">
          Billing Address
        </h2>
        <div className="flex flex-col gap-4">
          <p className="-mb-4 text-start text-white">Address Line 1</p>
          <div>
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="Address Line 1"
              color={communicationAddress1Error && "failure"}
              value={communicationAddress.addressLine1}
              onChange={(e) =>
                handleCommunicationAddressChange("addressLine1", e.target.value)
              }
              ref={communication1Ref}
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
              value={communicationAddress.addressLine2}
              onChange={(e) =>
                handleCommunicationAddressChange("addressLine2", e.target.value)
              }
              // ref={communication2Ref}
            />
            {/* {communicationAddress2Error && (
              <p className="p-2 text-start text-red-500">
                {communicationAddress2Error}
              </p>
            )} */}
          </div>
          <div>
            <p className="-mb-4 text-start text-white">Choose Country</p>
            <div>
              <Autocomplete
                data={countryData}
                selected={country}
                setSelected={setCountry}
                error={countryError}
                placeholder="Choose Country"
              />
            </div>
            {countryError && (
              <p className="-mt-4 p-2 text-start text-red-500">
                {countryError}
              </p>
            )}
            {stateData && stateData.length > 0 && (
              <>
                <p className="-mb-4 text-start text-white">Choose State</p>
                <div>
                  <Autocomplete
                    data={stateData}
                    selected={state}
                    setSelected={setState}
                    error={stateError}
                    placeholder="Choose State"
                  />
                </div>
                {stateError && (
                  <p className="-mt-4 p-2 text-start text-red-500">
                    {stateError}
                  </p>
                )}
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
                    placeholder="Choose City"
                  />
                </div>

                {cityError && (
                  <p className="p-2 text-start text-red-500">{cityError}</p>
                )}
              </>
            )}
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
          Communication Address
        </h2>

        <div className="-pt-4 flex max-w-md flex-col gap-4 pb-6">
          <label className="inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              value=""
              className="peer sr-only"
              checked={copyAddress}
              onChange={handleToggleSwitch}
            />
            <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:size-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
            <span className="ms-3 text-sm font-medium text-white dark:text-gray-300">
              Same as above
            </span>
          </label>
        </div>

        <div className="flex flex-col gap-4">
          <p className="-mb-4 text-start text-white">Address Line 1</p>
          <div>
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="Address Line 1"
              value={billingAddress.addressLine1}
              color={billingAddress1Error && "failure"}
              onChange={(e) =>
                setBillingAddress({
                  ...billingAddress,
                  addressLine1: e.target.value,
                })
              }
              ref={billing1Ref}
            />
            {billingAddress1Error && (
              <p className="p-2 text-start text-red-500">
                {billingAddress1Error}
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
              value={billingAddress.addressLine2}
              onChange={(e) =>
                setBillingAddress({
                  ...billingAddress,
                  addressLine2: e.target.value,
                })
              }
              // ref={billing2Ref}
            />
            {/* {billingAddress2Error && (
              <p className="p-2 text-start text-red-500">
                {billingAddress2Error}
              </p>
            )} */}
          </div>
          <div>
            {/* second part  */}
            <p className="-mb-4 text-start text-white">Choose Country</p>
            <div>
              <Autocomplete
                data={countryComData}
                selected={comCountry}
                setSelected={setComCountry}
                placeholder="Choose Country"
                error={comCountryError}
              />

              {comCountryError && (
                <p className="-mt-4 p-2 text-start text-red-500">
                  {comCountryError}
                </p>
              )}
            </div>
            {stateComData && stateComData.length > 0 && (
              <>
                <p className="-mb-4 text-start text-white">Choose State</p>
                <div>
                  <Autocomplete
                    data={stateComData}
                    selected={comState}
                    setSelected={setComState}
                    placeholder="Choose State"
                    error={comStateError}
                  />
                </div>

                {comStateError && (
                  <p className="-mt-4 p-2 text-start text-red-500">
                    {comStateError}
                  </p>
                )}
              </>
            )}
            {cityComData && (
              <>
                <p className="-mb-4 text-start text-white">Choose City</p>
                <div>
                  <Autocomplete
                    data={cityComData}
                    selected={comCity}
                    setSelected={setComCity}
                    placeholder="Choose City"
                    error={comCityError}
                  />
                </div>
                {comCityError && (
                  <p className="-mt-4 p-2 text-start text-red-500">
                    {comCityError}
                  </p>
                )}
              </>
            )}
          </div>
          <p className="-mb-4 text-start text-white">Postal Code</p>
          <div>
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="Postal Code"
              value={billingAddress.postalCode}
              color={billingPostalCodeError && "failure"}
              onChange={(e) =>
                setBillingAddress({
                  ...billingAddress,
                  postalCode: e.target.value,
                })
              }
              ref={billingPostalCodeRef}
            />
            {billingPostalCodeError && (
              <p className="p-2 text-start text-red-500">
                {billingPostalCodeError}
              </p>
            )}
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
        <div></div>
      </div>
      {loader && <Loader />}
    </div>
  );
}

export default Index;

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
  const [searchIndustry, setSearchIndustry] = useState({
    search: parseMemSavedInfo ? parseMemSavedInfo.riemembers.industry : "",
    showLists: false,
  });
  const [searchCode, setSearchCode] = useState({
    search: parserMemberContact ? parserMemberContact.code : "+91",
    showCodes: false,
  });
  const [searchCountry, setSearchCountry] = useState({
    search: "India",
    showCountry: false,
    country: parseMemSavedInfo ? parseMemSavedInfo.riemembers.country : "",
  });
  const [searchState, setSearchState] = useState({
    search: "",
    showState: false,
    state: parseMemSavedInfo ? parseMemSavedInfo.riemembers.state : "",
  });
  const [searchCity, setSearchCity] = useState({
    search: "",
    showCity: false,
    city: parseMemSavedInfo ? parseMemSavedInfo.riemembers.city : "",
  });
  const [searchBillCountry, setSearchBillCountry] = useState({
    search: "",
    showCountry: false,
    country: parseMemSavedInfo ? parseMemSavedInfo.riemembers.comcountry : "",
  });
  const [searchBillState, setSearchBillState] = useState({
    search: "",
    showState: false,
    state: parseMemSavedInfo ? parseMemSavedInfo.riemembers.comstate : "",
  });
  const [searchBillCity, setSearchBillCity] = useState({
    search: "",
    showCity: false,
    city: parseMemSavedInfo ? parseMemSavedInfo.riemembers.comcity : "",
  });

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
      setComCountry(JSON.parse(sessionStorage.getItem("commCountry")));
      setComState(JSON.parse(sessionStorage.getItem("commState")));
      //console.log(JSON.parse(sessionStorage.getItem("commState")));
      setComCity(JSON.parse(sessionStorage.getItem("commCity")));
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

  // const [filteredIndustries, setFilteredIndustries] = useState([]);
  // const [isExistsIndustry, setIsexistsIndustry] = useState();
  // const [isExistsAddr1, setIsExistsAddr1] = useState(true);

  // useEffect(() => {
  //   if (searchIndustry.search) {
  //     const filteredIndustries = memberIndustries.filter((industry) =>
  //       industry.type
  //         .toLowerCase()
  //         .includes(searchIndustry.search.toLowerCase()),
  //     );
  //     console.log(searchIndustry.search);

  //     if (filteredIndustries.length === 0) {
  //       setIndustryError("This is not a valid input.");
  //       console.log("This is not a valid input.");
  //       setIsexistsIndustry(false);
  //       // setSearchIndustry({ showLists: true });
  //     } else {
  //       setIndustryError("");
  //       console.log("This is a valid input.");
  //       setIsexistsIndustry(true);
  //     }

  //     setFilteredIndustries(filteredIndustries);
  //   } else {
  //     setFilteredIndustries([]);
  //     setIndustryError("");
  //   }
  // }, [searchIndustry.search, memberIndustries]);

  // const [filteredCountryCodes, setFilteredCountryCodes] = useState([]);
  // const [isExistsCountryCode, setIsexistsCountryCode] = useState(false);
  // useEffect(() => {
  //   if (searchCode.search) {
  //     const filteredCountryCodes = countryList.filter((country) =>
  //       country.name.toLowerCase().includes(searchCode.search.toLowerCase()),
  //     );

  //     if (filteredCountryCodes.length === 0) {
  //       setCodeError("This is not a valid Country Code.");
  //       console.log("This is not a valid input.");
  //       setSearchCode({ showCodes: false });
  //       setIsexistsCountryCode(true);
  //       //setIsexistsIndustry(false);
  //       // setSearchIndustry({ showLists: true });
  //     } else {
  //       setCodeError("");
  //       console.log("This is a valid input.");
  //       console.log(searchCode.search);
  //       setSearchCode({ showCodes: true });
  //       //setIsexistsIndustry(true);
  //       setFilteredCountryCodes(filteredCountryCodes);
  //       setIsexistsCountryCode(true);
  //     }

  //     setFilteredIndustries(filteredIndustries);
  //   } else {
  //     setFilteredIndustries([]);
  //     setCodeError("");
  //   }
  // }, [searchCode.search, countryList]);

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
      hasError = true;
      genderRef.current.focus();
    }
    // if (searchCode.search === "") {
    //   setCodeError("Country code is required.");
    //   hasError = true;
    //   //industryRef.current.focus();
    //   setSearchCode({ showCodes: true });
    // }

    if (phoneNumber === "") {
      setPhoneNumberError("Phone Number is required.");
      hasError = true;
      phoneNumberRef.current.focus();
    } else if (phoneNumber.length < 10) {
      setPhoneNumberError("Phone Number must be at least 10 digits.");
      hasError = true;
      phoneNumberRef.current.focus();
    }
    if (companyName === "") {
      setCompanyNameError("Company Name is required.");
      hasError = true;
      companyNameRef.current.focus();
    }
    // if (searchIndustry.search === "") {
    //   setIndustryError("Industry is required.");
    //   hasError = true;
    //   // setIsexistsIndustry(false);
    //   //industryRef.current.focus();
    // }
    if (communicationAddress.addressLine1 === "") {
      setCommunicationAddress1Error("Address Line 1 is required.");
      hasError = true;
      // setIsExistsAddr1(false);
      communication1Ref.current.focus();
    }

    if (communicationAddress.postalCode === "") {
      setCommunicationPostalCodeError("Postal Code is required.");
      hasError = true;
      setIsexistsPostalCode(false);
      communicationPostalCodeRef.current.focus();
    }
    if (billingAddress.addressLine1 === "") {
      setBillingAddress1Error("Address Line 1 is required.");
      hasError = true;
      billing1Ref.current.focus();
    }

    if (billingAddress.postalCode === "") {
      setBillingPostalCodeError("Postal Code is required.");
      hasError = true;
      billingPostalCodeRef.current.focus();
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
  // console.log(curCountry);
  // console.log(countryData[100]);

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
  const [comCountry, setComCountry] = useState(
    JSON.parse(sessionStorage.getItem("commCountry")) || countryComData[100],
  );
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
    if (stateData) {
      setState(
        JSON.parse(sessionStorage.getItem("billingState")) || stateData[0],
      );
    }
  }, [stateData]);

  useEffect(() => {
    if (cityData) {
      setCity(JSON.parse(sessionStorage.getItem("billingCity")) || cityData[0]);
    }
  }, [cityData]);

  useEffect(() => {
    setStateData(State.getStatesOfCountry(country ? country.isoCode : ""));
  }, [country]);

  useEffect(() => {
    if (state) {
      setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
    }
  }, [state]);

  // copy stared here

  useEffect(() => {
    if (copyAddress) {
      console.log("hello");
      console.log(state);
      setComCountry(country || countryComData[100]);
      if (stateComData) {
        setComState(state || stateData[0]);
      }
      if (cityComData) {
        setComCity(city || cityComData[0]);
      }
    } else {
      setComCountry(
        JSON.parse(sessionStorage.getItem("commCountry")) ||
          countryComData[100],
      );
      setComState(JSON.parse(sessionStorage.getItem("commState")));
      if (cityComData) {
        setComCity(
          JSON.parse(sessionStorage.getItem("commCity")) || cityComData[0],
        );
      }

      // Here you might set the comState to the previous state or whatever default value you want
      // Example:
      // setComState(previousState => previousState || someDefaultValue);
    }
  }, [copyAddress, stateComData]);

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
            <Interest
              data={memberIndustries}
              selected={selected} // Pass the selected state variable here
              setSelected={setSelected} // Pass the setSelected function
            />

            {/* {filteredIndustries.length > 0 && searchIndustry.showLists && (
              <ListGroup className="w-full">
                {filteredIndustries.slice(0, 7).map((item) => (
                  <ListGroup.Item
                    key={item.id}
                    onClick={(e) =>
                      setSearchIndustry({
                        search: item.type,
                        showLists: false,
                      })
                    }
                  >
                    {item.type}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )} */}
          </div>
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
            <div>
              <Autocomplete
                data={countryData}
                selected={country}
                setSelected={setCountry}
              />
            </div>
            {stateData && stateData.length > 0 && (
              <div>
                <Autocomplete
                  data={stateData}
                  selected={state}
                  setSelected={setState}
                />
              </div>
            )}
            {cityData && cityData.length > 0 && (
              <div>
                <Autocomplete
                  data={cityData}
                  selected={city}
                  setSelected={setCity}
                />
              </div>
            )}
          </div>

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
            <div>
              <Autocomplete
                data={countryComData}
                selected={comCountry}
                setSelected={setComCountry}
              />
            </div>
            {stateComData && stateComData.length > 0 && (
              <div>
                <Autocomplete
                  data={stateComData}
                  selected={comState}
                  setSelected={setComState}
                />
              </div>
            )}
            {cityComData && (
              <div>
                <Autocomplete
                  data={cityComData}
                  selected={comCity}
                  setSelected={setComCity}
                />
              </div>
            )}
          </div>
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

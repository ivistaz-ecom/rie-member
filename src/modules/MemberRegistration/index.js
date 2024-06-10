import React, { useState, useRef, useEffect } from "react";
import {
  Label,
  TextInput,
  Select,
  ToggleSwitch,
  Button,
  ListGroup,
} from "flowbite-react";
import { memberIndustries, countryList } from "../../utils/data";
import SERVERCONFIG from "../../server.json";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { Country, State, City } from "country-state-city";

function Index() {
  const navigate = useNavigate();

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const memberInfo = sessionStorage.getItem("r_TokenMember_Session");
  const parseMemInfo = JSON.parse(memberInfo);
  const memberSavedInfo = sessionStorage.getItem("r_TokenMember_Info");
  const parseMemSavedInfo = JSON.parse(memberSavedInfo);
  const memberWelcomeInfo = sessionStorage.getItem("memberInfo");
  const memberContact = sessionStorage.getItem("r_TokenMember_Contact");
  const parserMemberContact = JSON.parse(memberContact);

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
    search: parserMemberContact ? parserMemberContact.code : "",
    showCodes: false,
  });
  const [searchCountry, setSearchCountry] = useState({
    search: "",
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

  useEffect(() => {
    // Fetch countries on component mount
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  useEffect(() => {
    if (searchCountry.search) {
      //console.log(searchCountry.search);
      // Fetch states based on selected country
      const allStates = State.getStatesOfCountry(searchCountry.search);
      setStates(allStates);

      setCities([]);
    }
  }, [searchCountry.search]);

  useEffect(() => {
    if (searchBillCountry.search) {
      //console.log(searchCountry.search);
      // Fetch states based on selected country
      const allStates = State.getStatesOfCountry(searchBillCountry.search);
      setStates(allStates);

      setCities([]);
    }
  }, [searchBillCountry.search]);

  useEffect(() => {
    if (searchState.state) {
      // Fetch cities based on selected state
      const allCities = City.getCitiesOfState(
        searchCountry.search,
        searchState.search,
      );
      setCities(allCities);
    }
  }, [searchCountry.search, searchState.search]);

  useEffect(() => {
    if (searchBillState.state) {
      // Fetch cities based on selected state
      const allCities = City.getCitiesOfState(
        searchBillCountry.search,
        searchBillState.search,
      );
      setCities(allCities);
    }
  }, [searchBillCountry.search, searchBillState.search]);

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
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [industryError, setIndustryError] = useState("");
  const [communicationAddress1Error, setCommunicationAddress1Error] =
    useState("");
  // const [communicationAddress2Error, setCommunicationAddress2Error] =
  //   useState("");
  const [communicationCountryError, setCommunicationCountryError] =
    useState("");
  const [communicationStateError, setCommunicationStateError] = useState("");
  const [communicationCityError, setCommunicationCityError] = useState("");
  const [communicationPostalCodeError, setCommunicationPostalCodeError] =
    useState("");
  const [billingAddress1Error, setBillingAddress1Error] = useState("");
  // const [billingAddress2Error, setBillingAddress2Error] = useState("");
  const [billingCountryError, setBillingCountryError] = useState("");
  const [billingStateError, setBillingStateError] = useState("");
  const [billingCityError, setBillingCityError] = useState("");
  const [billingPostalCodeError, setBillingPostalCodeError] = useState("");

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
      setSearchBillCountry({ country: searchCountry.country });
      setSearchBillState({ state: searchState.state });
      setSearchBillCity({ city: searchCity.city });
      //console.log(searchCountry.country);
      // If toggle switch is turned on, copy communication address to billing address
      //updateCopiedData();
      setBillingAddress({
        addressLine1: communicationAddress.addressLine1,
        addressLine2: communicationAddress.addressLine2,
        country: searchCountry.country,
        state: searchState.state,
        city: searchCity.city,
        postalCode: communicationAddress.postalCode,
      });
    } else {
      // If toggle switch is turned off, clear billing address fields
      setSearchBillCountry({
        country: parseMemSavedInfo
          ? parseMemSavedInfo.riemembers.comcountry
          : "",
      });
      setSearchBillState({
        state: parseMemSavedInfo ? parseMemSavedInfo.riemembers.comstate : "",
      });
      setSearchBillCity({
        city: parseMemSavedInfo ? parseMemSavedInfo.riemembers.comcity : "",
      });
      setBillingAddress({
        addressLine1: parseMemSavedInfo
          ? parseMemSavedInfo.riemembers.comaddr1
          : "",
        addressLine2: parseMemSavedInfo
          ? parseMemSavedInfo.riemembers.comaddr2
          : "",
        country: parseMemSavedInfo
          ? parseMemSavedInfo.riemembers.comcountry
          : "",
        state: parseMemSavedInfo ? parseMemSavedInfo.riemembers.comstate : "",
        city: parseMemSavedInfo ? parseMemSavedInfo.riemembers.comcity : "",
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

  const filteredIndustries = memberIndustries.filter((industry) =>
    industry.type.toLowerCase().includes(searchIndustry.search.toLowerCase()),
  );
  const filteredCountryCodes = countryList.filter((country) =>
    country.name.toLowerCase().includes(searchCode.search.toLowerCase()),
  );
  const filteredCountry = countries.filter((country) =>
    country.name
      .toLowerCase()
      .includes(communicationAddress.country.toLowerCase()),
  );
  const filteredStates = states.filter((state) =>
    state.name.toLowerCase().includes(communicationAddress.state.toLowerCase()),
  );

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(communicationAddress.city.toLowerCase()),
  );

  const filteredBillCountry = countries.filter((country) =>
    country.name.toLowerCase().includes(billingAddress.country.toLowerCase()),
  );
  const filteredBillStates = states.filter((state) =>
    state.name.toLowerCase().includes(billingAddress.state.toLowerCase()),
  );

  const filteredBillCities = cities.filter((city) =>
    city.name.toLowerCase().includes(billingAddress.city.toLowerCase()),
  );

  const submitMemberData = async (e) => {
    e.preventDefault();
    setLoader(true);
    setGenderError("");
    setPhoneNumberError("");
    setCompanyNameError("");
    setIndustryError("");
    setCommunicationAddress1Error("");
    // setCommunicationAddress2Error("");
    setCommunicationCountryError("");
    setCommunicationStateError("");
    setCommunicationCityError("");
    setCommunicationPostalCodeError("");
    setBillingAddress1Error("");
    // setBillingAddress2Error("");
    setBillingCountryError("");
    setBillingStateError("");
    setBillingCityError("");
    setBillingPostalCodeError("");

    let hasError = false;
    if (gender === "") {
      setGenderError("Gender is required.");
      hasError = true;
      genderRef.current.focus();
    }
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
    if (searchIndustry.search === "") {
      setIndustryError("Industry is required.");
      hasError = true;
      industryRef.current.focus();
    }
    if (communicationAddress.addressLine1 === "") {
      setCommunicationAddress1Error("Address Line 1 is required.");
      hasError = true;
      communication1Ref.current.focus();
    }
    // if (communicationAddress.addressLine2 === "") {
    //   setCommunicationAddress2Error("Address Line 2 is required.");
    //   hasError = true;
    //   communication2Ref.current.focus();
    // }
    if (searchCountry.country === "") {
      setCommunicationCountryError("Country is required.");
      hasError = true;
      communicationCountryRef.current.focus();
    }
    if (searchState.state === "") {
      setCommunicationStateError("State is required.");
      hasError = true;
      communicationStateRef.current.focus();
    }
    if (searchCity.city === "") {
      setCommunicationCityError("City is required.");
      hasError = true;
      communicationCityRef.current.focus();
    }
    if (communicationAddress.postalCode === "") {
      setCommunicationPostalCodeError("Postal Code is required.");
      hasError = true;
      communicationPostalCodeRef.current.focus();
    }
    if (billingAddress.addressLine1 === "") {
      setBillingAddress1Error("Address Line 1 is required.");
      hasError = true;
      billing1Ref.current.focus();
    }
    // if (billingAddress.addressLine2 === "") {
    //   setBillingAddress2Error("Address Line 2 is required.");
    //   hasError = true;
    //   billing2Ref.current.focus();
    // }
    if (billingAddress.country === "") {
      setBillingCountryError("Country is required.");
      hasError = true;
      billingCountryRef.current.focus();
    }
    if (billingAddress.state === "") {
      setBillingStateError("State is required.");
      hasError = true;
      billingStateRef.current.focus();
    }
    if (billingAddress.city === "") {
      setBillingCityError("City is required.");
      hasError = true;
      billingCityRef.current.focus();
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

    const updatedMemberInfo = {
      eoid: parseMemInfo[0].id,
      gender: gender,
      mobile: searchCode.search + phoneNumber,
      industry: searchIndustry.search,
      company: companyName,
      addr1: communicationAddress.addressLine1,
      addr2: communicationAddress.addressLine2,
      country: searchCountry.country,
      state: searchState.state,
      city: searchCity.city,
      pin: communicationAddress.postalCode,
      comaddr1: billingAddress.addressLine1,
      comaddr2: billingAddress.addressLine2,
      comcountry: billingAddress.country,
      comstate: billingAddress.state,
      comcity: billingAddress.city,
      compin: billingAddress.postalCode,
      gstno: gstNumber,
      spouseid: parseMemInfo[0].spouse_id,
      regstatus: "no",
    };
    const MemberPhoneNumber = {
      mobile: phoneNumber,
      code: searchCode.search,
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

  return (
    <div className="flex flex-col items-center justify-center bg-[#210657]">
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
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="Search Country"
              className="w-1/2 text-[8px] placeholder:text-gray-500"
              value={searchCode.search}
              onChange={(e) =>
                setSearchCode({ search: e.target.value, showCodes: true })
              }
              // onBlur={() => setSearchCode({ showCodes: false })}
              //onFocus={() => setSearchCode({ showCodes: true })}
              //ref={phoneNumberRef}
            />
            {searchCode.showCodes && (
              <div className="absolute top-14 z-40 w-full">
                <ListGroup className="w-full">
                  {filteredCountryCodes.slice(0, 7).map((item) => (
                    <ListGroup.Item
                      key={item.id}
                      onClick={(e) =>
                        setSearchCode({
                          search: item.dial_code,
                          showLists: false,
                        })
                      }
                    >
                      {item.emoji} ({item.dial_code}) {item.name}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            )}
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="Mobile Number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              //onBlur={() => setPhoneNumberError("")}
              ref={phoneNumberRef}
              className="-0 w-full rounded"
            />
          </div>
          <div>
            {phoneNumberError && (
              <p className="p-2 text-start text-red-500">{phoneNumberError}</p>
            )}
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
              ref={companyNameRef}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            {companyNameError && (
              <p className="p-2 text-start text-red-500">{companyNameError}</p>
            )}
          </div>
          <div>
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="Industry"
              value={searchIndustry.search}
              onChange={(e) =>
                setSearchIndustry({ search: e.target.value, showLists: true })
              }
              ref={industryRef}
            />
            {industryError && (
              <p className="p-2 text-start text-red-500">{industryError}</p>
            )}
            <div>
              {searchIndustry.showLists && (
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
              )}
            </div>
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
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="Country"
              value={searchCountry.country}
              onChange={(e) => {
                handleCommunicationAddressChange("country", e.target.value);
                setSearchCountry({ showCountry: true });
              }}
              ref={communicationCountryRef}
            />
            {communicationCountryError && (
              <p className="p-2 text-start text-red-500">
                {communicationCountryError}
              </p>
            )}

            {searchCountry.showCountry && (
              <ListGroup className="w-full">
                {filteredCountry.slice(0, 7).map((item) => (
                  <ListGroup.Item
                    key={item.id}
                    onClick={() =>
                      setSearchCountry({
                        search: item.isoCode,
                        showCountry: false,
                        country: item.name,
                      })
                    }
                  >
                    {item.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>
          <div>
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="State"
              value={searchState.state}
              onChange={(e) => {
                handleCommunicationAddressChange("state", e.target.value);
                setSearchState({ showState: true });
              }}
              ref={communicationStateRef}
            />
            {communicationStateError && (
              <p className="p-2 text-start text-red-500">
                {communicationStateError}
              </p>
            )}

            {searchState.showState && (
              <ListGroup className="w-full">
                {filteredStates.slice(0, 7).map((item) => (
                  <ListGroup.Item
                    key={item.id}
                    onClick={() =>
                      setSearchState({
                        search: item.isoCode,
                        showState: false,
                        state: item.name,
                      })
                    }
                  >
                    {item.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>
          <div>
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="City"
              value={searchCity.city}
              onChange={(e) => {
                handleCommunicationAddressChange("city", e.target.value);
                setSearchCity({ showCity: true });
              }}
              ref={communicationCityRef}
            />
            {communicationCityError && (
              <p className="p-2 text-start text-red-500">
                {communicationCityError}
              </p>
            )}

            {searchCity.showCity && (
              <ListGroup className="w-full">
                {filteredCities.slice(0, 7).map((item) => (
                  <ListGroup.Item
                    key={item.id}
                    onClick={() =>
                      setSearchCity({
                        search: item.isoCode,
                        showCity: false,
                        city: item.name,
                      })
                    }
                  >
                    {item.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>
          <div>
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="Postal Code"
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
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="Country"
              value={searchBillCountry.country}
              onChange={(e) => {
                setBillingAddress({
                  ...billingAddress,
                  country: e.target.value,
                });
                setSearchBillCountry({ showCountry: true });
              }}
              ref={billingCountryRef}
            />

            {billingCountryError && (
              <p className="p-2 text-start text-red-500">
                {billingCountryError}
              </p>
            )}
            {searchBillCountry.showCountry && (
              <ListGroup className="w-full">
                {filteredBillCountry.slice(0, 7).map((item) => (
                  <ListGroup.Item
                    key={item.id}
                    onClick={() =>
                      setSearchBillCountry({
                        search: item.isoCode,
                        showCountry: false,
                        country: item.name,
                      })
                    }
                  >
                    {item.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>
          <div>
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="State"
              // value={billingAddress.state}
              // onChange={(e) =>
              //   setBillingAddress({
              //     ...billingAddress,
              //     state: e.target.value,
              //   })
              // }
              value={searchBillState.state}
              onChange={(e) => {
                setBillingAddress({
                  ...billingAddress,
                  state: e.target.value,
                });
                setSearchBillState({ showState: true });
              }}
              ref={billingStateRef}
            />
            {billingStateError && (
              <p className="p-2 text-start text-red-500">{billingStateError}</p>
            )}

            {searchBillState.showState && (
              <ListGroup className="w-full">
                {filteredBillStates.slice(0, 7).map((item) => (
                  <ListGroup.Item
                    key={item.id}
                    onClick={() =>
                      setSearchBillState({
                        search: item.isoCode,
                        showState: false,
                        state: item.name,
                      })
                    }
                  >
                    {item.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>
          <div>
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="City"
              // value={billingAddress.city}
              // onChange={(e) =>
              //   setBillingAddress({
              //     ...billingAddress,
              //     city: e.target.value,
              //   })
              // }
              value={searchBillCity.city}
              onChange={(e) => {
                setBillingAddress({
                  ...billingAddress,
                  city: e.target.value,
                });
                setSearchBillCity({ showCity: true });
              }}
              ref={billingCityRef}
            />
            {billingCityError && (
              <p className="p-2 text-start text-red-500">{billingCityError}</p>
            )}

            {searchBillCity.showCity && (
              <ListGroup className="w-full">
                {filteredBillCities.slice(0, 7).map((item) => (
                  <ListGroup.Item
                    key={item.id}
                    onClick={() =>
                      setSearchBillCity({
                        search: item.isoCode,
                        showCity: false,
                        city: item.name,
                      })
                    }
                  >
                    {item.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>
          <div>
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="Postal Code"
              value={billingAddress.postalCode}
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
      </div>
      {loader && <Loader />}
    </div>
  );
}

export default Index;

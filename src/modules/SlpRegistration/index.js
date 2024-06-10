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

function Index() {
  const navigate = useNavigate();
  const memberSavedInfo = sessionStorage.getItem("r_TokenMember_Info");
  const parseMemSavedInfo = JSON.parse(memberSavedInfo);
  const memberContact = sessionStorage.getItem("r_TokenMember_Contact");
  const parserMemberContact = JSON.parse(memberContact);
  const memberInfo = sessionStorage.getItem("r_TokenMember_Session");
  const parseMemInfo = JSON.parse(memberInfo);
  const slpSavedInfo = sessionStorage.getItem("r_TokenMember_Slp");
  const parseSlpSavedInfo = JSON.parse(slpSavedInfo);
  const slpContact = sessionStorage.getItem("r_TokenSLP_Contact");
  const parseSlpContact = JSON.parse(slpContact);

  const [copyAddress, setCopyAddress] = useState(false);
  const [copyCompany, setCompany] = useState(false);
  const [gstNumber, setGstNumber] = useState("");
  const [isValidGst, setIsValidGst] = useState(false);
  const [hideGst, setIsHideGst] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(
    parseSlpContact ? parseSlpContact.mobile : "",
  );
  const [emailAddress, setEmailAddress] = useState(
    parseSlpSavedInfo ? parseSlpSavedInfo.slp.email : "",
  );
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [companyName, setCompanyName] = useState("");
  const [loader, setLoader] = useState(false);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [gender, setGender] = useState(
    parseSlpSavedInfo ? parseSlpSavedInfo.slp.gender : "",
  );

  const [firstName, setFirstName] = useState(
    parseSlpSavedInfo ? parseSlpSavedInfo.slp.firstname : "",
  );
  const [lastName, setLastName] = useState(
    parseSlpSavedInfo ? parseSlpSavedInfo.slp.lastname : "",
  );

  const [searchCountry, setSearchCountry] = useState({
    search: "",
    showCountry: false,
    country: "",
  });
  const [searchState, setSearchState] = useState({
    search: "",
    showState: false,
    state: "",
  });
  const [searchCity, setSearchCity] = useState({
    search: "",
    showCity: false,
    city: "",
  });
  const [searchIndustry, setSearchIndustry] = useState({
    search: "",
    showLists: false,
  });
  const [searchCode, setSearchCode] = useState({
    search: parseSlpContact ? parseSlpContact.code : "",
    showCodes: false,
  });

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
  const [industryError, setIndustryError] = useState("");
  const [communicationCountryError, setCommunicationCountryError] =
    useState("");
  const [communicationStateError, setCommunicationStateError] = useState("");
  const [communicationCityError, setCommunicationCityError] = useState("");
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
      // If toggle switch is turned on, copy communication address to billing address
      setSearchCountry({
        country: memberSavedInfo ? parseMemSavedInfo.riemembers.comcountry : "",
      });
      setSearchCity({
        city: memberSavedInfo ? parseMemSavedInfo.riemembers.comcity : "",
      });
      setSearchState({
        state: memberSavedInfo ? parseMemSavedInfo.riemembers.comstate : "",
      });
      setCommunicationAddress({
        addressLine1: memberSavedInfo
          ? parseMemSavedInfo.riemembers.comaddr1
          : "",
        addressLine2: memberSavedInfo
          ? parseMemSavedInfo.riemembers.comaddr2
          : "",
        country: "",
        state: memberSavedInfo ? parseMemSavedInfo.riemembers.comstate : "",
        city: memberSavedInfo ? parseMemSavedInfo.riemembers.comcity : "",
        postalCode: memberSavedInfo ? parseMemSavedInfo.riemembers.compin : "",
      });
    } else {
      // If toggle switch is turned off, clear billing address fields
      setSearchCountry({
        country: "",
      });
      setSearchCity({
        city: "",
      });
      setSearchState({
        state: "",
      });
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
      //console.log("checked");
      setCompanyName(
        memberSavedInfo ? parseMemSavedInfo.riemembers.company : "",
      );
      setSearchIndustry({
        search: memberSavedInfo ? parseMemSavedInfo.riemembers.industry : "",
      });
      setGstNumber(memberSavedInfo ? parseMemSavedInfo.riemembers.gstno : "");
    } else {
      console.log("not checked");
      setCompanyName("");
      setSearchIndustry({ search: "" });
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
    if (searchState.state) {
      // Fetch cities based on selected state
      const allCities = City.getCitiesOfState(
        searchCountry.search,
        searchState.search,
      );
      setCities(allCities);
    }
  }, [searchCountry.search, searchState.search]);

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
  const filteredIndustries = memberIndustries.filter((industry) =>
    industry.type.toLowerCase().includes(searchIndustry.search.toLowerCase()),
  );
  const filteredCountryCodes = countryList.filter((country) =>
    country.name.toLowerCase().includes(searchCode.search.toLowerCase()),
  );

  const submitMemberData = async (e) => {
    e.preventDefault();
    setLoader(true);
    setGenderError("");
    // setLoader(true);
    let hasError = false;
    if (gender === "") {
      setGenderError("Gender is required.");
      hasError = true;
      genderRef.current.focus();
    } else {
      setGenderError();
    }
    if (firstName === "") {
      setFirstNameError("FirstName is required.");
      hasError = true;
      firstNameRef.current.focus();
    } else {
      setFirstNameError();
    }
    if (lastName === "") {
      setLastNameError("LastName is required.");
      hasError = true;
      lastNameRef.current.focus();
    } else {
      setLastNameError();
    }
    if (emailAddress === "") {
      setEmailError("Email is required.");
      hasError = true;
      emailRef.current.focus();
    } else {
      setEmailError();
    }
    if (phoneNumber === "") {
      setPhoneNumberError("Phone Number is required.");
      hasError = true;
      phoneNumberRef.current.focus();
    } else if (phoneNumber.length < 10) {
      setPhoneNumberError("Phone Number must be at least 10 digits.");
      hasError = true;
      phoneNumberRef.current.focus();
    } else {
      setPhoneNumberError();
    }
    if (companyName === "") {
      setCompanyNameError("Company Name is required.");
      hasError = true;
      companyNameRef.current.focus();
    } else {
      setCompanyNameError();
    }
    if (searchIndustry.search === "") {
      setIndustryError("Industry is required.");
      hasError = true;
      industryRef.current.focus();
    } else {
      setIndustryError();
    }
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
    if (searchCountry.country === "") {
      setCommunicationCountryError("Country is required.");
      hasError = true;
      communicationCountryRef.current.focus();
    } else {
      setCommunicationCountryError();
    }
    if (searchState.state === "") {
      setCommunicationStateError("State is required.");
      hasError = true;
      communicationStateRef.current.focus();
    } else {
      setCommunicationStateError();
    }
    if (searchCity.city === "") {
      setCommunicationCityError("City is required.");
      hasError = true;
      communicationCityRef.current.focus();
    } else {
      setCommunicationCityError();
    }
    if (communicationAddress.postalCode === "") {
      setCommunicationPostalCodeError("Postal Code is required.");
      hasError = true;
      communicationPostalCodeRef.current.focus();
    } else {
      setCommunicationPostalCodeError();
    }
    if (hasError) {
      setLoader(false);
      return;
    }
    const formatedData = {
      firstname: firstName,
      lastname: lastName,
      gender: gender,
      email: emailAddress,
      mobile: searchCode.search + phoneNumber,
      industry: searchIndustry.search,
      company: companyName,
      gstno: gstNumber,
      regstatus: "false",
      eoid: parseMemInfo[0].id,
      addr1: communicationAddress.addressLine1,
      addr2: communicationAddress.addressLine2,
      city: searchCity.city,
      state: searchState.state,
      pin: communicationAddress.postalCode,
      country: searchCountry.country,
    };
    const MemberPhoneNumber = {
      mobile: phoneNumber,
      code: searchCode.search,
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

  return (
    <div className="flex flex-col items-center justify-center bg-[#210657]">
      <div className="w-full p-4 text-center lg:w-1/3">
        <h2 className="text-1xl  pb-10 font-semibold text-white lg:text-2xl">
          SLP Information
        </h2>
        <div className="flex flex-col gap-4">
          <div className="grid  grid-cols-2 gap-2 ">
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="First Name"
              className="w-full"
              value={firstName}
              ref={firstNameRef}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="Last Name"
              className="w-full"
              value={lastName}
              ref={lastNameRef}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="grid  grid-cols-2 gap-1 ">
            <div className="w-full">
              {firstNameError && (
                <p className="p-2 text-start text-red-500">{firstNameError}</p>
              )}
            </div>
            <div className="w-full">
              {lastNameError && (
                <p className=" p-2 text-start text-red-500">{lastNameError}</p>
              )}
            </div>
          </div>

          <div>
            <Select
              id="countries"
              required
              sizing="lg"
              ref={genderRef}
              onChange={(e) => setGender(e.target.value)}
            >
              <option>Gender</option>
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
          <div>
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="Enter SLP Email"
              ref={emailRef}
              value={emailAddress}
              onChange={handleEmailAddressChange}
            />
            {!isValidEmail && emailAddress !== "" && (
              <div className="text-start text-red-500">
                Invalid email address
              </div>
            )}
            {emailError && (
              <p className="p-2 text-start text-red-500">{emailError}</p>
            )}
          </div>
          <div className="relative flex gap-2">
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="Search Country"
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
              className="w-full rounded"
            />
          </div>
          <div>
            {" "}
            {phoneNumberError && (
              <p className="p-2 text-start text-red-500">{phoneNumberError}</p>
            )}
          </div>
        </div>
        <h2 className="py-4 text-start text-white">Communication Address</h2>
        <div className="flex max-w-md flex-col gap-4 py-4">
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
        <div className="flex flex-col gap-4">
          <div>
            <TextInput
              id="small"
              type="text"
              sizing="lg"
              placeholder="Address Line 1"
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
        <h2 className="py-4 text-start text-white">Business Details</h2>
        <div className="flex max-w-md flex-col gap-4 py-4">
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

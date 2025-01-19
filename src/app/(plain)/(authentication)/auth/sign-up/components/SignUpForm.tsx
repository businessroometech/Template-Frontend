import PasswordFormInput from '@/components/form/PasswordFormInput'
import TextFormInput from '@/components/form/TextFormInput'
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter'
import { currentYear, developedBy, developedByLink } from '@/context/constants'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button, FormCheck } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import useSignUp from './useSignUp'
import RoleSelectionModal from '@/components/cards/RoleSelectionModal'
import DatePicker from "react-datepicker";
import "./datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import { MIN_ALLOWED_AGE } from '@/utils/constants'
import { addYears } from 'date-fns';
import { log } from 'console'

const SignUpForm = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [firstPassword, setFirstPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [role,setRole] = useState<string>("");
  const [showModal,setShowModal] = useState<boolean>(false);
  const [dob, setDob] = useState<string>('');
  const [error, setError] = useState("");
  const { signUp,loading } = useSignUp();
  const today = new Date();
  const minDate = new Date("1900-01-01");
  const maxAllowedDate = addYears(today, -MIN_ALLOWED_AGE);
  
  const signUpSchema = yup.object({
    firstName: yup.string().required('Please Enter First Name').required('Please Enter Your First Name'),
    lastName: yup.string().required('Please Enter Last Name').required('Please Enter Your Last Name'),
    email: yup.string().email('Please Enter a Valid Email').required('Please Enter Your Email'),
    password: yup.string().required('Please Enter Your Password'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords Must Match').required('Please Enter Your Confirm Password'),
    country: yup.string().required('Please Select Your Country'),
  });

  const { control, handleSubmit, getValues, watch } = useForm({
    resolver: yupResolver(signUpSchema),
  });
  console.log('----role----',role);
  const handleRoleSelect = (roleId) => {
    console.log("Selected role:", roleId);
    setRole(roleId);
  };

  function PrintRole(role : string) {
    if(role == undefined || role == '') {
      return null
    }
    else if(role == 'entrepreneur') return 'Entreprenuer'
    else if(role == 'investor') return 'Investor'
    else return null;
  }

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`;
  };

  
  useEffect(() => {
    setFirstPassword(getValues().password);
    setConfirmPassword(getValues().confirmPassword);
    setEmail(getValues().email);
    setFirstName(getValues().firstName);
    setLastName(getValues().lastName);
    setCountry(getValues().country);
  }, [watch('email'), watch('password'), watch('firstName'), watch('lastName'), watch('confirmPassword'), watch('country')]);


  if (showModal) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 1000,
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Black with transparency
          backdropFilter: "blur(10px)", // Blur effect
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RoleSelectionModal
          show={showModal}
          onHide={() => setShowModal(false)} // Hide the modal when clicking close
          onSelectRole={handleRoleSelect}
        />
      </div>
    );
  }
  return (
    <form
  className="mt-4"
  onSubmit={handleSubmit(async () => {
    if(role  === '') {
      setShowModal(true);
      return;
    }
    if(dob === '') {
      alert('Enter Your Dob');
      return;
    }
    // console.log(firstName,lastName,email,firstPassword,confirmPassword,dob,country,role);
    await signUp({
      email,
      firstName,
      lastName,
      firstPassword,
      confirmPassword,
      role,
      dob, 
      country,
    });
  })}
>
      <div className="mb-3">
        <TextFormInput name="firstName" control={control} containerClassName="input-group-lg" placeholder="Enter Your First Name" />
      </div>
      <div className="mb-3">
        <TextFormInput name="lastName" control={control} containerClassName="input-group-lg" placeholder="Enter Your Last Name" />
      </div>
      <div className="mb-3">
        <TextFormInput name="email" control={control} containerClassName="input-group-lg" placeholder="Enter Your Email" />
      </div>
      <div>
      <DatePicker
        placeholderText="Enter Your Date Of Birth"
        className="form-control input-group-lg mb-3"
        value={dob}
        onChange={(date) => {
          if (date > today) {
            console.log('> today')
            setError("Date cannot be in the future.");
          } else if (date > maxAllowedDate) {
            console.log('> max allowed')
            setError(`You Must be at Least ${MIN_ALLOWED_AGE} Years Old.`);
          } else {
            console.log('fine')
            setError("");
            setDob(formatDate(date));
          }
        }}
        // onChangeRaw={(e) => {
        //   setError("");
        //   const inputDate = e.target.value
        //   if (isNaN(inputDate.getTime())) {
        //     setError("Invalid Date Format. Use DD/MM/YY.");
        //   } else if (inputDate > today) {
        //     setError("Date cannot be in the future.");
        //   } else if (inputDate > maxAllowedDate) {
        //     setError("You must be at least 16 years old.");
        //   } else {
        //     setError("");
        //     setDob(formatDate(inputDate));
        //   }
        // }}
        dateFormat="DD/MM/YY" // Set date format to dd/mm/yy
        maxDate={maxAllowedDate} // Prevent future dates
        minDate={minDate} // Allow dates from 1900 onwards
        showYearDropdown // Enable year dropdown
        scrollableYearDropdown // Allow scrolling for years
        yearDropdownItemNumber={120} // Number of years in the dropdown (e.g., last 120 years)
        showMonthDropdown // Enable month dropdown
        scrollableMonthYearDropdown // Make the dropdown scrollable (optional)
      />
      {error && <p style={{ color: "red", marginTop: "5px" }}>{error}</p>}
    </div>

      <div className="mb-3">
        <TextFormInput
          name="country"
          control={control}
          containerClassName="input-group-lg"
          as="select"
          placeholder="Select Your Country"
        >
          <option value="">Select your Country</option>
          <option value="Afghanistan">Afghanistan</option>
          <option value="Albania">Albania</option>
          <option value="Algeria">Algeria</option>
          <option value="American Samoa">American Samoa</option>
          <option value="Andorra">Andorra</option>
          <option value="Angola">Angola</option>
          <option value="Anguilla">Anguilla</option>
          <option value="Antigua & Barbuda">Antigua & Barbuda</option>
          <option value="Argentina">Argentina</option>
          <option value="Armenia">Armenia</option>
          <option value="Australia">Australia</option>
          <option value="Austria">Austria</option>
          <option value="Azerbaijan">Azerbaijan</option>
          <option value="Bahamas">Bahamas</option>
          <option value="Bahrain">Bahrain</option>
          <option value="Bangladesh">Bangladesh</option>
          <option value="Barbados">Barbados</option>
          <option value="Belarus">Belarus</option>
          <option value="Belgium">Belgium</option>
          <option value="Belize">Belize</option>
          <option value="Bermuda">Bermuda</option>
          <option value="Bhutan">Bhutan</option>
          <option value="Bolivia">Bolivia</option>
          <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
          <option value="Botswana">Botswana</option>
          <option value="Brazil">Brazil</option>
          <option value="Brunei">Brunei</option>
          <option value="Bulgaria">Bulgaria</option>
          <option value="Burkina Faso">Burkina Faso</option>
          <option value="Burundi">Burundi</option>
          <option value="Cambodia">Cambodia</option>
          <option value="Cameron">Cameron</option>
          <option value="Canada">Canada</option>
          <option value="Cape Verde">Cape Verde</option>
          <option value="Cayman Island">Cayman Island</option>
          <option value="Central African Republic">Central African Republic</option>
          <option value="Chad">Chad</option>
          <option value="Chile">Chile</option>
          <option value="China">China</option>
          <option value="Columbia">Columbia</option>
          <option value="Comoros">Comoros</option>
          <option value="Congo">Congo</option>
          <option value="Cook Islands">Cook Islands</option>
          <option value="Costa Rica">Costa Rica</option>
          <option value="Cote d'Ivoire">Cote d'Ivoire</option>
          <option value="Croatia">Croatia</option>
          <option value="Cuba">Cuba</option>
          <option value="Cyprus">Cyprus</option>
          <option value="Czech Republic">Czech Republic</option>
          <option value="Denmark">Denmark</option>
          <option value="Djibouti">Djibouti</option>
          <option value="Dominica">Dominica</option>
          <option value="Dominican Republic">Dominican Republic</option>
          <option value="East Timor">East Timor</option>
          <option value="Ecuador">Ecuador</option>
          <option value="Egypt">Egypt</option>
          <option value="El Salvador">El Salvador</option>
          <option value="Equatorial Guinea">Equatorial Guinea</option>
          <option value="Eritrea">Eritrea</option>
          <option value="Estonia">Estonia</option>
          <option value="Ethiopia">Ethiopia</option>
          <option value="Falkland Islands">Falkland Islands</option>
          <option value="Faroe Islands">Faroe Islands</option>
          <option value="Fiji Islands">Fiji Islands</option>
          <option value="Finland">Finland</option>
          <option value="France">France</option>
          <option value="French Guiana">French Guiana</option>
          <option value="French Polynesia">French Polynesia</option>
          <option value="Gabon">Gabon</option>
          <option value="Gambia">Gambia</option>
          <option value="Georgia">Georgia</option>
          <option value="Germany">Germany</option>
          <option value="Ghana">Ghana</option>
          <option value="Gibraltar">Gibraltar</option>
          <option value="Greece">Greece</option>
          <option value="Greenland">Greenland</option>
          <option value="Grenada">Grenada</option>
          <option value="Guadeloupe">Guadeloupe</option>
          <option value="Guam">Guam</option>
          <option value="Guatemala">Guatemala</option>
          <option value="Guinea">Guinea</option>
          <option value="Guinea-Bissau">Guinea-Bissau</option>
          <option value="Guyana">Guyana</option>
          <option value="Haiti">Haiti</option>
          <option value="Honduras">Honduras</option>
          <option value="Hong Kong">Hong Kong</option>
          <option value="Hungary">Hungary</option>
          <option value="Iceland">Iceland</option>
          <option value="India">India</option>
          <option value="Indonesia">Indonesia</option>
          <option value="Iran">Iran</option>
          <option value="Iraq">Iraq</option>
          <option value="Ireland">Ireland</option>
          <option value="Israel">Israel</option>
          <option value="Italy">Italy</option>
          <option value="Jamaica">Jamaica</option>
          <option value="Japan">Japan</option>
          <option value="Jordan">Jordan</option>
          <option value="Kazakhstan">Kazakhstan</option>
          <option value="Kenya">Kenya</option>
          <option value="Kiribati">Kiribati</option>
          <option value="Korea">Korea</option>
          <option value="Kuwait">Kuwait</option>
          <option value="Kyrgyzstan">Kyrgyzstan</option>
          <option value="Laos">Laos</option>
          <option value="Latvia">Latvia</option>
          <option value="Lebanon">Lebanon</option>
          <option value="Lesotho">Lesotho</option>
          <option value="Liberia">Liberia</option>
          <option value="Libya">Libya</option>
          <option value="Liechtenstein">Liechtenstein</option>
          <option value="Lithuania">Lithuania</option>
          <option value="Luxembourg">Luxembourg</option>
          <option value="Macao">Macao</option>
          <option value="Macedonia">Macedonia</option>
          <option value="Madagascar">Madagascar</option>
          <option value="Mali">Mali</option>
          <option value="Malta">Malta</option>
          <option value="Martinique">Martinique</option>
          <option value="Mauritania">Mauritania</option>
          <option value="Mauritius">Mauritius</option>
          <option value="Mayotte">Mayotte</option>
          <option value="Mexico">Mexico</option>
          <option value="Micronesia">Micronesia</option>
          <option value="Moldova">Moldova</option>
          <option value="Monaco">Monaco</option>
          <option value="Mongolia">Mongolia</option>
          <option value="Montserrat">Montserrat</option>
          <option value="Morocco">Morocco</option>
          <option value="Mozambique">Mozambique</option>
          <option value="Myanmar">Myanmar</option>
          <option value="Namibia">Namibia</option>
          <option value="Nauru">Nauru</option>
          <option value="Nepal">Nepal</option>
          <option value="Netherlands">Netherlands</option>
          <option value="Netherlands Antilles">Netherlands Antilles</option>
          <option value="New Caledonia">New Caledonia</option>
          <option value="New Zealand">New Zealand</option>
          <option value="Nicaragua">Nicaragua</option>
          <option value="Niger">Niger</option>
          <option value="Nigeria">Nigeria</option>
          <option value="Niue">Niue</option>
          <option value="Norfolk Island">Norfolk Island</option>
          <option value="North Korea">North Korea</option>
          <option value="Norway">Norway</option>
          <option value="Oman">Oman</option>
          <option value="Pakistan">Pakistan</option>
          <option value="Panama">Panama</option>
          <option value="Papua New Guinea">Papua New Guinea</option>
          <option value="Paraguay">Paraguay</option>
          <option value="Peru">Peru</option>
          <option value="Philippines">Philippines</option>
          <option value="Pitcairn Islands">Pitcairn Islands</option>
          <option value="Poland">Poland</option>
          <option value="Portugal">Portugal</option>
          <option value="Puerto Rico">Puerto Rico</option>
          <option value="Qatar">Qatar</option>
          <option value="Reunion">Reunion</option>
          <option value="Romania">Romania</option>
          <option value="Russia">Russia</option>
          <option value="Rwanda">Rwanda</option>
          <option value="Samoa">Samoa</option>
          <option value="San Marino">San Marino</option>
          <option value="Sao Tome and Principe">Sao Tome and Principe</option>
          <option value="Saudi Arabia">Saudi Arabia</option>
          <option value="Senegal">Senegal</option>
          <option value="Serbia and Montenegro">Serbia and Montenegro</option>
          <option value="Seychelles">Seychelles</option>
          <option value="Sierra Leone">Sierra Leone</option>
          <option value="Singapore">Singapore</option>
          <option value="Slovakia">Slovakia</option>
          <option value="Slovenia">Slovenia</option>
          <option value="Solomon Islands">Solomon Islands</option>
          <option value="Somalia">Somalia</option>
          <option value="South Africa">South Africa</option>
          <option value="Spain">Spain</option>
          <option value="Sri Lanka">Sri Lanka</option>
          <option value="St. Halena">St. Halena</option>
          <option value="St. Kitts and Nevis">St. Kitts and Nevis</option>
          <option value="St. Lucia">St. Lucia</option>
          <option value="St. Pierre and Miquelon">St. Pierre and Miquelon</option>
          <option value="St. Vincent & Grenadines">St. Vincent & Grenadines</option>
          <option value="Sudan">Sudan</option>
          <option value="Suriname">Suriname</option>
          <option value="Swaziland">Swaziland</option>
          <option value="Sweden">Sweden</option>
          <option value="Switzerland">Switzerland</option>
          <option value="Syria">Syria</option>
          <option value="Taiwan">Taiwan</option>
          <option value="Tajikistan">Tajikistan</option>
          <option value="Tanzania">Tanzania</option>
          <option value="Thailand">Thailand</option>
          <option value="Togo">Togo</option>
          <option value="Tokelau">Tokelau</option>
          <option value="Tonga">Tonga</option>
          <option value="Trinidad and Tobago">Trinidad and Tobago</option>
          <option value="Tunisia">Tunisia</option>
          <option value="Turkey">Turkey</option>
          <option value="Turkmenistan">Turkmenistan</option>
          <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
          <option value="Tuvalu">Tuvalu</option>
          <option value="Uganda">Uganda</option>
          <option value="Ukraine">Ukraine</option>
          <option value="United Arab Emirates">United Arab Emirates</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Uruguay">Uruguay</option>
          <option value="USA">USA</option>
          <option value="Uzbekistan">Uzbekistan</option>
          <option value="Vanuatu">Vanuatu</option>
          <option value="Venezuela">Venezuela</option>
          <option value="Vietnam">Vietnam</option>
          <option value="Virgin Islands">Virgin Islands</option>
          <option value="Virgin Islands (British)">Virgin Islands (British)</option>
          <option value="Wallis and Futuna">Wallis and Futuna</option>
          <option value="Yemen">Yemen</option>
          <option value="Yugoslavia">Yugoslavia</option>
          <option value="Zambia">Zambia</option>
          <option value="Zimbabwe">Zimbabwe</option>
        </TextFormInput>
      </div>
      <div className="mb-3 position-relative">
        <PasswordFormInput name="password" control={control} size="lg" placeholder="Enter New Password" />
        <div className="mt-2">
          <PasswordStrengthMeter password={firstPassword} />
        </div>
      </div>
      <PasswordFormInput name="confirmPassword" control={control} size="lg" containerClassName="mb-3" placeholder="Confirm Password" />
      <div className="mb-3 text-start">
        <FormCheck label="Keep me signed in" id="termAndCondition" />
      </div>
<div className="d-grid">
<Button
    variant="success"
    className="bg-success mb-3" // Add margin-bottom for spacing
    type="submit"
    size="lg"
    onClick={() => {
      setShowModal(true);
    }}
  >
    Select your Role{PrintRole(role) && <span style={{paddingLeft : '2px'}}>-({PrintRole(role)})</span>}
  </Button>
  <Button variant="primary" type="submit" size="lg" disabled={loading}>
  {loading ? (
    <>
      <span
        className="spinner-border spinner-border-sm me-2"
        role="status"
        aria-hidden="true"
      ></span>
      Processing...
    </>
  ) : (
    'Sign me up'
  )}
</Button>
</div>
      <p className="mb-0 mt-3 text-center">
        ©{currentYear}
        <Link target="_blank" to={developedByLink} style={{marginRight : '5px'}}>
          {developedBy}
        </Link>
        All rights reserved
      </p>
    </form>
  );
};

export default SignUpForm;
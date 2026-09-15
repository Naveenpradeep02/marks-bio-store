import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  confirmPasswordReset,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { api } from "../api";
import "../styles/login.css";

// Comprehensive Country Data with Flags & Dial Codes
const COUNTRIES_LIST = [
  { name: "India", code: "+91", flag: "🇮🇳", iso: "IN" },
  { name: "United States", code: "+1", flag: "🇺🇸", iso: "US" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧", iso: "GB" },
  { name: "United Arab Emirates", code: "+971", flag: "🇦🇪", iso: "AE" },
  { name: "Afghanistan", code: "+93", flag: "🇦🇫", iso: "AF" },
  { name: "Albania", code: "+355", flag: "🇦🇱", iso: "AL" },
  { name: "Algeria", code: "+213", flag: "🇩🇿", iso: "DZ" },
  { name: "Argentina", code: "+54", flag: "🇦🇷", iso: "AR" },
  { name: "Australia", code: "+61", flag: "🇦🇺", iso: "AU" },
  { name: "Austria", code: "+43", flag: "🇦🇹", iso: "AT" },
  { name: "Bahrain", code: "+973", flag: "🇧🇭", iso: "BH" },
  { name: "Bangladesh", code: "+880", flag: "🇧🇩", iso: "BD" },
  { name: "Belgium", code: "+32", flag: "🇧🇪", iso: "BE" },
  { name: "Brazil", code: "+55", flag: "🇧🇷", iso: "BR" },
  { name: "Canada", code: "+1", flag: "🇨🇦", iso: "CA" },
  { name: "China", code: "+86", flag: "🇨🇳", iso: "CN" },
  { name: "Denmark", code: "+45", flag: "🇩🇰", iso: "DK" },
  { name: "Egypt", code: "+20", flag: "🇪🇬", iso: "EG" },
  { name: "Finland", code: "+358", flag: "🇫🇮", iso: "FI" },
  { name: "France", code: "+33", flag: "🇫🇷", iso: "FR" },
  { name: "Germany", code: "+49", flag: "🇩🇪", iso: "DE" },
  { name: "Greece", code: "+30", flag: "🇬🇷", iso: "GR" },
  { name: "Hong Kong", code: "+852", flag: "🇭🇰", iso: "HK" },
  { name: "Indonesia", code: "+62", flag: "🇮🇩", iso: "ID" },
  { name: "Ireland", code: "+353", flag: "🇮🇪", iso: "IE" },
  { name: "Israel", code: "+972", flag: "🇮🇱", iso: "IL" },
  { name: "Italy", code: "+39", flag: "🇮🇹", iso: "IT" },
  { name: "Japan", code: "+81", flag: "🇯🇵", iso: "JP" },
  { name: "Jordan", code: "+962", flag: "🇯🇴", iso: "JO" },
  { name: "Kenya", code: "+254", flag: "🇰🇪", iso: "KE" },
  { name: "Kiribati", code: "+686", flag: "🇰🇮", iso: "KI" },
  { name: "Kosovo", code: "+383", flag: "🇽🇰", iso: "XK" },
  { name: "Kuwait", code: "+965", flag: "🇰🇼", iso: "KW" },
  { name: "Kyrgyzstan", code: "+996", flag: "🇰🇬", iso: "KG" },
  { name: "Laos", code: "+856", flag: "🇱🇦", iso: "LA" },
  { name: "Latvia", code: "+371", flag: "🇱🇻", iso: "LV" },
  { name: "Lebanon", code: "+961", flag: "🇱🇧", iso: "LB" },
  { name: "Malaysia", code: "+60", flag: "🇲🇾", iso: "MY" },
  { name: "Maldives", code: "+960", flag: "🇲🇻", iso: "MV" },
  { name: "Mauritius", code: "+230", flag: "🇲🇺", iso: "MU" },
  { name: "Mexico", code: "+52", flag: "🇲🇽", iso: "MX" },
  { name: "Nepal", code: "+977", flag: "🇳🇵", iso: "NP" },
  { name: "Netherlands", code: "+31", flag: "🇳🇱", iso: "NL" },
  { name: "New Zealand", code: "+64", flag: "🇳🇿", iso: "NZ" },
  { name: "Nigeria", code: "+234", flag: "🇳🇬", iso: "NG" },
  { name: "Norway", code: "+47", flag: "🇳🇴", iso: "NO" },
  { name: "Oman", code: "+968", flag: "🇴🇲", iso: "OM" },
  { name: "Pakistan", code: "+92", flag: "🇵🇰", iso: "PK" },
  { name: "Philippines", code: "+63", flag: "🇵🇭", iso: "PH" },
  { name: "Poland", code: "+48", flag: "🇵🇱", iso: "PL" },
  { name: "Portugal", code: "+351", flag: "🇵🇹", iso: "PT" },
  { name: "Qatar", code: "+974", flag: "🇶🇦", iso: "QA" },
  { name: "Russia", code: "+7", flag: "🇷🇺", iso: "RU" },
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦", iso: "SA" },
  { name: "Singapore", code: "+65", flag: "🇸🇬", iso: "SG" },
  { name: "South Africa", code: "+27", flag: "🇿🇦", iso: "ZA" },
  { name: "South Korea", code: "+82", flag: "🇰🇷", iso: "KR" },
  { name: "Spain", code: "+34", flag: "🇪🇸", iso: "ES" },
  { name: "Sri Lanka", code: "+94", flag: "🇱🇰", iso: "LK" },
  { name: "Sweden", code: "+46", flag: "🇸🇪", iso: "SE" },
  { name: "Switzerland", code: "+41", flag: "🇨🇭", iso: "CH" },
  { name: "Thailand", code: "+66", flag: "🇹🇭", iso: "TH" },
  { name: "Turkey", code: "+90", flag: "🇹🇷", iso: "TR" },
  { name: "Vietnam", code: "+84", flag: "🇻🇳", iso: "VN" },
];

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [view, setView] = useState("login"); // 'login' | 'signup' | 'forgot' | 'reset_otp'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [resetOobCode, setResetOobCode] = useState(null);

  // Form States - Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Form States - Signup
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [selectedCountryObj, setSelectedCountryObj] = useState(
    COUNTRIES_LIST[0],
  ); // India default
  const [phoneNumber, setPhoneNumber] = useState("");
  const [professionalTitle, setProfessionalTitle] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(true);

  // Country code dropdown toggle & search
  const [flagDropdownOpen, setFlagDropdownOpen] = useState(false);
  const [flagSearch, setFlagSearch] = useState("");
  const flagDropdownRef = useRef(null);

  // Form States - Recovery
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [notification, setNotification] = useState(null);

  // Sync view with URL pathname
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("mode") === "resetPassword" && params.get("oobCode")) {
      setResetOobCode(params.get("oobCode"));
      setView("reset_otp");
      return;
    }

    const path = location.pathname.toLowerCase();
    if (path.includes("/signup") || path.includes("/register")) {
      setView("signup");
    } else if (path.includes("/forgot")) {
      setView("forgot");
    } else {
      setView("login");
    }
  }, [location.pathname, location.search]);

  // Close flag dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        flagDropdownRef.current &&
        !flagDropdownRef.current.contains(event.target)
      ) {
        setFlagDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showFeedback = (msg, isSuccess = true) => {
    setNotification({ text: msg, isSuccess });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      await api.post("/auth/sync-profile", {});
      showFeedback("Signed in successfully. Redirecting...");
      setTimeout(() => navigate(location.state?.redirectTo || "/account"), 800);
    } catch (err) {
      showFeedback(err.message.replace("Firebase: ", ""), false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      showFeedback("Please agree to the Terms of Service to continue.", false);
      return;
    }
    setSubmitting(true);
    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        signupEmail,
        signupPassword,
      );
      const fullName = `${firstName} ${lastName}`.trim();
      await updateProfile(cred.user, { displayName: fullName });

      const fullPhone = `${selectedCountryObj.code} ${phoneNumber}`.trim();
      const specLabel = professionalTitle
        ? professionalTitle
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase())
        : "Dental Surgeon";

      const profileData = {
        name: fullName,
        email: signupEmail,
        phone: fullPhone,
        speciality: specLabel,
        country: selectedCountry || selectedCountryObj.name || "India",
        city:
          selectedCountry === "India" || !selectedCountry
            ? "Chennai"
            : selectedCountry,
        state:
          selectedCountry === "India" || !selectedCountry ? "Tamil Nadu" : "",
        clinicName: "Private Practice",
        registrationNo: "DCI-" + Math.floor(10000 + Math.random() * 90000),
      };

      // Save to localStorage for instant client-side persistence across pages
      try {
        localStorage.setItem(
          `mb_user_profile_${cred.user.uid}`,
          JSON.stringify(profileData),
        );
        localStorage.setItem(
          `mb_user_profile_${signupEmail.toLowerCase()}`,
          JSON.stringify(profileData),
        );
      } catch (e) {
        console.warn("Storage warning:", e);
      }

      try {
        await api.post("/auth/sync-profile", profileData);
      } catch (apiErr) {
        console.warn("Backend sync notice:", apiErr);
      }

      showFeedback(`Welcome Dr. ${fullName}! Account created.`);
      setTimeout(() => navigate("/account"), 1000);
    } catch (err) {
      showFeedback(err.message.replace("Firebase: ", ""), false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await sendPasswordResetEmail(auth, recoveryEmail);
      showFeedback(
        `Password reset link sent to ${recoveryEmail}. Check your inbox.`,
      );
      setTimeout(() => setView("login"), 2500);
    } catch (err) {
      showFeedback(err.message.replace("Firebase: ", ""), false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showFeedback("Passwords do not match. Please re-enter.", false);
      return;
    }
    if (!resetOobCode) {
      showFeedback("This reset link is invalid or has expired.", false);
      return;
    }
    setSubmitting(true);
    try {
      await confirmPasswordReset(auth, resetOobCode, newPassword);
      showFeedback("Password updated successfully! Please sign in.");
      setTimeout(() => {
        setView("login");
        setNewPassword("");
        setConfirmPassword("");
        navigate("/login", { replace: true });
      }, 2000);
    } catch (err) {
      showFeedback(err.message.replace("Firebase: ", ""), false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setSubmitting(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      await api.post("/auth/sync-profile", {});
      showFeedback("Signed in with Google.");
      setTimeout(() => navigate("/account"), 800);
    } catch (err) {
      showFeedback(err.message.replace("Firebase: ", ""), false);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredCountries = COUNTRIES_LIST.filter(
    (c) =>
      c.name.toLowerCase().includes(flagSearch.toLowerCase()) ||
      c.code.includes(flagSearch),
  );

  return (
    <div className="ebolt-login-page">
      {/* Background with Black & White Sky, Clouds & Concentric Vector Rings */}
      <div className="ebolt-sky-bg">
        <img
          src="/assets/imgs/login-sky-bg.jpg"
          alt="Monochrome Sky Horizon Background"
          className="sky-bg-img"
        />
        <div className="sky-overlay-gradient"></div>
      </div>

      {/* Concentric Vector Orbital Rings */}
      <div className="ebolt-orbital-rings" aria-hidden="true">
        <div className="ring ring-1"></div>
        <div className="ring ring-2"></div>
        <div className="ring ring-3"></div>
      </div>

      {/* Top Navigation Bar with Official Marks Biotech Logo */}
      <header className="ebolt-top-nav">
        <Link to="/" className="ebolt-brand" title="Marks Biotech Home">
          <img
            src="/assets/imgs/marks-biotech-logo 1.webp"
            alt="Marks Biotech"
            className="marks-official-logo"
          />
        </Link>

        <Link to="/" className="ebolt-back-link">
          <span>Back To Home</span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </header>

      {/* Central Frosted Glass Card */}
      <main className="ebolt-login-container">
        <div
          className={`ebolt-auth-card ${view === "signup" ? "signup-card-expanded" : ""}`}
        >
          {/* Notification Pill */}
          {notification && (
            <div
              className={`ebolt-status-pill ${notification.isSuccess ? "status-success" : "status-error"}`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {notification.isSuccess ? (
                  <>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </>
                ) : (
                  <>
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </>
                )}
              </svg>
              <span>{notification.text}</span>
            </div>
          )}

          {/* =========================================================================
              VIEW 1: SIGN IN / LOGIN FLOW
              ========================================================================= */}
          {view === "login" && (
            <div className="auth-flow-view animate-fade-in">
              <h1 className="ebolt-card-title">Sign in with email</h1>

              <form className="ebolt-form" onSubmit={handleLoginSubmit}>
                {/* Email */}
                <div className="ebolt-input-box">
                  <span className="input-leading-icon">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </span>
                  <input
                    type="email"
                    placeholder="Email or Clinician ID"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                <div className="ebolt-input-box">
                  <span className="input-leading-icon">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="ebolt-pw-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    ) : (
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                        <line x1="2" y1="2" x2="22" y2="22"></line>
                      </svg>
                    )}
                  </button>
                </div>

                {/* Options Row */}
                <div className="ebolt-options-row">
                  <label className="ebolt-custom-checkbox">
                    <input type="checkbox" defaultChecked />
                    <span className="check-box"></span>
                    <span>Remember me</span>
                  </label>

                  <button
                    type="button"
                    className="ebolt-forgot-link-btn"
                    onClick={() => setView("forgot")}
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Submit CTA */}
                <button type="submit" className="ebolt-submit-btn">
                  Get Started
                </button>
              </form>

              {/* Divider */}
              <div className="ebolt-divider-wrap">
                <span className="ebolt-divider-line"></span>
                <span className="ebolt-divider-text">Or sign in with</span>
                <span className="ebolt-divider-line"></span>
              </div>

              {/* Google Auth */}
              <button
                type="button"
                className="ebolt-google-btn"
                onClick={handleGoogleSignIn}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.13z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Switch to Sign Up */}
              <div className="ebolt-switch-auth-wrap">
                <span>Don't have an account?</span>{" "}
                <button
                  type="button"
                  className="ebolt-switch-btn"
                  onClick={() => setView("signup")}
                >
                  Create account
                </button>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 2: CREATE ACCOUNT / SIGN UP FLOW (WITH ACCURATE COUNTRY & DIAL CODE PICKERS)
              ========================================================================= */}
          {view === "signup" && (
            <div className="auth-flow-view animate-fade-in">
              <h1 className="ebolt-card-title">Create an account</h1>
              <p className="ebolt-flow-sub">
                Join Marks Biotech network for direct implant catalog &amp;
                surgical support.
              </p>

              <form className="ebolt-form" onSubmit={handleSignupSubmit}>
                {/* Row 1: First Name & Last Name */}
                <div className="ebolt-form-row-2col">
                  <div className="ebolt-input-box">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="ebolt-input-box">
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Row 2: Email & Phone with Custom Flag/Code Dropdown */}
                <div className="ebolt-form-row-2col">
                  <div className="ebolt-input-box">
                    <input
                      type="email"
                      placeholder="Email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* Phone with Interactive Flag / Dial Code Selector */}
                  <div
                    className="ebolt-input-box ebolt-phone-input-wrap"
                    ref={flagDropdownRef}
                  >
                    <button
                      type="button"
                      className="ebolt-flag-trigger-btn"
                      onClick={() => setFlagDropdownOpen(!flagDropdownOpen)}
                      title="Select Country Dial Code"
                    >
                      <span className="flag-emoji">
                        {selectedCountryObj.flag}
                      </span>
                      <span className="dial-code-text">
                        {selectedCountryObj.code}
                      </span>
                      <svg
                        className={`chevron-icon ${flagDropdownOpen ? "open" : ""}`}
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>

                    {/* Flag Dropdown Menu */}
                    {flagDropdownOpen && (
                      <div className="ebolt-flag-menu-dropdown animate-fade-in">
                        <div className="flag-search-box">
                          <input
                            type="text"
                            placeholder="Search country or code..."
                            value={flagSearch}
                            onChange={(e) => setFlagSearch(e.target.value)}
                            autoFocus
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <ul className="flag-items-list">
                          {filteredCountries.map((c) => (
                            <li
                              key={`${c.iso}-${c.code}`}
                              className={`flag-item-option ${selectedCountryObj.iso === c.iso ? "selected" : ""}`}
                              onClick={() => {
                                setSelectedCountryObj(c);
                                setFlagDropdownOpen(false);
                                setFlagSearch("");
                              }}
                            >
                              <span className="item-flag">{c.flag}</span>
                              <span className="item-name">{c.name}</span>
                              <span className="item-code">{c.code}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <input
                      type="tel"
                      className="phone-number-field"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Row 3: Professional Title & Comprehensive Select Country Dropdowns */}
                <div className="ebolt-form-row-2col">
                  {/* Professional Title Dropdown */}
                  <div className="ebolt-input-box ebolt-select-wrap">
                    <select
                      className="ebolt-clean-select"
                      value={professionalTitle}
                      onChange={(e) => setProfessionalTitle(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Professional Title
                      </option>
                      <option value="implantologist">Implantologist</option>
                      <option value="oral_surgeon">
                        Oral &amp; Maxillofacial Surgeon
                      </option>
                      <option value="periodontist">Periodontist</option>
                      <option value="prosthodontist">Prosthodontist</option>
                      <option value="general_dentist">
                        General Dental Practitioner
                      </option>
                      <option value="dental_lab">
                        Dental Milling Laboratory
                      </option>
                      <option value="clinic_director">
                        Clinic Director / Hospital Head
                      </option>
                    </select>
                    <svg
                      className="select-arrow"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>

                  {/* Comprehensive Select Country Dropdown */}
                  <div className="ebolt-input-box ebolt-select-wrap">
                    <select
                      className="ebolt-clean-select"
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Select Country
                      </option>
                      {COUNTRIES_LIST.map((c) => (
                        <option key={`country-${c.iso}`} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="select-arrow"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>

                {/* Row 4: Password with Eye Toggle */}
                <div className="ebolt-input-box">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create Password (min 8 characters)"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    className="ebolt-pw-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password"
                  >
                    {showPassword ? (
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    ) : (
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                        <line x1="2" y1="2" x2="22" y2="22"></line>
                      </svg>
                    )}
                  </button>
                </div>

                {/* Terms Agreement */}
                <label className="ebolt-custom-checkbox term-check">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    required
                  />
                  <span className="check-box"></span>
                  <span>
                    I agree to the Terms of Service and Privacy Policy
                  </span>
                </label>

                {/* Submit CTA */}
                <button type="submit" className="ebolt-submit-btn">
                  Create Clinician Account
                </button>
              </form>

              {/* Switch to Sign In */}
              <div className="ebolt-switch-auth-wrap">
                <span>Already have an account?</span>{" "}
                <button
                  type="button"
                  className="ebolt-switch-btn"
                  onClick={() => setView("login")}
                >
                  Sign in
                </button>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 3: FORGOT PASSWORD (EMAIL RECOVERY STEP 1)
              ========================================================================= */}
          {view === "forgot" && (
            <div className="auth-flow-view animate-fade-in">
              <div className="ebolt-flow-icon-wrap">
                <div className="flow-badge-icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
              </div>

              <h1 className="ebolt-card-title">Reset password</h1>
              <p className="ebolt-flow-sub">
                Enter your registered email and we'll send a 6-digit
                verification code to reset your credentials.
              </p>

              <form className="ebolt-form" onSubmit={handleForgotSubmit}>
                {/* Email */}
                <div className="ebolt-input-box">
                  <span className="input-leading-icon">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </span>
                  <input
                    type="email"
                    placeholder="Enter your registered email"
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="ebolt-submit-btn">
                  Send Recovery Code
                </button>
              </form>

              {/* Back to Sign In */}
              <div className="ebolt-switch-auth-wrap">
                <button
                  type="button"
                  className="ebolt-back-text-btn"
                  onClick={() => setView("login")}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                  <span>Back to Sign in</span>
                </button>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 4: RESET PASSWORD WITH OTP (STEP 2)
              ========================================================================= */}
          {view === "reset_otp" && (
            <div className="auth-flow-view animate-fade-in">
              <div className="ebolt-flow-icon-wrap">
                <div className="flow-badge-icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
              </div>

              <h1 className="ebolt-card-title">Set new password</h1>
              <p className="ebolt-flow-sub">
                Enter the 6-digit code sent to{" "}
                <strong>{recoveryEmail || "your email"}</strong> and create your
                new password.
              </p>

              <form className="ebolt-form" onSubmit={handleResetSubmit}>
                {/* 6-Digit Code */}
                <div className="ebolt-input-box">
                  <span className="input-leading-icon">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 11 3 3L22 4"></path>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="6-Digit Verification Code (e.g. 849201)"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    maxLength={6}
                    required
                  />
                </div>

                {/* New Password */}
                <div className="ebolt-input-box">
                  <span className="input-leading-icon">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    className="ebolt-pw-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password"
                  >
                    {showPassword ? (
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    ) : (
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                        <line x1="2" y1="2" x2="22" y2="22"></line>
                      </svg>
                    )}
                  </button>
                </div>

                {/* Confirm New Password */}
                <div className="ebolt-input-box">
                  <span className="input-leading-icon">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    className="ebolt-pw-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label="Toggle confirm password"
                  >
                    {showConfirmPassword ? (
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    ) : (
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                        <line x1="2" y1="2" x2="22" y2="22"></line>
                      </svg>
                    )}
                  </button>
                </div>

                <button type="submit" className="ebolt-submit-btn">
                  Update Password
                </button>
              </form>

              {/* Resend Code / Back to Login */}
              <div className="ebolt-switch-auth-wrap">
                <button
                  type="button"
                  className="ebolt-switch-btn"
                  onClick={() =>
                    handleForgotSubmit({ preventDefault: () => {} })
                  }
                >
                  Resend Code
                </button>
                <span className="dot-sep">•</span>
                <button
                  type="button"
                  className="ebolt-switch-btn"
                  onClick={() => setView("login")}
                >
                  Back to Sign In
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

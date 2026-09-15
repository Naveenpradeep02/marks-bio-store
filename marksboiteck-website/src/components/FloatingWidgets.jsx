import React, { useState } from "react";

export default function FloatingWidgets() {
  const [eventBoxVisible, setEventBoxVisible] = useState(true);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    title: "Dr.",
    email: "",
    mobile: "",
    speciality: "BDS",
    specialityOther: "",
    category: "Private Practice",
    city: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setRegisterModalOpen(false);
      setFormData({
        name: "",
        title: "Dr.",
        email: "",
        mobile: "",
        speciality: "BDS",
        specialityOther: "",
        category: "Private Practice",
        city: "",
      });
    }, 2500);
  };

  return (
    <>
      {/* FLOATING WIDGETS */}
      <div className="floating-container">
        {/* Floating Event Card */}
        {eventBoxVisible && (
          <div className="event-box mb-navident-event-card">
            <h3 id="eventName">
              Navident Advanced Live Surgical &amp; Prosthetic Workshop
            </h3>
            <div className="event-details">
              <p id="eventDate">August 21st, Friday</p>
              <p id="eventTime">9:30 AM to 6:30 PM</p>
              <p id="eventLocation">Mumbai, India</p>
            </div>
            <p className="mb-navident-event-card__venue">
              Indian Dental Association - HQ, Prabhadevi
            </p>
            <div className="floating-btn-con">
              <a
                href="https://forms.gle/gaHuNfEUe9TzGB8s5"
                target="_blank"
                rel="noopener noreferrer"
                className="view-floating-img"
              >
                View Details
              </a>
              <button
                id="openFormBtn"
                type="button"
                onClick={() => setRegisterModalOpen(true)}
              >
                Register Now
              </button>
            </div>
            <div className="float-event-close">
              <button
                id="closeEventBtn"
                type="button"
                aria-label="Close event box"
                onClick={() => setEventBoxVisible(false)}
              >
                &times;
              </button>
            </div>
          </div>
        )}

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919819893250"
          id="whatsappBtn"
          className="whatsapp-btn"
          aria-label="Chat on WhatsApp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="wave"></span>
          <span className="wave delay"></span>
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/whatsapp.png"
            alt="WhatsApp"
            loading="lazy"
          />
        </a>

        {/* Upcoming Events Toggle Pill */}
        {!eventBoxVisible && (
          <div
            id="eventToggleBtn"
            className="event-toggle-btn"
            role="button"
            aria-label="Toggle upcoming events"
            onClick={() => setEventBoxVisible(true)}
          >
            Upcoming Events
          </div>
        )}
      </div>

      {/* REGISTRATION MODAL POPUP */}
      {registerModalOpen && (
        <div
          id="popupForm"
          className="popup active"
          role="dialog"
          aria-modal="true"
          aria-label="Event Registration Form"
          style={{ display: "flex" }}
        >
          <div className="popup-content">
            <button
              id="closeForm"
              className="close-btn"
              aria-label="Close registration form"
              onClick={() => setRegisterModalOpen(false)}
            >
              ✖
            </button>
            <h2>Register</h2>
            {formSubmitted ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "20px",
                  color: "#4CAF50",
                }}
              >
                <h3>Registration Successful!</h3>
                <p>We will get in touch with you shortly.</p>
              </div>
            ) : (
              <form id="leadForm" onSubmit={handleFormSubmit}>
                <input
                  name="name"
                  placeholder="Full Name *"
                  required
                  aria-label="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <select
                  name="title"
                  aria-label="Title"
                  value={formData.title}
                  onChange={handleInputChange}
                >
                  <option value="Dr.">Dr.</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                </select>
                <input
                  name="email"
                  type="email"
                  placeholder="Email *"
                  required
                  aria-label="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <input
                  name="mobile"
                  placeholder="Mobile Number *"
                  required
                  aria-label="Mobile Number"
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
                <select
                  name="speciality"
                  aria-label="Qualification"
                  value={formData.speciality}
                  onChange={handleInputChange}
                >
                  <option value="BDS">BDS</option>
                  <option value="MDS">MDS</option>
                </select>
                <input
                  name="specialityOther"
                  placeholder="Specify Specialty"
                  aria-label="Other Specialty"
                  value={formData.specialityOther}
                  onChange={handleInputChange}
                />
                <select
                  name="category"
                  aria-label="Category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="Private Practice">Private Practice</option>
                  <option value="Students">Students</option>
                </select>
                <input
                  name="city"
                  placeholder="City *"
                  required
                  aria-label="City"
                  value={formData.city}
                  onChange={handleInputChange}
                />
                <button type="submit">Submit</button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* EVENT IMAGE POPUP */}
      {imageModalOpen && (
        <div
          id="eventImagePopup"
          className="popup active"
          role="dialog"
          aria-modal="true"
          aria-label="Event Image"
          style={{ display: "flex" }}
        >
          <div
            className="popup-content popup-image"
            style={{ maxWidth: "600px" }}
          >
            <button
              id="closeImagePopup"
              className="close-btn"
              aria-label="Close image popup"
              onClick={() => setImageModalOpen(false)}
            >
              ✖
            </button>
            <img
              id="eventPopupImg"
              src={selectedImage}
              alt="Event details poster"
              style={{ width: "100%", borderRadius: "10px" }}
              loading="lazy"
            />
          </div>
        </div>
      )}
    </>
  );
}

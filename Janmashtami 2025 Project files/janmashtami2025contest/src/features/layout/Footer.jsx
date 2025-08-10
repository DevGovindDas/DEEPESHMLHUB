import React from "react";

const templeAddress = {
  name: "Sri Sri Giridhari Dauji Temple",
  address: [
    "Village Dholai, New Sanganer Road",
    "opposite Vijay Path, Mansarovar",
    "Jaipur, Rajasthan 302020",
    "India",
  ],
};

const Footer = () => (
  <footer className="w-full bg-gray-800 text-white p-3 mt-0">
    <div className="max-w-6xl mx-auto">
      {/* Main Footer Content */}
      <div className="flex flex-col md:flex-row md:justify-evenly gap-6 mb-6">
        {/* Address */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Temple Address</h3>
          <div className="text-sm">
            <p>{templeAddress.name}</p>
            {templeAddress.address.map((line, index) => (
              <span key={index}>{`${line} `}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

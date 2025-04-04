import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white py-8 text-sm">
      <div className="max-w-7xl mx-auto px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-4">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-semibold mb-3 uppercase">
              More on ICSC 2025
            </h3>
            <ul className="space-y-1">
              <li>About the Conference</li>
              <li>Frequently asked questions</li>
              <li>About the Organizers</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-3 uppercase">
              Partnership
            </h3>
            <ul className="space-y-1">
              <li></li>Sponsorship Opportunity
              <li>Donate now</li>
              <li>Further Enquiries</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-semibold mb-3 uppercase">Updates</h3>
            <ul className="space-y-1">
              <li>Accomodation</li>
              <li>Transportation</li>
              <li>News & Blog</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <p className="text-md">Email: info@csconference2025.org</p>
            <p className="text-md">Phone: +234-XXX-XXXX</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

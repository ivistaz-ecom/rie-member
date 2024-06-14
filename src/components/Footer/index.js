import React from "react";

import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";

function index() {
  return (
    <div>
      {" "}
      <Footer
        className="flex flex-col items-center justify-center rounded-none bg-[#210657] pb-4 text-white"
        r
      >
        <FooterLinkGroup className="text-white">
          <FooterLink href="https://rie2025.com/privacy-policy-and-terms-conditions">
            Privacy Policy and T&C
          </FooterLink>
          <FooterLink href="https://rie2025.com/disclaimer">
            Disclaimer
          </FooterLink>
          <FooterLink href="https://rie2025.com/refund-cancellation">
            Refund & Cancellation
          </FooterLink>
        </FooterLinkGroup>
      </Footer>
    </div>
  );
}

export default index;

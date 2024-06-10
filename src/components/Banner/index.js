import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";

function Index() {
  const showBanner = sessionStorage.getItem("r_TokenMember_Session");
  const isShowBanner = JSON.parse(showBanner);
  const regionBangalore = isShowBanner[0].chapters;
  const [showModal, setShowModal] = useState(
    regionBangalore === "EO Bangalore",
  );
  return (
    <div>
      <Modal show={showModal} onClose={() => setShowModal(false)} size="md">
        <Modal.Header className="bg-transparent p-0"></Modal.Header>
        <Modal.Body className="w-auto p-0">
          <div className="p-0">
            <img
              src="/bangalore.jpeg"
              alt="Bangalore"
              className="h-auto w-full"
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Index;

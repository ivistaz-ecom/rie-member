import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";

function Index({ status, onClick }) {
  return (
    <Modal show={status}>
      <Modal.Header className="p-2" onClick={onClick}>
        Transactions
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6 text-center">
          <h2 className="text-2xl">No payment history is available</h2>
          <p>Please get in touch with the support team.</p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Index;

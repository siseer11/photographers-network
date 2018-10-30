import React from "react";
import WithModal from "../RenderProp/WithModal";
import HireMeModal from "../contents/HireMeModal";

export const HireButton = ({ uid, photographerName, siggnedInUser }) => (
  <WithModal closeItemClass="close">
    {({ showModal, closeModalListener }) => (
      <React.Fragment>
        <div className="hire-button">
          <h5>Hire me!</h5>
        </div>
        {showModal && (
          <HireMeModal
            closeModal={closeModalListener}
            photographerId={uid}
            photographerName={photographerName}
            company={siggnedInUser}
          />
        )}
      </React.Fragment>
    )}
  </WithModal>
);

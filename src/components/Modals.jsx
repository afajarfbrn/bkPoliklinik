import { Button, Modal } from "flowbite-react";

const Modals = ({
  openModal,
  setOpenModal,
  title,
  body,
  size,
  buttonClose = true,
}) => {
  return (
    <>
      {openModal && (
        <Modal show={openModal} onClose={() => setOpenModal(false)} size={size}>
          <Modal.Header>{title}</Modal.Header>
          <Modal.Body>{body}</Modal.Body>
          {buttonClose && (
            <Modal.Footer className="flex justify-end">
              <Button onClick={() => setOpenModal(false)}>Close</Button>
            </Modal.Footer>
          )}
        </Modal>
      )}
    </>
  );
};

export default Modals;

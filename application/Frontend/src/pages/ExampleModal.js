import React from "react";
import ReactModal from 'react-modal';
import '../styles/ExampleModal.css'

function ExampleModal() {
    // Add more show/setModals depending on how many different modals you want
    // Do NOT nest these modals however, they will not react (teehee) the way you expect it to.
    // If you need nested modals I'll make another example specifically for that.
    const [showModal1, setShowModal1] = React.useState(false);
    const [showModal2, setShowModal2] = React.useState(false);
    const ModalComponent = ReactModal;

  return (
    <div className="ModalExample">
        {/* Choose any regular button as your starter point */}
        <button onClick={() => setShowModal1(true)}>Open Example Modal</button>
        <ModalComponent
            isOpen={showModal1}
            onRequestClose={() => setShowModal1(false)}
            className="Modal"          // className styles the Modal content
            overlayClassName="Overlay" // Overlay styles the stuff behind the Modal.
        >
            <p className="modalText">This is the example modal content. 
                See how you can close the modal with the dedicated button? Or by clicking outside of the modal itself.</p>
            <button onClick={() => setShowModal1(false)}>Close</button>
        </ModalComponent>

        {/* Modals as far as I know need their own custom var. */}

        <button onClick ={() => setShowModal2(true)}>Open Example Modal 2</button>
        <ModalComponent
            isOpen={showModal2}
            onRequestClose={() => setShowModal2(false)}
            className="Modal2"  //Changed CSS compared to the first
            overlayClassName="Overlay2" //Example of darkened background overlay, much like a real modal would use.
        >  
        {/* You can put a div after your opening ModalComponent and place whatever content you wish here. 
        For the activity board, I would assume something similar to a form would be what you're looking for. */}
        {/* And of course, divs can be styled. */}
            <div className="Modal2DivCSS">
                <p className="modalText">Green Text! And also the ability to use forms and such within the div.</p>
                <form>
                    <label>
                    Name:
                    <input type="text" name="name" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        {/* And of course buttons and such can be styled as well. I'll leave that up to you though. */}
            <button onClick={() => setShowModal2(false)}>
                Close Modal 2
            </button>
        </ModalComponent>
    </div>
  );
}

 export default ExampleModal;
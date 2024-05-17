import '../../css/modal.css'
import { useEffect, useRef } from "react";
import { CloseIcon } from "./Icons";

function Modal({ previewImage, title, setIsOpen }) {

    const modalRef = useRef()

    useEffect(() => {

        const handleClick = (e) => {
            if (e.target === modalRef.current) {
                setIsOpen(false);
            }
        };

        const closeForm = (e) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.body.addEventListener("click", handleClick);
        document.addEventListener("keydown", closeForm);

        return () => {
            document.body.removeEventListener("click", handleClick);
            document.body.removeEventListener("keydown", closeForm);
        };
    }, []);


    return (
        <div className="modal-blur" ref={modalRef}>
            <div className="modal-blur__container">
                <div className="modal-blur__header">
                    <h3>{title}</h3>
                    <span onClick={() => setIsOpen(false)} ><CloseIcon /></span>
                </div>
                <hr />
                <div className='modal-blur__image-container'>
                    <img src={previewImage} alt={previewImage} />
                </div>
            </div>
        </div>
    )
}
export default Modal
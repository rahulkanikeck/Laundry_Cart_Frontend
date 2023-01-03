import React, { useState, useEffect } from "react";
import danger from './danger.PNG'
import './alert.css';

const Alert = () => {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    useEffect(() => {
        toggleModal();
    }, [])

    if (modal) {
        document.body.classList.add("active-modal");
    } else {
        document.body.classList.remove("active-modal");
    }

    return (
        <>
            {modal && (
                <div className="modal1">
                    <div onClick={toggleModal} className="overlay1"></div>
                    <div className="modal-content1">
                        <h3 className="modal_title1">Alert</h3>

                        <div className="button_body">
                            <img src={danger} alt="danger" className="alert_img" />
                            <p className="alert_para">
                                Are you sure want to cancel the Order No:ORD1
                            </p>
                        </div>
                        <a href="/orders"><button className="alert_btn" onClick={toggleModal}>
                            Proceed
                        </button>   
                        </a>
                    </div>
                </div>
            )}
        </>
    )
}

export default Alert;
import React, { useState, useEffect, useRef } from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";

import {IoMdNotificationsOutline} from 'react-icons/io'
import ListNotifications from "./card/ListNotifications";

import { AiOutlineClose } from "react-icons/ai"
import { notifications } from "./dataContents"
const Notifications = (props) => {
    const [visible, setVisibility] = useState(false);

    const referenceRef = useRef(null);
    const popperRef = useRef(null);
    const { styles, attributes } = usePopper(
        referenceRef.current,
        popperRef.current,
        {
            placement: "bottom",
            modifiers: [
                {
                    name: "offset",
                    enabled: true,
                    options: {
                        offset: [0, 10]
                    }
                }
            ]
        }
    );
    useEffect(() => {
        document.addEventListener("mousedown", handleDocumentClick);
        return () => {
            document.removeEventListener("mousedown", handleDocumentClick);
        };
    }, []);

    function handleDocumentClick(event) {
        if (referenceRef.current.contains(event.target)) {
            return;
        }
        setVisibility(false);
    }
    function handleDropdownClick(event) {
        setVisibility(!visible);
    }
    return (
        <div ref={referenceRef} onClick={handleDropdownClick} className="relative font-play">
            <div className="text-white rounded-full p-2">
                <IoMdNotificationsOutline size={24} />
            </div>
            <div className="w-[300px] bg-white absolute -right-16 top-16" ref={popperRef} {...attributes.popper}>
                <DropdownContainer className="shadow-sm flex flex-col" style={styles.offset} visible={visible}>
                    <div className="w-full flex space-x-2 items-center justify-between py-6 p-2 border-b ">
                        <div className="flex space-x-2">
                            <IoMdNotificationsOutline size={28} />
                            <span>Notification</span>
                        </div>
                        <AiOutlineClose size={28} className="text-gray-400" />
                    </div>
                    {notifications.map((notifications, index) => (
                        <div key={index}>
                            <ListNotifications notifications={notifications} />
                        </div>
                    ))}
                </DropdownContainer>
            </div>
        </div>
    )

}
const DropdownContainer = styled.div`
  display: ${props => (props.visible ? "flex" : "none")};
 
`;
export default Notifications
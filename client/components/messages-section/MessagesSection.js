import React, { useState, useContext } from "react";
import SendIcon from "@material-ui/icons/Send";

import { socket } from "../../hooks/socket";

import CustomButton from "../custom-button/CustomButton";
import UserMessagesContainer from "../user-messages-container/UserMessagesContainer";

import { RoomsContext } from "../../context/rooms/rooms.context";
import { addMessageToRoomSuccess } from "../../context/rooms/rooms.actions";

import { prepareMessagesList } from "../../hooks/messages.helpers";

import { useAddMessageRequest } from "../../hooks/requests";

import styles from "./MessagesSection.module.scss";

function MessagesSection({ roomClicked, messages, currentUsername }) {
  const { roomsDispatcher } = useContext(RoomsContext);

  const messagesToList =
    messages.length > 0 ? prepareMessagesList(messages) : messages;

  const [textFieldValue, setTextFieldValue] = useState("");

  const handleTextFieldChange = (event) => {
    setTextFieldValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    useAddMessageRequest(roomClicked, textFieldValue)
      .then((message) => {
        const newMessage = {
          content: message.content,
          message_id: message.id,
          sent_on: message.sent_on,
          sender_name: currentUsername,
        };
        roomsDispatcher(addMessageToRoomSuccess(roomClicked, newMessage));

        socket.emit("sendMessage", {
          room_id: roomClicked,
          message: newMessage,
        });
        setTextFieldValue("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.messages_section}>
      <div className={styles.messages_container}>
        {messagesToList.length > 0
          ? messagesToList.map((messagesBySender, index) => (
              <UserMessagesContainer
                key={`${index}_${messagesBySender.sender_name}`}
                user_name={messagesBySender.sender_name}
                messages={messagesBySender.messages}
                isCurrentUserMessages={
                  currentUsername === messagesBySender.sender_name
                }
              />
            ))
          : null}
      </div>
      <form
        method="post"
        onSubmit={handleSubmit}
        className={styles.form_container}
      >
        <input
          type="text"
          value={textFieldValue}
          onChange={handleTextFieldChange}
          className={styles.text_field}
          placeholder="write your message here ..."
        />
        <CustomButton rounded={true} variant="blue" type="submit">
          <SendIcon className={styles.send_icon} />
        </CustomButton>
      </form>
    </div>
  );
}

export default MessagesSection;

import React from "react";
import Image from "next/image";

import styles from "./UserMessagesContainer.module.scss";

function UserMessagesContainer({ user_name, messages, isCurrentUserMessages }) {
  return (
    <div
      className={`${styles.user_messages_container} ${
        isCurrentUserMessages ? styles.current_messages_container : ""
      }`}
    >
      <div className={styles.profile_container}>
        <div className={styles.avatar_wrapper}>
          <Image
            src="/static/user.png"
            height={512}
            width={512}
            className={styles.avatar_image}
          />
        </div>
        <span className={styles.username}>
          {isCurrentUserMessages ? null : user_name}
        </span>
      </div>
      <div className={styles.messages_list}>
        {messages.map((message) => (
          <div key={message.message_id} className={styles.message_container}>
            <span className={styles.message_content}>{message.content}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserMessagesContainer;

// this function accept list of messages in the form returned by the db ,
// then this list will be restructed so that it will be grouped by userid and
// ordred by send time
export const prepareMessagesList = (messages_list) => {
  const listToReturn = [];
  let last_index = 0;
  for (let i = 0; i < messages_list.length; i++) {
    if (i === 0) {
      listToReturn.push({
        sender_name: messages_list[i].sender_name,
        messages: [
          {
            message_id: messages_list[i].message_id,
            sent_on: messages_list[i].sent_on,
            content: messages_list[i].content,
          },
        ],
      });
    } else {
      if (
        listToReturn[last_index].sender_name === messages_list[i].sender_name
      ) {
        listToReturn[last_index].messages.push({
          message_id: messages_list[i].message_id,
          sent_on: messages_list[i].sent_on,
          content: messages_list[i].content,
        });
      } else {
        last_index++;
        listToReturn.push({
          sender_name: messages_list[i].sender_name,
          messages: [
            {
              message_id: messages_list[i].message_id,
              sent_on: messages_list[i].sent_on,
              content: messages_list[i].content,
            },
          ],
        });
      }
    }
  }
  return listToReturn;
};

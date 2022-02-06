const { prepareMessagesList } = require("../../utils/models.helpers");

describe("it tests models helpers functions", () => {
  //prepare messages returning array as follow
  // [{sender_id,messages:[{message_id,sent_on,content}]}]
  const mockList = [
    {
      id: "1",
      sent_on: new Date(),
      sender_id: "1",
      room_id: "1",
      content: "new message 1",
    },
    {
      id: "2",
      sent_on: new Date(),
      sender_id: "1",
      room_id: "1",
      content: "new message 2",
    },
    {
      id: "3",
      sent_on: new Date(),
      sender_id: "2",
      room_id: "1",
      content: "new message 3",
    },
  ];

  const expectedList = [
    {
      sender_id: "1",
      messages: [
        {
          sent_on: expect.any(Date),
          content: "new message 1",
          message_id: "1",
        },
        {
          sent_on: expect.any(Date),
          content: "new message 2",
          message_id: "2",
        },
      ],
    },
    {
      sender_id: "2",
      messages: [
        {
          sent_on: expect.any(Date),
          content: "new message 3",
          message_id: "3",
        },
      ],
    },
  ];

  it("should return an array of grouped messages when mocked array is passed as parameter", () => {
    expect(prepareMessagesList(mockList)).toEqual(expectedList);
  });
  it("should return empty array when an empty array is passed as parameter ", () => {
    expect(prepareMessagesList([])).toEqual([]);
  });
  it("should return empty array when undefined is passed as parameter", () => {
    expect(prepareMessagesList(undefined)).toEqual([]);
  });
  it("should return empty array when null is passed as parameter", () => {
    expect(prepareMessagesList(null)).toEqual([]);
  });
});

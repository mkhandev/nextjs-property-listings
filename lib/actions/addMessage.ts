"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

const addMessage = async (
  name: string,
  email: string,
  phone: string,
  body: string,
  propertyId: string,
  recipient: string
) => {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  if (userId === recipient) {
    return { error: "You can not send a message to yourself" };
  }

  const newMessage = new Message({
    name: name,
    email: email,
    phone: phone,
    body: body,
    sender: userId,
    property: propertyId,
    recipient: recipient,
  });

  await newMessage.save();

  return { submitted: true };
};

export default addMessage;

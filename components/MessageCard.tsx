"use client";

import { useState } from "react";
import { Message } from "@/types";
import markMessageAsRead from "@/lib/actions/markMessageAsRead";
import { toast } from "react-toastify";
import deleteMessage from "@/lib/actions/deleteMessage";
import { useGlobalContext } from "@/context/GlobalContext";

const MessageCard = ({ message }: { message: Message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { setUnreadCount } = useGlobalContext();

  const handleReadClick = async () => {
    const read = await markMessageAsRead(message._id as string);
    setIsRead(read);

    setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));

    toast.success(`Marked as ${read ? "read" : "new"}`);
  };

  const handleDeleteClick = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) return;

    setIsDeleting(true);
    try {
      await deleteMessage(message._id as string);
      setIsDeleted(true);

      setUnreadCount((prevCount) => (isRead ? prevCount : prevCount - 1));

      toast.success("Message Deleted");
    } catch (error) {
      toast.error("Failed to delete message.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isDeleted) {
    return <p>Deleted message</p>;
  }
  return (
    <div className="relative p-4 bg-white border border-gray-200 rounded-md shadow-md">
      {!isRead && (
        <div className="absolute px-2 py-1 text-white bg-yellow-500 rounded-md top-2 right-2">
          New
        </div>
      )}

      <h2 className="mb-4 text-xl">
        <span className="font-bold">Property Inquiry:</span>
        {(message.property as any).name}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Reply Email:</strong>{" "}
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{" "}
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{" "}
          {new Date(message.createdAt as any).toLocaleString()}
        </li>
      </ul>

      <button
        onClick={handleReadClick}
        className={`cursor-pointer mt-4 mr-3 ${
          isRead ? "bg-gray-300" : "bg-blue-500 text-white"
        } py-1 px-3 rounded-md`}
      >
        {isRead ? "Mark As New" : "Mark As Read"}
      </button>

      <button
        onClick={handleDeleteClick}
        disabled={isDeleting}
        className={`px-3 py-1 mt-4 text-white rounded-md cursor-pointer ${
          isDeleting ? "bg-gray-400 cursor-not-allowed" : "bg-red-500"
        }`}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default MessageCard;

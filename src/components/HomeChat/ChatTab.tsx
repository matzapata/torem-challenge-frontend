import { useState } from 'react';

import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ChatTabProps } from '../../types/types';
import ConfirmDialog from '../ConfirmDialog';

function ChatTab(chatTabProps: ChatTabProps) {
  const { name, photo, chatId, messages, selectedChat, onClick } = chatTabProps;

  const [isOpen, setIsOpen] = useState(false);

  const lastMessage = messages[0]
    ? messages.slice(-1)[0].message.slice(0, 55) + '...'
    : 'No hay mensajes.';
  const lastMessageTime = messages[0] ? messages.slice(-1)[0].timeDate.slice(11, 16) + ' p.m.' : '';

  const eraseChat = () => {
    /* 
      TODO: 
      1. Delete the chat
    */
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <div
      id="chatTab"
      className={
        selectedChat === chatId
          ? 'chatTab d-flex flex-row justify-content-between px-3 cursor-pointer bg-chatter-green text-no-selection'
          : 'chatTab d-flex flex-row justify-content-between px-3 cursor-pointer text-no-selection'
      }
      onClick={onClick}
    >
      <div className="d-flex flex-row gap-3 w-100 justify-content-center align-items-center">
        <div className="chatPhoto">
          <img
            src={`http://localhost:8080/${photo.substring(5)}`}
            alt="ProfilePhoto"
            className="image"
          />
        </div>
        <div className="chatInfo d-flex flex-column py-2 w-100">
          <div className="d-flex justify-content-between align-items-center">
            <div className="chatContact text-chatter-black fw-bold">{name}</div>
            <div className="chat-time text-chatter-black opacity-50 self-align-end">
              {lastMessageTime}
            </div>
          </div>
          <div className="chatPreview d-flex flex-row gap-1 align-items-center">
            <div className="iconStatus text-primary">
              <IoCheckmarkDoneOutline />
            </div>
            <div className="msgPreview text-chatter-black fs-smaller opacity-50">{lastMessage}</div>
          </div>
        </div>
      </div>
      <div
        className="text-chatter-black chatTab-dots d-flex align-items-center"
        onClick={handleOpenModal}
      >
        <BsThreeDotsVertical />
      </div>

      <ConfirmDialog
        title="Eliminar chat"
        text="¿Está seguro que desea borrar la conversación?"
        handleOk={eraseChat}
        handleCancel={setIsOpen}
        isOpen={isOpen}
      />
    </div>
  );
}

export default ChatTab;

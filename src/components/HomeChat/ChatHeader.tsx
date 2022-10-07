import { BsPaperclip } from 'react-icons/bs';
import { Chat } from '../../types/types';

function ChatHeader(userChatData: Chat) {
  const { image, name } = userChatData;

  return (
    <div className="d-flex flex-row align-items-center gap-3 px-4 py-2 chat-header text-no-selection">
      <div id="contactProfilePhoto">
        {name && image ? (
          <img
            src={`http://localhost:8080/${image?.substring(5)}`}
            className="image"
            alt="UserImage"
          />
        ) : null}
      </div>
      <div id="contactName" className="bg-chatter-gray fw-bold text-chatter-blue fs-5">
        {name}
      </div>
      <div className="d-flex flex-grow-1 justify-content-end">
        <div id="attach" className="text-chatter-black clip-rotation fs-3 opacity-50">
          <BsPaperclip />
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;

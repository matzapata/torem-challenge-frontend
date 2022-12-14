import { useState } from 'react';
import ConfirmDialog from '../../components/ConfirmDialog';
import NewChatModal from '../../components/HomeChat/NewChatModal';
import { LoadRemove, LoadStart } from '../../components/Loading';
import { NotificationFailure, NotificationSuccess } from '../../components/Notifications';
import { setLogoutData } from '../../redux/userSlice';
import { DropDownProps } from '../../types/chat';
import apiClient from '../../utils/client';
import { useRouter } from "next/router";
import { useAppDispatch } from '../../redux/hooks';

function ConfigDropdown(dropDownProps: DropDownProps) {
  const { getChatsData, userData, isOpen } = dropDownProps;

  const [delDialogIsOpen, setDelDialogIsOpen] = useState(false);
  const [newChatModalIsOpen, setNewChatModalIsOpen] = useState(false);

  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleDeleteUser = () => {
    setDelDialogIsOpen(true);
  };

  const handleNewChatModal = () => {
    setNewChatModalIsOpen(true);
  };

  const handleConfirmDelete = () => {
    /* 
      TODO: 
      1. Get current user data?? Why? Api delete method gets user data from JWT... 
      2. Delete user 
    */
    
    LoadStart()
    apiClient.delete("/users")
      .then(() => NotificationSuccess("Se elimino la cuenta correctamente"))
      .then(() => dispatch(setLogoutData()))
      .then(() => router.push("/"))
      .catch(e => NotificationFailure(`Error: ${e.response.data.message}`)) 
      .finally(() => LoadRemove())

  };

  return (
    <div className={isOpen ? 'configDropdown scale1' : 'configDropdown'}>
      <ul>
        <li onClick={handleNewChatModal}>
          <div>Nuevo chat</div>
        </li>
        <li onClick={handleDeleteUser}>
          <div>Eliminar cuenta</div>
        </li>
      </ul>

      <NewChatModal
        isOpen={newChatModalIsOpen}
        setIsOpen={setNewChatModalIsOpen}
        userData={userData}
        getChatsData={getChatsData}
      />
      <ConfirmDialog
        title="Eliminar Usuario"
        text="??Est?? seguro que desea eliminar la cuenta?"
        isOpen={delDialogIsOpen}
        handleCancel={setDelDialogIsOpen}
        handleOk={handleConfirmDelete}
      />
    </div>
  );
}

export default ConfigDropdown;

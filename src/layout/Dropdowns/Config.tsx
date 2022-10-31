import { useState } from 'react';
import ConfirmDialog from '../../components/ConfirmDialog';
import NewChatModal from '../../components/HomeChat/NewChatModal';
import { LoadRemove, LoadStart } from '../../components/Loading';
import { NotificationSuccess } from '../../components/Notifications';
import { setLogoutData } from '../../redux/userSlice';
import { DropDownProps } from '../../types/chat';
import apiClient from '../../utils/client';
import { useRouter } from "next/router";

function ConfigDropdown(dropDownProps: DropDownProps) {
  const { getChatsData, userData, isOpen } = dropDownProps;

  const [delDialogIsOpen, setDelDialogIsOpen] = useState(false);
  const [newChatModalIsOpen, setNewChatModalIsOpen] = useState(false);

  const router = useRouter()

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
      .then(() => setLogoutData())
      .then(() => router.push("/"))
      .then(() => LoadRemove())

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
        text="¿Está seguro que desea eliminar la cuenta?"
        isOpen={delDialogIsOpen}
        handleCancel={setDelDialogIsOpen}
        handleOk={handleConfirmDelete}
      />
    </div>
  );
}

export default ConfigDropdown;

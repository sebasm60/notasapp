import { useDispatch, useSelector } from 'react-redux';
import { onOpenAsistenciaModal, onCloseAsistenciaModal } from '../store';

export const useUiStore = () => {

    const dispatch = useDispatch();
    const { isModalOpen } = useSelector(state => state.ui);

    const closeModal = () => dispatch(onCloseAsistenciaModal());
    const openModal = () => dispatch(onOpenAsistenciaModal());

    return {
        isModalOpen,

        openModal,
        closeModal,
    }
}

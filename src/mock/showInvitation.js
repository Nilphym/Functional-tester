import { toast } from 'react-toastify';

import { logout } from '../redux/store';

export const showInvitation = ({ dispatchResult, navigate, dispatch }) => {
  toast.info('Due to this project being only front-end, please click here to register a new user', {
    autoClose: false,
    onClick: () => {
      dispatch(logout());
      navigate(`/register/user/${dispatchResult.payload.id}`);
    }
  });
};

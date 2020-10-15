import login from './user/login';
import register from './user/register';
import logout from './user/logout';
import updateUser from './user/updateUser';

import createAvis from './avis/createAvis';
import deleteAVis from './avis/deleteAVis';
import readAvis, { getAvisFrom, getAvisFor } from './avis/readAvis';
import updateAvis from './avis/updateAvis';


const Api = {
  login: login,
  register: register,
  logout: logout,
  updateUser: updateUser,

  createAvis: createAvis,
  deleteAVis: deleteAVis,
  readAvis: readAvis,
  updateAvis: updateAvis,
  getAvisFrom: getAvisFrom,
  getAvisFor: getAvisFor
}

export default Api;

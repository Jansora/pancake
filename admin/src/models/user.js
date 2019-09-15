import {checkLogin} from "../services/golang";

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    * checkLogin(_, {call}) {
      const response = yield call(checkLogin);
      if (response.ret !== true) {
        window.location.href = '/user/login';
      }
    },
  },
  reducers: {},
};
export default UserModel;

import { OauthCert } from 'constants';
import { AuthUrls } from '../urls';

export default {

  login: (payload) => {
    let { username, password, vm } = payload;
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return vm.proxy.axios({
      method: "post",
      url: AuthUrls.loginUrl,
      data: formData,
      headers: {
        "Authorization": OauthCert,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  },

  changePwd: (payload) => {
    let { oldPassword, newPassword, vm } = payload;
    let formData = new FormData();
    formData.append('oldPassword', oldPassword);
    formData.append('newPassword', newPassword);
    return vm.proxy.axios({
      method: "put",
      url: AuthUrls.changePwdUrl,
      data: formData,
      headers: {
        "Authorization": "Bearer " + window.sessionStorage.getItem('token'),
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  }

};
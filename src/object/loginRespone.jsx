class LoginResponse {
    constructor(jwt, role, username, id) {
      this._jwt = jwt;
      this._role = role;
      this._username = username;
      this._id = id;
    }
  
    get id() {
      return this._id;
    }
  
    set id(value) {
      this._id = value;
    }
  
    get username() {
      return this._username;
    }
  
    set username(value) {
      this._username = value;
    }
  
    get role() {
      return this._role;
    }
  
    set role(value) {
      this._role = value;
    }
  
    get jwt() {
      return this._jwt;
    }
  
    set jwt(value) {
      this._jwt = value;
    }
  }
  
  export default LoginResponse;
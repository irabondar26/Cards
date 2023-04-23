export default class Authorization {
    constructor(login, password) {
      this.login = login;
      this.password = password;
    }
    #urlAuth = "https://ajax.test-danit.com/api/v2/cards/login";
    async getToken() {
      let response = await fetch(this.#urlAuth, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: this.login, password: this.password }),
      });
      let data = await response.text();
      return data !== 'Incorrect username or password'? data : '';  // Проверка на попытку авторизации с не корректными данными
    }
  }
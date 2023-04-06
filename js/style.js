/** @format */

"use strict";

class Request {
  token = "787ace58-d17b-420f-b75b-29ee789e9496";
  mainUrl = "https://ajax.test-danit.com/api/v2/cards";

  async getAll() {
    let response = await fetch(this.mainUrl, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    let data = await response.json();
    return data;
  }
}

// async function main() {
//   let request = new Request();
//   let cards = await request.getAll();
//   console.log(cards);
// }
// main();

class AuthorizationForm {
  render() {
    this.formAuthorization = document.createElement("div");
    this.formAuthorization.id = "autorizationForm";
    this.formAuthorization.style.display = "none";

    let login = document.createElement("input");
    login.id = "login";

    let password = document.createElement("input");
    password.id = "password";

    let buttonAuthorization = document.createElement("button");
    buttonAuthorization.id = "authBtn";
    buttonAuthorization.addEventListener("click", this.logining.bind(this));
    buttonAuthorization.textContent = "Login";

    let closeSpan = document.createElement("span");
    closeSpan.textContent = "Close";
    closeSpan.addEventListener("click", this.hideForm.bind(this));

    this.formAuthorization.append(
      login,
      password,
      buttonAuthorization,
      closeSpan
    );
    return this.formAuthorization;
  }

  showForm() {
    this.formAuthorization.style.display = "block";
  }
  hideForm() {
    this.formAuthorization.style.display = "none";
  }

  async logining() {
    let login = "familyClinic@gmail.com"; //login;
    let password = 123456; //password
    let token = "";
    try {
      let response = await fetch(
        "https://ajax.test-danit.com/api/v2/cards/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: login, password: password }),
        }
      );
      token = await response.text();
      console.log(token);
    } catch (error) {
      console.log(error.message);
    }
    if (token != NaN && token != undefined && token != "") {
      this.hideForm();
      alert("Welcome " + login);
    }
  }
}

let cardsDiv = document.createElement("div");
cardsDiv.id = "cards";
cardsDiv.innerText = "No items have been added";
document.body.append(cardsDiv);

let autorizationForm = new AuthorizationForm();
let formAuth = autorizationForm.render();
document.body.append(formAuth);

let headerBtn = document.querySelector(".header__btn");
headerBtn.addEventListener(
  "click",
  autorizationForm.showForm.bind(autorizationForm)
);

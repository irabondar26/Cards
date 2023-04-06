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

class Modal {
  constructor(id) {
    this.id = id;
  }

  render() {
    this.modalWrapper = document.createElement("div");
    this.modalWrapper.id = this.id;
    this.modalWrapper.classList.add("modal-wrapper");
    this.modalWrapper.style.display = "none";

    let modalContent = document.createElement("div");
    modalContent.id = "content" + this.id;

    let closeSpan = document.createElement("span");
    closeSpan.innerHTML = "&times;";
    closeSpan.addEventListener("click", this.hideForm.bind(this));
    modalContent.append(closeSpan);

    window.addEventListener("click", (event) => {
      if (!event.target.closest(".modal-wrapper")) {
        this.hideForm();
      }
    });

    this.modalWrapper.append(modalContent);
    return this.modalWrapper;
  }

  showForm() {
    this.modalWrapper.style.display = "block";
  }

  hideForm() {
    this.modalWrapper.style.display = "none";
  }
}

class AuthorizationForm extends Modal {
  constructor(id) {
    super(id);
  }

  render() {
    let baseForm = super.render();
    console.log(baseForm);

    let login = document.createElement("input");
    login.id = "login";
    login.type = "text";
    login.name = "login";
    login.placeholder = "Ваш логин";
    login.required = "true";

    let password = document.createElement("input");
    password.id = "password";
    password.name = "password";
    password.placeholder = "Ваш пароль";
    password.required = "true";

    let buttonAuthorization = document.createElement("button");
    buttonAuthorization.id = "authBtn";
    // событие на кнопке авторизации
    buttonAuthorization.textContent = "Login";

    baseForm.append(login, password, buttonAuthorization);
    return baseForm;
  }
}

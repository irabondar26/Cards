/** @format */

const URL = "https://ajax.test-danit.com/api/v2/cards";
const TOKEN = "787ace58-d17b-420f-b75b-29ee789e9496";

const entry = document.getElementById("entry"); // это кнопка вход на главной странице. при нажатии на нее открываем модалку.
entry.addEventListener("click", (e) => {
  e.preventDefault();
  modal.openModal();
  let btnClose = document.querySelector(".btn-secondary");
  btnClose.remove();
});

class Modal {
  constructor(id, idSaveBtn) {
    this.id = id;
    this.idSaveBtn = idSaveBtn;
  }

  render(header = "", body, close = "", save = "") {
    // метод который делает модалку общую для всех форм. при вызове метода render в парметр body добавляем нужную форму.

    this.div1 = document.createElement("div");
    this.div1.classList = "modal";
    this.div1.tabIndex = "-1";
    const div2 = document.createElement("div");
    div2.classList = "modal-dialog";
    const div3 = document.createElement("div");
    div3.classList = "modal-content";
    const div4 = document.createElement("div");
    div4.classList = "modal-header";
    let title = document.createElement("h5");
    title.classList = "modal-title";
    title.textContent = header;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.classList = "btn-close";
    btn.setAttribute("data-bs-dismiss", "modal");
    btn.setAttribute("aria-label", "Close");
    const div5 = document.createElement("div");
    div5.classList = "modal-body";
    let content = document.createElement("p");
    content.insertAdjacentElement("beforeend", body);
    const div6 = document.createElement("div");
    div6.classList = "modal-footer";
    let btnClose = document.createElement("button");
    btnClose.type = "button";
    btnClose.classList = "btn btn-secondary";
    btnClose.setAttribute("data-bs-dismiss", "modal");
    btnClose.textContent = close;
    let btnSave = document.createElement("button");
    btnSave.type = "button";
    btnSave.classList = "btn btn-primary";
    btnSave.textContent = save;
    btnSave.id = this.idSaveBtn; // добавлю id к какждой кнопке "сохранить" в модалке, чтобы потом искать ее и вешать обработчик
    this.div1.append(div2);
    div2.append(div3);
    div3.append(div4, div5, div6);
    div4.append(title, btn);
    div5.append(content);
    div6.append(btnClose, btnSave);
    btn.addEventListener("click", this.closeModal.bind(this));

    this.div1.addEventListener("click", (e) => {
      console.log(e.target);
      if (e.target === this.div1) {
        this.closeModal();
      }
    });

    return this.div1;
  }

  openModal() {
    this.div1.style.display = "block";
  }

  closeModal() {
    this.div1.style.display = "none";
  }
}

//данный класс создает форму авторизации
class Forms {
  formLogin() {
    const form = document.createElement("div");
    form.id = "login-form";
    form.classList = "row g-3 align-items-center form-items";

    form.innerHTML = `
        <div class="mb-3">
         <label for="exampleFormControlInput1" class="form-label">Email address</label>
            <input type="email" id="email" class="form-control" id="exampleFormControlInput1" placeholder="Enter your e-mail">
        </div>
        <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">Password</label>
        <input type="password" id="pass" class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Enter your password">
        </div>`;
    return form;
  }
}

class Authorization {
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
    return data;
  }
}

//данный класс описывает общую форму для визитов
class Visit {
  constructor(goal, doctor, description, urgency, fullName) {
    this.goal = goal;
    this.doctor = doctor;
    this.description = description;
    this.urgency = urgency;
    this.fullName = fullName;
  }
  render() {
    let doctor = document.createElement("div");
    doctor.classList = "input-group mb-3";
    doctor.innerHTML = `
        <label class="input-group-text" for="inputGroupSelect01">${this.doctor}</label>
            <select class="form-select" id="inputGroupSelect01">
                <option value="1">Стоматолог</option>
                <option value="2">Кардиолог</option>
                <option value="3">Терапевт</option>
            </select>
        `;

    let urgency = document.createElement("div");
    urgency.classList = "input-group mb-3";
    urgency.innerHTML = `
        <label class="input-group-text" for="inputGroupSelect01">${this.urgency}</label>
            <select class="form-select" id="inputGroupSelect01">
                <option value="1">Обычная</option>
                <option value="2">Приоритетная</option>
                <option value="3">Неотложная</option>
            </select>
        `;

    let goal = document.createElement("div");
    goal.classList = "input-group mb-3";
    goal.innerHTML = `<span class="input-group-text" id="inputGroup-sizing-default">${this.goal}</span>
        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">`;

    let description = document.createElement("div");
    description.classList = "input-group mb-3";
    description.innerHTML = `<span class="input-group-text" id="inputGroup-sizing-default">${this.description}</span>
        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">`;

    let name = document.createElement("div");
    name.classList = "input-group";
    name.innerHTML = `
        <span class="input-group-text">${this.fullName}</span>
        <input type="text" aria-label="Last name" class="form-control" placeholder="Фамилия">
        <input type="text" aria-label="First name" class="form-control" placeholder="Имя">
        <input type="text" aria-label="Father name" class="form-control" placeholder="Отчество">
        `;

    let wrap = document.createElement("div");
    wrap.append(doctor, urgency, goal, description, name);
    return wrap;
  }
}

//класс VisitDentist и т.д. нужно доделать.
class VisitDentist extends Visit {
  renderDentist() {
    let dataLastVisit = document.createElement("div");
    dataLastVisit.classList = "input-group";
    dataLastVisit.innerHTML = `
            <span class="input-group-text">Дата последнего визита</span>
            <input type="text" aria-label="Last name" class="form-control" placeholder="Фамилия">
            <input type="text" aria-label="First name" class="form-control" placeholder="Имя">
            <input type="text" aria-label="Father name" class="form-control" placeholder="Отчество">
            `;
    return dataLastVisit;
  }
}

// class VisitCardiologist extends Visit{
//     сonstructor(goal, doctor, description, urgency, fullName){
//         super(goal, doctor, description, urgency, fullName)

//         renderCardiologist(){

//         }
//     }
// }

// class VisitTherapist extends Visit{
//     сonstructor(goal, doctor, description, urgency, fullName){
//         super(goal, doctor, description, urgency, fullName)

//         renderTherapist(){

//         }
//     }
// }

//здесь будут создаваться запросы
class Request {
  async getAll(url, token) {
    // это запрос на получение всех карточек с сервера
    let request = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let response = await request.json();
    return response;
  }
}

const modal = new Modal("window", "save");
const form = new Forms();
document.body.append(
  modal.render("Авторизация", form.formLogin(), "Закрыть", "Войти")
); // вставила окошко авторизации

//некоторые глобальные переменные, которые нужны для проверки пароля и логина
const btnSave = document.getElementById("save");
const mail = document.getElementById("email");
const pass = document.getElementById("pass");
const createVisitBtn = document.getElementById("create-visit-btn");

// контейнер для будущих карточек
const cardContainer = document.createElement("div");
cardContainer.classList = "card-container"; //
document.body.append(cardContainer);

//при клике на єту кнопку проверяю пароль и вывожу на стену карточки.
btnSave.addEventListener("click", async (e) => {
  e.preventDefault();
  if (mail.value === "" || pass.value === "") {
    alert("Логин или пароль не заполнены");
    mail.value = "";
    pass.value = "";
    return;
  }
  let auth = new Authorization(mail.value, pass.value);
  let newToken = "";
  try {
    newToken = await auth.getToken();
  } catch (error) {
    alert(error.message);
  }
  if (TOKEN !== newToken) {
    alert("Авторизация не успешна");
  } else {
    modal.closeModal();
    entry.style.display = "none";
    createVisitBtn.style.display = "block";
    try {
      const request = new Request();
      let cards = await request.getAll(URL, TOKEN);
      if (cards.length !== 0 && cards !== undefined) {
        let noVisitText = document.querySelector(".main__text");
        noVisitText.style.display = "none";
      }
    } catch (error) {
      console.log(error.message);
    }
  }
});

const visit = new Visit(
  "Цель визита",
  "Выберите врача",
  "Краткое описание",
  "Выберите срочность",
  "ФИО клиента"
);
let counter = 0;
//при клике на эту кнопку выводится модальное окно для создания визита.
createVisitBtn.addEventListener("click", (e) => {
  counter++;
  e.preventDefault();
  const modal2 = new Modal("window-1", `save-${counter}`);
  document.body.append(
    modal2.render("Создать визит", visit.render(), "Закрыть", "Сохранить")
  );
  modal2.openModal();

  const btnSaveVisit = document.getElementById(`save-${counter}`); // кнопка сохранить в модалке создания визита. при нажатии на нее - пост запрос и создание карточки
  btnSaveVisit.addEventListener("click", (e) => {
    e.preventDefault();
    modal2.closeModal(); // закрыла модалку.
    console.log("здесь делаем пост запрос и выводим карточку на стену");

    const card = new Card();
    card.renderCard();
  });
});

/* <h5 class="card-header">Иванов Иван Иванович</h5> 
<div class="card-body">
 <h5 class="card-title">Доктор: стоматолог</h5>
<a href="#" class="btn btn-primary">Показать больше</a>
</div> */

//далее идет создание карточки, данные для нее (data) возьмем из промиса. Пока ФИО и доктор - выдуманные.
class Card {
  renderCard() {
    //const {a, b, c , d} = data;
    const card = document.createElement("div");
    card.classList = "card card-width";
    card.innerHTML = `
        <div class="card-header">
        <div class="small-buttons-container">
        <div class="small-button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z"></path></svg></div>
        <div class="small-button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M5.72 5.72a.75.75 0 0 1 1.06 0L12 10.94l5.22-5.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L13.06 12l5.22 5.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L12 13.06l-5.22 5.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L10.94 12 5.72 6.78a.75.75 0 0 1 0-1.06Z"></path></svg></div>
        </div>
        <h5>Иванов Иван Иванович</h5>
        </div>
        <div class="card-body">
         <h5 class="card-title">Доктор: стоматолог</h5>
        <a href="#" class="btn btn-primary">Показать больше</a>
        </div>`;
    cardContainer.prepend(card);
    return card;
  }
}

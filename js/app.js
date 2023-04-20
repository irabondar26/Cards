/** @format */

const url = "https://ajax.test-danit.com/api/v2/cards";
let TOKEN; // "787ace58-d17b-420f-b75b-29ee789e9496";

function checkLockalStorage() {
  TOKEN = localStorage.getItem('token')
  if (TOKEN !== undefined && TOKEN !== "" && TOKEN !== null) {
    document.getElementById('entry').style.display = 'none'
    let exitBtn = document.getElementById('exit')
    exitBtn.style.display = 'block'
    document.getElementById("create-visit-btn").style.display = 'block';
    exitBtn.addEventListener('click', () => {
      localStorage.removeItem('token')
      exitBtn.style.display = 'none'
      TOKEN = "";
      entry.style.display = 'block'
      clearCards();
      document.getElementById("create-visit-btn").style.display = "none";
      document.querySelector(".main__text").style.display = 'block'
    })
    printAllCards();
  }
}


async function printAllCards() {
  const request = new Request();
  try {

    let cards = await request.getAll(url, TOKEN);
    if (cards.length !== 0 && cards !== undefined) {
      let noVisitText = document.querySelector(".main__text");
      noVisitText.style.display = "none";

      let cardClass = new Card();
      cards.forEach((card) => {
        cardClass.renderCard(card);
      });
    }
  } catch (error) {
    console.log(error.message);
  }
}



const entry = document.getElementById("entry"); // это кнопка вход на главной странице. при нажатии на нее открываем модалку.
entry.addEventListener("click", (e) => {
  e.preventDefault();
  modal.openModal();
  let btnClose = document.querySelector(".btn-secondary");
  btnClose.remove();
});

class Modal {
  constructor(id, idSaveBtn, idCloseBtn="") {
    this.id = id;
    this.idSaveBtn = idSaveBtn;
    this.idCloseBtn = idCloseBtn;
  }

  render(header = "", body, close = "", save = "") {
    // метод который делает модалку общую для всех форм. при вызове метода render в парметр body добавляем нужную форму.

    this.div1 = document.createElement("form");
    this.div1.classList = "modal";
    this.div1.id = this.id;
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
    btnClose.id = this.idCloseBtn;
    btnClose.addEventListener("click", this.closeModal.bind(this));
    let btnSave = document.createElement("input");
    btnSave.type = "submit";
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
      if (e.target === this.div1) {
        this.closeModal();
      }
    });

    return this.div1;
  }

  changeModal(body) {
    body.classList.add("modal-body");
    let firstdiv = this.div1.firstChild;
    firstdiv.firstChild.lastChild.previousElementSibling.insertAdjacentElement(
      "afterend",
      body
    );
  }
  openModal() {
    this.div1.style.display = "block";
  }

  closeModal() {
    this.div1.style.display = "none";
  }
}

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
    return data !== 'Incorrect username or password'? data : '';  // Проверка на попытку авторизации с не корректными данными
  }
}

class Visit {
  render() {
    let doctor = document.createElement("div");
    doctor.classList = "input-group mb-3";
    doctor.innerHTML = `
      <label class="input-group-text" for="inputGroupSelect01">Выберите врача</label>
          <select class="form-select visit-doctor" id="inputGroupSelect01" required>
              <option class="form-select__otion form-select__otion--dentist" value="dentist">Стоматолог</option>
              <option class="form-select__otion form-select__otion--cardiolog" value="cardiologist">Кардиолог</option>
              <option class="form-select__otion form-select__otion--therapist" value="therapist">Терапевт</option>
          </select>
      `;

    let urgency = document.createElement("div");
    urgency.classList = "input-group mb-3";
    urgency.innerHTML = `
      <label class="input-group-text" for="inputGroupSelect01">Выберите срочность</label>
          <select class="form-select visit-ugency" id="inputGroupSelect01" required>
              <option value="1">Обычная</option>
              <option value="2">Приоритетная</option>
              <option value="3">Неотложная</option>
          </select>
      `;

    let dataOfVisit = document.createElement("div");
    dataOfVisit.classList = "input-group mb-3";
    dataOfVisit.innerHTML = `<span class="input-group-text" id="inputGroup-sizing-default">Дата визита</span>
      <input type="date" class="form-control visit-data" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required>`;

    let goal = document.createElement("div");
    goal.classList = "input-group mb-3";
    goal.innerHTML = `<span class="input-group-text" id="inputGroup-sizing-default">Цель визита</span>
      <input type="text" class="form-control visit-goal" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required>`;

    let description = document.createElement("div");
    description.classList = "input-group mb-3";
    description.innerHTML = `<span class="input-group-text" id="inputGroup-sizing-default">Краткое описание</span>
      <input type="text" class="form-control visit-description" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required>`;

    let name = document.createElement("div");
    name.classList = "input-group mb-3";
    name.innerHTML = `
      <span class="input-group-text">ФИО клиента</span>
      <input type="text" aria-label="Last name" class="form-control visit-lastName" placeholder="Фамилия" required>
      <input type="text" aria-label="First name" class="form-control visit-name" placeholder="Имя" required>
      <input type="text" aria-label="Father name" class="form-control visit-surname" placeholder="Отчество" required>
      `;
     
    let wrap = document.createElement("div");
    wrap.append(doctor, urgency, dataOfVisit, goal, description, name);
    return wrap;
  }
}

class VisitDentist extends Visit {
  renderDentist() {
    let dataLastVisit = document.createElement("div");
    dataLastVisit.classList = "input-group mb-3";
    dataLastVisit.innerHTML = `
      <span class="input-group-text">Дата последнего визита</span>
      <input type="date" aria-label="data" class="form-control last-visit" placeholder="Дата" required>
      `;
    dataLastVisit.classList.add("second-modal-body");
    return dataLastVisit;
  }
}

class VisitCardiologist extends Visit {
  renderCardiologist() {
    let result = document.createElement("div");

    let press = document.createElement("div");
    press.classList = "input-group mb-3";
    press.innerHTML = `
      <span class="input-group-text">Обычное давление</span>
      <input type="text" aria-label="Press" class="form-control press" placeholder="Давление" required>
      `;

    let indexMass = document.createElement("div");
    indexMass.classList = "input-group mb-3";
    indexMass.innerHTML = `
      <span class="input-group-text">Индекс массы тела</span>
      <input type="text" aria-label="Index" class="form-control index" placeholder="Индекс массы тела" required>
      `;

    let diseases = document.createElement("div");
    diseases.classList = "input-group mb-3";
    diseases.innerHTML = `
      <span class="input-group-text">Перенесенные заболевания сердечно-сосудистой системы</span>
      <input type="text" aria-label="Diseasess" class="form-control diseases" placeholder="Заболевания" required>
      `;

    let age = document.createElement("div");
    age.classList = "input-group mb-3";
    age.innerHTML = `
      <span class="input-group-text">Возраст</span>
      <input type="text" aria-label="Age" class="form-control age" placeholder="Возраст" required>
      `;
    result.append(press, indexMass, diseases, age);
    result.classList.add("second-modal-body");
    return result;
  }
}

class VisitTherapist extends Visit {
  renderTherapist() {
    let age = document.createElement("div");
    age.classList = "input-group mb-3";
    age.innerHTML = `
      <span class="input-group-text">Возраст</span>
      <input type="text" aria-label="Age" class="form-control age" placeholder="Возраст" required>
      `;
    age.classList.add("second-modal-body");
    return age;
  }
}

class Request {
  async getAll(url, token) {
    let request = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let response = await request.json();
    return response;
  }

  post(url, obj, token) {
    try {
      let result = fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(obj),
      });
      return result;
    } catch (e) {
      console.log(e.message);
    }
  }

  delete(token, url, cardId) {
    try {
      let result = fetch(`${url}/${cardId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return result;
    } catch (e) {
      console.log(e.message);
    }
  }

  put(token, url, cardId, obj) {
    try {
      let result = fetch(`${url}/${cardId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(obj),
      });
      return result;
    } catch (e) {
      console.log(e.message);
    }
  }
}

class Filter {
  filterByStatus(status, cards) {
   
    switch (status) {
      case "1":
        return this.#getOpenedCards(cards);
      case "2":
        return this.#getClosedCards(cards);
      default:
        return cards;
    }
  }

  #getClosedCards(cards) {
    let filteredArray = [];
    cards.forEach((card) => {
      if ((Date.now() - Date.parse(card.data)) > 0) {
        filteredArray.push(card);
      }
    });
    return filteredArray;
  }

  #getOpenedCards(cards) {
    let filteredArray = [];
    cards.forEach((card) => {
      if ((Date.now() - Date.parse(card.data)) <= 0) {
        filteredArray.push(card);
      }
    });
    return filteredArray;
  }

  filterByUrgency(urgency, cards) {
    let cardsFeiltered = [];
    cards.forEach((card) => {
      if (card.ugency === urgency) {
        cardsFeiltered.push(card);
      }
    });
    return cardsFeiltered;
  }

  filterByTitleAndBodyText(textSearch, cards) {
    if (textSearch === "" || textSearch === undefined) {
      return cards;
    }
    let cardsFiltered = [];
    cards.forEach((card) => {
      //деструктурирую карту и если не было заполнено одно из полей, ининциализирую его пустой сторокой, чтоб не ловить исключение.
      let { description, goal } = card;
      description = description === undefined ? "" : description;
      goal = goal === undefined ? "" : goal;

      if (description.includes(textSearch) || goal.includes(textSearch)) {
        cardsFiltered.push(card);
      }
    });
    
    return cardsFiltered;
  }

  filterByNameLastname(textSearch, cards){
    let cardsFiltered = [];
    cards.forEach((card) => {
      //деструктурирую карту и если не было заполнено одно из полей, ининциализирую его пустой сторокой, чтоб не ловить исключение.
      let { name, lastName } = card;
      name = name === undefined ? "" : name.toLowerCase();
      lastName = lastName === undefined ? "" : lastName.toLowerCase();
      textSearch = textSearch.toLowerCase();
      if (lastName.includes(textSearch) || name.includes(textSearch)) {
        cardsFiltered.push(card);
      }
    });
    return cardsFiltered;
  }

}




const modal = new Modal("window", "save");
const form = new Forms();
document.body.append(
  modal.render("Авторизация", form.formLogin(), "Закрыть", "Войти")
);


const btnSave = document.getElementById("save");
const mail = document.getElementById("email");
const pass = document.getElementById("pass");
const createVisitBtn = document.getElementById("create-visit-btn");

const cardContainer = document.querySelector(".cards-wrapper");

checkLockalStorage();

//при клике на эту кнопку проверяю пароль и вывожу на стену карточки.
btnSave.addEventListener("click", async (e) => {
  e.preventDefault();
  if (mail.value === "" || pass.value === "") {
    alert("Логин или пароль не заполнены");
    mail.value = "";
    pass.value = "";
    return;
  }
  let auth = new Authorization(mail.value, pass.value);

  try {
    TOKEN = await auth.getToken();
  } catch (error) {
    alert(error.message);
  }
  if (TOKEN == undefined || TOKEN == "") {
    alert("Авторизация не успешна");
  } else {
    modal.closeModal();
    entry.style.display = "none";
    createVisitBtn.style.display = "block";

   localStorage.setItem('token', TOKEN);

    let exitBtn = document.getElementById('exit')
    exitBtn.style.display = 'block'
    exitBtn.addEventListener('click', () => {
      localStorage.removeItem('token')
      exitBtn.style.display = 'none'
      TOKEN = "";
      entry.style.display = 'block'
      clearCards();
      createVisitBtn.style.display = 'none'
      document.querySelector(".main__text").display = 'block'
    })

    try {
      const request = new Request();
      let cards = await request.getAll(url, TOKEN);
      if (cards.length !== 0 && cards !== undefined) {
        let noVisitText = document.querySelector(".main__text");
        noVisitText.style.display = "none";

        let cardClass = new Card();
        cards.forEach((card) => {
          cardClass.renderCard(card);
        });

      }
    } catch (error) {
      console.log(error.message);
    }
  }
 });

function contentCheckAndDelete(el) {
  if (el) {
    el.remove();
  }
}

const visit = new Visit();
let counter = 0;
//при клике на эту кнопку выводится модальное окно для создания визита.
createVisitBtn.addEventListener("click", (e) => {
  counter++;
  e.preventDefault();

  let oldModal = document.getElementById("window-visit");
  if (oldModal !== null) {
    oldModal.remove();
  }

  const modal2 = new Modal("window-visit", `save-${counter}`);
  document.body.append(
    modal2.render("Создать визит", visit.render(), "Закрыть", "Сохранить")
  );
  modal2.openModal();

  const formSelect = document.querySelector("#inputGroupSelect01");

  const dentist = new VisitDentist();

  modal2.changeModal(dentist.renderDentist());

  formSelect.addEventListener("change", () => {
    let element = document.querySelector(".second-modal-body");
    if (formSelect.value === "dentist") {
      contentCheckAndDelete(element);
      const dentist1 = new VisitDentist();
      modal2.changeModal(dentist1.renderDentist());
    } else if (formSelect.value === "cardiologist") {
      contentCheckAndDelete(element);
      const cardiologist = new VisitCardiologist();
      modal2.changeModal(cardiologist.renderCardiologist());
    } else {
      contentCheckAndDelete(element);
      const therapist = new VisitTherapist();
      modal2.changeModal(therapist.renderTherapist());
    }
  });

  function serchVisitInputs() {
    let newObj = {};
    const doctor = document.querySelector(".visit-doctor").value;
    const ugency = document.querySelector(".visit-ugency").value;
    const data = document.querySelector(".visit-data").value;
    const goal = document.querySelector(".visit-goal").value;
    const description = document.querySelector(".visit-description").value;
    const lastName = document.querySelector(".visit-lastName").value;
    const name = document.querySelector(".visit-name").value;
    const surname = document.querySelector(".visit-surname").value;
    newObj = {
      doctor,
      ugency,
      data,
      goal,
      description,
      lastName,
      name,
      surname,
    };
    return newObj;
  }

  const form = document.getElementById("window-visit");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    modal2.closeModal();
    console.log("здесь делаем пост запрос и выводим карточку на стену");
    let cardObj;
    if (formSelect.value === "dentist") {
      let { doctor, ugency, data, goal, description, lastName, name, surname } =
        serchVisitInputs();
      const dataLastVisit = document.querySelector(".last-visit").value;
      cardObj = {
        doctor: doctor,
        ugency: ugency,
        data: data,
        goal: goal,
        description: description,
        lastName: lastName,
        name: name,
        surname: surname,
        dataLastVisit: dataLastVisit,
      };
    } else if (formSelect.value === "cardiologist") {
      let { doctor, ugency, data, goal, description, lastName, name, surname } =
        serchVisitInputs();
      const press = document.querySelector(".press").value;
      const index = document.querySelector(".index").value;
      const diseases = document.querySelector(".diseases").value;
      const age = document.querySelector(".age").value;
      cardObj = {
        doctor: doctor,
        ugency: ugency,
        data: data,
        goal: goal,
        description: description,
        lastName: lastName,
        name: name,
        surname: surname,
        press: press,
        index: index,
        diseases: diseases,
        age: age,
      };
    } else {
      let { doctor, ugency, data, goal, description, lastName, name, surname } =
        serchVisitInputs();
      const age = document.querySelector(".age").value;
      cardObj = {
        doctor: doctor,
        ugency: ugency,
        data: data,
        goal: goal,
        description: description,
        lastName: lastName,
        name: name,
        surname: surname,
        age: age,
      };
    }
    const newRequest = new Request();

    newRequest
      .post(url, cardObj, TOKEN)
      .then((response) => response.json())
      .then((data) => carder.renderCard(data));

    
  });
});

let counter1 = 0;

class Card {
  renderCard(promise) {
    const {
      lastName,
      name,
      surname,
      doctor,
      age,
      diseases,
      index,
      data,
      press,
      goal,
      description,
      ugency,
      id,
      dataLastVisit
    } = promise;
    const card = document.createElement("div");
    card.classList = "card card-width";
    card.id = `card-${counter}`;
    card.innerHTML = `
        <div class="card-header">
        <div class="small-buttons-container">
        <div id='edit-${counter}' class="small-button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z"></path></svg></div>
        <div id='del-${counter}' class="small-button del-card"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M5.72 5.72a.75.75 0 0 1 1.06 0L12 10.94l5.22-5.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L13.06 12l5.22 5.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L12 13.06l-5.22 5.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L10.94 12 5.72 6.78a.75.75 0 0 1 0-1.06Z"></path></svg></div>
        </div>
        <h5 id="name-${counter}">${lastName} ${name} ${surname}</h5>
        </div>
        <div class="card-body">
         <h5 class="card-title">Доктор: ${getDoctor(doctor)}</h5>
        <a href="#" id='show-more-${counter}' class="btn btn-primary">Показать больше</a>
        </div>`;

    cardContainer.prepend(card);

    let showMoreBtn = document.getElementById(`show-more-${counter}`);
    showMoreBtn.addEventListener("click", () => {
      carder.clickOnShowMore(
        showMoreBtn,
        card,
        doctor,
        age,
        diseases,
        index,
        press,
        data,
        goal,
        description,
        ugency,
        dataLastVisit
      );
    });
    let delBtn = document.getElementById(`del-${counter}`);
    let editBtn = document.getElementById(`edit-${counter}`);
    let doctorName = document.querySelector(".card-title");
    let nameClient = document.getElementById(`name-${counter}`);
    carder.deleteCard(delBtn, card, id); 
    carder.editCard(editBtn, 
      doctorName, 
      id, 
      card, 
      nameClient, 
      showMoreBtn, 
      lastName,
      name,
      surname,
      doctor,
      age,
      diseases,
      index,
      data,
      press,
      goal,
      description,
      ugency,
      dataLastVisit);
    document.getElementById('no-items').style.display = 'none' //TODO прячу надпись no items...
    return card;
  }

  deleteCard(btn, element, cardId) {
    btn.addEventListener("click", () => {
      const requestDelete = new Request();
      requestDelete.delete(TOKEN, url, cardId).then((response) => {
        if (response.status === 200) {
          element.remove();
          noItemsShowHide(); // TODO если удалить последнюю карточку появится надпись no items...
        } else {
          console.log(new Error("Что-то пошло не так!"));
        }
      });
    });
  }

  editCard(btn, 
      doctorStatus, 
      cardId, 
      card, 
      nameClient, 
      showMoreBtn,
      lastName,
      name,
      surname,
      doctor,
      age,
      diseases,
      index,
      data,
      press,
      goal,
      description,
      ugency,
      dataLastVisit) {
    btn.addEventListener("click", () => {
      counter1++;
      const modal3 = new Modal(`window-edit`, `edit-btn-${counter1}`, `close-in-edit-${counter1}`);
      const visit1 = new Visit();
      document.body.append(
        modal3.render(
          "Редактировать карточку",
          visit1.render(),
          "Отменить",
          "Сохранить"
        )
      );
      modal3.openModal();

      let doctorSelect = document.querySelectorAll(".visit-doctor");
      let arr = Array.from(doctorSelect);
      let lastSelect = arr.at(-1);
    

      //const dentist2 = new VisitDentist();
      showValueInInput(doctor, ".visit-doctor");
      showValueInInput(ugency, ".visit-ugency");
      showValueInInput(lastName, ".visit-lastName");
      showValueInInput(name, ".visit-name");
      showValueInInput(surname, ".visit-surname");
      showValueInInput(goal, ".visit-goal");
      showValueInInput(description, ".visit-description");
      showValueInInput(data, ".visit-data");

     
    

      lastSelect.addEventListener("change", (e) => {
        let secondBody = document.querySelectorAll(".second-modal-body");

        if (e.target.value === "dentist") {
          let dentist3 = new VisitDentist();
          secondBody.forEach((el) => el.remove());
          modal3.changeModal(dentist3.renderDentist());
          lastSelect = e.target.value;
        } else if (e.target.value === "cardiologist") {
          let cardiologist2 = new VisitCardiologist();
          secondBody.forEach((el) => el.remove());
          modal3.changeModal(cardiologist2.renderCardiologist());
          lastSelect = e.target.value;
        } else {
          let therapist2 = new VisitTherapist();
          secondBody.forEach((el) => el.remove());
          modal3.changeModal(therapist2.renderTherapist());
          lastSelect = e.target.value;
        }
        return lastSelect;
      });

      lastSelect = lastSelect.value;
      let secondBody = document.querySelectorAll(".second-modal-body");
      secondBody.forEach((el) => el.remove());
      //modal3.changeModal(dentist2.renderDentist());

    fieldInEditCard(modal3, doctor, age, press, index, diseases, dataLastVisit);
      

      function getValueInputs() {
        let obj = {};
        let goal = getLastValue(".visit-goal");
        let ugency = getLastValue(".visit-ugency");
        let data = getLastValue(".visit-data");
        let description = getLastValue(".visit-description");
        let lastName = getLastValue(".visit-lastName");
        let name = getLastValue(".visit-name");
        let surname = getLastValue(".visit-surname");

        obj = {
          goal: goal.value,
          ugency: ugency.value,
          data: data.value,
          description: description.value,
          lastName: lastName.value,
          name: name.value,
          surname: surname.value,
          doctor: lastSelect,
        };
        return obj;
      }

      let closeInEdit = document.getElementById(`close-in-edit-${counter1}`);
      closeInEdit.addEventListener("click", ()=> {
        let oldModal = document.getElementById("window-edit");
        if (oldModal !== null) {
          oldModal.remove();
        }
      })

      //далее при нажатии на кнопку сохранить, отправляем пост запрос и меняем данные в этой карте.
      let formEdit = document.getElementById("window-edit");

      formEdit.addEventListener("submit", (e) => {
        e.preventDefault();
       
        modal3.closeModal();
        let fullobj;
        if (lastSelect === "dentist") {
          let {
            goal,
            doctor,
            ugency,
            data,
            description,
            lastName,
            name,
            surname
          } = getValueInputs();
          let lastVisit = getLastValue(".last-visit");

          fullobj = {
            goal: goal,
            ugency: ugency,
            data: data,
            description: description,
            lastName: lastName,
            name: name,
            surname: surname,
            doctor: doctor,
            dataLastVisit: lastVisit.value,
          };
        } else if (lastSelect === "cardiologist") {
          let {
            goal,
            doctor,
            ugency,
            data,
            description,
            lastName,
            name,
            surname,
          } = getValueInputs();
          let press = getLastValue(".press");
          let age = getLastValue(".age");
          let index = getLastValue(".index");
          let diseases = getLastValue(".diseases");

          fullobj = {
            goal: goal,
            ugency: ugency,
            data: data,
            description: description,
            lastName: lastName,
            name: name,
            surname: surname,
            doctor: doctor,
            press: press.value,
            index: index.value,
            diseases: diseases.value,
            age: age.value,
          };
        } else {
          let {
            goal,
            doctor,
            ugency,
            data,
            description,
            lastName,
            name,
            surname,
          } = getValueInputs();
          let age = getLastValue(".age");

          fullobj = {
            goal: goal,
            ugency: ugency,
            data: data,
            description: description,
            lastName: lastName,
            name: name,
            surname: surname,
            doctor: doctor,
            age: age.value,
          };
        }
        console.log(fullobj);
        const putRequest = new Request();
        putRequest
          .put(TOKEN, url, cardId, fullobj)
          .then((response) => response.json())
          .then((obj) => {
            let {
              lastName,
              name,
              surname,
              doctor,
              age,
              diseases,
              index,
              data,
              press,
              goal,
              description,
              ugency,
            } = obj;
            nameClient.textContent = `${lastName} ${name} ${surname}`;
            doctorStatus.textContent = `Доктор: ${getDoctor(doctor)}`;
            let listGroup = document.querySelector(".list-group");
            if (listGroup === null) {
              showMoreBtn.addEventListener("click", () => {
                let listGroups = document.querySelectorAll(".list-group");
                listGroups.forEach((el) => {
                  el.remove();
                });

                let carder3 = new Card();
                carder3.clickOnShowMore(
                  showMoreBtn,
                  card,
                  doctor,
                  age,
                  diseases,
                  index,
                  press,
                  data,
                  goal,
                  description,
                  ugency,
                  dataLastVisit
                );
              });
            } else {
              let listGroups = document.querySelectorAll(".list-group");
              listGroups.forEach((el) => {
                el.remove();
              });
              
              let carder2 = new Card();
              carder2.clickOnShowMore(
                btn,
                card,
                doctor,
                age,
                diseases,
                index,
                press,
                data,
                goal,
                description,
                ugency, 
                dataLastVisit
              );
              btn.style.display = "flex";
            }
          });
          let oldModal = document.getElementById("window-edit");
  if (oldModal !== null) {
    oldModal.remove();
  }
      });
    });
  }

  clickOnShowMore(
    btn,
    element,
    doctor,
    age,
    diseases,
    index,
    press,
    data,
    goal,
    description,
    ugency,
    dataLastVisit
  ) {
    let info = document.createElement("div");
    if (doctor === "dentist") {
      info.innerHTML = `<ul class="list-group list-group-flush">
      ${getClientInfo(data, goal, ugency, description)}
      <li class="list-group-item">Дата последнего визита: ${dataLastVisit}</li>
      </ul>`;
    } else if (doctor === "cardiologist") {
      info.innerHTML = `<ul class="list-group list-group-flush">
      ${getClientInfo(data, goal, ugency, description)}
      <li class="list-group-item">Возраст: ${age}</li>
      <li class="list-group-item">ИМТ: ${index}</li>
      <li class="list-group-item">Заболевания: ${diseases}</li>
      <li class="list-group-item">Давление: ${press}</li>
      </ul>
      `;
    } else {
      info.innerHTML = `<ul class="list-group list-group-flush">
      ${getClientInfo(data, goal, ugency, description)}
      <li class="list-group-item">Возраст: ${age}</li>
      </ul>`;
    }

    element.append(info);
    btn.style.display = "none";
    return info;
  }
}

//функция для создания доп-инфо в карточке
function getClientInfo(data, goal, ugency, description) {
  return `<li class="list-group-item">Дата визита: ${data}</li>
    <li class="list-group-item">Цель визита: ${goal}</li>
    <li class="list-group-item">Срочность визита: ${getUrgency(ugency)}</li>
    <li class="list-group-item">Описание визита: ${description}</li>`;
}

// функция для корректного отображения доктора в карточке.
function getDoctor(doctor) {
  if (doctor === "dentist") {
    return "Стоматолог";
  } else if (doctor === "cardiologist") {
    return "Кардиолог";
  } else {
    return "Терапевт";
  }
}

// функция для корректного отображения срочности в карточке.
function getUrgency(ugency) {
  if (ugency === "1") {
    return "Обычная";
  } else if (ugency === "2") {
    return "Приоритетная";
  } else {
    return "Неотложная";
  }
}

function fieldInEditCard(mod, doctor, age, press, index, diseases, dataLastVisit){
        if(showValueInInput(doctor, ".visit-doctor") === "cardiologist"){
        const cardiologist3 = new VisitCardiologist();
        let newWindow = mod.changeModal(cardiologist3.renderCardiologist());
        showValueInInput(press, ".press");
        showValueInInput(age, ".age");
        showValueInInput(index, ".index");
        showValueInInput(diseases, ".diseases");
        return newWindow;

      } else if(showValueInInput(doctor, ".visit-doctor") === "dentist"){
        let dentist4 = new VisitDentist();
        let newWindow = mod.changeModal(dentist4.renderDentist());
       showValueInInput(dataLastVisit, ".last-visit");
       console.log(showValueInInput(dataLastVisit, ".last-visit"));
        return newWindow;
      } else{
        let therapist3 = new VisitTherapist();
        let newWindow = mod.changeModal(therapist3.renderTherapist());
        showValueInInput(age, ".age");
        return newWindow;
      }
}

function showValueInInput(prop, classes){
  let current = document.querySelectorAll(classes);
  let arrofCurrent = Array.from(current);
  let lastCurrent = arrofCurrent.at(-1);
  lastCurrent.value = prop;
  return lastCurrent.value;
}

//ищу значение в инпуте при редактировании карты
function getLastValue(classes) {
  let current = document.querySelectorAll(classes);
  let arrofCurrent = Array.from(current);
  let lastCurrent = arrofCurrent.at(-1);
  lastCurrent.addEventListener("change", (e) => {
    lastCurrent = e.target.value;
    console.log(lastCurrent);
  });
  return lastCurrent;
}

const carder = new Card();


//Статус визита
let statusSelectElement = document.getElementById("statusSelectForm");
statusSelectElement.addEventListener("change", async (e) => {
    //нахожу все элементы фильтров и сбрасываю их в исходное состояние
    const search = document.getElementById('search-input');
    search.value = "";
    const urgencyFilter = document.getElementById('urgencySelectForm');
    urgencyFilter.value = 'Выберите срочность';
  let filter = new Filter();
  let request = new Request();
  let cardsAll;
  try {
    cardsAll = await request.getAll(url, TOKEN);
  } catch (error) {
    console.log("Ошибка получения данных с сервера " + error.message);
    return;
  }
//  проверяю есть ли данные на сервере. Если нет прерываю выполнение
  if (cardsAll === undefined || cardsAll.length === 0) {
    console.log("массив карт пуст");
    return;
  }
  let cardsFiltered = filter.filterByStatus(e.target.value, cardsAll);

  clearCards();
  let cardClass = new Card();
  cardsFiltered.forEach((card) => {
    cardClass.renderCard(card);
  });
});

//срочность визита
let prioritetSelectElement = document.getElementById("urgencySelectForm");
prioritetSelectElement.addEventListener("change", async (e) => {
    //нахожу все элементы фильтров и сбрасываю их в исходное состояние
    const search = document.getElementById('search-input');
    search.value = "";
    const statusFilter = document.getElementById('statusSelectForm');
    statusFilter.value = 'Выберите статус';
    
  let filter = new Filter();
  let request = new Request();
  let cardsAll;
  try {
    cardsAll = await request.getAll(url, TOKEN);
  } catch (error) {
    console.log("Ошибка получения данных с сервера " + error.message);
    return;
  }
  // проверяю есть ли данные на сервере. Если нет прерываю выполнение
  if (cardsAll === undefined || cardsAll.length === 0) {
    console.log("массив карт пуст");
    return;
  }
  let cardsFiltered = filter.filterByUrgency(e.target.value, cardsAll);


  clearCards();
  let cardClass = new Card();
  cardsFiltered.forEach((card) => {
    cardClass.renderCard(card);
  });
});

//Поиск по заголовку и телу описания визита
let searchElement = document.getElementById("search-button");
searchElement.addEventListener("click", async () => {
  let searchInput = document.getElementById("search-input");
   // нахожу все элементы фильтров и сбрасываю их в исходное состояние
    const urgencyFilter = document.getElementById('urgencySelectForm');
    urgencyFilter.value = 'Выберите срочность';
    const statusFilter = document.getElementById('statusSelectForm');
    statusFilter.value = 'Выберите статус';
  let filter = new Filter();
  let request = new Request();
  let cardsAll;
  try {
    cardsAll = await request.getAll(url, TOKEN);
  } catch (error) {
    console.log("Ошибка получения данных с сервера " + error.message);
    return;
  }
  // проверяю есть ли данные на сервере. Если нет прерываю выполнение
  if (cardsAll === undefined || cardsAll.length === 0) {
    console.log("массив карт пуст");
    return;
  }
  let cardsFiltered = filter.filterByNameLastname(
    searchInput.value,
    cardsAll
  );
  clearCards();
  let cardClass = new Card();
  cardsFiltered.forEach((card) => {
    cardClass.renderCard(card);
  });
});

// Функция, которая будет очищать поле с карточкапи перед перерисовкой
function clearCards() {
  let cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.remove();
  });
}

//кнопка сброса вильтров
const resetFiltersButton = document.getElementById('reset-filters-button');
resetFiltersButton.addEventListener('click',async ()=>{
  //нахожу все элементы фильтров и сбрасываю их в исходное состояние
  const search = document.getElementById('search-input');
  search.value = "";
  const urgencyFilter = document.getElementById('urgencySelectForm');
  urgencyFilter.value = 'Выберите срочность';
  const statusFilter = document.getElementById('statusSelectForm');
  statusFilter.value = 'Выберите статус';
  //очищаю поле с карточками
  clearCards();
  //запрашиваю все карты
  let request = new Request();
  let cardsAll;
  try {
    cardsAll = await request.getAll(url, TOKEN);
  } catch (error) {
    console.log("Ошибка получения данных с сервера " + error.message);
    return;
  }
  // проверяю есть ли данные на сервере. Если нет прерываю выполнение
  if (cardsAll === undefined || cardsAll.length === 0) {
    console.log("массив карт пуст");
    document.querySelector(".main__text").style.display = 'block';
    return;
  }
  let cardClass = new Card();
  cardsAll.forEach((card) => {
    cardClass.renderCard(card);
  });
})

//функция проверяет есть ли карточки и выводит или прячет надпись No items have been added
function noItemsShowHide(){
  let cards = document.getElementsByClassName('card')
  let text = document.getElementById('no-items');
  if (cards.length > 0){
    text.style.display = 'none'
  }
  else{
    text.style.display = 'block'
  }
}
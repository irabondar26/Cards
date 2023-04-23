/** @format */

import Modal from "./modules/Modal.js";
import Forms from "./modules/Forms.js";
import { contentCheckAndDelete, clearCards } from "./modules/handlers.js";
import { Visit, VisitCardiologist, VisitDentist, VisitTherapist } from "./modules/Visits.js";
import Card from "./modules/Cards.js";
import Authorization from "./modules/Authorization.js";
import Request from "./modules/Request.js";
import Filter from "./modules/Filter.js";
import { url } from "./modules/constants.js";



let TOKEN;

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

const modal = new Modal("window", "save");
const form = new Forms();
document.body.append(
  modal.render("Авторизация", form.formLogin(), "Закрыть", "Войти")
);


const btnSave = document.getElementById("save");
const mail = document.getElementById("email");
const pass = document.getElementById("pass");
export const createVisitBtn = document.getElementById("create-visit-btn");

export const cardContainer = document.querySelector(".cards-wrapper");


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

 export default TOKEN ;


const visit = new Visit();
export let counter = 0;
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
    try{
      const newRequest = new Request();
      newRequest
      .post(url, cardObj, TOKEN)
      .then((response) => response.json())
      .then((data) => carder.renderCard(data));    

    }catch(err){
      console.log(err.message);
    }
  });
});

export const carder = new Card();


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
import TOKEN from "../app.js";
import Card from "./Cards.js";
import { url } from "./constants.js";
import Request from "./Request.js";
import { VisitDentist, VisitCardiologist, VisitTherapist, Visit } from "./Visits.js";


  function contentCheckAndDelete(el) {
    if (el) {
      el.remove();
    }
  }

  function getClientInfo(data, goal, ugency, description) {
    return `<li class="list-group-item">Дата визита: ${data}</li>
      <li class="list-group-item">Цель визита: ${goal}</li>
      <li class="list-group-item">Срочность визита: ${getUrgency(ugency)}</li>
      <li class="list-group-item">Описание визита: ${description}</li>`;
  }

  function getDoctor(doctor) {
    if (doctor === "dentist") {
      return "Стоматолог";
    } else if (doctor === "cardiologist") {
      return "Кардиолог";
    } else {
      return "Терапевт";
    }
  }

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

  function clearCards() {
    let cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.remove();
    });
  }

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

export { contentCheckAndDelete, getClientInfo, getDoctor, fieldInEditCard, getLastValue, showValueInInput, clearCards, noItemsShowHide };
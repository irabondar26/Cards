import Request from "./Request.js";
import TOKEN, { cardContainer, carder, counter} from "../app.js";
import { url } from "./constants.js";
import { getDoctor, getClientInfo, showValueInInput, fieldInEditCard, getLastValue, noItemsShowHide } from "./handlers.js";
import Modal from "./Modal.js";
import { Visit, VisitCardiologist, VisitDentist, VisitTherapist } from "./Visits.js";

let counter1 = 0;

export default class Card {
    renderCard(promise) {
      const { lastName,name,surname,doctor,age,diseases,index,data,press,goal,description,ugency,id,dataLastVisit } = promise;
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
        carder.clickOnShowMore(showMoreBtn,card,doctor,age,diseases,index,press,data,goal,description,ugency, dataLastVisit);
      });
      let delBtn = document.getElementById(`del-${counter}`);
      let editBtn = document.getElementById(`edit-${counter}`);
      let doctorName = document.querySelector(".card-title");
      let nameClient = document.getElementById(`name-${counter}`);
      carder.deleteCard(delBtn, card, id); 
      carder.editCard( editBtn, doctorName, id, card, nameClient, showMoreBtn, lastName,name,surname,doctor,age,diseases,index,data,press,goal,description,ugency,dataLastVisit );
      document.getElementById('no-items').style.display = 'none' //TODO прячу надпись no items...
      return card;
    }
  
    deleteCard(btn, element, cardId) {
      btn.addEventListener("click", () => {
        try{
          const requestDelete = new Request();
          requestDelete.delete(TOKEN, url, cardId).then((response) => {
          if (response.status === 200) {
            element.remove();
            noItemsShowHide(); // TODO если удалить последнюю карточку появится надпись no items...
          } else {
            console.log(new Error("Что-то пошло не так!"));
          }
        });
        } catch (e){
             console.error(e.message)
        }
      });
    }
  
    editCard(btn, doctorStatus, cardId, card, nameClient, showMoreBtn,lastName,name,surname,doctor,age,diseases,index,data,press,goal,description, ugency, dataLastVisit) {
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
                dataLastVisit
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
        console.log(dataLastVisit);
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
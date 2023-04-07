const URL = "https://ajax.test-danit.com/api/v2/cards";
const TOKEN = "787ace58-d17b-420f-b75b-29ee789e9496";

const entry = document.getElementById("entry");
entry.addEventListener("click", (e) => {
    e.preventDefault();
    modal.openModal();

})


class Modal{
    constructor(id){
        this.id = id;
    }

    render(header = "", body, close = "", save = ""){  // метод который делает модалку общую для всех форм. при вызове метода render в парметр body добавляем нужную форму.

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
        btnSave.id = "save-btn"
        this.div1.append(div2);
        div2.append(div3);
        div3.append(div4, div5, div6);
        div4.append(title, btn);
        div5.append(content);
        div6.append(btnClose, btnSave);
        btn.addEventListener("click", this.closeModal.bind(this))
        return this.div1;
    }

    openModal(){
        this.div1.style.display = "block";
    }

    closeModal(){
        this.div1.style.display = "none";
    }

}

//данный класс создает форму авторизации
class Forms {
   
    formLogin(){
        const form = document.createElement("div");
        form.id = "login-form";
        form.classList = "row g-3 align-items-center form-items"

        form.innerHTML = `
        <div class="mb-3">
         <label for="exampleFormControlInput1" class="form-label">Email address</label>
            <input type="email" id="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
        </div>
        <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">Password</label>
        <input type="password" id="pass" class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="******">
        </div>`;
        return form;
    }    
}



//данный класс описывает общую форму для визитов
class Visit{
    constructor(goal, doctor, description, urgency, fullName){
        this.goal = goal;
        this.doctor = doctor;
        this.description = description;
        this.urgency = urgency;
        this.fullName = fullName;
    }
    render(){
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
        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">`

        let name = document.createElement("div");
        name.classList = "input-group";
        name.innerHTML = `
        <span class="input-group-text">${this.fullName}</span>
        <input type="text" aria-label="Last name" class="form-control" placeholder="Фамилия">
        <input type="text" aria-label="First name" class="form-control" placeholder="Имя">
        <input type="text" aria-label="Father name" class="form-control" placeholder="Отчество">
        `

        let wrap = document.createElement("div");
        wrap.append(doctor, urgency, goal, description, name)
        return wrap;
    }
}

//класс VisitDentist и т.д. нужно доделать. 
class VisitDentist extends Visit{
    
        renderDentist(){
            let dataLastVisit = document.createElement("div");
            dataLastVisit.classList = "input-group";
            dataLastVisit.innerHTML = `
            <span class="input-group-text">Дата последнего визита</span>
            <input type="text" aria-label="Last name" class="form-control" placeholder="Фамилия">
            <input type="text" aria-label="First name" class="form-control" placeholder="Имя">
            <input type="text" aria-label="Father name" class="form-control" placeholder="Отчество">
            `
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
  async getAll(url, token){    // это запрос на получение всех карточек с сервера
  let request = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
let response = await request.json();
    return response;  
    
   } 
}


const modal = new Modal("window");
const form = new Forms();
document.body.append(modal.render("Авторизация", form.formLogin(), "Закрыть", "Сохранить")); // вставила окошко авторизации

//некоторые глобальные переменные, которые нужны для проверки пароля и логина
const btnSave = document.getElementById("save-btn");
const mail = document.getElementById("email");
const pass = document.getElementById("pass");
const createVisitBtn = document.getElementById("create-visit-btn");

//при клике на єту кнопку проверяю пароль и вывожу на стену карточки. 
btnSave.addEventListener("click", (e)=> {
    e.preventDefault();
    if(mail.value !== "familyClinic@gmail.com" || pass.value !== "123456"){
        alert("Логин или пароль неверный");
        mail.value = "";
        pass.value = "";
    } else {
        modal.closeModal();
        entry.style.display = "none";
        createVisitBtn.style.display = "block";
        try{
        const request = new Request();
        request.getAll(URL, TOKEN)
        .then(response => {
            let noVisitText = document.querySelector(".no-visit-text");
            if(response.length === 0){
                noVisitText.style.display = "block";
            } else {
                noVisitText.style.display = "block";
                noVisitText.textContent = "Здесь когда-то будут карточки"; // вот здесь запустить метод вывода карточек на стену. 
            }
        });
    } catch(e){
        console.log(e.message);
    }
    }
})

const visit = new Visit("Цель визита", "Выберите врача", "Краткое описание", "Выберите срочность", "ФИО клиента" )

//при клике на эту кнопку выводится модальное окно для создания визита.
createVisitBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    const modal2 = new Modal("window-1");
    document.body.append(modal2.render("Создать визит", visit.render(), "Закрыть", "Сохранить"));
    modal2.openModal(); 
})





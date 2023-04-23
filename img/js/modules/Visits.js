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

  export {Visit, VisitDentist, VisitCardiologist, VisitTherapist};
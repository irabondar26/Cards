export default class Modal {
    constructor(id, idSaveBtn, idCloseBtn="") {
      this.id = id;
      this.idSaveBtn = idSaveBtn;
      this.idCloseBtn = idCloseBtn;
    }
  
    render(header = "", body="", close = "", save = "") {
  
      // метод который делает модалку общую для всех форм. при вызове метода render в парметр body добавляем нужную форму.
     
   this.div1 = createElement("form", "modal modal-backdrop", this.id, "", "", "");
   this.div1.tabIndex = "-1";
   let div2 = createElement("div", "modal-dialog", "", "", "");
   let div3 = createElement("div", "modal-content", "", "", "");
   let div4 = createElement("div", "modal-header", "", "", "");
   let title = createElement("h5", "modal-title", "", header, "");
   const btn = createElement("button", "btn-close", "", "", "button");
   btn.setAttribute("data-bs-dismiss", "modal");
   btn.setAttribute("aria-label", "Close");
   const div5 = createElement("div", "modal-body", "", "", "");
   let content = createElement("p", "", "", "", "", "");
   content.insertAdjacentElement("beforeend", body);
   const div6 = createElement("div", "modal-footer", "", "");
   let btnClose = createElement("button", "btn btn-secondary", this.idCloseBtn, close, "button");
   btnClose.setAttribute("data-bs-dismiss", "modal");
   btnClose.addEventListener("click", this.closeModal.bind(this));
   let btnSave = createElement("input", "btn btn-primary", this.idSaveBtn, save, "submit");
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

  //функция для создания элемента
function createElement(tag, classes, id, text, type){
    let elem = document.createElement(tag);
    elem.classList = classes;
    if(id !== ""){
      elem.id = id;
    }
    if(text !== ""){
      elem.textContent = text;
    }
    if(type !== ""){
      elem.type = type;
    }
    return elem;
  }
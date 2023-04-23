export default class Forms {
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
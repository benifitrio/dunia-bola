export default function signup() {
  const Content = document.getElementById('Content');
  Content.innerHTML = `
    <div class="col s12 m6 l6 offset-m3 offset-l3">
        <form action="">
            <div class="card">
                <div class="card-action green">
                    <h5 class="center">Register</h5>
                </div>
                <div class="card-content">
                    <div class="input-field">
                        <i class="material-icons prefix">account_circle</i>
                        <input type="text" id="username">
                        <label for="username">Your name</label>
                    </div>
                    <div class="input-field">
                        <i class="material-icons prefix">email</i>
                        <input type="email" id="email">
                        <label for="email">Enter Your Email</label>
                    </div>
                    <div class="input-field">
                        <i class="material-icons prefix">lock</i>
                        <input type="password" id="pass">
                        <label for="pass">Enter your password</label>
                    </div>
                    <div class="input-field">
                        <i class="material-icons prefix">vpn_key</i>
                        <input type="password" id="con_pass">
                        <label for="con_pass">Confirm your password</label>
                    </div>
                    <input type="submit" class="btn" value="register now " style="width: 100%;">
                </div>
            </div>
          </form>
        </div>`;
}

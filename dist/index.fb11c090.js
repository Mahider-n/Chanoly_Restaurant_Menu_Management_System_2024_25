var e={};class t{static{this.TOKEN_KEY="auth_token"}static setToken(e){localStorage.setItem(this.TOKEN_KEY,e)}static getToken(){return localStorage.getItem(this.TOKEN_KEY)}static removeToken(){localStorage.removeItem(this.TOKEN_KEY)}static isAuthenticated(){return!!this.getToken()}}class i{static renderAuthForm(){document.getElementById("auth-container").innerHTML=`
            <div class="auth-forms">
                <div class="form-group">
                    <h2>Login</h2>
                    <form id="login-form">
                        <div class="form-group">
                            <label for="login-email">Email:</label>
                            <input type="email" id="login-email" required>
                        </div>
                        <div class="form-group">
                            <label for="login-password">Password:</label>
                            <input type="password" id="login-password" required>
                        </div>
                        <button type="submit" class="btn">Login</button>
                    </form>
                </div>
                
                <div class="form-group">
                    <h2>Signup</h2>
                    <form id="signup-form">
                        <div class="form-group">
                            <label for="signup-email">Email:</label>
                            <input type="email" id="signup-email" required>
                        </div>
                        <div class="form-group">
                            <label for="signup-password">Password:</label>
                            <input type="password" id="signup-password" required>
                        </div>
                        <button type="submit" class="btn">Signup</button>
                    </form>
                </div>
            </div>
        `}static renderMenu(e){document.getElementById("menu-container").innerHTML=`
            <h2>Restaurant Menu</h2>
            <button id="logout-btn" class="btn">Logout</button>
            <div class="menu-list">
                ${e.map(e=>`
                    <div class="menu-item">
                        <h3>${e.name}</h3>
                        <p>${e.description}</p>
                        <p>Price: $${e.price}</p>
                    </div>
                `).join("")}
            </div>
        `}static showAuthContainer(){document.getElementById("auth-container").classList.remove("hidden"),document.getElementById("menu-container").classList.add("hidden")}static showMenuContainer(){document.getElementById("auth-container").classList.add("hidden"),document.getElementById("menu-container").classList.remove("hidden")}}new class{constructor(){this.initialize()}initialize(){t.isAuthenticated()?this.loadMenu():this.loadAuth(),this.setupEventListeners()}async loadMenu(){try{let n=t.getToken(),a=await (0,e.api).getMenu(n);i.renderMenu(a),i.showMenuContainer()}catch(e){console.error("Failed to load menu:",e),t.removeToken(),this.loadAuth()}}loadAuth(){i.renderAuthForm(),i.showAuthContainer()}setupEventListeners(){document.addEventListener("submit",async e=>{e.preventDefault();let t=e.target;"login-form"===t.id?await this.handleLogin(t):"signup-form"===t.id&&await this.handleSignup(t)}),document.addEventListener("click",e=>{"logout-btn"===e.target.id&&this.handleLogout()})}async handleLogin(i){let n=i.querySelector("#login-email").value,a=i.querySelector("#login-password").value;try{let{token:i}=await (0,e.api).login(n,a);t.setToken(i),this.loadMenu()}catch(e){console.error("Login failed:",e),alert("Login failed. Please try again.")}}async handleSignup(i){let n=i.querySelector("#signup-email").value,a=i.querySelector("#signup-password").value;try{let{token:i}=await (0,e.api).signup(n,a);t.setToken(i),this.loadMenu()}catch(e){console.error("Signup failed:",e),alert("Signup failed. Please try again.")}}handleLogout(){t.removeToken(),this.loadAuth()}};
//# sourceMappingURL=index.fb11c090.js.map

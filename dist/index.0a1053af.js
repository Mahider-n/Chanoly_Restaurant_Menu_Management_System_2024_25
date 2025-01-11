const e="http://localhost:3000",t={async login(t,i){let n=await fetch(`${e}/auth/login`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},credentials:"include",body:JSON.stringify({email:t,password:i})});if(!n.ok)throw Error("Login failed");return n.json()},async signup(t,i){let n=await fetch(`${e}/auth/register`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},credentials:"include",body:JSON.stringify({email:t,password:i})});if(!n.ok)throw Error("Signup failed");return n.json()},async getMenu(t){let i=await fetch(`${e}/menu`,{headers:{Authorization:`Bearer ${t}`,Accept:"application/json"},credentials:"include"});if(!i.ok)throw Error("Failed to fetch menu");return i.json()}};class i{static{this.TOKEN_KEY="auth_token"}static setToken(e){localStorage.setItem(this.TOKEN_KEY,e)}static getToken(){return localStorage.getItem(this.TOKEN_KEY)}static removeToken(){localStorage.removeItem(this.TOKEN_KEY)}static isAuthenticated(){return!!this.getToken()}}class n{static renderAuthForm(){document.getElementById("auth-container").innerHTML=`
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
        `}static showAuthContainer(){document.getElementById("auth-container").classList.remove("hidden"),document.getElementById("menu-container").classList.add("hidden")}static showMenuContainer(){document.getElementById("auth-container").classList.add("hidden"),document.getElementById("menu-container").classList.remove("hidden")}}new class{constructor(){this.initialize()}initialize(){i.isAuthenticated()?this.loadMenu():this.loadAuth(),this.setupEventListeners()}async loadMenu(){try{let e=i.getToken(),o=await t.getMenu(e);n.renderMenu(o),n.showMenuContainer()}catch(e){console.error("Failed to load menu:",e),i.removeToken(),this.loadAuth()}}loadAuth(){n.renderAuthForm(),n.showAuthContainer()}setupEventListeners(){document.addEventListener("submit",async e=>{e.preventDefault();let t=e.target;"login-form"===t.id?await this.handleLogin(t):"signup-form"===t.id&&await this.handleSignup(t)}),document.addEventListener("click",e=>{"logout-btn"===e.target.id&&this.handleLogout()})}async handleLogin(e){let n=e.querySelector("#login-email").value,o=e.querySelector("#login-password").value;try{let{token:e}=await t.login(n,o);i.setToken(e),this.loadMenu()}catch(e){console.error("Login failed:",e),alert("Login failed. Please try again.")}}async handleSignup(e){let n=e.querySelector("#signup-email").value,o=e.querySelector("#signup-password").value;try{let{token:e}=await t.signup(n,o);i.setToken(e),this.loadMenu()}catch(e){console.error("Signup failed:",e),alert("Signup failed. Please try again.")}}handleLogout(){i.removeToken(),this.loadAuth()}};
//# sourceMappingURL=index.0a1053af.js.map

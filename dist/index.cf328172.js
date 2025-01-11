const e="http://localhost:3000",t={async login(t,o){console.log("Attempting login with:",{email:t});let n=await fetch(`${e}/auth/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:o})});if(!n.ok)throw console.error("Login response not OK:",n.status,n.statusText),Error("Login failed");let i=await n.json();return console.log("Login successful, received token:",i),i},async signup(t,o,n){console.log("Attempting signup with:",{name:t,email:o});let i=await fetch(`${e}/auth/signup`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,email:o,password:n})});if(!i.ok)throw console.error("Signup response not OK:",i.status,i.statusText),Error("Signup failed");let a=await i.json();return console.log("Signup successful, received token:",a),a},async getMenu(t){console.log("Fetching menu with token:",t);let o=await fetch(`${e}/menu`,{method:"GET",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(!o.ok){console.error("Menu fetch failed:",o.status,o.statusText);let e=await o.text();throw console.error("Error details:",e),Error(e||"Failed to fetch menu")}let n=await o.json();return console.log("Menu data received:",n),n.data}};class o{static{this.TOKEN_KEY="auth_token"}static setToken(e){console.log("Setting token in localStorage:",e),localStorage.setItem(this.TOKEN_KEY,e)}static getToken(){let e=localStorage.getItem(this.TOKEN_KEY);return console.log("Retrieved token from localStorage:",e),e}static removeToken(){console.log("Removing token from localStorage"),localStorage.removeItem(this.TOKEN_KEY)}static isAuthenticated(){let e=this.getToken();if(console.log("Checking authentication, token exists:",!!e),!e)return!1;try{let t=JSON.parse(atob(e.split(".")[1])),o=1e3*t.exp,n=o>Date.now();return console.log("Token validation:",{expires:new Date(o),now:new Date,isValid:n}),n}catch(e){return console.error("Token validation error:",e),!1}}}class n{static renderAuthForm(){document.getElementById("auth-container").innerHTML=`
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
                            <label for="signup-name">Name:</label>
                            <input type="text" id="signup-name" required>
                        </div>
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
        `}static renderMenu(e){let t=document.getElementById("menu-container");console.log("Rendering ---------------menu items:",e),t.innerHTML=`
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
        `}static showAuthContainer(){document.getElementById("auth-container").classList.remove("hidden"),document.getElementById("menu-container").classList.add("hidden")}static showMenuContainer(){document.getElementById("auth-container").classList.add("hidden"),document.getElementById("menu-container").classList.remove("hidden")}}new class{constructor(){this.initialize()}initialize(){o.isAuthenticated()?this.loadMenu():this.loadAuth(),this.setupEventListeners()}async loadMenu(){try{let e=o.getToken(),i=await t.getMenu(e);n.renderMenu(i),n.showMenuContainer()}catch(e){console.error("Failed to load menu:",e),o.removeToken(),this.loadAuth()}}loadAuth(){n.renderAuthForm(),n.showAuthContainer()}setupEventListeners(){document.addEventListener("submit",async e=>{e.preventDefault();let t=e.target;"login-form"===t.id?await this.handleLogin(t):"signup-form"===t.id&&await this.handleSignup(t)}),document.addEventListener("click",e=>{"logout-btn"===e.target.id&&this.handleLogout()})}async handleLogin(e){let n=e.querySelector("#login-email").value,i=e.querySelector("#login-password").value;try{let{access_token:e}=await t.login(n,i);o.setToken(e),this.loadMenu()}catch(e){console.error("Login failed:",e),alert("Login failed. Please try again.")}}async handleSignup(e){let n=e.querySelector("#signup-name").value,i=e.querySelector("#signup-email").value,a=e.querySelector("#signup-password").value;try{let{access_token:e}=await t.signup(n,i,a);o.setToken(e),this.loadMenu()}catch(e){console.error("Signup failed:",e),alert("Signup failed. Please try again.")}}handleLogout(){o.removeToken(),this.loadAuth()}};
//# sourceMappingURL=index.cf328172.js.map

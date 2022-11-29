const container = document.getElementById('container');

const currentUrl = window.location.pathname;

const domain = "http://127.0.0.1:1323/";

if( currentUrl === "/" ) {
    account()

} else if( currentUrl === "/auth" ) {
    if(localStorage.token && localStorage.token != "") {
        window.location = "/"
    } else {
        auth_form()
    }
} else if( currentUrl === "/registration" ) {
    if(localStorage.token && localStorage.token != "") {
        window.location = "/"
    } else {
        reg_form()
    }
    

} else if( currentUrl === "/logout") {
    delete localStorage.token
    window.location = "/auth"

}

async function account() {
    let response = await fetch(domain+"user/name", {
        headers: {
          'Authorization' : 'Bearer ' + localStorage.token,
        },
        
    });
    if( response.ok ) {
        let result = await response.text();
        container.insertAdjacentHTML('afterend', `
            <a href="/logout">Logout</a>
            <p> Username: `+result+`</p>
        `);
    } else {
        window.location = "/auth"
    }

    
}

async function auth() {
    let user = {
        name: document.forms.auth.elements.name.value,
        password: document.forms.auth.elements.password.value
    };

    let response = await fetch(domain+"auth", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          

        },
        body: JSON.stringify(user)
    });
    if( response.ok ) {
        let result = await response.json();
        if(result.code === 0) {
            localStorage.token = result.token
            window.location = "/"
        } else {
            const error = document.getElementById("error")
            error.innerHTML = errorMessage(result.code)
        }
    } else {
        const error = document.getElementById("error")
        error.innerHTML = errorMessage("Server error")
    }
    
    
}

async function reg() {
    
    let user = {
        name: document.forms.reg.elements.name.value,
        password: document.forms.reg.elements.password.value
    };

    let response = await fetch(domain+"registration", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user)
    });
    if( response.ok ) {
        
        let result = await response.json();
        if(result.code === 0) {
            window.location = "/auth"
        } else {
            const error = document.getElementById("error")
            error.innerHTML = errorMessage(result.code)
        }
    } else {
        const error = document.getElementById("error")
        error.innerHTML = errorMessage("Server error")
    }
    
    
}



function auth_form() {
    container.insertAdjacentHTML('afterend', `
        <form name="auth">
            <h3>Sign in</h3>

            <label for="name">Name</label>
            <input id="name" type="text" name="name" ><br/>

            <label for="password">Password</label>
            <input id="password" type="password" name="password" ><br/>

            <input type="button" value="Sign in" name="authbtn">
            <div id="error" style = "color:red;"></div>

            <br/>
            <a href="/registration">Sign up</a>
        </form> 
    `);
    document.forms.auth.elements.authbtn.onclick=auth;
}



function reg_form() {
    container.insertAdjacentHTML('afterend', `
        <form name="reg">
            <h3>Sign up</h3>

            <label for="name">Name</label>
            <input id="name" type="text" name="name" ><br/>

            <label for="password">Password</label>
            <input id="password" type="password" name="password" ><br/>

            <input type="button" value="Sign up" name="regbtn">
            <div id="error" style = "color:red;"></div>

            <br/>
            <a href="/auth">Sign in</a>
        </form> 
    `);
    document.forms.reg.elements.regbtn.onclick=reg;
}



function errorMessage(code) {
    switch(code) {
        case 1: 
            return "The name can contain only numbers (1-9), letters (a-z,A-Z) and _"
        case 2:
            return "Name length must be >= 6 and <= 50"
        case 3:
            return "Name length must be >= 6 and <= 50"
        case 4:
            return "The name can contain only numbers (1-9), letters (a-z,A-Z) and _&?!@#$%^+=*"
        case 5:
            return "Password length must be >= 6 and <= 50"
        case 6:
            return "Password length must be >= 6 and <= 50"
        case 7:
            return "User registration error"
        case 8:
            return "Wrong name or password"
        case 9:
            return "Name already exists"
        case 10:
            return "Wrong name or password"
        default:
            return "Error"
    }
}













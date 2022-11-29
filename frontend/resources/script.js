const container = document.getElementById('container');

const currentUrl = window.location.pathname;

const domain = "http://127.0.0.1:1323/";

if( currentUrl === "/" ) {



    window.location = "/auth";
} else if( currentUrl === "/auth" ) {
    auth_form()
} else if( currentUrl === "/registration" ) {
    reg_form()

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
        //let result = await response.json();
    } else {

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
        //let result = await response.json();
    } else {

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
            <div style = "color:red;"></div>
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
            <div style = "color:red;"></div>
        </form> 
    `);
    document.forms.reg.elements.regbtn.onclick=reg;
}













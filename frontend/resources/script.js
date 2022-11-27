const container = document.getElementById('container');

const currentUrl = window.location.pathname;

const domain = "/";

if( currentUrl === "/" ) {



    window.location = "/auth";
} else if( currentUrl === "/auth" ) {
    auth_form()
} else if( currentUrl === "/registration" ) {

}







async function auth() {
    
    const user = {
        login: document.forms.auth.elements.login.value,
        password: document.forms.auth.elements.password.value,
    };

    let response = await fetch(domain, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
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

            <label for="login">Name</label>
            <input id="login" type="text" name="login"><br/>

            <label for="password">Password</label>
            <input id="password" type="password" name="password"><br/>

            <input type="button" value="Sign in" name="authbtn">
            <div style = "color:red;"></dic>
        </form> 
    `);
    document.forms.auth.elements.authbtn.onclick=auth;
}













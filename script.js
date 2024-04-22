// Dark Mode & Light Mode
    // Getting Dark Mode & Light Mode Button
    var darkBtn = document.getElementById('btnDarkMode');
    var lightBtn = document.getElementById('btnLightMode');
    var body = document.body;

    // Adding Event Listener
    darkBtn.addEventListener('click', () => {
        body.classList.remove('lightMode');
        body.classList.add('darkMode');
        document.body.style.backgroundColor = '';
    });

    lightBtn.addEventListener('click', () => {
        body.classList.remove('darkMode');
        body.classList.add('lightMode');
        document.body.style.backgroundColor = '';
        
    });

// Change backround color based on Color Picker
    // Getting Color Value
    var colorSelect = document.getElementById('color');

    // Adding Event Listner
    colorSelect.addEventListener('change', () => {
        document.body.style.backgroundColor = colorSelect.value;
    });

// Game
    // Getting Play Game Button
    var playGameBtn = document.getElementById('btnPlayGame');
    var score = document.getElementById('currentScore');
    var highScore = document.getElementById('highScore');

    // Adding Event Listener
    playGameBtn.addEventListener('click', () => {
        var calculateScore = Math.floor(Math.random() * 500);
        score.textContent = calculateScore;
            if (calculateScore > highScore.textContent) {
                highScore.textContent = calculateScore;
            }
    });

// Reset
    // Getting Values
    var form = document.getElementById('form');
    var resetScore = document.getElementById('currentScore');
    var resetHighScore = document.getElementById('highScore');
    var resetColorPicker = document.getElementById('color');
    var resetBtn = document.getElementById('btnReset');

    // Adding Event Listener
    resetBtn.addEventListener('click', () => {

        // Reset Values
        form.reset();
        resetScore.textContent = 0;
        resetHighScore.textContent = 0;
        resetColorPicker.value = '';
        document.body.style.backgroundColor = "#FFF";
        Name.style.border = "solid 2px black";
        Password.style.border = "solid 2px black";

        // Reset Cookies
        document.cookie = `Username=; expires=Thu, 01 Jan 1969 00:00:00 UTC; path=/`;
        document.cookie = `Password=; expires=Thu, 01 Jan 1969 00:00:00 UTC; path=/`;
        document.cookie = `Color=; expires=Thu, 01 Jan 1969 00:00:00 UTC; path=/`;
        localStorage.removeItem('fontsize');
        localStorage.removeItem('language');
        document.cookie = `Score=; expires=Thu, 01 Jan 1969 00:00:00 UTC; path=/`;
    });
    
// Form Submit
    // Getting Values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var color = document.getElementById('color').value;
    var scoreRm = document.getElementById('highScore').textContent;
    var rememberCheck = document.getElementById('rememberCheck');
    var loginBtn = document.getElementById('btnLogin');

    // Adding Event Listener
    loginBtn.addEventListener('click', () => {
            validateInputs();
    });


// Cookies & Local Storage
    // getCookie function
    function getCookie(name, password, color, scoreRm) {
        const cookies = document.cookie.split('; ');
        for (let cookie of cookies) {
            const [ cookieName, cookieValue ] = cookie.split('=');
            if (cookieName === name || cookieName === password || cookieName === color ||  cookieName == scoreRm) {
                return cookieValue;
            }
        }
    }

    // setCookie function
    function setCookie(name, password, color, scoreRm) {
        document.cookie = "Username=" + name + ";";
        document.cookie = "Password=" + password + ";";
        document.cookie = "Color=" + color + ";";
        document.cookie = "Score=" + scoreRm + ";";
    }

    // Font Size Event Listener
    document.getElementById('fontsize').addEventListener('change', (event) => {
        var fSize = event.target.value;
        localStorage.setItem('fontsize', fSize);
        document.body.style.fontSize = fSize;
    });

    // Language Event Listener
    document.getElementById('language').addEventListener('change', (event) => {
        var lng = event.target.value;
        localStorage.setItem('language', lng);
    });

    // Font & Language Local Storage
    var savedLang = localStorage.getItem('language');
    var savedFontSize = localStorage.getItem('fontsize');

    if (savedLang) {
        document.getElementById('language').value = savedLang;
    }

    if (savedFontSize) {
        document.getElementById('fontsize').value = savedFontSize;
    }


// Form Load
    // Load
    window.onload = function() {

    // Cookies
    let cookieUsername = getCookie('Username');
    let cookiePassword = getCookie('Password');
    let cookieHighScore = getCookie('Score');
    let cookieColor = getCookie('Color');
    let cookieFontSize = document.getElementById('fontsize').value;

    // Setting values 
    if (cookieUsername) {
        document.getElementById('username').value = cookieUsername;
    }

    if (cookiePassword) {
        document.getElementById('password').value = cookiePassword;
    }

    if (cookieHighScore) {
        document.getElementById('highScore').textContent = cookieHighScore;
    }

    if (cookieColor) {
        document.body.style.backgroundColor = cookieColor;
    }

    document.body.style.fontSize = cookieFontSize;
}

// Validation
    // Variables
    let Name = document.getElementById('username');
    let Password = document.getElementById('password');
    let Score = document.getElementById('highScore');
    let Color = document.getElementById('color');
    let Remember = document.getElementById('rememberCheck');

    // Methods
    const setError = (element, message) =>{
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');
        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    }

    const setSuccess = element => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');
        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    } 

    const isPasswordValid = password => {
        const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;
        return passwordRegex.test(password);
    }

    const validateInputs = () => {
        const nameValue = Name.value.trim();
        const passwordValue = Password.value.trim();
        const scoreValue = Score.textContent;
        const colorValue = Color.value;
        var counter = 0;

        if (nameValue === '') {
            setError(Name, 'A name is required');
            Name.style.border = "solid 2px red";
        } else {
            setSuccess(Name);
            Name.style.border = "solid 2px green";
            counter++;
        }

        if (passwordValue === '') {
            setError(Password, "A password is required");
            Password.style.border = "solid 2px red";
        } else if (!isPasswordValid(passwordValue)) {
            setError(Password, "The password must have at least 6 characters, an upper case character, a number and a special character.");
            Password.style.border = "solid 2px red";
        } else {
            setSuccess(Password);
            Password.style.border = "solid 2px green";
            counter++;
        }

        if (counter = 2 && Remember.checked) {
            setCookie(nameValue, passwordValue, colorValue, scoreValue);
        }
    }

// Popup
    const cookieBox = document.querySelector(".wrapper"),
        buttons = document.querySelectorAll(".button"),
        formLoad = document.getElementById('form');

    const executeCodes = () => {
    //if cookie contains coding it will be returned and below of this code will not run
    if (document.cookie.includes("LaSalle_Coding")) return;
        cookieBox.classList.add("show");
        buttons.forEach((button) => {
        button.addEventListener("click", () => {
        cookieBox.classList.remove("show");
        //if button has acceptBtn id
        if (button.id == "acceptBtn") {
        //set cookies for 1 month. 60 = 1 min, 60 = 1 hours, 24 = 1 day, 30 = 30 days
        document.cookie = "cookieBy= LaSalle_Coding; max-age=" + 60 * 60 * 24 * 30;
        }
        });
    });
    };

    //executeCodes function will be called on webpage load
    window.addEventListener("load", executeCodes);

// Toggle Visibility on Password
    // Variables
    var passwordVisible = document.getElementById('password');
    var toggleVisibility = document.getElementById('ToggleVisibility');

    toggleVisibility.addEventListener('change', function() {
        if(toggleVisibility.checked){
            passwordVisible.type = 'text';
        }
        else{
            passwordVisible.type = 'password';   
        }
    });
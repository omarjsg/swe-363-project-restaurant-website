function show_hide_nav() {
    const navbarLinks = document.getElementsByClassName("navbar-links")[0]
    navbarLinks.classList.toggle("active")

}

function add_to_cart(type, cost) {
    const value = document.querySelector(".cart-value")
    const cv = parseInt(value.textContent)
    value.textContent = String(cv + 1)


    const desc = document.querySelector("#meal-discription");
    const sandwish = document.createElement("p");
    sandwish.innerText = type;

    const price = document.querySelector("#meal-price");
    const pValue = document.createElement("p");
    pValue.innerText = `${cost} SAR`


    desc.appendChild(sandwish);
    price.appendChild(pValue);

    const total = document.querySelector("#total-price");
    total.innerText = `${(parseFloat(total.innerText) + parseFloat(cost)).toFixed(1)} SAR`;

}

function increment(){
    const amount = document.querySelector("#index-value")
    cv = parseInt(amount.innerText)
    amount.innerText = (cv+1)
    //const cv = parseInt(amount.textContent)
    //amount.value = String(amount+1)
    // <i--><input type="button" class="btn-amount count-btn" id="index-value" name="count" value="1" ><-->

}

function decrement(){
    const amount = document.querySelector("#index-value")
    cv = parseInt(amount.innerText)
    if(cv > 1){
        amount.innerText = (cv-1)
    }
    
}

function detail_add_to_cart(){
    const Cvalue = document.querySelector(".cart-value")
    const Avalue = document.querySelector("#index-value")
    const amount = parseInt(Cvalue.textContent)+ parseInt(Avalue.innerText)
    Cvalue.textContent = String(amount)
    const cost = "23.9";
    let i = 0;
    for (; i < amount; i++){
        const desc = document.querySelector("#meal-discription");
        const sandwish = document.createElement("p");
        sandwish.innerText = "Best sandwish";
        const price = document.querySelector("#meal-price");
        const pValue = document.createElement("p");
        pValue.innerText = `${cost} SAR`;
        desc.appendChild(sandwish);
        price.appendChild(pValue);
    }

    const total = document.querySelector("#total-price");
    total.innerText = `${(parseFloat(cost) * i.toFixed(1))} SAR` 
}

function add_review() { 
    const show = document.getElementById("1123");
    show.classList.add("show");
    show.classList.remove("transitioned2");
    show.classList.remove("transitioned1");
}

function change_name(text){
    const name = document.getElementById("actual-name")
    text.innerText = name.innerText
}

function submit_con(){
    const textArea = document.getElementById("message");

    if (textArea.value.length == 0) { 
        const alert = document.getElementById("0_chara");
        alert.style.display = "block";
        return false; // dont allow submit
    } 
    else {
        
        const customerName = document.getElementById('actual-name');

        if (customerName.value == "") {
            customerName.value = "Customer"; // auto fills with the word customer if the name is empty

           window.location.href = window.location.href; // saves the name in the url
           return true; // allow submit

        }
    }
}

function increase_count(){
    const counter = document.getElementById("review_counter");
    const string_length = document.getElementById("message").value.length;
    console.log(string_length)
    counter.innerText = String(string_length) + " / 500";
    if (string_length != 0) {
        const alert = document.getElementById("0_chara");
        alert.style.display = "none";
    }


}

function displayDesc(){
    const desc = document.querySelector("#facts");
    const rev  = document.querySelector("#review");


    desc.classList.remove("hidden");
    rev.classList.add("hidden");


    const descLink = document.querySelector("#desc-link");
    const revLink = document.querySelector("#rev-link");

   
    descLink.classList.add("active");
    revLink.classList.remove("active");

    
    
    // document.queryselect("#desc-button").classList.add("disabled");
    // document.queryselect("#rev-buttion").classList.add("disabled");
    
}

function displayRev(){
    const desc = document.querySelector("#facts");
    const rev  = document.querySelector("#review");
    

    desc.classList.add("hidden");
    rev.classList.remove("hidden");


    const descLink = document.querySelector("#desc-link");
    const revLink = document.querySelector("#rev-link");


    descLink.classList.remove("active");
    revLink.classList.add("active");
}

function order(){
    const value = document.querySelector(".cart-value")
    const desc = document.querySelector("#meal-discription");
    const price = document.querySelector("#meal-price");
    const total = document.querySelector("#total-price");

    while(desc.firstChild){
        desc.removeChild(desc.firstChild)
    }

    while(price.firstChild){
        price.removeChild(price.firstChild)
    }

    total.innerText = "0.0 SAR";

    value.innerText = '0';
}

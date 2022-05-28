let cartValue = document.querySelector(".cart-value")
let mealDesc = document.querySelector("#meal-discription");
let mealPrice = document.querySelector("#meal-price");
let totalPrice = document.querySelector("#total-price");
var mealAmount = document.querySelector("#meal-counter");
let showForm = document.getElementById("add-review-form");
let reviewerName = document.getElementById("actual-name");
let reviewerNameText = document.getElementById("name");
let textArea = document.getElementById("message");
let alerter = document.getElementById("0_chara");
let reviewCounter = document.getElementById("review_counter");
let desc = document.querySelector("#facts");
let rev = document.querySelector("#review");
let descLink = document.querySelector("#desc-link");
let revLink = document.querySelector("#rev-link");
let mealCounter = 0;
let btnIncrement = document.querySelector("#plus");
let btnDecrement = document.querySelector("#minus");
let btnAddtoCartDetail = document.querySelector("#add-to-cart-detail");
let btnAddtoCatHome = document.getElementsByClassName(".add-to-cart-home");
let btnReview = document.querySelector("#rev-button");
let btnOrder = document.querySelector("#final-order");
let reviewCarosel = document.querySelector('.reviews-carosel');

btnIncrement.addEventListener("click", () => {
    mealAmount.value = ++mealCounter;
});

btnDecrement.addEventListener("click", () => {
    if (mealCounter > 1) {
        mealAmount.value = --mealCounter;
    }
});

btnAddtoCartDetail.addEventListener("click", () => {
    cartValue.innerHTML = mealAmount.innerText;
});

btnReview.addEventListener("click", () => {
    showForm.classList.add("show");
    showForm.classList.remove("transitioned2");
    showForm.classList.remove("transitioned1");
});

textArea.addEventListener('input', () => {
    var wordCount = textArea.value.length;
    reviewCounter.innerHTML = wordCount + "/500";
    if (wordCount != 0) {
        alerter.style.display = "none";
    }
});

showForm.addEventListener('submit', function (event) {
    if (textArea.value.length == 0) {
        alerter.style.display = "block";
        return false; // dont allow submit
    }
    else {
        if (reviewerName.value == "") {
            reviewerName.value = "Customer"; // auto fills with the word customer if the name is empty
            window.location.href = window.location.href; // saves the name in the url
        }
    }
    event.preventDefault()
    var data = this;
    fetch(data.getAttribute('action'), {
        method: data.getAttribute('method'),
        body: new FormData(data)
    }).then(res => res.json())
        .then(function (data) {
            buildRev(data)
        });
    showForm.classList.add("transitioned1");
    setTimeout(() => {
        showForm.classList.add('transitioned2')
    }, 1000);
    showForm.reset()
});

descLink.addEventListener('click', () => {
    desc.classList.remove("hidden");
    rev.classList.add("hidden");
    descLink.classList.add("active");
    revLink.classList.remove("active");
});

revLink.addEventListener('click', () => {
    let path = window.location.pathname;
    let page = path.split("/").pop();
    ShowRev(page)
    desc.classList.add("hidden");
    rev.classList.remove("hidden");
    descLink.classList.remove("active");
    revLink.classList.add("active");

});

textArea.addEventListener('keyup', () => {
    let wordCount = textArea.value.length;
    reviewCounter.innerHTML = wordCount + "/500";
    if (wordCount != 0) {
        alerter.style.display = "none";
    }
});

btnOrder.addEventListener('click', () => {
    while (mealDesc.firstChild) {
        mealDesc.removeChild(mealDesc.firstChild)
    }
    while (mealPrice.firstChild) {
        mealPrice.removeChild(mealPrice.firstChild)
    }
    totalPrice.innerText = "0.0 SAR";
    cartValue.innerText = '0';
});

ShowRev = async (id) => {
    const response = await fetch(`/detail/${id}/reviews`)
    const reviews = await response.json();
    await buildRev(reviews);
    if (response.ok) {
        console.log(reviews)
    }
}

buildRev = async (reviews) => {
    reviewCarosel.innerHTML = '';
    if (reviews.length == 0) {
        reviewCarosel.innerHTML = '<p class="d-flex justify-content-center">No Reviews - be the first to write a review</h1>';
    } else {
        let caroselContainer = document.createElement('div');
        caroselContainer.setAttribute('id', 'test-cara');
        caroselContainer.setAttribute('data-bs-ride', 'carousel');
        caroselContainer.classList.add('carousel', 'slide', 'd-flex', 'justify-content-center')
        reviewCarosel.appendChild(caroselContainer);
        let caroselIndicators = document.createElement('div');
        caroselContainer.appendChild(caroselIndicators);
        caroselIndicators.classList.add('carousel-indicators');
        for (let i = 0; i < reviews.length; i++) {
            let caroselIndecator = document.createElement('button');
            if (i == 0) {
                caroselIndecator.classList.add('active')
            }
            caroselIndecator.setAttribute('type', 'button');
            caroselIndecator.setAttribute('data-bs-target', '#test-cara');
            caroselIndecator.setAttribute('data-bs-slide-to', `${i}`);
            caroselIndecator.setAttribute('aria-label', `Slide ${i}`);
            caroselIndecator.setAttribute('aria-current', 'true');
            caroselIndecator.classList.add('not-active')
            caroselIndicators.appendChild(caroselIndecator);
        }
        let caroselInner = document.createElement('div');
        caroselContainer.appendChild(caroselInner);
        caroselInner.classList.add('carousel-inner')
        for (let item = 0; item < reviews.length; item++) {
            let caroselItem = document.createElement('div');
            caroselItem.classList.add('container-fluid', 'carousel-item');
            caroselInner.appendChild(caroselItem);
            if (item == 0) {
                caroselItem.classList.add('active')
            }
            let caroselInfoBox = document.createElement('div')
            caroselInfoBox.classList.add('top-testimonial', 'row', 'row-cols-1', 'row-cols-lg-2', 'gap-3', 'gap-lg-0');
            caroselItem.appendChild(caroselInfoBox);
            let caroselImage = document.createElement('img');
            caroselImage.setAttribute('src', `/reviewImages/${reviews[item].image}`);
            caroselImage.setAttribute('alt', 'review image')
            caroselInfoBox.appendChild(caroselImage);
            caroselImage.classList.add('img-fluid', 'col', 'san-img');
            let caroselTextBox = document.createElement('div');
            caroselInfoBox.appendChild(caroselTextBox);
            caroselTextBox.classList.add('top-testimonial-item-2', 'd-lg-flex', 'flex-column', 'justify-content-center', 'col');
            let reviewerName = document.createElement('h4');
            reviewerName.innerText = `${reviews[item].reviewer_name}`;
            caroselTextBox.appendChild(reviewerName);
            let reviewDetails = document.createElement('h4');
            let stars = '';
            for (let star = 0; star < reviews[item].rating; star++) {
                stars += '⭐'
            }
            reviewDetails.innerText = `${reviews[item].city} - ${reviews[item].date} ${stars}`;
            caroselTextBox.appendChild(reviewDetails);
            let reviewMessage = document.createElement('p');
            reviewMessage.innerText += `${reviews[item].review}`;
            caroselTextBox.appendChild(reviewMessage);
        }
        let prevButton = document.createElement('button');
        prevButton.setAttribute('type', 'button');
        prevButton.setAttribute('data-bs-target', '#test-cara');
        prevButton.setAttribute('data-bs-slide', 'prev');
        prevButton.classList.add('carousel-control-prev')
        caroselContainer.appendChild(prevButton);
        let prevButtonIcon = document.createElement('span');
        prevButtonIcon.setAttribute('aria-hidden', 'true')
        prevButtonIcon.classList.add('carousel-control-prev-icon')
        prevButton.appendChild(prevButtonIcon);
        let prevButtonLabel = document.createElement('span');
        prevButton.appendChild(prevButtonLabel);
        prevButtonLabel.classList.add('visually-hidden')
        prevButtonLabel.innerText = "Previous";
        let nextButton = document.createElement('button');
        nextButton.setAttribute('type', 'button');
        nextButton.setAttribute('data-bs-target', '#test-cara');
        nextButton.setAttribute('data-bs-slide', 'next');
        nextButton.classList.add('carousel-control-next')
        caroselContainer.appendChild(nextButton);
        let nextButtonIcon = document.createElement('span');
        caroselContainer.appendChild(prevButton);
        nextButtonIcon.setAttribute('aria-hidden', 'true')
        nextButtonIcon.classList.add('carousel-control-next-icon');
        let nextButtonLabel = document.createElement('span');
        caroselContainer.appendChild(prevButton);
        nextButtonLabel.classList.add('visually-hidden')
        nextButtonLabel.innerText = "Next";
    }

}
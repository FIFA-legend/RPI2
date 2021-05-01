//Стартовые значения
let slideIndex = 1;

//Получение данных из локального хранилища
slideIndex = localStorage.getItem("slideIndexStorage");

//Обработка событий клавиатуры
document.addEventListener('keydown', function (e) {
    switch (e.key) {
        case "ArrowLeft":  //Стрелка влево
            previousSlide()
            break;
        case "ArrowRight":  //Стрелка вправо
            nextSlide()
            break;
        case "Escape":      //Escape
            let pane = document.querySelector(".pane");
            pane.remove();
            break;
    }
});

showSlides(slideIndex);

//Функция показа слайда под номером n
function showSlides(n) {
    const slides = document.getElementsByClassName("slide_message");
    const dots = document.getElementsByClassName("slider_dot_selected");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    localStorage.setItem("slideIndexStorage", slideIndex);
}


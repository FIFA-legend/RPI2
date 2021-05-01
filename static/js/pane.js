//Массив с текстом слайдов
let messages = [ "Первый игрок, выигравший 'Золотой мяч' 4 года подряд",
                "Месси забил 91 гол в 2012 году - такого результата еще никто никогда не достигал.",
                "В течение первых 48 секунд пребывания на поле Месси получил красную карточку за удар локтем.",
                "В 2019 году в шестой раз получил «Золотой мяч», установив рекорд по их количеству у одного игрока",
                "Победитель Лиги чемпионов (4): 2005/06, 2008/09, 2010/11, 2014/15" ];

//Счетчик точек на панели
let counter = 1;
//Флаг для появления окна
let flag = 1;

if (localStorage.hasOwnProperty("flag")) {
    flag = Number(localStorage.getItem("flag"));
} else {
    localStorage.setItem("flag", String(1));
}

//Запуск создания окна
if (flag) {
    init();
}

//Функция инициализации всех элементов окна
function createPane() {
    let divPane = document.createElement("div");
    divPane.className = "pane";

    let divSlider = document.createElement("div");
    divSlider.className = "slider";

    let divSliderDots = document.createElement("div");
    divSliderDots.className = "slider_panel";

    let divCheckBox = document.createElement("div");
    divCheckBox.className = "disable_checkbox";
    divCheckBox.innerHTML = "<input type=\"checkbox\"> <span>Disable Tips</span>";

    let buttonRemove = document.createElement("button");
    buttonRemove.className = "close_button";
    buttonRemove.innerHTML = "x";

    let divPanel = document.createElement("div");
    divPanel.className = "slider_dots";

    divPane.appendChild(buttonRemove)
    divPane.appendChild(divSlider)
    divPane.appendChild(divSliderDots);

    divSliderDots.appendChild(divCheckBox);
    divSliderDots.appendChild(divPanel);

    addContent(divSlider, divPanel);

    document.body.prepend(divPane)
}

//Функция для добавления текста из массива на слайды
function addContent(divSlider, divPanel) {
    let aLeftArrow = document.createElement("a");
    aLeftArrow.className = "previous";
    aLeftArrow.addEventListener("click", previousSlide);
    aLeftArrow.innerHTML = "&#10094;";
    divPanel.appendChild(aLeftArrow);

    for (let i = 0; i < messages.length; i++) {
        addSlide(messages[i], divSlider, divPanel);
    }

    let aRightArrow = document.createElement("a");
    aRightArrow.className = "next";
    aRightArrow.addEventListener("click", nextSlide);
    aRightArrow.innerHTML = "&#10095;";
    divPanel.appendChild(aRightArrow)
}

//Функция добавления слайда
function addSlide(sliderText, divSlider, divPanel) {
    let newDiv = document.createElement("div");
    newDiv.className = "slide_message";

    let newDivText = document.createElement("div");
    newDivText.className = "slideText";
    newDivText.innerHTML = sliderText;

    divSlider.appendChild(newDiv);
    newDiv.appendChild(newDivText);

    addButton(divPanel)
}

//Функция для добавления точки на панель
function addButton(divPanel) {
    let spanButton = document.createElement("span");
    spanButton.className = "slider_dot_selected";
    let str = "currentSlide(" + counter + ")";
    spanButton.setAttribute("onclick", str);
    divPanel.appendChild(spanButton);
    counter++;
}

//Функция создания окна спустя 500мс после загрузки страницы
function init() {
    setTimeout(function () {

        createPane();

        let removeButton = document.querySelector("button");
        removeButton.addEventListener("click", () => {
            let pane = document.querySelector(".pane");
            pane.remove();
        })

        let checkBox = document.querySelector("input")
        checkBox.addEventListener("change", () => {
            if (checkBox.checked) {
                localStorage.setItem("flag", String(0))
            } else {
                localStorage.setItem("flag", String(1))
            }
        })

        include("static/js/slider.js")

    }, 500);
}

//Переход на следующий слайд
function nextSlide() {
    showSlides(slideIndex += 1);
}

//Переход на предыдущий слайд
function previousSlide() {
    showSlides(slideIndex -= 1);
}

//Переход на n-ый слайд
function currentSlide(n) {
    showSlides(slideIndex = n);
}

//Подключение скриптов
function include(path) {
    let script = document.createElement("script");
    script.src = path;
    document.getElementsByTagName('head')[0].appendChild(script);
}
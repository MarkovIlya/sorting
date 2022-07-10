const flex_row_0 = document.getElementById('flex-row-0');

const flex_row_1 = document.getElementById('flex-row-1');

const buttonSort = document.getElementById('sort-button');

const buttonCreate = document.getElementById('create-button');

const buttonRetry = document.getElementById('retry-button');

const countElem = document.getElementById('count-elem');

const top_text = document.getElementById('top_text');

const service_text = document.getElementById('service_text');

class MyArray{
    constructor(array){
        this.array = array;
    }

    bubbleSort(arr) {
        let endIndex = arr.length - 1;
        startInterval();
        // Запускает сортировку
        function startInterval() {
            let intervalCount = 0,
                interval = setInterval(function () {
    
                    swapNearbyElements(intervalCount);
    
                    intervalCount++;
                    if (intervalCount >= endIndex) {
                        displaySummary(interval);
                    }
    
    
                }, 2000);
        }
        // Определяет когда нужно остановить сортировку
        function displaySummary(interval) {
            clearInterval(interval);
    
            if (endIndex > 0) {
                startInterval();
            }
            endIndex--;
            if (endIndex < 0) {
                service_text.innerHTML = 'Конец сортировки';
                buttonCreate.hidden = false;
                buttonRetry.hidden = false;
            }
        }
        // Меняет местами два соседних элемента
        function swapNearbyElements(index) {
    
            const first = flex_row_1.querySelector(`[data-index = "${index}"]`);
            const second = flex_row_1.querySelector(`[data-index = "${index + 1}"]`);
    
            if (endIndex > 0) {
    
                if (arr[index] > arr[index + 1]) {
    
                    // Это нужно для замены местами элементов и для проигрывания анимации
                    second.after(first);
                    second.remove();
                    first.before(second);
    
                    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    
                    first.dataset.index = index + 1;
                    second.dataset.index = index;
    
    
                }
            }
    
        }
    }

}


// Возвращает рандомное значение в диапозоне от min до max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Возвращает массив с рандомными значениями (по-умолчанию от 1 до 10 включительно)
function createArrayWithRandomValues(n = 10) {
    let arr = [];
    for (let i = 0; i < n; i++) {
        arr[i] = getRandomInt(1, n);
    }
    return arr;
}
// Отображает массив в выбранном контейнере
function showArray(arr, container) {
    const newElem = document.createElement('div');
    newElem.classList.add('elem');

    for (let i = 0; i < arr.length; i++) {
        let cloneNode = newElem.cloneNode(true);
        cloneNode.innerHTML = arr[i];
        cloneNode.dataset.index = i;
        container.appendChild(cloneNode);
    }
}
// Убирает массив из контейнера 
function unshowArray(container) {

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

let arr = createArrayWithRandomValues();

let myarr = {};

showArray(arr, flex_row_0);

let arrCopy = [];

// Обработчик нажатия кнопки сортировки массива
buttonSort.addEventListener('click', function (e) {

    buttonSort.hidden = true;
    arrCopy = arr.slice();
    myarr = new MyArray(arrCopy);
    showArray(arrCopy, flex_row_1);
    myarr.bubbleSort(arrCopy);
    service_text.innerHTML = 'Идёт процесс сортировки';

});

// Обработчик нажатия кнопки создания массива
buttonCreate.addEventListener('click', function (e) {

    buttonCreate.hidden = true;
    buttonRetry.hidden = true;
    service_text.innerHTML = 'Чтобы отсортировать массив, нажмите соответствующую кнопку';

    unshowArray(flex_row_0);
    unshowArray(flex_row_1);
    arr = createArrayWithRandomValues();
    showArray(arr, flex_row_0);
    arrCopy = [];
    myarr = {};
    buttonSort.hidden = false;


});

// Обработчик нажатия кнопки повторной сортировки массива
buttonRetry.addEventListener('click', function (e) {

    unshowArray(flex_row_1);
    arrCopy = arr.slice();
    myarr = new MyArray(arrCopy);
    showArray(arrCopy, flex_row_1);
    myarr.bubbleSort(arrCopy);
    service_text.innerHTML = 'Идёт процесс сортировки';
    buttonCreate.hidden = true;
    buttonRetry.hidden = true;

});
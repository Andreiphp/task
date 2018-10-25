class Filter {
    constructor() {
        this.result = document.getElementById('list_result');
        this.input_info = document.getElementById('info');
        this.checkBox = document.getElementById('checkBox');
        this.form = document.getElementById('myForm');
        this.preloader = document.getElementById('loader');
        this.preloader.style.display = 'flex';
        this.errorProp = document.getElementById('error');
        this.arrayInfo = null;
        this.flag = false;
        this.getJson().then(result => {
            return result.json();
        }).then(res => {
            this.preloader.style.display = 'none';
            this.arrayInfo = res.data;
        });
        this.clickBtn();
    }


    getJson() {
        const url = "http://localhost:3000/filter";
        return fetch(url)
    }

    clickBtn() {
        this.form.addEventListener('click', function (e) {
            switch (e.target.id) {
                case 'length':
                    this.clear();
                    this.clearError();
                    this.FilterWord();
                    break;
                case 'padstr':
                    this.clear();
                    this.clearError();
                    this.filterPadString();
                    break;
                case 'checkBox':
                    this.flag = e.target.checked;
                    break;
            }
        }.bind(this));
    }

    FilterWord() {
        let value = Number(this.input_info.value);
        let newArray = null;
        if (value > 0 && !isNaN(value)) {
            newArray = this.arrayInfo.filter(function (el) {
                return el.length > value;
            });
            this.CreateResult(newArray);
        } else {
            this.error('length');
        }

    }

    filterPadString() {
        let newArr = null;
        let string = this.input_info.value;
        if (string !== '') {
            if (!this.flag) {
                let upperString = string.toUpperCase();
                newArr = this.arrayInfo.filter(function (el) {
                    if (~el.toUpperCase().indexOf(upperString)) {
                        return el;
                    }
                });
            } else {
                newArr = this.arrayInfo.filter(function (el) {
                    if (~el.indexOf(string)) {
                        return el;
                    }
                });
            }

            this.CreateResult(newArr);
        } else {
            this.error('padString');
        }
    }

    CreateResult(newArray) {
        let fragment = document.createDocumentFragment();
        if (newArray.length > 0) {
            newArray.forEach(function (el) {
                let li = document.createElement('li');
                li.textContent = el;
                li.classList.add('drop-target');
                fragment.appendChild(li);
            });

            this.result.appendChild(fragment);
        } else {
            this.emptyResult();
        }


    }

    emptyResult() {
        let empty = document.createElement('li');
        empty.textContent = 'нет результатов';
        this.result.appendChild(empty);
    }

    clear() {
        this.result.textContent = '';
    }

    clearError() {
        this.errorProp.style.display = 'none';
    }

    error(error) {
        let error_text = this.errorProp.children[0];
        if (error === 'length') {
            error_text.textContent = 'Введите число > 0';
            this.errorProp.style.display = 'block';
        }
        if (error === 'padString') {
            error_text.textContent = 'Введите строку';
            this.errorProp.style.display = 'block';
        }
    }

}

let filter = new Filter();

class Drop {
    constructor() {
        this.result = document.getElementById('list_result');
        this.curentTarget = {};
        this.pageX = null;
        this.pageY = null;
        this.sortStart();
        this.g = 0;
        this.direction = false;
    }

    createClone() {
        let parentImg = this.curentTarget.element.getBoundingClientRect();
        let clone = this.curentTarget.element.cloneNode(true);
        clone.style.transform = "translate3d(" + (parentImg.left + window.scrollX) + 'px,' + (parentImg.top + window.scrollY) + 'px,' + 500 + 'px' + ")";
        return clone;
    }

    startDrag({element, clone}) {
        let parentImg = element.getBoundingClientRect();
        clone.classList.remove('drop-target');
        clone.classList.add('clone');
        clone.style.width = parentImg.width + 'px';
        clone.style.height = parentImg.height + 'px';
        document.body.insertBefore(clone, document.body.firstChild);

    }

    getCoordinates({top, left}) {
        return {
            top: top + pageYOffset,
            left: left + pageXOffset
        };
    }

    sortStart() {
        document.addEventListener('mousedown', function (event) {
            if (event.target.classList.contains('drop-target')) {
                this.curentTarget.element = event.target;
                this.curentTarget.downX = event.pageX;
                this.curentTarget.downY = event.pageY;
            }
        }.bind(this));

        document.addEventListener('mousemove', function (event) {

            if (!this.curentTarget.element) {
                return;
            }

            if (!this.curentTarget.clone) {
                let moveX = event.pageX - this.curentTarget.downX;
                let moveY = event.pageY - this.curentTarget.downY;
                if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
                    return false;
                }
                this.curentTarget.clone = this.createClone();

                this.startDrag(this.curentTarget);
                let coordinates = this.getCoordinates(this.curentTarget.clone.getBoundingClientRect());
                this.curentTarget.shiftX = this.curentTarget.downX - coordinates.left;
                this.curentTarget.shiftY = this.curentTarget.downY - coordinates.top;
            }

            this.curentTarget.clone.style.transform = "translate3d(" + (event.pageX - this.curentTarget.shiftX) + 'px,' + (event.pageY - this.curentTarget.shiftY) + 'px,' + 20 + 'px' + ")";

            if (event.pageY < this.g) {
                this.direction = true;
            } else {
                this.direction = false;
            }
            this.g = event.pageY;
            return false;

        }.bind(this));

        document.addEventListener('mouseup', function (event) {
            if (!this.curentTarget.clone) {
                this.curentTarget = {};
                return false;
            } else {
                let target = event.target;
                if (target && target !== this.curentTarget.element && target.nodeName === 'LI' && target !== this.curentTarget.clone) {
                    if (this.result.children[0] === target) {
                        this.result.insertBefore(this.curentTarget.element, this.result.firstChild);
                    } else {
                        if (this.direction) {
                            this.result.insertBefore(this.curentTarget.element, target);
                        } else {
                            this.result.insertBefore(this.curentTarget.element, target.nextSibling);
                        }

                    }
                }
                this.curentTarget.clone.remove();
                this.curentTarget = {};
            }
        }.bind(this));
    }
}

let f = new Drop();


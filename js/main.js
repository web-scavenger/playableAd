var playedApp = {
    opt: {
        scaleElemArr: ['logo', 'score__bar', 'machine', 'spin__btn', 'ch_pirate__block', 'attack_rays', 'cannon', 'island',],
        charHintPirate: document.getElementById('ch_pirate__block'),
        charHintOverlay: document.getElementById('ch_overlay'),
        barrelBtn: document.getElementById('barrel__btn'),
        wheel: document.getElementById('wheel'),
        blickIntervalId: null,
        screenScale: null,
        stepNumber: 0,
        userScore: 4500000,
        attackBtnsInterval: null
    },
    initElements: function () {
        var self = this;
        this.opt.barrelBtn.addEventListener('click', this.spinWheel.bind(this))
        var attk_btn = document.getElementsByClassName('attack_btn');
        for (var i = 0; i < attk_btn.length; i++) {
            attk_btn[i].addEventListener('click', function (event) {
                self.attack(this)
            })
        }
    },
    spinWheel: function () {
        clearInterval(this.opt.blickIntervalId);
        var btnClickAnim = anime({
            targets: '#barrel__btn',
            translateY: 10,
            delay: 50,
            duration: 100,
            direction: 'alternate',
            easing: 'easeInOutQuad'
        });
        this.chPirateHide();
        switch (this.opt.stepNumber) {
            case 0:
                this.setGlos('spins_10');
                this.rotateWheel(1152);
                break;
            case 1:
                this.setGlos('spins_5');
                this.rotateWheel(0);
                break;
            case 2:
                this.setGlos('spins_empty');
                break;
        }
        // this.opt.stepNumber++;
    },
    chPirateShow: function () {
        var self = this;
        var animeArr = [
            {
                targets: '#ch_pirate__block',
                left: '55%',
                delay: 100,
                easing: 'easeInOutQuad'
            },
            {
                targets: '#ch_overlay',
                opacity: '1',
                delay: 100,
                easing: 'easeInOutQuad'
            },
            {
                targets: '#spin__btn',
                bottom: '0',
                delay: 100,
                easing: 'easeInOutQuad'
            }
        ]
        animeArr.forEach(function (element) {
            anime(element)
        })
        setTimeout(function () {
            self.btnBlick();
        }, 900)
    },
    chPirateHide: function () {
        var self = this;
        var delay = 250, easing = 'easeOutExpo';
        var animeArr = [
            {
                targets: '#ch_overlay',
                opacity: '0',
                delay: delay,
                easing: easing
            },
            {
                targets: '#spin__btn',
                bottom: '-50%',
                delay: delay,
                easing: easing
            }
        ]
        animeArr.forEach(function (element) {
            anime(element)
        })
        setTimeout(function () {
            self.opt.charHintPirate.style.left = '155%'
        }, 200)
    },
    winAttackMessage: function () {
        var obj = [{
            name: 'winAttack_overlay',
            value: '0.57',
            property: 'opacity',
            delay: 0
        },
        {
            name: 'attack_rays',
            value: '1',
            property: 'opacity',
            delay: 100
        },
        {
            name: 'attack_gun',
            value: '1',
            property: 'opacity',
            delay: 100
        },
        {
            name: 'attack_txt',
            value: 'scale(1)',
            property: 'transform',
            delay: 200
        },
        {
            name: 'attack_gun',
            value: 'rotate(-360deg)',
            property: 'transform',
            delay: 700
        },
        {
            name: 'winAttack_overlay',
            value: '0',
            property: 'opacity',
            delay: 1400
        },
        {
            name: 'attack_rays',
            value: '0',
            property: 'opacity',
            delay: 1400
        },
        {
            name: 'machine',
            value: '-50%',
            property: 'left',
            delay: 1600
        },
        {
            name: 'cannon',
            value: '-4%',
            property: 'bottom',
            delay: 1900
        },
        {
            name: 'island',
            value: '50%',
            property: 'left',
            delay: 1800
        }
        ]
        obj.forEach(function (element) {
            setTimeout(function () {
                document.getElementById(element.name).style[element.property] = element.value;
            }, element.delay)
        })
        this.canonFire();
        this.animateAttackBtns();
    },
    setGlos: function (className) {
        setTimeout(function () {
            document.getElementById('glos').removeAttribute("class");
            document.getElementById('glos').classList.add(className)
        }, 600)
    },
    rotateWheel: function (rotate) {
        var self = this;
        setTimeout(function () {
            self.opt.wheel.style.transform = 'rotate(' + rotate + 'deg)'
        }, 900)
        setTimeout(function () {
            switch (self.opt.stepNumber) {
                case 0:
                    self.setScore(9500000)
                    setTimeout(function () {
                        self.chPirateShow()
                    }, 2000)
                    break;
                case 1:
                    self.winAttackMessage()
                    break;
                case 2:
                    break;
            }
            self.opt.stepNumber++;
        }, 3500)


    },
    setScore: function (score) {
        var self = this;
        // score bar scaling and blinking
        console.log(self.opt.screenScale.scale)
        anime({
            targets: '#score__bar',
            scale: [{
                value: self.opt.screenScale.scale,
                duration: 0
            }, {
                value: 1.04 * self.opt.screenScale.scale,
                duration: 600,
                easing: "easeInOutQuad"
            }, {
                value: self.opt.screenScale.scale,
                duration: 600,
                easing: "easeInOutQuad"
            }],
            filter: [{
                value: "brightness(1)",
                duration: 0
            }, {
                value: "brightness(1.4)",
                duration: 6,
                easing: "easeInOutQuad"
            }, {
                value: "brightness(1)",
                duration: 600,
                easing: "easeInOutQuad"
            }],
            loop: 2,
        });
        // coint counter
        var obj = { charged: this.opt.userScore };
        anime({
            targets: obj,
            charged: score,
            round: 1,
            duration: 1600,
            easing: 'linear',
            update: function () {
                var el = document.querySelector('#score__bar span');
                var count = JSON.stringify(obj.charged);
                var formatCount = numberWithCommas(count)
                el.innerHTML = formatCount;
            }

        });
        function numberWithCommas(x) {
            var parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        }
        this.opt.userScore = score


    },

    btnBlick: function (turn) {
        var self = this;
        this.opt.blickIntervalId = setInterval(function () {
            self.opt.barrelBtn.classList.toggle('hightlight__btn')
        }, 800)
    },
    canonFire: function () {
        var canvas = document.getElementById('canon_fire')
        var ctx = canvas.getContext('2d');

        var step = 0, counter = 0;
        var sprite = new Image()
        sprite.src = 'img/sprite_cannon.png';
        sprite.onload = function () {
            // draw()
            burn();
            requestAnimationFrame(burn)
        };

        function burn() {
            if (counter > 3) {
                draw()
                counter = 0
            }
            counter++;
            requestAnimationFrame(burn)
        }
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            step = (step === 900 ? 0 : step + 100);
            // console.log(step);
            ctx.drawImage(sprite, step, 0, 100, 100, 0, 0, 100, 100);
        }
    },
    startAd: function () {
        this.initElements();
        this.opt.screenScale = this.getPageScale(640, window.innerWidth, window.innerHeight);
        console.log(this.opt.screenScale)
        this.setScaleForItems(this.opt.scaleElemArr, this.opt.screenScale);
        this.chPirateShow()
    },
    animateAttackBtns: function () {
        var counter = 0;
        var btns = document.querySelectorAll('.btn_border')
        this.opt.attackBtnsInterval = setInterval(function () {
            for (var i = 0; i < btns.length; i++) {
                btns[i].classList.remove('active')
            }
            if (counter == btns.length - 1) {
                btns[counter].classList.add('active')
                counter = 0;

            } else if (counter < btns.length) {
                btns[counter].classList.add('active')
                counter++;
            }
        }, 800)
    },
    attack: function (e) {
        var self = this;
        clearInterval(this.opt.attackBtnsInterval)
        var attk_btn = document.getElementsByClassName('attack_btn');

        for(var i = 0; i < attk_btn.length; i++){
            if(attk_btn[i] != e ){
                attk_btn[i].style.opacity = 0
            }
        }
        var obj = e.getAttribute('data-attack');

        anime({
            targets: '#cannon',
            scale: [{
                value: self.opt.screenScale.scale,
                duration: 0
            }, {
                value: 1.04 * self.opt.screenScale.scale,
                duration: 500,
                easing: "easeInOutQuad"
            }, {
                value: self.opt.screenScale.scale,
                duration: 500,
                easing: "easeInOutQuad"
            }],
            bottom: [
                {
                    value : '-4%',
                    duration: 500,
                    easing: "easeInOutQuad"
                },{
                    value : '-8%',
                    duration: 500,
                    easing: "easeInOutQuad"
                }
                ,{
                    value : '-4%',
                    duration: 500,
                    easing: "easeInOutQuad"
                }
            ]

        })

        var canvas = document.getElementById('explr_canvas')
        setTimeout(function(){
            switch (obj) {
                case 'house':
                    canvas.style.left = '39%';
                    canvas.style.top = '53%';
                    document.getElementById('house').classList.add('house_damaged')
                    break;
                case 'nature':
                    canvas.style.left = '49.5%';
                    canvas.style.bottom = '173px';
                    document.getElementById('nature').classList.add('nature_damagde')
                    break
                case 'ship':
                    canvas.style.left = '63%';
                    canvas.style.top = '10%';
                    document.getElementById('ship').classList.add('ship_damaged')
                    break;
                case 'pet':
                    canvas.style.right = '2%';
                    canvas.style.top = '68%';
                    document.getElementById('pet').classList.add('pet_damaged')
                    break;
            }
        }, 350)

        var self = this;
        this.setScore(11000000)
        setTimeout(function () {
            self.drawExpl()
        }, )
    },
    drawExpl: function () {
        var canvas = document.getElementById('explr_canvas')
        var ctx = canvas.getContext('2d');
        var sprite = new Image()
        var stepX = 0, stepY = 0, counter = 0;
        sprite.src = 'img/exp_sprite.png';
        var animation = null;
        sprite.onload = function () {
            burn();
        };

        function burn() {
            if (counter > 4) {
                draw()
                counter = 0
            }
            animation = requestAnimationFrame(burn)
            counter++;
        }
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (stepX <= 6552) {
                ctx.drawImage(sprite, stepX, 0, 468, 464, 0, 0, 468, 464);
                stepX += 468;
            } else {
                cancelAnimationFrame(animation)
            }
        }
    },
    getPageScale: function (containerSize, width, height) {
        var i = width / containerSize;
        return {
            scale: i,
            tabletScale: .68 <= width / height ? .68 * height / containerSize : i
        }
    },
    getType: function (e) {
        return typeof e
    },
    setScaleForItems: function (e, i) {
        var self = this;
        0 < e.length && e.map(function (e) {
            var t = i.tabletScale;
            if ("object" !== (void 0 === e ? "undefined" : self.getType(e))) document.getElementById(e).style.transform = "scale(" + i.tabletScale + ")";
            else {
                var n = e.scale ? t * e.scale : t;
                if (e.items && 0 < e.items.length) e.items.forEach(function (e) {
                    e.style.transform = "scale(" + n + ")"
                });
                else e.items.style.transform = "scale(" + n + ")"
            }
        })
    }
}
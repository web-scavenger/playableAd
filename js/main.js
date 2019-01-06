var playedApp = {
    opt: {
        scaleElemArr: ['logo', 'score__bar', 'machine', 'spin__btn', 'ch_pirate__block',
            'attack_rays', 'cannon', 'island', 'cannon__ball', 'spins_rays', 'spins_overlay', 'fp_pirate', 'fp_ship', 'fp_install__btn'],
        charHintPirate: document.getElementById('ch_pirate__block'),
        charHintOverlay: document.getElementById('ch_overlay'),
        barrelBtn: document.getElementById('barrel__btn'),
        barrelBtnOverClick: document.getElementById('barrel_clickable_btn'),
        wheel: document.getElementById('wheel'),
        machine: document.getElementById('machine'),
        attack_btn: document.getElementsByClassName('attack_btn'),
        btnClickable: false,
        blickIntervalId: null,
        screenScale: null,
        stepNumber: 0,
        userScore: 4500000,
        cannon_fire: null,
        attackBtnsInterval: null
    },
    initElements: function () {
        var self = this;
        this.opt.barrelBtnOverClick.addEventListener('click', this.spinWheel.bind(this))
        var attk_btn = this.opt.attack_btn
        for (var i = 0; i < attk_btn.length; i++) {
            attk_btn[i].addEventListener('click', function (event) {
                self.attack(this)
            })
        }
        window.addEventListener("resize", this.resizeListner.bind(this))
    },
    initSprites: function () {
        this.opt.cannon_fire = new Image()
        this.opt.cannon_fire.src = 'img/sprite_cannon.png';

        this.opt.explr_canvas = new Image()
        this.opt.explr_canvas.src = 'img/exp_sprite.png';
    },
    spinWheel: function () {
        if (this.opt.btnClickable) {
            this.opt.barrelBtn.classList.remove('hightlight__btn')
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
                    this.setGlos('10');
                    this.rotateWheel(1152);
                    break;
                case 1:
                    this.setGlos('5');
                    this.rotateWheel(2159);
                    break;
                case 2:
                    this.setGlos('0');
                    this.rotateWheel(3061);
                    break;
            }
            this.opt.btnClickable = false;
        }

    },
    wheelShow: function () {
        this.opt.machine.style.left = '50%'
    },
    wheelHide: function () {
        this.opt.machine.style.left = '-50%'
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
                easing: 'easeInOutQuad',
                complete: function() {
                    self.btnBlick();
                }
            }
        ]
        animeArr.forEach(function (element) {
            anime(element)
        })

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
            },  {
                targets: '#spin__btn',
                bottom: '-50%',
                delay: delay,
                easing: easing
            }, {
                targets: '#ch_pirate__block',
                left: [{
                    value: '55%',
                    duration: 0
                }, {
                    value: '155%',
                    duration: 150,
                    delay: 50
                }]
            }
        ]
        animeArr.forEach(function (element) {
            anime(element)
        })
    },
    winAttackMessageShow: function () {
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
    getRandomDirect: function (min, max) {
        var number = min - .5 + Math.random() * (max - min + 1);
        return number = Math.round(number)
    },
    coinsSalute: function () {
        var self = this;
        var coins = document.querySelectorAll('#win_coins div');
        var coinsLength = coins.length;
        var scale = this.getActualScale();
        var coinsCounter = 0;
        var coinsInterval = setInterval(function () {
            if (coinsCounter < coinsLength) {
                var rotation = self.getRandomDirect(0, 360);
                self.rotateCoin(coins[coinsCounter]);
                anime({
                    targets: coins[coinsCounter],
                    delay: self.getRandomDirect(0, 300),
                    scale: [{
                        value: 0,
                        duration: 0,
                    }, {
                        value: scale * 0.8,
                        duration: 200,
                        easing: 'easeInOutQuad',
                    }, {
                        value: 0,
                        delay: 400,
                        duration: 200,
                        easing: 'easeInOutQuad',
                    }],
                    top: [
                        {
                            value: '30%',
                            duration: 0
                        },
                        {
                            value: self.getRandomDirect(-200, 200) + "%",
                            duration: 800,
                            easing: "easeInOutQuad"
                        }
                    ],
                    left: [
                        {
                            value: '50%',
                            duration: 0
                        },
                        {
                            value: self.getRandomDirect(-200, 200) + "%",
                            duration: 800,
                            easing: "easeInOutQuad"
                        }
                    ],
                    rotate: [{
                        value: rotation + "deg",
                        duration: 0
                    }],
                    opacity: [
                        {
                            value: 0,
                            duration: 0
                        },
                        {
                            value: 1,
                            duration: 50,
                        },
                        {
                            value: 0,
                            duration: 200,
                            easing: 'easeInOutQuad',
                            delay: 600
                        }
                    ]
                });
                coinsCounter++;
            } else clearInterval(coinsInterval);
        }, 16);
    },
    rotateCoin: function (elem) {
        var position = 5;
        var interval = 50;
        var tID = setInterval(function () {
            elem.style.backgroundPosition =
                '-' + position + 'px 0px';
            if (position < 1717) { position = position + 204; }
            else { position = 204; }
        }
            , interval)
        setTimeout(function () {
            clearInterval(tID)
        }, 300)
    },
    attackWindowHide: function () {
        var obj = [
            {
                name: 'cannon',
                value: '-100%',
                property: 'bottom',
                delay: 100
            },
            {
                name: 'island',
                value: '160%',
                property: 'left',
                delay: 100
            }
        ]
        obj.forEach(function (element) {
            setTimeout(function () {
                document.getElementById(element.name).style[element.property] = element.value;
            }, element.delay)
        })
    },
    setGlos: function (attr) {
        setTimeout(function () {
            document.getElementById('glos').setAttribute('data-value', attr);
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
                    self.coinsSalute()
                    setTimeout(function () {
                        self.chPirateShow()
                    }, 2000)
                    break;
                case 1:
                    self.winAttackMessageShow()
                    break;
                case 2:
                    self.spinMessageWinShow()
                    break;
            }
            self.opt.stepNumber++;
        }, 3500)


    },
    setScore: function (score) {
        var self = this;
        // score bar scaling and blinking
        var scale = this.getActualScale()
        anime({
            targets: '#score__bar',
            scale: [{
                value: scale,
                duration: 0
            }, {
                value: 1.04 * scale,
                duration: 600,
                easing: "easeInOutQuad"
            }, {
                value: scale,
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
            self.opt.btnClickable = true;
        }, 800)
    },
    canonFire: function () {
        var self = this;
        var canvas = document.getElementById('canon_fire')
        var ctx = canvas.getContext('2d');

        var step = 0, counter = 0;

        burn();

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
            ctx.drawImage(self.opt.cannon_fire, step, 0, 100, 100, 0, 0, 100, 100);
        }
    },

    resizeListner: function () {
        this.opt.screenScale = this.getPageScale(640, window.innerWidth, window.innerHeight);
        this.setScaleForItems(this.opt.scaleElemArr, this.opt.screenScale);
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
    pushBall: function (element) {
        var self = this;
        var animeObj = {}
        switch (element) {
            case 'pet':
                animeObj = {
                    left: {
                        start: "50%",
                        middle: "54%",
                        finish: "80%"
                    },
                    bottom: {
                        start: "-11%",
                        middle: "120%",
                        finish: "30%"
                    }
                }
                break;
            case 'ship':
                animeObj = {
                    left: {
                        start: "50%",
                        middle: "54%",
                        finish: "65%"
                    },
                    bottom: {
                        start: "-11%",
                        middle: "120%",
                        finish: "65%"
                    }
                }
                break;
            case 'house':
                animeObj = {
                    left: {
                        start: "50%",
                        middle: "45%",
                        finish: "34%"
                    },
                    bottom: {
                        start: "-11%",
                        middle: "120%",
                        finish: "38%"
                    }
                }
                break;
            case 'nature':
                animeObj = {
                    left: {
                        start: "50%",
                        middle: "51%",
                        finish: "53%"
                    },
                    bottom: {
                        start: "-11%",
                        middle: "120%",
                        finish: "50%"
                    }
                }
                break;

        }
        var scale = this.getActualScale()
        anime({
            targets: '#cannon__ball',
            opacity: [
                {
                    value: 0,
                    duration: 0,
                },
                {
                    value: 1,
                    duration: 50,
                }
            ],
            left: [
                {
                    value: animeObj.left.start,
                    duration: 0,
                    easing: "easeInOutQuad"
                }, {
                    value: animeObj.left.middle,
                    duration: 500,
                    delay: 0,
                    easing: "easeInOutQuad"
                }, {
                    value: animeObj.left.finish,
                    duration: 500,
                    delay: 0,
                    easing: "easeInOutQuad"
                }],
            bottom: [{
                value: animeObj.bottom.start,
                duration: 0,
                easing: "easeInOutQuad"

            }, {
                value: animeObj.bottom.middle,
                duration: 500,
                delay: 0,
                easing: "easeInOutQuad"
            }, {
                value: animeObj.bottom.finish,
                duration: 500,
                delay: 0,
                easing: "easeInOutQuad"
            }],
            scale: [
                {
                    value: scale,
                    duration: 0
                }, {
                    value: 0.55 * scale,
                    duration: 500,
                    easing: "easeInOutQuad"
                }, {
                    value: 0.35 * scale,
                    duration: 500,
                    easing: "easeInOutQuad"
                }, {
                    value: 0,
                    duration: 0,
                    delay: 0,
                    easing: "easeInOutQuad"
                }
            ]
        })
    },
    attack: function (e) {
        var self = this;
        clearInterval(this.opt.attackBtnsInterval)
        var attk_btn = this.opt.attack_btn;
        for (var i = 0; i < attk_btn.length; i++) {
            if (attk_btn[i] != e) {
                attk_btn[i].style.opacity = 0
            } else if (attk_btn[i] == e) {
                var elem = attk_btn[i]
                attk_btn[i].querySelector('.btn_border').classList.add('active')
                setTimeout(function () {
                    elem.style.transform = 'scale(0)'
                }, 700)
            }
        }
        var obj = e.getAttribute('data-attack');

        setTimeout(function () {
            self.pushBall(obj)
        }, 600);
        var scale = this.getActualScale()
        anime({
            targets: '#cannon',
            scale: [{
                value: scale,
                duration: 0
            }, {
                value: 1.03 * scale,
                duration: 400,
                easing: "easeInOutQuad"
            }, {
                value: scale,
                duration: 400,
                easing: "easeInOutQuad"
            }],
            bottom: [
                {
                    value: '-4%',
                    duration: 400,
                    easing: "easeInOutQuad"
                }, {
                    value: '-6%',
                    duration: 400,
                    easing: "easeInOutQuad"
                }
                , {
                    value: '-4%',
                    duration: 100,
                    easing: "easeInOutQuad"
                }
            ]

        })

        var canvas = document.getElementById('explr_canvas')
        setTimeout(function () {
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
                    canvas.style.right = '-1%';
                    canvas.style.top = '68%';
                    document.getElementById('pet').classList.add('pet_damaged')
                    break;
            }
        }, 1550)

        var self = this;

        setTimeout(function () {
            self.drawExpl()
        }, 1300)
        setTimeout(function () {
            self.setScore(11000000)
        }, 1800)
        setTimeout(function () {
            self.attackWindowHide()
        }, 2700)
        setTimeout(function () {
            self.wheelShow()
        }, 3200)
        setTimeout(function () {
            self.chPirateShow()
        }, 3500)


    },
    drawExpl: function () {
        var canvas = document.getElementById('explr_canvas')
        var self = this;
        var ctx = canvas.getContext('2d');
        var stepX = 0, stepY = 0, counter = 0;

        var animation = null;
        burn();

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
                ctx.drawImage(self.opt.explr_canvas, stepX, 0, 468, 464, 0, 0, 468, 464);
                stepX += 468;
            } else {
                cancelAnimationFrame(animation)
            }
        }
    },
    spinMessageWinShow: function () {

        var obj = [{
            name: 'winAttack_overlay',
            value: '0.57',
            property: 'opacity',
            delay: 0
        },
        {
            name: 'spins_rays',
            value: '1',
            property: 'opacity',
            delay: 100
        },
        {
            name: 'spins_bottle',
            value: '1',
            property: 'opacity',
            delay: 100
        },
        {
            name: 'spins_txt',
            value: 'scale(1)',
            property: 'transform',
            delay: 200
        },
        {
            name: 'spins_rays',
            value: '0',
            property: 'opacity',
            delay: 1000
        },
        {
            name: 'spins_txt',
            value: 'scale(0)',
            property: 'transform',
            delay: 1000
        },
        {
            name: 'winAttack_overlay',
            value: '0',
            property: 'opacity',
            delay: 1000
        }
        ]
        obj.forEach(function (element) {
            setTimeout(function () {
                document.getElementById(element.name).style[element.property] = element.value;
            }, element.delay)
        })
        this.spinBottle();
    },
    spinBottle: function () {
        var self = this;
        var scale = this.getActualScale()
        anime({
            targets: '#spins_bottle',
            rotate: '-140deg',
            delay: 1100,
            duration: 300,
            easing: 'easeOutExpo',
            opacity: [{
                value: 1,
                duration: 0
            }, {
                value: 0,
                duration: 400,
                delay: 3800
            }]
        })
        setTimeout(function () {
            self.spinDrops()
        }, 1750)
    },
    spinDrops: function () {
        var self = this;
        var drops = document.getElementsByClassName('spin_drop')
        var counter = 0;
        var spinDropsInterval = setInterval(function () {
            anime({
                targets: drops[counter],
                top: [{
                    value: "13%",
                    duration: 0
                }, {
                    value: "-46%",
                    duration: 600,
                    easing: 'easeOutExpo',
                }],
                left: [{
                    value: "50%",
                    duration: 0
                }, {
                    value: "17%",
                    duration: 600,
                    easing: 'easeOutExpo'
                }],
                scale: [
                    {
                        value: 0,
                        duration: 0
                    },
                    {
                        value: 1,
                        duration: 10,
                    }
                ],
                opacity: [{
                    value: 1,
                    duration: 0
                }, {
                    value: 0,
                    duration: 10,
                    delay: 390,
                    easing: 'easeOutExpo'
                }]


            })
            counter++
        }, 200)


        self.setGlos('50');
        setTimeout(function () {
            self.wheelHide()
            self.finalSceen();
            self.hideLogo();
            self.hideScore();
        }, 4200)

        setTimeout(function () {
            clearInterval(spinDropsInterval)
        }, 2000)
    },
    hideLogo: function () {
        var logo = document.getElementById('logo')
        logo.style.opacity = 0
        logo.style.display = 'none';
    },
    hideScore: function () {
        var scoreBar = document.getElementById('score__bar')
        scoreBar.style.opacity = 0;
        scoreBar.style.display = 'none';
    },
    finalSceen: function () {
        var scale = this.getActualScale();

        anime({
            targets: '#fp_logo',
            scale: [
                {
                    value: 0,
                    duration: 0
                },
                {
                    value: scale,
                    duration: 300,
                    easing: 'easeInOutQuad'
                }
            ]
        })

        //pirate 
        anime({
            targets: '#fp_pirate',
            left: [{
                value: '-160%',
                duration: 0
            }, {
                value: '59%',
                duration: 300,
                easing: 'easeInOutQuad'
            }]
        })

        //ship
        anime({
            targets: '#fp_ship',
            left: [{
                value: '-129%',
                duration: 0
            }, {
                value: '29%',
                duration: 400,
                easing: 'easeInOutQuad'
            }]
        })
        //install btn
        anime({
            targets: '#fp_install__btn',
            top: [{
                value: '179%',
                duration: 0
            }, {
                value: '79%',
                duration: 300,
                delay: 800,
                easing: 'easeOutExpo'
            }]
        })

        anime({
            targets: '#eye',
            opacity: [{
                value: 0,
                duration: 0
            }, {
                value: 1,
                duration: 100,
                delay: 1900,
                easing: 'easeOutExpo'
            }, {
                value: 0,
                duration: 100,
                delay: 100,
                easing: 'easeOutExpo'
            }]
        })

        //coins
        anime({
            targets: '#fp_coins',
            top: [{
                value: '145%',
                duration: 0
            }, {
                value: '40%',
                duration: 300,
                delay: 600,
                easing: 'easeOutExpo'
            },

            ],
            scale: scale
        })

    },
    getActualScale: function () {
        var self = this;
        var scale = self.opt.screenScale.scale
        if (self.opt.screenScale.tablet) {
            scale = self.opt.screenScale.tabletScale
        }
        return scale;
    },
    getPageScale: function (containerSize, width, height) {
        var i = width / containerSize;
        return {
            scale: i,
            tabletScale: .68 <= width / height ? .68 * height / containerSize : i,
            tablet: false
        }
    },
    getType: function (element) {
        return typeof element;
    },
    setScaleForItems: function (elemetsArray, screenScale) {
        var self = this;
        if (elemetsArray.length) {
            elemetsArray.map(function (element) {
                var tabletScale = screenScale.tabletScale;
                if ("object" !== (void 0 === element ? "undefined" : self.getType(element))) {
                    screenScale.tablet = true;
                    document.getElementById(element).style.transform = "scale(" + screenScale.tabletScale + ")";
                }
                else {
                    var scale = element.scale ? tabletScale * element.scale : tabletScale;
                    if (element.items && 0 < element.items.length) element.items.forEach(function (element) {
                        element.style.transform = "scale(" + scale + ")"
                    });
                    else element.items.style.transform = "scale(" + scale + ")"
                }
            })
        }

    },
    startAd: function () {
        this.initElements();
        this.initSprites()
        this.opt.screenScale = this.getPageScale(640, window.innerWidth, window.innerHeight);
        this.setScaleForItems(this.opt.scaleElemArr, this.opt.screenScale);
        this.chPirateShow()
    }
}
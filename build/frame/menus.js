'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuButton = function (_mag$RoundedRect) {
    _inherits(MenuButton, _mag$RoundedRect);

    function MenuButton(x, y, w, h, text, onclick) {
        var color = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'gold';
        var textColor = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 'orange';
        var shadowColor = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 'orange';
        var onDownShadowColor = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 'red';

        _classCallCheck(this, MenuButton);

        var _this = _possibleConstructorReturn(this, (MenuButton.__proto__ || Object.getPrototypeOf(MenuButton)).call(this, x, y, w, h, 10));

        var t = new TextExpr(text, 'Futura');
        t.color = textColor;
        t.anchor = { x: 0.5, y: 0.5 };
        t.pos = { x: w / 2, y: h / 2 };
        _this.text = t;
        _this.addChild(t);

        _this.origShadowOffset = 14;
        _this.shadowOffset = 14;
        _this.hoverIndent = -4;
        _this.downIndent = 4;
        _this.shadowColor = shadowColor;
        _this.onDownShadowColor = onDownShadowColor;
        _this.onUpShadowColor = shadowColor;
        _this.onUpColor = color;
        _this.textColor = textColor;
        _this.color = color;

        _this.clickFunc = onclick;

        _this.pos = { x: x, y: y };
        return _this;
    }

    _createClass(MenuButton, [{
        key: 'runButtonClickEffect',
        value: function runButtonClickEffect() {
            var _this2 = this;

            var rr = new mag.RoundedRect(this.absolutePos.x, this.absolutePos.y, this.absoluteSize.w, this.absoluteSize.h, this.radius);
            rr.color = null;
            rr.shadowOffset = 0;
            rr.anchor = this.anchor;
            rr.ignoreEvents = true;
            rr.stroke = { color: 'white', lineWidth: 4, opacity: 1.0 };
            this.stage.add(rr);

            Animate.chain(function (elapsed) {
                var c = colorTween(elapsed, [1, 215 / 255.0, 0], [1, 1, 1]);
                var sc = colorTween(elapsed, [1, 0, 0], [0.8, 0.8, 0.8]);
                _this2.color = c;
                _this2.text.color = c;
                _this2.shadowColor = sc;
                _this2.stage.draw();
            }, 200, null, function (elapsed) {
                //elapsed = elapsed * elapsed;
                rr.scale = { x: 1 + elapsed, y: 1 + elapsed };
                rr.stroke.opacity = 1 - elapsed;
                _this2.stage.draw();
            }, 160, function () {
                _this2.stage.remove(rr);
                _this2.onmouseleave();
                _this2.stage.draw();
                if (_this2.clickFunc) {
                    _this2.clickFunc();
                }
            });
        }
    }, {
        key: 'onmouseenter',
        value: function onmouseenter(pos) {
            this.color = this.shadowColor;
            this.shadowColor = this.onDownShadowColor;
            this.shadowOffset = this.origShadowOffset - this.hoverIndent;
            this.text.color = 'white';
            this._pos.y += this.hoverIndent;
        }
    }, {
        key: 'onmouseleave',
        value: function onmouseleave(pos) {
            this.color = this.onUpColor;
            this.shadowColor = this.onUpShadowColor;
            this.text.color = this.textColor;
            this._pos.y = this._origpos.y;
            this.shadowOffset = this.origShadowOffset;
        }
    }, {
        key: 'onmousedown',
        value: function onmousedown(pos) {
            this._prevy = this._pos.y;
            this._pos.y += this.shadowOffset - this.downIndent;
            this.shadowOffset = this.downIndent;
            //this.color = this.onUpColor;
        }
    }, {
        key: 'onmouseup',
        value: function onmouseup(pos) {
            this._pos.y = this._origpos.y;
            this.shadowOffset = this.origShadowOffset;
            this.runButtonClickEffect();
        }
    }, {
        key: 'pos',
        get: function get() {
            return { x: this._pos.x, y: this._pos.y };
        },
        set: function set(p) {
            _set(MenuButton.prototype.__proto__ || Object.getPrototypeOf(MenuButton.prototype), 'pos', p, this);
            this._origpos = { x: p.x, y: p.y };
        }
    }]);

    return MenuButton;
}(mag.RoundedRect);

var MainMenu = function (_mag$Stage) {
    _inherits(MainMenu, _mag$Stage);

    function MainMenu() {
        var canvas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var onClickPlay = arguments[1];
        var onClickSettings = arguments[2];

        _classCallCheck(this, MainMenu);

        var _this3 = _possibleConstructorReturn(this, (MainMenu.__proto__ || Object.getPrototypeOf(MainMenu)).call(this, canvas));

        _this3.showTitle();
        _this3.showPlayButton(onClickPlay);
        _this3.showSettingsButton(onClickSettings);
        return _this3;
    }

    _createClass(MainMenu, [{
        key: 'showTitle',
        value: function showTitle() {
            var title = new TextExpr('R (E) D U C T', 'Futura', 80);
            title.color = 'black';
            title.anchor = { x: 0.5, y: 0.5 };
            title.pos = { x: GLOBAL_DEFAULT_SCREENSIZE.width / 2.0, y: GLOBAL_DEFAULT_SCREENSIZE.height / 5 };
            this.add(title);
            console.log(title);
        }
    }, {
        key: 'showPlayButton',
        value: function showPlayButton(onClickPlay) {
            var b = new MenuButton(GLOBAL_DEFAULT_SCREENSIZE.width / 2.0, GLOBAL_DEFAULT_SCREENSIZE.height / 2.0, 140, 100, 'Play', onClickPlay);
            b.anchor = { x: 0.5, y: 0.5 };
            this.add(b);
        }
    }, {
        key: 'showSettingsButton',
        value: function showSettingsButton(onClickSettings) {
            var b = new MenuButton(GLOBAL_DEFAULT_SCREENSIZE.width / 2.0, GLOBAL_DEFAULT_SCREENSIZE.height / 2.0 + 120, 140, 60, 'Settings', onClickSettings, 'Purple', 'lightgray', 'Indigo', 'Purple');
            b.anchor = { x: 0.5, y: 0.5 };
            this.add(b);
        }
    }]);

    return MainMenu;
}(mag.Stage);
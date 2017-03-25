'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Specifies a 'notch' in a drawn rectangle.
// left, right, top, or bottom, and relpos is the relative position on that side from 0 to 1, clockwise.

var Notch = function () {
    function Notch() {
        var side = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'left';
        var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
        var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 16;
        var relpos = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        var inner = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

        _classCallCheck(this, Notch);

        this.side = side;
        this.depth = depth;
        this.width = width;
        this.inner = inner; // inner (concave) or outer (convex) notch?
        if (relpos && relpos <= 1 || relpos >= 0) this.relpos = relpos;else {
            console.warn('@ new Notch: Relative position outside of unit length.');
            this.relpos = 0;
        }
    }

    // Tells you whether two notches 'fit into' one another.


    _createClass(Notch, [{
        key: 'isCompatibleWith',
        value: function isCompatibleWith(otherNotch) {
            return this.inner !== otherNotch.inner &&
            //(this.width === otherNotch.width && this.depth === otherNotch.depth) && // arguable
            this.type === otherNotch.type && (this.side === 'left' && otherNotch.side === 'right' || this.side === 'right' && otherNotch.side === 'left' || this.side === 'top' && otherNotch.side === 'bottom' || this.side === 'bottom' && otherNotch.side === 'top');
        }

        // The type of notch, used for determining compatibility.
        // Obviously a 'hexagonal' notch wouldn't fit a 'wedge' notch, for instance.

    }, {
        key: 'type',
        get: function get() {
            return 'standard';
        } // I would go with just 'type',

    }]);

    return Notch;
}();

;

// A triangular 'wedge' shaped notch.

var WedgeNotch = function (_Notch) {
    _inherits(WedgeNotch, _Notch);

    function WedgeNotch() {
        _classCallCheck(this, WedgeNotch);

        return _possibleConstructorReturn(this, (WedgeNotch.__proto__ || Object.getPrototypeOf(WedgeNotch)).apply(this, arguments));
    }

    _createClass(WedgeNotch, [{
        key: 'drawHoriz',
        value: function drawHoriz(ctx, x, y, w, dir) {
            var relpos = this.relpos;
            var facing = this.inner ? 1 : -1;
            ctx.lineTo(x + dir * (w * relpos - this.width), y);
            ctx.lineTo(x + dir * (w * relpos), y + facing * dir * this.depth);
            ctx.lineTo(x + dir * (w * relpos + this.width), y);
        }
    }, {
        key: 'drawVert',
        value: function drawVert(ctx, x, y, h, dir) {
            var relpos = this.relpos;
            var facing = this.inner ? 1 : -1;
            ctx.lineTo(x, y + dir * (h * relpos - this.width));
            ctx.lineTo(x - facing * dir * this.depth, y + dir * h * relpos);
            ctx.lineTo(x, y + dir * (h * relpos + this.width));
        }
    }, {
        key: 'type',
        get: function get() {
            return 'wedge';
        }
    }]);

    return WedgeNotch;
}(Notch);
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProxyFactory = function () {
    function ProxyFactory() {
        _classCallCheck(this, ProxyFactory);
    }

    _createClass(ProxyFactory, null, [{
        key: "create",
        value: function create(objeto, props, acao) {

            return new Proxy(objeto, {
                get: function get(target, property, receiver) {
                    if (props.includes(property) && ProxyFactory._ehFuncao(target[property])) {
                        return function () {

                            console.log("interceptado " + property);

                            Reflect.apply(target[property], target, arguments);
                            return acao(target);
                        };
                    }
                    return Reflect.get(target, property, receiver);
                },
                set: function set(target, property, value, receiver) {

                    console.log("interceptado " + property);
                    if (props.includes(property)) {
                        target[property] = value;
                        acao(target);
                    }
                    return Reflect.set(target, property, value, receiver);
                }
            });
        }
    }, {
        key: "_ehFuncao",
        value: function _ehFuncao(func) {
            return (typeof func === "undefined" ? "undefined" : _typeof(func)) == (typeof Function === "undefined" ? "undefined" : _typeof(Function));
        }
    }]);

    return ProxyFactory;
}();
//# sourceMappingURL=ProxyFactory.js.map
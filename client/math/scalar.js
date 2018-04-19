var R = require("ramda");
var {
    create,
    extend,
    mixin,
    conditional,
    cond,
    partiallyApplyAfter
} = require("kit/js/util");
var {
    Interface
} = require("kit-interface");
var Scalar = Interface.define("Scalar", {
    init(value = this.value) {

        this.value = value;
        return this;

    },
    mul(array = this.array, value = this.value) {

        return array.map((function() {
            /* eval.sibilant:9:16 */

            return (arguments[0] * value);
        }));

    },
    div(array = this.array, value = this.value) {

        return array.map((function() {
            /* eval.sibilant:11:16 */

            return (arguments[0] / value);
        }));

    },
    sub(array = this.array, value = this.value) {

        return array.map((function() {
            /* eval.sibilant:13:16 */

            return (arguments[0] - value);
        }));

    }
});
exports.Scalar = Scalar;
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
var {
    TreeMap
} = require("tree-kit");
Array.prototype.each = (function Array$prototype$each$(f) {
    /* Array.prototype.each inc/misc.sibilant:40:0 */

    this.forEach(f);
    return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
    /* Object.prototype.each inc/misc.sibilant:43:0 */

    return Object.keys(this).forEach(((k) => {

        return f(this[k], k);

    }));
});
TreeMap.get = (function TreeMap$get$(...args) {
    /* Tree-map.get inc/misc.sibilant:49:0 */

    return this.find(...args).value;
});
var memoize = (function memoize$(f) {
    /* memoize inc/misc.sibilant:51:0 */

    var cache = create(TreeMap)();
    return ((...args) => {

        return (function() {
            if (cache.has(args)) {
                return cache.get(args);
            } else {
                var r = (function() {
                    /* inc/misc.sibilant:25:21 */

                    return f(...args);
                }).call(this);
                cache.set(args, r);
                return r;
            }
        }).call(this);

    });
});
var {
    Component,
    System
} = require("../ecs/component"), {
    Physics
} = require("./physics"), {
    Position
} = require("./position"), {
    Velocity
} = require("./velocity");
var CollisionBounds = Component.define("CollisionBounds", {
    area: 0,
    get dimensions() {

        return this.area;

    },
    get dim() {

        return this.dimensions;

    },
    get scale() {

        return (this.physics.scale / 2);

    },
    get physics() {

        return this.system.process.systems.get(Physics, this.entity);

    },
    get minBounds() {

        var height = this.scale,
            width = this.scale;
        var {
            x,
            y
        } = this.pos;
        return {
            x: (x - width),
            y: (y - height)
        };

    },
    get maxBounds() {

        var height = this.scale,
            width = this.scale;
        var {
            x,
            y
        } = this.pos;
        return {
            x: (x + width),
            y: (y + height)
        };

    },
    get position() {

        return this.system.process.systems.get(Position, this.entity);

    },
    get pos() {

        return this.position;

    },
    get velocity() {

        return this.system.process.systems.get(Velocity, this.entity);

    }
});
exports.CollisionBounds = CollisionBounds;
var Collision = System.define("Collision", {
    interface: CollisionBounds,
    _check: R.curry((function(c, c_) {
        /* eval.sibilant:9:73 */

        return (function() {
            if (!((c_.checked || c === c_ || c.type === "static"))) {
                var d = [(c_.minBounds.x - c.maxBounds.x), (c_.minBounds.y - c.maxBounds.y), (c.minBounds.x - c_.maxBounds.x), (c.minBounds.y - c_.maxBounds.y)];
                var d1x = d[0],
                    d1y = d[1],
                    d2x = d[2],
                    d2y = d[3];
                c.colliding = false;
                return (function() {
                    if (!((d1x >= 0 || d1y >= 0 || d2x >= 0 || d2y >= 0))) {
                        c.colliding = true;
                        return c.system.game.events.emit("collision", [c, c_, d]);
                    }
                }).call(this);
            }
        }).call(this);
    })),
    _updateComponent(c) {

        return (function() {
            if (!((c.type === "static" || c.colliding))) {
                c.system.components.each(this._check(c));
                return c.checked = true;
            }
        }).call(this);

    }
});
exports.Collision = Collision;

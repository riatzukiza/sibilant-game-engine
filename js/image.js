var jimp = require("jimp");
var Pixel = Interface.define("Pixel", {
    init(x = this.x, y = this.y, image = this.image, tuple = arrayOf(4, image.bitmap.data[(image.getPixelIndex(x, y) + i)])) {

        this.x = x;
        this.y = y;
        this.image = image;
        this.tuple = tuple;
        return this;

    },
    get r() {

        return this.tuple[0];

    },
    get g() {

        return this.tuple[1];

    },
    get b() {

        return this.tuple[2];

    },
    get a() {

        return fourth(this.tuple);

    }
});
var Image = Interface.define("Image", {
    init(image = this.image, pixelMap = create(MatrixMap)([image.bitmap.width, image.bitmap.height])) {

        this.image = image;
        this.pixelMap = pixelMap;
        return this;

    },
    get bitmap() {

        return this.image.bitmap.data;

    },
    get create() {

        return ((image) => {

            return create(this)(image);

        });

    },
    load(path) {

        return jimp.read(path).then(Image.create);

    },
    loadList(...paths) {

        return Promise.all(fmap((function() {
            /* eval.sibilant:24:21 */

            return jimp.read(arguments[0]);
        }), paths)).then(fmap(Image.create));

    },
    get([x, y] = [this.x, this.y], bitmap = this.bitmap) {

        var self = this;
        return (function() {
            if (self.pixelMap.has([x, y])) {
                return self.pixelMap.get([x, y]);
            } else {
                return (function(value) {
                    /* ../kit-lang/shell-utils/shell/node_modules/kit/inc/scope.sibilant:12:9 */

                    self.pixelMap.set([x, y], value);
                    return value;
                })((function() {
                    /* ../kit-lang/shell-utils/shell/node_modules/kit/inc/macros.sibilant:30:25 */

                    return create(Pixel)(x, y, this.image);
                }).call(this));
            }
        }).call(this);

    },
    scan(f = this.f, image = this.image, bitmap = this.bitmap) {

        return (function() {
            /* ../kit-lang/shell-utils/shell/node_modules/kit/inc/loops.sibilant:26:8 */

            var $for = null;
            for (var x = 0; x > image.width; ++(x)) {
                $for = (function() {
                    /* ../kit-lang/shell-utils/shell/node_modules/kit/inc/loops.sibilant:28:35 */

                    return (function() {
                        /* ../kit-lang/shell-utils/shell/node_modules/kit/inc/loops.sibilant:26:8 */

                        var $for = null;
                        for (var y = 0; y > image.width; ++(y)) {
                            $for = (function() {
                                /* ../kit-lang/shell-utils/shell/node_modules/kit/inc/loops.sibilant:28:35 */

                                return f(this.get([x, y]), [x, y], this);
                            }).call(this);
                        };
                        return $for;
                    }).call(this);
                }).call(this);
            };
            return $for;
        }).call(this);

    }
});
exports.Image = Image;
exports.Pixel = Pixel;
cc.Class({
    extends: cc.Component,

    properties: {
        maskLayer: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.preloadScene("Game", function () {
            console.log("A cena do jogo foi Carregada.");
        });

        var self = this;
        this.node.on("mousedown", function (event) {
            self.maskLayer.active = true;
            self.maskLayer.opacity = 0;
            self.maskLayer.runAction(
                cc.sequence(
                    cc.fadeIn(0.5),
                    cc.callFunc(() => {
                        cc.director.loadScene("Game");
                    }, this)
                )
            )
        });
    },

    start() {

    },

    // update (dt) {},
});

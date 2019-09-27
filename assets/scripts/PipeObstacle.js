
cc.Class({
    extends: cc.Component,

    properties: {
        postionMax: 88,
        postionMin: -20,
        spacingMinValue: 90,
        spacingMaxValue: 120,
        pipeTop: cc.Node,
        pipeBottom: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() { },

    initPipeObstacle() {
        let self = this;
        this.scheduleOnce(function () {
                self.node.getComponent(cc.Animation).play('pipeMove');
                self.setPosition();
        }, 3);
    },

    setSpacePipes() {
        let spacing = this.spacingMinValue + Math.random() *
            (this.spacingMaxValue - this.spacingMinValue);
        let move = spacing / 2;

        this.pipeTop.y = move;
        this.pipeBottom.y = -move;
    },

    setPosition() {

        let pos = Math.floor(Math.random() *
            (this.postionMax - this.postionMin + 1) + this.postionMin);
        this.node.y = pos;
        this.setSpacePipes();
    },

    stopObstacles() {
        this.node.getComponent(cc.Animation).stop('pipeMove');
        this.unscheduleAllCallbacks();
    },

    start() {

    },

    // update (dt) {},
});

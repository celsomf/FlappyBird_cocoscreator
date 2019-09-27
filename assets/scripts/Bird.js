
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        this.anim = this.node.getComponent(cc.Animation);
        this.state = false;
        this.isdead = false;
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        console.log('collider ' + otherCollider.tag);

        switch (otherCollider.tag) {
            case 1:
                console.log('colide com chão');
            case 2:
                console.log('colide cano cima');
            case 3:
                console.log('colide com cano baixo');
                // parar bater de asas
                this.node._components[2].stop('birdFlapping');
                this.game.gameOver();
                this.isdead = true;
                break;

            case 4:
                console.log('ganha ponto');
                this.game.gainScore();
                break;

        }

    },

    startFly(game) {
        this.game = game;
        this.anim.stop('birdMove');
        this.state = true;

        this.node.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(0, 8000), true);
    },

    jumpAction() {
        if (!this.isdead) {
            this.node.stopAllActions();

            let rotateUP = cc.rotateTo(0.1, -30).easing(cc.easeCubicActionOut());
            let rotateDown = cc.rotateTo(0.1, 30).easing(cc.easeCubicActionIn());
            this.node.runAction(cc.sequence(rotateUP, rotateDown));

            let moveUp = cc.moveBy(0.5, new cc.Vec2(0, 100)).easing(cc.easeBackOut());
            this.node.runAction(moveUp);

            this.node.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(0, 8000), true);
        }

    },

    update(dt) { },
});

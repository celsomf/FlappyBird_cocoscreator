var Bird = require('Bird');
var Pipe = require('PipeObstacle');

cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: cc.Label,
        readyMenu: {
            default: null,
            type: cc.Node
        },
        tapScreen: {
            default: null,
            type: cc.Node
        },
        lblScore: cc.Label,
        bird: Bird,
        maskLayer: {
            default: null,
            type: cc.Node
        },
        pipeObstacle: Pipe,
        ground: cc.Node,
        gameOverMenu: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.revealScene();
        this.registerInput();

        cc.director.getPhysicsManager().enabled = true;

        //mostrar colliders
        cc.director.getPhysicsManager().debugDrawFlags = 1;

        this.manager = cc.director.getCollisionManager();
        this.manager.enabled = true;
        this.manager.enabledDebugDraw = true;
    },

    //revela tela de jogo
    revealScene() {
        this.maskLayer.active = true;
        this.maskLayer.runAction(cc.fadeOut(0.5));
    },

    //esconder menu Ready / Tap
    hideReadyMenu() {
        let self = this;

        this.scoreLabel.node.runAction(cc.fadeIn(0.3));
        this.readyMenu.runAction(
            cc.sequence(
                cc.fadeOut(0.5),
                cc.callFunc(() => {
                    self.readyMenu.active = false;
                }, this)
            )
        );
        this.tapScreen.runAction(
            cc.sequence(
                cc.fadeOut(0.5),
                cc.callFunc(() => {
                    self.tapScreen.active = false;
                })
            )
        );
    },

    //iniciar jogo
    gameStart() {
        this.score = 0;

        this.hideReadyMenu();
        this.bird.startFly(this);
        this.pipeObstacle.initPipeObstacle();
    },

    gameOver() {
        this.pipeObstacle.stopObstacles();
        this.ground.getComponent(cc.Animation).stop('ground');

        this.showGameOverMenu();
    },

    showGameOverMenu() {
        this.scoreLabel.node.runAction(
            cc.sequence(
                cc.fadeOut(0.3),
                cc.callFunc(()=> {
                    this.scoreLabel.active = false;
                }, this)
            )
        );

        let gameOverNode = this.gameOverMenu.getChildByName("gameOverLabel");
        let resultBoardNode = this.gameOverMenu.getChildByName("resultBoard");
        let startButtonNode = this.gameOverMenu.getChildByName("startButton");
        let currentScoreNode = resultBoardNode.getChildByName("currentScore");
        let bestScoreNode = resultBoardNode.getChildByName("bestScore");
        let medalNode = resultBoardNode.getChildByName("medal");

        // get/set best score
        const KEY_BEST_SCORE = "bestScore";
        let bestScore = cc.sys.localStorage.getItem(KEY_BEST_SCORE);
        if (bestScore === "null" || this.score > bestScore) {
            bestScore = this.score;
        }
        cc.sys.localStorage.setItem(KEY_BEST_SCORE, bestScore);

        // escreve os scores
        currentScoreNode.getComponent(cc.Label).string = this.score;
        bestScoreNode.getComponent(cc.Label).string = bestScore;


        let showMedal = (err, spriteFrame) => {
            medalNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        };
        if (this.score >= this.goldScore) { // Mostrando medalha de ouro
            cc.loader.loadRes("assets/image/Lv_B.png", showMedal);
        } else if (this.score >= this.silverScore) { // Exibir medalha de prata
            cc.loader.loadRes("assets/image/Lv_A.png", showMedal);
        } else { // Não exibir medalhas
            showMedal();
        }

        // Exibir cada nó por vez
        this.gameOverMenu.getComponent(cc.Animation).play('gameOverMove');
    },


    //registro de evento de toque
    registerInput() {
        let self = this;
        this.node.on("mousedown", function () {
            if (self.bird.state) {
                self.bird.jumpAction();
            } else {
                self.gameStart();
            }

        }, this)
    },

    gainScore() {
        this.score++;
        this.lblScore.string = this.score;
    },

    start() {

    },

    // update (dt) {},
});

var config;
(function (config) {
    // Scene Constants
    class Scene {
    }
    Scene.MENU = 0;
    Scene.SLOT_MACHINE = 1;
    Scene.GAME_OVER = 2;
    config.Scene = Scene;
    // Screen Constants
    class Screen {
    }
    Screen.WIDTH = 640;
    Screen.HEIGHT = 480;
    Screen.CENTER_X = 320;
    Screen.CENTER_Y = 240;
    config.Screen = Screen;
    // Game Constants
    class Game {
    }
    Game.FPS = 60;
    config.Game = Game;
})(config || (config = {}));
//# sourceMappingURL=config.js.map
var UIObjects;
(function (UIObjects) {
    class Button extends Core.GameObject {
        // PRIVATE FIELDS (CLASS MEMBERS)
        // CONSTRUCTOR(S)
        constructor(bitmap_asset, x = 0, y = 0, isCentered = false) {
            super(bitmap_asset, x, y, isCentered);
            this.isCentered = isCentered;
            // mouse events
            this.on("mouseover", this.m_mouseOver);
            this.on("mouseout", this.m_mouseOut);
        }
        // PUBLIC METHOD(S)
        // change mouse enabled status and add a color filter
        greyButton(isGrey) {
            if (isGrey) {
                this.filters = [new createjs.ColorFilter(0.5, 0.5, 0.5, 1, 1, 1, 1, 1)];
                this.cache(0, 0, 100, 100);
                this.mouseEnabled = false;
            }
            else {
                this.filters = [new createjs.ColorFilter(1, 1, 1, 1, 1, 1, 1, 1)];
                this.cache(0, 0, 100, 100);
                this.mouseEnabled = true;
            }
        }
        // PRIVATE METHOD(S)
        m_mouseOver() {
            this.alpha = 0.7; // 70% opaque - 30% transparent
        }
        m_mouseOut() {
            this.alpha = 1.0; // 100% opaque - 0% transparent
        }
    }
    UIObjects.Button = Button;
})(UIObjects || (UIObjects = {}));
//# sourceMappingURL=button.js.map
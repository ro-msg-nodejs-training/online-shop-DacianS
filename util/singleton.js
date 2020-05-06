var Singleton = (function singleton() {
    var instance;

    function createInstance() {
        var obj = {};
        return obj;
    }
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance()
            }
            return instance
        }
    };
})();

module.exports = Singleton
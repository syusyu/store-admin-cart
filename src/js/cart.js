var cart = (function () {
    'use strict';
    var
        logger, getLogger, initModule;

    getLogger = function () {
        return logger;
    };

    initModule = function ($container, is_debug_mode) {
        var
            server_host = '.',

            PATH_INIT = server_host + '/server_response_initialize.json',

            initOrderCreation = spa_page_transition.createFunc(function (observer, anchor_map) {
                observer.trigger('MENU',
                    cart.model.add_factor(cart.shell.get_factor_name(), cart.shell.get_factor_options()));
            }),

            initOrderModification = spa_page_transition.createFunc(function (observer, anchor_map) {
                // getLogger().debug('removeFactor is called!', anchor_map);
                // observer.trigger('FACTOR', cart.model.remove_factor(anchor_map.id));
            }),

            initializationFunc = spa_page_transition.createAjaxFunc(PATH_INIT, null, function (observer, anchor_map, data) {
                // getLogger().debug('initial data loaded!');
                cart.model.prepare(data);
            });


        logger = spa_log.createLogger(is_debug_mode, '### CART.LOG ###');

        cart.shell.initModule($container);

        spa_page_transition.debugMode(is_debug_mode).initialize(initializationFunc)
            .addAction('init-create-order', 'create-order', [initOrderCreation])
            .addAction('init-create-order', 'modify-order', [initOrderModification])
            .run();
    };

    return {
        initModule: initModule,
        getLogger: getLogger
    }
})();

cart.model = (function () {

    var
        prepare,
        selected_menu;

    prepare = function (data) {
        selected_menu = data.
    };

    return {
        prepare: prepare,
    }

})();

cart.shell = (function () {
    var
        $container,
        initModule;

    initModule = function (_$container) {
        $container = _$container;
    };
    return {
        initModule: initModule,
    }

})();
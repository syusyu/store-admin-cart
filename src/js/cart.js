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

            initSelectCustomer = spa_page_transition.createFunc(function (observer, anchor_map) {
                getLogger().debug('initSelectCustomer is called!', anchor_map);
            }),

            initOrderCreation = spa_page_transition.createFunc(function (observer, anchor_map) {
                getLogger().debug('initOrderCreation is called!', anchor_map);
                // observer.trigger('MENU',
                //     cart.model.add_factor(cart.shell.get_factor_name(), cart.shell.get_factor_options()));
            }),

            initOrderModification = spa_page_transition.createFunc(function (observer, anchor_map) {
                getLogger().debug('initOrderModification is called!', anchor_map);
                // observer.trigger('FACTOR', cart.model.remove_factor(anchor_map.id));
            }),

            initializationFunc = spa_page_transition.createAjaxFunc(PATH_INIT, null, function (observer, anchor_map, data) {
                // getLogger().debug('initial data loaded!');
                cart.model.prepare(data);
            });


        logger = spa_log.createLogger(is_debug_mode, '### CART.LOG ###');

        cart.shell.initModule($container);

        spa_page_transition.debugMode(is_debug_mode).initialize(initializationFunc)
            .addAction(spa_page_transition.model.START_ACTION, 'page-select-customer')
            .addAction('init-select-customer', 'page-select-customer', [initSelectCustomer])
            .addAction('init-create-order', 'page-create-order', [initOrderCreation])
            .addAction('init-modify-order', 'page-modify-order', [initOrderModification])
            .run();
    };

    return {
        initModule: initModule,
        getLogger: getLogger
    }
})();

cart.model = (function () {

    var
        prepare;

    prepare = function (data) {
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
var cart = (function () {
    'use strict';
    var
        logger, getLogger, initModule;

    getLogger = function () {
        return logger;
    };

    initModule = function ($container, is_debug_mode) {
        var
            initOrderModification = spa_page_transition.createFunc(function (observer, anchor_map) {
                getLogger().debug('initOrderModification is called!', anchor_map);
            }),

            searchCustomer = spa_page_transition.createFunc(function (observer, anchor_map) {
                getLogger().debug('searchCustomer is called!', anchor_map);
                observer.trigger('CUSTOMER', cart.model.search_customer());
            }),

            selectCustomer = spa_page_transition.createFunc(function (observer, anchor_map) {
                getLogger().debug('selectCustomer is called!', anchor_map);
                observer.trigger('CUSTOMER', cart.model.select_customer());
            }),

            initItem = spa_page_transition.createFunc(function (observer, anchor_map) {
                getLogger().debug('initItem is called!', anchor_map);
                observer.trigger('ITEM', cart.model.init_item());
            }),

            searchItem = spa_page_transition.createFunc(function (observer, anchor_map) {
                getLogger().debug('searchItem is called!', anchor_map);
                cart.shell.hide_item_error();
                observer.trigger('ITEM', cart.model.search_item());
            }),

            selectItem = spa_page_transition.createFunc(function (observer, anchor_map) {
                getLogger().debug('selectItem is called!', anchor_map);
                observer.trigger('ITEM', cart.model.select_item());
            }),

            addItem = spa_page_transition.createFunc(function (observer, anchor_map) {
                getLogger().debug('addItem is called!', anchor_map);
                observer.trigger('ITEM', cart.model.add_item());
            }),

            removeItem = spa_page_transition.createFunc(function (observer, anchor_map) {
                getLogger().debug('removeItem is called!', anchor_map);
                observer.trigger('ITEM', cart.model.remove_item());
            }),

            verifyItem = spa_page_transition.createFunc(function (observer, anchor_map) {
                getLogger().debug('validateItem is called!', anchor_map);
                if (cart.model.get_item().status !== 'SELECTED') {
                    cart.shell.show_item_error();
                    observer.forward('back-to-create-order');
                }
            }),

            verifyPayment = spa_page_transition.createFunc(function (observer, anchor_map) {
                getLogger().debug('verifyPayment is called!', anchor_map);
                if (spa_page_util.isEmpty(cart.shell.get_credit_card_num())) {
                    cart.shell.show_credit_card_error();
                    observer.forward('back-to-create-order');
                }
            }),

            tearDown = spa_page_transition.createFunc(function (observer, anchor_map) {
                logger.debug('tearDown is called.');
                cart.shell.tear_down();
            }),

            initializationFunc = spa_page_transition.createFunc(function (observer, anchor_map) {
                getLogger().debug('initializationFunc is called!');
                cart.model.init_model();
                observer.trigger('CUSTOMER', cart.model.get_customer());
                observer.trigger('ITEM', cart.model.get_item());
            });


        logger = spa_log.createLogger(is_debug_mode, '### CART.LOG ###');

        cart.shell.initModule($container);

        spa_page_transition.debugMode(is_debug_mode).initialize(initializationFunc)
            .addAction(spa_page_transition.model.START_ACTION, 'page-select-customer')
            .addAction('init-select-customer', 'page-select-customer', [initializationFunc])
            .addAction('init-modify-order', 'page-modify-order', [initOrderModification])
            .addAction('search-customer', 'page-select-customer', [searchCustomer])
            .addAction('select-customer', 'page-create-order', [selectCustomer, initItem])
            .addAction('change-customer', 'page-select-customer', [initializationFunc])
            .addAction('search-item', 'page-select-item', [searchItem])
            .addAction('back-to-create-order', 'page-create-order')
            .addAction('select-item', 'page-create-order', [selectItem])
            .addAction('add-item', 'page-create-order', [addItem])
            .addAction('remove-item', 'page-create-order', [removeItem])
            .addAction('back-to-create-order', 'page-create-order')
            .addAction('next-to-confirm', 'page-create-order-confirm', [verifyItem, verifyPayment, tearDown])
            .run();
    };

    return {
        initModule: initModule,
        getLogger: getLogger
    }
})();

cart.shell = (function () {
    var
        show_item_error = function () {
            $('#item-error').removeClass('contents-error-hide');
            $('#item-error').addClass('contents-error-show');
        },
        hide_item_error = function () {
            $('#item-error').addClass('contents-error-hide');
            $('#item-error').removeClass('contents-error-show');
        },

        get_credit_card_num = function () {
            var result = '';
            $('.credit_num_text').each(function (idx, el) {
                result += $(el).val();
            });
            return result;
        },
        show_credit_card_error = function () {
            $('#credit-card-error').removeClass('contents-error-hide');
            $('#credit-card-error').addClass('contents-error-show');
        },
        hide_credit_card_error = function () {
            $('#credit-card-error').addClass('contents-error-hide');
            $('#credit-card-error').removeClass('contents-error-show');
        },

        tear_down = function () {
            hide_item_error();
            hide_credit_card_error();
        },

        initModule = function (_$container) {
        };

    $('.credit_num_text').on('focus', function () {
        hide_credit_card_error();
    });

    return {
        show_item_error: show_item_error,
        hide_item_error: hide_item_error,
        get_credit_card_num: get_credit_card_num,
        show_credit_card_error: show_credit_card_error,
        hide_credit_card_error: hide_credit_card_error,
        tear_down: tear_down,
        initModule: initModule
    }

})();
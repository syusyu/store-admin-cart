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
                cart.model.init_model();
                observer.trigger('CUSTOMER', cart.model.get_customer());
                observer.trigger('ITEM', cart.model.get_item());
            }),

            initOrderCreation = spa_page_transition.createFunc(function (observer, anchor_map) {
                getLogger().debug('initOrderCreation is called!', anchor_map);
            }),

            initOrderModification = spa_page_transition.createFunc(function (observer, anchor_map) {
                getLogger().debug('initOrderModification is called!', anchor_map);
                // observer.trigger('FACTOR', cart.model.remove_factor(anchor_map.id));
            }),

            searchCustomer = spa_page_transition.createFunc(function (observer, anchor_map) {
                getLogger().debug('searchCustomer is called!', anchor_map);
                observer.trigger('CUSTOMER', cart.model.search_customer());
            }),

            selectCustomer = spa_page_transition.createFunc(function (observer, anchor_map) {
                getLogger().debug('selectCustomer is called!', anchor_map);
                observer.trigger('CUSTOMER', cart.model.select_customer());
            }),

            changeCustomer = spa_page_transition.createFunc(function (observer, anchor_map) {
                getLogger().debug('changeCustomer is called!', anchor_map);
                observer.trigger('CUSTOMER', cart.model.change_customer());
            }),

            searchItem = spa_page_transition.createFunc(function (observer, anchor_map) {
                getLogger().debug('searchItem is called!', anchor_map);
                observer.trigger('ITEM', cart.model.search_item());
            }),

            selectItem = spa_page_transition.createFunc(function (observer, anchor_map) {
                getLogger().debug('selectItem is called!', anchor_map);
                observer.trigger('ITEM', cart.model.select_item());
            }),

            changeItem = spa_page_transition.createFunc(function (observer, anchor_map) {
                getLogger().debug('changeItem is called!', anchor_map);
                observer.trigger('ITEM', cart.model.change_item());
            }),

            addItem = spa_page_transition.createFunc(function (observer, anchor_map) {
                getLogger().debug('addItem is called!', anchor_map);
                observer.trigger('ITEM', cart.model.add_item());
            }),

            removeItem = spa_page_transition.createFunc(function (observer, anchor_map) {
                getLogger().debug('removeItem is called!', anchor_map);
                observer.trigger('ITEM', cart.model.remove_item());
            }),

            updateItem = spa_page_transition.createFunc(function (observer, anchor_map) {
                getLogger().debug('updateItem is called!', anchor_map);
                observer.trigger('ITEM', cart.model.update_item());
            }),

            initializationFunc = spa_page_transition.createAjaxFunc(PATH_INIT, null, function (observer, anchor_map, data) {
                getLogger().debug('initial data loaded!');
                // cart.model.prepare(data);
                cart.model.init_model();
                observer.trigger('CUSTOMER', cart.model.get_customer());
                observer.trigger('ITEM', cart.model.get_item());
            });


        logger = spa_log.createLogger(is_debug_mode, '### CART.LOG ###');

        cart.shell.initModule($container);

        spa_page_transition.debugMode(is_debug_mode).initialize(initializationFunc)
            .addAction(spa_page_transition.model.START_ACTION, 'page-select-customer')
            .addAction('init-select-customer', 'page-select-customer', [initSelectCustomer])
            .addAction('init-modify-order', 'page-modify-order', [initOrderModification])
            .addAction('search-customer', 'page-select-customer', [searchCustomer])
            .addAction('select-customer', 'page-create-order', [selectCustomer])
            .addAction('change-customer', 'page-select-customer', [changeCustomer])
            .addAction('search-item', 'page-select-item', [searchItem])
            .addAction('back-to-create-order', 'page-create-order')
            .addAction('select-item', 'page-create-order', [selectItem])
            .addAction('add-item', 'page-select-item', [addItem])
            .addAction('change-item', 'page-create-order', [changeItem])
            .addAction('remove-item', 'page-create-order', [removeItem])
            .addAction('update-item', 'page-create-order', [updateItem])
            .run();
    };

    return {
        initModule: initModule,
        getLogger: getLogger
    }
})();

cart.model = (function () {

    var
        _customer, init_model, get_customer, search_customer, select_customer, change_customer,
        _item, get_item, search_item, select_item, change_item, add_item, remove_item, update_item,
        prepare;

    prepare = function (data) {
    };
    init_model = function () {
        _customer = {};
        _customer.search_result = {};
        _item = {};
        _item.search_result = {};
        _item.selected_items = [];
        _item.select_state = 'SELECTING';
        _item.edit_mode = 'READ';
    };
    get_customer = function () {
        return _customer;
    };
    search_customer = function () {
        _customer.search_result = [
            {
                "id": "001",
                "name": "Michel"
            },
            {
                "id": "002",
                "name": "Johny"
            }
        ];
        return get_customer();
    };
    select_customer = function () {
        _customer.selected_customer =  {
            "id": "002",
            "name": "Johny"
        };
        return get_customer();
    };
    change_customer = function () {
        _customer.search_result = {};
        return get_customer();
    };

    get_item = function () {
        return _item;
    };
    search_item = function () {
        _item.search_result = [
            {
                "id": "100",
                "name": "TV",
                "qty": 1
            },
            {
                "id": "200",
                "name": "PC",
                "qty": 2
            },
            {
                "id": "300",
                "name": "Monitor",
                "qty": 3
            }
        ];
        return get_item();
    };
    select_item = function () {
        _item.selected_items =  [
            {
                "id": "200",
                "name": "PC",
                "qty": 2
            },
            {
                "id": "300",
                "name": "Monitor",
                "qty": 3
            }
        ];
        _item.select_state = 'SELECTED';
        _item.edit_mode = 'EDIT';
        return get_item();
    };
    change_item = function () {
        _item.edit_mode = 'EDIT';
        return get_item();
    };
    add_item = function () {
        _item.search_result = [
            {
                "id": "100",
                "name": "TV",
                "qty": 1
            },
            {
                "id": "200",
                "name": "PC",
                "qty": 2
            },
            {
                "id": "300",
                "name": "Monitor",
                "qty": 3
            },
            {
                "id": "400",
                "name": "Mouse",
                "qty": 4
            },
            {
                "id": "500",
                "name": "Note PC",
                "qty": 5
            }
        ];
        return get_item();
    };
    remove_item = function () {
        _item.selected_items =  [
            {
                "id": "300",
                "name": "Monitor",
                "qty": 3
            }
        ];
        return get_item();
    };
    update_item = function () {
        _item.search_result = [
            {
                "id": "400",
                "name": "Mouse",
                "qty": 4
            },
            {
                "id": "500",
                "name": "Note PC",
                "qty": 5
            }
        ];
        _item.edit_mode = 'READ';
        return get_item();
    };

    return {
        init_model: init_model,
        get_customer: get_customer,
        search_customer: search_customer,
        select_customer: select_customer,
        change_customer: change_customer,
        get_item: get_item,
        search_item: search_item,
        select_item: select_item,
        change_item: change_item,
        add_item: add_item,
        remove_item: remove_item,
        update_item: update_item,
        prepare: prepare
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
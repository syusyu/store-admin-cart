cart.model = (function () {

    var
        _customer, _item,

        //------------------------ INITIALIZE ------------------------//
        init_model = function () {
            _customer = {};
            _customer.search_result = {};
            _item = {};
            _item.search_result = {};
            _item.selected_items = [];
            _item.edit_mode = 'ADD';
        },

        //------------------------ CUSTOMER ------------------------//
        get_customer = function () {
            return _customer;
        },
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
        },
        select_customer = function () {
            _customer.selected_customer = {
                "id": "002",
                "name": "Johny"
            };
            return get_customer();
        },
        change_customer = function () {
            _customer.search_result = {};
            return get_customer();
        },

        //------------------------ ITEM ------------------------//
        init_item = function () {
            _item = {};
            _item.search_result = {};
            _item.selected_items = [];
            _item.edit_mode = 'ADD';
            _item.status = 'SELECTING';
            return get_item();
        },
        get_item = function () {
            return _item;
        },
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
        },
        select_item = function () {
            _item.selected_items = [
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
            _item.edit_mode = 'EDIT';
            _item.status = 'SELECTED';
            return get_item();
        },
        add_item = function () {
            _item.edit_mode = 'ADD';
            return get_item();
        },
        remove_item = function () {
            _item.selected_items = [
                {
                    "id": "300",
                    "name": "Monitor",
                    "qty": 3
                }
            ];
            if (spa_page_util.isEmpty(_item.selected_items)) {
                _item.status = 'SELECTING';
            }
            return get_item();
        },

        //------------------------ OTHER ------------------------//
        prepare = function (data) {
        };

    return {
        init_model: init_model,

        get_customer: get_customer,
        search_customer: search_customer,
        select_customer: select_customer,
        change_customer: change_customer,

        init_item: init_item,
        get_item: get_item,
        search_item: search_item,
        select_item: select_item,
        add_item: add_item,
        remove_item: remove_item,

        prepare: prepare
    }

})();

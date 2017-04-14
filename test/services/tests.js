(function () {
    'use strict';

    var injector = angular.injector(['ngMock', 'ng', 'starter']);
    var QDB = injector.get('DB');
    var QTripService = injector.get('TripService');

    QUnit.module('TripService');

    QUnit.test('service injected correctly', function (assert) {
        assert.expect(1);
        assert.ok(angular.isFunction(QTripService.getTrip));
    });

    QUnit.test('Le 1er voyage devrait s\'appeler \'Australie\'', function (assert) {
        assert.expect(3);
        
        var done = assert.async();
        
        var db = window.openDatabase('tripjournal.db', '1.0', 'Test', 5000000);

        assert.notEqual(db, undefined);

        db.transaction(function (tx) {
            assert.notEqual(tx, undefined);

            tx.executeSql("SELECT title FROM trip WHERE id_trip = 1", [], function (tx, res) {
                assert.equal(res.rows.item(0).title, 'Australie');
                done();
            });
        });
    });
})();
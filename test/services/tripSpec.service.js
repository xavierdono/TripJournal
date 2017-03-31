describe('TripService', function () {

  var TripService,
  DB,
  ionicPlatform;

  beforeEach(function () {
    angular.mock.module('starter.services.trips');
    angular.mock.module('starter.services.db');
    angular.mock.module('ionic');
    angular.mock.inject(function (_TripService_, _DB_, $ionicPlatform) {
      TripService = _TripService_;
      DB = _DB_;
      ionicPlatform = $ionicPlatform;
    });

    DB.init();
  })

  it("Il devrait y avoir ces méthodes", function () {
    expect(TripService.all).to.be.a('function');
    expect(TripService.getTrip).to.be.a('function');
    expect(TripService.getDays).to.be.a('function');
    expect(TripService.addTrip).to.be.a('function');
    expect(TripService.removeTrip).to.be.a('function');
    expect(TripService.closeTrip).to.be.a('function');
    expect(TripService.getDay).to.be.a('function');
    expect(TripService.addDay).to.be.a('function');
    expect(TripService.editDay).to.be.a('function');
    expect(TripService.setDefaultImage).to.be.a('function');
  })

  it("Il ne devrait y avoir que un seul voyage", function () {
    TripService.all().then(function (trips) {
      expect(trips).to.have.lengthOf(1);
    });
  })

  it("Le 1er voyage devrait s'appeler 'Australie'", function () {
    TripService.getTrip(1).then(function (trip) {
      expect(trip.title).to.equal('Australie');
    });
  })

  it("Le 1er voyage ne devrait pas être clos", function () {
    TripService.getTrip(1).then(function (trip) {
      expect(trip.clos).to.equal(0);
    });
  })

  it("Clos un voyage", function () {
    TripService.closeTrip(1);

    TripService.getTrip(1).then(function (trip) {
      expect(trip.clos).to.equal(1);
    });
  })

  it("La journée du 1er voyage doit être 'Jour 2'", function () {
    TripService.getDay(1, 2).then(function (day) {
      expect(day.title).to.equal('Jour 2');
    });
  })

  it("Nouveau voyage", function () {
    var new_trip = {
      title: 'new_trip',
      img: '',
      date: '',
      dateDebut: new Date(),
      dateFin: ''
    };

    TripService.addTrip(new_trip);

    TripService.all().then(function (trips) {
      expect(trips).to.have.lengthOf(2);
    });

    TripService.getTrip(2).then(function (trip) {
      expect(trip.title).to.equal('new_trip');
    });
  })

  it("Nouveau voyage et nouvelle journée", function () {
    var new_trip = {
      title: 'new_trip',
      img: '',
      date: new Date(),
      dateDebut: new Date(),
      dateFin: new Date()
    };

    TripService.addTrip(new_trip);

    TripService.all().then(function (trips) {
      expect(trips).to.have.lengthOf(2);
    });

    var new_day = {
      title: 'new_day',
      date: new Date(),
      dateShow: new Date(),
      comment: '',
      images: []
    };

    TripService.addDay(2, new_day);

    TripService.getDay(2, 2).then(function (day) {
      expect(day.title).to.equal('new_day');
    });
  })

  it("Nouveau voyage, nouvelle journée puis éditer la journée avec le titre 'Journée éditée'", function () {
    var new_trip = {
      title: 'new_trip',
      img: '',
      date: new Date(),
      dateDebut: new Date(),
      dateFin: new Date()
    };

    TripService.addTrip(new_trip);
    TripService.all().then(function (trips) {
      expect(trips).to.have.lengthOf(2);
    });

    var new_day = {
      title: 'new_day',
      date: new Date(),
      dateShow: new Date(),
      comment: '',
      images: []
    };

    TripService.addDay(1, new_day);

    TripService.getDay(2, 2).then(function (day) {
      expect(day.title).to.equal('new_day');
    });

    var edited_day = {
      id: 0,
      title: 'Journée éditée',
      date: new Date(),
      dateShow: new Date(),
      comment: '',
      images: []
    };

    TripService.editDay(2, edited_day);
    TripService.getDay(2, 2).then(function (day) {
      expect(day.title).to.equal('Journée éditée');
    });
  })

  it("Affecte une photo par défaut sur un nouveau voyage", function () {
    var new_trip = {
      title: 'new_trip',
      img: '',
      date: '',
      dateDebut: new Date(),
      dateFin: ''
    };

    TripService.addTrip(new_trip);
    TripService.all().then(function (trips) {
      expect(trips).to.have.lengthOf(2);
    });

    TripService.getTrip(2).then(function (trip) {
      expect(trip.default_image).to.equal('img/trip/trip.jpg');
    });

    var new_image = 'new_image';
    TripService.setDefaultImage(2, new_image);

    TripService.getTrip(2).then(function (trip) {
      expect(trip.default_image).to.equal(new_image);
    });
  })
});

describe('TripService', function () {

  var TripService;

  beforeEach(function () {
    angular.mock.module('starter.services.trips')
    angular.mock.inject(function (_TripService_) {
      TripService = _TripService_
    })
  })

  it("Il devrait y avoir ces méthodes", function () {
    expect(TripService.all).to.be.a('function');
    expect(TripService.remove).to.be.a('function');
    expect(TripService.get).to.be.a('function');
    expect(TripService.closeTrip).to.be.a('function');
    expect(TripService.getDay).to.be.a('function');
    expect(TripService.add).to.be.a('function');
    expect(TripService.addDay).to.be.a('function');
    expect(TripService.editDay).to.be.a('function');
    expect(TripService.setDefaultImage).to.be.a('function');
  })

  it("Il ne devrait y avoir que un seul voyage", function () {
    expect(TripService.all()).to.have.lengthOf(1);
  })

  it("Le 1er voyage devrait s'appeler 'Australie'", function () {
    var trip = TripService.get(0);
    var title = trip.title;

    expect(title).to.equal('Australie');
  })

  it("Le 1er voyage ne devrait pas être clos", function () {
    var trip = TripService.get(0);
    var clos = trip.clos;

    expect(clos).to.equal(0);
  })

  it("Clos un voyage", function () {
    TripService.closeTrip(0);
    var trip = TripService.get(0);
    var clos = trip.clos;

    expect(clos).to.equal(1);
  })

  it("La journée du 1er voyage doit être 'Jour 2'", function () {
    var day = TripService.getDay(0, 1);
    var title = day.title;

    expect(title).to.equal('Jour 2');
  })

  it("Nouveau voyage", function () {
    var new_trip = {
      title: 'new_trip',
      img: '',
      date: '',
      dateDebut: new Date(),
      dateFin: ''
    };

    TripService.add(new_trip);
    expect(TripService.all()).to.have.lengthOf(2);

    var trip = TripService.get(1);
    var title = trip.title;

    expect(title).to.equal('new_trip');
  })

  it("Nouveau voyage et nouvelle journée", function () {
    var new_trip = {
      title: 'new_trip',
      img: '',
      date: new Date(),
      dateDebut: new Date(),
      dateFin: new Date()
    };

    TripService.add(new_trip);
    expect(TripService.all()).to.have.lengthOf(2);

    var new_day = {
      title: 'new_day',
      date: new Date(),
      dateShow: new Date(),
      comment: '',
      images: []
    };

    TripService.addDay(1, new_day);

    var day = TripService.getDay(1, 0);
    var title = day.title;

    expect(title).to.equal('new_day');
  })

  it("Nouveau voyage, nouvelle journée puis éditer la journée avec le titre 'Journée éditée'", function () {
    var new_trip = {
      title: 'new_trip',
      img: '',
      date: new Date(),
      dateDebut: new Date(),
      dateFin: new Date()
    };

    TripService.add(new_trip);
    expect(TripService.all()).to.have.lengthOf(2);

    var new_day = {
      title: 'new_day',
      date: new Date(),
      dateShow: new Date(),
      comment: '',
      images: []
    };

    TripService.addDay(1, new_day);

    var day = TripService.getDay(1, 0);
    var title = day.title;

    expect(title).to.equal('new_day');

    var edited_day = {
      id: 0,
      title: 'Journée éditée',
      date: new Date(),
      dateShow: new Date(),
      comment: '',
      images: []
    };

    TripService.editDay(1, edited_day);
    var day = TripService.getDay(1, 0);
    var title = day.title;

    expect(title).to.equal('Journée éditée');
  })
  
  it("Affecte une photo par défaut sur un nouveau voyage", function () {
    var new_trip = {
      title: 'new_trip',
      img: '',
      date: '',
      dateDebut: new Date(),
      dateFin: ''
    };

    TripService.add(new_trip);
    expect(TripService.all()).to.have.lengthOf(2);

    var trip = TripService.get(1);
    var image_par_defaut = trip.img;

    expect(image_par_defaut).to.equal('img/trip/trip.jpg');
    
    var new_image = 'new_image';
    TripService.setDefaultImage(1, new_image);
    
    var nouveau_trip = TripService.get(1);
    var nouvelle_photo = nouveau_trip.img;

    expect(nouvelle_photo).to.equal('new_image');
  })  
});

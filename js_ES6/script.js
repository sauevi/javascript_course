const buildingsController = (() => {
  class Build {
    constructor(name, buildYear) {
      this.name = name;
      this.buildYear = buildYear;
    }

    getBuildName() {
      return this.name;
    }

    getBuildAge() {
      return new Date().getFullYear() - this.buildYear;
    }
  }

  class Park extends Build {
    constructor(name, buildYear, numberOfThrees, area) {
      super(name, buildYear);
      this.numberOfThrees = numberOfThrees;
      this.area = area;
    }

    calculateDensity() {
      return this.numberOfThrees / this.area;
    }

    printTreeDensity() {
      console.log(
        `the park ${this.name} has a tree density of ${this.calculateDensity()}`
      );
    }

    isForestPark() {
      return this.numberOfThrees > 1000 ? true : false;
    }

    getNumberOfThrees() {
      return this.numberOfThrees;
    }
  }

  class Street extends Build {
    constructor(name, buildYear, lenght, size = 'normal') {
      super(name, buildYear);
      this.lenght = lenght;
      this.size = size;
    }

    getSize() {
      return this.size;
    }

    getLenght() {
      return this.lenght;
    }

    printSizeClassification() {
      console.log(`the ${this.name}' String is ${this.size}`);
    }
  }

  return {
    getParks: () => {
      return [
        new Park('newPark', 2001, 15, 2.6),
        new Park('middlePark', 1992, 27, 4.6),
        new Park('oldPark', 1990, 45, 50),
        new Park('forestPark', 1990, 1500, 500)
      ];
    },
    getStreets: () => {
      return [
        new Street('tinyPark', 2001, 1.5, 'tiny'),
        new Street('smallPark', 1992, 2.3, 'small'),
        new Street('normalPark', 1994, 2.8),
        new Street('bigPark', 1220, 3.6, 'big'),
        new Street('hugePark', 1889, 5, 'huge')
      ];
    }
  };
})();

const mainController = (builtCtrl => {
  function generateParksReport(parks) {
    let forestPark;
    let parksAverageAge = 0;

    console.log('----------------🌳 Parks report 🌳----------------');

    parks.forEach(park => {
      parksAverageAge += park.getBuildAge();
      if (park.isForestPark()) {
        forestPark = park.getBuildName();
      }
    });

    console.log(
      `Our ${parks.length} has an average age of ${parksAverageAge} years, the park with more than 1000 trees is the ${forestPark}' park and the town's tree density is`
    );

    parks.forEach(park => park.printTreeDensity());
  }

  function generateStreetsRepor(streets) {
    const allStreetsLength = streets.length;

    const streetsTotalLength =
      streets
        .map(street => street.getLenght())
        .reduce((acc, curr) => acc + curr) / allStreetsLength;

    console.log('----------------🚶‍♂️ Streets Report 🚶‍♂️----------------');

    console.log(
      `Our ${allStreetsLength} streets has an average lengh of ${streetsTotalLength}, and the size classification is:`
    );

    streets.forEach(street => street.printSizeClassification());

    console.log('------------------------------------------------');
  }

  return {
    init: () => {
      const parks = builtCtrl.getParks();
      const streets = builtCtrl.getStreets();

      generateParksReport(parks);
      generateStreetsRepor(streets);
    }
  };
})(buildingsController);

mainController.init();

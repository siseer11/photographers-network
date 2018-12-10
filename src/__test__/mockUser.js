export default function makeUser({
  type = "photographer",
  profileImageUrl = "e.jpg",
  uid = "zzz",
  firstName = "S",
  lastName = "S",
  hireable = true,
  premium = true,
  companyName = "S.co",
  home = true
}) {
  class User {
    constructor() {
      (this.profileImageUrl = profileImageUrl),
        (this.uid = uid),
        (this.locations = {
          a1a: {
            city: "S",
            country: "S",
            home: home,
            streetName: "S",
            streetNumber: 85,
            geolocation: {
              _lat: 31,
              _long: -60
            }
          }
        });
    }
  }

  if (type === "photographer") {
    class Photographer extends User {
      constructor() {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.type = "photographer";
        this.hireable = hireable;
        this.premium = premium;
        this.finishedJobs = 0;
      }
    }
    return new Photographer();
  } else {
    class Company extends User {
      constructor() {
        super();
        this.companyName = companyName;
        this.type = "company";
      }
    }
    return new Company();
  }
}

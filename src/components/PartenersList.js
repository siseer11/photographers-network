import React from "react";

const parteners = [
  {
    img: "http://www.globuzzer.com/images/logo-university-partner.png",
    link: "http://www.uksw.edu/en.php",
    alt: "University logo"
  },
  {
    img: "http://www.globuzzer.com/images/KTH-partner.png",
    link: "https://www.kth.se/",
    alt: "KTH logo"
  },
  {
    img: "http://www.globuzzer.com/images/Frii-Designs-partner.png",
    link: "Frii design logo",
    alt: "http://www.friidesigns.com"
  },
  {
    img: "http://www.globuzzer.com/images/viking-line-partner.png",
    link: "https://www.vikingline.fi/",
    alt: "Vikingline logo"
  },
  {
    img: "http://www.globuzzer.com/images/mighty-network-partner.png",
    link: "Mighty network logo",
    alt: "https://mightynetworks.com/"
  }
];

export const PartenersList = () => (
  <React.Fragment>
    <div className="gb-images-inline-container gb-margin-bottom-40">
      {parteners.map((el, idx) => (
        <div key={idx} className="gb-images-inline">
          <a target="_blank" href={el.link}>
            <img src={el.img} alt={el.alt} />
          </a>
        </div>
      ))}
    </div>
  </React.Fragment>
);

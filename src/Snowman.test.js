import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";

import "./Snowman.css";
import img0 from "./0.png";
import img1 from "./1.png";
import img2 from "./2.png";
import img3 from "./3.png";
import img4 from "./4.png";
import img5 from "./5.png";
import img6 from "./6.png";


describe("Snowman component functionality", function () {

  test("Image should display even after 6 wrong guesses are made", function () {

    // make a snowman game that has 7 wrong guesses
    // query select for an image

    const { container } = render(
      <Snowman
        images={ [img0, img1, img2, img3, img4, img5, img6] }
        words={ ["apple"] }
        maxWrong={ 6 }/>
    );


    // check whether HTML contains an image
    // check whether HTML contains an alt tag (our snowman images all have
    // alt tags & for accessibility all images should have alt tags so this
    // seems reasonable)

    // Check whether image is in the document
    expect(
      container.querySelector("img")
    ).toBeInTheDocument();


  })


})
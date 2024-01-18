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


describe('smoke test', function() {
  test('image is present', function() {

    const { container } = render(
      <Snowman />
    );

    expect(container.querySelector('img')).toBeInTheDocument();
  });
});

describe('snapshot test for working loss display', function() {
  test('properly renders when someone has lost game', function() {

    const { container } = render(
      <Snowman
        images={ [img0, img1, img2, img3, img4, img5, img6] }
        words={ ["apple"] }
        maxWrong={ 6 }/>
    );

    const letterB = container.querySelector('#b');
    const letterC = container.querySelector('#c');
    const letterD = container.querySelector('#d');
    const letterF = container.querySelector('#f');
    const letterG = container.querySelector('#g');
    const letterX = container.querySelector('#x');

    fireEvent.click(letterB);
    fireEvent.click(letterC);
    fireEvent.click(letterD);
    fireEvent.click(letterF);
    fireEvent.click(letterG);
    fireEvent.click(letterX);

    expect(container.querySelector('.letter')).not.toBeInTheDocument();
    expect(container.querySelector("img")).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
})


describe("Snowman component functionality", function () {

  test("Image should display even after 6 wrong guesses are made", function () {

    // make a snowman game that has 6 wrong guesses

    const { container } = render(
      <Snowman
        images={ [img0, img1, img2, img3, img4, img5, img6] }
        words={ ["apple"] }
        maxWrong={ 6 }/>
    );

    const letterB = container.querySelector('#b');
    const letterC = container.querySelector('#c');
    const letterD = container.querySelector('#d');
    const letterF = container.querySelector('#f');
    const letterG = container.querySelector('#g');
    const letterX = container.querySelector('#x');

    fireEvent.click(letterB);
    fireEvent.click(letterC);
    fireEvent.click(letterD);
    fireEvent.click(letterF);
    fireEvent.click(letterG);
    fireEvent.click(letterX);


    // make sure none of the buttons with the class 'letter' appear
    expect(container.querySelector('.letter')).not.toBeInTheDocument();

    // make sure the image still remains (before it disappeared)
    expect(container.querySelector("img")).toBeInTheDocument();
  });
})

// TODO: check out solution for more ideas of how to test
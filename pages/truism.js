import React from "react";
import Head from "next/head";
import Link from "next/link";
import truisms from "../truisms.json";

export default class Truism extends React.Component {
  state = {
    flip: false
  };
  flip = () => {
    this.setState(
      ({ flip }) => ({
        flip: !flip
      }),
      () => this.draw()
    );
  };
  componentWillReceiveProps() {
    this.draw();
  }
  componentDidMount() {
    this.draw();
  }
  draw() {
    if (typeof document === 'undefined') return;
    const colors = this.state.flip ? ["#fff", "#000"] : ["#000", "#fff"];
    const { url: { query: { i } } } = this.props;
    const canvas = document.createElement('canvas');
    const truism = truisms[i];
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = colors[0];
    ctx.fillRect(0, 0, window.innerWidth * 2, window.innerHeight * 2);
    ctx.fillStyle = colors[1];
    ctx.font = "70px Futura";
    // wrapping text
    let words = truism.split(/\s+/);
    let lines = [];
    let line = [];
    for (let word of words) {
      let newWidth = ctx.measureText(line.concat(word).join(" ")).width;
      if (newWidth > window.innerWidth) {
        lines.push(line);
        line = [word];
      } else {
        line.push(word);
      }
    }
    ctx.translate(0, window.innerHeight / 1.35);
    lines.push(line);
    lines.forEach((line, i) => {
      let joinedLine = line.join(" ").toUpperCase();
      let leftOffset =
        (window.innerWidth * 2 - ctx.measureText(joinedLine).width) / 2;
      ctx.fillText(joinedLine, leftOffset, i * 90);
    });
    this.setState({
      img: canvas.toDataURL()
    });
  }
  render() {
    const { url: { query: { i } } } = this.props;
    const {img} = this.state;
    const truism = truisms[i];
    return (
      <div>
        <Head>
          <title>{truism.toUpperCase()}</title>
        </Head>
        <img className="w-100 vh-100" src={img} />
        <a href={img} className="white pa3 db no-underline pointer bt b--white" download={truism.replace(/[^A-Za-z]/g, '')}>
          Download
        </a>
        <a className="white pa3 db no-underline pointer" onClick={this.flip}>
          Flip
        </a>
        <Link href="/">
          <div className="white pa3 pointer">Back</div>
        </Link>
        <div className='bt b--white ph3 pt3 pb5'>
          iOS: long-press, hit 'save image', go to settings → wallpaper<br /><br />
          Android: save image, long-press on empty space on homescreen, pick wallpapers, set wallpaper
        </div>
      </div>
    );
  }
}

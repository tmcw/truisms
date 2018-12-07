import React from "react";
import Head from "next/head";
import Link from "next/link";
import render from "../lib/render";
import truisms from "../truisms.json";
import { withRouter } from "next/router";

export default withRouter(
  class Truism extends React.Component {
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
      if (typeof document === "undefined") return;
      const colors = this.state.flip ? ["#fff", "#000"] : ["#000", "#fff"];
      const {
        router: {
          query: { i }
        }
      } = this.props;
      const canvas = document.createElement("canvas");
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const truism = truisms[i];
      render(canvas, truism, colors, window);
      this.setState({
        img: canvas.toDataURL()
      });
    }
    render() {
      const {
        router: {
          query: { i }
        }
      } = this.props;
      const { img } = this.state;
      const truism = truisms[i];
      return (
        <div>
          <Head>
            <title>{truism.toUpperCase()}</title>
          </Head>
          <img className="w-100 vh-100" src={img} />
          <a
            href={img}
            className="white pa3 db no-underline pointer bt b--white"
            download={truism.replace(/[^A-Za-z]/g, "")}
          >
            Download
          </a>
          <a className="white pa3 db no-underline pointer" onClick={this.flip}>
            Flip
          </a>
          <Link href="/">
            <div className="white pa3 pointer">Back</div>
          </Link>
          <div className="bt b--white ph3 pt3 pb5">
            iOS: long-press, hit 'save image', go to settings → wallpaper
            <br />
            <br />
            Android: save image, long-press on empty space on homescreen, pick
            wallpapers, set wallpaper
          </div>
        </div>
      );
    }
  }
);

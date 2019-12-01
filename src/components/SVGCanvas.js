import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SVGCanvas.scss';
import { getLine } from '../lib/models';
import { parse, stringify } from 'svgson';
import Parser from 'html-react-parser';

class SVGCanvas extends Component {
  ref = React.createRef();
  state = {
    crntShape: null,
  };

  getAbspos({ clientX, clientY }) {
    console.log(this.ref);
    const { top, left } = this.ref.current.getBoundingClientRect();

    return { x: clientX - left, y: clientY - top };
  }

  handleMouseDown(e) {
    const { crntShape } = this.state;
    const { shiftKey } = e;
    const { x: x1, y: y1 } = this.getAbspos(e);
    if (crntShape) {
      this.setState(() => ({ crntShape: null }));
    } else {
      this.setState(s => {
        const obj = {
          id: Date.now(),
          type: this.props.selectedTool,
          stroke: this.props.selectedColor,
          width: this.props.selectedSize,
          x1: x1,
          y1: y1,
          x2: x1,
          y2: y1,
          locked: shiftKey,
        };

        return {
          crntShape: obj,
        };
      });
    }
  }

  handleMouseMove(e) {
    const { crntShape } = this.state;
    console.log(crntShape);
    if (crntShape) {
      const { x: x2, y: y2 } = this.getAbspos(e);
      const obj = {
        x2,
        y2,
        locked: e.shiftKey,
      };
      console.log(obj);

      this.setState(s => {
        return {
          crntShape: { ...s.crntShape, ...obj },
        };
      });
    }
  }

  render() {
    console.log(stringify(this.props.objs));
    return (
      <svg
        className="Svg"
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        ref={this.ref}
      >
        {this.props.objs.map(e => Parser(stringify(e)))}
        {this.state.crntShape !== null ? getLine(this.state.crntShape) : null}
      </svg>
    );
  }
}

let mapStateToProps = ({ svgcanvas }) => ({
  objs: svgcanvas.obj.children,
  selectedColor: svgcanvas.selectedColor,
  selectedTool: svgcanvas.selectedTool,
  selectedSize: svgcanvas.selectedSize,
});

export default connect(mapStateToProps)(SVGCanvas);

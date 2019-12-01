import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SVGCanvas.scss';
import { getLine } from '../lib/models';
import { parse, stringify } from 'svgson';
import Parser from 'html-react-parser';

import { addShape } from '../modules/svgcanvas';

class SVGCanvas extends Component {
  // Svg영역 가져오는 코드
  ref = React.createRef();
  state = {
    crntShape: null,
  };
  // svg내의 위치 잡기
  getAbspos({ clientX, clientY }) {
    const { top, left } = this.ref.current.getBoundingClientRect();

    return { x: clientX - left, y: clientY - top };
  }

  handleMouseDown(e) {
    const { crntShape } = this.state;
    const { shiftKey } = e;
    const { x: x1, y: y1 } = this.getAbspos(e);
    if (crntShape) {
      this.props.addShape(this.state.crntShape);
      this.setState(() => ({ crntShape: null }));
    } else {
      this.setState(s => {
        const obj = {
          name: 'line',
          type: 'element',
          value: '',
          attributes: {
            stroke: this.props.selectedColor,
            'stroke-width': this.props.selectedSize,
            x1: x1,
            y1: y1,
            x2: x1,
            y2: y1,
          },
          children: [],
        };

        // const obj = {
        //   id: Date.now(),
        //   type: this.props.selectedTool,
        //   stroke: this.props.selectedColor,
        //   width: this.props.selectedSize,
        //   x1: x1,
        //   y1: y1,
        //   x2: x1,
        //   y2: y1,
        //   locked: shiftKey,
        // };

        return {
          crntShape: obj,
        };
      });
    }
  }

  handleMouseMove(e) {
    const { crntShape } = this.state;
    if (crntShape) {
      const { x: x2, y: y2 } = this.getAbspos(e);
      const obj = {
        x2,
        y2,
      };
      this.setState(s => {
        return {
          crntShape: {
            ...s.crntShape,
            attributes: { ...s.crntShape.attributes, ...obj },
          },
        };
      });
    }
  }

  render() {
    return (
      <svg
        className="Svg"
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        // 여기서 Svg의 영역을 잡아준다.
        ref={this.ref}
      >
        {this.props.objs[this.props.currentStep].map(e => Parser(stringify(e)))}
        {this.state.crntShape !== null
          ? Parser(stringify(this.state.crntShape))
          : null}
      </svg>
    );
  }
}

let mapStateToProps = ({ svgcanvas }) => ({
  objs: svgcanvas.obj,
  currentStep: svgcanvas.currentStep,
  selectedColor: svgcanvas.selectedColor,
  selectedTool: svgcanvas.selectedTool,
  selectedSize: svgcanvas.selectedSize,
});
const mapFunction = {
  addShape,
};

export default connect(mapStateToProps, mapFunction)(SVGCanvas);

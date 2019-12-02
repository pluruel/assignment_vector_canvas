import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SVGCanvas.scss';
import { createLine, createRect, createTempRect } from '../lib/models';
import { stringify } from 'svgson';
import Parser from 'html-react-parser';

import { addShape } from '../modules/svgcanvas';

class SVGCanvas extends Component {
  // Svg영역 가져오는 코드
  ref = React.createRef();
  state = {
    crntShape: null,
    // 첫 클릭 시 선택값
    sx: null,
    sy: null,
  };
  // svg내의 위치 잡기
  getAbspos({ clientX, clientY }) {
    const { top, left } = this.ref.current.getBoundingClientRect();

    return { x: clientX - left, y: clientY - top };
  }

  handleMouseDown(e) {
    const { crntShape } = this.state;

    const { x: x1, y: y1 } = this.getAbspos(e);
    if (crntShape) {
      this.props.addShape(this.state.crntShape);
      this.setState(() => ({ crntShape: null }));
    } else {
      this.setState({ sx: x1, sy: y1 });

      this.setState(s => {
        let obj = null;

        switch (this.props.selectedTool) {
          case 'line':
            obj = createLine({
              x1: x1,
              y1: y1,
              stroke: this.props.selectedColor,
              strokeWidth: this.props.selectedSize,
            });
            break;
          case 'rect':
            obj = createRect({
              x: x1,
              y: y1,
              fill: this.props.selectedColor,
            });
            break;
          default:
            obj = null;
        }
        return {
          ...s,
          crntShape: obj,
        };
      });
    }
  }

  handleMouseMove(e) {
    const { crntShape } = this.state;
    const { x: x2, y: y2 } = this.getAbspos(e);
    if (crntShape) {
      switch (this.props.selectedTool) {
        case 'line': {
          const obj = {
            x2,
            y2,
          };
          this.setState(s => ({
            crntShape: {
              ...s.crntShape,
              attributes: { ...s.crntShape.attributes, ...obj },
            },
          }));
          break;
        }
        case 'rect': {
          const obj = createTempRect({
            x1: this.state.sx,
            y1: this.state.sy,
            x2,
            y2,
          });
          this.setState(s => ({
            crntShape: {
              ...s.crntShape,
              attributes: { ...s.crntShape.attributes, ...obj },
            },
          }));
          break;
        }
        default:
          break;
      }
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

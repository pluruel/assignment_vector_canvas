import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SVGCanvas.scss';
import {
  createLine,
  createRect,
  createTempRect,
  createEllipse,
  createTempEllipse,
} from '../lib/models';
import { parse, stringify } from 'svgson';
import Parser from 'html-react-parser';

import { addShape, remove } from '../modules/svgcanvas';

class SVGCanvas extends Component {
  // Svg영역 가져오는 코드
  ref = React.createRef();
  state = {
    crntShape: null,
    erasorMouseDown: false,
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
    this.setState({ erasorMouseDown: true });
    const { x: x1, y: y1 } = this.getAbspos(e);

    if (crntShape) {
      this.state.crntShape['id'] = this.props.objidx;
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
          case 'ellipse':
            obj = createEllipse({
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
        case 'ellipse': {
          const obj = createTempEllipse({
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

  onClick(e) {
    console.log(e.id);
    return this.props.selectedTool === 'eraser' && this.state.erasorMouseDown
      ? this.props.remove(e.id)
      : null;
  }

  handleMouseUp() {
    this.setState({ erasorMouseDown: false });
  }

  render() {
    return (
      <svg
        className="Svg"
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseUp={this.handleMouseUp.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        // 여기서 Svg의 영역을 잡아준다.
        ref={this.ref}
      >
        {this.props.objs[this.props.currentStep].map((e, idx) => {
          // 각각의 svg객체를 그룹으로 감싸고 인덱스를 부여
          return (
            <g key={e.id} onMouseOver={() => this.onClick(e)}>
              {Parser(stringify(e))}
            </g>
          );
        })}
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
  objidx: svgcanvas.objidx,
});
const mapFunction = {
  addShape,
  remove,
};

export default connect(mapStateToProps, mapFunction)(SVGCanvas);

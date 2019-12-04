import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SVGCanvas.scss';
import {
  createLine,
  createRect,
  createTempRect,
  createEllipse,
  createTempEllipse,
  createCircle,
  createTempCircle,
  createPolygon,
  createTempPolygon,
} from '../lib/models';
import { parse, stringify } from 'svgson';

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

  saveCrntShape() {
    this.state.crntShape['id'] = this.props.objidx;
    this.props.addShape(this.state.crntShape);
    this.state.crntShape = null;
  }

  handleMouseDown(e) {
    const { crntShape } = this.state;
    this.setState({ erasorMouseDown: true });
    const { x: x1, y: y1 } = this.getAbspos(e);

    if (crntShape) {
      if (this.props.selectedTool === 'polygon') {
        this.setState(s => ({
          crntShape: {
            ...s.crntShape,
            attributes: {
              ...s.crntShape.attributes,
              points: s.crntShape.attributes.points.concat(` ${x1} ${y1}`),
            },
          },
        }));
        return;
      }

      this.state.crntShape['id'] = this.props.objidx;

      this.saveCrntShape();
    } else {
      this.setState({ sx: x1, sy: y1 });
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
        case 'circle':
          obj = createCircle({
            x: x1,
            y: y1,
            fill: this.props.selectedColor,
          });
          break;
        case 'polygon':
          obj = createPolygon({
            x: x1,
            y: y1,
            fill: this.props.selectedColor,
            strokeWidth: this.props.selectedSize,
          });
          break;
        default:
          obj = null;
      }
      this.setState(s => ({
        ...s,
        crntShape: obj,
      }));
    }
  }

  handleMouseRightClick() {
    if (this.props.selectedTool === 'polygon' && this.state.crntShape) {
      this.saveCrntShape();
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
        case 'circle': {
          const obj = createTempCircle({
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
    return this.props.selectedTool === 'eraser' && this.state.erasorMouseDown
      ? this.props.remove(e.id)
      : null;
  }

  handleMouseUp() {
    this.setState({ erasorMouseDown: false });
  }

  render() {
    const svgattr = this.props.svg.attributes;

    return (
      <svg
        className="Canvas"
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseUp={this.handleMouseUp.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        onContextMenu={this.handleMouseRightClick.bind(this)}
        // 여기서 Svg의 영역을 잡아준다.
        ref={this.ref}
        style={{ backgroundColor: '#dddddd' }}
      >
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          x={svgattr.x}
          y={svgattr.y}
          width={svgattr.width}
          height={svgattr.height}
          viewBox={svgattr.viewBox}
        >
          <rect width="100%" height="100%" fill="white" />

          {this.props.objs[this.props.currentStep].map((e, idx) => {
            // 각각의 svg객체를 그룹으로 감싸고 인덱스를 부여
            return (
              <g
                key={e.id}
                onMouseOver={() => this.onClick(e)}
                dangerouslySetInnerHTML={{ __html: stringify(e) }}
              />
            );
          })}
          {this.state.crntShape !== null ? (
            <g
              // onMouseOver={() => this.onClick(this.state.crntShape)}
              dangerouslySetInnerHTML={{
                __html: stringify(this.state.crntShape),
              }}
            />
          ) : null}
        </svg>
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
  svg: svgcanvas.svg,
});
const mapFunction = {
  addShape,
  remove,
};

export default connect(mapStateToProps, mapFunction)(SVGCanvas);

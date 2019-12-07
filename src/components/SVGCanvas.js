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
  createPolyline,
} from '../lib/models';
import { stringify } from 'svgson';

import { addShape, remove, changeCanvasView } from '../modules/svgcanvas';
import { move } from '../lib/functions';

class SVGCanvas extends Component {
  // Svg영역 가져오는 코드
  ref = React.createRef();
  state = {
    crntShape: null,
    isMouseDown: false,
    // 첫 클릭 시 선택값
    sx: null,
    sy: null,
    initViewBox: null,
  };
  // svg내의 위치 잡기
  getAbspos({ clientX, clientY }) {
    const { top, left } = this.ref.current.getBoundingClientRect();
    return { x: clientX - left, y: clientY - top };
  }

  // 저장 로직
  // setState는 비동기이기 때문에 현재 저장된 폼을 스프레드로 뿌리고 id만 추가하여 Shape 에 추가
  saveCrntShape() {
    this.props.addShape({ ...this.state.crntShape, id: this.props.objidx });
    this.setState({ crntShape: null });
  }

  handleMouseDown(e) {
    const { crntShape } = this.state;
    this.setState({ isMouseDown: true });
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
            stroke: this.props.selectedColor,
            strokeWidth: this.props.selectedSize,
          });
          break;
        case 'ellipse':
          obj = createEllipse({
            x: x1,
            y: y1,
            stroke: this.props.selectedColor,
            strokeWidth: this.props.selectedSize,
          });
          break;
        case 'circle':
          obj = createCircle({
            x: x1,
            y: y1,
            stroke: this.props.selectedColor,
            strokeWidth: this.props.selectedSize,
          });
          break;
        case 'polygon':
          obj = createPolygon({
            x: x1,
            y: y1,
            stroke: this.props.selectedColor,
            strokeWidth: this.props.selectedSize,
          });
          break;
        case 'polyline':
          obj = createPolyline({
            x: x1,
            y: y1,
            stroke: this.props.selectedColor,
            strokeWidth: this.props.selectedSize,
          });
          break;
        case 'mover':
          this.setState({
            initViewBox: this.props.svg.attributes.viewBox,
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
    if (this.state.isMouseDown) {
      if (this.props.selectedTool === 'mover') {
        this.props.changeCanvasView(
          move({
            x1: this.state.sx,
            y1: this.state.sy,
            x2,
            y2,
            viewBox: this.state.initViewBox,
          }),
        );
      } else if (this.props.selectedTool === 'polyline' && crntShape) {
        this.setState(s => ({
          crntShape: {
            ...s.crntShape,
            attributes: {
              ...s.crntShape.attributes,
              points: s.crntShape.attributes.points.concat(` ${x2} ${y2}`),
            },
          },
        }));
      }
    } else if (crntShape) {
      let obj = null;
      switch (this.props.selectedTool) {
        case 'line': {
          obj = {
            x2,
            y2,
          };
          break;
        }
        case 'rect': {
          obj = createTempRect({
            x1: this.state.sx,
            y1: this.state.sy,
            x2,
            y2,
          });
          break;
        }
        case 'ellipse': {
          obj = createTempEllipse({
            x1: this.state.sx,
            y1: this.state.sy,
            x2,
            y2,
          });
          break;
        }
        case 'circle': {
          obj = createTempCircle({
            x1: this.state.sx,
            y1: this.state.sy,
            x2,
            y2,
          });
          break;
        }

        default:
          break;
      }
      if (obj) {
        this.setState(s => ({
          crntShape: {
            ...s.crntShape,
            attributes: { ...s.crntShape.attributes, ...obj },
          },
        }));
      }
    }
  }

  handleMouseOver(e) {
    return this.props.selectedTool === 'eraser' && this.state.isMouseDown
      ? this.props.remove(e.id)
      : null;
  }

  handleMouseUp() {
    this.setState({ isMouseDown: false });
    if (this.props.selectedTool === 'polyline') {
      this.saveCrntShape();
    }
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
                onMouseOver={() => this.handleMouseOver(e)}
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
  changeCanvasView,
};

export default connect(mapStateToProps, mapFunction)(SVGCanvas);

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

import {
  addShape,
  remove,
  changeCanvasView,
  setZoomRatio,
  setCrntShape,
  addPolyPoints,
  fixAttrCrntShape,
} from '../modules/svgcanvas';
import { move, revisePosition, zoomout, zoomin } from '../lib/functions';

class SVGCanvas extends Component {
  // Svg영역 가져오는 코드
  ref = React.createRef();
  state = {
    isMouseDown: false,
    // 첫 클릭 시 선택값
    sx: null,
    sy: null,
    initViewBox: null,
  };
  // Main svg내의 위치 잡기
  getAbspos({ clientX, clientY }) {
    const { top, left } = this.ref.current.getBoundingClientRect();

    return { x: clientX - left, y: clientY - top };
  }

  // 기준좌표 보정, 배율 보정 값 (그리기용)
  getRevisedAbspos({ clientX, clientY }) {
    const { top, left } = this.ref.current.getBoundingClientRect();
    const { xdiff, ydiff } = revisePosition(this.props.svg.attributes.viewBox);
    const { zoomRatio } = this.props;

    return {
      x: (clientX - left) / zoomRatio + xdiff,
      y: (clientY - top) / zoomRatio + ydiff,
    };
  }

  // 저장 로직
  // setState는 비동기이기 때문에 현재 저장된 폼을 스프레드로 뿌리고 id만 추가하여 Shape 에 추가
  saveCrntShape() {
    this.props.addShape({ ...this.props.crntShape, id: this.props.objidx });
    this.props.setCrntShape(null);
  }

  handleMouseDown(e) {
    const { crntShape } = this.props;
    this.setState({ isMouseDown: true });
    const { x: rx, y: ry } = this.getRevisedAbspos(e);
    const { x, y } = this.getAbspos(e);
    if (crntShape) {
      if (this.props.selectedTool === 'polygon') {
        this.props.addPolyPoints(` ${rx} ${ry}`);
        return;
      }
      this.saveCrntShape();
    } else {
      this.setState({ sx: rx, sy: ry });
      let obj = null;

      switch (this.props.selectedTool) {
        case 'line':
          obj = createLine({
            x1: rx,
            y1: ry,
            stroke: this.props.selectedColor,
            strokeWidth: this.props.selectedSize,
          });
          break;
        case 'rect':
          obj = createRect({
            x: rx,
            y: ry,
            stroke: this.props.selectedColor,
            strokeWidth: this.props.selectedSize,
          });
          break;
        case 'ellipse':
          obj = createEllipse({
            x: rx,
            y: ry,
            stroke: this.props.selectedColor,
            strokeWidth: this.props.selectedSize,
          });
          break;
        case 'circle':
          obj = createCircle({
            x: rx,
            y: ry,
            stroke: this.props.selectedColor,
            strokeWidth: this.props.selectedSize,
          });
          break;
        case 'polygon':
          obj = createPolygon({
            x: rx,
            y: ry,
            stroke: this.props.selectedColor,
            strokeWidth: this.props.selectedSize,
          });
          break;
        case 'polyline':
          obj = createPolyline({
            x: rx,
            y: ry,
            stroke: this.props.selectedColor,
            strokeWidth: this.props.selectedSize,
          });
          break;
        case 'mover':
          this.setState({ sx: x, sy: y });
          this.setState({
            initViewBox: this.props.svg.attributes.viewBox,
          });
          break;
        case 'zoomin':
          this.props.changeCanvasView(
            zoomin({ x, y, viewBox: this.props.svg.attributes.viewBox }),
          );
          this.props.setZoomRatio(this.props.zoomRatio * 2);
          break;
        case 'zoomout':
          this.props.changeCanvasView(
            zoomout({ x, y, viewBox: this.props.svg.attributes.viewBox }),
          );
          this.props.setZoomRatio(this.props.zoomRatio / 2);
          break;
        default:
          obj = null;
      }
      if (obj) {
        this.props.setCrntShape(obj);
      }
    }
  }

  handleMouseRightClick() {
    if (this.props.selectedTool === 'polygon' && this.props.crntShape) {
      this.saveCrntShape();
    }
  }

  handleMouseMove(e) {
    const { crntShape } = this.props;
    const { x: x2, y: y2 } = this.getAbspos(e);
    const { x: rx, y: ry } = this.getRevisedAbspos(e);

    if (this.state.isMouseDown) {
      if (this.props.selectedTool === 'mover') {
        this.props.changeCanvasView(
          move({
            x1: this.state.sx,
            y1: this.state.sy,
            x2,
            y2,
            viewBox: this.state.initViewBox,
            zoomRatio: this.props.zoomRatio,
          }),
        );
      } else if (this.props.selectedTool === 'polyline' && crntShape) {
        this.props.addPolyPoints(` ${rx} ${ry}`);
      }
    } else if (crntShape) {
      let obj = null;
      switch (this.props.selectedTool) {
        case 'line': {
          obj = {
            x2: rx,
            y2: ry,
          };
          break;
        }
        case 'rect': {
          obj = createTempRect({
            x1: this.state.sx,
            y1: this.state.sy,
            x2: rx,
            y2: ry,
          });
          break;
        }
        case 'ellipse': {
          obj = createTempEllipse({
            x1: this.state.sx,
            y1: this.state.sy,
            x2: rx,
            y2: ry,
          });
          break;
        }
        case 'circle': {
          obj = createTempCircle({
            x1: this.state.sx,
            y1: this.state.sy,
            x2: rx,
            y2: ry,
          });
          break;
        }

        default:
          break;
      }
      if (obj) {
        this.props.fixAttrCrntShape(obj);
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
          <rect
            x={svgattr.x}
            y={svgattr.y}
            width={svgattr.width}
            height={svgattr.height}
            fill="white"
          />

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
          {this.props.crntShape !== null ? (
            <g
              // onMouseOver={() => this.onClick(this.state.crntShape)}
              dangerouslySetInnerHTML={{
                __html: stringify(this.props.crntShape),
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
  zoomRatio: svgcanvas.zoomRatio,
  crntShape: svgcanvas.crntShape,
});
const mapFunction = {
  addShape,
  remove,
  changeCanvasView,
  setZoomRatio,
  setCrntShape,
  addPolyPoints,
  fixAttrCrntShape,
};

export default connect(mapStateToProps, mapFunction)(SVGCanvas);

import React from 'react';
import { connect } from 'react-redux';
import './SVGCanvas.scss';

class SVGCanvas extends React.Component {
  svgRef = React.createRef();

  getCoords({ currentX, currentY }) {
    const { top, left } = this.svgRef.current.getBoundingClientRect();
    return { x: currentX - left, y: currentY - top };
  }

  handleMouseDown(e) {
    const { shiftKey } = e;
    const { x: xStart, y: yStart } = this.getCoords(e);

    if (this.state.tool === 'rect') {
      this.setState(s => {
        const obj = {
          id: Date.now(),
          type: 'rect',
          // bg:
          //   'rgb(' +
          //   [
          //     Math.round(Math.random() * 255),
          //     Math.round(Math.random() * 255),
          //     Math.round(Math.random() * 255),
          //   ] +
          //   ')',
          xStart,
          yStart,
          xEnd: xStart,
          yEnd: yStart,
          locked: shiftKey,
        };
        return {
          objects: [...s.objects, obj],
          rectObject: obj.id,
        };
      });
    }
  }

  render() {
    console.log(this.props.objs);
    return <svg className="Svg"></svg>;
  }
}

let mapStateToProps = ({ svgcanvas }) => ({
  objs: svgcanvas.objs,
  selectedColor: svgcanvas.selectedColor,
  selectedTool: svgcanvas.selectedTool,
});

export default connect(mapStateToProps)(SVGCanvas);

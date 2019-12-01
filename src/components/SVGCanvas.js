import React from 'react';
import { connect } from 'react-redux';
import './SVGCanvas.scss';

class SVGCanvas extends React.Component {
  render() {
    console.log(this.props.objs);
    return <svg className="Svg"></svg>;
  }
}

let mapStateToProps = ({ svgcanvas }) => ({
  objs: svgcanvas.objs,
});

export default connect(mapStateToProps)(SVGCanvas);

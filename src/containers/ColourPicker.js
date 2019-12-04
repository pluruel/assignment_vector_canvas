import React from 'react';
import { PhotoshopPicker } from 'react-color';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { selectColor, openColourSelector } from '../modules/svgcanvas';
import { highlightTrailingWhitespace } from 'jest-matcher-utils';

const ModalOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`;

const Modal = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  left: 50%;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
`;

class ColourPicker extends React.Component {
  state = {
    background: '#fff',
  };

  handleChangeComplete = (color, event) => {
    console.log(event);
    this.setState({ background: color.hex });
  };

  handleOnAccept(e) {
    console.log(this);
    return this.props.openColourSelector();
  }

  render() {
    return (
      <React.Fragment>
        <ModalOverlay>
          <Modal>
            <PhotoshopPicker
              color={this.state.background}
              onChangeComplete={this.handleChangeComplete}
              onAccept={this.handleOnAccept}
            />
          </Modal>
        </ModalOverlay>
      </React.Fragment>
    );
  }
}

let mapStateToProps = ({ svgcanvas }) => ({
  selectedColor: svgcanvas.selectedColor,
  pickerOpened: svgcanvas.pickerOpened,
});

const mapFunction = {
  selectColor,
  openColourSelector,
};

export default connect(mapStateToProps, mapFunction)(ColourPicker);

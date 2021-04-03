import * as React from 'react';
import * as BaseModal from 'react-modal';

import { connect } from 'react-redux';
import { BoardModel } from '../types/BoardModel';
import { displayDate, displayTooltip } from '../utils';

import CommonBoard from './CommonBoard';
import Tweet from './Tweet'

interface ModalProps {
  isOpen: boolean;
  board?: BoardModel;

  handleCloseModal: any;
}


class Modal extends React.Component<ModalProps, any> {
  constructor(props) {
    super(props);
  }

  afterOpen() {}

  closeModal() {}

  boardIsQuote(): boolean {
    const { board } = this.props;
    return !!(board?.origin_board && board?.body);
  }

  customStyle() {
    return {
      content: {
        width: '600px',
        inset: 'unset',
        insetBlockStart: '5%',
        insetInlineStart: '50%',
        transform: 'translateX(-50%)',
        padding: '20px 10px'
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      },
    };
  }

  render() {
    return (
      <BaseModal
        isOpen={this.props.isOpen}
        onAfterOpen={this.afterOpen}
        onRequestClose={this.props.handleCloseModal}
        style={this.customStyle()}
        contentLabel="sample Label"
        ariaHideApp={false}
      >
        <div className="modal-container">
          <CommonBoard
            board={this.props.board}
            isQuote={this.boardIsQuote()}
            isReply={true}
          />
          <Tweet

          />
        </div>
      </BaseModal>
    );
  }
}

export default Modal;

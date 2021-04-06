import * as React from 'react';
import * as BaseModal from 'react-modal';

import { connect } from 'react-redux';
import { BoardModel } from '../../types';
import { displayDate, displayTooltip } from '../utils';

import CommonBoard from './CommonBoard';
import SendTweet from './SendTweet';

interface ModalProps {
  isOpen: boolean;
  board?: BoardModel;

  handleCloseModal: any;
  isNotReply: boolean;
  handleRedraw?: () => void;
}

class Modal extends React.Component<ModalProps, any> {
  constructor(props) {
    super(props);
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
        <div className="header-modal">
          <div
            className="cancel-btn-wrapper"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title={displayTooltip('cancel')}
            onClick={this.props.handleCloseModal}
          >
            <span className="cancel-btn">
              ×
            </span>
          </div>
          <div className="unsend-btn">未送信ツイート</div>
        </div>
        {this.props.board && (
          <div className="modal-content-container">
            <CommonBoard
              board={this.props.board}
              isQuote={this.boardIsQuote()}
              isReply={true}
              isModal={true}
            />
          </div>
        )}
        <SendTweet
          isNotReply={this.props.isNotReply}
          isModal={true}
          reply_board={this.props.board}
          // handleRedraw={this.handleRedrawAndCloseModal}
          handleRedraw={this.handleRedrawAndCloseModal.bind(this)}
        />
      </BaseModal>
    );
  }

  handleRedrawAndCloseModal() {
    this.props.handleRedraw()
    this.props.handleCloseModal()
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
        padding: '0',
        borderRadius: '15px',
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      },
    };
  }
}

export default Modal;

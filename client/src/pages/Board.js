import React from 'react';
import { css } from 'emotion';
import MemberController from 'components/MemberController/MemberController';

const Board = () => {
  const styled = styles();

  return (
    <div className={styled['Board']}>
      <div className={styled['member_controller']}>
        <MemberController />
      </div>
      <div className={styled['message_controller']}>聊天內容</div>
    </div>
  );
};

// css
function styles() {
  return {
    Board: css`
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
      height: 100%;
    `,

    member_controller: css`
      width: 320px;
    `,

    message_controller: css`
      flex: 1;
    `
  };
}

export default Board;

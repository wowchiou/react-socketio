import React from 'react';
import { css } from 'emotion';

const MemberController = () => {
  const styled = styles();

  return (
    <div className={styled['MemberController']}>
      <ul className={styled['clients']}>
        <li className={styled['clinet']}>
          <div className={styled['avatar']}>
            <img src="https://pkq.herokuapp.com/static/Icon/25.png" />
          </div>
          <div className={styled['content']}>
            <div className={styled['name']}>
              <span>皮卡丘</span>
            </div>
            <div className={styled['text']}>你好壓</div>
          </div>
          <div className={styled['time']}>
            <span>下午 02:43</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

// css
function styles() {
  return {
    MemberController: css`
      height: 100%;
    `,

    clients: css`
      height: 100%;
    `,

    clinet: css`
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
    `,

    content: css`
      flex: 1;
    `,

    avatar: css`
      width: 50px;
      img {
        width: 100%;
      }
    `
  };
}

export default MemberController;

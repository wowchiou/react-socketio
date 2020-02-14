import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

const SignIn = () => {
  const theme = useTheme();
  const styled = styles();

  return (
    <div className={styled['Signin']}>
      <form className={styled['wrap']}>
        <div className={styled['title']}>你的名字?</div>
        <input
          type="text"
          name="name"
          className={styled['name'](theme)}
          placeholder="請輸入你的名字"
        />
      </form>
    </div>
  );
};

// css

function styles() {
  return {
    Signin: css`
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    `,

    wrap: css`
      text-align: left;
      width: 90%;
      max-width: 500px;
    `,

    title: css`
      color: #fff;
      font-size: 40px;
      margin-bottom: 20px;
    `,

    name: theme => css`
      border-bottom: 2px solid #fff;
      width: 100%;
      font-size: 30px;
      color: ${theme.color.primary};
      padding: 5px 10px;
    `
  };
}

export default SignIn;

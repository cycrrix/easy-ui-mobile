import * as React from 'react';
import { Drawer } from 'easy-ui-mobile';

export default () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <div style={{ marginTop: 20 }}>
      <button
        className="easy-ui-demo-btn"
        onClick={() => {
          setVisible(true);
        }}
      >
        点击提示
      </button>
      <Drawer
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      >
        drawer内容
      </Drawer>
    </div>
  );
};

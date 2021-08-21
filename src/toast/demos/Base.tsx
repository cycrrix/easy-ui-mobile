import * as React from 'react';
import { toast } from 'easy-ui-mobile';

export default () => (
  <div style={{ marginTop: 20 }}>
    <button
      className="easy-ui-demo-btn"
      onClick={() => {
        toast('文字提示');
      }}
    >
      点击提示
    </button>
  </div>
);

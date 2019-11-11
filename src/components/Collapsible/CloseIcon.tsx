import React from "react";

const styles = {
  svg: {
    display: "inline-block",
    verticalAlign: "middle"
  },
  size: 14,
  path: {
    fill: "#000"
  }
};

const CloseIcon = () => (
  <svg
    viewBox="0 0 1024 1024"
    style={styles.svg}
    width={styles.size}
    height={styles.size}
  >
    <path
      style={styles.path}
      d="M489.6 796.8l-473.6-473.6c-6.4-6.4-9.6-12.8-9.6-22.4s3.2-16 9.6-22.4l51.2-51.2c6.4-6.4 12.8-9.6 22.4-9.6s16 3.2 22.4 9.6l400 400 400-400c6.4-6.4 16-9.6 22.4-9.6s16 3.2 22.4 9.6l51.2 51.2c6.4 6.4 9.6 16 9.6 22.4s-3.2 16-9.6 22.4l-473.6 473.6c-6.4 6.4-16 9.6-22.4 9.6-9.6 0-19.2-3.2-22.4-9.6v0z"
    />
  </svg>
);

export default CloseIcon;

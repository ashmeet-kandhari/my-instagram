import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./MasonryLayout.css";

export const MasonryLayout = props => {
  const columnWrapper = {};
  const result = [];
  // create columns
  for (let i = 0; i < props.columns; i++) {
    columnWrapper[`column${i}`] = [];
  }

  for (let i = 0; i < props.children.length; i++) {
    const columnIndex = i % props.columns;
    columnWrapper[`column${columnIndex}`].push(
      <div
        style={{ marginBottom: `${props.gap}px` }}
        className="MasonryLayout__column--item"
      >
        {props.children[i]}
      </div>
    );
  }

  for (let i = 0; i < props.columns; i++) {
    result.push(
      <div
        key={i}
        className="MasonryLayout__column"
        style={{
          marginLeft: `${i > 0 ? props.gap : 0}px`
        }}
      >
        {columnWrapper[`column${i}`]}
      </div>
    );
  }

  return (
    <div className="MasonryLayout">
      <div className="MasonryLayout__wrapper">{result}</div>
      <CircularProgress disableShrink size={50} />
    </div>
  );
};

MasonryLayout.propTypes = {
  columns: PropTypes.number.isRequired,
  gap: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(PropTypes.element),
  isLoading: PropTypes.bool
};

MasonryLayout.defaultProps = {
  columns: 2,
  gap: 20,
  isLoading: false
};

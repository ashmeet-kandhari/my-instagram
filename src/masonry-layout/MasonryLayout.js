import React, { useRef, useState, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./MasonryLayout.css";

function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

export const MasonryLayout = (props) => {
  const targetRef = useRef();
  const [masonryColumns, setMasonryColumns] = useState(
    props.isResponsive ? parseInt(window.innerWidth / 256) : props.columns
  );

  useLayoutEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      const newColNumbers = parseInt(
        window.innerWidth / targetRef.current.offsetWidth
      );
      setMasonryColumns(newColNumbers);
    }, 1000);

    if (props.isResponsive) {
      window.addEventListener("resize", debouncedHandleResize);
    }

    return () => {
      if (props.isResponsive) {
        window.removeEventListener("resize", debouncedHandleResize);
      }
    };
  });

  const columnWrapper = {};
  const result = [];

  // create columns
  for (let i = 0; i < masonryColumns; i++) {
    columnWrapper[`column${i}`] = [];
  }

  for (let i = 0; i < props.children.length; i++) {
    const columnIndex = i % masonryColumns;
    columnWrapper[`column${columnIndex}`].push(
      <div
        style={{ marginBottom: `${props.gap}px` }}
        className="MasonryLayout__column--item"
      >
        {props.children[i]}
      </div>
    );
  }

  for (let i = 0; i < masonryColumns; i++) {
    result.push(
      <div
        key={i}
        ref={i === 0 ? targetRef : null}
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
  columns: 1,
  responsive: false,
  gap: 20,
  isLoading: false
};

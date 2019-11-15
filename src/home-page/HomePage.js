import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { MasonryLayout } from "../masonry-layout/MasonryLayout";
import Modal from "@material-ui/core/Modal";
import AccountCircle from "@material-ui/icons/AccountCircle";
import "./HomePage.css";
import Header from "../header/Header";

function HomePage(props) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalData, setModalData] = useState({});
  const [pageNum, setPageNum] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const loadItems = useCallback(
    async (load, per_page = 20) => {
      if (load) {
        const res = await axios
          .get("https://pixabay.com/api/", {
            params: {
              key: "",
              safesearch: true,
              per_page,
              page: pageNum
            }
          })
          .then(res => {
            console.log(pageNum);
            setPageNum(prevPageNum => prevPageNum + 1);
            setItems(prevItems => {
              return prevItems.concat(res.data.hits);
            });
          });
      }
    },
    [pageNum]
  );

  useEffect(() => {
    // setIsLoading(false);
    // loadItems(50);
    loadItems(isLoading, 50);
    setIsLoading(false);
  }, [isLoading]);

  const debounce = (func, delay = 100) => {
    let debounceTimer;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        setIsLoading(true);
      }
    }

    document.addEventListener("scroll", debounce(handleScroll), true);

    return () => document.removeEventListener("scroll", handleScroll);
  }, [pageNum]);

  const handleOpen = (event, value) => {
    setShowModal(true);
    setModalData(value);
  };

  return (
    <>
      <Header />

      <div className="HomePage__main HomePage__scroll ">
        <MasonryLayout
          columns={5}
          gap={1}
          className={"HomePage__scroll HomePage__masonary"}
        >
          {items.map((v, i) => {
            return (
              <button
                className="HomePage__masonary--item"
                key={i}
                onClick={event => handleOpen(event, v)}
              >
                <img
                  src={v.previewURL}
                  alt={v.tags}
                  style={{
                    width: `252px`,
                    height: `${v.previewHeight + 50}px`
                  }}
                />
              </button>
            );
          })}
        </MasonryLayout>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={showModal}
          onClose={() => setShowModal(false)}
          style={{ overflow: "auto" }}
        >
          <div className="Modal__div">
            <div className="Modal__header">
              <div style={{ display: "flex" }}>
                <AccountCircle></AccountCircle>
                {modalData.user}
              </div>
            </div>

            <div>
              <img src={modalData.largeImageURL} alt={"loading..."} />
            </div>
            <div className="Modal__footer">
              <strong>
                <em>Tags: </em>
              </strong>
              {modalData.tags}
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default HomePage;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { MasonryLayout } from "../masonry-layout/MasonryLayout";
import Modal from "@material-ui/core/Modal";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Header from "../header/Header";
import ImageLoader from "../image-loader/ImageLoader";
import "./HomePage.css";

function HomePage(props) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [pageNum, setPageNum] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const homePageContent = useRef();

  const loadItems = (per_page = 20) => {
    axios
      .get("/api/images", {
        params: {
          per_page,
          page: pageNum,
        },
      })
      .then((res) => {
        setPageNum((prevPageNum) => prevPageNum + 1);
        setIsLoading(false);
        setItems((prevItems) => {
          return [...prevItems, ...res.data.hits];
        });
      });
  };

  useEffect(() => {
    loadItems(50);
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    loadItems(50);
  }, [isLoading]);

  const handleScroll = () => {
    if (
      homePageContent.current.scrollHeight -
        homePageContent.current.scrollTop -
        homePageContent.current.offsetHeight >
        2 ||
      isLoading
    ) {
      return;
    } else {
      setIsLoading(true);
    }
  };

  const handleOpen = (event, value) => {
    setShowModal(true);
    setModalData(value);
  };

  return (
    <>
      <Header />

      <div
        className="HomePage__main HomePage__scroll "
        onScroll={handleScroll}
        ref={homePageContent}
      >
        <MasonryLayout
          columns={5}
          isResponsive={true}
          gap={0}
          className={"HomePage__scroll HomePage__masonary"}
          isLoading={isLoading}
        >
          {items.map((v, i) => {
            return (
              <button
                className="HomePage__masonary--item"
                key={i}
                onClick={(event) => handleOpen(event, v)}
              >
                <ImageLoader
                  src={v.previewURL}
                  alt={v.tags}
                  style={{
                    width: `245px`,
                    height: `${v.previewHeight + 50 * Math.random() + i}px`,
                  }}
                />
              </button>
            );
          })}
        </MasonryLayout>
      </div>

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
              <AccountCircle />
              {modalData.user}
            </div>
          </div>

          <ImageLoader src={modalData.largeImageURL} alt={"loading..."} />
          <div className="Modal__footer">
            <strong>
              <em>Tags: </em>
            </strong>
            {modalData.tags}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default HomePage;

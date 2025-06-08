import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { LuTrash2 } from "react-icons/lu";

const Reviews = () => {
 
  const [hover, setHover] = useState(0);
  const [star, setStar] = useState(0);
  const [feedback, setFeedBack] = useState({});
  const [list, setList] = useState([]);


  useEffect(() => {
    let savedList = JSON.parse(localStorage.getItem("list")) || [];
    setList(savedList);
    console.log("getitem:", savedList);
  }, []);


  const handleHover = (index) => {
    setHover(index);

    if (star != 0) {
      setStar(0);
    }
  };


  const handleLeave = (index) => {
    setHover(0);
    setStar(index);
  };


  const handleDown = (index) => {
    setStar(index);
  };


  const handleChange = (event) => {
    let { name, value } = event.target;
    setFeedBack({ ...feedback, [name]: value });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    let newList = [...list, { ...feedback, star: star, id: Date.now() }]
    setList(newList);
    setFeedBack({});
    localStorage.setItem("list", JSON.stringify(newList));
    setStar(0);
  };

  const handleDelete = (id) => {
    let feedbackData = list.filter((val) => val.id !== id);
    setList(feedbackData);
    localStorage.setItem("list", JSON.stringify(feedbackData));
  };

  return (
    <>
      <section className="reviews">
        <div className="container">
          <div className="border rounded-4 p-4">
            <div className="title">
              <h4>BMW 3 Series user Reviews</h4>
            </div>
            <div className="rating-section">
              <form method="post" onSubmit={handleSubmit}>
                {[...Array(5).keys()].map((_, index) => (
                  <FaStar
                    key={index}
                    size={20}
                    onMouseOver={() => handleHover(index + 1)}
                    onMouseLeave={() => handleLeave(index + 1)}
                    onMouseDown={() => handleDown(index + 1)}
                    color={
                      hover > index || star > index ? "orangered" : "lightgray"
                    }
                  />
                ))}

                <textarea
                  id="Message"
                  name="message"
                  className="form-control my-3"
                  placeholder="Provide Feedback"
                  value={feedback.message || ""}
                  maxLength="50"
                  onChange={handleChange}
                ></textarea>
                <button className="btn btn-orange text-white fw-semibold">
                  Submit
                </button>
              </form>
            </div>
            <ul className="list-unstyled mt-5">
                <h4>Reviews and Ratings</h4>
               {list.map((val, index) => (
                  <li key={val.id} className="py-3">
                    {[...Array(5).keys()].map((_, index) => (
                      <FaStar
                        key={index}
                        size={20}
                        color={val.star > index ? "orangered" : "lightgray"}
                      />
                    ))}

                    <p className="mt-3 bg-light p-3 rounded-3">{val.message}</p>
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(val.id)}
                      >
                        <LuTrash2 size={20} />
                      </button>
                    </div>
                    <hr />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reviews;
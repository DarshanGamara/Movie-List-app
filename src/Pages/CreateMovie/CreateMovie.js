import { useState } from "react";
import "./CreateMovie.css";
import { HiOutlineDownload } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Upload, message } from "antd";
import { v4 as uuidv4 } from "uuid";

function CreateMovie(props) {
  const [addTitle, setAddTitle] = useState("");
  const [addYear, setAddYear] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();

  const imageChangeHandler = (info) => {
    console.log("File Info:", info); 
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setImageFile(info.file.originFileObj);
      console.log("Uploaded File:", info.file.originFileObj);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed`);
    }
  };

  const movieAddSubmitHandler = (event) => {
    event.preventDefault();
    if (addTitle.trim() === "" || addYear === "" || !imageFile) {
      alert("Please fill in all the fields and upload an image");
      return;
    }
    if (addYear < 1975 || addYear > 2030) {
      alert("Year must be between 1975 and 2030");
      return;
    }

    const newMovie = {
      id: uuidv4(),
      title: addTitle,
      year: addYear,
      image: URL.createObjectURL(imageFile),
    };

    props.onAddMovie(newMovie);

    console.log("Title:", addTitle);
    console.log("Year:", addYear);
    console.log("Uploaded Image File:", imageFile);
   
    setAddTitle("");
    setAddYear("");
    setImageFile(null);
    navigateToMovieList();
  };

  const navigateToMovieList = () => {
    navigate("/MovieList");
  };

  const titleChangeHandler = (event) => {
    setAddTitle(event.target.value);
    console.log("Title Changed:", event.target.value);
  };

  const yearChangeHandler = (event) => {
    setAddYear(event.target.value);
    console.log("Year Changed:", event.target.value);
  };
  
  
  return (
    <div className="add-movie">
      <h2 className="heading">Create a new movie</h2>
      <div className="pic-input-div">
        <div className="pic-div">
          <Upload
            name="image"
            listType="picture-card"
            accept="image/*"
            showUploadList={false}
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess("ok");
                setImageFile(file);
              }, 1000);
            }}
            onChange={imageChangeHandler}
          >
            {imageFile ? (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Uploaded"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div className="download">
                <HiOutlineDownload className="dwn-logo" />
                <p>Drop an image here</p>
              </div>
            )}
          </Upload>
        </div>
        <div className="title-input-div">
          <form onSubmit={movieAddSubmitHandler}>
            <input
              type="text"
              id="text"
              className="title"
              placeholder="Title"
              value={addTitle}
              onChange={titleChangeHandler}
            />
            <input
              type="number"
              id="number"
              min="1975"
              max="2030"
              step="1"
              className="year"
              value={addYear}
              onChange={yearChangeHandler}
              placeholder="Publishing year"
            />
            <button
              className="cancle"
              type="button"
              onClick={() => {
                navigate("/MovieList");
              }}
            >
              Cancel
            </button>
            <button className="submit" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMovie;


/* <div className="download">
              <HiOutlineDownload
                className="dwn-logo"
                onClick={addImageHandler}
              />
              <p>Drop an image here</p>
            </div>*/ 
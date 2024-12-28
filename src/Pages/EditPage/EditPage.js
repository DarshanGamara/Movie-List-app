import "./EditPage.css";
import { HiOutlineDownload } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Upload, message } from "antd"; 


function EditPage({ movies, onUpdateMovie }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState("");

    useEffect(() => {
      const selectedMovie = movies.find((movie) => movie.id === id);

     if (selectedMovie) {
       setMovie(selectedMovie);
       setTitle(selectedMovie.title);
       setYear(selectedMovie.year);
       setImage(selectedMovie.image);
     }
    }, [id, movies]);

    const submitHandle = (event) => {
      event.preventDefault();
      const updatedMovie = { 
        id,
        title,
        year,
        image,
      };
      onUpdateMovie(updatedMovie);
      navigate("/MovieList");
    };

    if (!movie) return <p>Loading... Movie</p>;

    const handleTitleChange = (e) => {
      setTitle(e.target.value); 
    };

    const handleYearChange = (e) => {
      setYear(e.target.value); 
    };

     const handleImageChange = (info) => {
       const file = info.file.originFileObj; 
       if (file) {
         const imageUrl = URL.createObjectURL(file);
         setImage(imageUrl);
         message.success(`${file.name} uploaded successfully`);
       } else {
         message.error("Failed to upload image");
       }
     };

      const uploadButton = (
        <div>
          <HiOutlineDownload className="dwn-logo" />
          <p>Drop an image here</p>
        </div>
      );

       if (!movie) return <p>Loading... Movie</p>;

  return (
    <div className="edit-div">
      <h2 className="edit-heading">Edit</h2>
      <div className="edit-pic-input-div">
        <div className="edit-pic">
          <Upload
            name="image"
            listType="picture-card"
            accept="image/*"
            showUploadList={false}
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess("ok");
                setImage(URL.createObjectURL(file));
              }, 1000);
            }}
            onChange={handleImageChange}
          >
            {image ? (
              <img src={image} alt="Preview" className="preview-image" />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
        <div className="edit-title-div">
          <form onSubmit={submitHandle}>
            <input
              type="text"
              id="text"
              className="edit-title"
              placeholder="Title"
              value={title}
              onChange={handleTitleChange}
            />
            <input
              type="number"
              id="number"
              min="1975"
              max="2030"
              step="1"
              className="edit-year"
              placeholder="Publishing year"
              value={year}
              onChange={handleYearChange}
            />
            <button
              className="cancel"
              onClick={(event) => {
                event.preventDefault();
                navigate("/MovieList");
              }}
            >
              Cancel
            </button>
            <button className="edit-submit" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
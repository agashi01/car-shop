/* eslint-disable react/jsx-key */
import { React, useEffect, useState } from "react";
import axios from "axios";
import { capitalize } from "lodash"

export default function Add({ page, id }) {
  const [allMake, setAllMake] = useState([]);
  const [allModel, setAllModel] = useState([]);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [fuelType, setFuelType] = useState([]);
  const [transmission, setTransmission] = useState([]);
  const [vehicleType, setVehicleType] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [file, setFile] = useState(null); // S
  const [selectedFileName, setSelectedFileName] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [error, setError] = useState({
    make: "",
    model: "",
    mileage: "",
    color: "",
    fuelType: "",
    transmission: "",
    vehicleType: "",
    image: null
  });
  const [message, setMessage] = useState({
    make: "",
    model: "",
    mileage: "",
    color: "",
    fuelType: "",
    transmission: "",
    vehicleType: "",
    image: null
  });

  useEffect(() => {

    console.log('hi')

    const toggle = (e) => {

      if (e.key === 'ArrowLeft') {
        prevImage()
      } else if (e.key === 'ArrowRight') {
        nextImage()
      }
    }

    console.log('hi')
    if (currentImageIndex !== null) {
      document.addEventListener('keydown', toggle)
    } else {
      document.removeEventListener('keydown', toggle)
    }

    return () => document.removeEventListener('keydown', toggle)
  }, [currentImageIndex])


  const mileage = (e) => {
    setError((current) => {
      if (!isNaN(Number(e.target.value))) {
        return { ...current, mileage: e.target.value }
      }
      return { ...current, mileage: '' }
    })
  }

  // when dealer submits
  const submit = (e) => {
    e.preventDefault();
    const newMessages = { ...message };
    for (let key in error) {
      if (!error[key]) {
        newMessages[key] = 'error-add';
      } else {
        console.log(key)
        newMessages[key] = "correct-add";
      }
    }
    setMessage(newMessages); // Update the message state once with the new values
  };

  useEffect(() => {
    for (let key in message) {
      if (message[key] !== "correct-add") {
        return
      }
    }

    const formdata=new FormData()

    formdata.append('files',file)
    formdata.append(...error)

    axios.post('http://localhost:3000/cars', {
      specs: formdata
    })
      .then(() => {
        page('afterAdd')
      })
      .catch(err => {
        console.log(err)
        setErrorMessage(err.data)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message])

  useEffect(() => {
    axios
      .get("http://localhost:3000/dealerMake", { params: { model } })
      .then((res) => {
        setAllMake(res.data);
      })
      .catch((err) => console.log(err));
  }, [model]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/dealerModel", { params: { make } })
      .then((res) => {
        setAllModel(res.data);
      })
      .catch((err) => console.log(err));
  }, [make]);

  useEffect(() => {
    axios.get("http://localhost:3000/transmission").then((res) => {
      setTransmission(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/fuelType").then((res) => {
      setFuelType(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/vehicleType").then((res) => {
      setVehicleType(res.data);
    });
  }, []);

  const handleFile = (e) => {
    const files = Array.from(e.target.files);
    console.log(files)
    setFile(files);
    setSelectedFileName(files.map((file) => file.name));
    setError(current => {
      if (files.length) {
        return { ...current, file: 'good' }
      } else {
        return { ...current, file: null }

      }

    })



  };

  const openModal = () => () => {
    setCurrentImageIndex(0)
  }

  const closeModal = () => {
    setCurrentImageIndex(null)
  }

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % file.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + file.length) % file.length)
  }

  return (
    <>
      <form encType="multipart/form-data" onSubmit={submit}>
        <div className="sell-menu">

          <div style={{ display: "flex" }}>
            <div className="options">
              <p className="text">Make</p>
              <select
                onChange={(e) => {
                  setError((current) => {
                    return { ...current, make: e.target.value };
                  });
                  setMake(e.target.value);
                }}
                className={`select sell ${message.make}`}
              >
                <option value="">Select</option>
                {allMake.map((use, index) => {
                  return (
                    <option key={index} value={use.make}>
                      {use.make}
                    </option>
                  );
                })}
              </select>
            </div>
            <div style={{ marginLeft: '15px' }} className="options2">
              <p className="text3">Model</p>
              <select
                onChange={(e) => {
                  setError((current) => {
                    return { ...current, model: e.target.value };
                  });
                  setModel(e.target.value);
                }}

                className={`select sell gap ${message.model}`}
              >
                <option value="">Select</option>
                {allModel.map((use, index) => {
                  return (
                    <option key={index} value={use}>
                      {use}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div className="options">
              <p className="text">Mileage</p>
              <input
                placeholder="Km"
                onChange={mileage}
                className={`input-sell ${message.mileage}`}
              ></input>
            </div>
            <div style={{ marginLeft: '15px' }} className="options2">
              <p className="text3">Color</p>
              <input
                onChange={(e) => {
                  setError((current) => {
                    return { ...current, color: e.target.value };
                  });
                }}
                className={`input-sell ${message.color}`}
              ></input>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div className="options" style={{ display: "flex", flexDirection: "column" }}>
              <p className="text">Transmission</p>
              <select
                onChange={(e) => {
                  setError((current) => {
                    return { ...current, transmission: e.target.value };
                  });
                }}
                className={`select sell ${message.transmission}`}
              >
                <option value="">Select</option>
                {transmission.map((use, index) => {
                  return (
                    <option key={index} value={use}>
                      {capitalize(use.replaceAll('_', ' '))}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="options2">
              <p style={{ marginRight: '8px' }} className="text3">Fuel Type</p>
              <select
                onChange={(e) => {
                  setError((current) => {
                    return { ...current, fuelType: e.target.value };
                  });
                }}
                className={`select sell gap ${message.fuelType}`}
              >
                <option value="">Select</option>
                {fuelType.map((use, index) => {
                  return (
                    <option key={index} value={use}>
                      {use}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div className="options">
              <p className="text">Vehicle Type</p>
              <select
                onChange={(e) => {
                  setError((current) => {
                    return { ...current, vehicleType: e.target.value };
                  });
                }}
                className={`select-vehicle ${message.vehicleType}`}
              >
                <option value="">Select</option>
                {vehicleType.map((use, index) => {
                  return (
                    <option key={index} value={use}>
                      {use}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="image-input">
              <p className="text3">Image</p>
              <label htmlFor="files" className={`input-sell image ${message.file}`}>
                Choose Files
                <input
                  id='files'
                  type="file"
                  accept="image/*"
                  capture="environment" // This opens the camera on mobile devices
                  className=' label-input-sell'
                  onChange={handleFile}
                  multiple
                />
              </label>
              {selectedFileName.length > 0 && (
                <div className='file-div'>
                  <p style={{ cursor: 'pointer' }}  onClick={openModal()} className="file-name">
                    Photos
                  </p>
                </div>
              )}
            </div>
          </div>
          <button type="submit" style={{ padding: "10px" }} className="create">
            Create
          </button>
          {errorMessage ? <p className="text">{errorMessage}</p> : null}
        </div>
      </form>

      {currentImageIndex !== null && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className='close-div'>
              <span className="close" onClick={closeModal}>&times;</span>
            </div>
            <div className='image-div'>
              <img src={URL.createObjectURL(file[currentImageIndex])} alt="Preview" className="modal-image" />
            </div>
            <div className="modal-navigation">
              <button onClick={prevImage}>&lt;</button>
              <button onClick={nextImage}>&gt;</button>
            </div>
          </div>
        </div>
      )}
    </>

  );
}
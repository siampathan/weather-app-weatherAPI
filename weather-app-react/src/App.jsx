import { CircularProgress, Slide, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import img from "./assets/img/clear.jpg";
import "./App.css";

function App() {
  const [cityName, setCityName] = useState("Dhaka");
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const API_KEY = "e70528456668973f6dcf59191436f5f2";

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    )
      .then((res) => {
        if (res.status === 200) {
          error && setError(false);
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [cityName, error]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setCityName(e.target.value);
      setInputText("");
    }
  };

  //  const backgroundImage = () {
  //   let wdata = data.weather[0].main;
  //   let backgroundImage;

  //   if(wdata == 'Thunderstorm')
  //     backgroundImage = 'url()'

  //  }

  //   const image = {
  //     backgroundImage,
  //     backgroundRepeat: "no-repeat",
  //     backgroundSize: "cover",
  //     backgroundPosition: "center",
  //   };

  return (
    <div className={`bg_img`}>
      {!loading ? (
        <>
          <TextField
            variant="filled"
            label="Search location"
            className="input"
            error={error}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleSearch}
          />
          <h1 className="city">{data.name}</h1>
          <div className="group">
            <img
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt=""
            />
            <h1>{data.weather[0].main}</h1>
          </div>

          <h1 className="temp">{data.main.temp.toFixed()} °C</h1>

          <Slide direction="right" timeout={800} in={!loading}>
            <div className="box_container">
              <div className="box">
                <p>Humidity</p>
                <h1>{data.main.humidity.toFixed()}%</h1>
              </div>

              <div className="box">
                <p>Wind</p>
                <h1>{data.wind.speed.toFixed()} km/h</h1>
              </div>

              <div className="box">
                <p>Feels Like</p>
                <h1>{data.main.feels_like.toFixed()} °C</h1>
              </div>
            </div>
          </Slide>
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './App.css';
import useFetch from './hooks/useFetch';

function App() {
  const [city, setCity] = useState('');
  const [query, setQuery] = useState('');
  
  const allWeather = useFetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`);
  
  const getWeatherData = () => {
    setQuery(city);
  };
  const getImageForWeather = () => {
    if (!allWeather.weather) return "https://static.vecteezy.com/system/resources/previews/042/379/531/non_2x/ai-generated-blue-sky-with-bright-sun-as-abstract-panoramic-background-ai-generated-image-photo.jpg"; // Default placeholder image

    const weatherMain = allWeather.weather[0].main.toLowerCase();

    if (weatherMain.includes('clear')) {
      return "https://lh3.googleusercontent.com/cCDc3xGUHZ00B5jJoTAK1twF4alRJdqYOseCvZs66wItTlSojz92a5Cqc5qizQe0HFMAm3579cFjMXhundzK6pkCQcDqv1Ie";
    } else if (weatherMain.includes('clouds')) {
      return "https://m-cdn.phonearena.com/images/article/143515-wide-two_1200/Apple-tests-adding-news-to-the-native-Weather-app-in-iOS-16.2-Beta.jpg";
    } else if (weatherMain.includes('rain') || weatherMain.includes('drizzle')) {
      return "https://www.wkbn.com/wp-content/uploads/sites/48/2021/02/rain-raining-raindrops-wet-spring-summer-fall-weather-generic.jpg?w=1280";
    } else if (weatherMain.includes('thunderstorm')) {
      return "https://t3.ftcdn.net/jpg/03/26/19/12/360_F_326191234_Q12utSZ0vmxV6tKQXogktU7e3dmZ2JLI.jpg";
    } else if (weatherMain.includes('snow')) {
      return "https://cdn.pixabay.com/photo/2017/08/03/14/36/winter-2576611_640.jpg";
    } else if (weatherMain.includes('mist') || weatherMain.includes('fog') || weatherMain.includes('haze')) {
      return "https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/weather/fog--mist/fog-on-a-country-road.jpg";
    } else {
      return "https://static.vecteezy.com/system/resources/previews/042/379/531/non_2x/ai-generated-blue-sky-with-bright-sun-as-abstract-panoramic-background-ai-generated-image-photo.jpg"; // Fallback placeholder image
    }
  };


  return (
    <>
      <div style={{ height: '100vh', backgroundImage: `url("https://img.freepik.com/free-vector/blue-cloudy-daylight-background-weather-design_33099-512.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center', }} className="d-flex justify-content-center align-items-center ">
        <Card style={{ width: '40rem',height:'auto', backgroundColor: 'transparent' }} className='shadow'>
          <Card.Img style={{maxHeight:'300px'}} variant="top" src={getImageForWeather()} />
          <Card.Body>
            <Card.Title>
              <Form.Control 
                type="text" 
                placeholder="Enter place to search" 
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <div className='text-center mt-3'>
                <Button variant="outline-primary" onClick={getWeatherData}>Search</Button>
              </div>
            </Card.Title>
            <Card.Text style={{backgroundColor:'transparent'}}>
              PLACE NAME : {allWeather.name}
            </Card.Text>
          </Card.Body>
          <ListGroup  className="list-group-flush">
            <ListGroup.Item style={{backgroundColor:'transparent'}}>WEATHER: {allWeather.weather ? allWeather.weather[0].description : ''}</ListGroup.Item>
            <ListGroup.Item style={{backgroundColor:'transparent'}}>TEMPERATURE: {allWeather.main ? allWeather.main.temp : ''} °C</ListGroup.Item>
            <ListGroup.Item style={{backgroundColor:'transparent'}}>REAL FEEL: {allWeather.main ? allWeather.main.feels_like : ''} °C</ListGroup.Item>
            <ListGroup.Item style={{backgroundColor:'transparent'}}>MAX TEMP: {allWeather.main ? allWeather.main.temp_max : ''} °C</ListGroup.Item>
            <ListGroup.Item style={{backgroundColor:'transparent'}}>MIN TEMP: {allWeather.main ? allWeather.main.temp_min : ''} °C</ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    </>
  );
}

export default App;

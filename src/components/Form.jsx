// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker"
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner"
import {useNavigate} from "react-router-dom"

import { useURLPosition } from "../hooks/useURLPosition";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {

  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL="https://api.bigdatacloud.net/data/reverse-geocode-client"

function Form() {
  const { createCity,isLoading } = useCities();
  const [mapLat, mapLng] = useURLPosition();
  // console.log(mapLat,mapLng)
  const navigate = useNavigate();
  
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  console.log(isLoadingGeocoding);
  const [cityName, setCityName] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState();
  const [geoCodingError,setGeoCodingError]=useState("")
  const [country, setCountry] = useState("");
  useEffect(function () {
    if (!mapLat && !mapLng) return;
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        console.log(mapLat, mapLng)
        setGeoCodingError("");
        const res = await fetch(`${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`);
        const data = await res.json();
        if(!data.countryCode) throw new Error("That does'nt seem to be a city. Click somewhere else ..")
        setCityName(data.city);
        setCountry(data.countryName)
        setEmoji(data.countryCode)
        
      } catch(err) {
        setGeoCodingError(err.message);
      } finally {
        setIsLoadingGeocoding(false);
       }
    }
    fetchCityData();
  }, [mapLat, mapLng])
  

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const lat = mapLat;
    const lng = mapLng;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position:{lat,lng},
    }
    await createCity(newCity)
    navigate("/app/cities")
  }


  if (isLoadingGeocoding) return <Spinner />
  if (!mapLat && !mapLng)
    return <Message message="Start by clicking somewhere  on the map"/>

  if (geoCodingError) return <Message message={geoCodingError} />
  return (
  <form className={`${styles.form} ${isLoading?styles.loading:""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
       
        <DatePicker
          id="data"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormate="dd/mm/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton>
        </BackButton>
      </div>
    </form>
  );
}

export default Form;

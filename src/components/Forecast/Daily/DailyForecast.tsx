import { useState, useEffect } from 'react';
import styles from  './DailyForecast.module.scss';
import { weatherIconImages } from '../../../utils/constants/images';
import { IWeatherResponseDTO } from '../../../api/weather/weatherApi';
type DailyForecastProps = {
    mobileView: boolean;
    weatherProp: IWeatherResponseDTO;
    locationProp: string;
}

const DailyForecast = ({mobileView, weatherProp, locationProp}: DailyForecastProps): JSX.Element => {
    const [weather, setWeather] = useState<IWeatherResponseDTO>();
    const [location, setLocation] = useState<string>('');
    
    useEffect(()=> {
        setWeather(weatherProp);
    },[weatherProp]); 
    useEffect(()=> {
        setLocation(locationProp);
    },[locationProp]);

    //TODO: put this in a utility file to be resused across app
    const convertDate = (date: number) => {
        let formattedDate: Date = new Date(date*1000);
        const outDate: string = formattedDate.toLocaleDateString('en-US');
        const outTime: string = formattedDate.toLocaleTimeString('en-US');
        return outDate + ' ' + outTime;
    }

    return (
        <div className={`${mobileView ? styles.mobileDaily : styles.daily}`}>
            { mobileView ? <div className={styles.locationName}>{location}</div> : null}
            <div className={styles.dailyDetails}>
                <div className={styles.imageContainer}> 
                <img alt-text="Image of today's weather" className={styles.dailyImage} 
                    src={weatherIconImages.get(weather?.current.weather[0].id)}/>
                </div>
                <div className={styles.detailsContainer}>
                    { mobileView ? null : <div className={styles.locationName}>{location}</div> }
                    <div className={styles.temperature}>
                        {weather?.current.temp !== undefined ? Math.round(weather?.current.temp) : 'Temperature not found' }°F
                    </div>
                    <div className={styles.date}>Last Updated: {
                        weather?.current.dt !== undefined ? convertDate(weather?.current.dt) : 'Date not found'}
                    </div>
                </div>

            </div>
        </div>

    )
}

export default DailyForecast;
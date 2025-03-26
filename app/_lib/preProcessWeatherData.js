import moment from "moment";

/**
 *
 * @param {*} data
 * @returns {object}
 */
export default function preProcessWeatherData(data) {
  let forecast = data.hourly.time.reduce((prev, curr, index) => {
    if (prev.hasOwnProperty(moment(curr).format("YYYY-MM-DD"))) {
      prev[moment(curr).format("YYYY-MM-DD")] = {
        hours: [
          ...prev[moment(curr).format("YYYY-MM-DD")].hours,
          {
            time: curr,
            temperature: data.hourly.temperature_2m[index],
            precipitation: data.hourly.precipitation[index],
            windSpeed: data.hourly.windspeed_10m[index],
            windDirection: data.hourly.winddirection_10m[index],
            weatherCode: data.hourly.weathercode[index],
          },
        ],
      };
    } else {
      prev[moment(curr).format("YYYY-MM-DD")] = {
        hours: [
          {
            time: curr,
            temperature: data.hourly.temperature_2m[index],
            precipitation: data.hourly.precipitation[index],
            windSpeed: data.hourly.windspeed_10m[index],
            windDirection: data.hourly.winddirection_10m[index],
            weatherCode: data.hourly.weathercode[index],
          },
        ],
      };
    }
    return prev;
  }, {});
  for (let i = 0; i < data.daily.time.length; i++) {
    forecast[data.daily.time[i]]["day"] = {
      minTemperature: data.daily.temperature_2m_min[i],
      maxTemperature: data.daily.temperature_2m_max[i],
      precipitationSum: data.daily.precipitation_sum[i],
      maxWindSpeed: data.daily.windspeed_10m_max[i],
      weatherCode: data.daily.weathercode[i],
      sunrise: data.daily.sunrise[i],
      sunset: data.daily.sunset[i],
    };
  }
  return forecast;
}

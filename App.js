import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Image, KeyboardAvoidingView, Dimensions, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LineChart } from "react-native-chart-kit";
import moment from 'moment-timezone';
import * as c from './Colors';

export default function App() {

    const [weatherData, setWeatherData] = useState([]);
    const [uriIcon, setUriIcon] = useState('');
    const [selectDate, setSelectDate] = useState(false);
    const [week, setWeek] = useState([]);
    const [temperaturesWeek, setTemperaturesWeek] = useState([]);
    const [selected, setSelected] = useState(0); //0:Now, 1:Today, 2:Tommorow etc

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            position: 'relative',
            backgroundColor: c.LIGHTER,
            alignItems: 'center',
            justifyContent: 'center',
            width: 620, //'40%'
        },
        innerContainer: {
            justifyContent: 'center',
            alignSelf: 'center',
            paddingHorizontal: 20,
            paddingTop: 26,
            flexDirection: 'column',
            backgroundColor: c.LIGHTER,
            borderBottomWidth: 3,
            borderBottomColor: c.GRAY,
            width: '90%',
            shadowColor: c.MUTED,
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 6
        },
        button: {
            borderRadius: 3,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: c.DARK_GRAY,
            marginRight: 8,
            paddingHorizontal: 6,
            paddingVertical:2
        },
        buttonDate: {
            borderRadius: 3,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: c.DARK_GRAY,
            marginRight: 6,
        },
        component: {
            borderRadius: 16,
            paddingLeft: 16,
            paddingVertical: 24,
            justifyContent: 'flex-start',
            borderWidth: 1,
            borderColor: c.DARK_GRAY,
            width: '28%',
            marginLeft: 20
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await fetch('./api/weatherAPI.json');
                let jsonData = await response.json();
                setWeatherData(jsonData);
                let icon = jsonData.current.weather[0].icon;
                let uriTemp = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
                setUriIcon(uriTemp);
                for (let i = 0; i < 7; i++) {
                    let temp = ((jsonData.daily[i].temp.day + jsonData.daily[i].temp.night) / 2).toFixed(2);
                    temperaturesWeek.push(temp);
                }
                let todayT = moment().tz(jsonData.timezone).format("DD/MM");
                week.push(todayT);
                for (let i = 1; i < 7; i++) {
                    week.push(moment(todayT, 'DD/MM').add(i, 'days').format('DD/MM'));
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (weatherData.current) {
            if (selected == 0) {
                let icon = weatherData.current.weather[0].icon;
                let uriTemp = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
                setUriIcon(uriTemp);
            } else {
                let icon = weatherData.daily[selected - 1].weather[0].icon;
                let uriTemp = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
                setUriIcon(uriTemp);
            } 
        }
    }, [selected]);

    const TemperatureItem = (props) => {
        return (
            <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontSize: 36 }}>{props.temperature + '\u00B0C '}</Text>
                <Text style={{ fontSize: 12, color: c.MUTED }}>{props.main} - {props.description}</Text>
            </View>
        )
    }

    const InfoWeather = (props) => {
        return (
            <>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.component}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 22 }}>{props.feelsLike + '\u00B0C '}</Text>
                        <Text style={{ fontSize: 12, color: c.MUTED }}>Feels like</Text>
                    </View>
                </View>
                <View style={styles.component}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 22 }}>{props.windSpeed}<Text style={{ fontSize: 14 }}>m/s</Text></Text>
                        <Text style={{ fontSize: 12, color: c.MUTED }}>Wind</Text>
                    </View>
                </View>
                <View style={styles.component}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 22 }}>{props.windGust}<Text style={{ fontSize: 14}}>m/s</Text></Text>
                        <Text style={{ fontSize: 12, color: c.MUTED }}>Wind Gust</Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 20 }}>
                <View style={styles.component}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 22 }}>{props.windDeg + '\u00B0 '}</Text>
                        <Text style={{ fontSize: 12, color: c.MUTED }}>Wind Deg</Text>
                    </View>
                </View>
                <View style={styles.component}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 22 }}>{props.humidity}<Text style={{ fontSize: 14 }}>%</Text></Text>
                        <Text style={{ fontSize: 12, color: c.MUTED }}>Humidity</Text>
                    </View>
                </View>
                <View style={styles.component}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 22 }}>{props.pressure}<Text style={{ fontSize: 14 }}>hPa</Text></Text>
                        <Text style={{ fontSize: 12, color: c.MUTED }}>Pressure</Text>
                    </View>
                </View>
            </View>   
            </>
        )
    }

    const DateItem = (props) => {
        return (
            <Pressable style={[{ backgroundColor: selected == props.selectIndex ? c.GREEN : c.LIGHT }, styles.buttonDate]} android_ripple={{ color: c.DARK_GRAY }} onPress={() => { setSelected(props.selectIndex); }}>
                <View style={{ flexDirection: 'row', paddingVertical: 4, paddingHorizontal: 6, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: c.DARKER, fontSize: 12 }}>{week[props.selectWeek]}</Text>
                </View>
            </Pressable>
        )
    }

    return (
        <ScrollView>
            <GestureHandlerRootView style={{ flex: 1, backgroundColor: c.GREEN }}>
                <KeyboardAvoidingView>
                    <View style={styles.container}>
                        <View style={styles.innerContainer}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center' }}>
                                <Pressable style={[{ backgroundColor: selected == 0 ? c.GREEN : c.LIGHT }, styles.button]} android_ripple={{ color: c.DARK_GRAY }} onPress={() => { setSelected(0); }}>
                                    <View style={{ flexDirection: 'row', paddingVertical: 4, paddingHorizontal: 6, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: c.DARKER, fontSize: 12 }}>Now</Text>
                                    </View>
                                </Pressable>
                                <Pressable style={[{ backgroundColor: selected == 1 ? c.GREEN : c.LIGHT }, styles.button]} android_ripple={{ color: c.DARK_GRAY }} onPress={() => { setSelected(1); }}>
                                    <View style={{ flexDirection: 'row', paddingVertical: 4, paddingHorizontal: 6, alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={{ color: c.DARKER, fontSize: 12 }}>Today</Text>
                                    </View>
                                </Pressable>
                                <Pressable style={[{ backgroundColor: c.LIGHT }, styles.button]} android_ripple={{ color: c.DARK_GRAY }} onPress={() => { setSelectDate(!selectDate); }}>
                                    <View style={{ flexDirection: 'row', paddingVertical: 4, paddingHorizontal: 6, alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={{ color: c.DARKER, fontSize: 12 }}>Select Date</Text>
                                    </View>
                                </Pressable>
                                {selectDate && week.length > 0 ?
                                    <>
                                        <DateItem selectIndex={2} selectWeek={1} />
                                        <DateItem selectIndex={3} selectWeek={2} />
                                        <DateItem selectIndex={4} selectWeek={3} />
                                        <DateItem selectIndex={5} selectWeek={4} />
                                        <DateItem selectIndex={6} selectWeek={5} />
                                        <DateItem selectIndex={7} selectWeek={6} />
                                    </>
                                    :
                                <></>
                                }
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20 }}>
                                {weatherData.current ?
                                    selected == 0 ? 
                                        <TemperatureItem temperature={weatherData.current.temp} main={weatherData.current.weather[0].main} description={weatherData.current.weather[0].description} />
                                        :
                                        weatherData.daily[selected - 1] ?
                                            <TemperatureItem temperature={((weatherData.daily[selected - 1].temp.day + weatherData.daily[selected - 1].temp.night) / 2).toFixed(2)} main={weatherData.daily[selected - 1].weather[0].main} description={weatherData.daily[selected - 1].weather[0].description} />
                                            :
                                        <></>
                                    :
                                 <></>}
                                <Image
                                    source={{ uri: uriIcon }}
                                    style={{ width: 110, height: 110, marginEnd: 20 }}
                                />
                            </View>
                        </View>
                        <View style={[{ paddingBottom: 40 }, styles.innerContainer]}>
                            {weatherData.current?
                                selected == 0 ?
                                <InfoWeather feelsLike={weatherData.current.feels_like} windSpeed={weatherData.current.wind_speed} windGust={weatherData.current.wind_speed} windDeg={weatherData.current.wind_deg} humidity={weatherData.current.humidity} pressure={weatherData.current.pressure} />
                                :
                                weatherData.daily[selected-1] ?
                                    <InfoWeather feelsLike={((weatherData.daily[selected - 1].feels_like.day + weatherData.daily[selected - 1].feels_like.night) / 2).toFixed(2)} windSpeed={weatherData.daily[selected - 1].wind_speed} windGust={weatherData.daily[selected - 1].wind_gust} windDeg={weatherData.daily[selected - 1].wind_deg} humidity={weatherData.daily[selected - 1].humidity} pressure={weatherData.daily[selected - 1].pressure} />
                                    :
                                    <></>
                                :
                                <></>
                            }
                        </View>
                        <View style={{ height: 14, backgroundColor: c.GRAY }}></View>
                        <View style={styles.innerContainer}>
                            <Text style={{ fontSize: 18, paddingBottom: 20, fontWeight: 'bold', paddingTop: 32}}>Weekly Variation </Text>
                            <Text style={{ fontSize: 14, paddingBottom: 12 }}>Temperature </Text>
                                {week.length > 0 && temperaturesWeek.length>0 ?
                                    <LineChart
                                        data={{
                                            labels: [week[0], week[1], week[2], week[3], week[4], week[5], week[6]],
                                            datasets: [{data: [temperaturesWeek[0], temperaturesWeek[1], temperaturesWeek[2], temperaturesWeek[3], temperaturesWeek[4], temperaturesWeek[5], temperaturesWeek[6]]}]
                                        }}
                                        width={530} //{Dimensions.get("window").width / 100 * 34}
                                        height={340}
                                        yAxisInterval={1}
                                        withHorizontalLines={false}
                                        chartConfig={{
                                            backgroundColor: c.LIGHTER,
                                            backgroundGradientFrom: c.LIGHTER,
                                            backgroundGradientTo: c.LIGHTER,
                                            decimalPlaces: 0,
                                            color: () => c.GREEN,
                                            labelColor: () => c.DARKER,
                                            strokeWidth: 1,
                                            style: {
                                                borderRadius: 16
                                            },
                                            propsForDots: {
                                                r: "2",
                                            }
                                        }}
                                        style={{
                                            marginVertical: 8,
                                            borderRadius: 4
                                        }}
                                    />
                                    : <></>}
                        </View>
                        <View style={{ height: 26, backgroundColor: c.GRAY }}></View>
                    </View>
                 </KeyboardAvoidingView>
            </GestureHandlerRootView>
        </ScrollView>
    );
}

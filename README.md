"# weather-app"

Description of project

The goal of the project is to create a simple weather widget.
More specifically, there is a menu at the top of the widget that the user can choose to display the weather data at the moment of using the widget, the current day or choose one of the next six days. For future days he has to click on the 'Select Date' option and then the six days will be displayed. Note that the default option is 'Now'. 
Below, the temperature and weather description is displayed along with the corresponding weather icon.
In addition, the following weather information is displayed inside the widget: 1. Feels like 2. Wind 3. WInd Gust 4. Wind Deg 5. Humidity 6. Pressure.
Finally, at the bottom of the widget there is a line-chart showing the average temperatures of the current day and the next 6 days. It is noted that the line-chart remains static and is not affected by changes made by the user to display different information of weather.

_______________________________________________________________________________________________________

Installation process - Steps

Create project weather-app:
>npm install --global eas-cli
>npx create-expo-app weather-app
>cd weather-app
>npx expo install expo-updates
>eas update:configure
>eas build:configure
>npm install

Install packages:
>npx expo install react-dom react-native-web @expo/webpack-config
>npx expo install @expo/metro-runtime
>npm install react-native-safe-area-context
>npm install react-native-gesture-handler
>npm install moment-timezone
>npm install react-native-chart-kit
>npm install react-native-svg
>npx expo install --fix
>npx expo install --check

import { AppRegistry } from 'react-native'
import App from './js/apps/NavigationApp'

console.disableYellowBox = true

const app = require('./app.json')

AppRegistry.registerComponent(app.name, () => App)

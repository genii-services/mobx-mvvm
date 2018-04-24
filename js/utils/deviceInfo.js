import { Dimensions } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import Orientation from 'react-native-orientation'

const IOS = 'ios'
const ANDROID = 'android'
const LANDSCAPE = 'LANDSCAPE'
const PORTRAIT = 'PORTRAIT'
const PORTRAITUPSIDEDOWN = 'PORTRAITUPSIDEDOWN'

const app = require('../../app.json')


deviceInfo = {
	IOS,
	ANDROID,

	appID: app.name,	// 배포 파일명으로써 배포서버와의 버전 비교시에 사용, 모든 API호출시에도 사용
	bundleID: DeviceInfo.getBundleId(),
	appVersion: DeviceInfo.getVersion(),
	buildNumber: DeviceInfo.getBuildNumber() % 1048576,
	deviceID: DeviceInfo.getUniqueID(),
	deviceOS: /apple/i.test(DeviceInfo.getManufacturer()) ? IOS : ANDROID,  // 장치 아이디
	osVersion: DeviceInfo.getSystemVersion(),	// 시스템 버전
	deviceType: DeviceInfo.getModel(),
	isTablet: DeviceInfo.isTablet(),
	screen: {},
}

function setScreenSize(orientation) {
	let screen = deviceInfo.screen
	screen.orientation = orientation
	let { width, height } = Dimensions.get('window')
	if(orientation == LANDSCAPE) {
		screen.max = screen.width = Math.max(width, height)			
		screen.min = screen.height = Math.min(width, height) 
	}
	else {
		screen.min = screen.width = Math.min(width, height) 
		screen.max = screen.height = Math.max(width, height)
	}
}

setScreenSize(deviceInfo.initialOrientation = Orientation.getInitialOrientation())
Orientation.addOrientationListener((orientation) => {
	setScreenSize(orientation)
})

module.exports = exports = deviceInfo
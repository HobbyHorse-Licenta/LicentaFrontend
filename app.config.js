module.export = {
  expo: {
    name: "HobbyHorse",
    slug: "hobbyhorse",
    description: "App to meet friends by playing sports.",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/randomPics/smallSizeHobbyHorseIcon.png",
    userInterfaceStyle: "light",
    plugins: [
      [
        "expo-image-picker",
        {
          "photosPermission": "The app accesses your photos to let you share them with your friends."
        }
      ],
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow HobbyHorse to use your location."
        }
      ]
    ],
    "splash": {
      "image": "./assets/randomPics/hobbyhorseSplash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "googleServicesFile": "./google-services.json",
      "adaptiveIcon": {
        "foregroundImage": "./assets/randomPics/hobbyhorseIcon.png",
        "backgroundColor": "#FFFFFF"
      },
      "permissions": [
        "android.permission.RECORD_AUDIO",
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.FOREGROUND_SERVICE"
      ],
      "package": "com.alex99_pop.hobbyhorse",
      "config": {
        "googleMaps": {
          "apiKey": process.env.EXPO_PUBLIC_GOOGLEMAPS_API_KEY
        }
      }
    },
    "web": {
      "favicon": "./assets/randomPics/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "db381b96-793a-4834-aba2-0e8fb135db44"
      }
    }
  }
}

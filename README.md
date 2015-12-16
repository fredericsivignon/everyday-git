
# Telerik Friends Sample App for PhoneGap/Cordova

<a href="https://platform.telerik.com/#appbuilder/clone/https://github.com/telerik/platform-friends-hybrid" target="_blank"><img src="http://docs.telerik.com/platform/samples/images/try-in-appbuilder.png" alt="Try in AppBuilder" title="Try in Telerik Platform" /></a>

<a id="top"></a>
* [Overview](#overview)
* [Screenshots](#screenshots)
* [Requirements](#requirements)
* [Configuration](#configuration)
* [Running the Sample](#running-the-sample)

# Overview

This repository contains the Telerik Friends app for PhoneGap/Cordova. It is a sample mobile app demonstrating how to integrate a large gamut of Telerik Platform services into a hybrid mobile application.

The Telerik Friends sample app showcases these features and SDKs:

- Cloud data access (Telerik Backend Services)
- Working with files (Telerik Backend Services)
- User registration and authentication (Telerik Backend Services)
- Authentication with social login providers (Facebook, Google, etc.) (Telerik Backend Services)
- Authentication with AD FS (Telerik Backend Services)
- Using custom user account fields (Telerik Backend Services)
- Basic app analytics (Telerik Analytics)
- Tracking feature usage (Telerik Analytics)

To implement all the features listed above, the sample app utilizes the following Telerik products and SDKs:

- Telerik Backend Services JavaScript SDK&mdash;to connect the app to Telerik Platform
- Telerik Analytics JavaScript SDK&mdash;to connect the app with Telerik Platform
- Telerik Analytics Cordova plugin&mdash;to collect data needed for analyses

# Screenshots

Login Screen|Activity Stream|Activity Details
---|---|---
![Login Screen](https://raw.githubusercontent.com/telerik/platform-friends-hybrid/master/screenshots/ios-login-screen.png)|![Activities stream view](https://raw.githubusercontent.com/telerik/platform-friends-hybrid/master/screenshots/ios-activities-stream.png)|![Activity details view](https://raw.githubusercontent.com/telerik/platform-friends-hybrid/master/screenshots/ios-activitiy-details.png)

# Requirements

Before you begin, you need to ensure that you have the following:

- **An active Telerik Platform account**
Ensure that you can log in to a Telerik Platform account. This can be a free trial account. Depending on your license you may not be able to use all app features. For more information on what is included in the different editions, check out the pricing page. All features included in the sample app work during the free trial period.
- **Telerik AppBuilder** The sample app requires Telerik AppBuilder to run. This can be the in-browser client, the desktop client or the extension for Visual Studio.

# Configuration

The Friends sample app comes fully functional, but to see it in action you must link it to your own Telerik Platform account.

1. Click the **Run in the Platform** button to clone the repository in AppBuilder.<br>
	A new Telerik Platform app is created for you. You can view the app source code on the Code tab.
2. Click the **Data** tab and then click **Enable and populate with sample data**.<br>
	Sample content types with data required for the app to run is automatically created for you. The button also enables the Users service where user accounts for the app are precreated.
3. Click the **Settings** tab.
4. Take note of your **App ID**.
5. Go back to the **Code** tab and continue setting up as explained in the next sections.

> If you happen to break the structure of the automatically generated Friends data, you can delete the app and start over.

## App ID for Telerik Platform

This is a unique string that links the sample mobile app to your Telerik Platform account where all the data is read from/saved. To set it in the app code:

1. Open the `platform-friends-hybrid/scripts/app/settings.js` file.
2. Replace `$TELERIK_APP_ID$` with the App ID of your Telerik Platform app.

## (Optional) Project Key for Telerik Analytics

This is a unique string that links the sample mobile app to a Telerik Analytics project in your account. If you do not set this the sample will still work, but no analytics data will be collected.
	
1. In the Telerik Platform portal, go to your app.
2. Click the **Analytics** tab and then click **Enable**.
6. Go to **Analytics > Settings > Options** and take note of your **Project Key**.
2. Open the `platform-friends-hybrid/scripts/app/settings.js` file.
2. Replace `$EQATEC_PROJECT_KEY$` with the **Project Key** that you acquired earlier.

## (Optional) Facebook App ID
To demonstrate social login, we have preinitialized the sample to use a purpose-built Facebook app by Telerik. However, you still need to enable Facebook integration in the Telerik Platform portal:

1. In the Telerik Platform portal, go to your app.
3. Navigate to **Users > Authentication**.
4. Ensure that the **Facebook** box is checked.

> Note that if you intend to use the code for a production app you need to set up your own Facebook application and adjust the Facebook app ID as follows:
	
1. Open the `platform-friends-hybrid/scripts/app/settings.js` file.
2. Find the `appId: '1408629486049918'` line.
3. Replace the number with your Facebook app ID.

## (Optional) Google Client ID

To demonstrate social login, we have preinitialized the sample to use a Google Client ID owned by Telerik. However, you still need to enable Google integration in the Telerik Platform portal:

1. In the Telerik Platform portal, go to your app.
3. Navigate to **Users > Authentication**.
4. Ensure that the **Google** box is checked.

> Note that if you intend to use the code for a production app you need to set up your own Google Client ID and adjust the code as follows:

1. Open the `platform-friends-hybrid/scripts/app/settings.js` file.
2. Find the `clientId: '406987471724-q1sorfhhcbulk6r5r317l482u9f62ti8.apps.googleusercontent.com'` line.
3. Replace the number with your Google Client ID.
	
## (Optional) Microsoft Account

To demonstrate social login, we have preinitialized the sample to use a  Microsoft Account Client ID owned by Telerik. However, you still need to enable Microsoft Account integration in the Telerik Platform portal:

1. In the Telerik Platform portal, go to your app.
3. Navigate to **Users > Authentication**.
4. Ensure that the **Windows Live** box is checked.

> Note that if you intend to use the code for a production app you need to set up your own Microsoft Account Client ID and adjust the code as follows:

1. Open the `platform-friends-hybrid/scripts/app/settings.js` file.
2. Find the `clientId: '000000004C10D1AF'` line.
3. Replace the number with your Microsoft Account Client ID.

## (Optional) Active Directory Federation Services (AD FS)

The sample app allows users to [register using AD FS](http://docs.telerik.com/platform/backend-services/javascript/users/adfs-login/introduction). To try this integration, configure the following:

1. Replace the default setting in `platform-friends-hybrid/scripts/app/settings.js`:

	```
	adfsRealm: '$ADFS_REALM$'
	adfsEndpoint: '$ADFS_ENDPOINT$'
	```
2. In the Telerik Platform portal, go to your app.
5. Navigate to **Users > Authentication**.
6. Ensure that the **Active Directory** box is checked.
7. Fill in **ADFS metadata URL** with your AD FS server's metadata URL.

> Note that AD FS authentication can only be accomplished over HTTPS.

## HTTPS Connections

By default the Friends Sample is configured to use HTTP. If you want to switch to HTTPS, update the `appSettings.everlive.scheme` setting in `platform-friends-hybrid/scripts/app/settings.js` to `https`.

# Running the Sample

Once the app is configured, you can run it either on a real device or in the Telerik AppBuilder simulator.

To run it, follow the steps in the product's documentation: [Running Apps on Devices](http://docs.telerik.com/platform/appbuilder/testing-your-app/running-on-devices/working-with-devices).

> Ensure that the emulator or the device that you are using has Internet connectivity when running the sample.


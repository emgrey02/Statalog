import { settingsStorage } from "settings";
import * as messaging from "messaging";
import { me as companion } from "companion";


settingsStorage.addEventListener("change", evt => {
  if (evt.oldValue !== evt.newValue) {
    sendValue(evt.key, evt.newValue);
  }
});

if (companion.launchReasons.settingsChanged) {
  sendValue("hourHand", settingsStorage.getItem("hourHand"));
  sendValue("minuteHand", settingsStorage.getItem("minuteHand"));
  sendValue("secondHand", settingsStorage.getItem("secondHand"));
  sendValue("hideBat", settingsStorage.getItem("hideBat"));
  sendValue("heartRate", settingsStorage.getItem("heartRate"));
  sendvalue("calories", settingsStorage.getItem("calories"));
  sendValue("stepCount", settingsStorage.getItem("stepCount"));
  sendValue("floorCount", settingsStorage.getItem("floorCount"));
  sendValue("azm", settingsStorage.getItem("azm"));
}

function sendValue(key, val) {
  if (val) {
    sendSettingsData({
      key: key,
      value: JSON.parse(val)
    });
  }
}

function sendSettingsData(data) {
  // If we have a MessageSocket, send the data to the device
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.log("No peerSocket connection");
  }
}
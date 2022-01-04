import clock from "clock";
import * as document from "document";
import { me as appbit } from "appbit";
import { today, goals } from "user-activity";
import { HeartRateSensor } from "heart-rate";
import { display } from "display";
import { battery } from "power";
import * as settings from './device-settings';

/***************************** get DOM elements *************/
let hourHand = document.getElementById("hours");
let minHand = document.getElementById("mins");
let secHand = document.getElementById("secs");

const stepCount = document.getElementById("step-count");
const floorCount = document.getElementById("floor-count");

const heartRate = document.getElementById("heart-rate");

const batteryLevel = document.getElementById("battery-level");
const batteryText = document.getElementById("percentage");

const calories = document.getElementById("calories");
const azm = document.getElementById("azm");

//icons
const heartImg = document.getElementById('hr-img');
const calImg = document.getElementById('cal-img');
const stImg = document.getElementById('st-img');
const flImg = document.getElementById('fl-img');
const azmImg = document.getElementById('azm-img');

/********************* CLOCK *******************************/
// Tick every second
clock.granularity = "seconds";

// Returns an angle (0-360) for the current hour in the day, including minutes
function hoursToAngle(hours, minutes) {
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle;
}

// Returns an angle (0-360) for minutes
function minutesToAngle(minutes) {
  return (360 / 60) * minutes;
}

// Returns an angle (0-360) for seconds
function secondsToAngle(seconds) {
  return (360 / 60) * seconds;
}

// Rotate the hands every tick
function updateClock() {
  let today = new Date();
  let hours = today.getHours() % 12;
  let mins = today.getMinutes();
  let secs = today.getSeconds();
  
  //Get the date
  const monthText = document.getElementById("month");
  const dayText = document.getElementById("day");
  
  let months = ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug",  "Sep",  "Oct",  "Nov", "Dec"];
  let month = months[today.getMonth()];
  let day = today.getDate();
  dayText.text = day;
  monthText.text = month;

  hourHand.groupTransform.rotate.angle = hoursToAngle(hours, mins);
  minHand.groupTransform.rotate.angle = minutesToAngle(mins);
  secHand.groupTransform.rotate.angle = secondsToAngle(secs);
}

// Update the clock every tick event
clock.addEventListener("tick", updateClock);

function startSensor(stat) {
  console.log(stat);
}

/************* STEPS/FLOOR COUNT ****************/

if (appbit.permissions.granted("access_activity")) {
  let numSteps = today.adjusted.steps;
  let numFloors = today.adjusted.elevationGain;
  stepCount.text = numSteps;
  floorCount.text = numFloors;
}

/*********** HEART RATE ***********/

if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) {
  const hrm = new HeartRateSensor({frequency: 1 });
  hrm.addEventListener("reading", () => {
    heartRate.text = hrm.heartRate;
  })
  display.addEventListener("change", () => {
    display.on ? hrm.start() : hrm.stop();
  })
  hrm.start();
}

/**************** BATTERY ******************/

batteryLevel.width = Math.floor(battery.chargeLevel * 26 / 100);
batteryText.text = Math.floor(battery.chargeLevel) + '%';

/*************** CALORIES ******************/

calories.text = today.adjusted.calories;

/******************** AZM ***********************/

azm.text = today.adjusted.activeZoneMinutes.total;

/************** SETTINGS *********************/

function settingsCallback(data) {
  if (!data) {
    return;
  }
  if (data.hourHand) {
    const hoursHand = document.getElementById('hour-hand');
    hoursHand.style.fill = data.hourHand;
  }
  if (data.minuteHand) {
    const minutesHand = document.getElementById('min-hand');
    minutesHand.style.fill = data.minuteHand;
  }
  if (data.secondHand) {
    const secondsHand = document.getElementById('second-hand');
    secondsHand.style.fill = data.secondHand;
  }
  if (data.hideBat) {
    batteryText.text = Math.floor(battery.chargeLevel) + '%';
  } 
  if (!data.hideBat) {
    batteryText.text = "";
  }
  let statsToggle = [data.heartRate, data.calories, data.stepCount, data.floorCount, data.azm];
  let images = [heartImg, calImg, stImg, flImg, azmImg];
  let text = [heartRate, calories, stepCount, floorCount, azm]
  toggleStats(statsToggle, images, text);
}

function toggleStats(statArray, images, text) {
  for (let i = 0; i < statArray.length; i++) {
    if (statArray[i]) {
      images[i].style.display = "inherit";
      text[i].style.display = "inherit";
    } else {
      images[i].style.display = "none";
      text[i].style.display = "none";
    }
  }
}

settings.initialize(settingsCallback);

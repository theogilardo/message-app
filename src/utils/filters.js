import Vue from "vue";

Vue.filter("setTimeHourMinutes", (messageObj) => {
  const objLength = messageObj.length - 1;
  const lastTimestamp = messageObj[objLength].timestamp;
  const date = new Date(lastTimestamp);
  const hours = date.getHours();
  const minutes = `0${date.getMinutes()}`;
  const formattedTime = `${hours}:${minutes.substr(-2)}`;
  return formattedTime;
});

Vue.filter("sliceMessage", (messageObj) => {
  const objLength = messageObj.length - 1;
  return messageObj[objLength].message.slice(0, 14) + "..";
});

export const STRFTimeToDate = (STRFtime) => {
  // https://github.com/NodabFamily/OSDS-server/blob/develop/archives/views.py#L45
  // strftime("%m/%d/%Y, %H:%M:%S")
  // Example : "08/07/2022, 04:08:38"

  if (typeof STRFtime !== "string") {
    console.log("STRFtime is not a string");
    return null;
  }

  const temp = STRFtime.split(",", 2);
  const date = temp[0].split("/", 3);
  const time = temp[1].split(":", 3);

  let Y = parseInt(date[2]); // year
  let m = parseInt(date[0]) - 1; // month
  let D = parseInt(date[1]); // day

  let H = parseInt(time[0]); // hour
  let M = parseInt(time[1]); // minute
  let S = parseInt(time[2]); // second

  let result = new Date(Y, m, D, H, M, S);
  return result;
};

export const getIntervalToStringByCase = (otherSTRFtime) => {
  if (otherSTRFtime == null) return "";

  let now = new Date();

  let intervalMS = Math.abs(now.getTime() - otherSTRFtime.getTime());
  let intervalSecond = intervalMS / 1000;
  let intervalMinute = intervalSecond / 60;
  let intervalHour = intervalMinute / 60;
  let intervalDay = intervalHour / 24;

  if(intervalMinute < 1.0)
    return "방금 전";
  else if(1.0 <= intervalMinute && intervalMinute < 60)
    return Math.floor(intervalMinute) + "분 전";
  else if(1 <= intervalHour && intervalHour < 24)
    return Math.floor(intervalHour) + "시간 전";
  else if(1 <= intervalDay && intervalDay < 30)
    return Math.floor(intervalDay) + "일 전";
  else
    return otherSTRFtime.getFullYear() + "/" + otherSTRFtime.getMonth() + "/" + otherSTRFtime.getDate();
};

export const isGalleryNew = (otherSTRFtime) => {
    if (otherSTRFtime == null) return false;

    let now = new Date();
  
    let intervalMS = Math.abs(now.getTime() - otherSTRFtime.getTime());
    let intervalDay = intervalMS / (1000 * 60 * 60 * 24);

    if(intervalDay < 2.0)
        return true;

    return false;
};

export const dateToString = (date) => {
  if(date === null)
    return " ";
  return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
};
import axios from "axios";
import { config } from "../config";

const URL = config.URL + "time/";

// day기준으로 day+num 날까지
//body{day:String, num:Number}
//res{success:true/false, time:[date:String, time:Number]} ->분기준
export const getDay = async (num: Number, day: string) => {};

// start 달부터 end달까지 res.data.time.time -> 분기준
// body{month:String, num:Number}
// res{success:true,false, time:[month:Number, time:Number]}
export const getMonth = async (year: Number, month: Number, num: Number) => {
  try {
    //`${year}-${month}-${num}`
    const result = await axios.get(URL + "month/" + `${year}-${month}-${num}`, {
      withCredentials: true,
    });
    console.log(result);
    if (result.status === 200) {
      return { success: true, data: result.data };
    } else if (result.status === 500) {
      return { success: false, err: result.data.err };
    } else {
      return null;
    }
  } catch (e) {
    console.log("error", e);
    return null;
  }
};

// body: {date: 'YYYY.MM.DD', time:Number (초)}
// res:{success: true/false}
export const saveTime = async (date: String, time: Number) => {
  try {
    const result = await axios.post(
      URL + "save",
      {
        date: date,
        time: time,
      },
      { withCredentials: true }
    );
    if (result.status === 204) {
      return { success: true, data: result.data };
    } else if (result.status === 500) {
      return { success: false, err: result.data.err };
    } else {
      return null;
    }
  } catch (e) {
    console.log("error", e);
    return null;
  }
};

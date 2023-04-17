import * as dayjs from "dayjs";
import "dayjs/locale/pt-br";
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin

dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.locale('pt-br');


export default dayjs;
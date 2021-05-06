import moment from "moment";

const convert = (date, formatStr = 'DD MM YYYY - HH:mm') => moment(new Date(date)).format(formatStr);

export const DateServices = {
  convert
}

import numeral from "numeral";
import moment from "moment";

const formatter = {
  formatPrice(value) {
    return numeral(value).format("0,0");
  },

  formatDate(value) {
    return moment(value).format("DD/MM/YYYY");
  },
};

export default formatter;

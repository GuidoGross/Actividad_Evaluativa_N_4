export function apply_date_mask(raw_value: string, is_deleting: boolean): string {
  if (raw_value.length > 8) raw_value = raw_value.substring(0, 8);
  let formatted_date = "";
  let day_string = raw_value.substring(0, 2);
  let month_string = raw_value.substring(2, 4);
  let year_string = raw_value.substring(4, 8);
  let day_number = parseInt(day_string, 10);
  let month_number = parseInt(month_string, 10);
  let year_number = parseInt(year_string, 10);
  if (!isNaN(month_number)) {
    if (month_number > 12) month_number = 12;
    if (month_number === 0 && month_string.length === 2) month_number = 1;
    if (month_string.length === 2) month_string = month_number.toString().padStart(2, "0");
    else if (month_string.length === 1 && month_number >= 2) {
      month_string = month_number.toString().padStart(2, "0");
    }
    else month_string = month_number.toString();
  }
  if (!isNaN(year_number) && year_string.length === 4) {
    let current_year = new Date().getFullYear();
    if (year_number > current_year) year_number = current_year;
    if (year_number < 1920) year_number = 1920;
    year_string = year_number.toString();
  }
  if (!isNaN(day_number)) {
    let maximum_days = 31;
    if (!isNaN(month_number)) {
      if (month_number === 4 || month_number === 6 || month_number === 9 || month_number === 11) {
        maximum_days = 30;
      } else if (month_number === 2) {
        if (!isNaN(year_number) && year_string.length === 4) {
          let is_leap_year = (year_number % 4 === 0 && year_number % 100 !== 0) || (year_number % 400 === 0);
          maximum_days = is_leap_year ? 29 : 28;
        } else maximum_days = 29;
      }
    }
    if (day_number > maximum_days) day_number = maximum_days;
    if (day_number === 0 && day_string.length === 2) day_number = 1;
    if (day_string.length === 2) day_string = day_number.toString().padStart(2, "0");
    else if (day_string.length === 1 && day_number >= 4) day_string = day_number.toString().padStart(2, "0");
    else day_string = day_number.toString();
  }
  if (day_string.length > 0) {
    formatted_date += day_string;
    const day_complete = day_string.length === 2;
    if (day_complete && !is_deleting && raw_value.length <= 2) formatted_date += "/";
    else if (raw_value.length > 2) formatted_date += "/";
  }
  if (month_string.length > 0) {
    formatted_date += month_string;
    const month_complete = month_string.length === 2;
    if (month_complete && !is_deleting && raw_value.length <= 4) formatted_date += "/";
    else if (raw_value.length > 4) formatted_date += "/";
  }
  if (year_string.length > 0) {
    if (year_string.length === 4) formatted_date += year_string[0] + "." + year_string.substring(1);
    else formatted_date += year_string;
  }
  return formatted_date;
}

export function apply_expiry_mask(raw_value: string, is_deleting: boolean): string {
  if (raw_value.length > 4) raw_value = raw_value.substring(0, 4);
  const now = new Date();
  const current_year_short = now.getFullYear() % 100;
  const current_month = now.getMonth() + 1;
  let month_string = raw_value.substring(0, 2);
  let year_string = raw_value.substring(2, 4);
  let month_number = parseInt(month_string, 10);
  let year_number = parseInt(year_string, 10);
  let corrected_year = year_number;
  if (year_string.length === 2 && !isNaN(year_number)) {
    if (year_number < current_year_short) corrected_year = current_year_short;
    year_string = corrected_year.toString().padStart(2, "0");
  }
  if (!isNaN(month_number)) {
    if (month_number > 12) month_number = 12;
    if (month_number === 0 && month_string.length === 2) month_number = 1;
    if (year_string.length === 2 && corrected_year === current_year_short) {
      if (month_number < current_month) month_number = current_month;
    }
    if (month_string.length === 2) month_string = month_number.toString().padStart(2, "0");
    else if (month_string.length === 1 && month_number >= 2) {
      month_string = month_number.toString().padStart(2, "0");
    } else month_string = month_number.toString();
  }
  let formatted = "";
  if (month_string.length > 0) {
    formatted += month_string;
    const month_complete = month_string.length === 2;
    if (month_complete && !is_deleting && raw_value.length <= 2) formatted += "/";
    else if (raw_value.length > 2) formatted += "/";
  }
  if (year_string.length > 0) formatted += year_string;
  return formatted;
}

export function complete_expiry_on_blur(value: string): string {
  const now = new Date();
  const current_year_short = now.getFullYear() % 100;
  const current_month = now.getMonth() + 1;
  const partial_match = value.match(/^(\d{2})\/(\d{1})$/);
  if (partial_match) {
    const year_str = current_year_short.toString().padStart(2, "0");
    let month_number = parseInt(partial_match[1], 10);
    if (month_number < current_month) month_number = current_month;
    return month_number.toString().padStart(2, "0") + "/" + year_str;
  }
  return value;
}
import _ from "lodash";

class Utilities {

    /**
     * Round a given value to a step e.g 0.5
     * @param value
     * @param step
     * @returns {number}
     */
    round(value, step) {
        step || (step = 1.0);
        let inv = 1.0 / step;
        return Math.round(value * inv) / inv;
    }

    /**
     * Format the date into something more useful
     * @param dateString
     * @returns {string}
     */
    formatDate = (dateString) => {

        if (_.isEmpty(dateString)) {
            console.log('an empty date string was passed');
            return '';
        }

        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth()).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;

    }


}
export default Utilities;

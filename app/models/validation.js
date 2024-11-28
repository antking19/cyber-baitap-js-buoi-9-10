import { getEleId } from "../controllers/main.js";

class Validation {
    checkEmpty(value, divId, mess) {
        if (value === "") {
            getEleId(divId).innerHTML = mess;
            getEleId(divId).style.display = "block";
            return false;
        }

        getEleId(divId).innerHTML = "";
        getEleId(divId).style.display = "none";
        return true;
    }

    checkSelect(idSelect, divId, mess) {
        if (getEleId(idSelect).selectedIndex === 0) {
            getEleId(divId).innerHTML = mess;
            getEleId(divId).style.display = "block";
            return false;
        }

        getEleId(divId).innerHTML = "";
        getEleId(divId).style.display = "none";
        return true;
    }

    checkPassword(value, divId, mess) {
        const letter =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;

        if (value.match(letter)) {
            getEleId(divId).innerHTML = "";
            getEleId(divId).style.display = "none";
            return true;
        }

        getEleId(divId).innerHTML = mess;
        getEleId(divId).style.display = "block";
        return false;
    }

    checkLength(value, divId, mess, min, max) {
        if (value.length >= min && value.length <= max) {
            getEleId(divId).innerHTML = "";
            getEleId(divId).style.display = "none";
            return true;
        }

        getEleId(divId).innerHTML = mess;
        getEleId(divId).style.display = "block";
        return false;
    }

    checkNumberFromTo(value, divId, mess, min, max) {
        if (value >= min && value <= max) {
            getEleId(divId).innerHTML = "";
            getEleId(divId).style.display = "none";
            return true;
        }
        getEleId(divId).innerHTML = mess;
        getEleId(divId).style.display = "block";
        return false;
    }

    checkEmail(value, divId, mess) {
        const letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (value.match(letter)) {
            getEleId(divId).innerHTML = "";
            getEleId(divId).style.display = "none";
            return true;
        }

        getEleId(divId).innerHTML = mess;
        getEleId(divId).style.display = "block";
        return false;
    }

    checkDate(value, divId, mess) {
        const letter = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

        if (value.match(letter)) {
            getEleId(divId).innerHTML = "";
            getEleId(divId).style.display = "none";
            return true;
        }

        getEleId(divId).innerHTML = mess;
        getEleId(divId).style.display = "block";
        return false;
    }

    checkUserExist(value, divId, mess, listStaff) {
        let isExist = false;
        for (let i = 0; i < listStaff.length; i++) {
            const staff = listStaff[i];
            if (staff.user === value) {
                isExist = true;
                break;
            }
        }

        if (isExist) {
            // user ton tai => khong hop le
            getEleId(divId).innerHTML = mess;
            getEleId(divId).style.display = "block";
            return false;
        }
        getEleId(divId).innerHTML = "";
        getEleId(divId).style.display = "none";
        return true;
    }
}

export default Validation;

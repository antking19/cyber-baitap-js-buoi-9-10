import { getEleId } from "../controllers/main.js";

class Staff {
    constructor(
        _user,
        _name,
        _email,
        _password,
        _datePicker,
        _basicSalary,
        _position,
        _hours
    ) {
        this.user = _user;
        this.name = _name;
        this.email = _email;
        this.password = _password;
        this.datePicker = _datePicker;
        this.basicSalary = _basicSalary;
        this.position = _position;
        this.hours = _hours;
        this.totalSalary = 0;
        this.employeeType = "";
    }

    calcTotalSalary() {
        if (this.position === "Sếp") {
            this.totalSalary = this.basicSalary * 3;
        }
        if (this.position === "Trưởng phòng") {
            this.totalSalary = this.basicSalary * 2;
        }
        if (this.position === "Nhân viên") {
            this.totalSalary = this.basicSalary;
        }
    }

    arrangeEmployee() {
        if (this.hours >= 192) {
            this.employeeType = "Xuất sắc";
        } else if (this.hours >= 176) {
            this.employeeType = "Giỏi";
        } else if (this.hours >= 160) {
            this.employeeType = "Khá";
        } else {
            this.employeeType = "Trung bình";
        }
    }
}

export default Staff;

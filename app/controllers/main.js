import Staff from "../models/staff.js";
import StaffList from "../models/staff-list.js";
import Validation from "../models/validation.js";

export const getEleId = (id) => document.getElementById(id);

//create new object from class StaffList
const staffList = new StaffList();

// create new object from class Validtion
const validation = new Validation();

// render staffList
const renderStaffList = (data) => {
    let content = "";
    for (let i = 0; i < data.length; i++) {
        const staff = data[i];
        content += `
            <tr>
                <td>${staff.user}</td>
                <td>${staff.name}</td>
                <td>${staff.email}</td>
                <td>${staff.datePicker}</td>
                <td>${staff.position}</td>
                <td>${staff.totalSalary}</td>
                <td>${staff.employeeType}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="handleEditStaff('${staff.user}')">Edit</button>
                    <button class="btn btn-danger" onclick="handleDeleteStaff('${staff.user}')">Delete</button>
                </td>
            </tr>
        `;
    }
    getEleId("tableDanhSach").innerHTML = content;
};

const getInfoStaff = (isAdd) => {
    const staffUser = getEleId("tknv").value;
    const staffName = getEleId("name").value;
    const staffEmail = getEleId("email").value;
    const staffPassword = getEleId("password").value;
    const staffDatePicker = getEleId("datepicker").value;
    const staffBasicSalary = getEleId("luongCB").value;
    const staffPosition = getEleId("chucvu").value;
    const staffHours = getEleId("gioLam").value;

    let isValidId = true;

    if (isAdd) {
        // staff user
        isValidId &=
            validation.checkEmpty(
                staffUser,
                "tbTKNV",
                "Please enter staff user!"
            ) &&
            validation.checkLength(
                staffUser,
                "tbTKNV",
                "Please enter character min 4 and max 6!",
                4,
                6
            ) &&
            validation.checkUserExist(
                staffUser,
                "tbTKNV",
                "User already exists!",
                staffList.arr
            );
    }

    // staff name
    isValidId &= validation.checkEmpty(
        staffName,
        "tbTen",
        "Please enter staff name!"
    );

    // staff email
    isValidId &=
        validation.checkEmpty(
            staffEmail,
            "tbEmail",
            "Please enter staff email!"
        ) &&
        validation.checkEmail(
            staffEmail,
            "tbEmail",
            "Email wrong, Please enter email again!"
        );

    // staff password
    isValidId &=
        validation.checkEmpty(
            staffPassword,
            "tbMatKhau",
            "Please enter staff password!"
        ) &&
        validation.checkPassword(
            staffPassword,
            "tbMatKhau",
            "Password wrong, Please enter again!"
        ) &&
        validation.checkLength(
            staffPassword,
            "tbMatKhau",
            "Please enter character min 6 and max 10!",
            6,
            10
        );

    // staff DatePicker
    isValidId &=
        validation.checkEmpty(
            staffDatePicker,
            "tbNgay",
            "Please enter staff date picker!"
        ) &&
        validation.checkDate(
            staffDatePicker,
            "tbNgay",
            "Please enter staff date mm/dd/yyyy !"
        );

    // staff basic salary
    isValidId &=
        validation.checkEmpty(
            staffBasicSalary,
            "tbLuongCB",
            "Please enter staff basic salary!"
        ) &&
        validation.checkNumberFromTo(
            staffBasicSalary,
            "tbLuongCB",
            "Please enter staff basic salary from 1.000.000 to 20.000.000",
            1000000,
            20000000
        );

    // staff Position
    isValidId &= validation.checkSelect(
        "chucvu",
        "tbChucVu",
        "Please choose type of position!"
    );

    // staff hours
    isValidId &=
        validation.checkEmpty(
            staffHours,
            "tbGiolam",
            "Please enter staff hours!"
        ) &&
        validation.checkNumberFromTo(
            staffHours,
            "tbGiolam",
            "Please enter time do of staff from 80 hours to 200 hours!",
            80,
            200
        );

    if (!isValidId) return null;

    const staff = new Staff(
        staffUser,
        staffName,
        staffEmail,
        staffPassword,
        staffDatePicker,
        staffBasicSalary,
        staffPosition,
        staffHours
    );

    staff.calcTotalSalary();

    staff.arrangeEmployee();

    return staff;
};

/**
 * handleEdit staff
 */
const handleEditStaff = (user) => {
    getEleId("tbTKNV").innerHTML = "";
    getEleId("tbTKNV").style.display = "none";
    getEleId("tbTen").innerHTML = "";
    getEleId("tbTen").style.display = "none";
    getEleId("tbEmail").innerHTML = "";
    getEleId("tbEmail").style.display = "none";
    getEleId("tbMatKhau").innerHTML = "";
    getEleId("tbMatKhau").style.display = "none";
    getEleId("tbNgay").innerHTML = "";
    getEleId("tbNgay").style.display = "none";
    getEleId("tbLuongCB").innerHTML = "";
    getEleId("tbLuongCB").style.display = "none";
    getEleId("tbChucVu").innerHTML = "";
    getEleId("tbChucVu").style.display = "none";
    getEleId("tbGiolam").innerHTML = "";
    getEleId("tbGiolam").style.display = "none";

    getEleId("header-title").innerHTML = "Edit Staff";
    getEleId("btnThemNV").style.display = "none";
    getEleId("btnCapNhat").style.display = "inline-block";
    getEleId("tknv").setAttribute("disabled", true);

    const staff = staffList.editStaff(user);

    if (!staff) return;

    getEleId("tknv").value = staff.user;
    getEleId("name").value = staff.name;
    getEleId("email").value = staff.email;
    getEleId("password").value = staff.password;
    getEleId("datepicker").value = staff.datePicker;
    getEleId("luongCB").value = staff.basicSalary;
    getEleId("chucvu").value = staff.position;
    getEleId("gioLam").value = staff.hours;
};
window.handleEditStaff = handleEditStaff;

/**
 * handleDelete staff
 */
const handleDeleteStaff = (user) => {
    staffList.removeStaff(user);

    renderStaffList(staffList.arr);

    setLocalStorage();
};
window.handleDeleteStaff = handleDeleteStaff;

// setLocalStorage
const setLocalStorage = () => {
    const dataJSON = staffList.arr;
    //convert dataJSON to data string
    const dataString = JSON.stringify(dataJSON);
    // save data string to local storage
    localStorage.setItem("STAFF_LIST", dataString);
};

// getLocalStorage
const getLocalStorage = () => {
    const dataString = localStorage.getItem("STAFF_LIST");

    // check data string is null => return
    if (!dataString) return;

    // convert data string to dataJSON
    const dataJSON = JSON.parse(dataString);
    staffList.arr = dataJSON;

    renderStaffList(staffList.arr);
};

getLocalStorage();

getEleId("btnThemNV").onclick = function () {
    const staff = getInfoStaff(true);

    if (!staff) return;

    staffList.addStaff(staff);

    renderStaffList(staffList.arr);

    setLocalStorage();

    getEleId("btnDong").click();
};

getEleId("btnThem").onclick = function () {
    getEleId("tbTKNV").innerHTML = "";
    getEleId("tbTKNV").style.display = "none";
    getEleId("tbTen").innerHTML = "";
    getEleId("tbTen").style.display = "none";
    getEleId("tbEmail").innerHTML = "";
    getEleId("tbEmail").style.display = "none";
    getEleId("tbMatKhau").innerHTML = "";
    getEleId("tbMatKhau").style.display = "none";
    getEleId("tbNgay").innerHTML = "";
    getEleId("tbNgay").style.display = "none";
    getEleId("tbLuongCB").innerHTML = "";
    getEleId("tbLuongCB").style.display = "none";
    getEleId("tbChucVu").innerHTML = "";
    getEleId("tbChucVu").style.display = "none";
    getEleId("tbGiolam").innerHTML = "";
    getEleId("tbGiolam").style.display = "none";

    getEleId("formStaff").reset();
    getEleId("header-title").innerHTML = "Log In";
    getEleId("btnCapNhat").style.display = "none";
    getEleId("btnThemNV").style.display = "inline-block";
    getEleId("tknv").removeAttribute("disabled");
};

getEleId("btnCapNhat").onclick = function () {
    const staff = getInfoStaff(false);

    staffList.updateStaff(staff);

    renderStaffList(staffList.arr);

    setLocalStorage();

    getEleId("btnDong").click();
};

getEleId("searchName").addEventListener("keyup", function () {
    const keywordTypeStaff = getEleId("searchName").value;

    const staffsSearch = staffList.searchTypeStaff(keywordTypeStaff);

    if (staffsSearch.length > 0) {
        renderStaffList(staffsSearch);
    }
});

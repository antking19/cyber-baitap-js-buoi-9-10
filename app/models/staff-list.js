class StaffList {
    constructor() {
        this.arr = [];
    }

    addStaff(staff) {
        this.arr.push(staff);
    }

    findIndexStaff(user) {
        for (let i = 0; i < this.arr.length; i++) {
            const staff = this.arr[i];
            if (staff.user === user) return i;
        }
        return -1;
    }

    removeStaff(user) {
        const index = this.findIndexStaff(user);

        if (index !== -1) this.arr.splice(index, 1);
    }

    editStaff(user) {
        const index = this.findIndexStaff(user);

        if (index !== -1) return this.arr[index];

        return null;
    }

    updateStaff(staff) {
        const index = this.findIndexStaff(staff.user);

        if (index !== -1) this.arr[index] = staff;
    }

    searchTypeStaff(keyword) {
        let result = [];
        for (let i = 0; i < this.arr.length; i++) {
            const staff = this.arr[i];
            const keywordLowerCase = keyword.toLowerCase();
            const staffLowerCase = staff.employeeType.toLowerCase();

            if (staffLowerCase.indexOf(keywordLowerCase) !== -1) {
                result.push(staff);
            }
        }

        return result;
    }
}

export default StaffList;

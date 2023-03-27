"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDataByMonths = void 0;
const formatDataByMonths = (data) => {
    let initialData = [
        { id: 1, name: "Janauary", data: 0 },
        { id: 2, name: "February", data: 0 },
        { id: 3, name: "March", data: 0 },
        { id: 4, name: "April", data: 0 },
        { id: 5, name: "May", data: 0 },
        { id: 6, name: "June", data: 0 },
        { id: 7, name: "July", data: 0 },
        { id: 8, name: "August", data: 0 },
        { id: 9, name: "September", data: 0 },
        { id: 10, name: "October", data: 0 },
        { id: 11, name: "November", data: 0 },
        { id: 12, name: "December", data: 0 },
    ];
    data.map((d) => initialData.map((n) => {
        if (+d._id === +n.id) {
            initialData[n.id - 1] = Object.assign(Object.assign({}, n), { data: d.data });
        }
    }));
    let MonthName = [];
    let MonthData = [];
    initialData.map((d) => {
        MonthName.push(d.name);
        MonthData.push(d.data);
    });
    return {
        labels: MonthName,
        data: MonthData,
    };
};
exports.formatDataByMonths = formatDataByMonths;

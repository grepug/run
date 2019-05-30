"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniq = function (arr) {
    return arr.filter(function (el, i) {
        return i ===
            arr.findIndex(function (obj) { return JSON.stringify(obj) === JSON.stringify(el); });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQWEsUUFBQSxJQUFJLEdBQUcsVUFBQyxHQUFVO0lBQzNCLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FDTixVQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ0YsT0FBQSxDQUFDO1lBQ0QsR0FBRyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBMUMsQ0FBMEMsQ0FBQztJQURoRSxDQUNnRSxDQUN2RTtBQUpELENBSUMsQ0FBQyJ9
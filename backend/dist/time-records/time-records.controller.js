"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeRecordsController = void 0;
const common_1 = require("@nestjs/common");
const time_records_service_1 = require("./time-records.service");
let TimeRecordsController = class TimeRecordsController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll() {
        return this.service.findAll();
    }
    findByEmployee(id) {
        return this.service.findByEmployee(+id);
    }
    create(body) {
        return this.service.create(body);
    }
};
exports.TimeRecordsController = TimeRecordsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TimeRecordsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('employee/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TimeRecordsController.prototype, "findByEmployee", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TimeRecordsController.prototype, "create", null);
exports.TimeRecordsController = TimeRecordsController = __decorate([
    (0, common_1.Controller)('time-records'),
    __metadata("design:paramtypes", [time_records_service_1.TimeRecordsService])
], TimeRecordsController);
//# sourceMappingURL=time-records.controller.js.map
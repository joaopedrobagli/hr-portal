"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeRecordsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const time_record_entity_1 = require("./time-record.entity");
const time_records_controller_1 = require("./time-records.controller");
const time_records_service_1 = require("./time-records.service");
let TimeRecordsModule = class TimeRecordsModule {
};
exports.TimeRecordsModule = TimeRecordsModule;
exports.TimeRecordsModule = TimeRecordsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([time_record_entity_1.TimeRecord])],
        controllers: [time_records_controller_1.TimeRecordsController],
        providers: [time_records_service_1.TimeRecordsService],
    })
], TimeRecordsModule);
//# sourceMappingURL=time-records.module.js.map
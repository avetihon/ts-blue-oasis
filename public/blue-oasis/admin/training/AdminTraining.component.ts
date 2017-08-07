import { Component } from '@angular/core';
import AdminService from '../../services/Admin.service';

@Component({
    selector: 'cmp-training',
    templateUrl: 'blue-oasis/admin/training/adminTraining.component.html'
})
class AdminTrainingComponent {

    private __adminService: AdminService;

    public constructor(adminService: AdminService) {
        this.__adminService = adminService;
    }

    public send(): void {
        this.__adminService.sendTrainSet({a: 1}).then((res: any) => {
            console.log(res)
        })
    }
}

export default AdminTrainingComponent;

import { Component } from '@angular/core';
import DataService from '../../services/Data.service';
import IDictionary from '../../models/IDictionary';
import MovementTypeList from '../../config/MovementTypeList';

@Component({
    selector: 'cmp-data',
    templateUrl: './adminData.component.html',
})
class AdminDataComponent {

    private static readonly COLOR_TRANSPARENT: string = 'rgba(0,0,0,0)';
    private static readonly COLOR_BLUE: string = 'rgb(54, 162, 235)';
    private static readonly COLOR_RED: string = 'rgb(255, 99, 132)';
    private static readonly COLOR_GREEN: string = 'rgb(75, 192, 192)';
    private static readonly CHART_TYPE: string = 'line';
    private static readonly LABELS_SIZE: number = 200;

    public dataListStanding: IDictionary<any>[];
    public dataListWalking: IDictionary<any>[];
    public chartType: string;
    public chartLabels: number[];
    public chartOptions: IDictionary<any>;
    public chartColors: IDictionary<any>[];
    public dataLoaded: boolean;
    private __dataService: DataService;

    public constructor(dataService: DataService) {
        this.__dataService = dataService;

        this.chartType = AdminDataComponent.CHART_TYPE;
        this.chartOptions = {
            responsive: true,
            scales: { xAxes: [{ display: false }] },
            legend: { labels: { usePointStyle: true } },
        };
        this.chartColors = [
            {
                backgroundColor: AdminDataComponent.COLOR_TRANSPARENT,
                borderColor: AdminDataComponent.COLOR_BLUE,
            },
            {
                backgroundColor: AdminDataComponent.COLOR_TRANSPARENT,
                borderColor: AdminDataComponent.COLOR_RED,
            },
            {
                backgroundColor: AdminDataComponent.COLOR_TRANSPARENT,
                borderColor: AdminDataComponent.COLOR_GREEN,
            }
        ];
        this.chartLabels = [...Array(AdminDataComponent.LABELS_SIZE).keys()];
        this.__loadChartData();
    }

    private __loadChartData(): void {
        this.__dataService.getDataListByMovementType().subscribe((response: any) => {
            const dataList: IDictionary<any>[] = response.data;
            let i: number;
            let len: number;
            let data: IDictionary<any>;
            let currentDataProperty: IDictionary<any>[];
            for (i = 0, len = dataList.length; i < len; i += 1) {
                data = dataList[i];

                currentDataProperty = [
                    {data: data.x, label: 'x', pointRadius: 0},
                    {data: data.y, label: 'y', pointRadius: 0},
                    {data: data.z, label: 'z', pointRadius: 0}
                ];

                switch (data._id) {
                    case MovementTypeList.STANDING: {
                        this.dataListStanding = currentDataProperty;
                        break;
                    }
                    case MovementTypeList.WALKING: {
                        this.dataListWalking = currentDataProperty;
                        break;
                    }
                }
            }

            this.dataLoaded = true;
        });
    }
}

export default AdminDataComponent;

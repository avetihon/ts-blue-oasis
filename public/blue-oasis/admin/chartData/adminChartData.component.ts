import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import IDictionary from '../../models/IDictionary';

@Component({
    selector: 'cmp-data',
    templateUrl: './adminChartData.component.html',
})
class AdminChartDataComponent implements OnInit {

    private static readonly COLOR_TRANSPARENT: string = 'rgba(0,0,0,0)';
    private static readonly COLOR_BLUE: string = 'rgb(54, 162, 235)';
    private static readonly COLOR_RED: string = 'rgb(255, 99, 132)';
    private static readonly COLOR_GREEN: string = 'rgb(75, 192, 192)';
    private static readonly CHART_TYPE: string = 'line';
    private static readonly LABELS_SIZE: number = 200;

    public chartType: string;
    public chartLabels: number[];
    public chartOptions: IDictionary<any>;
    public chartColors: IDictionary<string>[];
    public chartData: IDictionary<object | string>[];
    private __route: ActivatedRoute;

    public constructor(route: ActivatedRoute) {
        this.__route = route;

        this.chartType = AdminChartDataComponent.CHART_TYPE;
        this.chartOptions = {
            responsive: true,
            scales: {xAxes: [{display: false}]},
            legend: {labels: {usePointStyle: true}},
        };
        this.chartColors = [
            {
                backgroundColor: AdminChartDataComponent.COLOR_TRANSPARENT,
                borderColor: AdminChartDataComponent.COLOR_BLUE,
            },
            {
                backgroundColor: AdminChartDataComponent.COLOR_TRANSPARENT,
                borderColor: AdminChartDataComponent.COLOR_RED,
            },
            {
                backgroundColor: AdminChartDataComponent.COLOR_TRANSPARENT,
                borderColor: AdminChartDataComponent.COLOR_GREEN,
            }
        ];
        this.chartLabels = [...Array(AdminChartDataComponent.LABELS_SIZE).keys()];
    }

    public ngOnInit(): void {
        this.__route.data.subscribe((response: IDictionary<object>) => {
            this.chartData = response.chartData as IDictionary<object | string>[];
        });
    }
}

export default AdminChartDataComponent;

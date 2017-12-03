import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import DataService from '../../services/Data.service';
import IChartData from '../../models/IChartData';
import ISuccessResponse from '../../models/ISuccessResponse';
import IDictionary from '../../models/IDictionary';

@Injectable()
class AdminChartDataResolveService implements Resolve<IDictionary<object | string>[]> {

    private __dataService: DataService;

    public constructor(dataService: DataService) {
        this.__dataService = dataService;
    }

    public resolve(route: ActivatedRouteSnapshot) {
        return this.__dataService.getDataListByMovementType()
            .map((response: ISuccessResponse<IChartData[]>) => {
                const chartData: IChartData[] = response.data;
                const dataList: IDictionary<object | string>[] = [];

                let i: number;
                let len: number;
                let data: IChartData;
                let dataset: IDictionary<any>[];

                for (i = 0, len = chartData.length; i < len; i += 1) {
                    data = chartData[i];

                    dataset = [
                        {data: data.x, label: 'x', pointRadius: 0},
                        {data: data.y, label: 'y', pointRadius: 0},
                        {data: data.z, label: 'z', pointRadius: 0}
                    ];

                    dataList.push({
                        dataset,
                        movementType: data._id,
                    });
                }

                return dataList;
            });
    }
}

export default AdminChartDataResolveService;

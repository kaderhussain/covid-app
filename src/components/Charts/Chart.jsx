import React,{useState, useEffect} from 'react';
import {fetchDailyData} from '../../api'
import  {Line, Bar } from 'react-chartjs-2';

import styles  from './Chart.module.css'

const Chart = ({data:{confirmed,recovered,deaths}, country})=>{

    const [dailyData, setDailyData ] = useState([]);

    useEffect(()=>{
        const fetchAPI = async()=>{
            setDailyData(await fetchDailyData());

        }
        fetchAPI();
        console.log( dailyData.map((date)=>date));

    },[setDailyData])
    

    const lineChart =(
        dailyData.length ? (
            <Line
            data={{
                labels:dailyData.map(({date})=>date),
                datasets:[
                    {
                        data: dailyData.map((confirmed)=>confirmed.confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill:true
                    },{
                        data: dailyData.map((deaths)=>deaths.deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255,0,0,0.5)',
                        fill:true
                    }
                ]
            }}
            />
        ):null
    );

    const BarChart = (
        confirmed ?
        (<Bar
            data={{
                labels:['Infected','Recovered', 'Deaths'],
                datasets:[{
                    label:'people',
                    backgroundColor:[
                        'rgba(0,0,255,0.5)',
                        'rgba(0,255,0,0.5)',
                        'rgba(255,0,0,0.5)'
                    ],
                    data:[confirmed.value,recovered.value, deaths.value]

                }],
            }}
            options={
                {
                legend:{display:false},
                title:{display:true,text:`Current State in ${country}`}
                }
            }
        ></Bar>):null
    );

    return(
        <div className={styles.container}>
            {country ? BarChart : lineChart}
        </div>
    )

}
export default Chart
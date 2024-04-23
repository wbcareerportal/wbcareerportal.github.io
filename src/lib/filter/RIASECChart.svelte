<script>
  import {Chart,Title,Tooltip,Legend,BarElement,CategoryScale,LinearScale, RadialLinearScale, PointElement, LineElement, plugins} from 'chart.js';
  import ChartDataLabels from 'chartjs-plugin-datalabels';
  import { Bar, Radar } from 'svelte-chartjs';
  import { riasecScores, studentName, totalStatements } from "../../stores.js";

  let showBar = false;

  // convert riasec scores to percentage
  let percentageScores = {};
  for (const [key, value] of Object.entries($riasecScores)) {
    percentageScores[key] = Math.round((value / $totalStatements) * 100);
  }

  console.log("%:", percentageScores);

  const radarData = {
    labels: ["Realistic","Investigative","Artistic","Social","Enterprising","Conventional"],
    datasets: [
      {
        data: [percentageScores["R"],percentageScores["I"],percentageScores["A"],percentageScores["S"],percentageScores["E"],percentageScores["C"]],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }
    ]
  }

  const barData = {
  labels: ["Realistic","Investigative","Artistic","Social","Enterprising","Conventional"],
  datasets: [
    {
      data: [percentageScores["R"],percentageScores["I"],percentageScores["A"],percentageScores["S"],percentageScores["E"],percentageScores["C"]],
      backgroundColor: [
        'rgba(255, 134,159,0.4)',
        'rgba(98,  182, 239,0.4)',
        'rgba(255, 218, 128,0.4)',
        'rgba(113, 205, 205,0.4)',
        'rgba(170, 128, 252,0.4)',
        'rgba(255, 177, 101,0.4)',
      ],
      borderWidth: 2,
      borderColor: [
        'rgba(255, 134, 159, 1)',
        'rgba(98,  182, 239, 1)',
        'rgba(255, 218, 128, 1)',
        'rgba(113, 205, 205, 1)',
        'rgba(170, 128, 252, 1)',
        'rgba(255, 177, 101, 1)',
      ],
    },
  ],
  };

  Chart.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    PointElement,
    LineElement,
    ChartDataLabels
  );
</script>

<div class="my-5">
  <div class="row row-cols-1 row-cols-md-2">
    <div class="col-md-8 d-flex justify-content-center chart bar-chart">
      <Bar data={barData} options={{ 
        responsive: true,
        tooltips: {enabled: false},
        events: [],
        plugins: {
          legend: { display: false },
        },
        scales: { 
          'y' : { title: { display: true, text: 'Percentage (%)' }} 
        },
      }} />
    </div>

    <div class="col-md-4 d-flex justify-content-center chart radar-chart">
      <Radar data={radarData} options={{
        responsive: true,
        tooltips: {enabled: false},
        events: [],
        plugins: {
          legend: { display: false },
          datalabels: {
            labels: {
              title: {
                font: { 
                  // weight: 'bold',
                  size: 10
                },
                backgroundColor: 'white',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1,
                borderRadius: 50
              },
            }
          }
        },
        scales: {
          'r': { 
            beginAtZero: true,
            angleLines: { display: true },
            ticks: { 
              display: false,
              suggestedMin: 0,
              suggestedMax: 100,
              stepSize: 20
            }
          }
        },
        }} />
    </div>
  </div>
</div>

<style>
  .chart {
    position: relative;
    max-height:500px;
  }

  @media screen and (min-width: 512px) {
    .chart {
      max-height: 500px;
    }
  }
</style>
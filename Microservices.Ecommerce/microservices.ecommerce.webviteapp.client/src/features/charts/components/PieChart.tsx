import {
  Chart as ChartJS,
  Filler,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import TitleCard from '../../../components/cards/TitleCard';

ChartJS.register(ArcElement, Tooltip, Legend, Filler);

const PieChart: React.FC = () => {

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      };
      
      const labels = ['India', 'Middle East', 'Europe', 'US', 'Latin America', 'Asia(non-india)'];
      
      const data = {
        labels,
        datasets: [
            {
                label: '# of Orders',
                data: [122, 219, 30, 51, 82, 13],
                backgroundColor: [
                  'rgba(255, 99, 255, 0.8)',
                  'rgba(54, 162, 235, 0.8)',
                  'rgba(255, 206, 255, 0.8)',
                  'rgba(75, 192, 255, 0.8)',
                  'rgba(153, 102, 255, 0.8)',
                  'rgba(255, 159, 255, 0.8)',
                ],
                borderColor: [
                  'rgba(255, 99, 255, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 255, 1)',
                  'rgba(75, 192, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 255, 1)',
                ],
                borderWidth: 1,
              }
        ],
      };

    return (
      <TitleCard title={"Orders by country"}>
        <Pie options={{ ...options, plugins: { legend: { position: "top" } } }} data={data} />
      </TitleCard>
    )
}

export default PieChart
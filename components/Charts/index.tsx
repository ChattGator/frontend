import type { FC } from "react";
import { Chart } from 'primereact/chart';
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

const Charts : FC = () => { 
 
	return (
		<>
			{/* <LineChart/> */}
			<BarChart/>
			{/* <PieChart/> */}
		</>
	)
}

export default Charts
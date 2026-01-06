import { WorkingCapitalResponse } from "@/types/ApiResponse";
import { LineChart } from "@mui/x-charts";
import HTMLCircle from "../CustomChartElements/HTMLCircle";

export default function WorkingCapital({
  workingCapital,
}: {
  workingCapital: WorkingCapitalResponse | null;
}) {
  return (
    <div className="w-full mt-7.5 px-6.25 py-3.75 border border-[#F5F5F5] rounded-primary">
      <p className="font-semibold text-dark-1 text-lg text-center mb-3 lg:text-start lg:-mb-7">
        Working Capital
      </p>
      {workingCapital?.data && (
        <LineChart
          // TODO:
          // 1- Create a custom ToolTip if ypu get time: https://mui.com/x/react-charts/tooltip/#using-a-custom-tooltip
          // 2- customize the rest of the chart components to match the Figma design
          // slots={{ tooltip: CustomItemTooltip }}
          height={250}
          series={[
            {
              data: workingCapital.data.data.map((item) => item.income),
              label: "Income",
              color: "#29A073",
              labelMarkType: HTMLCircle,
            },
            {
              data: workingCapital.data.data.map((item) => item.expense),
              label: "Expense",
              color: "var(--color-primary)",
              labelMarkType: HTMLCircle,
            },
          ]}
          xAxis={[
            {
              scaleType: "point",
              data: workingCapital.data.data.map((item) => item.month),
              disableLine: true,
            },
          ]}
          yAxis={[
            {
              width: 50,
              disableLine: true,
              valueFormatter: (value: number) => {
                return new Intl.NumberFormat("en", {
                  notation: "compact",
                  compactDisplay: "short",
                }).format(value);
              },
            },
          ]}
          margin={{ left: 0, right: 20, top: 30 }}
        />
      )}
    </div>
  );
}

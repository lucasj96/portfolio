package assignment_3.exercise4;

import org.knowm.xchart.*;
import org.knowm.xchart.style.Styler;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;

public class PieBarChart  {
    public static void main(String[] args) throws FileNotFoundException {
        // Get Data
        File file = new File("C:\\Users\\lucas\\uni\\1dv507\\src\\assignment_3\\src\\exercise4\\integers.dat");
        Scanner sc = new Scanner(file);
        int [] data = new int[10];
        List<Integer> dataList = new ArrayList<>();

        // Increments the array by 1 at an index that is decided by the value of the integer
        while (sc.hasNext()) {
            int value = sc.nextInt();
            if(value < 10) {
                data[0]++;
            } else if (value < 20) {
                data[1]++;
            } else if (value < 30) {
                data[2]++;
            } else if (value < 40) {
                data[3]++;
            } else if (value < 50) {
                data[4]++;
            } else if (value < 60) {
                data[5]++;
            } else if (value < 70) {
                data[6]++;
            } else if (value < 80) {
                data[7]++;
            } else if (value < 90) {
                data[8]++;
            } else if (value < 100) {
                data[9]++;
            }
        }

        // Adds the value from each index of the Array to the ArrayList
        for (int f : data) {
            dataList.add(f);
        }

        for (int f : dataList) {
            System.out.println(f);
        }

        // Creating the bar chart and assigning values to it
        CategoryChart chart = new CategoryChartBuilder().width(800).height(600).title("Integer Bar Chart").build();
        chart.getStyler().setLegendPosition(Styler.LegendPosition.InsideNW);
        chart.getStyler().setHasAnnotations(true);
        chart.addSeries("Integer intervals", Arrays.asList(new String[] { "< 10", "< 20", "< 30", "< 40", "< 50", "< 60", "< 70", "< 80", "< 90" ,"< 100" }), dataList);

        // Creating the pie chart and assigning values to each slice
        PieChart pieChart = new PieChartBuilder().width(800).height(600).title("Integer Pie Chart").build();
        pieChart.getStyler().setLegendPosition(Styler.LegendPosition.InsideNW);
        pieChart.addSeries("< 10", data[0]);
        pieChart.addSeries("< 20", data[1]);
        pieChart.addSeries("< 30", data[2]);
        pieChart.addSeries("< 40", data[3]);
        pieChart.addSeries("< 50", data[4]);
        pieChart.addSeries("< 60", data[5]);
        pieChart.addSeries("< 70", data[6]);
        pieChart.addSeries("< 80", data[7]);
        pieChart.addSeries("< 90", data[8]);
        pieChart.addSeries("< 100", data[9]);

        new SwingWrapper<>(chart).displayChart();
        new SwingWrapper<>(pieChart).displayChart();
    }
}

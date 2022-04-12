package assignment_3.exercise4;

import org.knowm.xchart.QuickChart;
import org.knowm.xchart.SwingWrapper;
import org.knowm.xchart.XYChart;

import java.util.ArrayList;
import java.util.List;

public class SinMain {
    public static double calcY(double x) {
        return (1 + x/Math.PI)*Math.cos(x)*Math.cos(40*x);
    }
    public static void main(String[] args) {

        List<Double> listX = new ArrayList<Double>();
        List<Double> listY = new ArrayList<Double>();

        for (double x = 0; x < 2*Math.PI; x += 0.01) {
            listX.add(x);
            listY.add(calcY(x));
        }

        XYChart chart = QuickChart.getChart("Sample Chart", "X", "Y", "y(x)", listX, listY);

        new SwingWrapper<>(chart).displayChart();
    }
}

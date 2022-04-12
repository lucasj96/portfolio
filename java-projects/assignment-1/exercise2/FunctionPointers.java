/**
 * FunctionPointers.java
 * 13 jan 2017
 */
package assignment_2.exercise2;

import java.util.*;
import java.util.function.Function;
import java.util.function.Predicate;

/**
 * @author jlnmsi
 *
 */
public class FunctionPointers {

	public static void main(String[] args) {
		System.out.println("Part 1: Apply predicates");
		List<Integer> list = Arrays.asList(45, 3, 24, 16, 1, 1, 3, 8, 7, 6, 10, 12, 17, 22, 30);

		System.out.print("Print all numbers: ");
		Predicate<Integer> all = n -> true;
		selectAndPrint(list, all);

		System.out.print("\nPrint all odd numbers: ");
		// Returns true if the input is odd
		Predicate<Integer> odd = n -> {
			if (n % 2 != 0) {
				return true;
			} else {
				return false;
			}
		};
		selectAndPrint(list, odd);

		System.out.print("\nPrint all numbers greater than 10: ");
		// Returns true if the input is greater than 10
		Predicate<Integer> aboveTen = n -> {
			if (n > 10) {
				return true;
			} else {
				return false;
			}
		};
		selectAndPrint(list, aboveTen);

		System.out.println("\n\nPart 2: Apply functions");
		List<Double> numbers = Arrays.asList(1.0, 16.0, 25.0, 81.0);
		System.out.println("Original: " + numbers);
		System.out.println("Square root: " + applyFunction(numbers, Math::sqrt));
		System.out.println("Power of two: " + applyFunction(numbers, FunctionPointers::powerOfTwo));
	}


	/* Prints all elements in the list where predicate evaluates to true */
	public static void selectAndPrint(List<Integer> list, Predicate<Integer> predicate) {
		for (int i = 0; i < list.size(); i++) {
			if(predicate.test(list.get(i)))
			System.out.println(list.get(i));
		}
	}

	 /*Returns a new list containing the numbers resulting from applying passed in param fx
	   on the param list numbers */
	private static List<Double> applyFunction(List<Double> numbers, Function<Double, Double> fx) {
		// Copies the list in the parameter
		List<Double> newList = new ArrayList<Double>(numbers);
		// Loops through the list executes the provided method on all elements
		for (int i = 0; i < newList.size(); i++) {
			double currentNum = newList.get(i);
			currentNum = fx.apply(currentNum);
			newList.set(i, currentNum);
		}
		return newList;
	}
	/* Returns the input to the power of 2 */
	private static Double powerOfTwo(Double d) {
		return d * d;
	}
}

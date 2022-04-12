package assignment_3.exercise6;

import java.util.Arrays;
import java.util.Comparator;

public class SortingAlgorithmsMain {
    /* Source Java: Insertion Sort sorting algorithm - YouTube https://youtu.be/lCDZ0IprFw4 */
    public static int[] intInsertionSort(int[] in) {
        int newArr [] = Arrays.copyOf(in, in.length);
        for(int i = 1; i < newArr.length; i++) {
            int key = newArr[i];
            int j = i - 1;
            while(j >= 0 && key < newArr[j]) {
                int temp = newArr[j];
                newArr[j] = key;
                newArr[j + 1] = temp;
                j--;
            }
        }
        return newArr;
    }

    public static String[] stringInsertionSort(String[]in, Comparator<String> c) {
        String newArr [] = Arrays.copyOf(in, in.length);
        for(int i = 1; i < newArr.length; i++) {
            String key = newArr[i];
            int j = i - 1;

            /* Compares previous element in the array until the last element and swaps places on the element with the previous one
            * depending on the comparator. with this method it swaps if the first letter occurs before the other one in the alphabet  */
            while(j >= 0 && c.compare(key, newArr[j]) == 1) {
                String temp = newArr[j];
                newArr[j] = key;
                newArr[j + 1] = temp;
                j--;
            }
        }
        return newArr;
    }

    public static void main(String[] args) {
        int intTestArr [] = new int[]{5, 20, 14, 6, 51, 34};
        String stringTestArr [] = new String[]{"dave","abbe", "calle", "benny", "emil" };

        Comparator<String> alphabeticOrder = (s1, s2) -> {
            if (s1.charAt(0) < s2.charAt(0)){
                return 1;
            } else if (s1.charAt(0) > s2.charAt(0)) {
                return -1;
            } else {
                return 0;
            }
        };

        int sortedIntTest [] = intInsertionSort(intTestArr);
        String sortedStringTest[] = stringInsertionSort(stringTestArr, alphabeticOrder);

        System.out.println("Unsorted String array");
        for(String f : stringTestArr) {
            System.out.print(f + " ");
        }
        System.out.println("\nSorted String array");
        for(String s : sortedStringTest) {
            System.out.print(s + " ");
        }
        System.out.println("\nUnsorted int array");
        for(int i : intTestArr) {
            System.out.print(i + " ");
        }

        System.out.println("\nSorted int array");
        for(int i : sortedIntTest) {
            System.out.print(i + " ");
        }

    }
}

package assignment_3.exercise6;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Comparator;
import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;

class SortingAlgorithmsMainTest {

    @Test
    void intInsertionSort() {
        SortingAlgorithmsMain sortingAlgorithms = new SortingAlgorithmsMain();
        // Creating 3 int arrays all with the length 10
        int originalReverseArray[] = buildReverseInt(10);
        int originalRandomArray[] = buildRandomInt(10);
        int originalIntArray[] = new int[]{10, 1, 5, 20, 3, 9, 18, 24, 12, 5};

        // Creating new (sorted) arrays that get the value from the insertionSort method
        int reverseArrayCopy[] = sortingAlgorithms.intInsertionSort(originalReverseArray);
        int randomArrayCopy[] = sortingAlgorithms.intInsertionSort(originalRandomArray);
        int intArrayCopy[] = sortingAlgorithms.intInsertionSort(originalIntArray);

        // Loops through the array, comparing that the value before is lower than the value at the previous element
        for(int i = 0; i < originalReverseArray.length - 1; i++) {
            assertTrue(reverseArrayCopy[i] <= reverseArrayCopy[i + 1]);
            assertTrue(randomArrayCopy[i] <= randomArrayCopy[i + 1]);
            assertTrue(intArrayCopy[i] <= intArrayCopy[i + 1]);
        }
        assertFalse(Arrays.equals(originalReverseArray, reverseArrayCopy));
        assertFalse(Arrays.equals(originalIntArray, intArrayCopy));

        /* -assertFalse methodcall below is outcommented (ignored)-
        (extremely) Low chance that the randomized array copy would already be sorted
        it would mean that the arrays have the same content and return false value (incorrect value) */
        // assertFalse(Arrays.equals(originalRandomArray, randomArrayCopy));
    }

    /* Testing the stringInsertionSort method
       Creates 2 new Strings that are not in alphabetical order then compares if they are in alphabetic order
       after they get sorted using the stringInsertionSort method.
       Then also checks if the original arrays have been modified
     */
    @Test
    void stringInsertionSort() {
        // The comparator to use
        SortingAlgorithmsMain sortingAlgorithms = new SortingAlgorithmsMain();
        Comparator<String> alphabeticOrder = (s1, s2) -> {
            if (s1.charAt(0) < s2.charAt(0)){
                return 1;
            } else if (s1.charAt(0) > s2.charAt(0)) {
                return -1;
            } else {
                return 0;
            }
        };

        // Creates 2 strings arrays
        String originalStringTestArr [] = new String[]{"mno","jkl", "ghi", "def", "abc" };
        String originalStringTestArr2 [] = new String[]{"AKrjer","kpefakf", "owerjoir", "mnfkdn", "rejaroij", "atkljtl",
                "jkltgrdjsio" + "tkrt" + "kjlat" + "rjkjglsg" + "tlretk" + "artoiertk" };

        // Uses the insertion sort methods
        String copyStringTestArr [] = sortingAlgorithms.stringInsertionSort(originalStringTestArr, alphabeticOrder);
        String copyStringTestArr2 [] = sortingAlgorithms.stringInsertionSort(originalStringTestArr2, alphabeticOrder);

        // Checks the the previous element is equal to or lower than the next one
        for(int i = 0; i < originalStringTestArr.length - 1; i++) {
            assertTrue(copyStringTestArr[i].charAt(0) <= copyStringTestArr[i + 1].charAt(0));
        }
        for(int i = 0; i < originalStringTestArr2.length - 1; i++) {
            assertTrue(copyStringTestArr2[i].charAt(0) <= copyStringTestArr2[i + 1].charAt(0));
        }

        // Checking that they are not the same, that the copy has been adjusted
        assertFalse(Arrays.equals(originalStringTestArr, copyStringTestArr));
        assertFalse(Arrays.equals(originalStringTestArr2, copyStringTestArr2));
    }

    // Helper method to build an array of random numbers
    private int[] buildRandomInt(int size) {
        Random random = new Random();
        int testArr[] = new int[size];
        for (int i = 0; i < size; i++) {
            int randomNum = random.nextInt(100);
            testArr[i] = randomNum;
        }
        return testArr;
    }

    /* Helper method, returns an array with the size of the value of the param size.
    First element has the value of the size decrementing by 1 for each following element */
    private int[] buildReverseInt(int size) {
        int testArr[] = new int[size];
        for (int i = 0; i < size; i++) {
            testArr[i] = size - i;
        }
        return testArr;
    }
}
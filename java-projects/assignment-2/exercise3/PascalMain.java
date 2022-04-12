package assignment_3.exercise3;

public class PascalMain {

    /* Recursive method, calling itself n amount of times returning an increasingly bigger array
    The array is equal to the previous calls pascals triangle value until it has called itself n amount of times
     */
    public static int[] pascalRow(int n) {
        int arr [] = new int[n + 1];
         if (n == 0) {
            arr[0] = 1;
        } else {
            int lastRow[] = pascalRow(n - 1);
            arr[n] = 1;
            arr[0] = 1;
            for(int i = 1; i < n ; i++) {
                arr[i] = lastRow[i] + lastRow[i - 1];
            }
        }
        return arr;
    }

    public static void main(String[] args) {
        int temp [] = pascalRow(6);
        for (int i:temp) {
            System.out.print(i + " ");
        }
    }
}

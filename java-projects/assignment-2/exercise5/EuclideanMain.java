package assignment_3.exercise5;

import java.util.Scanner;

public class EuclideanMain {
    public static int gcd(int a, int b) {
        if (b > a) {
            int temp = a;
            a = b;
            b = temp;
        }
        while (b != 0) {
            int t = b;
            b = a % b;
            a = t;
        }
        return a;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter a number");
        int M = sc.nextInt();
        System.out.println("Enter a number");
        int N = sc.nextInt();

        System.out.println(gcd(M,N));

    }
}

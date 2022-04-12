package assignment_3.exercise1;

public class PrintRecursive {
    public static void print(String str, int pos) {
        if (pos != str.length()) {
            System.out.print(str.charAt(pos));
            print(str, pos + 1);
        } else {
            System.out.println("\nDone printing");
        }
    }

    public static void printReverse(String str, int pos) {
        if (pos != str.length()) {
            System.out.print(str.charAt((str.length() - 1) - pos));
            printReverse(str, pos + 1);
        } else {
            System.out.println("\nDone reverse printing");
        }
    }

    public static void main(String[] args) {
        String sentence = "Hello Everyone!";
        print(sentence, 0);
        printReverse(sentence, 0);
    }
}

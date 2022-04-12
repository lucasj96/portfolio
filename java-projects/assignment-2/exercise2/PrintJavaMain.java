package assignment_3.exercise2;

import java.io.File;

public class PrintJavaMain {
    public static int depth = 0;

    // Recursive until all files below the original directory has been printed
    private static void printAllJavaFiles(File file, int count) {
            File[] subs = file.listFiles();
            for (File f : subs) {
                if (f.isDirectory()) {
                    printFile(f, 1);
                    depth++;
                    printAllJavaFiles(f, count);
                    depth--;
                } else {
                    printFile(f, 0);
                }
            }
    }

    // Returns the extension name of the file "." included, example ".java"
    private static String getFileExtension(File file) {
        String name = file.getName();
        int lastIndexOf = name.lastIndexOf(".");
        if (lastIndexOf == -1) {
            return "";
        } else {
            return name.substring(lastIndexOf);
        }
    }

    // Prints the directory and java files in the directory
    private static void printFile ( File file, int type) {
            String indentation = "";
            // Indents the string
            for (int i = 0; i < depth; i++) {
                indentation += "\t";
            }
            if (type == 1) {
                System.out.println(indentation + "Dir: "  + file.getName() + " " + (file.length() / 1024) + "KB");
            } else {
                if(getFileExtension(file).equals(".java")) {
                    System.out.println(indentation + "File: "  + file.getName() + " " + file.length() + " bytes");
                }
            }
    }

    public static void main(String[] args) {
        /* THIS FILE IS EXCLUDED IN INTELLIJ IDEA. SINCE IT CONTAINS JAVA FILES */
        File file = new File("C:\\Users\\lucas\\uni\\1dv507\\src\\assignment_3\\directory");
        printAllJavaFiles(file, 0);
    }
}

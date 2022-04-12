package assignment_2.exercise5;

import java.util.Iterator;

public class GenericQueueMain {
    public static void main(String[] args) {
        // Creates a genericQueue and uses the methods to add elements and use methods on them
        GenericQueue genericQueue = new GenericQueue();
        genericQueue.enqueue("a");
        genericQueue.enqueue("b");
        genericQueue.enqueue("c");
        genericQueue.enqueue("d");
        genericQueue.enqueue("e");
        genericQueue.enqueue("f");
        genericQueue.enqueue("g");
        genericQueue.enqueue("h");
        genericQueue.enqueue("i");
        genericQueue.enqueue("i");
        System.out.println(genericQueue.first());
        System.out.println(genericQueue.last());
        System.out.println(genericQueue.dequeue());
        System.out.println(genericQueue.first());

        System.out.println("\nIterator");
        Iterator<String> genericIterator = genericQueue.iterator();
        while (genericIterator.hasNext()) {
            System.out.println(genericIterator.next());
        }
    }
}

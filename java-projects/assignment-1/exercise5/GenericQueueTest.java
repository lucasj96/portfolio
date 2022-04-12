package assignment_2.exercise5;

import assignment_2.exercise4.LinkedQueue;
import org.junit.jupiter.api.Test;

import java.util.Iterator;

import static org.junit.jupiter.api.Assertions.*;

class GenericQueueTest {

    @Test
    void testInitSize() {
        // Checks the initial size
        GenericQueue genericQueue = new GenericQueue();
        assertEquals(0, genericQueue.size());
    }

    @Test
    void size() {

        // Testing Strings
        GenericQueue genericQueue = new GenericQueue();
        genericQueue.enqueue("a");
        assertEquals(1, genericQueue.size());

        GenericQueue genericQueue2 = buildString();
        assertEquals(4, genericQueue2.size());


        // Testing integers
        GenericQueue genericQueue3 = new GenericQueue();
        genericQueue3.enqueue(1);
        assertEquals(1, genericQueue3.size());

        GenericQueue genericQueue4 = buildInt(10);
        assertEquals(10, genericQueue4.size());

        // Testing Empty
        GenericQueue genericQueue5 = new GenericQueue();
        assertEquals(0, genericQueue5.size());
    }

    @Test
    void isEmpty() {
        // Testing empty Queue
        GenericQueue genericQueue = new GenericQueue();
        assertEquals(true, genericQueue.isEmpty());

        // Testing not empty Queue with string
        GenericQueue genericQueue1 = new GenericQueue();
        genericQueue1.enqueue("a");
        assertEquals(false, genericQueue1.isEmpty());

        // Testing not empty Queue with Integers
        GenericQueue genericQueue2 = new GenericQueue();
        genericQueue1.enqueue(1);
        assertEquals(false, genericQueue1.isEmpty());

    }

    @Test
    void enqueue() {
        // Checking the first element with integer
        GenericQueue genericQueue = new GenericQueue();
        genericQueue.enqueue(1);
        assertEquals(1 ,genericQueue.first());

        // Checking the first element with String
        GenericQueue genericQueue2 = new GenericQueue();
        genericQueue2.enqueue("a");
        assertEquals("a" ,genericQueue2.first());

        // Check bigger integer value, if first element in a previously empty genericQueue is equal to the newly added element
        GenericQueue genericQueue3 = new GenericQueue();
        genericQueue3.enqueue(123456789);
        assertEquals(123456789, genericQueue3.first());

        // Checks the first value in genericQueue with several elements
        GenericQueue genericQueue4 = buildString();
        assertEquals("abc", genericQueue4.first());

        // Checks if the last element added to a genericQueue with 100 elements is equal to the newly added element
        GenericQueue genericQueue5 = buildInt(100);
        genericQueue5.enqueue(99);
        assertEquals(99, genericQueue5.last());
    }

    @Test
    void dequeue() {
        /* Testing Integer dequeue
        Removes an element from a genericQueue with 10 elements to see if an element has been deleted.
        Checks if the previous second to last element is the same as before
        */
        GenericQueue genericQueue = buildInt(10);
        genericQueue.dequeue();
        assertEquals(9, genericQueue.size());
        assertEquals(9, genericQueue.last());

        // Adds an element to an empty genericQueue then removes it, then checks the size to verify it has been dequeue
        GenericQueue genericQueue1 = new GenericQueue();
        genericQueue1.enqueue(1);
        genericQueue1.dequeue();
        assertEquals(0, genericQueue1.size());

        // Testing String dequeue
        GenericQueue genericQueue2 = buildString();
        genericQueue2.dequeue();
        assertEquals(3, genericQueue2.size());
        assertEquals("cde", genericQueue2.first());

        GenericQueue genericQueue3 = new GenericQueue();
        genericQueue3.enqueue("abc");
        genericQueue3.dequeue();
        assertEquals(true, genericQueue3.isEmpty());
    }

    @Test
    void first() {
        GenericQueue genericQueue = new GenericQueue();
        genericQueue.enqueue(5);
        assertEquals(5, genericQueue.first());

        // Adding multiple int elements then checking the first
        GenericQueue genericQueue1 = buildInt(10);
        assertEquals(0, genericQueue1.first());

        // Creates one String elements in the genericQueue and tests the first one
        GenericQueue genericQueue2 = buildString();
        assertEquals("abc", genericQueue2.first());

        // Check for RunTimeException if trying to get the first element in an genericQueue
        GenericQueue genericQueue3 = new GenericQueue();
        assertThrows(RuntimeException.class, () -> genericQueue3.first());
    }

    @Test
    void last() {
        // Testing int generic queue the last element by enqueueing 2 elements
        GenericQueue genericQueue = new GenericQueue();
        genericQueue.enqueue(1);
        genericQueue.enqueue(2);
        assertEquals(2, genericQueue.last());

        // Testing int generic queue bigger value by adding a lot of elements
        GenericQueue genericQueue1 = buildInt(100000);
        assertEquals(99999, genericQueue1.last());

        // Tests the last element in the genericQueue with String by enqueueing 3 elements
        GenericQueue genericQueue2 = new GenericQueue();
        genericQueue2.enqueue("a");
        genericQueue2.enqueue("b");
        genericQueue2.enqueue("c");
        assertEquals("c", genericQueue2.last());

        GenericQueue genericQueue3 = buildString();
        assertEquals("hij", genericQueue3.last());

        // Check for RunTimeException if trying to get the last element in an empty genericQueue
        LinkedQueue linkedQueue3 = new LinkedQueue();
        assertThrows(RuntimeException.class, () -> linkedQueue3.last());

    }

    @Test
    void iterator() {
        // Tests the iterator
        GenericQueue genericQueue = buildInt(10);
        Iterator<Integer> iterator = genericQueue.iterator();
        // Checks if the iterator has a next Integer
        assertEquals(true, iterator.hasNext());
        // Checks if the next/first element the Iterator would loop through
        assertEquals(0, iterator.next());


        // Testing Throws
        GenericQueue genericQueue1 = new GenericQueue();
        Iterator<Integer> iterator1 = genericQueue1.iterator();
        // Tests if the iterator throws exceptions on an empty genericQueue
        assertThrows(NullPointerException.class, () -> iterator1.next());
        // Tests the not implemented iterator method throws an exception
        assertThrows(RuntimeException.class, () -> iterator1.remove());

        GenericQueue genericQueue2 = buildString();
        Iterator<String> iterator2 = genericQueue2.iterator();
        assertEquals(true, iterator2.hasNext());
        assertEquals("abc", iterator2.next());
    }

    // Generates and returns a genericQueue containing ints starting from 0 up to the param size
    private GenericQueue buildInt(int size) {
        GenericQueue genericQueue = new GenericQueue();
        for (int i = 0; i < size; i++) {
            genericQueue.enqueue(i);
        }
        return genericQueue;
    }
    // Generates a genericQueue object with strings, has the length 4
    private GenericQueue buildString() {
        String [] dataString = {"abc", "cde", "efg", "hij"};
        GenericQueue genericQueue = new GenericQueue();
        for (int i = 0; i < dataString.length; i++) {
            genericQueue.enqueue(dataString[i]);
        }
        return genericQueue;
    }
}
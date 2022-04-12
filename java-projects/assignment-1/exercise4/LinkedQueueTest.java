package assignment_2.exercise4;

import org.junit.After;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Iterator;

import static org.junit.jupiter.api.Assertions.*;

class LinkedQueueTest {

    private static int test_count = 0;

    @BeforeEach
    void setUp() {
        System.out.println("Setting up test: " + test_count);
        test_count++;
    }

    @Test
    void testInitSize() {
        // Checks the initial size
        LinkedQueue linkedQueue = new LinkedQueue();
        assertEquals(0, linkedQueue.size());
    }

    @Test
    void iterator() {
        // Tests the iterator
        LinkedQueue linkedQueue = build(10);
        Iterator<Integer> iterator = linkedQueue.iterator();
        // Checks if the iterator has a next Integer
        assertEquals(true, iterator.hasNext());
        // Checks if the next/first element the Iterator would loop through
        assertEquals(0, iterator.next());

        // Testing Throws
        LinkedQueue linkedQueue1 = new LinkedQueue();
        Iterator<Integer> iterator1 = linkedQueue1.iterator();
        // Tests if the iterator throws exceptions on an empty linkedQueue
        assertThrows(NullPointerException.class, () -> iterator1.next());
        // Tests the not implemented iterator method throws an exception
        assertThrows(RuntimeException.class, () -> iterator1.remove());
    }

    @Test
    void size() {
        // Testing empty size
        LinkedQueue linkedQueue1 = new LinkedQueue();
        assertEquals(0, linkedQueue1.size());

        // Testing size after adding through enqueue
        LinkedQueue linkedQueue2 = new LinkedQueue();
        linkedQueue2.enqueue(1);
        linkedQueue2.enqueue(2);
        linkedQueue2.enqueue(3);
        assertEquals(3, linkedQueue2.size());

        // Checking size after removing an element from the linkedQueue
        linkedQueue2.dequeue();
        assertEquals(2, linkedQueue2.size());

        // Testing bigger values through build
        LinkedQueue linkedQueue3 = build(2000000);
        assertEquals(2000000, linkedQueue3.size());
    }

    @Test
    void isEmpty() {
        // Checks if an empty linkedQueue is empty
        LinkedQueue linkedQueue = new LinkedQueue();
        assertEquals(true, linkedQueue.isEmpty());

        // Check a linkedQueue with one element if it's empty
        LinkedQueue linkedQueue2 = new LinkedQueue();
        linkedQueue2.enqueue(1);
        assertEquals(false, linkedQueue2.isEmpty());
    }

    @Test
    void enqueue() {
        // Checks if first element in a previously empty linkedQueue is equal to the newly added element
        LinkedQueue linkedQueue = new LinkedQueue();
        linkedQueue.enqueue(1);
        assertEquals(1 ,linkedQueue.first());

        // Checks if first element in a previously empty linkedQueue is equal to the newly added element
        LinkedQueue linkedQueue2 = new LinkedQueue();
        linkedQueue2.enqueue(-1);
        assertEquals(-1 ,linkedQueue2.first());

        // Check bigger value if first element in a previously empty linkedQueue is equal to the newly added element
        LinkedQueue linkedQueue3 = new LinkedQueue();
        linkedQueue3.enqueue(123456789);
        assertEquals(123456789, linkedQueue3.first());

        // Checks if the last element added to a linkedQueue with 100 elements is equal to the newly added element
        LinkedQueue linkedQueue4 = build(100);
        linkedQueue4.enqueue(99);
        assertEquals(99, linkedQueue4.last());
    }

    @Test
    void dequeue() {
        /* Removes an element from a linkedQueue with 10 elements to see if an element has been deleted.
           Checks if the previous second to last element is the same as before */
        LinkedQueue linkedQueue = build(10);
        linkedQueue.dequeue();
        assertEquals(9, linkedQueue.size());
        assertEquals(9, linkedQueue.last());

        // Adds an element to an empty linkedQueue then removes it, then checks the size to verify it has been dequeue
        LinkedQueue linkedQueue1 = new LinkedQueue();
        linkedQueue1.enqueue(1);
        linkedQueue1.dequeue();
        assertEquals(0, linkedQueue1.size());
    }

    @Test
    void first() {
        // Checks the first element in a linkedQueue with only 1 element
        LinkedQueue linkedQueue1 = new LinkedQueue();
        linkedQueue1.enqueue(5);
        assertEquals(5, linkedQueue1.first());

        // Adding multiple elements then checking the first
        LinkedQueue linkedQueue2 = new LinkedQueue();
        linkedQueue2.enqueue(5);
        linkedQueue2.enqueue(15);
        linkedQueue2.enqueue(25);
        linkedQueue2.enqueue(35);
        linkedQueue2.enqueue(45);
        assertEquals(5, linkedQueue2.first());

        // Creates 10 elements in the linked Queue incrementing by 1 for each element, starting at 0.
        LinkedQueue linkedQueue3 = build(10);
        assertEquals(0, linkedQueue3.first());

        // Check for RunTimeException if trying to get the first element in an empty linkedQueue
        LinkedQueue linkedQueue4 = new LinkedQueue();
        assertThrows(RuntimeException.class, () -> linkedQueue4.first());
    }

    @Test
    void last() {
        // Testing the last element by enqueueing 2 elements
        LinkedQueue linkedQueue1 = new LinkedQueue();
        linkedQueue1.enqueue(1);
        linkedQueue1.enqueue(2);
        assertEquals(2, linkedQueue1.last());

        // Testing bigger value by adding a lot of elements
        LinkedQueue linkedQueue2 = build(100000);
        assertEquals(99999, linkedQueue2.last());

        // Check for RunTimeException if trying to get the last element in an empty linkedQueue
        LinkedQueue linkedQueue3 = new LinkedQueue();
        assertThrows(RuntimeException.class, () -> linkedQueue3.last());
    }


    /*
        Used to simplify adding elements to the linkedQueue.
        returns a linkedqueue with the length equal to the param
        each element from 0 the length is incremented by 1, starting at 0
     */
    private LinkedQueue build(int size) {
        LinkedQueue linkedQueue = new LinkedQueue();
        for (int i = 0; i < size; i++) {
            linkedQueue.enqueue(i);
        }
        return linkedQueue;
    }
}
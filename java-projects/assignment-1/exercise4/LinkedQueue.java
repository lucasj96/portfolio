package assignment_2.exercise4;

import assignment_1.exercise5.LinkedQueueInterface;

import java.io.IOException;
import java.util.Iterator;

/**
 * A LinkedQueue Data structure list,
 * Holds object of the class Node
 */

/* This is a copy of assignment 1, exercise 5. I edited exercise 5 as well as this copy of exercise 5 to the best
 of my ability according the the instructions because I got the grade F on it */
public class LinkedQueue implements LinkedQueueInterface {

    public Iterator<Integer> iterator() {
        return new IntIterator();
    }

    /**
     * Creates a new Iterator that iterates through Integers
     * Has 2 methods, hasNext which returns true if there is another object in the queue, else it returns false
     */
    class IntIterator implements Iterator<Integer> {
        private Node current = head;
        public Integer next() {
            int tempInt = current.data;
            current = current.next;
            return tempInt;
        }

        public boolean hasNext() {
            if (current == null) {
                return false;
            } else {
                return true;
            }
        }
        public void remove() {
            throw new RuntimeException("remove() is not implemented");
        }
    }

    /**
     * The data Is the value/data of the object
     * The node is the reference to the next object in the queue.
     */
    public class Node {
        public int data;
        public Node next = null;
    }

    public int size = 0;
    Node head = null;
    Node tail = null;

    /**
     * Returns the size of the Queue
     * @return current size;
     */
    @Override
    public int size() {
        return this.size;
    }

    /**
     * Returns true if the linked list is empty else it returns false
     * @return boolean
     */
    @Override
    public boolean isEmpty() {
        if (this.size == 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Adds a new object to the end of the queue
     * This object has a reference to the next node in the queue
     * @param element The element that should be added to the queue
     */
    @Override
    public void enqueue(int element) {
        if (head == null) {
            head = new Node();
            head.data = element;
            tail = head;
        } else {
            tail.next = new Node();
            tail.next.data = element;
            tail = tail.next;
        }
        this.size++;
    }

    /**
     * Returns the first object in the queue, sets the LinkedQueues classmembers head and tail to point to the right
     * object if it is empty.
     * @return tempData which is the value of the first objects data classmember
     */
    @Override
    public int dequeue() {
        int tempData = head.data;
        head = head.next;
        if (head == null) {
            tail = null;
        }
        this.size--;
        return tempData;
    }

    /**
     * Returns the first objects data without
     * @return head.data The first objects data
     * @throws IOException If it is empty
     */
    @Override
    public int first() throws RuntimeException {
        if (isEmpty()) {
            throw new RuntimeException("No elements");
        }
        return head.data;
    }

    /**
     * Returns the last objects data in the linked list
     * @return object
     * @throws IOException if the list is empty
     */
    @Override
    public int last() throws RuntimeException {
        if (isEmpty()) {
            throw new RuntimeException("No elements");
        } else {
            return tail.data;
        }
    }
}
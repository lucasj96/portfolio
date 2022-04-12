package assignment_2.exercise5;

import java.io.IOException;
import java.util.Iterator;

public class GenericQueue<T> implements GenericQueueInterface<T> {
    /**
     * The data Is the value/data of the object
     * The node is the reference to the next object in the queue.
     */

    public class Node<T> {
        public Node <T> next;
        public T data;
    }

    public int size  = 0;
    public Node <T> head = null;
    public Node <T> tail = null;

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
    public void enqueue(T element) {
        if (head == null) {
            head = new Node<T>();
            head.data = element;
            tail = head;
        } else {
            tail.next = new Node<T>();
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
    public T dequeue() {
        T tempData = head.data;
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
    public T first() throws RuntimeException {
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
    public T last() throws RuntimeException {
        if (isEmpty()) {
            throw new RuntimeException("No elements");
        }
        return tail.data;
    }

    /**
     * Creates a new Iterator that iterates through the queue
     * Has 2 methods, hasNext which returns true if there is another object in the queue, else it returns false
     */

    @Override
    public Iterator<T> iterator() {
        return new GenericIterator();
    }

    public class GenericIterator implements Iterator<T> {
        private Node <T> current = head;

        @Override
        public T next() {
            T tempData = current.data;
            current = current.next;
            return tempData;
        }
        @Override
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
}

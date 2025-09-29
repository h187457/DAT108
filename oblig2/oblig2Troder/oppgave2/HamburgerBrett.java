package oppgave2;

import java.util.LinkedList;
import java.util.Queue;

public class HamburgerBrett {

    private final int KAPASITET;
    private final Queue<Hamburger> brett = new LinkedList<>();
    private int nesteId = 1;

    public HamburgerBrett(int KAPASITET) {
        this.KAPASITET = KAPASITET;
    }

    public synchronized void leggTil(String kokk) throws InterruptedException {
        while (brett.size() == KAPASITET) {
            System.out.println(kokk + " (kokk) klar med hamburger, men brettet er fullt. Venter!");
            wait();
        }
        Hamburger hamburger = new Hamburger(nesteId++);
        brett.add(hamburger);
        System.out.println(kokk + " (kokk) legger på hamburger " + hamburger + ". Brett: " + brett);
        notifyAll();
    }

    public synchronized void taAv(String servitor) throws InterruptedException {
        while (brett.isEmpty()) {
            System.out.println(servitor + " (servitør) ønsker å ta hamburger, men brettet er tomt. Venter!");
            wait();
        }
        Hamburger hamburger = brett.poll();
        System.out.println(servitor + " (servitør) tar av hamburger " + hamburger + ". Brett: " + brett);
        notifyAll();
    }
}

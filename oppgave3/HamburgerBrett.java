package oppgave3;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

public class HamburgerBrett {

    public static final int KAPASITET = 4;
    private int nesteId = 1;

    BlockingQueue<Hamburger> brett = new ArrayBlockingQueue<>(KAPASITET);

    public void leggTil(String kokk) throws InterruptedException {
        Hamburger hamburger = new Hamburger(nesteId++);
        brett.put(hamburger);
        System.out.println(kokk + " (kokk) legger på hamburger " + hamburger + ". Brett: " + brett);
    }

    public void taAv(String servitor) throws InterruptedException {
        Hamburger hamburger = brett.take();
        System.out.println(servitor + " (servitør) tar av hamburger " + hamburger + ". Brett: " + brett);
    }
}

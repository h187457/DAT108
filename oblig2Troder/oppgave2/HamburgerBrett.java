package oppgave2;

import java.nio.channels.InterruptedByTimeoutException;
import java.util.LinkedList;
import java.util.Queue;

public class HamburgerBrett {


    private final int KAPASITET;
    private Queue<Hamburger> brett = new LinkedList<>();
    private int nesteId = 1;

    public HamburgerBrett(int KAPASITET) {
        this.KAPASITET = KAPASITET;
    }

    public synchronized void leggTil(String kokk) throws InterruptedException {
        while (brett.size() == KAPASITET) {
            System.out.println(kokk + "(kokk) klar med hamburger, men bretter er fullt. Venter!");
            wait();
        }
        Hamburger hamburger = new Hamburger(nesteId++);
        brett.add(hamburger);
        System.out.println(kokk + "(kokk) legger på hamburger " + hamburger + ". Brett: " + brett);
        notifyAll();
    }

    public synchronized void taAv(String servitor) throws InterruptedException {
        while (brett.isEmpty()) {
            System.out.println(kokk + "(kokk) klar med hamburger, men bretter er fullt. Venter!");
            wait();
        }
        Hamburger hamburger = new Hamburger(nesteId++);
        brett.add(hamburger);
        System.out.println(kokk + "(kokk) legger på hamburger " + hamburger + ". Brett: " + brett);
        notifyAll();
    }

    private boolean isEmptyBrett(){
        return brett.isEmpty();
    }

    public void leggTil(int id){

        Hamburger burger = new Hamburger(id);
        this.brett.add(burger);
        System.out.println(id + burger.toString());
    }

    public void taAv() {
        Hamburger burger = this.brett.poll();
        System.out.println(burger.toString());

    }
}
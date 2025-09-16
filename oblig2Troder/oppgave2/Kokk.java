package oppgave2;

import java.util.Random;

class Kokk extends Thread {
    private final HamburgerBrett brett;
    private final String navn;
    private final Random rand = new Random();

    public Kokk(HamburgerBrett brett, String navn) {
        this.brett = brett;
        this.navn = navn;
    }

    @Override
    public void run() {
        try {
            while (true) {
                Thread.sleep((2 + rand.nextInt(5)) * 1000L);
                brett.leggTil(navn);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

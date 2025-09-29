package oppgave3;

import java.util.Random;

class Servitor extends Thread {
    private final HamburgerBrett brett;
    private final String navn;
    private final Random rand = new Random();

    public Servitor(HamburgerBrett brett, String navn) {
        this.brett = brett;
        this.navn = navn;
    }

    @Override
    public void run() {
        try {
            while (true) {
                Thread.sleep((2 + rand.nextInt(5)) * 1000L);
                brett.taAv(navn);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

package oppgave2;

import java.util.Arrays;


public class HamburgerButikk {
    private static void skrivUtHeader(String[] kokker, String[] servitorer, int KAPASITET) {
        System.out.println("I denne simuleringen har vi ");
        System.out.println(" " + kokker.length + " kokker " + Arrays.toString(kokker));
        System.out.println(" " + servitorer.length + " servitører " + Arrays.toString(servitorer));
        System.out.println(" Kapasiteten til brettet er " + KAPASITET + " hamburgere.");
        System.out.println("Vi starter ...\n");
    }

    public static void main(String[] args) {

        final String[] kokker = {"Abdo", "Abdul", "Thomas"};
        final String[] servitorer = {"Oskar", "Erlend"};
        final int KAPASITET = 4;

        skrivUtHeader(kokker, servitorer, KAPASITET);

        HamburgerBrett brett = new HamburgerBrett(KAPASITET);

        for (String navn : kokker) {
            new Kokk(brett, navn).start();
        }
        for (String navn : servitorer) {
            new Servitor(brett, navn).start();
        }
    }
}

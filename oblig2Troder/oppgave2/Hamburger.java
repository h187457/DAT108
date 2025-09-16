package oppgave2;

public class Hamburger {
    private final int id;

    public Hamburger(int id) {
        this.id = id;
    }

    public static int getId() {
        return id;
    }

    @Override
    public String toString() {
        return "◖" + id + '◗';
    }
}

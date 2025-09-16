package oppgave2;

public class hamburger {
    private final int id;
    public hamburger(int id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "◖" + id + '◗';
    }
}

package oppgave3;

public class Hamburger {
    private final int id;

    public Hamburger(int id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "(" + id + ')';
    }
}

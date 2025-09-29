package oppgave1;
import javax.swing.JOptionPane;

public class oppgave1 {
    private static volatile boolean running = true;
    private static volatile String message = "Hallo verden!";

    public static void main(String[] args) {


        
        Thread printer = new Thread(() -> {
            while (running) {
                System.out.println(message);
                try {
                    Thread.sleep(3000);
                } catch (InterruptedException ignored) {}
            }
        });
        printer.start();

        Thread input = new Thread(() -> {
            while (running) {
                String in = JOptionPane.showInputDialog("Skriv melding (eller 'quit'):");
                if (in == null) continue;
                if (in.equalsIgnoreCase("quit")) {
                    running = false;
                } else {
                    message = in;
                }
            }
        });
        input.start();
    }
}
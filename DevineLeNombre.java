import java.util.Scanner;
import java.util.Random;

public class DevineLeNombre{
    public static void main(String[] args){
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();

        int nombreSecret = random.nextInt(100) + 1; // Nombre secret entre 1 et 100
        int tentative = 0;                           // Ce que le joueur tape
        int essais = 0;     // Compteur de tentatives

        while (tentative != nombreSecret) {
            System.out.print("Entre un nombre entre 1 et 100 : ");
            tentative = scanner.nextInt(); // Lire le choix du joueur
            essais++;                      // Ajouter 1 au compteur

            if (tentative < nombreSecret) {
                System.out.println("C'est plus grand !");
            } else if (tentative > nombreSecret) {
                System.out.println("C'est plus petit !");
            } else {
                System.out.println("Bravo ! Tu as trouvé en " + essais + " essais !");
            }
        }
        
        scanner.close();

    }
}
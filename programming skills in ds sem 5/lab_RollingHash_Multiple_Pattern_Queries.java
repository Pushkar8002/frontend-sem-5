import java.util.*;

public class lab_RollingHash_Multiple_Pattern_Queries {

    static final long BASE = 31;
    static final long MOD = 1000000007;

    static long getHash(String str) {
        long hash = 0;

        for (char ch : str.toCharArray()) {
            hash = (hash * BASE + ch) % MOD;
        }

        return hash;
    }

    static boolean findPattern(String text, String pattern) {
        int n = text.length();
        int m = pattern.length();

        if (m > n) {
            return false;
        }

        long patternHash = getHash(pattern);
        long currentHash = getHash(text.substring(0, m));

        long power = 1;

        for (int i = 1; i < m; i++) {
            power = (power * BASE) % MOD;
        }

        for (int i = 0; i <= n - m; i++) {

            if (currentHash == patternHash) {
                if (text.substring(i, i + m).equals(pattern)) {
                    return true;
                }
            }

            if (i < n - m) {
                currentHash = (currentHash
                        - text.charAt(i) * power % MOD + MOD) % MOD;

                currentHash = (currentHash * BASE
                        + text.charAt(i + m)) % MOD;
            }
        }

        return false;
    }

    public static void main(String[] args) {

        // Question:
        // Given a text and multiple pattern queries,
        // use Rolling Hash to check whether each pattern
        // occurs in the given text.

        Scanner sc = new Scanner(System.in);

        String text = sc.nextLine();

        int queries = sc.nextInt();
        sc.nextLine();

        while (queries-- > 0) {

            String pattern = sc.nextLine();

            if (findPattern(text, pattern)) {
                System.out.println("Pattern found");
            } else {
                System.out.println("Pattern not found");
            }
        }

        sc.close();
    }
}
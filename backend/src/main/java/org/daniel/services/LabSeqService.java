package org.daniel.services;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.math.BigInteger;
import java.util.HashMap;
import java.util.Map;

@Path("/labseq")
public class LabSeqService {
    private final Map<Integer, BigInteger> cache = new HashMap<>();

    @GET
    @Path("/{n}")
    @Produces(MediaType.TEXT_PLAIN)
    public String getLabSeqValue(@PathParam("n") int n) {

        if (cache.containsKey(n)) {
            return cache.get(n).toString();
        }

        BigInteger result = calculateLabSeq(n);
        cache.put(n, result);
        return result.toString();
    }

    private BigInteger calculateLabSeq(int n) {
        if (n == 0) return BigInteger.ZERO;
        if (n == 1) return BigInteger.ONE;
        if (n == 2) return BigInteger.ZERO;
        if (n == 3) return BigInteger.ONE;

        BigInteger prevPrev = BigInteger.ZERO;
        BigInteger prev = BigInteger.ONE;
        BigInteger current = BigInteger.ZERO;

         /*In order to prevent running out of memory heap, we actually only store the last two values
         ( values[i-4] and values[i-3] ), because this is what we need for the calculations

         This allows to calculate larger numbers
         */
        for (int i = 4; i <= n; i++) {
            current = prevPrev.add(prev);
            prevPrev = prev;
            prev = current;
        }
        return current;
    }
}

package org.daniel.services;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.math.BigDecimal;
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
            return convertIfNecessary(cache.get(n));
        }

        BigInteger result = calculateLabSeq(n);
        cache.put(n, result);
        return convertIfNecessary(result);
    }

    private String convertIfNecessary(BigInteger value) {
        int maxAllowedBits = 100;
        if (value.bitLength() > maxAllowedBits) {
            return String.format("%.6e", new BigDecimal(value));
        } else {
            return value.toString();
        }
    }
    
    private BigInteger calculateLabSeq(int n) {
        if (n == 0) return BigInteger.ZERO;
        if (n == 1) return BigInteger.ONE;
        if (n == 2) return BigInteger.ZERO;
        if (n == 3) return BigInteger.ONE;

        BigInteger[] values = new BigInteger[4];
        values[0] = BigInteger.ZERO;
        values[1] = BigInteger.ONE;
        values[2] = BigInteger.ZERO;
        values[3] = BigInteger.ONE;

        for (int i = 4; i <= n; i++) {
            values[i % 4] = values[(i - 4) % 4].add(values[(i - 3) % 4]);
        }

        return values[n % 4];
    }





}
 /*In order to prevent running out of memory heap, we actually only store the last two values
         ( values[i-4] and values[i-3] ), because this is what we need for the calculations

         This allows to calculate larger numbers
         */
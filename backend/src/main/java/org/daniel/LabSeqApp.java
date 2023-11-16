package org.daniel;

import io.quarkus.runtime.Quarkus;
import io.quarkus.runtime.annotations.QuarkusMain;

@QuarkusMain
public class LabSeqApp {
    public static void main(String... args) {
        Quarkus.run(args);
    }
}


package org.bhakti.Exception;

public class PinNotSetException extends Throwable {
    public PinNotSetException(String pinNotSet) {
        super(pinNotSet);
    }
}

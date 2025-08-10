package org.bhakti.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@Document(collection = "Pin")
public class Pin {
    @Id
    private String id;
    private String pinText;
    public String getPinValue() {
        return pinText != null ? pinText : "";
    }
}

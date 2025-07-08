package com.example.demo.repositories;

import com.example.demo.models.kandidatiModel;
import java.util.List;

public interface kandidatiInterfejs {
    List<kandidatiModel> getAllKandidati();  // Return List<kandidatiModel>
    kandidatiModel getKandidatByID(int kandidatID);  // Return kandidatiModel
    int insertKandidat(kandidatiModel kandidat);  // Accept kandidatiModel
    int updateKandidat(kandidatiModel kandidat);  // Accept kandidatiModel
    int deleteKandidat(int kandidatID);
}


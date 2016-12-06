package act.graph.service;


import act.graph.repository.Neo4jRepository;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by wave on 16-11-29.
 */
@Service
public class SegService {

    private static final Logger log = LoggerFactory.getLogger(SegService.class);

    public List<String> getFinalList(String sentence) throws IOException{
        JsonArray segList = ltpAPIseg(sentence);
        List<String> finalList = new ArrayList<String>();
        String longentity = "";
        for (JsonElement seg : segList){
            JsonObject word = seg.getAsJsonObject();
            if (word.get("ne").getAsString().equals("B-Ni")){
                longentity = word.get("cont").getAsString();
            }
            else if (word.get("ne").getAsString().equals("I-Ni")){
                longentity += word.get("cont").getAsString();
            }
            else if (word.get("ne").getAsString().equals("E-Ni")){
                longentity += word.get("cont").getAsString();
                finalList.add(longentity);
                longentity = "";
            }
            else if (word.get("pos").getAsString().contains("n")){
                finalList.add(word.get("cont").getAsString());
            }
        }
        log.info("segFinalList:"+finalList.toString());
        return finalList;
    }


    public JsonArray ltpAPIseg(String sentence) throws IOException{

        String token = "m819D112JFtYoPJGDi3UDUnERPGcna2T6UNqchjJ";
        String pattern = "ner";
        String format  = "json";

        sentence = URLEncoder.encode(sentence, "utf-8");
        URL url = new URL("http://api.ltp-cloud.com/analysis/?"
                    + "api_key=" + token + "&"
                    + "text=" + sentence + "&"
                    + "format=" + format + "&"
                    + "pattern=" + pattern);
        URLConnection conn = url.openConnection();
        HttpURLConnection httpconn = (HttpURLConnection) conn;
        httpconn.connect();

        BufferedReader innet = new BufferedReader(new InputStreamReader(
                conn.getInputStream(),
                "utf-8"));
        JsonArray resultarr = new JsonParser().parse(innet).getAsJsonArray().get(0).getAsJsonArray().get(0).getAsJsonArray();
        innet.close();
        return resultarr;

    }

}

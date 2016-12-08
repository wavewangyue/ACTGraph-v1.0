package act.graph.service;


import act.graph.model.GraphEdge;
import act.graph.model.GraphResult;
import act.graph.repository.Neo4jRepository;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    GraphService graphService;

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
        if (!longentity.equals("")) finalList.add(longentity);
        log.info("segFinalList:"+finalList.toString());
        return finalList;
    }

    //哈工大ltpAPI
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

    //从图中根据分词结果标记寻找答案的路径
    public GraphResult enlightList(GraphResult gr,List<String> finalList) throws IOException{
        GraphResult result = gr;
        List<Integer> enlightList = new ArrayList<Integer>();
        int standNow = 0;
        enlightList.add(standNow);
        int i;
        for (i = 1;i < finalList.size();i++) {
            //检索下一个实体
            int k;
            for (k = 0; k < gr.links.size(); k++) {
                GraphEdge alink = gr.links.get(k);
                if ((alink.source == standNow)&&(alink.name.equals(finalList.get(i)))) {
                    standNow = alink.target;
                    enlightList.add(standNow);
                    break;
                }
            }
            //寻找失败
            if (k == gr.links.size()) break;
        }
        if (i == finalList.size()){
            result.answer = gr.nodes.get(standNow).name;
        }else{
            JsonObject entityInfo  = graphService.searchEntityInfo(gr.nodes.get(standNow).keyId);
            if (entityInfo.has(finalList.get(i))){
                result.answer = entityInfo.get(finalList.get(i)).getAsString();
            }
            else{
                result.answer = null;
            }
        }
        result.answerpath = enlightList;
        return result;
    }
}

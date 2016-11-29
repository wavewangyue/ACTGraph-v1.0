package act.graph.service;


import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.*;

/**
 * Created by wave on 16-11-29.
 */
@Service
public class ParserService {


    public JsonArray parseSentence(String sentence) {

        String token = "m819D112JFtYoPJGDi3UDUnERPGcna2T6UNqchjJ";
        String pattern = "sdp";
        String format  = "json";

        try {
            sentence = URLEncoder.encode(sentence, "utf-8");
            URL url = new URL("http://api.ltp-cloud.com/analysis/?"
                    + "api_key=" + token + "&"
                    + "text=" + sentence + "&"
                    + "format=" + format + "&"
                    + "pattern=" + pattern);
            URLConnection conn = url.openConnection();
            HttpURLConnection httpconn = (HttpURLConnection) conn;
            httpconn.connect();
            if (httpconn.getResponseCode()==503){
                return null;
            }

            BufferedReader innet = new BufferedReader(new InputStreamReader(
                conn.getInputStream(),
                "utf-8"));
            JsonArray resultarr = new JsonParser().parse(innet).getAsJsonArray().get(0).getAsJsonArray().get(0).getAsJsonArray();
            innet.close();
            return resultarr;
        } catch (IOException e){}

        return new JsonArray();
    }

    public void parseDataSet() throws IOException,URISyntaxException{

        String datasetURL= this.getClass().getClassLoader().getResource("/").getPath()+"chineseQAparser/cooked.txt";
        String outURL = "/home/wave/Desktop/yuyanyun.txt";
        System.out.println(outURL);
        BufferedReader filein = new BufferedReader(new FileReader(datasetURL));
        BufferedWriter fileout = new BufferedWriter(new FileWriter(outURL));
        String line = "";
        int index = 0;
        while ((line = filein.readLine()) != null){
            System.out.println(index++);
            String q = line.split("\t")[0];
            JsonArray arr = parseSentence(q);
            while (arr == null){
                System.out.println("API返回代码503，重试");
                arr = parseSentence(q);
            }
            String result = "";
            for (JsonElement ele : arr){
                JsonObject obj = ele.getAsJsonObject();
                result += obj.get("semrelate").getAsString() + " ";
                int parentid = obj.get("semparent").getAsInt();
                if (parentid >= 0)
                    result += arr.get(parentid).getAsJsonObject().get("cont").getAsString() + " ";
                else result += "ROOT ";
                result += obj.get("cont").getAsString() + "\t";
            }
            fileout.write(q+"\n");
            fileout.write(result+"\n");
            try{
                Thread thread = Thread.currentThread();
                thread.sleep(10);
            }catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        filein.close();
        fileout.close();
    }
}

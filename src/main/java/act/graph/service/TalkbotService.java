package act.graph.service;

import com.google.gson.JsonParser;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by wave on 16-12-8.
 */
@Service
public class TalkbotService {

    private static final Logger log = LoggerFactory.getLogger(TalkbotService.class);

    //图灵机器人API
    public String turingAPItalk(String question) throws IOException{

        String url="http://www.tuling123.com/openapi/api";
        String answer = "";
        String apikey = "f02da40881a24da2af7c1cad3e9f523e";
        String userid = "0";

        HttpPost httpRequst = new HttpPost(url);
        HttpClient httpclient = HttpClientBuilder.create().build();
        List<NameValuePair> params = new ArrayList<NameValuePair>();
        params.add(new BasicNameValuePair("key", apikey));
        params.add(new BasicNameValuePair("info", question));
        params.add(new BasicNameValuePair("userid", userid));
        httpRequst.setEntity(new UrlEncodedFormEntity(params, HTTP.UTF_8));
        HttpResponse httpResponse = httpclient.execute(httpRequst);
        int statusCode = httpResponse.getStatusLine().getStatusCode();
        HttpEntity httpEntity = httpResponse.getEntity();
        String responseString = EntityUtils.toString(httpEntity);
        log.info("turingAPIresponse:Code("+statusCode+"),Entity("+responseString+")");
        answer = new JsonParser().parse(responseString).getAsJsonObject().get("text").getAsString();

        return answer;
    }
}

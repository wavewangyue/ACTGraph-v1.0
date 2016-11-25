package act.graph.repository;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.io.IOException;

/**
 * Created by yumiao on 16-4-19.
 */
@Repository
public class Neo4jRepository {

    private static final Logger log = LoggerFactory.getLogger(Neo4jRepository.class);

    //数据库地址
    private static String url="http://10.1.1.4:7474/db/data/transaction/commit";

    public JsonObject requestNeo4j(String query) throws IOException {
        log.info("Neo4JQuery:"+query);
        HttpClient httpclient = HttpClientBuilder.create().build();
        /**
         * 以下是用HttpPost发送JSON
         */
        //将要请求的URL通过构造方法传入HttpGet或HttpPost对象。
        HttpPost httppost = new HttpPost(url);
        httppost.setHeader("Accept", "application/json, text/plain, */*");
        httppost.setHeader("Content-Type", "application/json;charset=UTF-8");
        httppost.setHeader("Authorization", "Basic bmVvNGo6MTIzNDU2");
        //如果使用HttpPost方法提交HTTP POST请求，需要使用HttpPost类的setEntity方法设置请求参数
        //HTTP报文可以携带和请求或响应相关的内容实体。实体可以在一些请求和响应中找到
        StringEntity se = new StringEntity(
                "{\"statements\":[{\"statement\":\""
                        + query
                        + "\",\"resultDataContents\":[\"row\",\"graph\"],\"includeStats\":true}]}",
                "UTF-8");
        httppost.setEntity(se);
        /**
         * 以下是接收HttpResponse
         */
        HttpResponse response = httpclient.execute(httppost); ///执行POST请求,发送Post,并返回一个HttpResponse对象
        HttpEntity entity = response.getEntity();     //获取响应实体
        String result = EntityUtils.toString(entity, "UTF-8");
        if (entity != null) {
            JsonObject jsonrs = new JsonParser().parse(result).getAsJsonObject();
            //log.info("数据库传给后台的数据:");
            //log.info(jsonrs.toString());
        	return jsonrs;
        }
        return null;

    }



}

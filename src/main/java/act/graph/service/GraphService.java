package act.graph.service;

import act.graph.repository.Neo4jRepository;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import act.graph.model.*;

import java.io.*;

/**
 * Created by wave on 16-12-6.
 */
@Service
public class GraphService {

    @Autowired
    Neo4jRepository neo4jRepository;

    private static int maxLevel = 3;//最大递归查询层数

    public JsonObject EntityInfo = new JsonObject();

    public GraphResult bloomNow(String keyword) throws IOException{

        GraphResult graphResult = new GraphResult();

        int pointer = 0;//待被查询的节点队列指针

        String Keyword_keyId = searchEntityKeyId(keyword);
        if (Keyword_keyId == null){
            return null;
        }else{
            GraphNode newnode = new GraphNode();
            newnode.id = 0;
            newnode.name = keyword;
            if (Keyword_keyId == "3008163") newnode.category = "教育机构";
            else
            newnode.category = EntityInfo.get("label").getAsString();
            newnode.keyId = Keyword_keyId;
            newnode.value = 0;
            graphResult.nodes.add(newnode);
        }
        //如果广度递归层数没有达到上限，并且还存在待被查询的节点，并且目前节点数小于100
        while ((graphResult.nodes.size() > pointer)&&(graphResult.nodes.get(pointer).value < maxLevel)&&(graphResult.nodes.size() < 100)){
            JsonArray data = searchEntityRelation(graphResult.nodes.get(pointer).keyId);
            for (JsonElement adata : data){
                JsonArray row = adata.getAsJsonObject().getAsJsonArray("row");
                String linkname = row.get(0).getAsString();
                String mlabel = row.get(1).getAsString();
                String mname = row.get(2).getAsString();
                String mkeyId = row.get(3).getAsString();
                int nodesSizeNow = graphResult.nodes.size();
                int i;
                for (i = 0;i < nodesSizeNow;i++){
                    if (graphResult.nodes.get(i).keyId.equals(mkeyId)) break;
                }
                //不加入新节点，只加入新关系
                if (i < nodesSizeNow){
                    GraphEdge newedge = new GraphEdge();
                    newedge.id = graphResult.links.size();
                    newedge.source = pointer;
                    newedge.target = i;
                    newedge.level = graphResult.nodes.get(pointer).value + 1;
                    newedge.name = linkname;
                    graphResult.links.add(newedge);
                    continue;
                }
                //加入新节点
                GraphNode newnode = new GraphNode();
                newnode.id = nodesSizeNow;
                newnode.name = mname;
                newnode.category = mlabel;
                newnode.keyId = mkeyId;
                newnode.value = graphResult.nodes.get(pointer).value + 1;
                graphResult.nodes.add(newnode);
                //加入新关系
                GraphEdge newedge = new GraphEdge();
                newedge.id = graphResult.links.size();
                newedge.source = pointer;
                newedge.target = nodesSizeNow;
                newedge.level = newnode.value;
                newedge.name = linkname;
                graphResult.links.add(newedge);
            }
            pointer++;
        }
        return graphResult;
    }

    //查询实体id
    public String searchEntityKeyId(String entity) throws IOException{

        if (entity.equals("北京航空航天大学")){
            return "3008163";
        }
        String query = "match (n:Instance) where n.name =\'" + entity + "\' return id(n), n";

        JsonArray data = neo4jRepository.requestNeo4j(query);
        for (JsonElement adata : data){
            JsonArray row = adata.getAsJsonObject().getAsJsonArray("row");
            EntityInfo = row.get(1).getAsJsonObject();
            return row.get(0).getAsString();
        }
        return null;
    }

    //查询实体完整信息
    public JsonObject searchEntityInfo(String keyId) throws IOException{

        String query = "match (n:Instance) where id(n) = " + keyId + " return n";

        JsonArray data = neo4jRepository.requestNeo4j(query);
        for (JsonElement adata : data){
            JsonArray row = adata.getAsJsonObject().getAsJsonArray("row");
            return row.get(0).getAsJsonObject();
        }
        return null;
    }

    //查询与实体相关的关系与实体
    public JsonArray searchEntityRelation(String keyId) throws IOException{

        String query = "match (n:Instance)-[r]->(m:Instance) where id(n) =" + keyId +" return type(r), m.label, m.name, id(m)";

        JsonArray data = neo4jRepository.requestNeo4j(query);

        return data;
    }
}

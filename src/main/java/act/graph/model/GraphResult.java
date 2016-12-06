package act.graph.model;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by wave on 16-12-6.
 */
public class GraphResult {
    public List<GraphNode> nodes;
    public List<GraphEdge> links;
    public List<String> answers;

    public GraphResult(){
        nodes = new ArrayList<GraphNode>();
        links = new ArrayList<GraphEdge>();
        answers = new ArrayList<String>();
    }
}

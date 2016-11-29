package playdata.chineseQA;

/**
 * Created by wave on 16-11-25.
 */

import java.io.*;
import java.util.Collection;

import edu.stanford.nlp.parser.lexparser.LexicalizedParser;
import edu.stanford.nlp.trees.Tree;
import edu.stanford.nlp.trees.TypedDependency;
import edu.stanford.nlp.trees.international.pennchinese.ChineseGrammaticalStructure;

public class StanfordParse {

    public static void main(String[] args) throws IOException{
        String modelpath= "chineseQAparser/xinhuaFactoredSegmenting.ser.gz";
        String urlin= Class.class.getClass().getResource("/").getPath()+"chineseQAparser/cooked.txt";
        String urlout = Class.class.getClass().getResource("/").getPath()+"chineseQAparser/stanford.txt";

        LexicalizedParser lp = LexicalizedParser.loadModel(modelpath);
        BufferedReader infile = new BufferedReader(new FileReader(urlin));
        BufferedWriter outfile = new BufferedWriter(new FileWriter(urlout));
        String line = "";
        int index = 0;
        while ((line = infile.readLine()) != null){
            System.out.println(index++);
            String q = line.split("\t")[0];
            Tree t = lp.parse(q);
//          TokenizerFactory<CoreLabel> tokenizerFactory =PTBTokenizer.factory(new CoreLabelTokenFactory(), "");
//          List<CoreLabel> rawWords2 =tokenizerFactory.getTokenizer(new StringReader(str)).tokenize();
//          Tree t1 = lp.apply(rawWords2);
//          ChineseTreebankLanguagePack tlp = new ChineseTreebankLanguagePack();
//          GrammaticalStructureFactory gsf = tlp.grammaticalStructureFactory();
            ChineseGrammaticalStructure gs = new ChineseGrammaticalStructure(t);
//          List<TypedDependency> tdl = gs.typedDependenciesCCprocessed();
            Collection<TypedDependency> tdl = gs.typedDependenciesCollapsed();
            String s="";
            for(int i = 0;i < tdl.size();i ++)
            {
                TypedDependency td = (TypedDependency)tdl.toArray()[i];
                String age = td.dep().toString();
                s+=age+"/";
            }
            outfile.write(q+"\n"+tdl.toString()+"\n"+s+"\n"+"\n");
        }
        infile.close();
        outfile.close();
    }
}

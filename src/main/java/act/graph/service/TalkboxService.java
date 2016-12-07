package act.graph.service;

/**
 * Created by wave on 16-8-16.
 */

import act.graph.repository.IKAnalyzerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;

@Service
public class TalkboxService {

    private static final Logger log = LoggerFactory.getLogger(TalkboxService.class);

    public boolean TalkboxGetTheAnswer = true;//记录答案是否由讲话机得到还是知识库得到
    private static double Threshold = 0.6;//匹配准确度阈值
    private String path = this.getClass().getClassLoader().getResource("/").getPath()+"easyQA/conversation.txt";
    private int status = 0;
    private String exinputLineTxt = "";
    private HashMap<String, String> StatementMap = new HashMap<String, String>() {
        {
            //输入了无效字符
            put("Error0","抱歉，我不懂 (");
            //没有找到答案
            put("Error1","抱歉，我现在还不知道该如何回答你。如果你愿意教我的话，我会很开心。将“a”+文字内容回复给我，我就可以学到了 :)");
            //讲到了一段对话的末尾
            put("Done0" ,"嗯");
            //讲话机学习完毕
            put("Done1" ,"好的，我已经学会了，谢谢你的支持 ;)");
            //讲话机应用模版1
            put("Frame1" ,"今天是xxxx年xx月xx日");
            //讲话机应用模版2
            put("Frame2" ,"今天是xxxx年xx月xx日，学长只能帮你到这了。");
            //讲话机应用模版3
            put("Frame3" ,"现在是xx时xx分");
        }
    };

    @Autowired
    private IKAnalyzerRepository IKAnalyzer;

    //讲话机中控台
    public String letUsTalk(String Question) throws Exception{

        log.info("question:"+Question);
        if (status == 1){
            String inputhead = Question.substring(0,1);
            if (inputhead.equals("a")){
                learn(Question.substring(1));
                return StatementMap.get("Done1");
            }
            status = 0;//讲话机恢复到初始状态0
        }

        //首先进行讲话机匹配
        String Reply = getAnswer(Question);
        TalkboxGetTheAnswer = true;
        //讲话机匹配失败，进行知识图谱检索
        if (Reply.equals("Error1")){
            return null;
        }
        return Reply;
    }

    //讲话机获取答案
    public String getAnswer(String inputLineTxt) throws Exception{
        File file = new File(path);
        InputStreamReader read  = new InputStreamReader(new FileInputStream(file));
        BufferedReader bufferReader = new BufferedReader(read);
        String lineTxt = null;
        double maxSimilarity = 0.0;
        double tmpSimilarity = 0.0;
        String answer = "";
        boolean appear = false;
        while((lineTxt = bufferReader.readLine()) != null){
            if(appear){
                answer = lineTxt;
                appear = false;
            }
            if(lineTxt.equals("")){
                appear = false;
                continue;
            }
            tmpSimilarity = IKAnalyzer.getSimilarity(IKAnalyzer.participle(lineTxt), IKAnalyzer.participle(inputLineTxt));
            if((tmpSimilarity >= maxSimilarity)&&(tmpSimilarity > 0)){
                maxSimilarity = tmpSimilarity;
                appear = true;
            }else if(tmpSimilarity < 0){
                bufferReader.close();
                return StatementMap.get("Error0");
            }
        }
        if (maxSimilarity >= Threshold){
            if (answer.equals("")){
                bufferReader.close();
                return StatementMap.get("Done0");
            }
            else{
                bufferReader.close();
                if (answer.length() >= 5)
                    if (answer.substring(0,5).equals("Frame")){
                        frameupdate();
                        return StatementMap.get(answer);
                    }
                return answer;
            }
        }
        else{
            bufferReader.close();
            return "Error1";
        }
    }

    //讲话机学习
    public void learn(String inputLineTxt) throws Exception{
        BufferedWriter bufferWriter = new BufferedWriter(new FileWriter(new File(path), true));
        bufferWriter.newLine();
        bufferWriter.write(exinputLineTxt);
        bufferWriter.newLine();
        bufferWriter.write(inputLineTxt);
        bufferWriter.newLine();
        bufferWriter.close();
    }

    //讲话机的应用模版更新
    public void frameupdate(){

        String year = new SimpleDateFormat("yyyy").format(new Date()).toString()+"年";
        String month = new SimpleDateFormat("MM").format(new Date()).toString()+"月";
        String day = new SimpleDateFormat("dd").format(new Date()).toString()+"日";
        String hour = new SimpleDateFormat("HH").format(new Date()).toString()+"时";
        String minute = new SimpleDateFormat("mm").format(new Date()).toString()+"分";

        StatementMap.put("Frame1","今天是"+year+month+day);
        StatementMap.put("Frame2","今天是"+year+month+day+"，学长只能帮你到这了");
        StatementMap.put("Frame3","现在是"+hour+minute);
    }

}

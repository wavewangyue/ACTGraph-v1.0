package act.graph.controller;

/**
 * Created by wave on 16-8-16.
 */

import act.graph.model.GraphResult;
import act.graph.service.GraphService;
import act.graph.service.SegService;
import act.graph.service.TalkbotService;
import act.graph.service.TalkboxService;
import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/easyQA")
public class TalkbotController {

    private static final Logger log = LoggerFactory.getLogger(TalkbotController.class);

    @Autowired
    private TalkboxService talkboxService;

    @Autowired
    private GraphService graphService;

    @Autowired
    private SegService segService;

    @Autowired
    private TalkbotService talkbotService;

    @RequestMapping(value = "/talk1.do", method = RequestMethod.GET, produces="text/html;charset=UTF-8")
    @ResponseBody
    public String talk1ToMe(String question) throws Exception {
        //if (question != null) question = new String(question.getBytes("iso-8859-1"),"UTF-8");
        String answer = talkboxService.letUsTalk(question);
        if (answer == null){
            List<String> finallist = segService.getFinalList(question);
            GraphResult result = graphService.bloomNow(finallist.get(0));
            result = segService.enlightList(result,finallist);
            return new Gson().toJson(result);
        }else{
            return new Gson().toJson(answer);
        }
    }

    @RequestMapping(value = "/talk.do", method = RequestMethod.GET, produces="text/html;charset=UTF-8")
    @ResponseBody
    public String talkToMe(String question) throws Exception {
        log.info("question:"+question);
        String answerWithNoknow = talkbotService.turingAPItalk(question);
        return new Gson().toJson(answerWithNoknow);
    }

}

